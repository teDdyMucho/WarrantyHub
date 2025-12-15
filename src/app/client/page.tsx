"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Vehicle {
  id: string;
  year: string;
  make: string;
  model: string;
  uploadedAt: string;
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
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setVehicleForm({
      ...vehicleForm,
      [e.target.name]: e.target.value
    });
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
      setShowOffers(true);
      setIsUploading(false);
      
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

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black py-16">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#D72323]/20 rounded-full blur-3xl -translate-x-48 -translate-y-48"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl translate-x-48 translate-y-48"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            <span className="bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              The Universal
            </span>
            <br />
            <span className="bg-gradient-to-r from-[#D72323] to-red-500 bg-clip-text text-transparent text-4xl md:text-5xl">
              Warranty Hub
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Transform your F&I operations with the industry's most comprehensive warranty management platform. 
            <span className="text-white font-semibold"> Compare, sell, and manage warranties from 15+ providers</span> in one unified system.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-white mb-1">15+</div>
              <div className="text-gray-400 text-sm">Provider Partners</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-gray-400 text-sm">Dealerships</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-white mb-1">99.9%</div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
                    {insuranceOffers.map((offer, index) => (
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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No Vehicle Added Yet</h3>
                  <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                    Add your vehicle information to see personalized insurance offers from multiple providers.
                  </p>
                  <div className="flex items-center justify-center gap-3 text-gray-500">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="font-medium">Upload your vehicle details on the left to get started</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
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
