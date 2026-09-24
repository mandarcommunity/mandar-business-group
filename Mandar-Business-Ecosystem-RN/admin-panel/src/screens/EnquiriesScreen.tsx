import { useState, useEffect } from "react";
import axios from "axios";
import { 
  Building2, 
  CheckCircle, 
  Clock, 
  Mail, 
  Phone, 
  Calendar,
  Search,
  Filter,
  X,
  ChevronRight,
  ChevronLeft,
  Briefcase
} from "lucide-react";

export default function EnquiriesScreen() {
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal
  const [selectedEnquiry, setSelectedEnquiry] = useState<any | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("https://mandar-community.onrender.com/api/admin/sponsor-enquiries", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data?.data) {
        setEnquiries(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching enquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (id: string, newStatus: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    try {
      const token = localStorage.getItem("adminToken");
      await axios.patch(`https://mandar-community.onrender.com/api/admin/sponsor-enquiries/${id}`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setEnquiries(prev => prev.map(enq => enq.id === id ? { ...enq, status: newStatus } : enq));
      if (selectedEnquiry && selectedEnquiry.id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
    } catch (err) {
      alert("Failed to update enquiry status");
    }
  };

  // Filter logic
  const filteredEnquiries = enquiries.filter(enq => {
    // Status filter
    if (statusFilter !== "all" && enq.status !== statusFilter) return false;
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const businessMatch = enq.business_name?.toLowerCase().includes(term);
      const personMatch = enq.contact_person?.toLowerCase().includes(term);
      const emailMatch = enq.email?.toLowerCase().includes(term);
      const phoneMatch = enq.phone_number?.includes(term);
      if (!businessMatch && !personMatch && !emailMatch && !phoneMatch) return false;
    }
    
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredEnquiries.length / itemsPerPage);
  const paginatedEnquiries = filteredEnquiries.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const handleRowClick = (enq: any) => {
    setSelectedEnquiry(enq);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'closed':
        return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700">Closed</span>;
      case 'contacted':
        return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-medium bg-blue-100 text-blue-700">Contacted</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-bold bg-amber-100 text-amber-700">Pending</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
      {/* Header & Controls */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <Briefcase className="text-blue-600" size={28} />
              Ad Enquiries
            </h1>
            <p className="text-sm text-gray-500 mt-1">Manage leads and requests for sponsored advertising.</p>
          </div>
        </div>

        {/* Filters Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by business, contact person, email or phone..."
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
                <option value="pending">Pending</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
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
        ) : filteredEnquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <Briefcase size={48} className="text-gray-300 mb-3" />
            <p className="text-lg font-medium text-gray-600">No enquiries found</p>
            <p className="text-sm">Try adjusting your filters or search terms.</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-100 text-gray-600 font-medium sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Business Details</th>
                <th className="px-6 py-4">Contact Info</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedEnquiries.map(enq => (
                <tr 
                  key={enq.id} 
                  onClick={() => handleRowClick(enq)}
                  className={`hover:bg-blue-50 transition-colors cursor-pointer ${enq.status === 'pending' ? 'bg-white' : 'bg-gray-50 text-gray-600'}`}
                >
                  <td className="px-6 py-4">
                    {getStatusBadge(enq.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{enq.business_name}</div>
                    <div className="text-gray-500 text-xs mt-1">{enq.category || 'N/A'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{enq.contact_person}</div>
                    <div className="text-gray-500 text-xs mt-1">{enq.phone_number}</div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(enq.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {enq.status === 'pending' && (
                        <button 
                          onClick={(e) => handleUpdateStatus(enq.id, 'contacted', e)}
                          className="px-3 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded text-xs font-medium transition-colors border border-blue-200"
                        >
                          Contacted
                        </button>
                      )}
                      {enq.status !== 'closed' && (
                        <button 
                          onClick={(e) => handleUpdateStatus(enq.id, 'closed', e)}
                          className="px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-xs font-medium transition-colors border border-emerald-200"
                        >
                          Close
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination Footer */}
      {!loading && filteredEnquiries.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-between text-sm text-gray-600">
          <div>
            Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredEnquiries.length)}</span> of <span className="font-semibold text-gray-900">{filteredEnquiries.length}</span> results
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

      {/* Slide-over Modal for full details */}
      {selectedEnquiry && (
        <div className="fixed inset-0 bg-gray-900/40 z-50 flex justify-end animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <Building2 size={20} className="text-blue-600" />
                Enquiry Details
              </h2>
              <button 
                onClick={() => setSelectedEnquiry(null)}
                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">{selectedEnquiry.business_name}</h3>
                {getStatusBadge(selectedEnquiry.status)}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">Contact Person</div>
                  <div className="font-medium text-gray-900">{selectedEnquiry.contact_person}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="text-xs text-gray-500 mb-1">Category</div>
                  <div className="font-medium text-gray-900">{selectedEnquiry.category || 'N/A'}</div>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Phone size={18} /></div>
                  <div>
                    <div className="text-xs text-gray-500">Phone Number</div>
                    <div className="font-medium text-gray-900">{selectedEnquiry.phone_number}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Mail size={18} /></div>
                  <div>
                    <div className="text-xs text-gray-500">Email Address</div>
                    <div className="font-medium text-gray-900">{selectedEnquiry.email || 'N/A'}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Calendar size={18} /></div>
                  <div>
                    <div className="text-xs text-gray-500">Submitted On</div>
                    <div className="font-medium text-gray-900">{new Date(selectedEnquiry.created_at).toLocaleString()}</div>
                  </div>
                </div>
              </div>

              {selectedEnquiry.message && (
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">Custom Message</h3>
                  <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap bg-gray-50 p-4 rounded-lg border border-gray-100">
                    {selectedEnquiry.message}
                  </p>
                </div>
              )}
            </div>

            <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-2">
              {selectedEnquiry.status === 'pending' && (
                <button 
                  onClick={() => handleUpdateStatus(selectedEnquiry.id, 'contacted')}
                  className="flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg font-medium transition-colors"
                >
                  <CheckCircle size={18} />
                  Mark Contacted
                </button>
              )}
              {selectedEnquiry.status !== 'closed' && (
                <button 
                  onClick={() => handleUpdateStatus(selectedEnquiry.id, 'closed')}
                  className="flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg font-medium transition-colors"
                >
                  <CheckCircle size={18} />
                  Mark Closed
                </button>
              )}
              {selectedEnquiry.status !== 'pending' && (
                <button 
                  onClick={() => handleUpdateStatus(selectedEnquiry.id, 'pending')}
                  className="flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium transition-colors"
                >
                  <Clock size={18} />
                  Revert to Pending
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
