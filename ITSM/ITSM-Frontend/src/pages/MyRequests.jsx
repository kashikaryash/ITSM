import React, { useState } from 'react';
// My Requests Component
const MyRequests = () => {
  const [requests,] = useState([
    { id: 'REQ-001', title: 'Software Installation - Adobe Creative Suite', status: 'Pending Approval', submitted: '2024-01-15', type: 'Service Request' },
    { id: 'REQ-002', title: 'Hardware Request - New Laptop', status: 'Approved', submitted: '2024-01-14', type: 'Service Request' },
    { id: 'INC-001', title: 'Network connectivity issue', status: 'In Progress', submitted: '2024-01-13', type: 'Incident' }
  ]);

  const [activeTab, setActiveTab] = useState('all');

  const filteredRequests = requests.filter(request => {
    if (activeTab === 'all') return true;
    if (activeTab === 'incidents') return request.type === 'Incident';
    if (activeTab === 'requests') return request.type === 'Service Request';
    return true;
  });

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">My Requests</h2>
      
      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'all', label: 'All Requests' },
              { id: 'requests', label: 'Service Requests' },
              { id: 'incidents', label: 'Incidents' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Requests List */}
        <div className="divide-y divide-gray-200">
          {filteredRequests.map(request => (
            <div key={request.id} className="p-6 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">{request.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {request.id} • Submitted on {request.submitted}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        request.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        request.status === 'Pending Approval' ? 'bg-yellow-100 text-yellow-800' :
                        request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {request.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        request.type === 'Incident' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {request.type}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center space-x-4">
                    <button className="text-blue-600 hover:text-blue-900 text-sm font-medium">
                      View Details
                    </button>
                    <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                      Add Comment
                    </button>
                    {request.status === 'Pending Approval' && (
                      <button className="text-red-600 hover:text-red-900 text-sm font-medium">
                        Cancel Request
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredRequests.length === 0 && (
          <div className="p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No requests found</h3>
            <p className="mt-1 text-sm text-gray-500">
              You haven't submitted any {activeTab === 'all' ? 'requests' : activeTab} yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

// Reports Component
const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('incidents');
  const [dateRange, setDateRange] = useState('last30days');
  
  const reportTypes = [
    { id: 'incidents', label: 'Incident Report', description: 'Summary of all incidents by status, priority, and category' },
    { id: 'requests', label: 'Service Request Report', description: 'Analysis of service requests and approval times' },
    { id: 'performance', label: 'Performance Report', description: 'SLA compliance and resolution times' },
    { id: 'user', label: 'User Activity Report', description: 'User engagement and request patterns' }
  ];

  const sampleData = {
    incidents: {
      total: 45,
      resolved: 32,
      pending: 8,
      inProgress: 5,
      byPriority: { Critical: 3, High: 12, Medium: 20, Low: 10 },
      avgResolutionTime: '2.3 days'
    },
    requests: {
      total: 78,
      approved: 65,
      pending: 8,
      rejected: 5,
      avgApprovalTime: '1.8 days',
      popularCategories: { 'Software': 35, 'Hardware': 25, 'Access': 18 }
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-gray-900">Reports & Analytics</h2>
      
      {/* Report Controls */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Generate Report</h3>
          <div className="flex items-center space-x-4">
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2"
            >
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last90days">Last 90 Days</option>
              <option value="thisyear">This Year</option>
            </select>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Export PDF
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reportTypes.map(report => (
            <div
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                selectedReport === report.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <h4 className="font-medium text-gray-900">{report.label}</h4>
              <p className="text-sm text-gray-600 mt-1">{report.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Report Results */}
      {selectedReport === 'incidents' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Total Incidents</h3>
            <p className="text-3xl font-bold text-blue-600">{sampleData.incidents.total}</p>
            <p className="text-sm text-gray-500 mt-1">Last 30 days</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Resolved</h3>
            <p className="text-3xl font-bold text-green-600">{sampleData.incidents.resolved}</p>
            <p className="text-sm text-gray-500 mt-1">{Math.round((sampleData.incidents.resolved / sampleData.incidents.total) * 100)}% resolution rate</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">In Progress</h3>
            <p className="text-3xl font-bold text-yellow-600">{sampleData.incidents.inProgress}</p>
            <p className="text-sm text-gray-500 mt-1">Active incidents</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-2">Avg Resolution</h3>
            <p className="text-3xl font-bold text-purple-600">{sampleData.incidents.avgResolutionTime}</p>
            <p className="text-sm text-gray-500 mt-1">Average time</p>
          </div>
        </div>
      )}

      {selectedReport === 'requests' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Service Request Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Requests:</span>
                <span className="font-medium">{sampleData.requests.total}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Approved:</span>
                <span className="font-medium text-green-600">{sampleData.requests.approved}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pending:</span>
                <span className="font-medium text-yellow-600">{sampleData.requests.pending}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rejected:</span>
                <span className="font-medium text-red-600">{sampleData.requests.rejected}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Avg Approval Time:</span>
                <span className="font-medium">{sampleData.requests.avgApprovalTime}</span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Categories</h3>
            <div className="space-y-3">
              {Object.entries(sampleData.requests.popularCategories).map(([category, count]) => (
                <div key={category} className="flex items-center justify-between">
                  <span className="text-gray-600">{category}:</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(count / sampleData.requests.total) * 100}%` }}
                      ></div>
                    </div>
                    <span className="font-medium text-sm w-8">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {(selectedReport === 'performance' || selectedReport === 'user') && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Report Coming Soon</h3>
          <p className="text-gray-600">
            The {reportTypes.find(r => r.id === selectedReport)?.label} is currently being developed.
          </p>
        </div>
      )}
    </div>
  );
};
export default MyRequests;