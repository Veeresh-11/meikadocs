/**
 * License Service
 * Handles license management and activation
 */

import { api, type ApiResponse } from '../utils/api-client';

// Types
export interface License {
  id: string;
  userId: string;
  licenseKey: string;
  planType: 'free' | 'trial' | 'pro' | 'enterprise';
  status: 'active' | 'expired' | 'suspended' | 'cancelled';
  startDate: string;
  expiryDate: string;
  deviceLimit: number;
  devicesUsed: number;
  features: string[];
  autoRenew: boolean;
  nextBillingDate?: string;
}

export interface Device {
  id: string;
  deviceId: string;
  deviceName: string;
  platform: 'Windows' | 'macOS' | 'Linux' | 'Android';
  activatedAt: string;
  lastUsed: string;
  ipAddress: string;
}

export interface ActivationRequest {
  licenseKey: string;
  deviceId: string;
  deviceName: string;
  platform: string;
}

export interface OfflineActivationRequest {
  licenseKey: string;
  deviceId: string;
  deviceFingerprint: string;
}

export interface OfflineActivationResponse {
  activationCode: string;
  expiresAt: string;
}

/**
 * License management service
 */
export const licenseService = {
  /**
   * Get all licenses for current user
   */
  getUserLicenses: async (): Promise<License[]> => {
    try {
      const response = await api.get<License[]>('/licenses/user');
      return response.data;
    } catch (error) {
      console.error('Get user licenses error:', error);
      throw error;
    }
  },

  /**
   * Get specific license details
   */
  getLicense: async (licenseId: string): Promise<License> => {
    try {
      const response = await api.get<License>(`/licenses/${licenseId}`);
      return response.data;
    } catch (error) {
      console.error('Get license error:', error);
      throw error;
    }
  },

  /**
   * Activate license on a device
   */
  activateLicense: async (data: ActivationRequest): Promise<License> => {
    try {
      const response = await api.post<License>('/licenses/activate', data);
      return response.data;
    } catch (error) {
      console.error('Activate license error:', error);
      throw error;
    }
  },

  /**
   * Deactivate license from a device
   */
  deactivateDevice: async (licenseId: string, deviceId: string): Promise<void> => {
    try {
      await api.post(`/licenses/${licenseId}/deactivate`, { deviceId });
    } catch (error) {
      console.error('Deactivate device error:', error);
      throw error;
    }
  },

  /**
   * Get all devices for a license
   */
  getLicenseDevices: async (licenseId: string): Promise<Device[]> => {
    try {
      const response = await api.get<Device[]>(`/licenses/${licenseId}/devices`);
      return response.data;
    } catch (error) {
      console.error('Get license devices error:', error);
      throw error;
    }
  },

  /**
   * Validate license key
   */
  validateLicense: async (licenseKey: string): Promise<{ valid: boolean; license?: License }> => {
    try {
      const response = await api.post<{ valid: boolean; license?: License }>('/licenses/validate', { licenseKey });
      return response.data;
    } catch (error) {
      console.error('Validate license error:', error);
      throw error;
    }
  },

  /**
   * Generate offline activation code
   */
  generateOfflineActivation: async (data: OfflineActivationRequest): Promise<OfflineActivationResponse> => {
    try {
      const response = await api.post<OfflineActivationResponse>('/licenses/offline-activation', data);
      return response.data;
    } catch (error) {
      console.error('Generate offline activation error:', error);
      throw error;
    }
  },

  /**
   * Start trial license
   */
  startTrial: async (): Promise<License> => {
    try {
      const response = await api.post<License>('/licenses/start-trial');
      return response.data;
    } catch (error) {
      console.error('Start trial error:', error);
      throw error;
    }
  },

  /**
   * Upgrade/downgrade license
   */
  changePlan: async (
    licenseId: string,
    newPlanType: 'pro' | 'enterprise',
    billingCycle: 'monthly' | 'yearly'
  ): Promise<License> => {
    try {
      const response = await api.post<License>(`/licenses/${licenseId}/change-plan`, {
        newPlanType,
        billingCycle,
      });
      return response.data;
    } catch (error) {
      console.error('Change plan error:', error);
      throw error;
    }
  },

  /**
   * Cancel license subscription
   */
  cancelSubscription: async (licenseId: string): Promise<void> => {
    try {
      await api.post(`/licenses/${licenseId}/cancel`);
    } catch (error) {
      console.error('Cancel subscription error:', error);
      throw error;
    }
  },

  /**
   * Renew license subscription
   */
  renewSubscription: async (licenseId: string): Promise<License> => {
    try {
      const response = await api.post<License>(`/licenses/${licenseId}/renew`);
      return response.data;
    } catch (error) {
      console.error('Renew subscription error:', error);
      throw error;
    }
  },

  /**
   * Get license usage statistics
   */
  getLicenseStats: async (licenseId: string): Promise<any> => {
    try {
      const response = await api.get(`/licenses/${licenseId}/stats`);
      return response.data;
    } catch (error) {
      console.error('Get license stats error:', error);
      throw error;
    }
  },
};

export default licenseService;
