'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, ShoppingBag, Star, Globe, Truck, Shield, ArrowRight, Sparkles, Zap, Heart, Plus, Minus } from 'lucide-react';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 1,
      badge: "✨ Winter Collection 2025",
      badgeColor: "from-purple-500 to-blue-500",
      title: "Redefine",
      subtitle: "Your Style",
      titleGradient: "from-white via-gray-200 to-gray-400",
      subtitleGradient: "from-purple-400 to-blue-400",
      description: "Discover premium fashion, cutting-edge electronics, and luxury home goods with free shipping across the EU and USA. Experience shopping redefined.",
      ctaPrimary: "Shop Collection",
      backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      patternOverlay: "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
      stats: { customers: "50K+", countries: "25+", rating: "4.9" },
      floatingElements: [
        { icon: Heart, color: "text-pink-400", position: "top-1/4 left-1/4", delay: "0s" },
        { icon: Sparkles, color: "text-purple-400", position: "top-1/3 right-1/4", delay: "1s" },
        { icon: Star, color: "text-yellow-400", position: "bottom-1/3 left-1/3", delay: "2s" }
      ],
      productImage: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
      productName: "Premium Winter Jacket",
      price: "$249.99",
      discountPrice: "$199.99",
      colors: ["bg-blue-600", "bg-gray-800", "bg-red-600"],
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: 2,
      badge: "🔥 Flash Sale - 40% Off",
      badgeColor: "from-red-500 to-orange-500",
      title: "Exclusive",
      subtitle: "Electronics",
      titleGradient: "from-white via-gray-200 to-gray-400",
      subtitleGradient: "from-cyan-400 to-blue-400",
      description: "Premium tech gadgets and electronics from top brands. Latest smartphones, laptops, and smart home devices with international warranty.",
      ctaPrimary: "Shop Electronics",
      backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%), linear-gradient(45deg, #f093fb 0%, #f5576c 100%)",
      patternOverlay: "data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M20 20c0 11.046-8.954 20-20 20v20h40V20H20z'/%3E%3C/g%3E%3C/svg%3E",
      stats: { discount: "40%", warranty: "2 Years", brands: "100+" },
      floatingElements: [
        { icon: Zap, color: "text-yellow-400", position: "top-1/4 right-1/4", delay: "0s" },
        { icon: Star, color: "text-cyan-400", position: "bottom-1/4 left-1/4", delay: "1.5s" },
        { icon: Sparkles, color: "text-orange-400", position: "top-1/2 left-1/2", delay: "2.5s" }
      ],
      productImage: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      productName: "Smart Watch Pro",
      price: "$399.99",
      discountPrice: "$239.99",
      colors: ["bg-black", "bg-silver-400", "bg-rose-600"],
      features: ["Heart Rate Monitor", "Water Resistant", "30-day Battery"]
    },
    {
      id: 3,
      badge: "🏡 New Arrivals",
      badgeColor: "from-green-500 to-emerald-500",
      title: "Transform",
      subtitle: "Your Home",
      titleGradient: "from-white via-gray-200 to-gray-400",
      subtitleGradient: "from-emerald-400 to-green-400",
      description: "Curated home décor and furniture collection. Scandinavian design meets modern functionality with sustainable materials.",
      ctaPrimary: "Shop Home",
      backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%), linear-gradient(45deg, #43e97b 0%, #38f9d7 100%)",
      patternOverlay: "data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.05' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E",
      stats: { products: "5K+", sustainable: "100%", delivery: "Fast" },
      floatingElements: [
        { icon: Heart, color: "text-green-400", position: "top-1/3 left-1/3", delay: "0s" },
        { icon: Sparkles, color: "text-emerald-400", position: "bottom-1/4 right-1/4", delay: "1s" },
        { icon: Star, color: "text-teal-400", position: "top-1/4 right-1/3", delay: "2s" }
      ],
      productImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      productName: "Modern Sofa Set",
      price: "$1,299.99",
      discountPrice: "$999.99",
      colors: ["bg-gray-200", "bg-blue-100", "bg-green-100"],
      materials: ["Eco-friendly", "Premium Fabric", "Solid Wood"]
    },
    {
      id: 4,
      badge: "👔 Premium Fashion",
      badgeColor: "from-rose-500 to-pink-500",
      title: "Luxury",
      subtitle: "Collection",
      titleGradient: "from-white via-gray-200 to-gray-400",
      subtitleGradient: "from-pink-400 to-rose-400",
      description: "High-end fashion from renowned designers. Authentic pieces with certificates of authenticity and premium packaging.",
      ctaPrimary: "Shop Fashion",
      backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%), linear-gradient(45deg, #fa709a 0%, #fee140 100%)",
      patternOverlay: "data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04' fill-rule='evenodd'%3E%3Cpath d='M0 0h40v40H0V0zm40 40h40v40H40V40z'/%3E%3C/g%3E%3C/svg%3E",
      stats: { designers: "50+", authentic: "100%", returns: "30 Days" },
      floatingElements: [
        { icon: Heart, color: "text-pink-400", position: "top-1/4 left-1/4", delay: "0s" },
        { icon: Sparkles, color: "text-rose-400", position: "bottom-1/3 right-1/3", delay: "1.5s" },
        { icon: Star, color: "text-purple-400", position: "top-1/2 right-1/4", delay: "2.5s" }
      ],
      productImage: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=725&q=80",
      productName: "Designer Handbag",
      price: "$459.99",
      discountPrice: "$367.99",
      colors: ["bg-black", "bg-brown-800", "bg-red-800"],
      features: ["Genuine Leather", "Limited Edition", "Lifetime Warranty"]
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };


  const currentSlideData = slides[currentSlide];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Slider Section */}
      <section className="relative overflow-hidden min-h-screen">
        {/* Animated Background */}
        <div 
          className="absolute inset-0 transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: currentSlideData.backgroundImage,
            backgroundPosition: '0% 50%',
            backgroundSize: '400% 400%',
            animation: 'gradientShift 15s ease infinite'
          }}
        >
          {/* Pattern Overlay */}
          <div 
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("${currentSlideData.patternOverlay}")`,
              backgroundSize: '60px 60px'
            }}
          ></div>
          
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Floating animated elements */}
        <div className="absolute inset-0 pointer-events-none">
          {currentSlideData.floatingElements.map((element, index) => {
            const IconComponent = element.icon;
            return (
              <div
                key={index}
                className={`absolute ${element.position} ${element.color} animate-bounce opacity-20`}
                style={{ 
                  animationDelay: element.delay,
                  animationDuration: '3s'
                }}
              >
                <IconComponent className="w-6 h-6" />
              </div>
            );
          })}
          
          {/* Additional floating particles */}
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400/30 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-ping" style={{ animationDelay: '4s' }}></div>
          <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-pink-400/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Badge with animation */}
              <div className={`inline-block bg-gradient-to-r ${currentSlideData.badgeColor} text-white px-6 py-3 rounded-full font-medium shadow-lg transform hover:scale-105 transition-all duration-300`}>
                <div className="flex items-center space-x-2">
                  <span>{currentSlideData.badge}</span>
                  <Sparkles className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} />
                </div>
              </div>

              {/* Main Title with stagger animation */}
              <div className="space-y-2">
                <h1 className="text-6xl md:text-8xl font-bold leading-tight transform transition-all duration-700">
                  <span className={`bg-gradient-to-r ${currentSlideData.titleGradient} bg-clip-text text-transparent`}>
                    {currentSlideData.title}
                  </span>
                </h1>
                <h1 className="text-6xl md:text-8xl font-bold leading-tight transform transition-all duration-700 delay-200">
                  <span className={`bg-gradient-to-r ${currentSlideData.subtitleGradient} bg-clip-text text-transparent`}>
                    {currentSlideData.subtitle}
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-xl text-gray-200 leading-relaxed max-w-2xl transform transition-all duration-700 delay-400">
                {currentSlideData.description}
              </p>

              {/* Stats with counter animation */}
              <div className="flex space-x-8 transform transition-all duration-700 delay-600">
                {Object.entries(currentSlideData.stats).map(([key, value], index) => (
                  <div key={index} className="text-center group">
                    <div className={`text-3xl font-bold bg-gradient-to-r ${currentSlideData.subtitleGradient} bg-clip-text text-transparent group-hover:scale-110 transition-transform`}>
                      {value}
                    </div>
                    <div className="text-sm text-gray-300 capitalize">{key}</div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 transform transition-all duration-700 delay-800">
                <button className={`bg-gradient-to-r ${currentSlideData.badgeColor} hover:shadow-2xl hover:shadow-purple-500/25 text-white px-10 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 hover:-translate-y-1 flex items-center space-x-3 group`}>
                  <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>{currentSlideData.ctaPrimary}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Content - Enhanced Product Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-96 lg:h-[600px] w-full">
                {/* Main showcase card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-white/5 to-transparent rounded-3xl backdrop-blur-md border border-white/20 overflow-hidden shadow-2xl transform transition-all duration-700 hover:scale-105">
                  {/* Product Image */}
                  <div className="absolute inset-0 z-0 overflow-hidden">
                    <img 
                      src={currentSlideData.productImage} 
                      alt={currentSlideData.productName}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30"></div>
                  </div>
                  
                  {/* Inner content */}
                  <div className="p-8 h-full flex flex-col justify-between relative z-10">
                    {/* Top section */}
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                          <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>
                        <div className="text-white/80 text-sm font-medium">Featured Product</div>
                      </div>
                      <div className="text-white text-xl font-bold">{currentSlideData.productName}</div>
                    </div>

                    {/* Center section with price */}
                    <div className="flex-1 flex flex-col items-center justify-center space-y-4">
                      <div className="flex items-end space-x-2">
                        <span className="text-3xl bg-black p-2 font-bold text-white">{currentSlideData.discountPrice}</span>
                        <span className="text-lg bg-primary text-gray-300 line-through">{currentSlideData.price}</span>
                      </div>
                    </div>

                    {/* Bottom section - Add to cart */}
                    <div className="space-y-4">
                      {/* Add to cart button */}
                      <button className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2">
                        <ShoppingBag className="w-5 h-5" />
                        <span>Explore More</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Floating trust indicators */}
                <div className="absolute -top-4 -left-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl p-3 shadow-xl animate-bounce transform hover:scale-110 transition-transform">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-white" />
                    <span className="text-white font-semibold text-sm">Verified</span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-400 to-purple-500 rounded-2xl p-3 shadow-xl animate-pulse transform hover:scale-110 transition-transform">
                  <div className="flex items-center space-x-2">
                    <Truck className="w-4 h-4 text-white" />
                    <span className="text-white font-semibold text-sm">Free Ship</span>
                  </div>
                </div>

                <div className="absolute top-1/2 -left-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl p-3 shadow-xl animate-bounce delay-1000 transform hover:scale-110 transition-transform">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-white fill-current" />
                    <span className="text-white font-bold text-sm">4.9</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Navigation Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex space-x-6 items-center bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="bg-white/10 hover:bg-white/20 p-3 rounded-xl border border-white/20 transition-all group transform hover:scale-110"
            >
              <ChevronLeft className="w-5 h-5 text-white group-hover:text-gray-200" />
            </button>

            {/* Dots Indicator */}
            <div className="flex space-x-3">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-4 h-4 rounded-full transition-all transform hover:scale-125 ${
                    index === currentSlide
                      ? `bg-gradient-to-r ${currentSlideData.badgeColor} shadow-lg`
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="bg-white/10 hover:bg-white/20 p-3 rounded-xl border border-white/20 transition-all group transform hover:scale-110"
            >
              <ChevronRight className="w-5 h-5 text-white group-hover:text-gray-200" />
            </button>
          </div>
        </div>

        {/* Auto-play indicator */}
        <div className="absolute top-8 right-8 z-20">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className={`px-6 py-3 rounded-xl text-sm font-medium transition-all transform hover:scale-105 ${
              isAutoPlaying
                ? 'bg-green-500/20 text-green-300 border border-green-500/30 shadow-green-500/25 shadow-lg'
                : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
            }`}
          >
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
              <span>{isAutoPlaying ? 'Auto Play' : 'Manual'}</span>
            </div>
          </button>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30">
          <div
            className={`h-full bg-gradient-to-r ${currentSlideData.badgeColor} transition-all duration-1000 ease-linear shadow-lg`}
            style={{
              width: isAutoPlaying ? '100%' : '0%',
              animation: isAutoPlaying ? 'progressBar 6s linear infinite' : 'none'
            }}
          />
        </div>
      </section>

      <style jsx>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        
        @keyframes fillProgress {
          from { width: 0%; }
          to { width: 98%; }
        }
      `}</style>
    </div>
  );
};

export default Hero;