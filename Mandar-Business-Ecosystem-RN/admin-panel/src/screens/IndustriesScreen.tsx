import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Search, Edit2, Plus, AlertTriangle, Eye, EyeOff } from 'lucide-react';

interface Industry {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  is_active: boolean;
  created_at: string;
}

export default function IndustriesScreen() {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ id: '', name: '', slug: '', emoji: '' });
  const [saving, setSaving] = useState(false);

  const fetchIndustries = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('http://localhost:5000/api/admin/industries', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIndustries(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIndustries();
  }, []);

  const handleOpenModal = (industry?: Industry) => {
    if (industry) {
      setEditMode(true);
      setFormData({
        id: industry.id,
        name: industry.name,
        slug: industry.slug,
        emoji: industry.emoji
      });
    } else {
      setEditMode(false);
      setFormData({ id: '', name: '', slug: '', emoji: '' });
    }
    setShowModal(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const payload = {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''),
        emoji: formData.emoji
      };

      if (editMode) {
        await axios.put(`http://localhost:5000/api/admin/industries/${formData.id}`, payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/admin/industries', payload, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setShowModal(false);
      fetchIndustries();
    } catch (err) {
      console.error(err);
      alert('Error saving industry');
    } finally {
      setSaving(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(`http://localhost:5000/api/admin/industries/${id}/toggle`, 
        { is_active: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIndustries(industries.map(ind => ind.id === id ? { ...ind, is_active: !currentStatus } : ind));
    } catch (err) {
      console.error(err);
      alert('Error updating status');
    }
  };

  const deleteIndustry = async (id: string) => {
    if (!window.confirm("Are you sure? This might break businesses linked to this industry!")) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`http://localhost:5000/api/admin/industries/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setIndustries(industries.filter(ind => ind.id !== id));
    } catch (err) {
      console.error(err);
      alert('Error deleting industry');
    }
  };

  const filteredIndustries = industries.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    i.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Industries</h1>
          <p className="text-slate-500">Manage business sectors</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2"
        >
          <Plus size={18} /> Add Industry
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
        <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-lg border border-slate-200">
          <Search className="text-slate-400" size={20} />
          <input 
            type="text" 
            placeholder="Search industries..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none focus:outline-none flex-1 py-1"
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Industry</th>
                <th className="px-6 py-4">Slug</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">Loading...</td>
                </tr>
              ) : filteredIndustries.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-500">No industries found</td>
                </tr>
              ) : (
                filteredIndustries.map(ind => (
                  <tr key={ind.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900 flex items-center gap-3">
                      <span className="text-2xl bg-slate-100 w-10 h-10 rounded flex items-center justify-center">{ind.emoji}</span>
                      {ind.name}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{ind.slug}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${ind.is_active ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {ind.is_active ? 'Active' : 'Hidden'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => toggleStatus(ind.id, ind.is_active)}
                          className={`p-1.5 rounded-lg ${ind.is_active ? 'text-orange-500 hover:bg-orange-50' : 'text-green-500 hover:bg-green-50'}`}
                          title={ind.is_active ? 'Hide from public' : 'Show to public'}
                        >
                          {ind.is_active ? <EyeOff size={18} /> : <Eye size={18} />}
                        </button>
                        <button 
                          onClick={() => handleOpenModal(ind)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                        >
                          <Edit2 size={18} />
                        </button>
                        <button 
                          onClick={() => deleteIndustry(ind.id)}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-xl">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="font-bold text-slate-900">{editMode ? 'Edit Industry' : 'Add New Industry'}</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600">
                <Trash2 size={20} className="hidden" /> {/* just to import safely, use simple X */}
                X
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Industry Name</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Artificial Intelligence"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Emoji (Icon)</label>
                <input 
                  type="text" 
                  required
                  value={formData.emoji}
                  onChange={e => setFormData({...formData, emoji: e.target.value})}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 text-2xl"
                  placeholder="??"
                />
              </div>
              <div className="pt-4 flex gap-3">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" disabled={saving} className="flex-1 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 disabled:opacity-50">
                  {saving ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
