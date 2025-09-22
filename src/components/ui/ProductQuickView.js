'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Heart, ShoppingCart, Star, Shield, Truck } from 'lucide-react';

const ProductQuickView = ({ product, isOpen, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // Sample product data structure if none provided or if product is incomplete
  const sampleProduct = {
    id: 1,
    name: "Premium Leather Jacket",
    price: "€189.99",
    originalPrice: "€219.99",
    description: "This premium leather jacket is crafted from the finest materials. It features a modern design with comfortable fit and exceptional durability.",
    images: [
      "/men1.jpg",
      "/men-fashion.jpg",
      "/leather-product.jpg",
      "/lady1.jpg"
    ],
    category: "Men's Fashion",
    rating: 4.8,
    reviewCount: 189,
    features: [
      "100% Genuine Leather",
      "Water Resistant",
      "Internal Pocket",
      "Available in 3 Colors"
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: ["Black", "Brown", "Navy"]
  };

  // Safely merge product data with sample data to ensure all required fields exist
  const productData = product ? {
    ...sampleProduct,
    ...product,
    // Ensure images array exists and has at least one item
    images: product.images && product.images.length > 0 ? product.images : sampleProduct.images,
    // Ensure other critical fields exist
    name: product.name || sampleProduct.name,
    price: product.price || sampleProduct.price,
  } : sampleProduct;

  // Reset selected image when product changes
  useEffect(() => {
    setSelectedImageIndex(0);
  }, [product]);

  // Handle keyboard events
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.keyCode === 27) onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const nextImage = () => {
    setSelectedImageIndex((prev) => 
      prev === productData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    setSelectedImageIndex((prev) => 
      prev === 0 ? productData.images.length - 1 : prev - 1
    );
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  // Get the current image source safely
  const currentImage = productData.images[selectedImageIndex] || productData.images[0] || "/placeholder-image.jpg";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="relative bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-800 rounded-full hover:bg-gray-700 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
          {/* Product Images */}
          <div className="relative">
            {/* Main image */}
            <div className="relative h-80 md:h-96 rounded-xl overflow-hidden bg-gray-800">
              <Image
                src={currentImage}
                alt={productData.name}
                fill
                className="object-cover"
                onError={(e) => {
                  e.target.src = "/placeholder-image.jpg";
                }}
              />
              
              {/* Navigation arrows - only show if multiple images */}
              {productData.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-black bg-opacity-50 rounded-full hover:bg-opacity-70 transition-all"
                  >
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </>
              )}

              {/* Image indicator - only show if multiple images */}
              {productData.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {productData.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === selectedImageIndex 
                          ? 'bg-white' 
                          : 'bg-white bg-opacity-50'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail gallery - only show if multiple images */}
            {productData.images.length > 1 && (
              <div className="flex mt-4 space-x-2 overflow-x-auto py-2">
                {productData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden ${
                      index === selectedImageIndex 
                        ? 'ring-2 ring-purple-500' 
                        : 'opacity-70 hover:opacity-100'
                    } transition-all`}
                  >
                    <Image
                      src={image || "/placeholder-image.jpg"}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      className="object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="py-4">
            <div className="mb-4">
              <span className="text-sm text-purple-400 font-medium">{productData.category}</span>
              <h2 className="text-2xl font-bold text-white mt-1">{productData.name}</h2>
              
              {/* Rating */}
              <div className="flex items-center mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(productData.rating || 0) ? 'fill-current' : ''}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400 ml-2">
                  {productData.rating || 0} ({productData.reviewCount || 0} reviews)
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-2xl font-bold text-white">{productData.price}</span>
                {productData.originalPrice && (
                  <span className="text-lg text-gray-500 line-through">{productData.originalPrice}</span>
                )}
                {productData.originalPrice && (
                  <span className="text-sm bg-red-500 text-white px-2 py-1 rounded-md">
                    Save {((parseFloat(productData.originalPrice.replace('€', '')) - parseFloat(productData.price.replace('€', ''))) / parseFloat(productData.originalPrice.replace('€', '')) * 100).toFixed(0)}%
                  </span>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-6">{productData.description}</p>

            {/* Features */}
            {productData.features && productData.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Features</h3>
                <ul className="space-y-1">
                  {productData.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-gray-300">
                      <span className="w-1.5 h-1.5 bg-purple-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Options */}
            <div className="space-y-4 mb-6">
              {/* Colors */}
              {productData.colors && productData.colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-white mb-2">Color</h3>
                  <div className="flex space-x-2">
                    {productData.colors.map((color, index) => (
                      <button
                        key={index}
                        className="w-8 h-8 rounded-full border-2 border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        style={{ 
                          backgroundColor: color.toLowerCase(),
                          borderColor: color.toLowerCase() === 'white' ? '#e5e7eb' : ''
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {productData.sizes && productData.sizes.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-white mb-2">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {productData.sizes.map((size, index) => (
                      <button
                        key={index}
                        className="px-4 py-2 text-sm border border-gray-700 rounded-md hover:border-purple-500 hover:text-purple-400 transition-colors text-gray-300"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div>
                <h3 className="text-sm font-medium text-white mb-2">Quantity</h3>
                <div className="flex items-center">
                  <button
                    onClick={decrementQuantity}
                    className="p-2 bg-gray-800 rounded-l-md hover:bg-gray-700 transition-colors text-white"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 bg-gray-800 text-white">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    className="p-2 bg-gray-800 rounded-r-md hover:bg-gray-700 transition-colors text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Trust badges */}
            <div className="flex items-center justify-around p-4 bg-gray-800 rounded-xl mb-6">
              <div className="text-center">
                <Truck className="w-6 h-6 text-blue-400 mx-auto mb-1" />
                <p className="text-xs text-gray-300">Free Shipping</p>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 text-green-400 mx-auto mb-1" />
                <p className="text-xs text-gray-300">2-Year Warranty</p>
              </div>
              <div className="text-center">
                <Star className="w-6 h-6 text-amber-400 mx-auto mb-1" />
                <p className="text-xs text-gray-300">Premium Quality</p>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex space-x-4">
              <button className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-medium transition-colors flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
              <button className="p-3 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-colors">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickView;