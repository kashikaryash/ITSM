import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Download, 
  Search, 
  Shield,
  UserPlus,X
} from 'lucide-react';

const UserServicePage = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'john.doe',
      email: 'john.doe@company.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'End User',
      workgroup: 'IT Support',
      status: 'Active',
      lastLogin: '2024-01-15',
      createdDate: '2024-01-01'
    },
    {
      id: 2,
      username: 'jane.smith',
      email: 'jane.smith@company.com',
      firstName: 'Jane',
      lastName: 'Smith',
      role: 'Analyst',
      workgroup: 'Network Team',
      status: 'Active',
      lastLogin: '2024-01-14',
      createdDate: '2024-01-02'
    },
    {
      id: 3,
      username: 'mike.johnson',
      email: 'mike.johnson@company.com',
      firstName: 'Mike',
      lastName: 'Johnson',
      role: 'Administrator',
      workgroup: 'Admin',
      status: 'Inactive',
      lastLogin: '2024-01-10',
      createdDate: '2024-01-03'
    }
  ]);

  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'End User',
      description: 'Basic user with limited access',
      permissions: ['View Own Tickets', 'Create Service Requests'],
      userCount: 150
    },
    {
      id: 2,
      name: 'Analyst',
      description: 'Support analyst with ticket management access',
      permissions: ['View All Tickets', 'Update Tickets', 'Create Knowledge Articles'],
      userCount: 25
    },
    {
      id: 3,
      name: 'Administrator',
      description: 'Full system administrator access',
      permissions: ['Full Access', 'User Management', 'System Configuration'],
      userCount: 5
    }
  ]);

  const [workgroups, setWorkgroups] = useState([
    {
      id: 1,
      name: 'IT Support',
      description: 'General IT support team',
      members: ['john.doe', 'jane.smith'],
      lead: 'jane.smith'
    },
    {
      id: 2,
      name: 'Network Team',
      description: 'Network infrastructure team',
      members: ['mike.johnson'],
      lead: 'mike.johnson'
    },
    {
      id: 3,
      name: 'Admin',
      description: 'System administrators',
      members: ['mike.johnson'],
      lead: 'mike.johnson'
    }
  ]);

  const [showUserModal, setShowUserModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showWorkgroupModal, setShowWorkgroupModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [editingRole, setEditingRole] = useState(null);
  const [editingWorkgroup, setEditingWorkgroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    role: '',
    workgroup: '',
    status: 'Active'
  });

  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: []
  });

  const [newWorkgroup, setNewWorkgroup] = useState({
    name: '',
    description: '',
    members: [],
    lead: ''
  });

  const availablePermissions = [
    'View Own Tickets',
    'View All Tickets',
    'Create Tickets',
    'Update Tickets',
    'Delete Tickets',
    'Create Service Requests',
    'Approve Service Requests',
    'View Knowledge Base',
    'Create Knowledge Articles',
    'Manage Users',
    'System Configuration',
    'Full Access'
  ];

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || user.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const handleAddUser = () => {
    if (editingUser) {
      setUsers(users.map(user => user.id === editingUser.id ? { ...newUser, id: editingUser.id } : user));
      setEditingUser(null);
    } else {
      setUsers([...users, { ...newUser, id: Date.now(), createdDate: new Date().toISOString().split('T')[0] }]);
    }
    setNewUser({ username: '', email: '', firstName: '', lastName: '', password: '', role: '', workgroup: '', status: 'Active' });
    setShowUserModal(false);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ ...user, password: '' });
    setShowUserModal(true);
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleAddRole = () => {
    if (editingRole) {
      setRoles(roles.map(role => role.id === editingRole.id ? { ...newRole, id: editingRole.id, userCount: editingRole.userCount } : role));
      setEditingRole(null);
    } else {
      setRoles([...roles, { ...newRole, id: Date.now(), userCount: 0 }]);
    }
    setNewRole({ name: '', description: '', permissions: [] });
    setShowRoleModal(false);
  };

  const handleEditRole = (role) => {
    setEditingRole(role);
    setNewRole({ ...role });
    setShowRoleModal(true);
  };

  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  const handleAddWorkgroup = () => {
    if (editingWorkgroup) {
      setWorkgroups(workgroups.map(wg => wg.id === editingWorkgroup.id ? { ...newWorkgroup, id: editingWorkgroup.id } : wg));
      setEditingWorkgroup(null);
    } else {
      setWorkgroups([...workgroups, { ...newWorkgroup, id: Date.now() }]);
    }
    setNewWorkgroup({ name: '', description: '', members: [], lead: '' });
    setShowWorkgroupModal(false);
  };

  const handleEditWorkgroup = (workgroup) => {
    setEditingWorkgroup(workgroup);
    setNewWorkgroup({ ...workgroup });
    setShowWorkgroupModal(true);
  };

  const handleDeleteWorkgroup = (workgroupId) => {
    setWorkgroups(workgroups.filter(wg => wg.id !== workgroupId));
  };

  const handlePermissionToggle = (permission) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleMemberToggle = (username) => {
    setNewWorkgroup(prev => ({
      ...prev,
      members: prev.members.includes(username)
        ? prev.members.filter(m => m !== username)
        : [...prev.members, username]
    }));
  };

  const UserModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{editingUser ? 'Edit User' : 'Add New User'}</h3>
          <button onClick={() => setShowUserModal(false)} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              value={newUser.username}
              onChange={(e) => setNewUser({...newUser, username: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter username"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({...newUser, email: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter email"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">First Name</label>
              <input
                type="text"
                value={newUser.firstName}
                onChange={(e) => setNewUser({...newUser, firstName: e.target.value})}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="First name"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Last Name</label>
              <input
                type="text"
                value={newUser.lastName}
                onChange={(e) => setNewUser({...newUser, lastName: e.target.value})}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Last name"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({...newUser, password: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder={editingUser ? "Leave blank to keep current password" : "Enter password"}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={newUser.role}
              onChange={(e) => setNewUser({...newUser, role: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Role</option>
              {roles.map(role => (
                <option key={role.id} value={role.name}>{role.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Workgroup</label>
            <select
              value={newUser.workgroup}
              onChange={(e) => setNewUser({...newUser, workgroup: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Workgroup</option>
              {workgroups.map(wg => (
                <option key={wg.id} value={wg.name}>{wg.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <select
              value={newUser.status}
              onChange={(e) => setNewUser({...newUser, status: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={() => setShowUserModal(false)}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleAddUser}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editingUser ? 'Update' : 'Add'} User
          </button>
        </div>
      </div>
    </div>
  );

  const RoleModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{editingRole ? 'Edit Role' : 'Add New Role'}</h3>
          <button onClick={() => setShowRoleModal(false)} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Role Name</label>
            <input
              type="text"
              value={newRole.name}
              onChange={(e) => setNewRole({...newRole, name: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter role name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={newRole.description}
              onChange={(e) => setNewRole({...newRole, description: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Enter role description"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Permissions</label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {availablePermissions.map(permission => (
                <label key={permission} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newRole.permissions.includes(permission)}
                    onChange={() => handlePermissionToggle(permission)}
                    className="rounded"
                  />
                  <span className="text-sm">{permission}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={() => setShowRoleModal(false)}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleAddRole}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editingRole ? 'Update' : 'Add'} Role
          </button>
        </div>
      </div>
    </div>
  );

  const WorkgroupModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{editingWorkgroup ? 'Edit Workgroup' : 'Add New Workgroup'}</h3>
          <button onClick={() => setShowWorkgroupModal(false)} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Workgroup Name</label>
            <input
              type="text"
              value={newWorkgroup.name}
              onChange={(e) => setNewWorkgroup({...newWorkgroup, name: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter workgroup name"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={newWorkgroup.description}
              onChange={(e) => setNewWorkgroup({...newWorkgroup, description: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="3"
              placeholder="Enter workgroup description"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Members</label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {users.map(user => (
                <label key={user.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={newWorkgroup.members.includes(user.username)}
                    onChange={() => handleMemberToggle(user.username)}
                    className="rounded"
                  />
                  <span className="text-sm">{user.firstName} {user.lastName} ({user.username})</span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Team Lead</label>
            <select
              value={newWorkgroup.lead}
              onChange={(e) => setNewWorkgroup({...newWorkgroup, lead: e.target.value})}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Team Lead</option>
              {newWorkgroup.members.map(username => {
                const user = users.find(u => u.username === username);
                return user ? (
                  <option key={username} value={username}>
                    {user.firstName} {user.lastName} ({username})
                  </option>
                ) : null;
              })}
            </select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 mt-6">
          <button
            onClick={() => setShowWorkgroupModal(false)}
            className="px-4 py-2 border rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleAddWorkgroup}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {editingWorkgroup ? 'Update' : 'Add'} Workgroup
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage users, roles, and workgroups</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('users')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'users'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Users className="inline mr-2" size={16} />
            Users
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'roles'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <Shield className="inline mr-2" size={16} />
            Roles
          </button>
          <button
            onClick={() => setActiveTab('workgroups')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'workgroups'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            }`}
          >
            <UserPlus className="inline mr-2" size={16} />
            Workgroups
          </button>
        </nav>
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div>
          {/* Users Header */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                <Upload size={16} />
                <span>Import Excel</span>
              </button>
              <button className="px-4 py-2 border rounded-lg hover:bg-gray-50 flex items-center space-x-2">
                <Download size={16} />
                <span>Export</span>
              </button>
              <button
                onClick={() => setShowUserModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Add User</span>
              </button>
            </div>
          </div>

          {/* Users Table */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Workgroup</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Login</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                            <span className="text-blue-600 font-medium text-sm">
                              {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{user.firstName} {user.lastName}</div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.role}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.workgroup}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.lastLogin}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEditUser(user)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Roles Tab */}
      {activeTab === 'roles' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Role Templates</h2>
            <button
              onClick={() => setShowRoleModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Role</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <div key={role.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditRole(role)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteRole(role.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{role.description}</p>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Permissions:</p>
                  <div className="space-y-1">
                    {role.permissions.slice(0, 3).map((permission, index) => (
                      <div key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {permission}
                      </div>
                    ))}
                    {role.permissions.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{role.permissions.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{role.userCount}</span> users assigned
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Workgroups Tab */}
      {activeTab === 'workgroups' && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Workgroups</h2>
            <button
              onClick={() => setShowWorkgroupModal(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
            >
              <Plus size={16} />
              <span>Add Workgroup</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {workgroups.map((workgroup) => (
              <div key={workgroup.id} className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">{workgroup.name}</h3>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditWorkgroup(workgroup)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteWorkgroup(workgroup.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{workgroup.description}</p>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Team Lead:</p>
                  <div className="text-sm text-gray-600">{workgroup.lead}</div>
                </div>
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Members:</p>
                  <div className="space-y-1">
                    {workgroup.members.slice(0, 3).map((member, index) => (
                      <div key={index} className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">
                        {member}
                      </div>
                    ))}
                    {workgroup.members.length > 3 && (
                      <div className="text-xs text-gray-500">
                        +{workgroup.members.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">{workgroup.members.length}</span> members
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modals */}
      {showUserModal && <UserModal />}
      {showRoleModal && <RoleModal />}
      {showWorkgroupModal && <WorkgroupModal />}
    </div>
  );
};

export default UserServicePage;