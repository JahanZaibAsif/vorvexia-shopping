
'use client';
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Star, Shield, Truck, ArrowRight, Sparkles, Heart, Eye } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const DynamicHero = ({ slides = [] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Default slides if none provided
  const defaultSlides = [
    {
      id: 1,
      badge: "New Collection 2025",
      title: "Premium",
      subtitle: "Fashion",
      description: "Discover our latest collection of premium fashion items with worldwide shipping and authentic guarantee.",
      ctaText: "Shop Fashion",
      ctaLink: "/category/fashion",
      bannerImage: "/m2.png",
      category: "fashion"
    },
    {
      id: 2,
      badge: "Tech Sale - 40% Off",
      title: "Smart",
      subtitle: "Electronics",
      description: "Latest technology and electronics with warranty and free shipping on all orders over €50.",
      ctaText: "Shop Electronics",
      ctaLink: "/category/electronics",
      bannerImage: "/m3.png",
      category: "electronics"
    },
    {
      id: 3,
      badge: "Home Essentials",
      title: "Modern",
      subtitle: "Living",
      description: "Transform your space with our curated collection of modern home essentials and décor items.",
      ctaText: "Shop Home",
      ctaLink: "/category/home",
      bannerImage: "/m4.png",
      category: "home"
    }
  ];

  const slideData = slides.length > 0 ? slides : defaultSlides;

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || slideData.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slideData.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideData.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slideData.length) % slideData.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  // Get category-based gradient colors
  const getCategoryColors = (category) => {
    switch(category?.toLowerCase()) {
      case 'fashion':
        return {
          badgeGradient: 'from-purple-600 to-pink-600',
          textGradient: 'from-purple-400 to-pink-400',
          bgGradient: 'from-purple-900/20 to-pink-900/20'
        };
      case 'electronics':
        return {
          badgeGradient: 'from-blue-600 to-cyan-600',
          textGradient: 'from-blue-400 to-cyan-400',
          bgGradient: 'from-blue-900/20 to-cyan-900/20'
        };
      case 'home':
        return {
          badgeGradient: 'from-green-600 to-emerald-600',
          textGradient: 'from-green-400 to-emerald-400',
          bgGradient: 'from-green-900/20 to-emerald-900/20'
        };
      default:
        return {
          badgeGradient: 'from-gray-600 to-slate-600',
          textGradient: 'from-gray-400 to-slate-400',
          bgGradient: 'from-gray-900/20 to-slate-900/20'
        };
    }
  };

  if (!slideData || slideData.length === 0) {
    return <div className="min-h-screen bg-black flex items-center justify-center text-white">No slides available</div>;
  }

  const currentSlideData = slideData[currentSlide];
  const colors = getCategoryColors(currentSlideData.category);

  return (
    <div className="min-h-screen bg-slate-500 text-white">
      <section className="relative overflow-hidden min-h-screen">
        {/* Animated Background */}
        <div className={`absolute inset-0 bg-gradient-to-br ${colors.bgGradient} transition-all duration-1000`}>
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-5" style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, white 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }}></div>
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-purple-400/30 rounded-full animate-ping delay-1000"></div>
          <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-blue-400/30 rounded-full animate-ping delay-2000"></div>
          <div className="absolute bottom-1/4 right-1/3 w-3 h-3 bg-pink-400/20 rounded-full animate-pulse delay-500"></div>
          
          {/* Floating icons */}
          <Heart className="absolute top-1/4 left-1/5 w-4 h-4 text-pink-400/30 animate-bounce" />
          <Sparkles className="absolute top-1/3 right-1/5 w-4 h-4 text-purple-400/30 animate-bounce delay-1000" />
          <Star className="absolute bottom-1/3 left-1/4 w-4 h-4 text-yellow-400/30 animate-bounce delay-2000" />
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8">
              {/* Badge */}
              <div className={`inline-flex items-center space-x-2 bg-gradient-to-r ${colors.badgeGradient} text-white px-6 py-3 rounded-full font-medium shadow-xl transform hover:scale-105 transition-all duration-300`}>
                <span className="text-sm font-semibold">{currentSlideData.badge}</span>
                <Sparkles className="w-4 h-4" />
              </div>

              {/* Main Title */}
              <div className="space-y-2">
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight">
                  <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent block">
                    {currentSlideData.title}
                  </span>
                  <span className={`bg-gradient-to-r ${colors.textGradient} bg-clip-text text-transparent block`}>
                    {currentSlideData.subtitle}
                  </span>
                </h1>
              </div>

              {/* Description */}
              <p className="text-xl text-gray-300 leading-relaxed max-w-2xl">
                {currentSlideData.description}
              </p>

              {/* Stats/Features */}
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-800">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">Authentic Products</span>
                </div>
                <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-800">
                  <Truck className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-800">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-300">4.9 Rating</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  href={currentSlideData.ctaLink}
                  className={`inline-flex items-center justify-center space-x-3 bg-gradient-to-r ${colors.badgeGradient} hover:shadow-2xl hover:shadow-purple-500/25 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 hover:-translate-y-1 group`}
                >
                  <ShoppingBag className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                  <span>{currentSlideData.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </Link>
                
                <Link 
                  href="/all-products"
                  className="inline-flex items-center justify-center space-x-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-semibold border border-white/20 transition-all transform hover:scale-105"
                >
                  <Eye className="w-5 h-5" />
                  <span>View All</span>
                </Link>
              </div>
            </div>

            {/* Right Content - Banner Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative h-96 lg:h-[600px] w-full max-w-md mx-auto">
                {/* Banner image container */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 via-gray-800/60 to-black/80 backdrop-blur-xl rounded-3xl border border-gray-700/50 overflow-hidden shadow-2xl transform transition-all duration-700 hover:scale-105">
                  
                  {/* Banner Image */}
                  <div className="relative h-full overflow-hidden">
                    <Image
                      src={currentSlideData.bannerImage}
                      alt={currentSlideData.title}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 400px"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    
                    {/* Category badge */}
                    <div className="absolute top-6 left-6">
                      <span className={`bg-gradient-to-r ${colors.badgeGradient} text-white px-4 py-2 rounded-full text-sm font-medium`}>
                        Featured
                      </span>
                    </div>
                    
                    {/* Quick action button */}
                    <div className="absolute top-6 right-6">
                      <button className="bg-black/40 backdrop-blur-sm hover:bg-black/60 text-white p-3 rounded-full transition-all transform hover:scale-110">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Banner content overlay */}
                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-black/40 backdrop-blur-md rounded-xl p-4 border border-white/10">
                        <h3 className="text-xl font-bold text-white mb-2">Special Offer</h3>
                        <p className="text-gray-200 mb-3">Limited time only - don't miss out!</p>
                        <Link
                          href={currentSlideData.ctaLink}
                          className={`inline-flex items-center justify-center w-full bg-gradient-to-r ${colors.badgeGradient} hover:shadow-lg text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-105 space-x-2`}
                        >
                          <ShoppingBag className="w-4 h-4" />
                          <span>Shop Now</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating trust badges */}
                <div className="absolute -top-6 -left-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-3 shadow-xl animate-bounce">
                  <Shield className="w-5 h-5 text-white" />
                </div>

                <div className="absolute -bottom-6 -right-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-3 shadow-xl animate-pulse">
                  <Truck className="w-5 h-5 text-white" />
                </div>

                <div className="absolute top-1/2 -left-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-2xl p-3 shadow-xl animate-bounce" style={{ animationDelay: '1s' }}>
                  <Star className="w-5 h-5 text-white fill-current" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Controls */}
        {slideData.length > 1 && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex space-x-6 items-center bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10">
              <button
                onClick={prevSlide}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-xl border border-white/20 transition-all group transform hover:scale-110"
              >
                <ChevronLeft className="w-5 h-5 text-white" />
              </button>

              <div className="flex space-x-3">
                {slideData.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all transform hover:scale-125 ${
                      index === currentSlide
                        ? `bg-gradient-to-r ${colors.badgeGradient} shadow-lg`
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={nextSlide}
                className="bg-white/10 hover:bg-white/20 p-3 rounded-xl border border-white/20 transition-all group transform hover:scale-110"
              >
                <ChevronRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        )}

        {/* Auto-play indicator */}
        {slideData.length > 1 && (
          <div className="absolute top-8 right-8 z-20">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all transform hover:scale-105 ${
                isAutoPlaying
                  ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                  : 'bg-gray-500/20 text-gray-300 border border-gray-500/30'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                <span>{isAutoPlaying ? 'Auto' : 'Manual'}</span>
              </div>
            </button>
          </div>
        )}

        {/* Progress bar */}
        {isAutoPlaying && slideData.length > 1 && (
          <div className="absolute bottom-0 left-0 w-full h-1 bg-black/30">
            <div
              className={`h-full bg-gradient-to-r ${colors.badgeGradient} transition-all duration-1000 ease-linear`}
              style={{
                animation: 'progressBar 5s linear infinite'
              }}
            />
          </div>
        )}
      </section>

      <style jsx>{`
        @keyframes progressBar {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default DynamicHero;