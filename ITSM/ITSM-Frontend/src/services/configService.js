// configService.js
// Configuration service for ITSM tool - handles all system configurations

class ConfigService {
  constructor() {
    this.config = {
      // System-wide configurations
      system: {
        applicationName: 'ITSM Portal',
        version: '1.0.0',
        supportEmail: 'support@company.com',
        timezone: 'UTC',
        dateFormat: 'YYYY-MM-DD',
        timeFormat: '24h',
        sessionTimeout: 30, // minutes
        maxFileUploadSize: 10, // MB
        allowedFileTypes: ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx', 'xls', 'xlsx'],
        enableNotifications: true,
        enableEmailNotifications: true,
        enableSMSNotifications: false
      },

      // Incident Management Configuration
      incident: {
        statuses: [
          { id: 1, name: 'New', color: '#3b82f6', isActive: true, order: 1 },
          { id: 2, name: 'Assigned', color: '#f59e0b', isActive: true, order: 2 },
          { id: 3, name: 'In Progress', color: '#10b981', isActive: true, order: 3 },
          { id: 4, name: 'Pending', color: '#f97316', isActive: true, order: 4 },
          { id: 5, name: 'Resolved', color: '#22c55e', isActive: true, order: 5 },
          { id: 6, name: 'Closed', color: '#6b7280', isActive: true, order: 6 },
          { id: 7, name: 'Cancelled', color: '#ef4444', isActive: true, order: 7 }
        ],
        priorities: [
          { id: 1, name: 'Critical', color: '#dc2626', weight: 1, slaHours: 2, isActive: true },
          { id: 2, name: 'High', color: '#ea580c', weight: 2, slaHours: 8, isActive: true },
          { id: 3, name: 'Medium', color: '#ca8a04', weight: 3, slaHours: 24, isActive: true },
          { id: 4, name: 'Low', color: '#16a34a', weight: 4, slaHours: 72, isActive: true }
        ],
        impacts: [
          { id: 1, name: 'High', description: 'Affects multiple users/departments', weight: 1, isActive: true },
          { id: 2, name: 'Medium', description: 'Affects single user/department', weight: 2, isActive: true },
          { id: 3, name: 'Low', description: 'Minimal impact', weight: 3, isActive: true }
        ],
        urgencies: [
          { id: 1, name: 'High', description: 'Immediate attention required', weight: 1, isActive: true },
          { id: 2, name: 'Medium', description: 'Normal timeline', weight: 2, isActive: true },
          { id: 3, name: 'Low', description: 'Can wait', weight: 3, isActive: true }
        ],
        categories: [
          { 
            id: 1, 
            name: 'Hardware', 
            subcategories: [
              { id: 101, name: 'Desktop/Laptop', parentId: 1 },
              { id: 102, name: 'Printer', parentId: 1 },
              { id: 103, name: 'Network Equipment', parentId: 1 },
              { id: 104, name: 'Server', parentId: 1 }
            ],
            isActive: true 
          },
          { 
            id: 2, 
            name: 'Software', 
            subcategories: [
              { id: 201, name: 'Operating System', parentId: 2 },
              { id: 202, name: 'Application Software', parentId: 2 },
              { id: 203, name: 'Antivirus', parentId: 2 },
              { id: 204, name: 'Email', parentId: 2 }
            ],
            isActive: true 
          },
          { 
            id: 3, 
            name: 'Network', 
            subcategories: [
              { id: 301, name: 'Internet Connectivity', parentId: 3 },
              { id: 302, name: 'VPN', parentId: 3 },
              { id: 303, name: 'WiFi', parentId: 3 },
              { id: 304, name: 'Firewall', parentId: 3 }
            ],
            isActive: true 
          }
        ],
        resolutionCodes: [
          { id: 1, name: 'Resolved - Fixed', description: 'Issue was resolved by fixing the problem', isActive: true },
          { id: 2, name: 'Resolved - Workaround', description: 'Issue was resolved with a workaround', isActive: true },
          { id: 3, name: 'Resolved - User Training', description: 'Issue was resolved through user training', isActive: true },
          { id: 4, name: 'Resolved - Hardware Replacement', description: 'Issue was resolved by replacing hardware', isActive: true },
          { id: 5, name: 'Resolved - Software Update', description: 'Issue was resolved through software update', isActive: true }
        ],
        pendingReasons: [
          { id: 1, name: 'Waiting for User Response', isActive: true },
          { id: 2, name: 'Waiting for Vendor', isActive: true },
          { id: 3, name: 'Waiting for Hardware', isActive: true },
          { id: 4, name: 'Waiting for Software License', isActive: true },
          { id: 5, name: 'Waiting for Manager Approval', isActive: true },
          { id: 6, name: 'Scheduled Maintenance', isActive: true }
        ],
        autoAssignmentRules: [
          { 
            id: 1, 
            name: 'Hardware Issues', 
            conditions: { category: 'Hardware' }, 
            assignTo: 'Hardware Team',
            isActive: true 
          },
          { 
            id: 2, 
            name: 'Software Issues', 
            conditions: { category: 'Software' }, 
            assignTo: 'Software Team',
            isActive: true 
          }
        ],
        escalationRules: [
          { 
            id: 1, 
            name: 'Critical Priority Escalation', 
            conditions: { priority: 'Critical', timeThreshold: 1 }, 
            action: 'escalate_to_manager',
            isActive: true 
          },
          { 
            id: 2, 
            name: 'High Priority Escalation', 
            conditions: { priority: 'High', timeThreshold: 4 }, 
            action: 'escalate_to_manager',
            isActive: true 
          }
        ]
      },

      // Service Request Configuration
      serviceRequest: {
        categories: [
          { id: 1, name: 'Access Request', description: 'Request for system access', isActive: true },
          { id: 2, name: 'Hardware Request', description: 'Request for hardware equipment', isActive: true },
          { id: 3, name: 'Software Request', description: 'Request for software installation', isActive: true },
          { id: 4, name: 'Account Management', description: 'User account related requests', isActive: true }
        ],
        approvalLevels: [
          { id: 1, name: 'Manager Approval', description: 'Direct manager approval required', isActive: true },
          { id: 2, name: 'IT Manager Approval', description: 'IT manager approval required', isActive: true },
          { id: 3, name: 'Finance Approval', description: 'Finance team approval required', isActive: true },
          { id: 4, name: 'Security Approval', description: 'Security team approval required', isActive: true },
          { id: 5, name: 'Executive Approval', description: 'Executive approval required', isActive: true }
        ],
        formFields: [
          { id: 1, name: 'text', label: 'Text Field', type: 'text', isRequired: false, isActive: true },
          { id: 2, name: 'textarea', label: 'Text Area', type: 'textarea', isRequired: false, isActive: true },
          { id: 3, name: 'dropdown', label: 'Dropdown', type: 'select', isRequired: false, isActive: true },
          { id: 4, name: 'radio', label: 'Radio Button', type: 'radio', isRequired: false, isActive: true },
          { id: 5, name: 'checkbox', label: 'Checkbox', type: 'checkbox', isRequired: false, isActive: true },
          { id: 6, name: 'date', label: 'Date Field', type: 'date', isRequired: false, isActive: true },
          { id: 7, name: 'number', label: 'Number Field', type: 'number', isRequired: false, isActive: true },
          { id: 8, name: 'email', label: 'Email Field', type: 'email', isRequired: false, isActive: true },
          { id: 9, name: 'file', label: 'File Upload', type: 'file', isRequired: false, isActive: true }
        ]
      },

      // Change Management Configuration
      change: {
        types: [
          { id: 1, name: 'Standard', description: 'Pre-approved changes', riskLevel: 'Low', isActive: true },
          { id: 2, name: 'Normal', description: 'Regular changes requiring approval', riskLevel: 'Medium', isActive: true },
          { id: 3, name: 'Emergency', description: 'Urgent changes', riskLevel: 'High', isActive: true }
        ],
        riskLevels: [
          { id: 1, name: 'Low', color: '#16a34a', description: 'Minimal risk', isActive: true },
          { id: 2, name: 'Medium', color: '#ca8a04', description: 'Moderate risk', isActive: true },
          { id: 3, name: 'High', color: '#dc2626', description: 'High risk', isActive: true }
        ],
        approvalWorkflow: [
          { id: 1, name: 'Technical Review', approver: 'technical_team', isRequired: true },
          { id: 2, name: 'Business Review', approver: 'business_owner', isRequired: true },
          { id: 3, name: 'CAB Review', approver: 'change_advisory_board', isRequired: false },
          { id: 4, name: 'Final Approval', approver: 'change_manager', isRequired: true }
        ]
      },

      // Asset Management Configuration
      asset: {
        types: [
          { id: 1, name: 'Hardware', description: 'Physical equipment', isActive: true },
          { id: 2, name: 'Software', description: 'Software applications', isActive: true },
          { id: 3, name: 'Network', description: 'Network equipment', isActive: true },
          { id: 4, name: 'Mobile', description: 'Mobile devices', isActive: true }
        ],
        statuses: [
          { id: 1, name: 'Active', color: '#16a34a', isActive: true },
          { id: 2, name: 'Inactive', color: '#6b7280', isActive: true },
          { id: 3, name: 'Maintenance', color: '#f59e0b', isActive: true },
          { id: 4, name: 'Retired', color: '#dc2626', isActive: true },
          { id: 5, name: 'Disposed', color: '#7c3aed', isActive: true }
        ],
        locations: [
          { id: 1, name: 'Headquarters', address: '123 Main St', city: 'New York', isActive: true },
          { id: 2, name: 'Branch Office', address: '456 Oak Ave', city: 'Chicago', isActive: true },
          { id: 3, name: 'Remote Location', address: 'Various', city: 'Remote', isActive: true }
        ]
      },

      // Knowledge Management Configuration
      knowledge: {
        categories: [
          { id: 1, name: 'How-to Guides', description: 'Step by step instructions', isActive: true },
          { id: 2, name: 'Troubleshooting', description: 'Problem resolution guides', isActive: true },
          { id: 3, name: 'FAQs', description: 'Frequently asked questions', isActive: true },
          { id: 4, name: 'Policies', description: 'Company policies and procedures', isActive: true }
        ],
        articleStatus: [
          { id: 1, name: 'Draft', color: '#6b7280', isActive: true },
          { id: 2, name: 'Under Review', color: '#f59e0b', isActive: true },
          { id: 3, name: 'Published', color: '#16a34a', isActive: true },
          { id: 4, name: 'Archived', color: '#dc2626', isActive: true }
        ]
      },

      // Notification Configuration
      notifications: {
        emailTemplates: [
          { id: 1, name: 'Incident Created', subject: 'New Incident Created: {{ticketId}}', isActive: true },
          { id: 2, name: 'Incident Assigned', subject: 'Incident Assigned: {{ticketId}}', isActive: true },
          { id: 3, name: 'Incident Resolved', subject: 'Incident Resolved: {{ticketId}}', isActive: true },
          { id: 4, name: 'Service Request Approved', subject: 'Service Request Approved: {{requestId}}', isActive: true }
        ],
        triggers: [
          { id: 1, name: 'Incident Created', event: 'incident.created', isActive: true },
          { id: 2, name: 'Incident Assigned', event: 'incident.assigned', isActive: true },
          { id: 3, name: 'Incident Escalated', event: 'incident.escalated', isActive: true },
          { id: 4, name: 'SLA Breach Warning', event: 'sla.warning', isActive: true }
        ]
      },

      // SLA Configuration
      sla: {
        businessHours: {
          monday: { start: '09:00', end: '17:00', isWorkingDay: true },
          tuesday: { start: '09:00', end: '17:00', isWorkingDay: true },
          wednesday: { start: '09:00', end: '17:00', isWorkingDay: true },
          thursday: { start: '09:00', end: '17:00', isWorkingDay: true },
          friday: { start: '09:00', end: '17:00', isWorkingDay: true },
          saturday: { start: '09:00', end: '13:00', isWorkingDay: false },
          sunday: { start: '09:00', end: '13:00', isWorkingDay: false }
        },
        holidays: [
          { id: 1, name: 'New Year Day', date: '2024-01-01', isActive: true },
          { id: 2, name: 'Independence Day', date: '2024-07-04', isActive: true },
          { id: 3, name: 'Christmas Day', date: '2024-12-25', isActive: true }
        ],
        metrics: [
          { id: 1, name: 'Response Time', description: 'Time to first response', isActive: true },
          { id: 2, name: 'Resolution Time', description: 'Time to resolution', isActive: true },
          { id: 3, name: 'Customer Satisfaction', description: 'Customer satisfaction score', isActive: true }
        ]
      },

      // Integration Configuration
      integrations: {
        activeDirectory: {
          enabled: true,
          server: 'ldap://ad.company.com',
          port: 389,
          baseDN: 'DC=company,DC=com',
          syncInterval: 24, // hours
          isSecure: true
        },
        email: {
          enabled: true,
          smtpServer: 'smtp.company.com',
          smtpPort: 587,
          username: 'itsm@company.com',
          isSecure: true,
          fromAddress: 'itsm@company.com'
        },
        sso: {
          enabled: false,
          provider: 'SAML',
          identityProvider: '',
          certificatePath: ''
        }
      }
    };

    // Initialize from localStorage if available
    this.loadConfig();
  }

