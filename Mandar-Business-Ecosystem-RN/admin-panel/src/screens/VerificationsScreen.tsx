import { useState, useEffect } from "react";
import axios from "axios";
import { 
  BadgeCheck, 
  CheckCircle, 
  XCircle, 
  Mail, 
  Phone, 
  Calendar,
  Search,
  Filter,
  X,
  ChevronRight,
  ChevronLeft,
  FileText,
  MapPin,
  Building2
} from "lucide-react";

export default function VerificationsScreen() {
  const [verifications, setVerifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Modal
  const [selectedBusiness, setSelectedBusiness] = useState<any | null>(null);
  
  // Reject reason state
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");

  useEffect(() => {
    fetchVerifications();
  }, []);

  const fetchVerifications = async () => {
    try {
      const token = localStorage.getItem("adminToken");
      const res = await axios.get("http://localhost:5000/api/admin/verifications", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.data?.data) {
        setVerifications(res.data.data);
      }
    } catch (error) {
      console.error("Error fetching verifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!window.confirm("Approve this business for the Blue Tick verification?")) return;
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(`http://localhost:5000/api/admin/verifications/${id}/approve`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setVerifications(prev => prev.map(biz => biz.id === id ? { ...biz, verification_status: 'verified', verified: true } : biz));
      if (selectedBusiness && selectedBusiness.id === id) {
        setSelectedBusiness({ ...selectedBusiness, verification_status: 'verified', verified: true });
      }
    } catch (err) {
      alert("Failed to approve business");
    }
  };
  
  const handleRejectSubmit = async () => {
    if (!rejectingId) return;
    if (rejectionReason.length === 0) {
      alert("Please provide a reason.");
      return;
    }
    if (rejectionReason.length > 100) {
      alert("Reason must be under 100 characters.");
      return;
    }
    
    try {
      const token = localStorage.getItem("adminToken");
      await axios.put(`http://localhost:5000/api/admin/verifications/${rejectingId}/reject`, 
        { reason: rejectionReason },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      setVerifications(prev => prev.map(biz => biz.id === rejectingId ? { 
        ...biz, 
        verification_status: 'rejected',
        verification_rejection_reason: rejectionReason 
      } : biz));
      
      if (selectedBusiness && selectedBusiness.id === rejectingId) {
        setSelectedBusiness({ 
          ...selectedBusiness, 
          verification_status: 'rejected',
          verification_rejection_reason: rejectionReason 
        });
      }
      
      setRejectingId(null);
      setRejectionReason("");
    } catch (err) {
      alert("Failed to reject business");
    }
  };

  // Filter logic
  const filteredVerifications = verifications.filter(biz => {
    // Status filter
    if (statusFilter !== "all" && biz.verification_status !== statusFilter) return false;
    
    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const nameMatch = biz.business_name?.toLowerCase().includes(term);
      const personMatch = biz.contact_person?.toLowerCase().includes(term);
      const emailMatch = biz.email?.toLowerCase().includes(term);
      if (!nameMatch && !personMatch && !emailMatch) return false;
    }
    
    return true;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredVerifications.length / itemsPerPage);
  const paginatedVerifications = filteredVerifications.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-medium bg-emerald-100 text-emerald-700">Verified</span>;
      case 'rejected':
        return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-medium bg-red-100 text-red-700">Rejected</span>;
      default:
        return <span className="inline-flex items-center gap-1.5 py-1 px-2.5 rounded-md text-xs font-bold bg-blue-100 text-blue-700">Pending Review</span>;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 120px)' }}>
      {/* Header & Controls */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              <BadgeCheck className="text-blue-600" size={28} />
              Verifications
            </h1>
            <p className="text-sm text-gray-500 mt-1">Review business identities for the Blue Tick verification.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Search by business name, owner, or email..."
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
                <option value="verified">Verified</option>
                <option value="rejected">Rejected</option>
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
        ) : filteredVerifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-500">
            <BadgeCheck size={48} className="text-gray-300 mb-3" />
            <p className="text-lg font-medium text-gray-600">No verification requests</p>
          </div>
        ) : (
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="uppercase tracking-wider border-b-2 border-gray-200 bg-gray-100 text-gray-600 font-medium sticky top-0 z-10">
              <tr>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Business</th>
                <th className="px-6 py-4">Document Type</th>
                <th className="px-6 py-4">Submitted Date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedVerifications.map(biz => (
                <tr 
                  key={biz.id} 
                  onClick={() => setSelectedBusiness(biz)}
                  className={`hover:bg-blue-50 transition-colors cursor-pointer ${biz.verification_status === 'pending' ? 'bg-white font-medium' : 'bg-gray-50 text-gray-600'}`}
                >
                  <td className="px-6 py-4">
                    {getStatusBadge(biz.verification_status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-bold text-gray-900">{biz.business_name}</div>
                    <div className="text-gray-500 text-xs mt-1">{biz.contact_person}</div>
                  </td>
                  <td className="px-6 py-4 font-medium">
                    {biz.verification_document_type || 'N/A'}
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    {new Date(biz.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {biz.verification_status === 'pending' && (
                        <>
                          <button 
                            onClick={(e) => handleApprove(biz.id, e)}
                            className="px-3 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-xs font-medium border border-emerald-200"
                          >
                            Approve
                          </button>
                          <button 
                            onClick={(e) => { e.stopPropagation(); setRejectingId(biz.id); }}
                            className="px-3 py-1 bg-red-50 text-red-700 hover:bg-red-100 rounded text-xs font-medium border border-red-200"
                          >
                            Reject
                          </button>
                        </>
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
      {!loading && filteredVerifications.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-white flex items-center justify-between text-sm text-gray-600">
          <div>
            Showing <span className="font-semibold text-gray-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold text-gray-900">{Math.min(currentPage * itemsPerPage, filteredVerifications.length)}</span> of <span className="font-semibold text-gray-900">{filteredVerifications.length}</span> results
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded border border-gray-200 disabled:opacity-50 hover:bg-gray-50"
            >
              <ChevronLeft size={20} />
            </button>
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

      {/* Rejection Prompt Modal */}
      {rejectingId && (
        <div className="fixed inset-0 bg-gray-900/60 z-[60] flex items-center justify-center animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Reject Verification</h3>
            <p className="text-sm text-gray-500 mb-4">Provide a reason for rejection (max 100 characters). This will be shown to the user.</p>
            <textarea
              className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-red-500 outline-none resize-none"
              rows={3}
              maxLength={100}
              placeholder="e.g. Document image is too blurry to read."
              value={rejectionReason}
              onChange={e => setRejectionReason(e.target.value)}
            />
            <div className="text-right text-xs text-gray-400 mt-1">{rejectionReason.length}/100</div>
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => { setRejectingId(null); setRejectionReason(""); }}
                className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium"
              >Cancel</button>
              <button 
                onClick={handleRejectSubmit}
                className="flex-1 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium"
              >Confirm Reject</button>
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Modal for full details */}
      {selectedBusiness && (
        <div className="fixed inset-0 bg-gray-900/40 z-50 flex justify-end animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-gray-50">
              <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                <BadgeCheck size={20} className="text-blue-600" />
                Review Verification
              </h2>
              <button 
                onClick={() => setSelectedBusiness(null)}
                className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 flex-1 overflow-y-auto space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-bold text-gray-900">{selectedBusiness.business_name}</h3>
                {getStatusBadge(selectedBusiness.verification_status)}
              </div>

              {selectedBusiness.verification_status === 'rejected' && selectedBusiness.verification_rejection_reason && (
                <div className="bg-red-50 border border-red-100 p-4 rounded-lg">
                  <div className="text-red-800 font-bold text-sm mb-1">Rejection Reason:</div>
                  <div className="text-red-600 text-sm">{selectedBusiness.verification_rejection_reason}</div>
                </div>
              )}

              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 font-bold text-gray-700 flex justify-between">
                  <span>Document Uploaded</span>
                  <span className="text-blue-600">{selectedBusiness.verification_document_type || 'Unknown'}</span>
                </div>
                <div className="p-4 flex flex-col items-center justify-center bg-gray-100" style={{ minHeight: '200px' }}>
                  {selectedBusiness.verification_document_url ? (
                    <a href={selectedBusiness.verification_document_url} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-3 text-blue-600 hover:text-blue-800">
                      <FileText size={48} />
                      <span className="font-medium">View Document Attachment</span>
                    </a>
                  ) : (
                    <div className="text-gray-400 flex flex-col items-center gap-2">
                      <FileText size={48} />
                      <span>No document available (Purged)</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-100 pt-6 space-y-4">
                <h4 className="font-bold text-gray-400 uppercase tracking-wider text-xs mb-2">Business Details</h4>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 text-gray-600 rounded-lg"><Building2 size={18} /></div>
                  <div>
                    <div className="text-xs text-gray-500">Owner Name</div>
                    <div className="font-medium text-gray-900">{selectedBusiness.contact_person}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 text-gray-600 rounded-lg"><MapPin size={18} /></div>
                  <div>
                    <div className="text-xs text-gray-500">Location</div>
                    <div className="font-medium text-gray-900">{selectedBusiness.city}, {selectedBusiness.state}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 text-gray-600 rounded-lg"><Phone size={18} /></div>
                  <div>
                    <div className="text-xs text-gray-500">Phone Number</div>
                    <div className="font-medium text-gray-900">{selectedBusiness.mobile}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-100 text-gray-600 rounded-lg"><Mail size={18} /></div>
                  <div>
                    <div className="text-xs text-gray-500">Email Address</div>
                    <div className="font-medium text-gray-900">{selectedBusiness.email || 'N/A'}</div>
                  </div>
                </div>
              </div>
            </div>

            {selectedBusiness.verification_status === 'pending' && (
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex gap-2">
                <button 
                  onClick={() => setRejectingId(selectedBusiness.id)}
                  className="flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors"
                >
                  <XCircle size={18} />
                  Reject
                </button>
                <button 
                  onClick={() => handleApprove(selectedBusiness.id)}
                  className="flex-1 flex justify-center items-center gap-2 px-4 py-2 bg-emerald-600 text-white hover:bg-emerald-700 rounded-lg font-medium transition-colors"
                >
                  <CheckCircle size={18} />
                  Approve
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
