"use client"
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCategories } from '@/context/CategoryContext';

function ProductCategory() {
    // const [categories, setCategories] = useState([]);
    // const [loading, setLoading] = useState(true);
    // const [error, setError] = useState(null);
    // Use CategoryContext instead of ProductContext
  const { 
    categories,
    loading,
    error,
    fetchCategories,
  } = useCategories();

  useEffect(() => {
    const loadCategories = async () => {
      try {
        await fetchCategories();
      } catch (err) {
        console.error('Error loading categories:', err);
      }
    };

    loadCategories();
  }, [fetchCategories]);

    // Gradient colors for different categories
    const gradientMap = {
        "fashion": "from-pink-500 to-rose-500",
        "electronics": "from-purple-500 to-indigo-500",
        "home": "from-green-500 to-emerald-500",
        "beauty": "from-red-500 to-orange-500",
        "sports": "from-blue-500 to-cyan-500",
        "books": "from-yellow-500 to-orange-500"
    };

    const getGradient = (categoryName) => {
        const name = categoryName?.toLowerCase() || '';
        if (name.includes('fashion') || name.includes('clothing')) return gradientMap.fashion;
        if (name.includes('electronic') || name.includes('tech')) return gradientMap.electronics;
        if (name.includes('home') || name.includes('living')) return gradientMap.home;
        if (name.includes('beauty') || name.includes('care')) return gradientMap.beauty;
        if (name.includes('sport') || name.includes('outdoor')) return gradientMap.sports;
        if (name.includes('book') || name.includes('education')) return gradientMap.books;
        return "from-gray-500 to-gray-700"; // Default gradient
    };

    if (loading) {
        return (
            <section className="py-20 bg-gradient-to-b from-black to-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                                Shop by Category
                            </span>
                        </h2>
                        <p className="text-gray-400 text-lg">Loading categories...</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
                        {[...Array(5)].map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="h-64 mb-4 rounded-2xl bg-gray-800"></div>
                                <div className="h-4 bg-gray-800 rounded mb-2"></div>
                                <div className="h-3 bg-gray-800 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-20 bg-gradient-to-b from-black to-gray-900">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Shop by Category
                        </span>
                    </h2>
                    <p className="text-red-400 text-lg">Error loading categories: {error}</p>
                    <button 
                        onClick={() => window.location.reload()} 
                        className="mt-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-6 py-2 rounded-full font-semibold hover:from-yellow-500 hover:to-orange-600 transition-all"
                    >
                        Retry
                    </button>
                </div>
            </section>
        );
    }

    if (categories.length === 0) {
        return (
            <section className="py-20 bg-gradient-to-b from-black to-gray-900">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                            Shop by Category
                        </span>
                    </h2>
                    <p className="text-gray-400 text-lg">No categories available at the moment.</p>
                </div>
            </section>
        );
    }

    return (
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    {categories.map((category) => {
                        const gradient = getGradient(category.name);
                        return (
                            <div key={category._id} className="group cursor-pointer">
                                <div className="relative h-64 mb-4 overflow-hidden rounded-2xl bg-gray-800">
                                    {category.image ? (
                                        <Image
                                            src={category.image.url}
                                            alt={category.name}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-all duration-500"
                                            onError={(e) => {
                                                // Fallback to placeholder if image fails to load
                                                e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23333'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='Arial' font-size='24' fill='%23666'%3E${category.name}%3C/text%3E%3C/svg%3E";
                                            }}
                                        />
                                    ) : (
                                        // Fallback when no image is provided
                                        <div className="w-full h-full flex items-center justify-center bg-gray-700">
                                            <span className="text-white text-2xl font-bold">{category.name.charAt(0)}</span>
                                        </div>
                                    )}
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300"></div>
                                    <div className={`absolute inset-0 bg-gradient-to-t ${gradient} opacity-0 group-hover:opacity-20 transition-all duration-300`}></div>
                                    <div className="absolute bottom-4 left-4">
                                        <div className={`w-12 h-12 bg-gradient-to-r ${gradient} rounded-xl flex items-center justify-center mb-2 transform group-hover:scale-110 transition-transform`}>
                                            <span className="text-white text-xl">→</span>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="text-lg font-semibold text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 group-hover:bg-clip-text transition-all">
                                    {category.name}
                                </h3>
                               
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default ProductCategory;