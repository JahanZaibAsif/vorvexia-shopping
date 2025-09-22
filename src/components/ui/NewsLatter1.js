import React from 'react'

function NewsLatter1() {
  return (
    <div>
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
    </div>
  )
}

export default NewsLatter1
