import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Trash2,
  Phone,
  Mail,
  Calendar,
  Users,
  MapPin,
  MessageSquare,
  CheckCircle2,
  Clock,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Download,
  Share2,
  FileSpreadsheet,
  Check,
  X,
  Sparkles,
  ArrowUpDown,
  Send,
  Loader2
} from 'lucide-react';

export type EnquiryStatus = 'New' | 'Contacted' | 'In Progress' | 'Completed' | 'Cancelled';
export type EnquiryCategory = 'Domestic' | 'International' | 'Custom' | 'Service' | 'General';

export interface AdminEnquiry {
  id: string;
  enquiryReference: string;
  date: string;
  time: string;
  customerName: string;
  phoneNumber: string;
  email?: string;
  destination?: string;
  packageName?: string;
  category: EnquiryCategory;
  travelDate?: string;
  returnDate?: string;
  numberOfTravellers?: string;
  adults?: number;
  children?: number;
  budget?: string;
  tripType?: string;
  departureCity?: string;
  customerMessage?: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
  googleSheetStatus: 'synced' | 'pending' | 'failed' | 'not_configured';
  googleSheetError?: string;
  emailNotificationStatus: 'sent' | 'pending' | 'failed' | 'logged';
}

interface StatusCounts {
  total: number;
  new: number;
  contacted: number;
  inProgress: number;
  completed: number;
  cancelled: number;
}

interface GoogleSheetsConfig {
  isConfigured: boolean;
  mode: string;
  spreadsheetId: string | null;
  serviceAccountEmail: string | null;
  hasWebhook: boolean;
}

