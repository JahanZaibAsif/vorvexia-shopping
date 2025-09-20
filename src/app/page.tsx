// app/page.js
import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/footer';
import Hero from '../components/ui/hero';



export default function Home() {

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
                    <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110">
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

      {/* EU Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Why Choose MJ Global Store?
              </span>
            </h2>
            <p className="text-gray-400 text-lg">Premium shopping experience, delivered</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Free EU Shipping",
                description: "Complimentary express delivery on all orders over €50 across all European Union countries.",
                gradient: "from-blue-500 to-cyan-500"
              },
              {
                icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                title: "Bank-Level Security",
                description: "Advanced encryption and secure payment processing with support for all major payment methods.",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: "M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z",
                title: "Hassle-Free Returns",
                description: "30-day return window with free return shipping. Love it or get your money back, guaranteed.",
                gradient: "from-purple-500 to-pink-500"
              }
            ].map((benefit, index) => (
              <div key={index} className="group text-center">
                <div className={`bg-gradient-to-r ${benefit.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={benefit.icon} />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 group-hover:bg-clip-text transition-all">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-r from-purple-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Stay in the Loop
            </h2>
            <p className="text-purple-100 text-lg mb-10 leading-relaxed">
              Be the first to discover new collections, exclusive drops, and insider deals. Plus, get 15% off your first order.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow px-6 py-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-all"
              />
              <button className="bg-white text-purple-900 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                Get 15% Off
              </button>
            </div>
            <p className="text-purple-200 text-sm mt-4">
              Join 50,000+ style enthusiasts. Unsubscribe anytime.
            </p>
          </div>
        </div>
        {/* Background decoration */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
      </section>

      <Footer />
    </div>
  );
}