  // Load configuration from localStorage
  loadConfig() {
    try {
      const savedConfig = localStorage.getItem('itsm_config');
      if (savedConfig) {
        this.config = { ...this.config, ...JSON.parse(savedConfig) };
      }
    } catch (error) {
      console.error('Error loading configuration:', error);
    }
  }

  // Save configuration to localStorage
  saveConfig() {
    try {
      localStorage.setItem('itsm_config', JSON.stringify(this.config));
      return { success: true, message: 'Configuration saved successfully' };
    } catch (error) {
      console.error('Error saving configuration:', error);
      return { success: false, message: 'Error saving configuration' };
    }
  }

  // Get full configuration
  getConfig() {
    return this.config;
  }

  // Get specific configuration section
  getConfigSection(section) {
    return this.config[section] || {};
  }

  // Update configuration section
  updateConfigSection(section, data) {
    if (this.config[section]) {
      this.config[section] = { ...this.config[section], ...data };
      return this.saveConfig();
    }
    return { success: false, message: 'Invalid configuration section' };
  }

  // Incident Configuration Methods
  getIncidentStatuses() {
    return this.config.incident.statuses.filter(status => status.isActive);
  }

  addIncidentStatus(status) {
    const newStatus = {
      id: Date.now(),
      ...status,
      isActive: true,
      order: this.config.incident.statuses.length + 1
    };
    this.config.incident.statuses.push(newStatus);
    this.saveConfig();
    return newStatus;
  }

