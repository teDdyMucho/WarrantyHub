"use client";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

// Hero Section Component with Advanced Design
const HeroSection = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-[#D72323] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 py-20 flex items-center min-h-screen">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8 hover:bg-white/20 transition-all duration-300">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
              Trusted by 500+ Dealerships Nationwide
            </div>
            
            {/* Main Headline */}
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent">
              The <span className="bg-gradient-to-r from-[#D72323] to-red-500 bg-clip-text text-transparent">Universal</span>
              <br />
              <span className="text-5xl md:text-7xl font-light">Warranty Hub</span>
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl md:text-2xl mb-12 text-gray-300 leading-relaxed max-w-4xl mx-auto font-light">
              Transform your F&I operations with the industry's most comprehensive warranty management platform. 
              <span className="text-white font-medium"> Compare, sell, and manage warranties from 15+ providers</span> in one unified system.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={handleLoginClick}
                className="group relative px-10 py-5 bg-gradient-to-r from-[#D72323] to-red-600 text-white rounded-2xl text-lg font-semibold transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-red-500/25 overflow-hidden"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-[#D72323] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </button>
              
              <button className="group px-10 py-5 border-2 border-white/30 hover:border-white text-white rounded-2xl text-lg font-semibold transition-all duration-500 backdrop-blur-sm hover:bg-white/10 hover:shadow-xl">
                <span className="flex items-center">
                  Schedule Demo
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </button>
            </div>
          </div>
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            <div className="text-center group">
              <div className="text-4xl font-bold text-white mb-2 group-hover:text-[#D72323] transition-colors duration-300">$2.4M+</div>
              <div className="text-gray-400 font-medium">Revenue Generated</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-white mb-2 group-hover:text-[#D72323] transition-colors duration-300">15+</div>
              <div className="text-gray-400 font-medium">Provider Partners</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl font-bold text-white mb-2 group-hover:text-[#D72323] transition-colors duration-300">99.9%</div>
              <div className="text-gray-400 font-medium">Uptime Guarantee</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

// Value Proposition Strip Component with Advanced Design
const ValuePropositionStrip = () => {
  const benefits = [
    { 
      icon: "⚡", 
      title: "Instant Comparison", 
      desc: "Compare warranties from 15+ providers in seconds with AI-powered matching",
      gradient: "from-yellow-400 to-orange-500"
    },
    { 
      icon: "💰", 
      title: "Maximize Revenue", 
      desc: "Optimize profit margins with real-time pricing and dynamic commission tracking",
      gradient: "from-green-400 to-emerald-500"
    },
    { 
      icon: "🔄", 
      title: "Streamlined Process", 
      desc: "One unified platform for all warranty operations and customer management",
      gradient: "from-blue-400 to-cyan-500"
    },
    { 
      icon: "📊", 
      title: "Data-Driven Insights", 
      desc: "Advanced analytics and reporting to boost F&I performance and ROI",
      gradient: "from-purple-400 to-pink-500"
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-[#D72323]/20 via-transparent to-[#D72323]/20"></div>
      </div>
      
      <div className="relative container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="text-[#D72323]">WarrantyHub</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your dealership's warranty operations with cutting-edge technology and unmatched efficiency
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <div key={index} className="group relative">
              {/* Card */}
              <div className="relative h-full p-8 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-200/50 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                {/* Icon Background */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${benefit.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-2xl filter drop-shadow-sm">{benefit.icon}</span>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#D72323] transition-colors duration-300">
                  {benefit.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {benefit.desc}
                </p>
                
                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-[#D72323]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-2 -right-2 w-4 h-4 bg-[#D72323] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            </div>
          ))}
        </div>
        
        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#D72323] to-red-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105">
            Explore All Features
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

// How It Works Component with Advanced Design
const HowItWorks = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };
  const steps = [
    {
      step: "01",
      title: "Connect Your Providers",
      description: "Seamlessly integrate with 15+ warranty providers through our secure, enterprise-grade API connections with real-time synchronization.",
      icon: "🔗",
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "02", 
      title: "Compare in Real-Time",
      description: "Access instant side-by-side comparisons of coverage, pricing, terms, and commission structures from all connected providers.",
      icon: "⚖️",
      color: "from-green-500 to-emerald-500"
    },
    {
      step: "03",
      title: "Present to Customers",
      description: "Utilize our professional customer-facing presentation tools with interactive comparisons and digital contract signing.",
      icon: "👥",
      color: "from-purple-500 to-pink-500"
    },
    {
      step: "04",
      title: "Process & Remit",
      description: "Automate submissions, track approvals, and handle remittance through our integrated payment and reporting system.",
      icon: "✅",
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
      </div>
      
      <div className="relative container mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#D72323]/10 text-[#D72323] text-sm font-semibold mb-6">
            <span className="w-2 h-2 bg-[#D72323] rounded-full mr-2 animate-pulse"></span>
            Simple 4-Step Process
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            How <span className="bg-gradient-to-r from-[#D72323] to-red-500 bg-clip-text text-transparent">WarrantyHub</span> Works
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Transform your F&I process with our streamlined warranty management system. 
            From integration to remittance, we've simplified every step of the warranty lifecycle.
          </p>
        </div>
        
        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gray-300 to-transparent transform -translate-y-1/2"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Card */}
                <div className="relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-8">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${step.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {step.step}
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="text-center mb-6 mt-4">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-gray-50 group-hover:bg-gray-100 transition-colors duration-300">
                      <span className="text-3xl">{step.icon}</span>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-[#D72323] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Hover Glow Effect */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                </div>
                
                {/* Arrow Connector */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center border-2 border-gray-200">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-[#D72323]/5 to-red-500/5 rounded-3xl p-12 border border-[#D72323]/10">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Join hundreds of dealerships already using WarrantyHub to streamline their warranty operations and boost revenue.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={handleLoginClick}
                className="px-8 py-4 bg-gradient-to-r from-[#D72323] to-red-600 text-white rounded-2xl font-semibold hover:shadow-xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105"
              >
                Login
              </button>
              <button className="px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl font-semibold hover:border-[#D72323] hover:text-[#D72323] transition-all duration-300">
                Watch Demo Video
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Key Features Component
const KeyFeatures = () => {
  const features = [
    {
      title: "Multi-Provider Integration",
      description: "Connect with 15+ warranty providers through a single, unified interface.",
      icon: "🔗"
    },
    {
      title: "Real-Time Pricing",
      description: "Get instant quotes and compare pricing across all connected providers.",
      icon: "💲"
    },
    {
      title: "Customer Presentation Tools",
      description: "Professional, branded presentations that help close more warranty sales.",
      icon: "📱"
    },
    {
      title: "Automated Remittance",
      description: "Streamline payment processing and provider remittance with automation.",
      icon: "⚙️"
    },
    {
      title: "Performance Analytics",
      description: "Track F&I performance, conversion rates, and revenue optimization.",
      icon: "📈"
    },
    {
      title: "Compliance Management",
      description: "Stay compliant with state regulations and provider requirements.",
      icon: "🛡️"
    }
  ];

  return (
    <section className="py-20 bg-[#F5EDED]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Powerful Features</h2>
          <p className="text-xl text-[#3E3636] max-w-3xl mx-auto">
            Everything you need to modernize your warranty operations
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-black mb-4">{feature.title}</h3>
              <p className="text-[#3E3636]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Why Dealerships Choose WarrantyHub Component
const WhyChooseUs = () => {
  const reasons = [
    {
      title: "Increase F&I Revenue",
      description: "Dealerships see an average 23% increase in warranty revenue within 90 days",
      stat: "23%"
    },
    {
      title: "Save Time Daily",
      description: "Reduce warranty processing time from hours to minutes",
      stat: "85%"
    },
    {
      title: "Provider Network",
      description: "Access to the largest network of warranty providers in the industry",
      stat: "15+"
    }
  ];

  return (
    <section className="py-20 bg-black text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Dealerships Choose WarrantyHub</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of dealerships already maximizing their warranty potential
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center">
              <div className="text-6xl font-bold text-[#D72323] mb-4">{reason.stat}</div>
              <h3 className="text-2xl font-bold mb-4">{reason.title}</h3>
              <p className="text-gray-300 text-lg">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Provider Aggregation Overview Component
const ProviderAggregation = () => {
  const providers = [
    "Zurich", "Assurant", "JM&A Group", "Protective", "CNA National", 
    "Ally Financial", "Route 66", "Endurance", "CARCHEX", "CarShield",
    "Omega", "Lyndon", "Fidelity", "GWC", "EasyCare"
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">
            One Platform, <span className="text-[#D72323]">Every Provider</span>
          </h2>
          <p className="text-xl text-[#3E3636] max-w-3xl mx-auto mb-8">
            Compare warranties from all major providers in one place. No more juggling multiple systems or missing opportunities.
          </p>
        </div>
        
        <div className="bg-[#F5EDED] p-8 rounded-lg mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {providers.map((provider, index) => (
              <div key={index} className="bg-white p-4 rounded-lg text-center shadow-sm">
                <div className="text-[#3E3636] font-semibold">{provider}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="text-center">
          <p className="text-lg text-[#3E3636] mb-6">
            <strong>Stop switching between systems.</strong> Compare all your warranty options in seconds, not hours.
          </p>
          <button className="bg-[#D72323] hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
            See All Providers
          </button>
        </div>
      </div>
    </section>
  );
};

// Security & Compliance Component
const SecurityCompliance = () => {
  const certifications = [
    { title: "SOC 2 Type II", desc: "Enterprise-grade security controls" },
    { title: "256-bit SSL", desc: "Bank-level data encryption" },
    { title: "GDPR Compliant", desc: "Privacy regulation compliance" },
    { title: "State Certified", desc: "Licensed in all 50 states" }
  ];

  return (
    <section className="py-20 bg-[#3E3636] text-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Security & Compliance</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your data and your customers' information are protected by enterprise-grade security
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {certifications.map((cert, index) => (
            <div key={index} className="text-center">
              <div className="bg-[#D72323] w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <div className="text-2xl">🔒</div>
              </div>
              <h3 className="text-xl font-bold mb-2">{cert.title}</h3>
              <p className="text-gray-300">{cert.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonials Component
const Testimonials = () => {
  const testimonials = [
    {
      quote: "WarrantyHub transformed our F&I department. We're seeing 30% higher warranty penetration and our customers love the streamlined process.",
      author: "Mike Johnson",
      title: "F&I Manager",
      company: "Premier Auto Group"
    },
    {
      quote: "The time savings alone justify the investment. What used to take our team hours now takes minutes. Game changer for our dealership.",
      author: "Sarah Chen",
      title: "General Manager", 
      company: "Metro Motors"
    },
    {
      quote: "Finally, a warranty platform that actually works. The provider comparisons are instant and the customer presentations are professional.",
      author: "David Rodriguez",
      title: "Owner",
      company: "Rodriguez Family Dealerships"
    }
  ];

  return (
    <section className="py-20 bg-[#F5EDED]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">What Dealerships Say</h2>
          <p className="text-xl text-[#3E3636] max-w-3xl mx-auto">
            Real results from real dealerships using WarrantyHub
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg">
              <div className="text-[#D72323] text-4xl mb-4">"</div>
              <p className="text-[#3E3636] mb-6 italic">{testimonial.quote}</p>
              <div className="border-t pt-4">
                <div className="font-bold text-black">{testimonial.author}</div>
                <div className="text-[#3E3636]">{testimonial.title}</div>
                <div className="text-[#D72323] font-semibold">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Pricing Framework Component
const PricingFramework = () => {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for smaller dealerships",
      features: [
        "Up to 5 warranty providers",
        "Basic comparison tools",
        "Standard customer presentations",
        "Email support"
      ],
      cta: "Start Free Trial"
    },
    {
      name: "Professional",
      description: "Most popular for growing dealerships",
      features: [
        "Up to 15 warranty providers",
        "Advanced analytics & reporting",
        "Custom branded presentations",
        "Priority phone support",
        "API integrations"
      ],
      cta: "Most Popular",
      popular: true
    },
    {
      name: "Enterprise",
      description: "For dealership groups & large operations",
      features: [
        "Unlimited warranty providers",
        "White-label solutions",
        "Dedicated account manager",
        "Custom integrations",
        "24/7 premium support"
      ],
      cta: "Contact Sales"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-[#3E3636] max-w-3xl mx-auto">
            Choose the plan that fits your dealership's needs. All plans include core warranty management features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div key={index} className={`rounded-lg p-8 ${plan.popular ? 'bg-[#D72323] text-white scale-105' : 'bg-[#F5EDED] text-black'} relative`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-2 rounded-full text-sm font-semibold">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className={`mb-6 ${plan.popular ? 'text-gray-200' : 'text-[#3E3636]'}`}>{plan.description}</p>
              
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <div className={`w-5 h-5 rounded-full mr-3 flex items-center justify-center ${plan.popular ? 'bg-white text-[#D72323]' : 'bg-[#D72323] text-white'}`}>
                      ✓
                    </div>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <button className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 ${
                plan.popular 
                  ? 'bg-white text-[#D72323] hover:bg-gray-100' 
                  : 'bg-[#D72323] text-white hover:bg-red-700'
              }`}>
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Final CTA Footer Component
const FinalCTAFooter = () => {
  const router = useRouter();

  const handleLoginClick = () => {
    router.push('/login');
  };

  return (
    <footer className="bg-black text-white">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your <span className="text-[#D72323]">Warranty Operations?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Join thousands of dealerships already using WarrantyHub to maximize their F&I revenue and streamline their warranty process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={handleLoginClick}
              className="bg-[#D72323] hover:bg-red-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Start Your Free Trial
            </button>
            <button className="border-2 border-white hover:bg-white hover:text-black text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
              Schedule a Demo
            </button>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-[#D72323] mb-4">WarrantyHub</h3>
              <p className="text-gray-300 mb-4">
                The universal warranty platform for automotive dealerships. Compare, sell, and manage extended warranties from multiple providers in one centralized system.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-[#D72323] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">f</span>
                </div>
                <div className="w-10 h-10 bg-[#D72323] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">t</span>
                </div>
                <div className="w-10 h-10 bg-[#D72323] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">in</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Training</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 mb-4 md:mb-0">
              © 2024 WarrantyHub. All rights reserved.
            </div>
            <div className="flex space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Main Page Component
export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is already logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      // If user is logged in, redirect to client dashboard
      router.push("/client");
    }
  }, [router]);

  return (
    <main className="min-h-screen">
      <HeroSection />
      <ValuePropositionStrip />
      <HowItWorks />
      <KeyFeatures />
      <WhyChooseUs />
      <ProviderAggregation />
      <SecurityCompliance />
      <Testimonials />
      <PricingFramework />
      <FinalCTAFooter />
    </main>
  );
}
