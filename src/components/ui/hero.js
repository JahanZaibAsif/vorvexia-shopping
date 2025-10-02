import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingBag, Star } from 'lucide-react';

const EcommerceHero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const defaultSlides = [
    {
      id: 1,
      badge: "New Collection 2025",
      title: "Premium",
      subtitle: "Fashion",
      description: "Discover our latest collection of premium fashion items with worldwide shipping and authentic.",
      ctaText: "Shop Fashion",
      ctaLink: "/category/fashion",
      bannerImage: "/w1.jpg",
      category: "fashion",
      bgGradient: "from-gray-900 to-black"
    },
    {
      id: 2,
      badge: "Tech Sale - 40% Off",
      title: "Smart",
      subtitle: "Electronics", 
      description: "Latest technology and electronics with warranty and free shipping on all orders over €50.",
      ctaText: "Shop Electronics",
      ctaLink: "/category/electronics",
      bannerImage: "/w2.jpg",
      category: "electronics",
      bgGradient: "from-gray-900 to-black"
    },
    {
      id: 3,
      badge: "Home Essentials",
      title: "Modern",
      subtitle: "Living",
      description: "Transform your space with our curated collection of modern home essentials and décor items.",
      ctaText: "Shop Home",
      ctaLink: "/category/home",
      bannerImage: "/w3.jpg",
      category: "home",
      bgGradient: "from-gray-900 to-black"
    },
    {
      id: 1,
      badge: "New Collection 2025",
      title: "Premium",
      subtitle: "Fashion",
      description: "Discover our latest collection of premium fashion items with worldwide shipping and authentic.",
      ctaText: "Shop Fashion",
      ctaLink: "/category/fashion",
      bannerImage: "/w1.jpg",
      category: "fashion",
      bgGradient: "from-gray-900 to-black"
    },
  ];

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % defaultSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % defaultSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + defaultSlides.length) % defaultSlides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentSlideData = defaultSlides[currentSlide];

  return (
    <div className={`relative h-[60vh] min-h-[400px] max-h-[600px] w-full overflow-hidden bg-gradient-to-br ${currentSlideData.bgGradient}`}>
      {/* Main Slider Container */}
      <div className="relative h-full w-full">
        {/* Slides */}
        <div className="absolute inset-0 transition-all duration-700 ease-in-out">
          <div className="grid h-full grid-cols-1 lg:grid-cols-5 gap-0">
            {/* Content Side - Takes 2 columns */}
            <div className="lg:col-span-2 flex items-center justify-center px-6 lg:px-12 py-8 relative">
              {/* Subtle background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full blur-2xl"></div>
              </div>
              
              <div className="max-w-lg text-center lg:text-left space-y-6 relative z-10">
                {/* Badge */}
                <div className="inline-block">
                  <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-4 py-2 rounded-full shadow-lg">
                    {currentSlideData.badge}
                  </span>
                </div>

                {/* Title */}
                <div className="space-y-1">
                  <h1 className="text-4xl lg:text-6xl font-bold text-white leading-tight">
                    {currentSlideData.title}
                    <span className="block pl-10 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                      {currentSlideData.subtitle}
                    </span>
                  </h1>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed">
                  {currentSlideData.description}
                </p>

                {/* CTA Button */}
                <div className="pt-2">
                  <button className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-10 py-4 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 mx-auto lg:mx-0 shadow-xl">
                    <ShoppingBag size={22} />
                    {currentSlideData.ctaText}
                  </button>
                </div>
              </div>
            </div>

            {/* Image Side - Takes 3 columns for larger display */}
            <div className="lg:col-span-3 relative bg-gradient-to-br from-gray-900 to-black flex items-center justify-center lg:order-last order-first h-64 lg:h-full overflow-hidden">
              {/* Glowing background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/10 to-orange-500/10 blur-3xl"></div>
              
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <div className="relative w-full h-full max-w-4xl max-h-96 lg:max-h-full">
                  <img
                    src={currentSlideData.bannerImage}
                    alt={`${currentSlideData.title} ${currentSlideData.subtitle}`}
                    className="w-full h-full object-contain rounded-2xl shadow-2xl transition-all duration-500 hover:scale-105"
                    onError={(e) => {
                      e.target.src = `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&crop=center`;
                    }}
                  />
                  {/* Subtle overlay for better contrast */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm hover:bg-black text-white p-3 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 z-10 shadow-xl"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/80 backdrop-blur-sm hover:bg-black text-white p-2 rounded-full border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 z-10 shadow-xl"
        >
          <ChevronRight size={24} />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {defaultSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 border ${
                index === currentSlide 
                  ? 'bg-gradient-to-r from-yellow-400 to-orange-500 w-10 border-transparent shadow-lg' 
                  : 'bg-white/20 hover:bg-white/40 w-3 border-white/20 hover:border-white/40'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EcommerceHero;