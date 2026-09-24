import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Trash2, Eye, EyeOff, Loader2 } from 'lucide-react';

export default function SponsoredAdsScreen() {
  const [ads, setAds] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // New Ad Form
  const [showForm, setShowForm] = useState(false);
  const [newAd, setNewAd] = useState({ title: '', subtitle: '', description: '', badge: '', image_url: '', destination_url: '', row_placement: 'top', is_active: true });

  const fetchAds = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.get('https://mandar-community.onrender.com/api/admin/sponsored-ads', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setAds(res.data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleToggle = async (id: string, currentStatus: boolean) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.patch(`https://mandar-community.onrender.com/api/admin/sponsored-ads/${id}`, 
        { is_active: !currentStatus },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      fetchAds();
    } catch (err) {
      alert('Failed to update ad status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this sponsored ad permanently?")) return;
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`https://mandar-community.onrender.com/api/admin/sponsored-ads/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAds();
    } catch (err) {
      alert('Failed to delete ad');
    }
  };

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      if (editingId) {
        await axios.put(`https://mandar-community.onrender.com/api/admin/sponsored-ads/${editingId}`, newAd, {
          headers: { Authorization: `Bearer ${token}` }
        });
      } else {
        await axios.post('https://mandar-community.onrender.com/api/admin/sponsored-ads', newAd, {
          headers: { Authorization: `Bearer ${token}` }
        });
      }
      setShowForm(false);
      setEditingId(null);
      setNewAd({ title: '', subtitle: '', description: '', badge: '', image_url: '', destination_url: '', row_placement: 'top', is_active: true });
      fetchAds();
    } catch (err) {
      alert('Failed to save ad');
    }
  };

  const handleEditClick = (ad: any) => {
    setEditingId(ad.id);
    setNewAd({
      title: ad.title || '',
      subtitle: ad.subtitle || '',
      description: ad.description || '',
      badge: ad.badge || '',
      image_url: ad.image_url || '',
      destination_url: ad.destination_url || '',
      row_placement: ad.row_placement || 'top',
      is_active: ad.is_active
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Home Screen Sponsored Ads</h3>
        <button 
          onClick={() => {
            setEditingId(null);
            setNewAd({ title: '', subtitle: '', description: '', badge: '', image_url: '', destination_url: '', row_placement: 'top', is_active: true });
            setShowForm(!showForm);
          }}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={18} className="mr-2" /> Add New Ad
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleCreateOrUpdate} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
          <div className="flex justify-between border-b pb-2">
            <h4 className="font-medium">{editingId ? 'Edit Sponsored Ad' : 'Create New Sponsored Ad'}</h4>
            <button type="button" onClick={() => setShowForm(false)} className="text-gray-400 hover:text-gray-600">Cancel</button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title (Max 26 chars)</label>
              <input required maxLength={26} type="text" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={newAd.title} onChange={e => setNewAd({...newAd, title: e.target.value})} placeholder="e.g. Premium Farm Equipment" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Badge (Max 12 chars)</label>
              <input maxLength={12} type="text" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={newAd.badge} onChange={e => setNewAd({...newAd, badge: e.target.value})} placeholder="e.g. SPONSORED" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle (Max 40 chars)</label>
              <input maxLength={40} type="text" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={newAd.subtitle} onChange={e => setNewAd({...newAd, subtitle: e.target.value})} placeholder="e.g. Reach out today" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination URL (Optional)</label>
              <input type="url" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={newAd.destination_url} onChange={e => setNewAd({...newAd, destination_url: e.target.value})} placeholder="https://example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Row Placement</label>
              <select className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={newAd.row_placement} onChange={e => setNewAd({...newAd, row_placement: e.target.value})}>
                <option value="top">Top Row (Premium/Plain cards)</option>
                <option value="bottom">Bottom Row (Plain cards only)</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description (Max 65 chars)</label>
              <textarea maxLength={65} rows={2} className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={newAd.description} onChange={e => setNewAd({...newAd, description: e.target.value})} placeholder="Describe the offer..."></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL (Required for Premium)</label>
              <input type="url" className="w-full px-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500" value={newAd.image_url} onChange={e => setNewAd({...newAd, image_url: e.target.value})} placeholder="https://..." />
            </div>
          </div>
          <div className="flex justify-end space-x-3 pt-2">
            <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Save & Publish</button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {ads.map((ad) => (
          <div key={ad.id} className={`bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col ${ad.is_active ? 'border-gray-200' : 'border-gray-200 opacity-75'}`}>
            <div className="h-40 bg-gray-100 relative">
              <img src={ad.image_url} alt={ad.title} className="w-full h-full object-cover" />
              {!ad.is_active && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="bg-white px-3 py-1 rounded-full text-xs font-bold text-gray-900">HIDDEN</span>
                </div>
              )}
            </div>
            <div className="p-4 flex-1">
              <h4 className="font-semibold text-gray-900 mb-1">{ad.title}</h4>
              <a href={ad.destination_url} target="_blank" rel="noreferrer" className="text-sm text-blue-600 hover:underline break-all line-clamp-1">
                {ad.destination_url || 'No destination link'}
              </a>
            </div>
            <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
              <button 
                onClick={() => handleEditClick(ad)}
                className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Edit
              </button>
              <button 
                onClick={() => handleToggle(ad.id, ad.is_active)}
                className={`flex items-center text-sm font-medium ${ad.is_active ? 'text-amber-600 hover:text-amber-700' : 'text-emerald-600 hover:text-emerald-700'}`}
              >
                {ad.is_active ? <><EyeOff size={16} className="mr-1" /> Hide</> : <><Eye size={16} className="mr-1" /> Show</>}
              </button>
              <button 
                onClick={() => handleDelete(ad.id)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
        {ads.length === 0 && !showForm && (
          <div className="col-span-full py-12 text-center text-gray-500">
            No sponsored ads found. Click "Add New Ad" to create one.
          </div>
        )}
      </div>
    </div>
  );
}