export const AdminEnquiriesManager: React.FC = () => {
  const [enquiries, setEnquiries] = useState<AdminEnquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusCounts, setStatusCounts] = useState<StatusCounts>({
    total: 0,
    new: 0,
    contacted: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0
  });
  const [googleSheetsConfig, setGoogleSheetsConfig] = useState<GoogleSheetsConfig | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Selected enquiry for details modal
  const [activeEnquiry, setActiveEnquiry] = useState<AdminEnquiry | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);
  const [isResyncing, setIsResyncing] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, [selectedStatus, selectedCategory]);

  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.set('search', searchTerm);
      if (selectedStatus !== 'All') queryParams.set('status', selectedStatus);
      if (selectedCategory !== 'All') queryParams.set('category', selectedCategory);

      const res = await fetch(`/api/admin/enquiries?${queryParams.toString()}`);
      if (!res.ok) {
        throw new Error('Failed to fetch customer enquiries.');
      }
      const data = await res.json();
      setEnquiries(data.enquiries || []);
      if (data.statusCounts) {
        setStatusCounts(data.statusCounts);
      }
      if (data.googleSheetsConfig) {
        setGoogleSheetsConfig(data.googleSheetsConfig);
      }
    } catch (err: any) {
      setError(err.message || 'Error loading enquiries.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEnquiries();
  };

  const handleStatusChange = async (id: string, newStatus: EnquiryStatus) => {
    setIsUpdatingStatus(id);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || 'Failed to update status');
      }

      const data = await res.json();
      
      // Update in local state
      setEnquiries(prev => prev.map(item => (item.id === id ? data.enquiry : item)));
      if (activeEnquiry && activeEnquiry.id === id) {
        setActiveEnquiry(data.enquiry);
      }

      // Refresh counts
      const updatedCounts = { ...statusCounts };
      fetchEnquiries();

      setActionSuccessMsg(`Status updated to "${newStatus}" for ${id}`);
      setTimeout(() => setActionSuccessMsg(null), 3000);
    } catch (err: any) {
      alert(`Error updating status: ${err.message}`);
    } finally {
      setIsUpdatingStatus(null);
    }
  };

  const handleResyncGoogleSheet = async (id: string) => {
    setIsResyncing(id);
    try {
      const res = await fetch(`/api/admin/enquiries/${id}/resync`, {
        method: 'POST'
      });
      const data = await res.json();
      if (data.enquiry) {
        setEnquiries(prev => prev.map(item => (item.id === id ? data.enquiry : item)));
        if (activeEnquiry && activeEnquiry.id === id) {
          setActiveEnquiry(data.enquiry);
        }
      }
      setActionSuccessMsg(data.message || 'Google Sheets sync triggered.');
      setTimeout(() => setActionSuccessMsg(null), 3500);
    } catch (err: any) {
      alert(`Sync failed: ${err.message}`);
    } finally {
      setIsResyncing(null);
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'DELETE'
      });
      if (!res.ok) throw new Error('Failed to delete enquiry record.');

      setEnquiries(prev => prev.filter(item => item.id !== id));
      if (activeEnquiry && activeEnquiry.id === id) {
        setActiveEnquiry(null);
      }
      setDeleteConfirmId(null);
      setActionSuccessMsg(`Enquiry ${id} was deleted.`);
      setTimeout(() => setActionSuccessMsg(null), 3000);
      fetchEnquiries();
    } catch (err: any) {
      alert(`Delete error: ${err.message}`);
    }
  };

  const handleExportCSV = () => {
    if (enquiries.length === 0) return;

    // Headers matching the Google Sheets specification
    const headers = [
      'Enquiry Reference',
      'Date',
      'Time',
      'Customer Name',
      'Phone Number',
      'Email',
      'Destination',
      'Package',
      'Domestic / International',
      'Travel Date',
      'Number of Travellers',
      'Customer Message',
      'Status'
    ];

    const rows = enquiries.map(e => [
      `"${e.enquiryReference}"`,
      `"${e.date}"`,
      `"${e.time}"`,
      `"${e.customerName.replace(/"/g, '""')}"`,
      `"${e.phoneNumber.replace(/"/g, '""')}"`,
      `"${(e.email || '').replace(/"/g, '""')}"`,
      `"${(e.destination || '').replace(/"/g, '""')}"`,
      `"${(e.packageName || '').replace(/"/g, '""')}"`,
      `"${e.category}"`,
      `"${e.travelDate || ''}"`,
      `"${e.numberOfTravellers || ''}"`,
      `"${(e.customerMessage || '').replace(/"/g, '""')}"`,
      `"${e.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `HappyJourneyHolidays_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getStatusBadge = (status: EnquiryStatus) => {
    switch (status) {
      case 'New':
        return 'bg-amber-950/80 text-amber-300 border-amber-800';
      case 'Contacted':
        return 'bg-sky-950/80 text-sky-300 border-sky-800';
      case 'In Progress':
        return 'bg-blue-950/80 text-[#38B6FF] border-blue-800';
      case 'Completed':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800';
      case 'Cancelled':
        return 'bg-slate-800 text-slate-400 border-slate-700';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const getCategoryBadge = (category: EnquiryCategory) => {
    switch (category) {
      case 'Domestic':
        return 'bg-[#002b54] text-[#38B6FF] border-[#00478a]';
      case 'International':
        return 'bg-[#3b1700] text-[#F27D26] border-[#702e00]';
      case 'Custom':
        return 'bg-purple-950 text-purple-300 border-purple-800';
      default:
        return 'bg-[#001c38] text-slate-300 border-[#002b54]';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner: Status and Google Sheets Integration Indicator */}
      <div className="bg-[#001329] border border-[#002B54] rounded-2xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#002244] border border-[#003E7E] flex items-center justify-center text-[#F27D26]">
            <FileSpreadsheet size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-heading font-bold text-white">
                Customer Enquiry Management
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Google Sheets Live Sync
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Real-time synchronization for quotes, custom itineraries, and WhatsApp booking leads.
            </p>
          </div>
        </div>

        {/* Google Sheets Config Pill */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={fetchEnquiries}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-[#002244] text-slate-200 border border-[#003e7e] hover:bg-[#002f5e] transition"
            title="Refresh Table"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            disabled={enquiries.length === 0}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-900/80 text-emerald-200 border border-emerald-700 hover:bg-emerald-800 transition disabled:opacity-50"
            title="Export CSV in Google Sheets Format"
          >
            <Download size={13} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Action Notification Toast */}
      {actionSuccessMsg && (
        <div className="p-3 bg-emerald-950/90 border border-emerald-700 text-emerald-200 rounded-xl text-xs font-medium flex items-center justify-between animate-in fade-in duration-200">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>{actionSuccessMsg}</span>
          </div>
          <button onClick={() => setActionSuccessMsg(null)} className="text-emerald-400 hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Status Counters Bar (Google Sheets Style Stats) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <button
          onClick={() => setSelectedStatus('All')}
          className={`p-3.5 rounded-2xl border text-left transition ${
            selectedStatus === 'All'
              ? 'bg-[#002447] border-[#38B6FF] text-white shadow-md'
              : 'bg-[#001329] border-[#002B54] text-slate-300 hover:bg-[#001c38]'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Enquiries
          </span>
          <span className="text-2xl font-black text-white">{statusCounts.total}</span>
        </button>

        <button
          onClick={() => setSelectedStatus('New')}
          className={`p-3.5 rounded-2xl border text-left transition ${
            selectedStatus === 'New'
              ? 'bg-amber-950/80 border-amber-500 text-white shadow-md'
              : 'bg-[#001329] border-[#002B54] text-slate-300 hover:bg-[#001c38]'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block mb-1">
            🟡 New / Unread
          </span>
          <span className="text-2xl font-black text-amber-300">{statusCounts.new}</span>
        </button>

        <button
          onClick={() => setSelectedStatus('Contacted')}
          className={`p-3.5 rounded-2xl border text-left transition ${
            selectedStatus === 'Contacted'
              ? 'bg-sky-950/80 border-sky-500 text-white shadow-md'
              : 'bg-[#001329] border-[#002B54] text-slate-300 hover:bg-[#001c38]'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-sky-400 block mb-1">
            🔵 Contacted
          </span>
          <span className="text-2xl font-black text-sky-300">{statusCounts.contacted}</span>
        </button>

        <button
          onClick={() => setSelectedStatus('In Progress')}
          className={`p-3.5 rounded-2xl border text-left transition ${
            selectedStatus === 'In Progress'
              ? 'bg-blue-950/80 border-blue-500 text-white shadow-md'
              : 'bg-[#001329] border-[#002B54] text-slate-300 hover:bg-[#001c38]'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#38B6FF] block mb-1">
            🟣 In Progress
          </span>
          <span className="text-2xl font-black text-[#38B6FF]">{statusCounts.inProgress}</span>
        </button>

        <button
          onClick={() => setSelectedStatus('Completed')}
          className={`p-3.5 rounded-2xl border text-left transition ${
            selectedStatus === 'Completed'
              ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-md'
              : 'bg-[#001329] border-[#002B54] text-slate-300 hover:bg-[#001c38]'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400 block mb-1">
            🟢 Completed
          </span>
          <span className="text-2xl font-black text-emerald-300">{statusCounts.completed}</span>
        </button>

        <button
          onClick={() => setSelectedStatus('Cancelled')}
          className={`p-3.5 rounded-2xl border text-left transition ${
            selectedStatus === 'Cancelled'
              ? 'bg-slate-900 border-slate-500 text-white shadow-md'
              : 'bg-[#001329] border-[#002B54] text-slate-300 hover:bg-[#001c38]'
          }`}
        >
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            ⚪ Cancelled
          </span>
          <span className="text-2xl font-black text-slate-400">{statusCounts.cancelled}</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#001329] border border-[#002B54] rounded-2xl p-4 shadow-md flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex-1 relative">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by customer name, phone number, or enquiry reference (e.g. HJH-829104)..."
            className="w-full pl-10 pr-24 py-2.5 bg-[#000e1f] text-white border border-[#002B54] rounded-xl text-xs focus:ring-2 focus:ring-[#F27D26] focus:border-transparent outline-none"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 px-3 py-1.5 rounded-lg bg-[#002447] text-[#38B6FF] border border-[#00478a] text-xs font-bold hover:bg-[#003366] transition"
          >
            Search
          </button>
        </form>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-[#000e1f] border border-[#002B54] px-3 py-2 rounded-xl text-xs text-slate-300">
            <Filter size={13} className="text-slate-400" />
            <span className="text-slate-400">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-white font-semibold outline-none cursor-pointer"
            >
              <option value="All" className="bg-[#001329]">All Categories</option>
              <option value="Domestic" className="bg-[#001329]">Domestic</option>
              <option value="International" className="bg-[#001329]">International</option>
              <option value="Custom" className="bg-[#001329]">Custom Trip</option>
              <option value="Service" className="bg-[#001329]">Services</option>
            </select>
          </div>

          {(searchTerm || selectedStatus !== 'All' || selectedCategory !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('All');
                setSelectedCategory('All');
              }}
              className="px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-[#000e1f] border border-[#002B54] hover:bg-[#002244] transition"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Google Sheets Style Enquiries Data Table */}
      <div className="bg-[#001329] border border-[#002B54] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#000a17] text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-[#002B54]">
                <th className="py-3 px-4">Enquiry Ref</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Phone / WhatsApp</th>
                <th className="py-3 px-4">Destination / Tour</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Travel Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#002B54]/60 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    <Loader2 size={24} className="animate-spin mx-auto text-[#F27D26] mb-2" />
                    <p>Loading enquiries from Google Sheets database...</p>
                  </td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-12 text-center text-slate-400 space-y-2">
                    <Inbox size={32} className="mx-auto text-slate-600" />
                    <p className="font-semibold text-sm">No enquiries found</p>
                    <p className="text-[11px] text-slate-500">
                      {searchTerm || selectedStatus !== 'All'
                        ? 'Try clearing your search terms or filters.'
                        : 'Customer enquiries submitted from your website will appear here in real-time.'}
                    </p>
                  </td>
                </tr>
              ) : (
                enquiries.map((enq) => {
                  const cleanPhone = enq.phoneNumber.replace(/[^0-9]/g, '');
                  const waPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
                  const waText = encodeURIComponent(
                    `Hello ${enq.customerName}, Happy Journey Holidays Coimbatore here! Regarding your enquiry ${enq.enquiryReference} for ${enq.destination || 'your trip'} — we are ready with your customized quotation.`
                  );
                  const waLink = `https://wa.me/${waPhone}?text=${waText}`;

                  return (
                    <tr
                      key={enq.id}
                      className="hover:bg-[#001b3a]/70 transition-colors group cursor-pointer"
                      onClick={() => setActiveEnquiry(enq)}
                    >
                      {/* Enquiry Ref */}
                      <td className="py-3.5 px-4">
                        <span className="font-mono font-bold text-[#F27D26] group-hover:underline">
                          {enq.enquiryReference}
                        </span>
                      </td>

                      {/* Date & Time */}
                      <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                        <div className="font-medium text-slate-200">{enq.date}</div>
                        <div className="text-[10px] text-slate-500">{enq.time}</div>
                      </td>

                      {/* Customer Name */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white group-hover:text-[#38B6FF] transition">
                          {enq.customerName}
                        </div>
                        {enq.email && (
                          <div className="text-[10px] text-slate-400 truncate max-w-[140px]" title={enq.email}>
                            {enq.email}
                          </div>
                        )}
                      </td>

                      {/* Phone */}
                      <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center gap-1.5">
                          <a
                            href={`tel:${enq.phoneNumber}`}
                            className="font-mono text-emerald-400 hover:text-emerald-300 font-semibold flex items-center gap-1"
                            title="Call customer"
                          >
                            <Phone size={12} />
                            <span>{enq.phoneNumber}</span>
                          </a>
                          <a
                            href={waLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800 hover:bg-emerald-800 hover:text-white transition"
                            title="Reply on WhatsApp"
                          >
                            <Share2 size={12} />
                          </a>
                        </div>
                      </td>

                      {/* Destination / Package */}
                      <td className="py-3.5 px-4 max-w-[180px]">
                        <div className="font-medium text-slate-200 truncate" title={enq.destination || enq.packageName}>
                          {enq.destination || enq.packageName || 'Trip Enquiry'}
                        </div>
                        {enq.numberOfTravellers && (
                          <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                            <Users size={10} />
                            <span>{enq.numberOfTravellers}</span>
                          </div>
                        )}
                      </td>

                      {/* Category */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getCategoryBadge(enq.category)}`}>
                          {enq.category}
                        </span>
                      </td>

                      {/* Travel Date */}
                      <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                        {enq.travelDate ? (
                          <span className="font-mono text-slate-200">{enq.travelDate}</span>
                        ) : (
                          <span className="text-slate-500 italic text-[11px]">Flexible</span>
                        )}
                      </td>

                      {/* Status Dropdown */}
                      <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="relative inline-block">
                          <select
                            value={enq.status}
                            disabled={isUpdatingStatus === enq.id}
                            onChange={(e) => handleStatusChange(enq.id, e.target.value as EnquiryStatus)}
                            className={`px-2.5 py-1 rounded-full text-[11px] font-bold border outline-none cursor-pointer transition ${getStatusBadge(enq.status)}`}
                          >
                            <option value="New" className="bg-[#001329] text-amber-300">New</option>
                            <option value="Contacted" className="bg-[#001329] text-sky-300">Contacted</option>
                            <option value="In Progress" className="bg-[#001329] text-[#38B6FF]">In Progress</option>
                            <option value="Completed" className="bg-[#001329] text-emerald-300">Completed</option>
                            <option value="Cancelled" className="bg-[#001329] text-slate-400">Cancelled</option>
                          </select>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setActiveEnquiry(enq)}
                            className="p-1.5 rounded-lg bg-[#002244] text-[#38B6FF] hover:bg-[#003366] transition border border-[#003e7e]"
                            title="View Full Details"
                          >
                            <Eye size={14} />
                          </button>

                          <button
                            onClick={() => setDeleteConfirmId(enq.id)}
                            className="p-1.5 rounded-lg bg-rose-950/60 text-rose-300 hover:bg-rose-900 transition border border-rose-800"
                            title="Delete Record"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-3 bg-[#000a17] border-t border-[#002B54] text-[11px] text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            Showing <strong className="text-white">{enquiries.length}</strong> of <strong className="text-white">{statusCounts.total}</strong> customer enquiries
          </div>
          <div className="flex items-center gap-2">
            <span>Google Sheet Columns: Reference • Date • Time • Name • Phone • Email • Destination • Package • Category • Travel Date • Travellers • Notes • Status</span>
          </div>
        </div>
      </div>

      {/* ENQUIRY DETAILS MODAL / DRAWER */}
      {activeEnquiry && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveEnquiry(null);
          }}
        >
          <div className="bg-[#001529] rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-[#002B54] animate-in zoom-in-95 duration-200 text-white">
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#000a17]/95 backdrop-blur p-5 border-b border-[#002B54] flex items-center justify-between z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#002244] border border-[#003e7e] flex items-center justify-center text-[#F27D26]">
                  <FileSpreadsheet size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-black text-lg text-[#F27D26]">
                      {activeEnquiry.enquiryReference}
                    </span>
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(activeEnquiry.status)}`}>
                      {activeEnquiry.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Received on {activeEnquiry.date} at {activeEnquiry.time}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveEnquiry(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Quick Status Bar & Actions */}
              <div className="bg-[#000a17] border border-[#002B54] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-slate-400">Change Status:</span>
                  <select
                    value={activeEnquiry.status}
                    onChange={(e) => handleStatusChange(activeEnquiry.id, e.target.value as EnquiryStatus)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold border outline-none cursor-pointer ${getStatusBadge(activeEnquiry.status)}`}
                  >
                    <option value="New" className="bg-[#001329] text-amber-300">New</option>
                    <option value="Contacted" className="bg-[#001329] text-sky-300">Contacted</option>
                    <option value="In Progress" className="bg-[#001329] text-[#38B6FF]">In Progress</option>
                    <option value="Completed" className="bg-[#001329] text-emerald-300">Completed</option>
                    <option value="Cancelled" className="bg-[#001329] text-slate-400">Cancelled</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleResyncGoogleSheet(activeEnquiry.id)}
                    disabled={isResyncing === activeEnquiry.id}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#002244] text-[#38B6FF] border border-[#003e7e] text-xs font-bold hover:bg-[#003366] transition disabled:opacity-50"
                  >
                    <RefreshCw size={12} className={isResyncing === activeEnquiry.id ? 'animate-spin' : ''} />
                    <span>Re-sync to Sheet</span>
                  </button>
                </div>
              </div>

              {/* Customer Contact Card */}
              <div className="bg-[#000e1f] border border-[#002B54] rounded-2xl p-5 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F27D26] block">
                  Customer Contact Information
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-400 block">Full Name:</span>
                    <span className="text-base font-bold text-white">{activeEnquiry.customerName}</span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block">Phone / WhatsApp:</span>
                    <a href={`tel:${activeEnquiry.phoneNumber}`} className="text-base font-mono font-bold text-emerald-400 hover:underline">
                      {activeEnquiry.phoneNumber}
                    </a>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block">Email Address:</span>
                    <span className="text-sm font-semibold text-slate-200">
                      {activeEnquiry.email || 'Not Provided'}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block">Departure City:</span>
                    <span className="text-sm font-semibold text-slate-200">
                      {activeEnquiry.departureCity || 'Coimbatore / Tamil Nadu'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Trip & Package Requirements */}
              <div className="bg-[#000e1f] border border-[#002B54] rounded-2xl p-5 space-y-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#38B6FF] block">
                  Tour & Itinerary Requirements
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-xs text-slate-400 block">Destination / Tour:</span>
                    <span className="text-base font-bold text-[#F27D26]">
                      {activeEnquiry.destination || activeEnquiry.packageName || 'Custom Request'}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block">Category:</span>
                    <span className={`inline-block mt-0.5 px-2.5 py-0.5 rounded-full text-xs font-bold border ${getCategoryBadge(activeEnquiry.category)}`}>
                      {activeEnquiry.category} Holiday
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block">Travel Date:</span>
                    <span className="text-sm font-semibold text-white">
                      {activeEnquiry.travelDate || 'Flexible Travel Date'}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block">Number of Travellers:</span>
                    <span className="text-sm font-semibold text-white">
                      {activeEnquiry.numberOfTravellers || '2 Adults'}
                    </span>
                  </div>

                  {activeEnquiry.budget && (
                    <div>
                      <span className="text-xs text-slate-400 block">Estimated Budget:</span>
                      <span className="text-sm font-semibold text-amber-300">
                        {activeEnquiry.budget}
                      </span>
                    </div>
                  )}

                  {activeEnquiry.tripType && (
                    <div>
                      <span className="text-xs text-slate-400 block">Trip Style / Purpose:</span>
                      <span className="text-sm font-semibold text-purple-300">
                        {activeEnquiry.tripType}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Notes & Message */}
              {activeEnquiry.customerMessage && (
                <div className="bg-[#000e1f] border border-[#002B54] rounded-2xl p-5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Customer Message & Special Notes
                  </span>
                  <div className="p-3 bg-[#001329] border border-[#002B54] rounded-xl text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                    {activeEnquiry.customerMessage}
                  </div>
                </div>
              )}

              {/* Integration Sync Audit */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-[#000a17] border border-[#002B54] rounded-xl flex items-center justify-between">
                  <span className="text-slate-400">Google Sheet:</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 size={13} />
                    <span>Row Appended</span>
                  </span>
                </div>

                <div className="p-3 bg-[#000a17] border border-[#002B54] rounded-xl flex items-center justify-between">
                  <span className="text-slate-400">Email Notification:</span>
                  <span className="font-semibold text-[#38B6FF] flex items-center gap-1">
                    <Mail size={13} />
                    <span>happyjourneyholidayscbe@gmail.com</span>
                  </span>
                </div>
              </div>

              {/* Direct Outreach Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                {(() => {
                  const cleanPhone = activeEnquiry.phoneNumber.replace(/[^0-9]/g, '');
                  const waPhone = cleanPhone.startsWith('91') ? cleanPhone : `91${cleanPhone}`;
                  const waText = encodeURIComponent(
                    `Hello ${activeEnquiry.customerName}, thank you for contacting Happy Journey Holidays Coimbatore regarding your enquiry ${activeEnquiry.enquiryReference} for ${activeEnquiry.destination || 'your trip'}. We would love to share your personalized itinerary!`
                  );
                  const waLink = `https://wa.me/${waPhone}?text=${waText}`;

                  return (
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow transition active:scale-95 text-sm"
                    >
                      <Share2 size={16} />
                      <span>Reply on WhatsApp</span>
                    </a>
                  );
                })()}

                <a
                  href={`tel:${activeEnquiry.phoneNumber}`}
                  className="bg-[#002244] hover:bg-[#003366] text-[#38B6FF] font-bold py-3 px-5 rounded-xl text-sm transition border border-[#003e7e] flex items-center justify-center gap-2"
                >
                  <Phone size={16} />
                  <span>Call Customer</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmId && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
          onClick={() => setDeleteConfirmId(null)}
        >
          <div
            className="bg-[#001529] rounded-3xl p-6 max-w-sm w-full border border-rose-800 shadow-2xl text-center space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-rose-950 text-rose-400 border border-rose-800 flex items-center justify-center mx-auto">
              <Trash2 size={24} />
            </div>
            <h4 className="text-lg font-bold text-white">Delete Enquiry Record?</h4>
            <p className="text-xs text-slate-300">
              Are you sure you want to permanently delete enquiry <strong className="text-white">{deleteConfirmId}</strong>? This cannot be undone.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#002244] text-slate-300 font-semibold text-xs border border-[#003e7e]"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteEnquiry(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
