import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Loader2, AlertTriangle, Eye, ShieldAlert, Plus, Ban, Package, Megaphone, FileText } from 'lucide-react';

export default function ModerationScreen() {
  const [activeTab, setActiveTab] = useState<'ads' | 'leads' | 'products' | 'keywords'>('products');
  const [data, setData] = useState<any[]>([]);
  const [keywords, setKeywords] = useState<any[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      
      if (activeTab === 'keywords') {
        const res = await axios.get(`http://localhost:5000/api/admin/banned-keywords`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setKeywords(res.data.data || []);
      } else {
        let endpoint = '';
        if (activeTab === 'ads') endpoint = '/api/admin/advertisements';
        if (activeTab === 'leads') endpoint = '/api/admin/requirements';
        if (activeTab === 'products') endpoint = '/api/admin/products';
        
        const res = await axios.get(`http://localhost:5000${endpoint}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data.data || []);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to permanently delete this content?')) return;
    try {
      const token = localStorage.getItem('adminToken');
      let endpoint = '';
      if (activeTab === 'ads') endpoint = `/api/admin/advertisements/${id}`;
      if (activeTab === 'leads') endpoint = `/api/admin/requirements/${id}`;
      if (activeTab === 'products') endpoint = `/api/admin/products/${id}`;
      
      await axios.delete(`http://localhost:5000${endpoint}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      alert("Error deleting content");
    }
  };

  const handleSuspendProduct = async (id: string) => {
    if (!window.confirm('Are you sure you want to suspend this product? It will be hidden from the app immediately.')) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(`http://localhost:5000/api/admin/products/${id}/suspend`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      alert("Error suspending product");
    }
  };

  const handleAddKeyword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newKeyword.trim()) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.post(`http://localhost:5000/api/admin/banned-keywords`, { keyword: newKeyword }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNewKeyword('');
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.message || "Error adding keyword");
    }
  };

  const handleDeleteKeyword = async (id: string) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5000/api/admin/banned-keywords/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      alert("Error deleting keyword");
    }
  };

  const filteredData = data.filter(item => {
    const title = (item.title || item.name || '').toLowerCase();
    const desc = (item.description || '').toLowerCase();
    const user = (item.users?.full_name || '').toLowerCase();
    const biz = (item.businesses?.business_name || '').toLowerCase();
    const q = searchQuery.toLowerCase();
    return title.includes(q) || desc.includes(q) || user.includes(q) || biz.includes(q);
  });
  
  const filteredKeywords = keywords.filter(k => k.keyword.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Content Moderation & Trust</h1>
          <p className="text-sm text-gray-500 mt-1">Monitor user-generated content and manage automated filters.</p>
        </div>
        
        <div className="flex bg-white rounded-lg p-1 border border-gray-200 shadow-sm">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'products' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Package className="w-4 h-4 mr-2" />
            Products
          </button>
          <button
            onClick={() => setActiveTab('ads')}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'ads' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Megaphone className="w-4 h-4 mr-2" />
            Ads
          </button>
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'leads' ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FileText className="w-4 h-4 mr-2" />
            Requirements
          </button>
          <button
            onClick={() => setActiveTab('keywords')}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === 'keywords' ? 'bg-red-50 text-red-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <ShieldAlert className="w-4 h-4 mr-2" />
            Banned Words
          </button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <input
          type="text"
          placeholder={activeTab === 'keywords' ? "Search banned words..." : "Search content titles or descriptions..."}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {activeTab === 'keywords' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center space-x-2 text-red-600 mb-4">
                <ShieldAlert className="w-5 h-5" />
                <h2 className="text-lg font-bold">Automated Filter</h2>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                Any user attempting to post a product, advertisement, or requirement containing these keywords will be instantly blocked and rejected by the API.
              </p>
              
              <form onSubmit={handleAddKeyword} className="space-y-3">
                <input
                  type="text"
                  placeholder="Enter a keyword to ban..."
                  value={newKeyword}
                  onChange={(e) => setNewKeyword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="submit"
                  className="w-full flex justify-center items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add to Blocklist
                </button>
              </form>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-sm text-gray-500">
                    <th className="py-3 px-4 font-medium">Banned Keyword</th>
                    <th className="py-3 px-4 font-medium">Added On</th>
                    <th className="py-3 px-4 font-medium text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {loading ? (
                    <tr><td colSpan={3} className="py-8 text-center text-gray-500">Loading...</td></tr>
                  ) : filteredKeywords.length === 0 ? (
                    <tr><td colSpan={3} className="py-8 text-center text-gray-500">No banned keywords found.</td></tr>
                  ) : (
                    filteredKeywords.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-3 px-4 font-mono text-red-600 font-medium">"{item.keyword}"</td>
                        <td className="py-3 px-4 text-sm text-gray-500">{new Date(item.created_at).toLocaleDateString()}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => handleDeleteKeyword(item.id)}
                            className="text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full py-12 flex justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : filteredData.length === 0 ? (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
              No content found in this category.
            </div>
          ) : (
            filteredData.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                {(item.images?.[0] || item.image_url) && (
                  <div className="h-48 w-full bg-gray-100 overflow-hidden">
                    <img 
                      src={item.images?.[0] || item.image_url} 
                      alt="Content" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                
                <div className="p-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-gray-900 line-clamp-2">
                      {item.title || item.name}
                    </h3>
                    {item.status === 'suspended' && (
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded font-medium ml-2">
                        Suspended
                      </span>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 line-clamp-3 mb-4 flex-1">
                    {item.description}
                  </p>
                  
                  <div className="text-xs text-gray-500 mb-4 bg-gray-50 p-2 rounded">
                    <p><strong>By:</strong> {item.users?.full_name || 'Unknown User'}</p>
                    <p><strong>Business:</strong> {item.businesses?.business_name || 'Unknown'}</p>
                    <p><strong>Date:</strong> {new Date(item.created_at).toLocaleDateString()}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-auto pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="flex-1 flex justify-center items-center py-2 bg-gray-50 text-red-600 rounded hover:bg-red-50 transition-colors text-sm font-medium border border-gray-200"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                    
                    {activeTab === 'products' && item.status !== 'suspended' && (
                      <button
                        onClick={() => handleSuspendProduct(item.id)}
                        className="flex-1 flex justify-center items-center py-2 bg-yellow-50 text-yellow-700 rounded hover:bg-yellow-100 transition-colors text-sm font-medium border border-yellow-200"
                      >
                        <Ban className="w-4 h-4 mr-2" />
                        Suspend
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
