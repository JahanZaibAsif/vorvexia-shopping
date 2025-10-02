"use client"
import React, {useState, useEffect} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useProducts } from '@/context/ProductContext'
import { useCart } from '@/context/CartContext';
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Eye } from 'lucide-react';

function LatestProduct({ onProductClick }) {
    const { addToCart, toggleCart } = useCart();
    const { 
        products, 
        loading, 
        fetchProducts,
        error, 
        clearError
    } = useProducts();

    // State for image sliders per product
    const [currentImageIndexes, setCurrentImageIndexes] = useState({});
    const [autoPlay, setAutoPlay] = useState(true);

    useEffect(() => {
        const loadProducts = async () => {
            try {
                await fetchProducts();
            } catch (err) {
                console.error('Error loading products:', err);
            }
        };
        loadProducts();
    }, [fetchProducts]);

    useEffect(() => {
        if (products.length > 0) {
            const initialIndexes = {};
            products.forEach((product, index) => {
                if (product.images && product.images.length > 0) {
                    initialIndexes[product._id || index] = 0;
                }
            });
            setCurrentImageIndexes(initialIndexes);
        }
    }, [products]);

    // Auto-play slider
    useEffect(() => {
        if (!autoPlay) return;

        const interval = setInterval(() => {
            setCurrentImageIndexes(prevIndexes => {
                const newIndexes = { ...prevIndexes };
                Object.keys(newIndexes).forEach(productId => {
                    const product = products.find(p => (p._id || p.id) === productId);
                    if (product && product.images && product.images.length > 1) {
                        newIndexes[productId] = (newIndexes[productId] + 1) % product.images.length;
                    }
                });
                return newIndexes;
            });
        }, 4000);

        return () => clearInterval(interval);
    }, [autoPlay, products]);

    const nextImage = (productId, productImages) => {
        setCurrentImageIndexes(prev => ({
            ...prev,
            [productId]: (prev[productId] + 1) % productImages.length
        }));
        setAutoPlay(false);
        setTimeout(() => setAutoPlay(true), 10000); // Resume auto-play after 10 seconds
    };

    const prevImage = (productId, productImages) => {
        setCurrentImageIndexes(prev => ({
            ...prev,
            [productId]: (prev[productId] - 1 + productImages.length) % productImages.length
        }));
        setAutoPlay(false);
        setTimeout(() => setAutoPlay(true), 10000);
    };

    const goToImage = (productId, index) => {
        setCurrentImageIndexes(prev => ({
            ...prev,
            [productId]: index
        }));
        setAutoPlay(false);
        setTimeout(() => setAutoPlay(true), 10000);
    };

    const handleAddToCart = (product, e) => {
        e.preventDefault();
        e.stopPropagation();
        
        addToCart({
            id: product._id || product.id,
            name: product.name,
            price: product.salePrice || product.price,
            image: product.images && product.images.length > 0 ? product.images[0].url : '/placeholder.png',
            quantity: 1
        });
    };

    // Add quick view handler
    const handleQuickView = (productId, e) => {
        e.preventDefault();
        e.stopPropagation();
        onProductClick(productId);
    };

    // Add quick view to the entire product card
    const handleProductCardClick = (productId, e) => {
        e.preventDefault();
        onProductClick(productId);
    };

    const getBadgeColor = (product) => {
        if (product.salePrice && product.originalPrice) return 'from-red-500 to-pink-600';
        if (product.productType === 'new') return 'from-green-500 to-emerald-600';
        if (product.stock < 10) return 'from-orange-500 to-red-600';
        return 'from-blue-500 to-purple-600';
    };

    const getBadgeText = (product) => {
        if (product.salePrice && product.originalPrice) return 'Sale';
        if (product.productType === 'new') return 'New';
        if (product.stock < 10) return 'Limited';
        return 'Popular';
    };

    // Get latest products (last 8 products)
    const latestProducts = products
        .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
        .slice(0, 8);

    if (loading && products.length === 0) {
        return (
            <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
                <div className="container mx-auto px-4">
                    <div className="text-center">
                        <div className="animate-pulse bg-gray-800 h-8 w-48 mx-auto mb-4 rounded"></div>
                        <div className="animate-pulse bg-gray-800 h-12 w-64 mx-auto mb-4 rounded"></div>
                        <div className="animate-pulse bg-gray-800 h-4 w-96 mx-auto mb-16 rounded"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="h-64 bg-gray-800 rounded-xl mb-4"></div>
                                <div className="h-4 bg-gray-800 rounded mb-2"></div>
                                <div className="h-6 bg-gray-800 rounded w-3/4"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        );
    }

    return (
        <div>
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
                        <Link href="/products" className="text-purple-400 hover:text-purple-300 font-semibold flex items-center space-x-2 transition-colors group">
                            <span>View all</span>
                            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {latestProducts.map((product, index) => {
                            const productId = product._id || product.id;
                            const productImages = product.images || [];
                            const currentImageIndex = currentImageIndexes[productId] || 0;
                            const hasMultipleImages = productImages.length > 1;

                            return (
                                <div key={productId} className="group">
                                    <div 
                                        onClick={(e) => handleProductCardClick(productId, e)}
                                        className="bg-gradient-to-b from-gray-800 to-gray-900 rounded-2xl p-4 border border-gray-700 hover:border-purple-500/30 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 h-full flex flex-col cursor-pointer"
                                    >
                                        <div className="relative h-64 mb-4 overflow-hidden rounded-xl bg-gray-800 flex-shrink-0">
                                            {/* Product Image with Slider */}
                                            {productImages.length > 0 ? (
                                                <>
                                                    <Image
                                                        src={productImages[currentImageIndex]?.url || '/placeholder.png'}
                                                        alt={product.name}
                                                        fill
                                                        className="object-cover transition-all duration-500"
                                                        onError={(e) => {
                                                            e.target.src = '/placeholder.png';
                                                        }}
                                                    />
                                                    
                                                    {/* Image Navigation Arrows */}
                                                    {hasMultipleImages && (
                                                        <>
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    prevImage(productId, productImages);
                                                                }}
                                                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                                                            >
                                                                <ChevronLeft size={20} />
                                                            </button>
                                                            <button 
                                                                onClick={(e) => {
                                                                    e.preventDefault();
                                                                    e.stopPropagation();
                                                                    nextImage(productId, productImages);
                                                                }}
                                                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300"
                                                            >
                                                                <ChevronRight size={20} />
                                                            </button>
                                                        </>
                                                    )}

                                                    {/* Image Dots Indicator */}
                                                    {hasMultipleImages && (
                                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-1">
                                                            {productImages.map((_, imgIndex) => (
                                                                <button
                                                                    key={imgIndex}
                                                                    onClick={(e) => {
                                                                        e.preventDefault();
                                                                        e.stopPropagation();
                                                                        goToImage(productId, imgIndex);
                                                                    }}
                                                                    className={`w-2 h-2 rounded-full transition-all ${
                                                                        imgIndex === currentImageIndex
                                                                            ? 'bg-white'
                                                                            : 'bg-white/50 hover:bg-white/70'
                                                                    }`}
                                                                />
                                                            ))}
                                                        </div>
                                                    )}
                                                </>
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-700">
                                                    <span className="text-gray-400 text-lg">No Image</span>
                                                </div>
                                            )}

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-70 group-hover:opacity-50 transition-all"></div>
                                            
                                            {/* Product Badge */}
                                            <div className="absolute top-4 left-4">
                                                <span className={`px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r ${getBadgeColor(product)} text-white`}>
                                                    {getBadgeText(product)}
                                                </span>
                                            </div>

                                            {/* Quick Actions */}
                                            <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                                <button className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110">
                                                    <Heart size={16} className="text-gray-800" />
                                                </button>
                                                {/* Update Eye button to use quick view */}
                                                <button 
                                                    onClick={(e) => handleQuickView(productId, e)}
                                                    className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-all transform hover:scale-110"
                                                >
                                                    <Eye size={16} className="text-gray-800" />
                                                </button>
                                            </div>

                                            {/* Add to cart button */}
                                            <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300">
                                                <button 
                                                    onClick={(e) => handleAddToCart(product, e)}
                                                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center space-x-2"
                                                >
                                                    <ShoppingCart size={18} />
                                                    <span>Add to Cart</span>
                                                </button>
                                            </div>
                                        </div>
                                        
                                        {/* Product Info */}
                                        <div className="p-2 flex-1 flex flex-col">
                                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors line-clamp-2">
                                                {product.name}
                                            </h3>
                                            <p className="text-gray-400 text-sm mb-3 line-clamp-2 flex-1">
                                                {product.description}
                                            </p>
                                            <div className="flex items-center justify-between mt-auto">
                                                <div className="flex items-center space-x-2">
                                                    <span className="text-xl font-bold text-white">
                                                        €{product.salePrice || product.price}
                                                    </span>
                                                    {product.originalPrice && product.originalPrice > (product.salePrice || product.price) && (
                                                        <span className="text-gray-500 text-sm line-through">
                                                            €{product.originalPrice}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex items-center text-yellow-400">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="text-sm ml-1">{product.rating || '4.8'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Empty State */}
                    {!loading && latestProducts.length === 0 && (
                        <div className="text-center py-12">
                            <div className="text-gray-400 text-lg">No latest products available</div>
                            <Link href="/products" className="text-purple-400 hover:text-purple-300 mt-4 inline-block">
                                Browse all products
                            </Link>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default LatestProduct;