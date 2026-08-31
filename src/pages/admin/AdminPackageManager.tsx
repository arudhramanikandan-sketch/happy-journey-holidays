import React, { useState, useEffect, useRef } from 'react';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  ArrowUp, 
  ArrowDown, 
  Image as ImageIcon, 
  Upload, 
  Check, 
  X, 
  AlertTriangle, 
  RefreshCw, 
  Sparkles, 
  Calendar, 
  Clock, 
  MapPin, 
  DollarSign, 
  Layers, 
  FileText, 
  CheckCircle2,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { HolidayPackage, DayItinerary } from '../../types';

interface AdminPackageManagerProps {
  category: 'domestic' | 'international';
}

export const AdminPackageManager: React.FC<AdminPackageManagerProps> = ({ category }) => {
  const [packages, setPackages] = useState<HolidayPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Modal States
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<HolidayPackage | null>(null);
  const [isNewPackage, setIsNewPackage] = useState(false);
  const [modalTab, setModalTab] = useState<'basic' | 'pricing' | 'images' | 'inclusions' | 'itinerary' | 'booking'>('basic');
  const [savingPackage, setSavingPackage] = useState(false);

  // Delete Confirmation Modal State
  const [deleteTarget, setDeleteTarget] = useState<HolidayPackage | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Form State
  const [formData, setFormData] = useState<{
    id: string;
    title: string;
    destination: string;
    category: 'domestic' | 'international';
    days: number;
    nights: number;
    duration: string;
    startingPrice: string;
    originalPrice: string;
    offerPrice: string;
    priceDisplayText: string;
    shortDescription: string;
    fullDescription: string;
    image: string;
    galleryImages: string[];
    highlights: string[];
    inclusions: string[];
    exclusions: string[];
    dayWiseItinerary: DayItinerary[];
    bookingInformation: string;
    bestFor: string;
    featured: boolean;
    isHidden: boolean;
  }>({
    id: '',
    title: '',
    destination: '',
    category: category,
    days: 5,
    nights: 4,
    duration: '4 Nights / 5 Days',
    startingPrice: '',
    originalPrice: '',
    offerPrice: '',
    priceDisplayText: '',
    shortDescription: '',
    fullDescription: '',
    image: '',
    galleryImages: [],
    highlights: [''],
    inclusions: [''],
    exclusions: [''],
    dayWiseItinerary: [
      { day: 1, title: 'Arrival & Welcome', description: 'Arrive at destination, transfer to hotel and relax.' }
    ],
    bookingInformation: 'Passports must have minimum 6 months validity from travel date. Rates subject to seasonal availability.',
    bestFor: 'Families & Couples',
    featured: false,
    isHidden: false
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const galleryInputRef = useRef<HTMLInputElement>(null);

  const showToast = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => {
      setNotification(null);
    }, 4000);
  };

  const getAuthHeaders = (extra: Record<string, string> = {}): Record<string, string> => {
    const token = localStorage.getItem('admin_token');
    const headers: Record<string, string> = { ...extra };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return headers;
  };

  const fetchPackages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/packages?category=${category}`, {
        headers: getAuthHeaders()
      });
      if (!res.ok) {
        if (res.status === 401) {
          throw new Error('Unauthorized. Please log in to admin panel.');
        }
        throw new Error('Failed to load packages.');
      }
      const data = await res.json();
      if (data.success && Array.isArray(data.packages)) {
        setPackages(data.packages);
      }
    } catch (err: any) {
      setError(err.message || 'Error loading packages.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, [category]);

  const handleOpenAddModal = () => {
    setIsNewPackage(true);
    setEditingPackage(null);
    setFormData({
      id: `pkg-${category}-${Date.now().toString().slice(-4)}`,
      title: '',
      destination: '',
      category: category,
      days: 5,
      nights: 4,
      duration: '4 Nights / 5 Days',
      startingPrice: '₹19,999',
      originalPrice: '₹24,999',
      offerPrice: '₹19,999',
      priceDisplayText: 'Starting from ₹19,999 / person',
      shortDescription: '',
      fullDescription: '',
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
      galleryImages: [],
      highlights: ['4-Star Hotel Accommodation with Breakfast', 'All Sightseeing & Airport Transfers by AC Cab', 'Dedicated Tour Guide Assistance'],
      inclusions: ['Hotel Stays with Daily Breakfast', 'Sightseeing & Transfers in AC Vehicle', 'All Tolls, Parking & Driver Allowances'],
      exclusions: ['Flight / Train tickets', 'Personal expenses & meals not specified', 'Monument & activity entry passes'],
      dayWiseItinerary: [
        { day: 1, title: 'Arrival & Hotel Check-in', description: 'Meet our representative upon arrival, transfer to hotel, and spend the evening at leisure.' },
        { day: 2, title: 'Full Day Sightseeing Tour', description: 'Explore iconic highlights, scenic viewpoints, and local cultural landmarks.' },
        { day: 3, title: 'Adventure & Excursion Day', description: 'Visit renowned attractions, enjoy scenic rides, and sample local delicacies.' },
        { day: 4, title: 'Shopping & Local Markets', description: 'Free time to shop for souvenirs, visit local spice or silk bazaars, and relax.' },
        { day: 5, title: 'Hotel Check-out & Departure', description: 'Enjoy morning breakfast, check out of hotel, and transfer to airport or station for departure.' }
      ],
      bookingInformation: 'Passports must have minimum 6 months validity. Rates based on twin sharing basis.',
      bestFor: 'Couples, Families & Groups',
      featured: false,
      isHidden: false
    });
    setModalTab('basic');
    setIsEditModalOpen(true);
  };

  const handleOpenEditModal = (pkg: HolidayPackage) => {
    setIsNewPackage(false);
    setEditingPackage(pkg);
    setFormData({
      id: pkg.id,
      title: pkg.title || pkg.name || '',
      destination: pkg.destination || '',
      category: pkg.category || category,
      days: pkg.days || 5,
      nights: pkg.nights !== undefined ? pkg.nights : 4,
      duration: pkg.duration || `${pkg.nights || 4} Nights / ${pkg.days || 5} Days`,
      startingPrice: pkg.offerPrice || pkg.startingPrice || '',
      originalPrice: pkg.originalPrice || '',
      offerPrice: pkg.offerPrice || pkg.startingPrice || '',
      priceDisplayText: pkg.priceDisplayText || `Starting from ${pkg.offerPrice || pkg.startingPrice} / person`,
      shortDescription: pkg.shortDescription || pkg.fullDescription || '',
      fullDescription: pkg.fullDescription || pkg.shortDescription || '',
      image: pkg.image || '',
      galleryImages: Array.isArray(pkg.galleryImages) ? [...pkg.galleryImages] : [],
      highlights: Array.isArray(pkg.highlights) && pkg.highlights.length > 0 ? [...pkg.highlights] : [''],
      inclusions: Array.isArray(pkg.inclusions) && pkg.inclusions.length > 0 ? [...pkg.inclusions] : [''],
      exclusions: Array.isArray(pkg.exclusions) && pkg.exclusions.length > 0 ? [...pkg.exclusions] : [''],
      dayWiseItinerary: Array.isArray(pkg.dayWiseItinerary) && pkg.dayWiseItinerary.length > 0 
        ? pkg.dayWiseItinerary.map(d => ({ ...d }))
        : [{ day: 1, title: 'Arrival', description: 'Check-in and leisure.' }],
      bookingInformation: pkg.bookingInformation || 'Rates subject to availability.',
      bestFor: pkg.bestFor || 'Families & Couples',
      featured: Boolean(pkg.featured),
      isHidden: Boolean(pkg.isHidden)
    });
    setModalTab('basic');
    setIsEditModalOpen(true);
  };

  // Image upload handler via base64
  const handleFileUpload = (file: File, isGallery = false) => {
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      showToast('error', 'Please upload a valid image file (JPG, PNG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const base64Data = reader.result as string;
      try {
        // Upload immediately to server
        const res = await fetch('/api/admin/upload-image', {
          method: 'POST',
          headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify({ imageBase64: base64Data, originalName: file.name })
        });
        const data = await res.json();
        const finalUrl = (data.success && data.imageUrl) ? data.imageUrl : base64Data;

        if (isGallery) {
          setFormData(prev => ({
            ...prev,
            galleryImages: [...prev.galleryImages, finalUrl]
          }));
          showToast('success', 'Gallery image uploaded.');
        } else {
          setFormData(prev => ({
            ...prev,
            image: finalUrl
          }));
          showToast('success', 'Main image uploaded.');
        }
      } catch (err) {
        // Fallback to base64
        if (isGallery) {
          setFormData(prev => ({ ...prev, galleryImages: [...prev.galleryImages, base64Data] }));
        } else {
          setFormData(prev => ({ ...prev, image: base64Data }));
        }
      }
    };
    reader.readAsDataURL(file);
  };

  // Toggle Visibility
  const handleToggleVisibility = async (pkg: HolidayPackage) => {
    const newHiddenState = !pkg.isHidden;
    try {
      const res = await fetch(`/api/admin/packages/${pkg.id}/visibility`, {
        method: 'PATCH',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ isHidden: newHiddenState })
      });

      if (!res.ok) throw new Error('Failed to update package visibility.');

      setPackages(prev =>
        prev.map(p => (p.id === pkg.id ? { ...p, isHidden: newHiddenState } : p))
      );
      showToast('success', `Package is now ${newHiddenState ? 'Hidden from public' : 'Published live'}.`);
    } catch (err: any) {
      showToast('error', err.message || 'Could not update visibility.');
    }
  };

  // Reorder Packages (Move Up / Down)
  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= packages.length) return;

    const updated = [...packages];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);

    setPackages(updated);

    try {
      const orderedIds = updated.map(p => p.id);
      const res = await fetch('/api/admin/packages/reorder', {
        method: 'POST',
        headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({ category, orderedIds })
      });

      if (!res.ok) throw new Error('Failed to save package display order.');
      showToast('success', 'Package order updated.');
    } catch (err: any) {
      showToast('error', 'Failed to update order on server.');
      fetchPackages();
    }
  };

  // Save Package (Create or Update)
  const handleSavePackage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.destination.trim()) {
      showToast('error', 'Package title and destination are required.');
      return;
    }

    setSavingPackage(true);

    const payload = {
      ...formData,
      startingPrice: formData.offerPrice || formData.startingPrice || '₹0',
      duration: formData.duration || `${formData.nights} Nights / ${formData.days} Days`,
      priceDisplayText: formData.priceDisplayText || `Starting from ${formData.offerPrice || formData.startingPrice} / person`,
      highlights: formData.highlights.filter(h => h.trim() !== ''),
      inclusions: formData.inclusions.filter(i => i.trim() !== ''),
      exclusions: formData.exclusions.filter(e => e.trim() !== ''),
      galleryImages: formData.galleryImages.filter(img => img.trim() !== ''),
      dayWiseItinerary: formData.dayWiseItinerary.filter(d => d.title.trim() !== '')
    };

    try {
      let res: Response;
      if (isNewPackage) {
        res = await fetch('/api/admin/packages', {
          method: 'POST',
          headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch(`/api/admin/packages/${formData.id}`, {
          method: 'PUT',
          headers: getAuthHeaders({ 'Content-Type': 'application/json' }),
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save package.');
      }

      showToast('success', isNewPackage ? 'New package created successfully!' : 'Package updated successfully!');
      setIsEditModalOpen(false);
      fetchPackages();
    } catch (err: any) {
      showToast('error', err.message || 'Error saving package.');
    } finally {
      setSavingPackage(false);
    }
  };

  // Delete Package Permanently
  const handleConfirmDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/packages/${deleteTarget.id}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete package.');
      }

      showToast('success', `"${deleteTarget.title}" permanently deleted.`);
      setDeleteTarget(null);
      fetchPackages();
    } catch (err: any) {
      showToast('error', err.message || 'Error deleting package.');
    } finally {
      setDeleting(false);
    }
  };

  // Filter packages by search
  const filteredPackages = packages.filter(pkg => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      (pkg.title && pkg.title.toLowerCase().includes(q)) ||
      (pkg.destination && pkg.destination.toLowerCase().includes(q)) ||
      (pkg.duration && pkg.duration.toLowerCase().includes(q)) ||
      (pkg.id && pkg.id.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div
          className={`fixed top-16 right-6 z-50 px-4 py-3 rounded-xl shadow-2xl border text-xs font-semibold flex items-center gap-2.5 transition-all animate-bounce ${
            notification.type === 'success'
              ? 'bg-emerald-950/95 text-emerald-200 border-emerald-700'
              : 'bg-rose-950/95 text-rose-200 border-rose-700'
          }`}
        >
          {notification.type === 'success' ? <CheckCircle2 size={16} /> : <AlertTriangle size={16} />}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header and Controls */}
      <div className="bg-[#001329] border border-[#002B54] rounded-2xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#002447] text-[#F27D26] border border-[#003d75] uppercase tracking-wider">
              {category === 'domestic' ? '🇮🇳 Domestic Holidays' : '✈️ International Holidays'}
            </span>
            <span className="text-xs text-slate-400">
              {packages.length} Total Packages ({packages.filter(p => !p.isHidden).length} Live, {packages.filter(p => p.isHidden).length} Hidden)
            </span>
          </div>
          <h2 className="text-2xl font-heading font-black text-white">
            {category === 'domestic' ? 'Domestic Package Management' : 'International Package Management'}
          </h2>
          <p className="text-xs text-slate-300 mt-0.5">
            Add, edit pricing, update itineraries, upload photos, reorder, or toggle visibility on the live website.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchPackages}
            className="p-2.5 rounded-xl bg-[#002244] hover:bg-[#002E5C] text-slate-300 transition border border-[#003E7E]"
            title="Refresh package data from database"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
          </button>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center gap-2 bg-[#F27D26] hover:bg-[#d96c1e] text-white font-extrabold text-xs sm:text-sm px-4 py-2.5 rounded-xl shadow-lg transition active:scale-95 cursor-pointer"
          >
            <Plus size={16} />
            <span>Add New {category === 'domestic' ? 'Domestic' : 'International'} Package</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="bg-[#001329] border border-[#002B54] rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search size={15} className="absolute left-3 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by package name, destination..."
            className="w-full pl-9 pr-4 py-2 text-xs bg-[#000A17] border border-[#002B54] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:border-[#F27D26]"
          />
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Display Order: Use <strong>▲ / ▼</strong> to reorder. Changes immediately affect the public website.</span>
        </div>
      </div>

      {/* Packages List View */}
      {loading ? (
        <div className="bg-[#001329] border border-[#002B54] rounded-2xl p-12 text-center flex flex-col items-center justify-center space-y-3">
          <RefreshCw className="animate-spin text-[#F27D26]" size={32} />
          <p className="text-xs text-slate-400">Loading {category} packages from persistent database...</p>
        </div>
      ) : error ? (
        <div className="bg-rose-950/40 border border-rose-800 rounded-2xl p-8 text-center text-rose-200 text-xs">
          <AlertTriangle size={24} className="mx-auto mb-2 text-rose-400" />
          <p>{error}</p>
          <button onClick={fetchPackages} className="mt-3 px-3 py-1.5 bg-rose-900 rounded-lg font-bold">Retry</button>
        </div>
      ) : filteredPackages.length === 0 ? (
        <div className="bg-[#001329] border border-[#002B54] rounded-2xl p-12 text-center space-y-3">
          <Layers size={36} className="mx-auto text-slate-600" />
          <h3 className="text-base font-bold text-white">No Packages Found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            {searchQuery ? `No packages matching "${searchQuery}".` : `No ${category} packages have been created yet.`}
          </p>
          <button
            onClick={handleOpenAddModal}
            className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 bg-[#F27D26] text-white text-xs font-bold rounded-xl"
          >
            <Plus size={14} />
            <span>Create First Package</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPackages.map((pkg, idx) => (
            <div
              key={pkg.id}
              className={`bg-[#001329] border rounded-2xl p-4 sm:p-5 transition-all shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                pkg.isHidden
                  ? 'border-amber-900/50 bg-[#001124]/70 opacity-80'
                  : 'border-[#002B54] hover:border-[#00478a]'
              }`}
            >
              {/* Left Info with Image Thumbnail */}
              <div className="flex items-start sm:items-center gap-4">
                {/* Reorder Buttons */}
                <div className="flex flex-col gap-1 items-center justify-center flex-shrink-0">
                  <button
                    onClick={() => handleMoveOrder(idx, 'up')}
                    disabled={idx === 0}
                    className="p-1 rounded bg-[#002244] hover:bg-[#002E5C] text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    title="Move package up"
                  >
                    <ArrowUp size={12} />
                  </button>
                  <span className="text-[10px] font-mono text-slate-400 font-bold">
                    #{idx + 1}
                  </span>
                  <button
                    onClick={() => handleMoveOrder(idx, 'down')}
                    disabled={idx === filteredPackages.length - 1}
                    className="p-1 rounded bg-[#002244] hover:bg-[#002E5C] text-slate-300 disabled:opacity-30 disabled:cursor-not-allowed transition"
                    title="Move package down"
                  >
                    <ArrowDown size={12} />
                  </button>
                </div>

                {/* Thumbnail Image */}
                <div className="w-20 h-16 sm:w-28 sm:h-20 rounded-xl overflow-hidden bg-[#000A17] border border-[#002B54] flex-shrink-0 relative group">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                  {pkg.galleryImages && pkg.galleryImages.length > 0 && (
                    <span className="absolute bottom-1 right-1 bg-black/80 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">
                      +{pkg.galleryImages.length}
                    </span>
                  )}
                </div>

                {/* Package Meta Info */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-[#F27D26] flex items-center gap-1">
                      <MapPin size={11} />
                      {pkg.destination}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-300 bg-[#002244] px-2 py-0.5 rounded border border-[#00376b]">
                      {pkg.duration}
                    </span>
                    {pkg.featured && (
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-700/60">
                        ⭐ Featured
                      </span>
                    )}
                    {pkg.isHidden ? (
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-950/90 px-2 py-0.5 rounded border border-amber-800 flex items-center gap-1">
                        <EyeOff size={10} />
                        Hidden
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/90 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
                        <Eye size={10} />
                        Live
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {pkg.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400">
                    <div>
                      Offer Price:{' '}
                      <strong className="text-white font-extrabold">{pkg.offerPrice || pkg.startingPrice}</strong>
                      {pkg.originalPrice && (
                        <span className="text-slate-500 line-through ml-1.5 text-[11px]">{pkg.originalPrice}</span>
                      )}
                    </div>
                    {pkg.bestFor && (
                      <span className="text-slate-400 text-[11px] hidden sm:inline">
                        • Best for: {pkg.bestFor}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 self-end lg:self-center pt-2 lg:pt-0 border-t lg:border-t-0 border-[#002B54] w-full lg:w-auto justify-end">
                {/* Toggle Visibility */}
                <button
                  onClick={() => handleToggleVisibility(pkg)}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition border ${
                    pkg.isHidden
                      ? 'bg-amber-950/60 text-amber-300 border-amber-800 hover:bg-amber-900/80'
                      : 'bg-emerald-950/60 text-emerald-300 border-emerald-800 hover:bg-emerald-900/80'
                  }`}
                  title={pkg.isHidden ? 'Click to Publish on Website' : 'Click to Hide from Website'}
                >
                  {pkg.isHidden ? <Eye size={13} /> : <EyeOff size={13} />}
                  <span>{pkg.isHidden ? 'Show Package' : 'Hide Package'}</span>
                </button>

                {/* Edit Button */}
                <button
                  onClick={() => handleOpenEditModal(pkg)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#002244] hover:bg-[#002E5C] text-slate-200 border border-[#003E7E] flex items-center gap-1.5 transition"
                  title="Edit Package Details"
                >
                  <Edit3 size={13} className="text-[#38B6FF]" />
                  <span>Edit</span>
                </button>

                {/* Delete Button */}
                <button
                  onClick={() => setDeleteTarget(pkg)}
                  className="px-3 py-2 rounded-xl text-xs font-semibold bg-rose-950/60 hover:bg-rose-900 text-rose-300 border border-rose-800 flex items-center gap-1.5 transition"
                  title="Permanently Delete Package"
                >
                  <Trash2 size={13} className="text-rose-400" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ========================================== */}
      {/* ADD / EDIT PACKAGE MODAL */}
      {/* ========================================== */}
      {isEditModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="bg-[#001329] border border-[#002B54] rounded-3xl w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden my-auto animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-[#002B54] bg-[#000A17] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F27D26]">
                  {isNewPackage ? `Add New ${category === 'domestic' ? 'Domestic' : 'International'} Package` : 'Edit Package Details'}
                </span>
                <h3 className="text-lg sm:text-xl font-heading font-black text-white">
                  {formData.title || 'Untitled Package'}
                </h3>
              </div>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="p-2 rounded-xl bg-[#002244] hover:bg-[#002E5C] text-slate-300 transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Navigation Tabs */}
            <div className="flex border-b border-[#002B54] bg-[#000E1F] overflow-x-auto px-4 gap-1 text-xs font-bold">
              <button
                type="button"
                onClick={() => setModalTab('basic')}
                className={`py-3 px-3.5 border-b-2 transition whitespace-nowrap ${
                  modalTab === 'basic' ? 'border-[#F27D26] text-[#F27D26]' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                1. Basic Info
              </button>
              <button
                type="button"
                onClick={() => setModalTab('pricing')}
                className={`py-3 px-3.5 border-b-2 transition whitespace-nowrap ${
                  modalTab === 'pricing' ? 'border-[#F27D26] text-[#F27D26]' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                2. Duration & Pricing
              </button>
              <button
                type="button"
                onClick={() => setModalTab('images')}
                className={`py-3 px-3.5 border-b-2 transition whitespace-nowrap ${
                  modalTab === 'images' ? 'border-[#F27D26] text-[#F27D26]' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                3. Photos & Gallery ({1 + formData.galleryImages.length})
              </button>
              <button
                type="button"
                onClick={() => setModalTab('inclusions')}
                className={`py-3 px-3.5 border-b-2 transition whitespace-nowrap ${
                  modalTab === 'inclusions' ? 'border-[#F27D26] text-[#F27D26]' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                4. Highlights & Inclusions
              </button>
              <button
                type="button"
                onClick={() => setModalTab('itinerary')}
                className={`py-3 px-3.5 border-b-2 transition whitespace-nowrap ${
                  modalTab === 'itinerary' ? 'border-[#F27D26] text-[#F27D26]' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                5. Day-Wise Itinerary ({formData.dayWiseItinerary.length} Days)
              </button>
              <button
                type="button"
                onClick={() => setModalTab('booking')}
                className={`py-3 px-3.5 border-b-2 transition whitespace-nowrap ${
                  modalTab === 'booking' ? 'border-[#F27D26] text-[#F27D26]' : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                6. Policies & Info
              </button>
            </div>

            {/* Modal Form Body */}
            <form onSubmit={handleSavePackage} className="flex-1 overflow-y-auto p-5 sm:p-7 space-y-6">
              {/* TAB 1: BASIC INFO */}
              {modalTab === 'basic' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Package Title / Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g. Singapore Highlights with Sentosa & Universal Studios"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#000A17] border border-[#002B54] rounded-xl text-white focus:border-[#F27D26] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Destination Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.destination}
                        onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                        placeholder="e.g. Singapore, Dubai, Kerala, Kashmir"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#000A17] border border-[#002B54] rounded-xl text-white focus:border-[#F27D26] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Category
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#000A17] border border-[#002B54] rounded-xl text-white focus:border-[#F27D26] focus:outline-none"
                      >
                        <option value="domestic">Domestic Packages (India)</option>
                        <option value="international">International Packages</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Best For / Travel Theme
                      </label>
                      <input
                        type="text"
                        value={formData.bestFor}
                        onChange={(e) => setFormData({ ...formData, bestFor: e.target.value })}
                        placeholder="e.g. Couples, Families & Honeymooners"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#000A17] border border-[#002B54] rounded-xl text-white focus:border-[#F27D26] focus:outline-none"
                      />
                    </div>

                    <div className="flex items-center gap-6 pt-4">
                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-200">
                        <input
                          type="checkbox"
                          checked={formData.featured}
                          onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                          className="w-4 h-4 rounded text-[#F27D26] focus:ring-[#F27D26]"
                        />
                        <span>Feature on Homepage</span>
                      </label>

                      <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-slate-200">
                        <input
                          type="checkbox"
                          checked={formData.isHidden}
                          onChange={(e) => setFormData({ ...formData, isHidden: e.target.checked })}
                          className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                        />
                        <span>Hide from Public Website</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Short Overview / Tagline
                    </label>
                    <textarea
                      rows={2}
                      value={formData.shortDescription}
                      onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                      placeholder="Brief 1-2 sentence summary displayed on cards..."
                      className="w-full px-3.5 py-2 text-xs bg-[#000A17] border border-[#002B54] rounded-xl text-white focus:border-[#F27D26] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Full Detailed Package Description
                    </label>
                    <textarea
                      rows={4}
                      value={formData.fullDescription}
                      onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                      placeholder="Comprehensive overview of the holiday package experience, stays, and service inclusions..."
                      className="w-full px-3.5 py-2 text-xs bg-[#000A17] border border-[#002B54] rounded-xl text-white focus:border-[#F27D26] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* TAB 2: PRICING & DURATION */}
              {modalTab === 'pricing' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Number of Days
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={30}
                        value={formData.days}
                        onChange={(e) => {
                          const d = parseInt(e.target.value) || 1;
                          const n = Math.max(0, d - 1);
                          setFormData({
                            ...formData,
                            days: d,
                            nights: n,
                            duration: `${n} Nights / ${d} Days`
                          });
                        }}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#000A17] border border-[#002B54] rounded-xl text-white focus:border-[#F27D26] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Number of Nights
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={30}
                        value={formData.nights}
                        onChange={(e) => {
                          const n = parseInt(e.target.value) || 0;
                          setFormData({
                            ...formData,
                            nights: n,
                            duration: `${n} Nights / ${formData.days} Days`
                          });
                        }}
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#000A17] border border-[#002B54] rounded-xl text-white focus:border-[#F27D26] focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Duration Text Display
                      </label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="e.g. 4 Nights / 5 Days"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#000A17] border border-[#002B54] rounded-xl text-white focus:border-[#F27D26] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Offer / Starting Price *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.offerPrice}
                        onChange={(e) => {
                          const p = e.target.value;
                          setFormData({
                            ...formData,
                            offerPrice: p,
                            startingPrice: p,
                            priceDisplayText: `Starting from ${p} / person`
                          });
                        }}
                        placeholder="e.g. ₹28,999"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#000A17] border border-[#002B54] rounded-xl text-white focus:border-[#F27D26] focus:outline-none font-bold text-[#F27D26]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Original Price (Strikethrough / Optional)
                      </label>
                      <input
                        type="text"
                        value={formData.originalPrice}
                        onChange={(e) => setFormData({ ...formData, originalPrice: e.target.value })}
                        placeholder="e.g. ₹34,000"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#000A17] border border-[#002B54] rounded-xl text-white focus:border-[#F27D26] focus:outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                        Price Display Text
                      </label>
                      <input
                        type="text"
                        value={formData.priceDisplayText}
                        onChange={(e) => setFormData({ ...formData, priceDisplayText: e.target.value })}
                        placeholder="e.g. Starting from ₹28,999 / person"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-[#000A17] border border-[#002B54] rounded-xl text-white focus:border-[#F27D26] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 3: PHOTOS & GALLERY */}
              {modalTab === 'images' && (
                <div className="space-y-6">
                  {/* Main Image */}
                  <div className="space-y-3 bg-[#000A17] p-4 rounded-2xl border border-[#002B54]">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                        Main Package Cover Image *
                      </label>
                      <span className="text-[11px] text-slate-400">High quality landscape image (16:9 or 4:3)</span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      {/* Image Preview */}
                      <div className="w-full sm:w-48 h-32 rounded-xl bg-slate-900 border border-[#002B54] overflow-hidden flex-shrink-0 relative">
                        {formData.image ? (
                          <img
                            src={formData.image}
                            alt="Cover Preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80';
                            }}
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center h-full text-slate-500 text-xs">
                            <ImageIcon size={24} className="mb-1" />
                            <span>No image</span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-3 w-full">
                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1">Direct Image URL</label>
                          <input
                            type="text"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full px-3 py-2 text-xs bg-[#001329] border border-[#002B54] rounded-xl text-white focus:border-[#F27D26] focus:outline-none"
                          />
                        </div>

                        <div>
                          <input
                            type="file"
                            ref={fileInputRef}
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleFileUpload(e.target.files[0], false);
                              }
                            }}
                          />
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#002447] hover:bg-[#00386e] text-slate-200 text-xs font-bold transition border border-[#00478a]"
                          >
                            <Upload size={14} className="text-[#F27D26]" />
                            <span>Upload Main Image from Device</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Gallery Images */}
                  <div className="space-y-3 bg-[#000A17] p-4 rounded-2xl border border-[#002B54]">
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="text-xs font-bold text-slate-200 uppercase tracking-wider block">
                          Gallery / Sightseeing Images
                        </label>
                        <span className="text-[11px] text-slate-400">Additional photos for the destination and attractions</span>
                      </div>

                      <div>
                        <input
                          type="file"
                          ref={galleryInputRef}
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            if (e.target.files && e.target.files[0]) {
                              handleFileUpload(e.target.files[0], true);
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => galleryInputRef.current?.click()}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#002244] hover:bg-[#002E5C] text-xs font-semibold text-slate-200 border border-[#003E7E]"
                        >
                          <Upload size={12} />
                          <span>+ Upload Gallery Photo</span>
                        </button>
                      </div>
                    </div>

                    {/* Gallery Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                      {formData.galleryImages.map((imgUrl, gIdx) => (
                        <div key={gIdx} className="relative group rounded-xl overflow-hidden bg-slate-900 border border-[#002B54] h-24">
                          <img src={imgUrl} alt={`Gallery ${gIdx + 1}`} className="w-full h-full object-cover" />
                          <button
                            type="button"
                            onClick={() => {
                              setFormData(prev => ({
                                ...prev,
                                galleryImages: prev.galleryImages.filter((_, i) => i !== gIdx)
                              }));
                            }}
                            className="absolute top-1 right-1 p-1 rounded-full bg-rose-600/90 text-white hover:bg-rose-700 transition"
                            title="Remove image"
                          >
                            <X size={12} />
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Add Image URL directly */}
                    <div className="pt-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          id="new-gallery-url-input"
                          placeholder="Paste image URL to add to gallery..."
                          className="flex-1 px-3 py-2 text-xs bg-[#001329] border border-[#002B54] rounded-xl text-white focus:border-[#F27D26] focus:outline-none"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              const input = e.currentTarget;
                              if (input.value.trim()) {
                                setFormData(prev => ({
                                  ...prev,
                                  galleryImages: [...prev.galleryImages, input.value.trim()]
                                }));
                                input.value = '';
                              }
                            }
                          }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.getElementById('new-gallery-url-input') as HTMLInputElement;
                            if (input && input.value.trim()) {
                              setFormData(prev => ({
                                ...prev,
                                galleryImages: [...prev.galleryImages, input.value.trim()]
                              }));
                              input.value = '';
                            }
                          }}
                          className="px-3 py-2 bg-[#002447] text-slate-200 text-xs font-bold rounded-xl border border-[#00478a]"
                        >
                          Add URL
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 4: HIGHLIGHTS, INCLUSIONS & EXCLUSIONS */}
              {modalTab === 'inclusions' && (
                <div className="space-y-6">
                  {/* Highlights */}
                  <div className="space-y-2 bg-[#000A17] p-4 rounded-2xl border border-[#002B54]">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-slate-200 uppercase tracking-wider">
                        Key Package Highlights (Bullet points)
                      </label>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, highlights: [...formData.highlights, ''] })}
                        className="text-xs text-[#F27D26] font-bold flex items-center gap-1"
                      >
                        <Plus size={13} /> Add Highlight
                      </button>
                    </div>

                    {formData.highlights.map((hl, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="w-5 text-center text-xs text-slate-500 font-mono">{idx + 1}.</span>
                        <input
                          type="text"
                          value={hl}
                          onChange={(e) => {
                            const updated = [...formData.highlights];
                            updated[idx] = e.target.value;
                            setFormData({ ...formData, highlights: updated });
                          }}
                          placeholder="e.g. 4-Star Central Hotel with Daily Buffet Breakfast"
                          className="flex-1 px-3 py-2 text-xs bg-[#001329] border border-[#002B54] rounded-xl text-white focus:border-[#F27D26] focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              highlights: formData.highlights.filter((_, i) => i !== idx)
                            });
                          }}
                          className="p-2 text-slate-500 hover:text-rose-400"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Inclusions */}
                  <div className="space-y-2 bg-[#000A17] p-4 rounded-2xl border border-[#002B54]">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        Package Inclusions (What’s Included)
                      </label>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, inclusions: [...formData.inclusions, ''] })}
                        className="text-xs text-emerald-400 font-bold flex items-center gap-1"
                      >
                        <Plus size={13} /> Add Inclusion
                      </button>
                    </div>

                    {formData.inclusions.map((inc, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-xs text-emerald-400">✓</span>
                        <input
                          type="text"
                          value={inc}
                          onChange={(e) => {
                            const updated = [...formData.inclusions];
                            updated[idx] = e.target.value;
                            setFormData({ ...formData, inclusions: updated });
                          }}
                          placeholder="e.g. 4 Nights Stay with Daily Breakfast"
                          className="flex-1 px-3 py-2 text-xs bg-[#001329] border border-[#002B54] rounded-xl text-white focus:border-emerald-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              inclusions: formData.inclusions.filter((_, i) => i !== idx)
                            });
                          }}
                          className="p-2 text-slate-500 hover:text-rose-400"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Exclusions */}
                  <div className="space-y-2 bg-[#000A17] p-4 rounded-2xl border border-[#002B54]">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                        Package Exclusions (What’s NOT Included)
                      </label>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, exclusions: [...formData.exclusions, ''] })}
                        className="text-xs text-rose-400 font-bold flex items-center gap-1"
                      >
                        <Plus size={13} /> Add Exclusion
                      </button>
                    </div>

                    {formData.exclusions.map((exc, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <span className="text-xs text-rose-400">✕</span>
                        <input
                          type="text"
                          value={exc}
                          onChange={(e) => {
                            const updated = [...formData.exclusions];
                            updated[idx] = e.target.value;
                            setFormData({ ...formData, exclusions: updated });
                          }}
                          placeholder="e.g. Flight tickets & personal expenses"
                          className="flex-1 px-3 py-2 text-xs bg-[#001329] border border-[#002B54] rounded-xl text-white focus:border-rose-500 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setFormData({
                              ...formData,
                              exclusions: formData.exclusions.filter((_, i) => i !== idx)
                            });
                          }}
                          className="p-2 text-slate-500 hover:text-rose-400"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: DAY-WISE ITINERARY */}
              {modalTab === 'itinerary' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                        Detailed Day-by-Day Schedule
                      </h4>
                      <span className="text-[11px] text-slate-400">Add detailed activities and sightseeing per day</span>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const nextDay = formData.dayWiseItinerary.length + 1;
                        setFormData({
                          ...formData,
                          dayWiseItinerary: [
                            ...formData.dayWiseItinerary,
                            { day: nextDay, title: `Day ${nextDay} Itinerary`, description: '' }
                          ]
                        });
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#F27D26] hover:bg-[#d96c1e] text-white text-xs font-bold transition"
                    >
                      <Plus size={13} />
                      <span>+ Add Day</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {formData.dayWiseItinerary.map((dayItem, dIdx) => (
                      <div key={dIdx} className="bg-[#000A17] p-4 rounded-2xl border border-[#002B54] space-y-2 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-extrabold text-[#F27D26] bg-[#001D3D] px-2.5 py-1 rounded-lg border border-[#00386e]">
                            Day {dIdx + 1}
                          </span>
                          <button
                            type="button"
                            onClick={() => {
                              setFormData({
                                ...formData,
                                dayWiseItinerary: formData.dayWiseItinerary
                                  .filter((_, i) => i !== dIdx)
                                  .map((item, idx) => ({ ...item, day: idx + 1 }))
                              });
                            }}
                            className="text-slate-500 hover:text-rose-400 text-xs flex items-center gap-1"
                          >
                            <Trash2 size={13} />
                            <span>Remove Day</span>
                          </button>
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Day Title</label>
                          <input
                            type="text"
                            value={dayItem.title}
                            onChange={(e) => {
                              const updated = [...formData.dayWiseItinerary];
                              updated[dIdx].title = e.target.value;
                              setFormData({ ...formData, dayWiseItinerary: updated });
                            }}
                            placeholder="e.g. Arrival in Singapore & Night Safari"
                            className="w-full px-3 py-2 text-xs bg-[#001329] border border-[#002B54] rounded-xl text-white focus:border-[#F27D26] focus:outline-none font-bold"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] text-slate-400 mb-1 font-semibold">Day Activities Description</label>
                          <textarea
                            rows={2}
                            value={dayItem.description}
                            onChange={(e) => {
                              const updated = [...formData.dayWiseItinerary];
                              updated[dIdx].description = e.target.value;
                              setFormData({ ...formData, dayWiseItinerary: updated });
                            }}
                            placeholder="Details of the day, transfers, meals, sightseeing spots..."
                            className="w-full px-3 py-2 text-xs bg-[#001329] border border-[#002B54] rounded-xl text-white focus:border-[#F27D26] focus:outline-none"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: BOOKING INFO & TERMS */}
              {modalTab === 'booking' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Booking Information, Terms & Visa Notes
                    </label>
                    <textarea
                      rows={5}
                      value={formData.bookingInformation}
                      onChange={(e) => setFormData({ ...formData, bookingInformation: e.target.value })}
                      placeholder="e.g. Passports must have minimum 6 months validity from travel date. Standard hotel check-in is 2:00 PM..."
                      className="w-full px-3.5 py-2.5 text-xs bg-[#000A17] border border-[#002B54] rounded-xl text-white focus:border-[#F27D26] focus:outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Modal Footer Controls */}
              <div className="pt-4 border-t border-[#002B54] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-semibold bg-[#002244] hover:bg-[#002E5C] text-slate-300 transition"
                >
                  Cancel
                </button>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={savingPackage}
                    className="flex items-center gap-2 bg-[#F27D26] hover:bg-[#d96c1e] text-white font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-xl shadow-lg transition active:scale-95 disabled:opacity-50 cursor-pointer"
                  >
                    {savingPackage ? (
                      <>
                        <RefreshCw size={15} className="animate-spin" />
                        <span>Saving Changes...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 size={16} />
                        <span>{isNewPackage ? 'Publish New Package' : 'Save Package Changes'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================== */}
      {/* DELETE CONFIRMATION MODAL */}
      {/* ========================================== */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#001329] border border-rose-800/80 rounded-3xl w-full max-w-md p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-950/80 border border-rose-700 text-rose-400 flex items-center justify-center mx-auto">
              <Trash2 size={24} />
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-lg font-heading font-black text-white">
                Delete Package Permanently?
              </h3>
              <p className="text-xs text-slate-300">
                Are you sure you want to permanently delete <strong className="text-white">"{deleteTarget.title}"</strong>?
              </p>
              <p className="text-[11px] text-rose-400 bg-rose-950/40 p-2.5 rounded-xl border border-rose-900">
                ⚠️ This action cannot be undone. The package will be immediately removed from the live website and database.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="flex-1 py-2.5 rounded-xl text-xs font-semibold bg-[#002244] hover:bg-[#002E5C] text-slate-300 transition"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDelete}
                disabled={deleting}
                className="flex-1 py-2.5 rounded-xl text-xs font-bold bg-rose-600 hover:bg-rose-700 text-white transition flex items-center justify-center gap-1.5 shadow-lg"
              >
                {deleting ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <>
                    <Trash2 size={14} />
                    <span>Yes, Delete</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
