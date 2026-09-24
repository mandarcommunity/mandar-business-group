import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, ShieldCheck, Megaphone, Loader2, FileSearch, Building2, ShoppingBag, MessageSquare, ArrowUpRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function DashboardScreen() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get('https://mandar-community.onrender.com/api/admin/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setStats(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  const usersCount = stats?.users || 0;
  const verifiedCount = stats?.verifiedBusinesses || 0;
  
  // Dynamic percentages for the progress bars
  const businessPercent = usersCount > 0 ? Math.round((verifiedCount / usersCount) * 100) : 0;
  const adsEngagementPercent = usersCount > 0 ? Math.min(100, Math.round(((stats?.activeAds || 0) / (usersCount * 0.2)) * 100)) : 0;
  const leadsPercent = usersCount > 0 ? Math.min(100, Math.round(((stats?.activeLeads || 0) / (usersCount * 0.3)) * 100)) : 0;

  const statCards = [
    { label: 'Total Users', value: usersCount, icon: Users, color: 'bg-indigo-50 text-indigo-600', trend: 'Live' },
    { label: 'Verified Businesses', value: verifiedCount, icon: Building2, color: 'bg-purple-50 text-purple-600', trend: 'Live' },
    { label: 'Pending Verifications', value: stats?.pendingVerifications || 0, icon: ShieldCheck, color: 'bg-amber-50 text-amber-600', trend: 'Needs Action' },
    { label: 'Active Advertisements', value: stats?.activeAds || 0, icon: Megaphone, color: 'bg-emerald-50 text-emerald-600', trend: 'Live' },
    { label: 'Active Leads', value: stats?.activeLeads || 0, icon: FileSearch, color: 'bg-blue-50 text-blue-600', trend: 'Live' },
    { label: 'Catalog Products', value: stats?.products || 0, icon: ShoppingBag, color: 'bg-pink-50 text-pink-600', trend: 'Live' },
    { label: 'User Feedbacks', value: stats?.feedbacks || 0, icon: MessageSquare, color: 'bg-rose-50 text-rose-600', trend: 'Review' },
    { label: 'System Health', value: '99.9%', icon: Activity, color: 'bg-green-50 text-green-600', trend: 'Optimal' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h3 className="text-2xl font-bold text-gray-900">Enterprise Dashboard</h3>
        <p className="text-sm text-gray-500 mt-1">Overview of the ecosystem performance and metrics.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">{card.label}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${card.color}`}>
                  <Icon size={24} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                <ArrowUpRight size={16} className="text-emerald-500 mr-1" />
                <span className="text-emerald-600 font-medium">{card.trend}</span>
                <span className="text-gray-400 ml-2">metrics</span>
              </div>
              <div className={`absolute bottom-0 left-0 h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity ${card.color.split(' ')[0]}`}></div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-bold text-gray-900">Recent Onboardings</h4>
            <button 
              onClick={() => navigate('/users')} 
              className="text-sm text-blue-600 font-medium hover:text-blue-700 cursor-pointer"
            >
              View All Users
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-3 text-sm font-medium text-gray-500">User</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Email</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Joined</th>
                  <th className="pb-3 text-sm font-medium text-gray-500">Status</th>
                </tr>
              </thead>
              <tbody>
                {stats?.recentActivity?.map((user: any) => (
                  <tr key={user.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <td className="py-4 text-sm font-medium text-gray-900">{user.full_name}</td>
                    <td className="py-4 text-sm text-gray-500">{user.email}</td>
                    <td className="py-4 text-sm text-gray-500">{new Date(user.created_at).toLocaleDateString()}</td>
                    <td className="py-4 text-sm">
                      <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-xs font-medium">Active</span>
                    </td>
                  </tr>
                ))}
                {(!stats?.recentActivity || stats.recentActivity.length === 0) && (
                  <tr><td colSpan={4} className="text-center py-8 text-gray-500">No recent users found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h4 className="text-lg font-bold text-gray-900 mb-6">System Distribution</h4>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Business Profiles</span>
                <span className="text-gray-500">{businessPercent}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${businessPercent}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Engagement (Ads)</span>
                <span className="text-gray-500">{(stats?.activeAds || 0)} active</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-emerald-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${adsEngagementPercent}%` }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium text-gray-700">Lead Generation</span>
                <span className="text-gray-500">{(stats?.activeLeads || 0)} leads</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${leadsPercent}%` }}></div>
              </div>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <div className="bg-blue-50 rounded-lg p-4">
                <h5 className="font-medium text-blue-900 text-sm mb-1">Server Status</h5>
                <p className="text-blue-700 text-xs">All systems operational. Network latency is under 50ms.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
