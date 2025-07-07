import api from './api.js';

/**
 * Authentication Service
 * Handles user authentication, token management, and session operations
 */
class AuthService {
  constructor() {
    this.TOKEN_KEY = 'itsm_auth_token';
    this.REFRESH_TOKEN_KEY = 'itsm_refresh_token';
    this.USER_KEY = 'itsm_user_data';
    this.ROLE_KEY = 'itsm_user_roles';
    this.SESSION_TIMEOUT = 30 * 60 * 1000; // 30 minutes
    this.refreshTimer = null;
    this.currentUser = null;
    this.userRoles = [];
    this.permissions = [];
  }

  /**
   * User login
   * @param {string} username - User's username or email
   * @param {string} password - User's password
   * @param {boolean} rememberMe - Whether to remember the user
   * @returns {Promise<Object>} Authentication result
   */
  async login(username, password, rememberMe = false) {
    try {
      const response = await api.post('/auth/login', {
        username,
        password,
        rememberMe
      });

      const { token, refreshToken, user, roles, permissions } = response.data;

      // Store authentication data
      this.setAuthToken(token);
      this.setRefreshToken(refreshToken);
      this.setUserData(user);
      this.setUserRoles(roles);
      this.setPermissions(permissions);

      // Set up automatic token refresh
      this.setupTokenRefresh();

      // Track login activity
      this.trackLoginActivity(user.id);

      return {
        success: true,
        user,
        roles,
        permissions,
        message: 'Login successful'
      };
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Login failed'
      };
    }
  }

  /**
   * User logout
   * @returns {Promise<boolean>} Logout success status
   */
  async logout() {
    try {
      const token = this.getAuthToken();
      if (token) {
        await api.post('/auth/logout', {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearAuthData();
      this.clearRefreshTimer();
    }
  }

  /**
   * Refresh authentication token
   * @returns {Promise<boolean>} Refresh success status
   */
  async refreshAuthToken() {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.post('/auth/refresh', {
        refreshToken
      });

      const { token, refreshToken: newRefreshToken } = response.data;

      this.setAuthToken(token);
      if (newRefreshToken) {
        this.setRefreshToken(newRefreshToken);
      }

      return true;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.logout(); // Force logout on refresh failure
      return false;
    }
  }

  /**
   * Check if user is authenticated
   * @returns {boolean} Authentication status
   */
  isAuthenticated() {
    const token = this.getAuthToken();
    const user = this.getUserData();
    return !!(token && user);
  }

  /**
   * Get current user data
   * @returns {Object|null} Current user data
   */
  getCurrentUser() {
    if (!this.currentUser) {
      this.currentUser = this.getUserData();
    }
    return this.currentUser;
  }

  /**
   * Get user roles
   * @returns {Array} User roles
   */
  getUserRoles() {
    if (!this.userRoles.length) {
      this.userRoles = this.getStoredRoles();
    }
    return this.userRoles;
  }

  /**
   * Get user permissions
   * @returns {Array} User permissions
   */
  getUserPermissions() {
    if (!this.permissions.length) {
      this.permissions = this.getStoredPermissions();
    }
    return this.permissions;
  }

  /**
   * Check if user has specific role
   * @param {string} role - Role to check
   * @returns {boolean} Role existence status
   */
  hasRole(role) {
    const userRoles = this.getUserRoles();
    return userRoles.some(r => r.name === role || r.code === role);
  }

  /**
   * Check if user has specific permission
   * @param {string} permission - Permission to check
   * @returns {boolean} Permission existence status
   */
  hasPermission(permission) {
    const userPermissions = this.getUserPermissions();
    return userPermissions.includes(permission);
  }

  /**
   * Check if user has any of the specified roles
   * @param {Array} roles - Array of roles to check
   * @returns {boolean} Role existence status
   */
  hasAnyRole(roles) {
    return roles.some(role => this.hasRole(role));
  }

  /**
   * Check if user has any of the specified permissions
   * @param {Array} permissions - Array of permissions to check
   * @returns {boolean} Permission existence status
   */
  hasAnyPermission(permissions) {
    return permissions.some(permission => this.hasPermission(permission));
  }

  /**
   * Update user profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise<Object>} Update result
   */
  async updateProfile(profileData) {
    try {
      const response = await api.put('/auth/profile', profileData);
      const updatedUser = response.data.user;
      
      this.setUserData(updatedUser);
      this.currentUser = updatedUser;

      return {
        success: true,
        user: updatedUser,
        message: 'Profile updated successfully'
      };
    } catch (error) {
      console.error('Profile update error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Profile update failed'
      };
    }
  }

  /**
   * Change user password
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} Change result
   */
  async changePassword(currentPassword, newPassword) {
    try {
      await api.post('/auth/change-password', {
        currentPassword,
        newPassword
      });

      return {
        success: true,
        message: 'Password changed successfully'
      };
    } catch (error) {
      console.error('Password change error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Password change failed'
      };
    }
  }

  /**
   * Reset password request
   * @param {string} email - User's email
   * @returns {Promise<Object>} Reset result
   */
  async requestPasswordReset(email) {
    try {
      await api.post('/auth/password-reset-request', { email });

      return {
        success: true,
        message: 'Password reset email sent'
      };
    } catch (error) {
      console.error('Password reset request error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Password reset request failed'
      };
    }
  }

  /**
   * Reset password with token
   * @param {string} token - Reset token
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} Reset result
   */
  async resetPassword(token, newPassword) {
    try {
      await api.post('/auth/password-reset', {
        token,
        newPassword
      });

      return {
        success: true,
        message: 'Password reset successful'
      };
    } catch (error) {
      console.error('Password reset error:', error);
      return {
        success: false,
        message: error.response?.data?.message || 'Password reset failed'
      };
    }
  }

  /**
   * Verify token validity
   * @returns {Promise<boolean>} Token validity status
   */
  async verifyToken() {
    try {
      const token = this.getAuthToken();
      if (!token) return false;

      await api.get('/auth/verify-token');
      return true;
    } catch (error) {
      console.error('Token verification error:', error);
      return false;
    }
  }

  /**
   * Setup automatic token refresh
   */
  setupTokenRefresh() {
    this.clearRefreshTimer();
    
    // Refresh token 5 minutes before expiry
    const refreshInterval = this.SESSION_TIMEOUT - (5 * 60 * 1000);
    
    this.refreshTimer = setInterval(async () => {
      const success = await this.refreshAuthToken();
      if (!success) {
        this.clearRefreshTimer();
      }
    }, refreshInterval);
  }

  /**
   * Clear refresh timer
   */
  clearRefreshTimer() {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer);
      this.refreshTimer = null;
    }
  }

  /**
   * Track login activity
   * @param {string} userId - User ID
   */
  async trackLoginActivity(userId) {
    try {
      await api.post('/auth/track-login', {
        userId,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        ipAddress: await this.getClientIP()
      });
    } catch (error) {
      console.error('Login tracking error:', error);
    }
  }

  /**
   * Get client IP address
   * @returns {Promise<string>} Client IP address
   */
  async getClientIP() {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error('IP detection error:', error);
      return 'unknown';
    }
  }

  // Token management methods
  setAuthToken(token) {
    if (token) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  getAuthToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setRefreshToken(token) {
    if (token) {
      localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
    }
  }

  getRefreshToken() {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  // User data management methods
  setUserData(user) {
    if (user) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      this.currentUser = user;
    }
  }

  getUserData() {
    const userData = localStorage.getItem(this.USER_KEY);
    return userData ? JSON.parse(userData) : null;
  }

  setUserRoles(roles) {
    if (roles) {
      localStorage.setItem(this.ROLE_KEY, JSON.stringify(roles));
      this.userRoles = roles;
    }
  }

  getStoredRoles() {
    const roles = localStorage.getItem(this.ROLE_KEY);
    return roles ? JSON.parse(roles) : [];
  }

  setPermissions(permissions) {
    if (permissions) {
      localStorage.setItem('itsm_user_permissions', JSON.stringify(permissions));
      this.permissions = permissions;
    }
  }

  getStoredPermissions() {
    const permissions = localStorage.getItem('itsm_user_permissions');
    return permissions ? JSON.parse(permissions) : [];
  }

  // Clear all authentication data
  clearAuthData() {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.ROLE_KEY);
    localStorage.removeItem('itsm_user_permissions');
    
    this.currentUser = null;
    this.userRoles = [];
    this.permissions = [];
  }

  /**
   * Get authorization header for API requests
   * @returns {Object} Authorization header
   */
  getAuthHeader() {
    const token = this.getAuthToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }

  /**
   * Check if user session is about to expire
   * @returns {boolean} Session expiry status
   */
  isSessionExpiring() {
    const token = this.getAuthToken();
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiryTime = payload.exp * 1000;
      const currentTime = Date.now();
      const timeToExpiry = expiryTime - currentTime;
      
      // Session is expiring if less than 5 minutes remaining
      return timeToExpiry < (5 * 60 * 1000);
    } catch (error) {
      console.error('Token parsing error:', error);
      return true;
    }
  }

  /**
   * Initialize authentication service
   */
  init() {
    // Check if user is already authenticated
    if (this.isAuthenticated()) {
      this.setupTokenRefresh();
      
      // Verify token validity on initialization
      this.verifyToken().then(isValid => {
        if (!isValid) {
          this.logout();
        }
      });
    }
  }
}

// Create and export singleton instance
const authService = new AuthService();

// Initialize on load
authService.init();

export default authService;