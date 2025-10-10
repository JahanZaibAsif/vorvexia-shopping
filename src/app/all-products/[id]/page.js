// app/all-products/[id]/page.js
'use client';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../../components/Header';
import Footer from '../../../components/footer';
import { useCart } from '../../../context/CartContext';
import toast from 'react-hot-toast';
import { useProducts } from '../../../context/ProductContext';

// Loading Component
function ProductDetailLoading() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Breadcrumb Loading */}
      <div className="bg-gray-900/50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="h-4 w-20 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-4 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-4 w-32 bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Loading */}
          <div className="space-y-4">
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gray-800 animate-pulse"></div>
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-24 rounded-xl bg-gray-800 animate-pulse"></div>
              ))}
            </div>
          </div>

          {/* Content Loading */}
          <div className="space-y-6">
            <div className="h-8 w-48 bg-gray-800 rounded animate-pulse"></div>
            <div className="h-12 w-3/4 bg-gray-800 rounded animate-pulse"></div>
            <div className="h-6 w-32 bg-gray-800 rounded animate-pulse"></div>
            <div className="h-10 w-40 bg-gray-800 rounded animate-pulse"></div>
            <div className="h-32 bg-gray-800 rounded-xl animate-pulse"></div>
            <div className="h-20 bg-gray-800 rounded-xl animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Error Component
function ProductDetailError({ error, onRetry }) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 mx-auto mb-6 bg-red-500/20 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Product Not Found</h2>
          <p className="text-gray-400 mb-6">
            {error || "Sorry, we couldn't find the product you're looking for."}
          </p>
          <div className="flex space-x-4 justify-center">
            <button
              onClick={onRetry}
              className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Try Again
            </button>
            <a
              href="/products"
              className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Browse Products
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// Safe Image Component with proper alt text handling
function SafeImage({ src, alt = "Product image", ...props }) {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src);
    setHasError(false);
  }, [src]);

  const handleError = () => {
    setHasError(true);
    setImgSrc('/placeholder-image.jpg');
  };

  // Ensure alt is always a string and not empty
  const safeAlt = typeof alt === 'string' && alt.trim() ? alt : "Product image";

  return (
    <Image
      src={hasError ? '/placeholder-image.jpg' : imgSrc}
      alt={safeAlt}
      onError={handleError}
      {...props}
    />
  );
}

// Helper function to transform API data to frontend format
const transformProductData = (product) => {
  if (!product) return null;
  
  return {
    id: product._id,
    name: product.name,
    brand: product.brand,
    category: product.category,
    description: product.description,
    price: product.salePrice || product.price, // Use salePrice if available
    originalPrice: product.originalPrice,
    rating: product.rating || 4.5,
    reviews: product.reviews || 0,
    stock: product.stock,
    sku: product.sku,
    images: product.images || [],
    colors: Array.isArray(product.colors) 
      ? product.colors.map(color => ({
          name: color,
          value: getColorValue(color),
          label: color
        }))
      : [],
    sizes: Array.isArray(product.sizes) ? product.sizes : [],
    features: product.features || getDefaultFeatures(product),
    specifications: product.specifications || getDefaultSpecifications(product),
    inStock: (product.stock || 0) > 0,
    badge: getProductBadge(product),
    weight: product.weight,
    dimensions: product.dimensions,
    tags: product.tags || [],
    status: product.status,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt
  };
};

// Helper function to generate color values
const getColorValue = (colorName) => {
  const colorMap = {
    'black': '#000000',
    'white': '#ffffff',
    'red': '#ff0000',
    'blue': '#0000ff',
    'green': '#00ff00',
    'yellow': '#ffff00',
    'purple': '#800080',
    'pink': '#ffc0cb',
    'orange': '#ffa500',
    'gray': '#808080',
    'brown': '#a52a2a',
    'navy': '#000080',
    'teal': '#008080',
    'maroon': '#800000',
    'olive': '#808000',
    'silver': '#c0c0c0',
    'gold': '#ffd700',
  };
  
  // Return mapped color or generate a random color for unknown colors
  const lowerColor = colorName.toLowerCase();
  return colorMap[lowerColor] || `#${Math.floor(Math.random()*16777215).toString(16)}`;
};

