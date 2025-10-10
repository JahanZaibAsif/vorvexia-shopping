'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Heart, ShoppingCart, Star, Shield, Truck } from 'lucide-react';
import { useProducts } from '@/context/ProductContext';
import { useCart } from '@/context/CartContext';

const ProductQuickView = ({ productId, isOpen, onClose }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [imageError, setImageError] = useState({});
  const { addToCart } = useCart();
  const { 
    products,
    fetchProductById,
    loading,
    error, 
    clearError
  } = useProducts();

  const [productData, setProductData] = useState(null);

  useEffect(() => {
    if (productId && isOpen) {
      const fetchProductData = async () => {
        try {
          const response = await fetchProductById(productId);
          console.log('Fetched product:', response);
          if (response?.product) {
            setProductData(response.product);
          } else {
            const localProduct = products.find(p => p.id === productId || p._id === productId);
            setProductData(localProduct || null);
          }
        } catch (err) {
          console.error('Error fetching product:', err);
          const localProduct = products.find(p => p.id === productId || p._id === productId);
          setProductData(localProduct || null);
        }
      };

      fetchProductData();
    }
  }, [productId, isOpen, products, fetchProductById]);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedImageIndex(0);
      setQuantity(1);
      setSelectedSize('');
      setSelectedColor('');
      setProductData(null);
      setImageError({});
    }
  }, [isOpen]);

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

  // Helper function to extract image URL from various formats
  const getImageUrl = (imageData) => {
    if (!imageData) return '/placeholder-image.jpg';
    
    // If it's already a string URL
    if (typeof imageData === 'string') return imageData;
    
    // If it's an object with url property
    if (imageData.url) return imageData.url;
    
    return '/placeholder-image.jpg';
  };

  // Process images array to extract URLs
  const processImages = (images) => {
    if (!images || !Array.isArray(images) || images.length === 0) {
      return ['/placeholder-image.jpg'];
    }
    
    return images.map(img => getImageUrl(img)).filter(url => url && url !== '');
  };

  // Safe product data merge with proper image handling
  const mergedProductData = productData ? {
    ...productData,
    images: processImages(productData.images),
    name: productData.name || 'Product Name',
    price: productData.salePrice ? `$${productData.salePrice}` : productData.price || '$0.00',
    originalPrice: productData.originalPrice ? `$${productData.originalPrice}` : null,
    description: productData.description || 'No description available.',
    category: productData.category || 'Uncategorized',
    rating: productData.rating || 4.5,
    reviewCount: productData.reviewCount || 0,
    features: productData.features || [],
    sizes: productData.sizes || [],
    colors: productData.colors || [],
    stock: productData.stock || 0,
  } : null;

  // Safe image navigation functions
  const nextImage = () => {
    if (!mergedProductData?.images?.length) return;
    setSelectedImageIndex((prev) => 
      prev === mergedProductData.images.length - 1 ? 0 : prev + 1
    );
  };

  const prevImage = () => {
    if (!mergedProductData?.images?.length) return;
    setSelectedImageIndex((prev) => 
      prev === 0 ? mergedProductData.images.length - 1 : prev - 1
    );
  };

  const incrementQuantity = () => {
    const maxStock = mergedProductData?.stock || 999;
    setQuantity(prev => prev < maxStock ? prev + 1 : prev);
  };

  const decrementQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (!productData) return;
    
    addToCart({
      ...mergedProductData,
      quantity,
      selectedSize: selectedSize || mergedProductData.sizes?.[0],
      selectedColor: selectedColor || mergedProductData.colors?.[0]
    });
    
    onClose();
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleImageError = (index) => {
    setImageError(prev => ({ ...prev, [index]: true }));
  };

  if (!isOpen) return null;

  // Loading state
  if (loading || !mergedProductData) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80 backdrop-blur-sm">
        <div className="relative bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center h-96">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mb-4"></div>
              <div className="text-white text-lg">Loading product...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get the current image source safely
  const images = mergedProductData.images || ['/placeholder-image.jpg'];
  const currentImage = images[selectedImageIndex] || images[0] || "/placeholder-image.jpg";
  const hasMultipleImages = images.length > 1;

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
              {currentImage && currentImage !== "" && !imageError[selectedImageIndex] ? (
                <Image
                  src={currentImage}
                  alt={mergedProductData.name || "Product"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={selectedImageIndex === 0}
                  onError={() => handleImageError(selectedImageIndex)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-800">
                  <div className="text-center text-gray-400">
                    <ShoppingCart className="w-16 h-16 mx-auto mb-2 opacity-50" />
                    <p>No image available</p>
                  </div>
                </div>
              )}
              
              {/* Navigation arrows - only show if multiple images */}
              {hasMultipleImages && (
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
              {hasMultipleImages && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === selectedImageIndex 
                          ? 'bg-white w-6' 
                          : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Thumbnail gallery - only show if multiple images */}
            {hasMultipleImages && (
              <div className="flex mt-4 space-x-2 overflow-x-auto py-2">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative h-16 w-16 flex-shrink-0 rounded-md overflow-hidden bg-gray-800 ${
                      index === selectedImageIndex 
                        ? 'ring-2 ring-purple-500' 
                        : 'opacity-70 hover:opacity-100'
                    } transition-all`}
                  >
                    {image && !imageError[`thumb-${index}`] ? (
                      <Image
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                        onError={() => handleImageError(`thumb-${index}`)}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <ShoppingCart className="w-6 h-6 text-gray-600" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="py-4">
            <div className="mb-4">
              <span className="text-sm text-purple-400 font-medium uppercase">{mergedProductData.category}</span>
              <h2 className="text-2xl font-bold text-white mt-1">{mergedProductData.name}</h2>
              
              {/* Rating */}
              <div className="flex items-center mt-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(mergedProductData.rating) ? 'fill-current' : ''}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-400 ml-2">
                  {mergedProductData.rating} ({mergedProductData.reviewCount} reviews)
                </span>
              </div>

              {/* Stock status */}
              {mergedProductData.stock > 0 ? (
                <span className="inline-block mt-2 text-sm text-green-400">
                  ✓ In Stock ({mergedProductData.stock} available)
                </span>
              ) : (
                <span className="inline-block mt-2 text-sm text-red-400">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center space-x-2">
                <span className="text-3xl font-bold text-white">{mergedProductData.price}</span>
                {mergedProductData.originalPrice && mergedProductData.originalPrice !== mergedProductData.price && (
                  <>
                    <span className="text-lg text-gray-500 line-through">{mergedProductData.originalPrice}</span>
                    <span className="text-sm bg-red-500 text-white px-2 py-1 rounded">
                      {Math.round((1 - (parseFloat(mergedProductData.price.replace('$', '')) / parseFloat(mergedProductData.originalPrice.replace('$', '')))) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-300 mb-6 leading-relaxed">{mergedProductData.description}</p>

            {/* Features */}
            {mergedProductData.features.length > 0 && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-2">Features</h3>
                <ul className="space-y-1">
                  {mergedProductData.features.map((feature, index) => (
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
              {mergedProductData.colors.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-white mb-2">
                    Color {selectedColor && <span className="text-purple-400">- {selectedColor}</span>}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {mergedProductData.colors.map((color, index) => (
                      <button
                        key={index}
                        onClick={() => handleColorSelect(color)}
                        className={`px-3 py-1.5 text-sm border rounded-md transition-colors ${
                          selectedColor === color
                            ? 'border-purple-500 text-purple-400 bg-purple-900 bg-opacity-20'
                            : 'border-gray-700 text-gray-300 hover:border-purple-500 hover:text-purple-400'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              {mergedProductData.sizes.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-white mb-2">
                    Size {selectedSize && <span className="text-purple-400">- {selectedSize}</span>}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {mergedProductData.sizes.map((size, index) => (
                      <button
                        key={index}
                        onClick={() => handleSizeSelect(size)}
                        className={`px-4 py-2 text-sm border rounded-md transition-colors ${
                          selectedSize === size
                            ? 'border-purple-500 text-purple-400 bg-purple-900 bg-opacity-20'
                            : 'border-gray-700 text-gray-300 hover:border-purple-500 hover:text-purple-400'
                        }`}
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
                    disabled={quantity <= 1}
                    className="p-2 bg-gray-800 rounded-l-md hover:bg-gray-700 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    -
                  </button>
                  <span className="px-6 py-2 bg-gray-800 text-white min-w-[60px] text-center">{quantity}</span>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= mergedProductData.stock}
                    className="p-2 bg-gray-800 rounded-r-md hover:bg-gray-700 transition-colors text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
              <button 
                onClick={handleAddToCart}
                disabled={mergedProductData.stock === 0}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-medium transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                {mergedProductData.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
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