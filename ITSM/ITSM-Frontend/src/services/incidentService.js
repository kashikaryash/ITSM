// services/incidentService.js
import { apiClient, handleApiError } from './api';

class IncidentService {
  constructor() {
    this.baseEndpoint = '/incidents';
  }

  // Get all incidents with pagination and filters
  async getIncidents(params = {}) {
    try {
      const response = await apiClient.get(this.baseEndpoint, { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Get incident by ID
  async getIncidentById(id) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/${id}`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Create new incident
  async createIncident(incidentData) {
    try {
      const response = await apiClient.post(this.baseEndpoint, incidentData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Update incident
  async updateIncident(id, incidentData) {
    try {
      const response = await apiClient.put(`${this.baseEndpoint}/${id}`, incidentData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Delete incident
  async deleteIncident(id) {
    try {
      await apiClient.delete(`${this.baseEndpoint}/${id}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Assign incident to user
  async assignIncident(id, assigneeId) {
    try {
      const response = await apiClient.patch(`${this.baseEndpoint}/${id}/assign`, {
        assigneeId
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Update incident status
  async updateIncidentStatus(id, status, comment = '') {
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

  // Update incident priority
  async updateIncidentPriority(id, priority) {
    try {
      const response = await apiClient.patch(`${this.baseEndpoint}/${id}/priority`, {
        priority
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Add comment to incident
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

  // Get incident comments
  async getIncidentComments(id) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/${id}/comments`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Add attachment to incident
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

  // Get incident attachments
  async getIncidentAttachments(id) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/${id}/attachments`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Delete attachment
  async deleteAttachment(incidentId, attachmentId) {
    try {
      await apiClient.delete(`${this.baseEndpoint}/${incidentId}/attachments/${attachmentId}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Get incident history/timeline
  async getIncidentHistory(id) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/${id}/history`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Escalate incident
  async escalateIncident(id, escalationData) {
    try {
      const response = await apiClient.post(`${this.baseEndpoint}/${id}/escalate`, escalationData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Close incident
  async closeIncident(id, resolution) {
    try {
      const response = await apiClient.patch(`${this.baseEndpoint}/${id}/close`, {
        resolution
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Reopen incident
  async reopenIncident(id, reason) {
    try {
      const response = await apiClient.patch(`${this.baseEndpoint}/${id}/reopen`, {
        reason
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Get incident statistics
  async getIncidentStats(params = {}) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/stats`, { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Search incidents
  async searchIncidents(searchTerm, filters = {}) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/search`, {
        params: { q: searchTerm, ...filters }
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Get incidents assigned to current user
  async getMyIncidents(params = {}) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/my-incidents`, { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Get incidents created by current user
  async getMyReportedIncidents(params = {}) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/my-reported`, { params });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Bulk update incidents
  async bulkUpdateIncidents(incidentIds, updateData) {
    try {
      const response = await apiClient.patch(`${this.baseEndpoint}/bulk-update`, {
        incidentIds,
        updateData
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Export incidents
  async exportIncidents(params = {}) {
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

  // Get incident categories
  async getIncidentCategories() {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/categories`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }

  // Get incident subcategories
  async getIncidentSubcategories(categoryId) {
    try {
      const response = await apiClient.get(`${this.baseEndpoint}/categories/${categoryId}/subcategories`);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: handleApiError(error) };
    }
  }
}

export default new IncidentService();