/**
 * API Client for SecureDocs Backend Integration
 * Handles all HTTP requests to ASP.NET Core backend
 */

// Type definitions for API client
interface ApiConfig {
  baseURL: string;
  timeout: number;
  headers: Record<string, string>;
}

interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
}

// Configuration
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:5000';
const API_VERSION = import.meta.env?.VITE_API_VERSION || 'v1';
const API_TIMEOUT = parseInt(import.meta.env?.VITE_API_TIMEOUT || '30000');

/**
 * Simple fetch-based API client (no external dependencies required)
 */
class ApiClient {
  private baseURL: string;
  private timeout: number;

  constructor(config: Partial<ApiConfig> = {}) {
    this.baseURL = config.baseURL || `${API_BASE_URL}/api/${API_VERSION}`;
    this.timeout = config.timeout || API_TIMEOUT;
  }

  private async request<T = any>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = localStorage.getItem('auth_token');
    
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...options.headers as Record<string, string>,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const contentType = response.headers.get('content-type');
      const data = contentType?.includes('application/json')
        ? await response.json()
        : await response.text();

      if (!response.ok) {
        // Handle 401 - Try to refresh token
        if (response.status === 401) {
          const refreshed = await this.attemptTokenRefresh();
          if (refreshed) {
            // Retry original request with new token
            return this.request<T>(endpoint, options);
          } else {
            // Refresh failed - redirect to login
            this.logout();
            throw new Error('Session expired. Please login again.');
          }
        }

        throw {
          message: data.message || `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
          errors: data.errors,
        } as ApiError;
      }

      return {
        data,
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
      };
    } catch (error: any) {
      clearTimeout(timeoutId);
      
      if (error.name === 'AbortError') {
        throw { message: 'Request timeout', status: 408 } as ApiError;
      }
      
      throw error;
    }
  }

  private async attemptTokenRefresh(): Promise<boolean> {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${this.baseURL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (!response.ok) return false;

      const data = await response.json();
      localStorage.setItem('auth_token', data.accessToken);
      return true;
    } catch {
      return false;
    }
  }

  private logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }

  public async get<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  public async post<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public async put<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  public async delete<T = any>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  public async patch<T = any>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }
}

// Export singleton instance
const apiClient = new ApiClient();
export default apiClient;

// Export convenient API methods
export const api = {
  get: <T = any>(endpoint: string) => apiClient.get<T>(endpoint),
  post: <T = any>(endpoint: string, data?: any) => apiClient.post<T>(endpoint, data),
  put: <T = any>(endpoint: string, data?: any) => apiClient.put<T>(endpoint, data),
  delete: <T = any>(endpoint: string) => apiClient.delete<T>(endpoint),
  patch: <T = any>(endpoint: string, data?: any) => apiClient.patch<T>(endpoint, data),
};

export type { ApiResponse, ApiError };
