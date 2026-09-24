import { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  LayoutDashboard, 
  Users, 
  ShieldCheck, 
  Megaphone, 
  MessageSquare,
  LogOut,
  Image,
  Briefcase,
  Factory
} from 'lucide-react';

const MENU_ITEMS = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/users', label: 'Users & Businesses', icon: Users },
  { path: '/verifications', label: 'Verifications', icon: ShieldCheck },
  { path: '/moderation', label: 'Content Moderation', icon: Megaphone },
  { path: '/ads', label: 'Sponsored Ads', icon: Image },
  { path: '/enquiries', label: 'Ad Enquiries', icon: Briefcase },
  { path: '/feedbacks', label: 'Feedback', icon: MessageSquare, hasBadge: true },
  { path: '/industries', label: 'Industries Master', icon: Factory },
];

export default function Layout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [unreadFeedback, setUnreadFeedback] = useState(0);

  const fetchUnreadFeedback = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) return;
      const res = await axios.get("https://mandar-community.onrender.com/api/system/feedback/unread-count", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data?.success) {
        setUnreadFeedback(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching unread feedback count", error);
    }
  };

  useEffect(() => {
    fetchUnreadFeedback();

    const handleFeedbackRead = () => {
      fetchUnreadFeedback();
    };

    window.addEventListener("feedback-read", handleFeedbackRead);
    // Poll every minute
    const interval = setInterval(fetchUnreadFeedback, 60000);

    return () => {
      window.removeEventListener("feedback-read", handleFeedbackRead);
      clearInterval(interval);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <h1 className="text-xl font-bold text-blue-600">MBG Admin</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {MENU_ITEMS.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-blue-50 text-blue-700 font-medium' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon size={20} className={isActive ? 'text-blue-700' : 'text-gray-500'} />
                  <span>{item.label}</span>
                </div>
                {item.hasBadge && unreadFeedback > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {unreadFeedback}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className="flex items-center space-x-3 text-red-600 hover:bg-red-50 w-full px-4 py-3 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-semibold">
            {MENU_ITEMS.find(i => i.path === location.pathname)?.label || 'Admin Panel'}
          </h2>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full">Admin View</span>
          </div>
        </header>

        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
