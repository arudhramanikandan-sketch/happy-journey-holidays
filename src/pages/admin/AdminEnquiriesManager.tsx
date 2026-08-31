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

export type EnquiryStatus = 
  | 'NEW' 
  | 'CONTACTED' 
  | 'QUOTE SENT' 
  | 'CONFIRMED' 
  | 'LOST / CANCELLED' 
  | 'CLOSED';

export type EnquiryCategory = 'Domestic' | 'International' | 'Custom' | 'Service' | 'General';
export type EnquirySource = 'Website Enquiry' | 'WhatsApp Direct';

export interface AdminEnquiry {
  id: string;
  enquiryReference: string;
  source?: EnquirySource;
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
  specialRequirements?: string;
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
  quoteSent: number;
  confirmed: number;
  lostCancelled: number;
  closed: number;
}

interface SourceCounts {
  website: number;
  whatsapp: number;
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
    quoteSent: 0,
    confirmed: 0,
    lostCancelled: 0,
    closed: 0
  });
  const [sourceCounts, setSourceCounts] = useState<SourceCounts>({
    website: 0,
    whatsapp: 0
  });
  const [googleSheetsConfig, setGoogleSheetsConfig] = useState<GoogleSheetsConfig | null>(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSource, setSelectedSource] = useState<string>('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState<string>('All');

  // Selected enquiry for details modal
  const [activeEnquiry, setActiveEnquiry] = useState<AdminEnquiry | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState<string | null>(null);
  const [isResyncing, setIsResyncing] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [actionSuccessMsg, setActionSuccessMsg] = useState<string | null>(null);

  useEffect(() => {
    fetchEnquiries();
  }, [selectedStatus, selectedCategory, selectedSource, selectedDateFilter]);

  const fetchEnquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const queryParams = new URLSearchParams();
      if (searchTerm) queryParams.set('search', searchTerm);
      if (selectedStatus !== 'All') queryParams.set('status', selectedStatus);
      if (selectedCategory !== 'All') queryParams.set('category', selectedCategory);
      if (selectedSource !== 'All') queryParams.set('source', selectedSource);
      if (selectedDateFilter !== 'All') queryParams.set('dateFilter', selectedDateFilter);

      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/admin/enquiries?${queryParams.toString()}`, { headers });
      if (!res.ok) {
        throw new Error('Failed to fetch customer enquiries.');
      }
      const data = await res.json();
      setEnquiries(data.enquiries || []);
      if (data.statusCounts) {
        setStatusCounts(data.statusCounts);
      }
      if (data.sourceCounts) {
        setSourceCounts(data.sourceCounts);
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
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/admin/enquiries/${id}/status`, {
        method: 'PATCH',
        headers,
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
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/admin/enquiries/${id}/resync`, {
        method: 'POST',
        headers
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
      const token = localStorage.getItem('admin_token');
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(`/api/admin/enquiries/${id}`, {
        method: 'DELETE',
        headers
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
      'Source',
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
      `"${e.source || 'Website Enquiry'}"`,
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
      case 'NEW':
        return 'bg-amber-950/80 text-amber-300 border-amber-800';
      case 'CONTACTED':
        return 'bg-sky-950/80 text-sky-300 border-sky-800';
      case 'QUOTE SENT':
        return 'bg-blue-950/80 text-[#38B6FF] border-blue-800';
      case 'CONFIRMED':
        return 'bg-emerald-950/80 text-emerald-300 border-emerald-800';
      case 'LOST / CANCELLED':
        return 'bg-rose-950/80 text-rose-300 border-rose-800';
      case 'CLOSED':
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
                Live Enquiries Database
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Manage submitted tour requests, quotes, status tracking, and direct WhatsApp follow-ups.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
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

      {/* Status Counters Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
        <button
          onClick={() => setSelectedStatus('All')}
          className={`p-3 rounded-2xl border text-left transition ${
            selectedStatus === 'All'
              ? 'bg-[#002447] border-[#38B6FF] text-white shadow-md'
              : 'bg-[#001329] border-[#002B54] text-slate-300 hover:bg-[#001c38]'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
            Total
          </span>
          <span className="text-xl font-black text-white">{statusCounts.total}</span>
        </button>

        <button
          onClick={() => setSelectedStatus('NEW')}
          className={`p-3 rounded-2xl border text-left transition ${
            selectedStatus === 'NEW'
              ? 'bg-amber-950/80 border-amber-500 text-white shadow-md'
              : 'bg-[#001329] border-[#002B54] text-slate-300 hover:bg-[#001c38]'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block mb-0.5">
            🟡 New
          </span>
          <span className="text-xl font-black text-amber-300">{statusCounts.new}</span>
        </button>

        <button
          onClick={() => setSelectedStatus('CONTACTED')}
          className={`p-3 rounded-2xl border text-left transition ${
            selectedStatus === 'CONTACTED'
              ? 'bg-sky-950/80 border-sky-500 text-white shadow-md'
              : 'bg-[#001329] border-[#002B54] text-slate-300 hover:bg-[#001c38]'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-sky-400 block mb-0.5">
            🔵 Contacted
          </span>
          <span className="text-xl font-black text-sky-300">{statusCounts.contacted}</span>
        </button>

        <button
          onClick={() => setSelectedStatus('QUOTE SENT')}
          className={`p-3 rounded-2xl border text-left transition ${
            selectedStatus === 'QUOTE SENT'
              ? 'bg-blue-950/80 border-blue-500 text-white shadow-md'
              : 'bg-[#001329] border-[#002B54] text-slate-300 hover:bg-[#001c38]'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#38B6FF] block mb-0.5">
            🟣 Quote Sent
          </span>
          <span className="text-xl font-black text-[#38B6FF]">{statusCounts.quoteSent}</span>
        </button>

        <button
          onClick={() => setSelectedStatus('CONFIRMED')}
          className={`p-3 rounded-2xl border text-left transition ${
            selectedStatus === 'CONFIRMED'
              ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-md'
              : 'bg-[#001329] border-[#002B54] text-slate-300 hover:bg-[#001c38]'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-0.5">
            🟢 Confirmed
          </span>
          <span className="text-xl font-black text-emerald-300">{statusCounts.confirmed}</span>
        </button>

        <button
          onClick={() => setSelectedStatus('LOST / CANCELLED')}
          className={`p-3 rounded-2xl border text-left transition ${
            selectedStatus === 'LOST / CANCELLED'
              ? 'bg-rose-950/80 border-rose-500 text-white shadow-md'
              : 'bg-[#001329] border-[#002B54] text-slate-300 hover:bg-[#001c38]'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-0.5">
            🔴 Lost / Cancelled
          </span>
          <span className="text-xl font-black text-rose-300">{statusCounts.lostCancelled}</span>
        </button>

        <button
          onClick={() => setSelectedStatus('CLOSED')}
          className={`p-3 rounded-2xl border text-left transition ${
            selectedStatus === 'CLOSED'
              ? 'bg-slate-900 border-slate-500 text-white shadow-md'
              : 'bg-[#001329] border-[#002B54] text-slate-300 hover:bg-[#001c38]'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
            ⚪ Closed
          </span>
          <span className="text-xl font-black text-slate-400">{statusCounts.closed}</span>
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
            placeholder="Search by customer name, phone, ref ID (e.g. HJH-829104), destination, or package..."
            className="w-full pl-10 pr-24 py-2.5 bg-[#000e1f] text-white border border-[#002B54] rounded-xl text-xs focus:ring-2 focus:ring-[#F27D26] focus:border-transparent outline-none"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 px-3 py-1.5 rounded-lg bg-[#002447] text-[#38B6FF] border border-[#00478a] text-xs font-bold hover:bg-[#003366] transition"
          >
            Search
          </button>
        </form>

        {/* Status, Category, Source & Date Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Source Filter */}
          <div className="flex items-center gap-1.5 bg-[#000e1f] border border-[#002B54] px-3 py-2 rounded-xl text-xs text-slate-300">
            <span className="text-slate-400">Source:</span>
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              className="bg-transparent text-white font-semibold outline-none cursor-pointer"
            >
              <option value="All" className="bg-[#001329]">All Sources ({sourceCounts.website + sourceCounts.whatsapp})</option>
              <option value="Website Enquiry" className="bg-[#001329]">Website Enquiry ({sourceCounts.website})</option>
              <option value="WhatsApp Direct" className="bg-[#001329]">WhatsApp Direct ({sourceCounts.whatsapp})</option>
            </select>
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-1.5 bg-[#000e1f] border border-[#002B54] px-3 py-2 rounded-xl text-xs text-slate-300">
            <Calendar size={13} className="text-slate-400" />
            <span className="text-slate-400">Date:</span>
            <select
              value={selectedDateFilter}
              onChange={(e) => setSelectedDateFilter(e.target.value)}
              className="bg-transparent text-white font-semibold outline-none cursor-pointer"
            >
              <option value="All" className="bg-[#001329]">All Time</option>
              <option value="Today" className="bg-[#001329]">Today</option>
              <option value="Yesterday" className="bg-[#001329]">Yesterday</option>
              <option value="Last 7 Days" className="bg-[#001329]">Last 7 Days</option>
              <option value="This Month" className="bg-[#001329]">This Month</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-[#000e1f] border border-[#002B54] px-3 py-2 rounded-xl text-xs text-slate-300">
            <Filter size={13} className="text-slate-400" />
            <span className="text-slate-400">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-transparent text-white font-semibold outline-none cursor-pointer"
            >
              <option value="All" className="bg-[#001329]">All Statuses</option>
              <option value="NEW" className="bg-[#001329]">New</option>
              <option value="CONTACTED" className="bg-[#001329]">Contacted</option>
              <option value="QUOTE SENT" className="bg-[#001329]">Quote Sent</option>
              <option value="CONFIRMED" className="bg-[#001329]">Confirmed</option>
              <option value="LOST / CANCELLED" className="bg-[#001329]">Lost / Cancelled</option>
              <option value="CLOSED" className="bg-[#001329]">Closed</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-[#000e1f] border border-[#002B54] px-3 py-2 rounded-xl text-xs text-slate-300">
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

          {(searchTerm || selectedStatus !== 'All' || selectedCategory !== 'All' || selectedSource !== 'All' || selectedDateFilter !== 'All') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedStatus('All');
                setSelectedCategory('All');
                setSelectedSource('All');
                setSelectedDateFilter('All');
              }}
              className="px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white bg-[#000e1f] border border-[#002B54] hover:bg-[#002244] transition"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Enquiries Data Table */}
      <div className="bg-[#001329] border border-[#002B54] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#000a17] text-slate-400 text-[11px] font-bold uppercase tracking-wider border-b border-[#002B54]">
                <th className="py-3 px-4">Ref ID</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Phone / WhatsApp</th>
                <th className="py-3 px-4">Destination / Package</th>
                <th className="py-3 px-4">Travel Date</th>
                <th className="py-3 px-4">Travellers</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#002B54]/60 text-xs">
              {loading ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400">
                    <Loader2 size={24} className="animate-spin mx-auto text-[#F27D26] mb-2" />
                    <p>Loading enquiries from database...</p>
                  </td>
                </tr>
              ) : enquiries.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-12 text-center text-slate-400 space-y-2">
                    <Inbox size={32} className="mx-auto text-slate-600" />
                    <p className="font-semibold text-sm">No enquiries found</p>
                    <p className="text-[11px] text-slate-500">
                      {searchTerm || selectedStatus !== 'All' || selectedSource !== 'All'
                        ? 'Try clearing your search terms or filters.'
                        : 'Customer enquiries submitted via the website or WhatsApp will appear here in real time.'}
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
                  const isWhatsApp = enq.source === 'WhatsApp Direct';

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

                      {/* Source */}
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                          isWhatsApp
                            ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                            : 'bg-[#002447] text-[#38B6FF] border-[#003d75]'
                        }`}>
                          {isWhatsApp ? (
                            <>
                              <MessageSquare size={11} className="text-emerald-400" />
                              <span>WhatsApp</span>
                            </>
                          ) : (
                            <>
                              <Send size={11} className="text-[#38B6FF]" />
                              <span>Website</span>
                            </>
                          )}
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
                      <td className="py-3.5 px-4 max-w-[200px]">
                        <div className="font-medium text-slate-200 truncate" title={enq.destination || enq.packageName}>
                          {enq.destination || enq.packageName || 'Trip Enquiry'}
                        </div>
                        {enq.packageName && enq.packageName !== enq.destination && (
                          <div className="text-[10px] text-slate-400 truncate" title={enq.packageName}>
                            Pkg: {enq.packageName}
                          </div>
                        )}
                      </td>

                      {/* Travel Date */}
                      <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                        {enq.travelDate ? (
                          <span className="font-mono text-slate-200">{enq.travelDate}</span>
                        ) : (
                          <span className="text-slate-500 italic text-[11px]">Flexible</span>
                        )}
                      </td>

                      {/* Travellers */}
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-300">
                        {enq.adults !== undefined || enq.children !== undefined ? (
                          <span>
                            {enq.adults || 1} Adult{(enq.adults || 1) > 1 ? 's' : ''}
                            {enq.children ? `, ${enq.children} Child${enq.children > 1 ? 'ren' : ''}` : ''}
                          </span>
                        ) : (
                          <span>{enq.numberOfTravellers || '2 Adults'}</span>
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
                            <option value="NEW" className="bg-[#001329] text-amber-300">NEW</option>
                            <option value="CONTACTED" className="bg-[#001329] text-sky-300">CONTACTED</option>
                            <option value="QUOTE SENT" className="bg-[#001329] text-[#38B6FF]">QUOTE SENT</option>
                            <option value="CONFIRMED" className="bg-[#001329] text-emerald-300">CONFIRMED</option>
                            <option value="LOST / CANCELLED" className="bg-[#001329] text-rose-300">LOST / CANCELLED</option>
                            <option value="CLOSED" className="bg-[#001329] text-slate-400">CLOSED</option>
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
            <span>Fields: Reference ID • Customer Name • Phone • Email • Destination • Package • Travel Date • Travellers • Budget • Special Requirements • Status</span>
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
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(activeEnquiry.status)}`}>
                      {activeEnquiry.status}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                      activeEnquiry.source === 'WhatsApp Direct'
                        ? 'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                        : 'bg-[#002447] text-[#38B6FF] border-[#003d75]'
                    }`}>
                      {activeEnquiry.source || 'Website Enquiry'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Submitted on {activeEnquiry.date} at {activeEnquiry.time}
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
                    <option value="NEW" className="bg-[#001329] text-amber-300">NEW</option>
                    <option value="CONTACTED" className="bg-[#001329] text-sky-300">CONTACTED</option>
                    <option value="QUOTE SENT" className="bg-[#001329] text-[#38B6FF]">QUOTE SENT</option>
                    <option value="CONFIRMED" className="bg-[#001329] text-emerald-300">CONFIRMED</option>
                    <option value="LOST / CANCELLED" className="bg-[#001329] text-rose-300">LOST / CANCELLED</option>
                    <option value="CLOSED" className="bg-[#001329] text-slate-400">CLOSED</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleResyncGoogleSheet(activeEnquiry.id)}
                    disabled={isResyncing === activeEnquiry.id}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#002244] text-[#38B6FF] border border-[#003e7e] text-xs font-bold hover:bg-[#003366] transition disabled:opacity-50"
                  >
                    <RefreshCw size={12} className={isResyncing === activeEnquiry.id ? 'animate-spin' : ''} />
                    <span>Sync to Sheet</span>
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
                    <span className="text-xs text-slate-400 block">Customer Name:</span>
                    <span className="text-base font-bold text-white">{activeEnquiry.customerName}</span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block">Phone Number / WhatsApp:</span>
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
                    <span className="text-xs text-slate-400 block">Destination:</span>
                    <span className="text-base font-bold text-[#F27D26]">
                      {activeEnquiry.destination || 'Not Specified'}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block">Package Name:</span>
                    <span className="text-base font-bold text-white">
                      {activeEnquiry.packageName || activeEnquiry.destination || 'Custom Tour'}
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
                      {activeEnquiry.travelDate || 'Flexible'}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block">Number of Adults:</span>
                    <span className="text-sm font-semibold text-white">
                      {activeEnquiry.adults !== undefined ? activeEnquiry.adults : (activeEnquiry.numberOfTravellers || '2')}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block">Number of Children:</span>
                    <span className="text-sm font-semibold text-white">
                      {activeEnquiry.children !== undefined ? activeEnquiry.children : '0'}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block">Trip Type / Style:</span>
                    <span className="text-sm font-semibold text-purple-300">
                      {activeEnquiry.tripType || 'Holiday Tour'}
                    </span>
                  </div>

                  <div>
                    <span className="text-xs text-slate-400 block">Budget:</span>
                    <span className="text-sm font-semibold text-amber-300">
                      {activeEnquiry.budget || 'Standard'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Special Requirements & Customer Message */}
              {(activeEnquiry.specialRequirements || activeEnquiry.customerMessage) && (
                <div className="bg-[#000e1f] border border-[#002B54] rounded-2xl p-5 space-y-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                    Special Requirements & Notes
                  </span>
                  <div className="p-3 bg-[#001329] border border-[#002B54] rounded-xl text-xs text-slate-200 leading-relaxed whitespace-pre-wrap font-sans">
                    {activeEnquiry.specialRequirements || activeEnquiry.customerMessage}
                  </div>
                </div>
              )}

              {/* Submission Date & Time Audit */}
              <div className="p-3 bg-[#000a17] border border-[#002B54] rounded-xl text-xs flex items-center justify-between text-slate-400">
                <span>Submitted Date & Time:</span>
                <span className="font-semibold text-white font-mono">{activeEnquiry.date} at {activeEnquiry.time}</span>
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

      {/* DELETE CONFIRMATION DIALOG */}
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
            <h4 className="text-lg font-bold text-white">Delete this customer enquiry permanently?</h4>
            <p className="text-xs text-slate-300">
              Are you sure you want to permanently delete enquiry <strong className="text-white font-mono">{deleteConfirmId}</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-2.5 rounded-xl bg-[#002244] text-slate-300 font-semibold text-xs border border-[#003e7e] hover:bg-[#002f5e] transition"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteEnquiry(deleteConfirmId)}
                className="flex-1 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
