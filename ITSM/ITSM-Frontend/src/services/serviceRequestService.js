// services/serviceRequestService.js
import { apiClient, handleApiError } from './api';

class ServiceRequestService {
  constructor() {
    this.baseEndpoint = '/service-requests';
  }

  // Get all service requests with pagination and filters
  async getServiceRequests(params = {}) {
    try {
      const response = await apiClient.get(this.baseEndpoint, { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Get service request by ID
  async getServiceRequestById(id) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Create new service request
  async createServiceRequest(requestData) {
    try {
      const response = await apiClient.post(this.baseEndpoint, requestData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Update service request
  async updateServiceRequest(id, requestData) {
    try {
      const response = await apiClient.put(`${this.baseEndpoint}/${id}`, requestData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Delete service request
  async deleteServiceRequest(id) {
    try {
      await apiClient.delete(`${this.baseEndpoint}/${id}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Assign service request to user
  async assignServiceRequest(id, assigneeId) {
    try {
      const response = await apiClient.patch(`${this.baseEndpoint}/${id}/assign`, {
        assigneeId
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Update service request status
  async updateServiceRequestStatus(id, status, comment = '') {
    try {
      const response = await apiClient.patch(`${this.baseEndpoint}/${id}/status`, {
        status,
        comment
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Update service request priority
  async updateServiceRequestPriority(id, priority) {
    try {
      const response = await apiClient.patch(`${this.baseEndpoint}/${id}/priority`, {
        priority
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Add comment to service request
  async addComment(id, comment) {
    try {
      const response = await apiClient.post(`${this.baseEndpoint}/${id}/comments`, {
        comment
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Get service request comments
  async getServiceRequestComments(id) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/${id}/comments`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Add attachment to service request
  async addAttachment(id, file) {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await apiClient.post(
        `${this.baseEndpoint}/${id}/attachments`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Get service request attachments
  async getServiceRequestAttachments(id) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/${id}/attachments`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Delete attachment
  async deleteAttachment(requestId, attachmentId) {
    try {
      await apiClient.delete(`${this.baseEndpoint}/${requestId}/attachments/${attachmentId}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Get service request history/timeline
  async getServiceRequestHistory(id) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/${id}/history`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Approve service request
  async approveServiceRequest(id, approvalData) {
    try {
      const response = await apiClient.post(`${this.baseEndpoint}/${id}/approve`, approvalData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Reject service request
  async rejectServiceRequest(id, rejectionData) {
    try {
      const response = await apiClient.post(`${this.baseEndpoint}/${id}/reject`, rejectionData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Complete service request
  async completeServiceRequest(id, completionData) {
    try {
      const response = await apiClient.patch(`${this.baseEndpoint}/${id}/complete`, completionData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Cancel service request
  async cancelServiceRequest(id, reason) {
    try {
      const response = await apiClient.patch(`${this.baseEndpoint}/${id}/cancel`, {
        reason
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Get service request statistics
  async getServiceRequestStats(params = {}) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/stats`, { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Search service requests
  async searchServiceRequests(searchTerm, filters = {}) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/search`, {
        params: { q: searchTerm, ...filters }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Get service requests assigned to current user
  async getMyServiceRequests(params = {}) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/my-requests`, { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Get service requests created by current user
  async getMySubmittedRequests(params = {}) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/my-submitted`, { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Get pending approvals for current user
  async getPendingApprovals(params = {}) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/pending-approvals`, { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Bulk update service requests
  async bulkUpdateServiceRequests(requestIds, updateData) {
    try {
      const response = await apiClient.patch(`${this.baseEndpoint}/bulk-update`, {
        requestIds,
        updateData
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Export service requests
  async exportServiceRequests(params = {}) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/export`, {
        params,
        responseType: 'blob'
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Get service catalog
  async getServiceCatalog() {
    try {
      const response = await apiClient.get('/service-catalog');
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Get service catalog item
  async getServiceCatalogItem(id) {
    try {
      const response = await apiClient.get(`/service-catalog/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Get service request templates
  async getServiceRequestTemplates(categoryId = null) {
    try {
      const params = categoryId ? { categoryId } : {};
      const response = await apiClient.get(`${this.baseEndpoint}/templates`, { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Get service request template by ID
  async getServiceRequestTemplate(id) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/templates/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Create service request from template
  async createFromTemplate(templateId, requestData) {
    try {
      const response = await apiClient.post(`${this.baseEndpoint}/from-template/${templateId}`, requestData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Rate service request fulfillment
  async rateServiceRequest(id, rating, feedback = '') {
    try {
      const response = await apiClient.post(`${this.baseEndpoint}/${id}/rate`, {
        rating,
        feedback
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }
}

export default new ServiceRequestService();