  updateIncidentStatus(id, updates) {
    const index = this.config.incident.statuses.findIndex(s => s.id === id);
    if (index !== -1) {
      this.config.incident.statuses[index] = { ...this.config.incident.statuses[index], ...updates };
      this.saveConfig();
      return this.config.incident.statuses[index];
    }
    return null;
  }

  deleteIncidentStatus(id) {
    this.config.incident.statuses = this.config.incident.statuses.filter(s => s.id !== id);
    this.saveConfig();
  }

  // Priority Configuration Methods
  getPriorities() {
    return this.config.incident.priorities.filter(priority => priority.isActive);
  }

  addPriority(priority) {
    const newPriority = {
      id: Date.now(),
      ...priority,
      isActive: true
    };
    this.config.incident.priorities.push(newPriority);
    this.saveConfig();
    return newPriority;
  }

  updatePriority(id, updates) {
    const index = this.config.incident.priorities.findIndex(p => p.id === id);
    if (index !== -1) {
      this.config.incident.priorities[index] = { ...this.config.incident.priorities[index], ...updates };
      this.saveConfig();
      return this.config.incident.priorities[index];
    }
    return null;
  }

  // Category Configuration Methods
  getCategories() {
    return this.config.incident.categories.filter(category => category.isActive);
  }

