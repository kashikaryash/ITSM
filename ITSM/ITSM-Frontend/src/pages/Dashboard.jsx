import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Activity, Users, AlertTriangle, Clock, TrendingUp, Calendar, FileText, CheckCircle } from 'lucide-react';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('7d');
  const [activeMetric, setActiveMetric] = useState('incidents');
  const [refreshCount, setRefreshCount] = useState(0);

  // Sample data for charts
  const weeklyData = [
    { name: 'Mon', incidents: 12, requests: 8, resolved: 15 },
    { name: 'Tue', incidents: 19, requests: 12, resolved: 18 },
    { name: 'Wed', incidents: 8, requests: 15, resolved: 20 },
    { name: 'Thu', incidents: 15, requests: 10, resolved: 12 },
    { name: 'Fri', incidents: 22, requests: 18, resolved: 25 },
    { name: 'Sat', incidents: 6, requests: 5, resolved: 8 },
    { name: 'Sun', incidents: 4, requests: 3, resolved: 6 }
  ];

  const statusData = [
    { name: 'Open', value: 35, color: '#ef4444' },
    { name: 'In Progress', value: 28, color: '#f59e0b' },
    { name: 'Resolved', value: 45, color: '#10b981' },
    { name: 'Closed', value: 62, color: '#6b7280' }
  ];

  const metrics = [
    {
      id: 'incidents',
      title: 'Total Incidents',
      value: '127',
      change: '+12%',
      trend: 'up',
      icon: AlertTriangle,
      color: 'red'
    },
    {
      id: 'requests',
      title: 'Service Requests',
      value: '89',
      change: '+8%',
      trend: 'up',
      icon: FileText,
      color: 'blue'
    },
    {
      id: 'resolved',
      title: 'Resolved Today',
      value: '34',
      change: '+15%',
      trend: 'up',
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: 'response',
      title: 'Avg Response Time',
      value: '2.3h',
      change: '-5%',
      trend: 'down',
      icon: Clock,
      color: 'purple'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'incident',
      title: 'Network outage in Building A',
      status: 'resolved',
      time: '2 hours ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'request',
      title: 'New software installation request',
      status: 'in-progress',
      time: '4 hours ago',
      priority: 'medium'
    },
    {
      id: 3,
      type: 'incident',
      title: 'Server maintenance completed',
      status: 'closed',
      time: '6 hours ago',
      priority: 'low'
    },
    {
      id: 4,
      type: 'request',
      title: 'Access request for new employee',
      status: 'open',
      time: '8 hours ago',
      priority: 'medium'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setRefreshCount(prev => prev + 1);
    }, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      'open': 'bg-red-100 text-red-800',
      'in-progress': 'bg-yellow-100 text-yellow-800',
      'resolved': 'bg-green-100 text-green-800',
      'closed': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'border-l-red-500',
      'medium': 'border-l-yellow-500',
      'low': 'border-l-green-500'
    };
    return colors[priority] || 'border-l-gray-500';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Overview of incidents and service requests
              {refreshCount > 0 && (
                <span className="ml-2 text-sm text-green-600">
                  • Live (Updated {refreshCount} times)
                </span>
              )}
            </p>
          </div>
          <div className="flex space-x-2">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="24h">Last 24 Hours</option>
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              Export Report
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.id}
                onClick={() => setActiveMetric(metric.id)}
                className={`bg-white rounded-xl p-6 shadow-sm border-2 cursor-pointer transition-all hover:shadow-md ${
                  activeMetric === metric.id ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-${metric.color}-100`}>
                    <Icon className={`h-6 w-6 text-${metric.color}-600`} />
                  </div>
                </div>
                <div className="flex items-center mt-4">
                  <TrendingUp className={`h-4 w-4 mr-1 ${
                    metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`} />
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.change}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">vs last week</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Trends */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Weekly Trends</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="incidents" fill="#ef4444" name="Incidents" />
                <Bar dataKey="requests" fill="#3b82f6" name="Requests" />
                <Bar dataKey="resolved" fill="#10b981" name="Resolved" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {statusData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className={`border-l-4 pl-4 py-3 ${getPriorityColor(activity.priority)}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{activity.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{activity.time}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(activity.status)}`}>
                      {activity.status.replace('-', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      activity.priority === 'high' ? 'bg-red-100 text-red-800' :
                      activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {activity.priority}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;