// Helper function to determine product badge
const getProductBadge = (product) => {
  if (product.salePrice && product.originalPrice > product.salePrice) {
    return 'Sale';
  }
  if (product.featured) {
    return 'Featured';
  }
  if (product.stock < 10) {
    return 'Low Stock';
  }
  return 'New';
};

// Default features if none provided
const getDefaultFeatures = (product) => {
  return [
    "High quality materials",
    "Premium craftsmanship",
    "Excellent durability",
    "Great value for money"
  ];
};

// Default specifications if none provided
const getDefaultSpecifications = (product) => {
  return {
    "Material": "Premium quality",
    "Dimensions": product.dimensions || "Standard size",
    "Weight": product.weight ? `${product.weight} units` : "Lightweight",
    "Warranty": "1 year manufacturer warranty"
  };
};

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [transformedProduct, setTransformedProduct] = useState(null);

  const { addToCart, toggleCart } = useCart();
  const { 
    loading, 
    error, 
    currentProduct: productDetail,
    relatedProducts,
    recentlyViewed,
    fetchProductById, 
    fetchRelatedProducts,
    fetchRecentlyViewed,
    clearError 
  } = useProducts();

  useEffect(() => {
    const fetchData = async () => {
      try {
        clearError();
        console.log('🔄 Fetching product with ID:', id);
        
        // Fetch main product
        const productData = await fetchProductById(id);
        console.log('📦 Raw product data from API:', productData);
        
        if (productData) {
          // Transform the API data to match frontend structure
          const transformed = transformProductData(productData.product);
          setTransformedProduct(transformed);
          
          // Set default selections
          if (transformed.colors?.length > 0) {
            setSelectedColor(transformed.colors[0].name);
          }
          if (transformed.sizes?.length > 0) {
            setSelectedSize(transformed.sizes[0]);
          }
          
          // Fetch related products
          if (transformed.category) {
            await fetchRelatedProducts(id, transformed.category, 4);
          }
          
          await fetchRecentlyViewed(id);
        }
        
      } catch (err) {
        console.error('❌ Error fetching product:', err);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, fetchProductById, fetchRelatedProducts, fetchRecentlyViewed, clearError]);

  // Debug effect to monitor data changes
  useEffect(() => {
    if (transformedProduct) {

    }
  }, [transformedProduct]);

  // Show loading state
  if (loading && !transformedProduct) {
    return <ProductDetailLoading />;
  }

  // Show error state
  if (error || !transformedProduct) {
    return (
      <ProductDetailError 
        error={error} 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  // Safe image URL function
  const getImageUrl = (image) => {
    if (!image) {
      return '/placeholder-image.jpg';
    }
    if (typeof image === 'string') {
      return image;
    }
    if (image.url) {
      console.log('🖼️ Image URL found:', image.url);
      return image.url;
    }
    console.log('🖼️ Invalid image format, using placeholder');
    return '/placeholder-image.jpg';
  };

  // Safe alt text function
  const getAltText = (product, index = null) => {
    const baseAlt = product?.name || 'Product';
    if (index !== null) {
      return `${baseAlt} - View ${index + 1}`;
    }
    return baseAlt;
  };

  const handleAddToCart = () => {
    console.log('🛒 Adding to cart:', transformedProduct);
    
    const colorObj = transformedProduct.colors?.find(c => c.name === selectedColor);
    
    const cartItem = {
      id: transformedProduct.id,
      name: transformedProduct.name,
      price: transformedProduct.price,
      image: getImageUrl(transformedProduct.images?.[0]),
      brand: transformedProduct.brand,
      color: selectedColor,
      colorLabel: colorObj?.label || selectedColor,
      colorValue: colorObj?.value || selectedColor,
      size: selectedSize,
      quantity: quantity,
      cartId: Date.now() + transformedProduct.id
    };

    console.log('🛒 Cart item prepared:', cartItem);
    
    addToCart(cartItem);
    toggleCart();
    
    toast.success('Added to cart!', {
      position: 'bottom-right',
      style: {
        background: '#10B981',
        color: '#fff',
      },
    });
  };

  // Render product specifications tab content
  const renderSpecifications = () => {
    const specs = transformedProduct.specifications || {};
    return (
      <div className="grid md:grid-cols-2 gap-8">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="flex justify-between py-3 border-b border-gray-800">
            <span className="font-medium text-gray-300">{key}</span>
            <span className="text-white">{value}</span>
          </div>
        ))}
      </div>
    );
  };

  // Render description tab content
  const renderDescription = () => {
    return (
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300 leading-relaxed text-lg mb-6">
          {transformedProduct.description || "No description available."}
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Product Details</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Brand: {transformedProduct.brand}</li>
              <li>• Category: {transformedProduct.category}</li>
              <li>• SKU: {transformedProduct.sku}</li>
              {transformedProduct.weight && <li>• Weight: {transformedProduct.weight} units</li>}
              {transformedProduct.dimensions && <li>• Dimensions: {transformedProduct.dimensions}</li>}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">Additional Information</h3>
            <ul className="space-y-2 text-gray-300">
              <li>• Premium Quality</li>
              <li>• Secure Packaging</li>
              <li>• Fast Delivery</li>
              <li>• Customer Support</li>
            </ul>
          </div>
        </div>
      </div>
    );
  };

  console.log('🎨 Rendering with transformed product:', transformedProduct);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      {/* Breadcrumb */}
      <div className="bg-gray-900/50 border-b border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-gray-400 hover:text-white transition-colors">Home</a>
            <span className="text-gray-600">/</span>
            <a href="/products" className="text-gray-400 hover:text-white transition-colors">Products</a>
            <span className="text-gray-600">/</span>
            <a href={`/category/${transformedProduct.category?.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">
              {transformedProduct.category || 'Uncategorized'}
            </a>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">{transformedProduct.name}</span>
          </nav>
        </div>
      </div>

      {/* Product Detail Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden bg-gray-900">
              <SafeImage
                src={getImageUrl(transformedProduct.images?.[selectedImage])}
                alt={getAltText(transformedProduct)}
                fill
                className="object-cover"
                priority
              />
              {/* Product Badge */}
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  transformedProduct.badge === 'Sale' ? 'bg-red-500' :
                  transformedProduct.badge === 'Featured' ? 'bg-blue-500' :
                  transformedProduct.badge === 'Low Stock' ? 'bg-orange-500' : 'bg-green-500'
                } text-white`}>
                  {transformedProduct.badge}
                </span>
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {transformedProduct.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-purple-500 shadow-lg shadow-purple-500/25' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <SafeImage
                    src={getImageUrl(image)}
                    alt={getAltText(transformedProduct, index)}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="space-y-6">
            {/* Brand and Title */}
            <div>
              <p className="text-purple-300 font-medium mb-2">{transformedProduct.brand}</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{transformedProduct.name}</h1>
              
              {/* Rating and Reviews */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-5 h-5 ${i < Math.floor(transformedProduct.rating) ? 'text-yellow-400' : 'text-gray-600'}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-white font-medium">{transformedProduct.rating}</span>
                  <span className="text-gray-400">({transformedProduct.reviews} reviews)</span>
                </div>
                <div className="text-gray-400">|</div>
                <p className="text-gray-400">SKU: {transformedProduct.sku}</p>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-white">€{transformedProduct.price}</span>
              {transformedProduct.originalPrice && transformedProduct.originalPrice > transformedProduct.price && (
                <>
                  <span className="text-xl text-gray-500 line-through">€{transformedProduct.originalPrice}</span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Save €{(transformedProduct.originalPrice - transformedProduct.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${transformedProduct.stock > 0 ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className={`font-medium ${transformedProduct.stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
                {transformedProduct.stock > 0 ? `In Stock (${transformedProduct.stock} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Color Selection */}
            {transformedProduct.colors && transformedProduct.colors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Color: <span className="text-purple-300">{transformedProduct.colors.find(c => c.name === selectedColor)?.label}</span>
                </h3>
                <div className="flex space-x-3">
                  {transformedProduct.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-12 h-12 rounded-xl border-2 transition-all ${
                        selectedColor === color.name 
                          ? 'border-purple-500 shadow-lg shadow-purple-500/25' 
                          : 'border-gray-600 hover:border-gray-500'
                      }`}
                      style={{ backgroundColor: color.value }}
                      title={color.label}
                    >
                      {color.name === 'white' && (
                        <div className="w-full h-full rounded-lg border border-gray-300"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {transformedProduct.sizes && transformedProduct.sizes.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">
                  Size: <span className="text-purple-300">{selectedSize}</span>
                </h3>
                <div className="flex space-x-3">
                  {transformedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-12 h-12 rounded-xl border-2 font-medium transition-all ${
                        selectedSize === size 
                          ? 'border-purple-500 bg-purple-500 text-white' 
                          : 'border-gray-600 text-gray-300 hover:border-gray-500 hover:text-white'
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
              <h3 className="text-lg font-semibold text-white mb-3">Quantity</h3>
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-800 rounded-xl">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <span className="px-4 py-3 text-white font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(transformedProduct.stock, quantity + 1))}
                    className="p-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                <span className="text-gray-400">({transformedProduct.stock} available)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                disabled={!transformedProduct.stock || transformedProduct.stock === 0}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>{transformedProduct.stock > 0 ? 'Add to Cart' : 'Out of Stock'}</span>
              </button>
              <button 
                className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors"
                disabled={!transformedProduct.stock || transformedProduct.stock === 0}
              >
                Buy Now
              </button>
            </div>

            {/* Features */}
            {transformedProduct.features && transformedProduct.features.length > 0 && (
              <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800">
                <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
                <ul className="space-y-2">
                  {transformedProduct.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3 text-gray-300">
                      <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Trust Badges */}
            <div className="flex items-center justify-between bg-gray-900/50 backdrop-blur-md rounded-2xl p-4 border border-gray-800">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-300">Secure Payment</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                <span className="text-sm text-gray-300">Free EU Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
                <span className="text-sm text-gray-300">30-Day Returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-800">
            <nav className="flex space-x-8">
              {['description', 'specifications', 'reviews', 'shipping'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab
                      ? 'border-purple-500 text-white'
                      : 'border-transparent text-gray-400 hover:text-gray-300'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === 'description' && renderDescription()}
            {activeTab === 'specifications' && renderSpecifications()}
            {activeTab === 'reviews' && (
              <div className="text-center py-8">
                <p className="text-gray-400">No reviews yet. Be the first to review this product!</p>
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Shipping Information</h3>
                  <p className="text-gray-300">Free standard shipping on orders over €50. Express delivery available.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white mb-4">Return Policy</h3>
                  <p className="text-gray-300">30-day money-back guarantee. Free returns within the EU.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">You Might Also Like</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const transformedRelated = transformProductData(relatedProduct);
                return (
                  <a key={transformedRelated.id} href={`/product/${transformedRelated.id}`} className="group">
                    <div className="relative h-64 mb-4 overflow-hidden rounded-2xl bg-gray-900">
                      <SafeImage
                        src={getImageUrl(transformedRelated.images?.[0])}
                        alt={getAltText(transformedRelated)}
                        fill
                        className="object-cover group-hover:scale-105 transition-all duration-300"
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {transformedRelated.name}
                    </h3>
                    <span className="text-xl font-bold text-white">€{transformedRelated.price}</span>
                  </a>
                );
              })}
            </div>
          </div>
        )}

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <div className="mt-16 bg-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Recently Viewed</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {recentlyViewed.map((product) => {
                const transformedRecent = transformProductData(product);
                return (
                  <a key={transformedRecent.id} href={`/product/${transformedRecent.id}`} className="group cursor-pointer">
                    <div className="relative h-32 mb-2 overflow-hidden rounded-xl bg-gray-800">
                      <SafeImage
                        src={getImageUrl(transformedRecent.images?.[0])}
                        alt={getAltText(transformedRecent)}
                        fill
                        className="object-cover group-hover:scale-110 transition-all duration-300"
                      />
                    </div>
                    <p className="text-sm text-gray-300 group-hover:text-white transition-colors truncate">
                      {transformedRecent.name}
                    </p>
                    <p className="text-sm font-semibold text-white">€{transformedRecent.price}</p>
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}