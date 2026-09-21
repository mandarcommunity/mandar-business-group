import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Search, Filter, X, Eye, Phone, Mail, Clock, Shield, UserX, AlertTriangle } from 'lucide-react';

interface User {
  id: string;
  full_name: string;
  email: string;
  mobile: string;
  role: string;
  is_blocked: boolean;
  status: string;
  created_at: string;
}

export default function UserManagementScreen() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUsers(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleBlockUser = async (id: string, isBlocked: boolean) => {
    if (!window.confirm(`Are you sure you want to ${isBlocked ? 'unblock' : 'block'} this user?`)) return;
    try {
      const token = localStorage.getItem('adminToken');
      const action = isBlocked ? 'unblock' : 'block';
      await axios.patch(`http://localhost:5000/api/admin/users/${id}/${action}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
      if (selectedUser?.id === id) {
        setSelectedUser({ ...selectedUser, is_blocked: !isBlocked });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update user status");
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('CRITICAL ACTION: Are you sure you want to permanently delete this user and all their associated data? This cannot be undone.')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
      if (selectedUser?.id === id) {
        setSelectedUser(null);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }
  };

  const handleRoleChange = async (id: string, newRole: string) => {
    if (!window.confirm(`Are you sure you want to change this user's role to ${newRole.toUpperCase()}?`)) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(`http://localhost:5000/api/admin/users/${id}/role`, { role: newRole }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchUsers();
      if (selectedUser?.id === id) {
        setSelectedUser({ ...selectedUser, role: newRole });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to update user role");
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = (user.full_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) || 
                          (user.email?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
                          (user.mobile || '').includes(searchQuery);
    const matchesRole = roleFilter === 'all' || (user.role || "user") === roleFilter;
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'blocked' ? user.is_blocked : !user.is_blocked);
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">User Management (CRM)</h1>
        <div className="flex space-x-2">
          <div className="bg-white p-2 rounded-md shadow-sm border border-gray-200 flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-green-500"></span>
            <span className="text-sm text-gray-600">Active: {users.filter(u => !u.is_blocked).length}</span>
          </div>
          <div className="bg-white p-2 rounded-md shadow-sm border border-gray-200 flex items-center space-x-2">
            <span className="w-3 h-3 rounded-full bg-red-500"></span>
            <span className="text-sm text-gray-600">Blocked: {users.filter(u => u.is_blocked).length}</span>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email, or mobile..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="user">Users Only</option>
              <option value="admin">Admins Only</option>
            </select>
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="active">Active Only</option>
            <option value="blocked">Blocked Only</option>
          </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
                <th className="py-3 px-4 font-medium">User</th>
                <th className="py-3 px-4 font-medium">Contact</th>
                <th className="py-3 px-4 font-medium">Role</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Joined</th>
                <th className="py-3 px-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">Loading users...</td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500">No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                          {user.full_name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{user.full_name || 'Unnamed User'}</p>
                          <p className="text-xs text-gray-500 font-mono">{user.id.substring(0,8)}...</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <p className="text-sm text-gray-900">{user.email || 'No email'}</p>
                      <p className="text-xs text-gray-500">{user.mobile || 'No mobile'}</p>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        (user.role || "user") === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {(user.role || "user") === 'admin' && <Shield className="w-3 h-3 mr-1" />}
                        {(user.role || "user").toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.is_blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {user.is_blocked ? 'Blocked' : 'Active'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-500">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="inline-flex items-center justify-center p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over User Detail Modal */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <div className="absolute inset-0 bg-gray-900 bg-opacity-50 transition-opacity" onClick={() => setSelectedUser(null)} />
          
          <div className="fixed inset-y-0 right-0 max-w-md w-full flex bg-white shadow-xl">
            <div className="h-full flex flex-col w-full">
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                <h2 className="text-lg font-medium text-gray-900 flex items-center">
                  <UserX className="w-5 h-5 mr-2 text-gray-500" />
                  Account Management
                </h2>
                <button onClick={() => setSelectedUser(null)} className="text-gray-400 hover:text-gray-500">
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-6">
                <div className="flex items-center space-x-4 mb-8">
                  <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-2xl font-bold">
                    {selectedUser.full_name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{selectedUser.full_name || 'Unnamed User'}</h3>
                    <div className="flex items-center mt-1 space-x-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        selectedUser.is_blocked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                      }`}>
                        {selectedUser.is_blocked ? 'Blocked' : 'Active'}
                      </span>
                      <span className="text-sm text-gray-500">ID: {selectedUser.id.substring(0,8)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Contact Information</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center text-sm">
                        <Mail className="w-4 h-4 text-gray-400 mr-3" />
                        <span className="text-gray-900">{selectedUser.email || 'Not provided'}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="w-4 h-4 text-gray-400 mr-3" />
                        <span className="text-gray-900">{selectedUser.mobile || 'Not provided'}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Clock className="w-4 h-4 text-gray-400 mr-3" />
                        <span className="text-gray-900">Joined on {new Date(selectedUser.created_at).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">Access Control</h4>
                    
                    <div className="space-y-4">
                      {/* Block/Unblock */}
                      <div className="bg-white border rounded-lg p-4 flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">{selectedUser.is_blocked ? 'Unblock Account' : 'Block Account'}</h5>
                          <p className="text-sm text-gray-500 mt-1">
                            {selectedUser.is_blocked 
                              ? "Restore user's access to the platform." 
                              : "Immediately restrict user from logging in or using APIs."}
                          </p>
                        </div>
                        <button
                          onClick={() => handleBlockUser(selectedUser.id, selectedUser.is_blocked)}
                          className={`px-4 py-2 rounded-md text-sm font-medium ${
                            selectedUser.is_blocked
                              ? 'bg-green-50 text-green-700 hover:bg-green-100 border border-green-200'
                              : 'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border border-yellow-200'
                          }`}
                        >
                          {selectedUser.is_blocked ? 'Unblock' : 'Block User'}
                        </button>
                      </div>

                      {/* Role Management */}
                      <div className="bg-white border rounded-lg p-4 flex items-start justify-between">
                        <div>
                          <h5 className="font-medium text-gray-900">Account Role</h5>
                          <p className="text-sm text-gray-500 mt-1">
                            Current role: <span className="font-semibold">{(selectedUser.role || "user").toUpperCase()}</span>
                          </p>
                        </div>
                        <button
                          onClick={() => handleRoleChange(selectedUser.id, (selectedUser.role || "user") === 'admin' ? 'user' : 'admin')}
                          className="px-4 py-2 rounded-md text-sm font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200"
                        >
                          Make {(selectedUser.role || "user") === 'admin' ? 'User' : 'Admin'}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <h4 className="text-sm font-medium text-red-600 uppercase tracking-wider mb-3 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Danger Zone
                    </h4>
                    
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h5 className="font-medium text-red-900">Permanently Delete Account</h5>
                      <p className="text-sm text-red-700 mt-1 mb-4">
                        This will permanently delete the user and completely wipe out their business profile, products, and ads from the database.
                      </p>
                      <button
                        onClick={() => handleDeleteUser(selectedUser.id)}
                        className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account Data
                      </button>
                    </div>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

