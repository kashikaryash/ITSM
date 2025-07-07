import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Download, Filter, Calendar, TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react';

const Reports = () => {
  const [selectedReport, setSelectedReport] = useState('sales');
  const [dateRange, setDateRange] = useState('7d');

  // Sample data for different reports - wrapped in useMemo to prevent re-creation
  const salesData = useMemo(() => [
    { month: 'Jan', sales: 12000, orders: 120, customers: 89 },
    { month: 'Feb', sales: 15000, orders: 145, customers: 102 },
    { month: 'Mar', sales: 18000, orders: 178, customers: 134 },
    { month: 'Apr', sales: 22000, orders: 198, customers: 156 },
    { month: 'May', sales: 19000, orders: 167, customers: 143 },
    { month: 'Jun', sales: 25000, orders: 234, customers: 189 }
  ], []);

  const productData = useMemo(() => [
    { name: 'Electronics', value: 35, sales: 45000 },
    { name: 'Clothing', value: 25, sales: 32000 },
    { name: 'Books', value: 20, sales: 25000 },
    { name: 'Home & Garden', value: 15, sales: 19000 },
    { name: 'Sports', value: 5, sales: 8000 }
  ], []);

  const customerData = useMemo(() => [
    { segment: 'New', count: 234, percentage: 45 },
    { segment: 'Returning', count: 156, percentage: 30 },
    { segment: 'VIP', count: 89, percentage: 17 },
    { segment: 'Inactive', count: 43, percentage: 8 }
  ], []);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const reportTypes = [
    { id: 'sales', name: 'Sales Report', icon: DollarSign },
    { id: 'products', name: 'Product Performance', icon: ShoppingCart },
    { id: 'customers', name: 'Customer Analytics', icon: Users },
    { id: 'trends', name: 'Trend Analysis', icon: TrendingUp }
  ];

  const dateRanges = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' }
  ];

  const kpiCards = useMemo(() => {
    const totalSales = salesData.reduce((sum, item) => sum + item.sales, 0);
    const totalOrders = salesData.reduce((sum, item) => sum + item.orders, 0);
    const totalCustomers = salesData.reduce((sum, item) => sum + item.customers, 0);
    const avgOrderValue = totalSales / totalOrders;

    return [
      { title: 'Total Sales', value: `$${totalSales.toLocaleString()}`, change: '+12.5%', positive: true },
      { title: 'Total Orders', value: totalOrders.toLocaleString(), change: '+8.2%', positive: true },
      { title: 'Customers', value: totalCustomers.toLocaleString(), change: '+15.3%', positive: true },
      { title: 'Avg Order Value', value: `$${Math.round(avgOrderValue)}`, change: '+4.1%', positive: true }
    ];
  }, [salesData]);

  const handleExport = () => {
    const dataStr = JSON.stringify(salesData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedReport}-report-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const renderChart = () => {
    switch (selectedReport) {
      case 'sales':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#3b82f6" name="Sales ($)" />
              <Bar dataKey="orders" fill="#10b981" name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'products':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={productData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} ${percentage}%`}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {productData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        );
      case 'customers':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={customerData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="segment" type="category" />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        );
      case 'trends':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#3b82f6" strokeWidth={2} />
              <Line type="monotone" dataKey="customers" stroke="#10b981" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Reports Dashboard</h1>
          <p className="text-gray-600">Comprehensive analytics and reporting for your business</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={selectedReport}
                  onChange={(e) => setSelectedReport(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {reportTypes.map((type) => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {dateRanges.map((range) => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleExport}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export Data
            </button>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {kpiCards.map((kpi, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                </div>
                <div className={`text-sm font-medium ${kpi.positive ? 'text-green-600' : 'text-red-600'}`}>
                  {kpi.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Report Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {reportTypes.map((type) => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setSelectedReport(type.id)}
                    className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      selectedReport === type.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {type.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            <div className="mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                {reportTypes.find(type => type.id === selectedReport)?.name}
              </h2>
              <p className="text-gray-600">
                {selectedReport === 'sales' && 'Track your sales performance and revenue trends'}
                {selectedReport === 'products' && 'Analyze product performance and category distribution'}
                {selectedReport === 'customers' && 'Understand your customer base and segments'}
                {selectedReport === 'trends' && 'Identify patterns and trends in your data'}
              </p>
            </div>
            {renderChart()}
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Detailed Data</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {selectedReport === 'sales' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Month</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customers</th>
                    </>
                  )}
                  {selectedReport === 'products' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sales</th>
                    </>
                  )}
                  {selectedReport === 'customers' && (
                    <>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Segment</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Percentage</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {selectedReport === 'sales' && salesData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.month}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${row.sales.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.orders}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.customers}</td>
                  </tr>
                ))}
                {selectedReport === 'products' && productData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.value}%</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${row.sales.toLocaleString()}</td>
                  </tr>
                ))}
                {selectedReport === 'customers' && customerData.map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.segment}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.count}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{row.percentage}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;