  addCategory(category) {
    const newCategory = {
      id: Date.now(),
      ...category,
      subcategories: category.subcategories || [],
      isActive: true
    };
    this.config.incident.categories.push(newCategory);
    this.saveConfig();
    return newCategory;
  }

  addSubcategory(parentId, subcategory) {
    const parentIndex = this.config.incident.categories.findIndex(c => c.id === parentId);
    if (parentIndex !== -1) {
      const newSubcategory = {
        id: Date.now(),
        ...subcategory,
        parentId: parentId
      };
      this.config.incident.categories[parentIndex].subcategories.push(newSubcategory);
      this.saveConfig();
      return newSubcategory;
    }
    return null;
  }

  // Resolution Code Methods
  getResolutionCodes() {
    return this.config.incident.resolutionCodes.filter(code => code.isActive);
  }

  addResolutionCode(code) {
    const newCode = {
      id: Date.now(),
      ...code,
      isActive: true
    };
    this.config.incident.resolutionCodes.push(newCode);
    this.saveConfig();
    return newCode;
  }

  // Pending Reason Methods
  getPendingReasons() {
    return this.config.incident.pendingReasons.filter(reason => reason.isActive);
  }

  addPendingReason(reason) {
    const newReason = {
      id: Date.now(),
      ...reason,
      isActive: true
    };
    this.config.incident.pendingReasons.push(newReason);
    this.saveConfig();
    return newReason;
  }

