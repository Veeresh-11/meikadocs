/**
 * Security Utilities for SecureDocs
 * Provides input validation, sanitization, and security helpers
 */

/**
 * Sanitizes HTML to prevent XSS attacks
 * Strips potentially dangerous characters and tags
 */
export function sanitizeInput(input: string): string {
  if (!input) return '';
  
  // Remove any HTML tags
  let sanitized = input.replace(/<[^>]*>/g, '');
  
  // Encode special characters
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
  
  return sanitized.trim();
}

/**
 * Validates email address with improved regex
 * Complies with RFC 5322 standards (simplified)
 */
export function validateEmail(email: string): boolean {
  if (!email || email.length > 254) return false;
  
  // More comprehensive email validation
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  return emailRegex.test(email);
}

/**
 * Validates password strength with comprehensive rules
 * Returns strength score (0-5) and validation errors
 */
export interface PasswordValidation {
  strength: number;
  isValid: boolean;
  errors: string[];
}

export function validatePassword(password: string): PasswordValidation {
  const errors: string[] = [];
  let strength = 0;

  // Minimum length check
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters');
  } else {
    strength++;
  }

  // Length bonus
  if (password.length >= 12) strength++;
  if (password.length >= 16) strength++;

  // Complexity checks
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain lowercase letters');
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain uppercase letters');
  }
  
  if (!/\d/.test(password)) {
    errors.push('Password must contain numbers');
  } else {
    strength++;
  }
  
  if (!/[^a-zA-Z\d]/.test(password)) {
    errors.push('Password must contain special characters');
  } else {
    strength++;
  }

  // Check for common patterns
  const commonPatterns = [
    /^(.)\1+$/, // All same character
    /^(012|123|234|345|456|567|678|789|890|abc|bcd|cde|def)/, // Sequential
    /password|12345|qwerty|admin|letmein/i, // Common passwords
  ];

  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      errors.push('Password contains common patterns');
      strength = Math.max(0, strength - 1);
      break;
    }
  }

  return {
    strength: Math.min(5, strength),
    isValid: errors.length === 0 && strength >= 3,
    errors
  };
}

/**
 * Sanitizes name input (allows letters, spaces, hyphens, apostrophes)
 */
export function sanitizeName(name: string): string {
  if (!name) return '';
  
  // Remove any characters that aren't letters, spaces, hyphens, or apostrophes
  let sanitized = name.replace(/[^a-zA-Z\s\-']/g, '');
  
  // Limit length
  sanitized = sanitized.slice(0, 100);
  
  // Trim and collapse multiple spaces
  sanitized = sanitized.trim().replace(/\s+/g, ' ');
  
  return sanitized;
}

/**
 * Rate limiter for form submissions (client-side)
 * Prevents rapid form spam
 */
class RateLimiter {
  private attempts: Map<string, number[]> = new Map();
  private readonly maxAttempts: number;
  private readonly windowMs: number;

  constructor(maxAttempts: number = 5, windowMs: number = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now();
    const attempts = this.attempts.get(identifier) || [];
    
    // Remove old attempts outside the time window
    const recentAttempts = attempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return false;
    }
    
    // Add current attempt
    recentAttempts.push(now);
    this.attempts.set(identifier, recentAttempts);
    
    return true;
  }

  reset(identifier: string): void {
    this.attempts.delete(identifier);
  }

  getRemainingTime(identifier: string): number {
    const attempts = this.attempts.get(identifier) || [];
    if (attempts.length === 0) return 0;
    
    const oldestAttempt = Math.min(...attempts);
    const remainingTime = this.windowMs - (Date.now() - oldestAttempt);
    
    return Math.max(0, remainingTime);
  }
}

// Singleton instances
export const authRateLimiter = new RateLimiter(5, 300000); // 5 attempts per 5 minutes
export const formRateLimiter = new RateLimiter(3, 60000); // 3 attempts per minute

/**
 * Generates a secure random token using Web Crypto API
 * Falls back to Math.random() if crypto is unavailable (with warning)
 */
export function generateSecureToken(length: number = 32): string {
  try {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  } catch (error) {
    console.warn('Crypto API not available, falling back to less secure method');
    // Fallback (not cryptographically secure)
    return Array.from({ length }, () => 
      Math.floor(Math.random() * 16).toString(16)
    ).join('');
  }
}

/**
 * Validates URL to prevent open redirect attacks
 */
export function validateURL(url: string, allowedDomains: string[] = []): boolean {
  try {
    const parsed = new URL(url);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }
    
    // If allowed domains specified, check if URL matches
    if (allowedDomains.length > 0) {
      return allowedDomains.some(domain => 
        parsed.hostname === domain || parsed.hostname.endsWith(`.${domain}`)
      );
    }
    
    return true;
  } catch {
    return false;
  }
}

/**
 * Content Security Policy Helper
 * Returns recommended CSP headers for the application
 * 
 * NOTE: The ipapi.co domain should be replaced with your own geolocation service
 * or removed if not needed in production.
 */
export function getRecommendedCSP(): string {
  return [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Note: Remove unsafe-inline/eval in production
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "font-src 'self' data:",
    "connect-src 'self' https://ipapi.co", // Replace ipapi.co with your own service
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; ');
}

/**
 * Validates and sanitizes message content
 * Limits length and removes dangerous content
 */
export function sanitizeMessage(message: string, maxLength: number = 5000): string {
  if (!message) return '';
  
  // Limit length
  let sanitized = message.slice(0, maxLength);
  
  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '');
  
  // Basic HTML encoding for display
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
  
  return sanitized.trim();
}

/**
 * Check if browser has necessary security features
 */
export function checkBrowserSecurity(): {
  hasSecureContext: boolean;
  hasCrypto: boolean;
  hasWebAuthn: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];
  
  const hasSecureContext = window.isSecureContext;
  if (!hasSecureContext) {
    warnings.push('Application is not running in a secure context (HTTPS required)');
  }
  
  const hasCrypto = 'crypto' in window && 'subtle' in window.crypto;
  if (!hasCrypto) {
    warnings.push('Web Crypto API not available');
  }
  
  const hasWebAuthn = 'credentials' in navigator && 'PublicKeyCredential' in window;
  if (!hasWebAuthn) {
    warnings.push('WebAuthn/Passkeys not supported in this browser');
  }
  
  return {
    hasSecureContext,
    hasCrypto,
    hasWebAuthn,
    warnings
  };
}