// app/page.js
"use client";
import Image from 'next/image';
import { useState} from 'react';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/footer';
import Hero from '../components/ui/hero';
import BenfitSection from '../components/BenfitSection';
import NewsLatter1 from '../components/ui/NewsLatter1';
import ProductQuickView from '../components/ui/ProductQuickView';

export default function Home() {
  const [selectedProduct, setSelectedProduct] = useState(null);
const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

const openQuickView = (product: any) => {
  setSelectedProduct(product);
  setIsQuickViewOpen(true);
};

const closeQuickView = () => {
  setIsQuickViewOpen(false);
  setSelectedProduct(null);
};
  return (
    <div className="min-h-screen bg-black text-white px-3 ">
     
     <Header/>

      {/* Hero Section */}
      <Hero/>
      

      {/* Featured Categories */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Shop by Category
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Curated collections for every lifestyle</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { name: "Women's Fashion", image: "/woman-fashion.jpg", gradient: "from-pink-500 to-rose-500" },
              { name: "Men's Fashion", image: "/men-fashion.jpg", gradient: "from-blue-500 to-cyan-500" },
              { name: "Electronics", image: "/electronic1.jpg", gradient: "from-purple-500 to-indigo-500" },
              { name: "Home & Living", image: "/home1.jpg", gradient: "from-green-500 to-emerald-500" },
            ].map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative h-64 mb-4 overflow-hidden rounded-2xl bg-gray-800">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.gradient} opacity-0 group-hover:opacity-20 transition-all duration-300`}></div>
                  <div className="absolute bottom-4 left-4">
                    <div className={`w-12 h-12 bg-gradient-to-r ${category.gradient} rounded-xl flex items-center justify-center mb-2 transform group-hover:scale-110 transition-transform`}>
                      <span className="text-white text-xl">→</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 group-hover:bg-clip-text transition-all">
                  {category.name}
                </h3>
                <p className="text-gray-500 text-sm group-hover:text-gray-400 transition-colors">Explore collection</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-16">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                  Trending Now
                </span>
              </h2>
              <p className="text-gray-400">Hand-picked favorites from our curators</p>
            </div>
            <button className="text-purple-400 hover:text-purple-300 font-semibold flex items-center space-x-2 transition-colors group">
              <span>View all</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Home Decoration", price: "€129.99", originalPrice: "€159.99", image: "/home2.jpg", badge: "Best Seller" },
              { name: "Men Lather jacket", price: "€89.99", originalPrice: "€119.99", image: "/men1.jpg", badge: "Limited" },
              { name: "Leather Backpack", price: "€149.99", originalPrice: null, image: "/leather-product.jpg", badge: "New" },
              { name: "Black Pakistani Collection", price: "€199.99", originalPrice: "€249.99", image: "/lady1.jpg", badge: "Sale" },
            ].map((product, index) => (
              <div key={index} className="group">
                <div className="relative h-80 mb-4 overflow-hidden rounded-2xl bg-gray-900">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                      product.badge === 'Sale' ? 'bg-red-500' :
                      product.badge === 'New' ? 'bg-green-500' :
                      product.badge === 'Limited' ? 'bg-purple-500' :
                      'bg-blue-500'
                    } text-white`}>
                      {product.badge}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all">
                    <button 
                     className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button
                    onClick={() => openQuickView(product)} 
                     className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>

                  {/* Quick add button */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    <button className="w-full bg-white text-black py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                      Quick Add
                    </button>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">{product.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-white">{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-gray-500 line-through">{product.originalPrice}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Products - Redesigned */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-16">
            <div>
              <div className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-white rounded-full mr-2 animate-pulse"></span>
                Just Arrived
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Latest Products
                </span>
              </h2>
              <p className="text-gray-400">Fresh arrivals that just hit our shelves</p>
            </div>
            <button className="text-purple-400 hover:text-purple-300 font-semibold flex items-center space-x-2 transition-colors group">
              <span>View all</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Minimalist Wall Art", price: "€79.99", originalPrice: "€99.99", image: "/home2.jpg", badge: "New" },
              { name: "Urban Denim Jacket", price: "€89.99", originalPrice: "€119.99", image: "/men1.jpg", badge: "Just In" },
              { name: "Tech Organizer", price: "€49.99", originalPrice: null, image: "/leather-product.jpg", badge: "New" },
              { name: "Evening Gown", price: "€179.99", originalPrice: "€219.99", image: "/lady1.jpg", badge: "Latest" },
            ].map((product, index) => (
              <div key={index} className="group bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-4 border border-gray-700 hover:border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
                <div className="relative h-64 mb-4 overflow-hidden rounded-xl bg-gray-800">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-50 transition-all"></div>
                  
                  {/* New arrival badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white">
                      {product.badge}
                    </span>
                  </div>

                  {/* Quick view button */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all">
                    <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    </button>
                  </div>

                  {/* Add to cart button */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all">
                      Add to Cart
                    </button>
                  </div>
                </div>
                
                <div className="p-2">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">{product.name}</h3>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-white">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-gray-500 text-sm line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    <div className="flex items-center text-yellow-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm ml-1">4.8</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Selling Products - Redesigned */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex justify-between items-center mb-16">
            <div>
              <div className="inline-flex items-center bg-gradient-to-r from-amber-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                <span className="w-2 h-2 bg-white rounded-full mr-2"></span>
                Customer Favorites
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
                  Best Sellers
                </span>
              </h2>
              <p className="text-gray-400">Products loved by thousands of customers</p>
            </div>
            <button className="text-orange-400 hover:text-orange-300 font-semibold flex items-center space-x-2 transition-colors group">
              <span>View all</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                name: "Cozy Home Set", 
                price: "€129.99", 
                originalPrice: "€159.99", 
                image: "/home2.jpg", 
                badge: "Bestseller",
                rating: 4.9,
                reviews: 245
              },
              { 
                name: "Premium Leather Jacket", 
                price: "€189.99", 
                originalPrice: "€219.99", 
                image: "/men1.jpg", 
                badge: "Popular",
                rating: 4.8,
                reviews: 189
              },
              { 
                name: "Designer Handbag", 
                price: "€149.99", 
                originalPrice: null, 
                image: "/leather-product.jpg", 
                badge: "Top Rated",
                rating: 4.9,
                reviews: 312
              },
              { 
                name: "Elegant Dress", 
                price: "€199.99", 
                originalPrice: "€249.99", 
                image: "/lady1.jpg", 
                badge: "Hot Item",
                rating: 4.7,
                reviews: 156
              },
            ].map((product, index) => (
              <div key={index} className="group bg-gradient-to-b from-gray-900 to-black rounded-2xl p-4 border border-gray-800 hover:border-amber-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10">
                <div className="relative h-64 mb-4 overflow-hidden rounded-xl bg-gray-800">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-80 group-hover:opacity-60 transition-all"></div>
                  
                  {/* Bestseller badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                      {product.badge}
                    </span>
                  </div>

                  {/* Sales count */}
                  <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                    🔥 {Math.floor(Math.random() * 500) + 200} sold
                  </div>

                  {/* Quick add button */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-2 rounded-xl font-semibold hover:from-amber-700 hover:to-orange-700 transition-all flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </div>
                
                <div className="p-2">
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-amber-300 transition-colors">{product.name}</h3>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-white">{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-gray-500 text-sm line-through">{product.originalPrice}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center text-amber-400">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm ml-1">{product.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400">
                    <span>{product.reviews} reviews</span>
                    <span className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-green-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      In stock
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BenfitSection />

      <NewsLatter1 />

      <Footer />
        <ProductQuickView 
          product={selectedProduct}
          isOpen={isQuickViewOpen}
          onClose={closeQuickView}
        />
    </div>
  );
}