  // Service Request Configuration Methods
  getServiceRequestCategories() {
    return this.config.serviceRequest.categories.filter(category => category.isActive);
  }

  getFormFields() {
    return this.config.serviceRequest.formFields.filter(field => field.isActive);
  }

  addFormField(field) {
    const newField = {
      id: Date.now(),
      ...field,
      isActive: true
    };
    this.config.serviceRequest.formFields.push(newField);
    this.saveConfig();
    return newField;
  }

  // System Configuration Methods
  getSystemConfig() {
    return this.config.system;
  }

  updateSystemConfig(updates) {
    this.config.system = { ...this.config.system, ...updates };
    return this.saveConfig();
  }

  // SLA Configuration Methods
  getSLAConfig() {
    return this.config.sla;
  }

  updateSLAConfig(updates) {
    this.config.sla = { ...this.config.sla, ...updates };
    return this.saveConfig();
  }

  // Integration Configuration Methods
  getIntegrationConfig() {
    return this.config.integrations;
  }

  updateIntegrationConfig(integration, updates) {
    if (this.config.integrations[integration]) {
      this.config.integrations[integration] = { ...this.config.integrations[integration], ...updates };
      return this.saveConfig();
    }
    return { success: false, message: 'Invalid integration type' };
  }

  // Validation Methods
  validateConfiguration() {
    const errors = [];

    // Validate required system settings
    if (!this.config.system.applicationName) {
      errors.push('Application name is required');
    }

    // Validate incident configuration
    if (this.config.incident.statuses.length === 0) {
      errors.push('At least one incident status must be configured');
    }

    if (this.config.incident.priorities.length === 0) {
      errors.push('At least one priority must be configured');
    }

    return {
      isValid: errors.length === 0,
      errors: errors
    };
  }

  // Export configuration
  exportConfiguration() {
    return JSON.stringify(this.config, null, 2);
  }

  // Import configuration
  importConfiguration(configData) {
    try {
      const importedConfig = JSON.parse(configData);
      // Validate imported configuration
      const validation = this.validateConfiguration();
      if (validation.isValid) {
        this.config = { ...this.config, ...importedConfig };
        this.saveConfig();
        return { success: true, message: 'Configuration imported successfully' };
      } else {
        return { success: false, message: 'Invalid configuration', errors: validation.errors };
      }
    } catch (error) {
  console.error('Error saving configuration:', error);
  return { success: false, message: 'Error saving configuration' };
}
  }

  // Reset configuration to defaults
  resetConfiguration() {
    localStorage.removeItem('itsm_config');
    this.loadConfig();
    return { success: true, message: 'Configuration reset to defaults' };
  }
}

// Export singleton instance
export default new ConfigService();