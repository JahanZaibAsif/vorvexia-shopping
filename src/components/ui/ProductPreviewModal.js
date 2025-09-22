'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

const ProductPreviewModal = ({ product, isOpen, onClose, quantity = 1, onQuantityChange }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const { addToCart } = useCart();

  // Initialize selected options when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors?.[0] || null);
      setSelectedSize(product.sizes?.[0] || null);
      setSelectedImageIndex(0);
    }
  }, [product]);

  // Handle modal animations
  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
      const timer = setTimeout(() => setIsAnimating(false), 300);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  const handleAddToCart = () => {
    if (!product.stock || product.stock === 0) {
      toast.error('Product is out of stock');
      return;
    }

    if (quantity > product.stock) {
      toast.error(`Only ${product.stock} items available`);
      return;
    }

    const productToAdd = {
      id: product._id || product.id,
      name: product.name,
      price: product.salePrice || product.price,
      image: product.images && product.images.length > 0 ? product.images[selectedImageIndex].url : '/placeholder.png',
      quantity: quantity,
      selectedColor,
      selectedSize
    };

    addToCart(productToAdd);
    toast.success(`${quantity} x ${product.name} added to cart!`);
    onClose();
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!product || (!isOpen && !isAnimating)) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isOpen 
          ? 'bg-black/80 backdrop-blur-sm opacity-100' 
          : 'bg-black/0 opacity-0 pointer-events-none'
      }`}
      onClick={handleBackdropClick}
    >
      <div 
        className={`bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden border border-gray-700 shadow-2xl transition-all duration-300 ${
          isOpen 
            ? 'scale-100 opacity-100 translate-y-0' 
            : 'scale-95 opacity-0 translate-y-8'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">Product Preview</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-xl transition-colors group"
          >
            <svg 
              className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Images Section */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-800">
                <Image
                  src={product.images && product.images.length > 0 ? product.images[selectedImageIndex].url : '/placeholder.png'}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                
                {/* Badge */}
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                      product.badge === 'Sale' ? 'bg-red-500' :
                      product.badge === 'New' ? 'bg-green-500' :
                      product.badge === 'Limited' ? 'bg-purple-500' :
                      product.badge === 'Deal' ? 'bg-orange-500' :
                      product.badge === 'Exclusive' ? 'bg-pink-500' :
                      'bg-blue-500'
                    } text-white`}>
                      {product.badge}
                    </span>
                  </div>
                )}

                {/* Stock Status */}
                {(!product.stock || product.stock === 0) && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-gray-800/90 text-gray-300 px-3 py-1 text-sm font-medium rounded-full">
                      Out of Stock
                    </span>
                  </div>
                )}

                {/* Image Navigation Arrows */}
                {product.images && product.images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex(prev => 
                        prev === 0 ? product.images.length - 1 : prev - 1
                      )}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(prev => 
                        prev === product.images.length - 1 ? 0 : prev + 1
                      )}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Images */}
              {product.images && product.images.length > 1 && (
                <div className="flex space-x-3 overflow-x-auto pb-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                        selectedImageIndex === index 
                          ? 'border-purple-500 ring-2 ring-purple-500/30' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                    >
                      <Image
                        src={image.url}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              {/* Title and Rating */}
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                  {product.name}
                </h1>
                
                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center space-x-3">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-400">
                      {product.rating} ({product.reviews || 0} reviews)
                    </span>
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-white">
                    €{product.salePrice || product.price}
                  </span>
                  {product.originalPrice && product.originalPrice > (product.salePrice || product.price) && (
                    <span className="text-xl text-gray-500 line-through">€{product.originalPrice}</span>
                  )}
                </div>
                {product.originalPrice && product.originalPrice > (product.salePrice || product.price) && (
                  <span className="text-green-400 font-medium">
                    Save €{(product.originalPrice - (product.salePrice || product.price)).toFixed(2)} 
                    ({Math.round(((product.originalPrice - (product.salePrice || product.price)) / product.originalPrice) * 100)}% off)
                  </span>
                )}
              </div>

              {/* Description */}
              {product.description && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-300 leading-relaxed">{product.description}</p>
                </div>
              )}

              {/* Color Selection */}
              {product.colors && product.colors.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Color: {selectedColor}</h3>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedColor(color)}
                        className={`w-10 h-10 rounded-full border-2 transition-all ${
                          selectedColor === color 
                            ? 'border-white ring-2 ring-purple-500/30 scale-110' 
                            : 'border-gray-600 hover:border-gray-400'
                        } ${
                          color === 'black' ? 'bg-black' :
                          color === 'white' ? 'bg-white' :
                          color === 'blue' ? 'bg-blue-500' :
                          color === 'brown' ? 'bg-amber-800' :
                          color === 'tan' ? 'bg-amber-200' :
                          color === 'navy' ? 'bg-blue-900' :
                          color === 'burgundy' ? 'bg-red-900' :
                          color === 'brass' ? 'bg-yellow-600' :
                          color === 'gray' ? 'bg-gray-500' :
                          color === 'silver' ? 'bg-gray-300' :
                          color === 'gold' ? 'bg-yellow-400' :
                          'bg-gray-400'
                        }`}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Size: {selectedSize}</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          selectedSize === size
                            ? 'bg-purple-600 text-white border border-purple-500'
                            : 'bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700 hover:text-white'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Stock Status */}
              <div className="bg-gray-800 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <span className={`font-medium ${
                    product.stock && product.stock > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {product.stock && product.stock > 0 ? '✓ In Stock' : '✕ Out of Stock'}
                  </span>
                  {product.stock && product.stock > 0 && (
                    <span className="text-gray-400 text-sm">{product.stock} available</span>
                  )}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              {product.stock && product.stock > 0 && (
                <div className="space-y-4">
                  {/* Quantity Selector */}
                  <div className="flex items-center space-x-4">
                    <span className="text-white font-medium">Quantity:</span>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onQuantityChange && onQuantityChange(Math.max(1, quantity - 1))}
                        disabled={quantity <= 1}
                        className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="w-12 text-center text-white font-medium text-lg">{quantity}</span>
                      <button
                        onClick={() => onQuantityChange && onQuantityChange(Math.min(product.stock, quantity + 1))}
                        disabled={quantity >= product.stock}
                        className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={handleAddToCart}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition-all transform hover:scale-[1.02] flex items-center justify-center space-x-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5L12 18m0 0l7.5-3M12 18v0" />
                      </svg>
                      <span>Add to Cart</span>
                    </button>
                    
                    <button className="px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                </div>
              )}

              {/* Additional Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-3 text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                  <span>Free shipping on orders over €50</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>30-day return policy</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  <span>Secure payment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPreviewModal;