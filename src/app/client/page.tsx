"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

interface Vehicle {
  id: string;
  year: string;
  make: string;
  model: string;
  uploadedAt: string;
}

interface SearchHistory {
  id: string;
  query: string;
  timestamp: string;
  results: number;
}

interface InsuranceOffer {
  id: string;
  provider: string;
  type: string;
  coverage: string;
  price: number;
  duration: string;
  features: string[];
}

export default function ClientHomepage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [insuranceOffers, setInsuranceOffers] = useState<InsuranceOffer[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [showOffers, setShowOffers] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [vehicleForm, setVehicleForm] = useState({
    year: "",
    make: "",
    model: ""
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState<SearchHistory[]>([]);
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [filteredInsurance, setFilteredInsurance] = useState<InsuranceOffer[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'search' | 'history'>('overview');
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Mock insurance data
  const mockInsuranceOffers: InsuranceOffer[] = [
    {
      id: "1",
      provider: "AutoGuard Premium",
      type: "Comprehensive Coverage",
      coverage: "Full Protection",
      price: 1299,
      duration: "12 months",
      features: ["Collision Coverage", "Theft Protection", "Natural Disaster", "Roadside Assistance"]
    },
    {
      id: "2",
      provider: "SafeDrive Insurance",
      type: "Extended Warranty",
      coverage: "Mechanical Breakdown",
      price: 899,
      duration: "24 months",
      features: ["Engine Protection", "Transmission Coverage", "Electrical Systems", "24/7 Support"]
    },
    {
      id: "3",
      provider: "FlexiCover Solutions",
      type: "Basic Protection",
      coverage: "Essential Coverage",
      price: 599,
      duration: "12 months",
      features: ["Basic Repairs", "Towing Service", "Emergency Support"]
    },
    {
      id: "4",
      provider: "EliteShield Pro",
      type: "Premium Plus",
      coverage: "Ultimate Protection",
      price: 1899,
      duration: "36 months",
      features: ["Zero Deductible", "Rental Car Coverage", "Gap Insurance", "Concierge Service"]
    }
  ];

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (!userData) {
      router.push("/login");
      return;
    }
    setUser(JSON.parse(userData));
    
    // Load search history from localStorage
    const savedHistory = localStorage.getItem("searchHistory");
    if (savedHistory) {
      setSearchHistory(JSON.parse(savedHistory));
    }
  }, [router]);

  // Click outside handler for search history
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(event.target as Node)) {
        setShowSearchHistory(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setVehicleForm({
      ...vehicleForm,
      [e.target.name]: e.target.value
    });
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    setSearchQuery(query);
    
    // Simulate search delay
    setTimeout(() => {
      // Filter insurance offers based on search query
      const filtered = mockInsuranceOffers.filter(offer => 
        offer.provider.toLowerCase().includes(query.toLowerCase()) ||
        offer.type.toLowerCase().includes(query.toLowerCase()) ||
        offer.coverage.toLowerCase().includes(query.toLowerCase())
      );
      
      setFilteredInsurance(filtered);
      setShowOffers(true);
      setIsSearching(false);
      
      // Add to search history
      const newHistoryItem: SearchHistory = {
        id: Date.now().toString(),
        query: query,
        timestamp: new Date().toISOString(),
        results: filtered.length
      };
      
      const updatedHistory = [newHistoryItem, ...searchHistory.slice(0, 9)];
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      setShowSearchHistory(false);
    }, 1500);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchHistory(value.length > 0 && searchHistory.length > 0);
  };

  const selectHistoryItem = (historyItem: SearchHistory) => {
    setSearchQuery(historyItem.query);
    handleSearch(historyItem.query);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem("searchHistory");
    setShowSearchHistory(false);
  };

  const handleVehicleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    // Simulate upload delay
    setTimeout(() => {
      const newVehicle: Vehicle = {
        id: Date.now().toString(),
        year: vehicleForm.year,
        make: vehicleForm.make,
        model: vehicleForm.model,
        uploadedAt: new Date().toISOString()
      };

      setVehicles([...vehicles, newVehicle]);
      setInsuranceOffers(mockInsuranceOffers);
      setFilteredInsurance(mockInsuranceOffers);
      setShowOffers(true);
      setIsUploading(false);
      
      // Auto-search for the vehicle model
      const vehicleQuery = `${vehicleForm.year} ${vehicleForm.make} ${vehicleForm.model}`;
      setSearchQuery(vehicleQuery);
      
      // Add vehicle search to history
      const vehicleHistoryItem: SearchHistory = {
        id: (Date.now() + 1).toString(),
        query: vehicleQuery,
        timestamp: new Date().toISOString(),
        results: mockInsuranceOffers.length
      };
      
      const updatedHistory = [vehicleHistoryItem, ...searchHistory.slice(0, 9)];
      setSearchHistory(updatedHistory);
      localStorage.setItem("searchHistory", JSON.stringify(updatedHistory));
      
      // Reset form
      setVehicleForm({
        year: "",
        make: "",
        model: ""
      });
    }, 2000);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    localStorage.removeItem("user");
    setShowLogoutConfirm(false);
    router.push("/login");
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-[#D72323]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Advanced Header */}
      <header className="relative bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-900/5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D72323]/5 via-transparent to-blue-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-[#D72323] to-red-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-2xl font-black text-gray-900">
                    The <span className="bg-gradient-to-r from-[#D72323] to-red-600 bg-clip-text text-transparent">Universal</span>
                  </h1>
                  <p className="text-sm font-medium text-gray-600 -mt-1">Warranty Hub</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="hidden md:flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-4 py-2 bg-gray-50 rounded-xl">
                  <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-white">{(user.first_name?.[0] || user.email?.[0] || 'U').toUpperCase()}</span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Welcome back,</p>
                    <p className="text-xs text-gray-600">{user.first_name || user.email}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Navigation Tabs */}
        <div className="mb-12">
          <div className="flex justify-center">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl border border-gray-200/50 p-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                    activeTab === 'overview'
                      ? 'bg-gradient-to-r from-[#D72323] to-red-600 text-white shadow-lg shadow-[#D72323]/25'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v0M8 5a2 2 0 012-2h4a2 2 0 012 2v0" />
                    </svg>
                    Overview
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('search')}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                    activeTab === 'search'
                      ? 'bg-gradient-to-r from-[#D72323] to-red-600 text-white shadow-lg shadow-[#D72323]/25'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    Search Insurance
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('history')}
                  className={`px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
                    activeTab === 'history'
                      ? 'bg-gradient-to-r from-[#D72323] to-red-600 text-white shadow-lg shadow-[#D72323]/25'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="relative">
                      History
                      {searchHistory.length > 0 && (
                        <span className="ml-3 inline-flex items-center justify-center px-2 py-1 text-xs font-black bg-white/20 text-white rounded-full min-w-[24px]">
                          {searchHistory.length > 9 ? '9+' : searchHistory.length}
                        </span>
                      )}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-12">
            {/* Overview Content */}
            <div className="relative overflow-hidden">
              <div className="absolute inset-0">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#D72323]/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
              </div>
              <div className="relative">
                <div className="text-center">
                  <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
                    <span className="text-gray-900">The Universal</span>
                    <br />
                    <span className="text-[#D72323]">Warranty Hub</span>
                  </h1>
                  <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-6xl mx-auto leading-relaxed font-medium">
                    Transform your F&I operations with the industry's most comprehensive warranty management platform.
                    <span className="text-[#D72323] font-bold"> Compare, sell, and manage warranties from 15+ providers</span> in one unified system.
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 mb-10">
                    <div className="px-5 py-3 bg-white/80 border border-gray-200/60 rounded-2xl">
                      <div className="text-2xl font-black text-[#D72323]">15+</div>
                      <div className="text-sm font-semibold text-gray-700">Provider Partners</div>
                    </div>
                    <div className="px-5 py-3 bg-white/80 border border-gray-200/60 rounded-2xl">
                      <div className="text-2xl font-black text-[#D72323]">500+</div>
                      <div className="text-sm font-semibold text-gray-700">Dealerships</div>
                    </div>
                    <div className="px-5 py-3 bg-white/80 border border-gray-200/60 rounded-2xl">
                      <div className="text-2xl font-black text-[#D72323]">99.9%</div>
                      <div className="text-sm font-semibold text-gray-700">Uptime</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white/80 border border-gray-200/60 rounded-2xl p-6">
                    <div className="w-12 h-12 bg-[#D72323]/10 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-[#D72323]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <div className="text-lg font-black text-gray-900 mb-1">Compare plans fast</div>
                    <div className="text-gray-600">See offers side-by-side and pick the best coverage for your customer.</div>
                  </div>
                  <div className="bg-white/80 border border-gray-200/60 rounded-2xl p-6">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="text-lg font-black text-gray-900 mb-1">Accurate pricing</div>
                    <div className="text-gray-600">Clear prices, durations, and features—easy to explain and sell.</div>
                  </div>
                  <div className="bg-white/80 border border-gray-200/60 rounded-2xl p-6">
                    <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="text-lg font-black text-gray-900 mb-1">Quick workflow</div>
                    <div className="text-gray-600">Search, save history, and get quotes in seconds with a smooth UI.</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'search' && (
          <div className="space-y-12">
            {/* Modern Search Interface */}
            <div className="mb-12">
              <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50 p-8 hover:shadow-xl transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-[#D72323]/5 via-transparent to-blue-500/5 rounded-3xl"></div>
                <div className="relative">
                  <div className="text-center mb-8">
                    <h2 className="text-4xl font-black text-gray-900 mb-4">
                      Search <span className="bg-gradient-to-r from-[#D72323] to-red-600 bg-clip-text text-transparent">Insurance Models</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      Find the perfect insurance coverage for your vehicle. Search by provider, coverage type, or specific features.
                    </p>
                  </div>
                  
                  <div className="relative max-w-4xl mx-auto">
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                        <svg className="h-6 w-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                      </div>
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                        className="w-full pl-14 pr-32 py-6 text-lg bg-gray-50/80 border-2 border-gray-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-[#D72323]/20 focus:border-[#D72323] transition-all duration-300 placeholder-gray-500 font-medium"
                        placeholder="Search for insurance providers, coverage types, or features..."
                      />
                      <div className="absolute inset-y-0 right-0 flex items-center pr-4 gap-2">
                        {isSearching && (
                          <div className="w-6 h-6 border-2 border-[#D72323] border-t-transparent rounded-full animate-spin"></div>
                        )}
                        <button
                          onClick={() => handleSearch(searchQuery)}
                          disabled={isSearching || !searchQuery.trim()}
                          className="px-6 py-3 bg-gradient-to-r from-[#D72323] to-red-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-[#D72323]/25 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                        >
                          {isSearching ? 'Searching...' : 'Search'}
                        </button>
                      </div>
                    </div>
                    
                    {/* Search History Dropdown */}
                    {showSearchHistory && searchHistory.length > 0 && (
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-lg border border-gray-200/50 z-50 max-h-80 overflow-y-auto">
                        <div className="p-4">
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Recent Searches</h3>
                            <button
                              onClick={clearSearchHistory}
                              className="text-sm text-gray-500 hover:text-red-600 font-medium transition-colors duration-200"
                            >
                              Clear All
                            </button>
                          </div>
                          <div className="space-y-2">
                            {searchHistory.map((item) => (
                              <button
                                key={item.id}
                                onClick={() => selectHistoryItem(item)}
                                className="w-full text-left p-3 hover:bg-gray-50 rounded-xl transition-all duration-200 group"
                              >
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-3">
                                    <svg className="w-4 h-4 text-gray-400 group-hover:text-[#D72323] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="font-medium text-gray-900 group-hover:text-[#D72323] transition-colors">{item.query}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <span>{item.results} results</span>
                                    <span>•</span>
                                    <span>{new Date(item.timestamp).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Quick Search Tags */}
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <span className="text-sm font-medium text-gray-600 mr-2">Popular searches:</span>
                    {['Comprehensive Coverage', 'Premium Protection', 'Basic Insurance', 'Extended Warranty'].map((tag) => (
                      <button
                        key={tag}
                        onClick={() => handleSearch(tag)}
                        className="px-4 py-2 bg-gray-100 hover:bg-[#D72323] hover:text-white text-gray-700 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Vehicle Upload Section */}
              <div className="lg:col-span-1">
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 hover:shadow-2xl transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D72323]/5 via-transparent to-blue-500/5 rounded-2xl"></div>
              <div className="relative">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#D72323] to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Add Your Vehicle</h2>
                    <p className="text-gray-600">Get personalized warranty quotes</p>
                  </div>
                </div>

                <form onSubmit={handleVehicleUpload} className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Vehicle Year
                      </label>
                      <select
                        name="year"
                        value={vehicleForm.year}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D72323] focus:border-[#D72323] transition-all duration-200 font-medium"
                        required
                      >
                        <option value="">Select Year</option>
                        {Array.from({ length: 25 }, (_, i) => 2024 - i).map(year => (
                          <option key={year} value={year}>{year}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Vehicle Make
                      </label>
                      <select
                        name="make"
                        value={vehicleForm.make}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D72323] focus:border-[#D72323] transition-all duration-200 font-medium"
                        required
                      >
                        <option value="">Select Make</option>
                        <option value="Toyota">Toyota</option>
                        <option value="Honda">Honda</option>
                        <option value="Ford">Ford</option>
                        <option value="Chevrolet">Chevrolet</option>
                        <option value="Nissan">Nissan</option>
                        <option value="BMW">BMW</option>
                        <option value="Mercedes-Benz">Mercedes-Benz</option>
                        <option value="Audi">Audi</option>
                        <option value="Hyundai">Hyundai</option>
                        <option value="Kia">Kia</option>
                        <option value="Volkswagen">Volkswagen</option>
                        <option value="Mazda">Mazda</option>
                        <option value="Subaru">Subaru</option>
                        <option value="Lexus">Lexus</option>
                        <option value="Acura">Acura</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-3">
                        Vehicle Model
                      </label>
                      <input
                        type="text"
                        name="model"
                        value={vehicleForm.model}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-gray-50/50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#D72323] focus:border-[#D72323] transition-all duration-200 font-medium placeholder-gray-500"
                        placeholder="e.g., Camry, Civic, F-150"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isUploading}
                    className="w-full py-4 bg-gradient-to-r from-[#D72323] to-red-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-[#D72323]/25 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isUploading ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing Vehicle...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        Get Insurance Quotes
                      </div>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Uploaded Vehicles */}
            {vehicles.length > 0 && (
              <div className="mt-8 relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-6 hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-emerald-500/5 rounded-2xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">Your Vehicles</h3>
                      <p className="text-gray-600">Successfully added vehicles</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    {vehicles.map((vehicle) => (
                      <div key={vehicle.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100/50 rounded-xl border border-gray-200/50 hover:shadow-md transition-all duration-200">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                          <div>
                            <p className="font-bold text-gray-900 text-lg">
                              {vehicle.year} {vehicle.make} {vehicle.model}
                            </p>
                            <p className="text-sm text-gray-600">
                              Added on {new Date(vehicle.uploadedAt).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shadow-sm">
                          <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

              {/* Insurance Offers Section */}
              <div className="lg:col-span-2">
            {showOffers ? (
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-8 hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-blue-500/5 rounded-2xl"></div>
                <div className="relative">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900">Available Insurance Offers</h2>
                      <p className="text-gray-600">Personalized quotes from top providers</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {(filteredInsurance.length > 0 ? filteredInsurance : insuranceOffers).map((offer, index) => (
                      <div key={offer.id} className="group relative bg-white/90 backdrop-blur-sm border-2 border-gray-200/50 rounded-2xl p-6 hover:shadow-xl hover:border-[#D72323]/30 transition-all duration-300 transform hover:scale-[1.02]">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#D72323]/5 via-transparent to-blue-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative">
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                                index === 0 ? 'bg-gradient-to-br from-purple-500 to-indigo-600' :
                                index === 1 ? 'bg-gradient-to-br from-blue-500 to-cyan-600' :
                                index === 2 ? 'bg-gradient-to-br from-green-500 to-emerald-600' :
                                'bg-gradient-to-br from-[#D72323] to-red-600'
                              }`}>
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                              </div>
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#D72323] transition-colors duration-200">{offer.provider}</h3>
                                <p className="text-sm font-medium text-gray-600">{offer.type}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-3xl font-black text-[#D72323] group-hover:scale-110 transition-transform duration-200">${offer.price}</p>
                              <p className="text-sm font-semibold text-gray-500">{offer.duration}</p>
                            </div>
                          </div>

                          <div className="mb-6">
                            <div className="flex items-center gap-2 mb-3">
                              <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                                <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              </div>
                              <p className="text-sm font-bold text-gray-800">Coverage: {offer.coverage}</p>
                            </div>
                            <div className="space-y-2">
                              {offer.features.map((feature, featureIndex) => (
                                <div key={featureIndex} className="flex items-center gap-3">
                                  <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">{feature}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <button className="w-full py-3 bg-gradient-to-r from-[#D72323] to-red-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:shadow-[#D72323]/25 transition-all duration-300 transform hover:scale-[1.02] group-hover:from-red-600 group-hover:to-[#D72323]">
                            Select This Plan
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 p-16 text-center hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-500/5 via-transparent to-blue-500/5 rounded-2xl"></div>
                <div className="relative">
                  <div className="w-20 h-20 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {searchQuery ? `No results for "${searchQuery}"` : 'Start Your Insurance Search'}
                  </h3>
                  <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                    {searchQuery 
                      ? 'Try searching with different keywords or browse our available insurance options.'
                      : 'Use the search bar above to find insurance coverage or add your vehicle information to get personalized quotes.'
                    }
                  </p>
                  <div className="flex items-center justify-center gap-3 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">
                      {searchQuery ? 'Try a different search term' : 'Search above or add vehicle details on the left'}
                    </span>
                  </div>
                </div>
              </div>
              )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="space-y-12">
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-200/50 p-8 hover:shadow-xl transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[#D72323]/5 via-transparent to-blue-500/5 rounded-3xl"></div>
              <div className="relative">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                  <div>
                    <h2 className="text-3xl font-black text-gray-900">Search History</h2>
                    <p className="text-gray-600 mt-1">Your recent insurance searches (click to search again).</p>
                  </div>
                  {searchHistory.length > 0 && (
                    <button
                      onClick={clearSearchHistory}
                      className="px-5 py-3 bg-gray-100 hover:bg-red-50 text-gray-700 hover:text-red-700 rounded-xl font-bold transition-all duration-300"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {searchHistory.length === 0 ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No history yet</h3>
                    <p className="text-gray-600 max-w-md mx-auto">Go to the Search Insurance tab and search something. Your searches will appear here.</p>
                    <div className="mt-8">
                      <button
                        onClick={() => setActiveTab('search')}
                        className="px-8 py-4 bg-gradient-to-r from-[#D72323] to-red-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-[#D72323]/25 transition-all duration-300 transform hover:scale-105"
                      >
                        Go to Search
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {searchHistory.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          setActiveTab('search');
                          selectHistoryItem(item);
                        }}
                        className="w-full text-left p-5 bg-white/80 hover:bg-white rounded-2xl border border-gray-200/60 hover:border-[#D72323]/30 shadow-sm hover:shadow-md transition-all duration-300"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                              </svg>
                            </div>
                            <div>
                              <div className="text-lg font-bold text-gray-900">{item.query}</div>
                              <div className="text-sm text-gray-600 mt-1">{new Date(item.timestamp).toLocaleString()}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold">
                              {item.results} results
                            </span>
                            <div className="text-[#D72323] font-bold">Search again</div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Confirm Logout</h3>
            </div>
            
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout? You will need to sign in again to access your dashboard.
            </p>
            
            <div className="flex gap-3">
              <button
                onClick={cancelLogout}
                className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
              >
                No, Stay Logged In
              </button>
              <button
                onClick={confirmLogout}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
