import React from 'react'

function TreandingProduct() {
  return (
    <div>
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
    </div>
  )
}

export default TreandingProduct
