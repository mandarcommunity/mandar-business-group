import { useState, useEffect } from "react";
import axios from "axios";
import { 
  MessageSquareMore, 
  CheckCircle, 
  Mail, 
  Phone, 
  Calendar,
  Search,
  Filter,
  Trash2,
  X,
  ChevronRight,
  ChevronLeft
} from "lucide-react";

export default function FeedbackScreen() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal
  const [selectedFeedback, setSelectedFeedback] = useState<any | null>(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("https://mandar-community.onrender.com/api/system/feedback", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data?.success) {
        setFeedbacks(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.put(`https://mandar-community.onrender.com/api/system/feedback/${id}/read`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data?.success) {
        setFeedbacks(prev => prev.map(f => f.id === id ? { ...f, is_read: true } : f));
        if (selectedFeedback && selectedFeedback.id === id) {
          setSelectedFeedback({ ...selectedFeedback, is_read: true });
        }
        window.dispatchEvent(new Event("feedback-read"));
      }
    } catch (error) {
      console.error("Error marking feedback as read:", error);
    }
  };

  const deleteFeedback = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this feedback? This action cannot be undone.")) return;
    
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.delete(`https://mandar-community.onrender.com/api/system/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data?.success) {
        setFeedbacks(prev => prev.filter(f => f.id !== id));
        if (selectedFeedback && selectedFeedback.id === id) {
          setSelectedFeedback(null);
        }
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
      alert("Failed to delete feedback");
    }
  };

  // Filter logic
  const filteredFeedbacks = feedbacks.filter(f => {
    // Status filter
    if (statusFilter === "unread" && f.is_read) return false;
    if (statusFilter === "read" && !f.is_read) return false;
    
    // Category filter
    if (categoryFilter !== "all" && f.subject !== categoryFilter) return false;
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const nameMatch = f.users?.full_name?.toLowerCase().includes(term);
      const emailMatch = f.users?.email?.toLowerCase().includes(term);
      const phoneMatch = f.users?.mobile?.includes(term);
      const subjectMatch = f.subject.toLowerCase().includes(term);
      if (!nameMatch && !emailMatch && !phoneMatch && !subjectMatch) return false;
    }
    
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredFeedbacks.length / itemsPerPage);
  const paginatedFeedbacks = filteredFeedbacks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, categoryFilter]);

  const uniqueCategories = ["all", ...Array.from(new Set(feedbacks.map(f => f.subject)))];

  const handleRowClick = (f: any) => {
    setSelectedFeedback(f);
    if (!f.is_read) {
      markAsRead(f.id);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
      {/* Header & Controls */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <MessageSquareMore className="text-blue-600" size={28} />
              Feedback Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">Review and manage user suggestions and reports.</p>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by name, email, phone or subject..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <div className="relative">
              <select 
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="unread">Unread Only</option>
                <option value="read">Read</option>
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>

            <div className="relative">
              <select 
                className="pl-4 pr-10 py-2 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                {uniqueCategories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === "all" ? "All Categories" : cat}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>
        </div>
      </div>

      {/* Table Content */}
      <div className="flex-1 overflow-auto bg-gray-50/50">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <MessageSquareMore size={48} className="text-gray-300 mb-3" />
            <p className="text-lg font-medium text-gray-600">No feedback found</p>
            <p className="text-sm">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-100 text-gray-600 font-medium sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Subject & Message</th>
                <th className="px-6 py-4">User Details</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedFeedbacks.map(f => (
                <tr 
                  key={f.id} 
                  onClick={() => handleRowClick(f)}
                  className={`hover:bg-blue-50 transition-colors cursor-pointer ${!f.is_read ? 'bg-white font-medium' : 'bg-gray-50 text-gray-600'}`}
                >
                  <td className="px-6 py-4">
                    {!f.is_read ? (
                      <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-bold bg-blue-100 text-blue-700">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span> Unread
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-medium bg-gray-100 text-gray-600">
                        Read
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 max-w-md">
                    <div className="font-semibold text-gray-900 truncate">{f.subject}</div>
                    <div className="truncate text-gray-500 text-xs mt-1">{f.message}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-gray-900">{f.users?.full_name || "Unknown"}</div>
                    <div className="text-gray-500 text-xs">{f.users?.email || f.users?.mobile}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(f.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button 
                        onClick={(e) => deleteFeedback(f.id, e)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                        title="Delete Feedback"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Footer */}
      {!loading && filteredFeedbacks.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-between text-sm text-gray-600">
          <div>
            Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredFeedbacks.length)}</span> of <span className="font-semibold text-gray-900">{filteredFeedbacks.length}</span> results
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
            >
              <ChevronLeft size={20} />
            </button>
            <span className="px-2">Page {currentPage} of {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      {/* Slide-over Modal for reading full feedback */}
      {selectedFeedback && (
        <div className="fixed inset-0 bg-gray-900/40 z-50 flex justify-end animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900">Feedback Details</h2>
              <button 
                onClick={() => setSelectedFeedback(null)}
                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-md mb-3">
                  {selectedFeedback.subject}
                </span>
                <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border border-gray-100">
                  {selectedFeedback.message}
                </p>
              </div>

              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Submitter Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded text-gray-500 mt-0.5"><MessageSquareMore size={16} /></div>
                    <div>
                      <div className="text-xs text-gray-500">Name</div>
                      <div className="font-medium text-gray-900">{selectedFeedback.users?.full_name || "Unknown"}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded text-gray-500 mt-0.5"><Mail size={16} /></div>
                    <div>
                      <div className="text-xs text-gray-500">Email</div>
                      <div className="font-medium text-gray-900">{selectedFeedback.users?.email || "N/A"}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded text-gray-500 mt-0.5"><Phone size={16} /></div>
                    <div>
                      <div className="text-xs text-gray-500">Phone Number</div>
                      <div className="font-medium text-gray-900">{selectedFeedback.users?.mobile || "N/A"}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gray-100 rounded text-gray-500 mt-0.5"><Calendar size={16} /></div>
                    <div>
                      <div className="text-xs text-gray-500">Submitted On</div>
                      <div className="font-medium text-gray-900">{new Date(selectedFeedback.created_at).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between">
              <button 
                onClick={() => deleteFeedback(selectedFeedback.id)}
                className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
              >
                <Trash2 size={18} />
                Delete Feedback
              </button>
              
              <button 
                onClick={() => setSelectedFeedback(null)}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
