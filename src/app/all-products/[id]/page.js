// app/product/[id]/page.js
'use client';
import Image from 'next/image';
import { useState } from 'react';
import Header from '../../../components/Header';
import Footer from '../../../components/footer';
import { useCart } from '../../../context/CartContext';
import toast from 'react-hot-toast';



export default function ProductDetail({ params }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('black');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isWishlisted, setIsWishlisted] = useState(false);

    const { addToCart, toggleCart } = useCart();


  // Mock product data - in real app, this would come from API based on params.id
  const product = {
    id: 1,
    name: "Premium Wireless Headphones",
    price: 149.99,
    originalPrice: 199.99,
    brand: "TechPro",
    rating: 4.8,
    reviews: 245,
    badge: "Best Seller",
    inStock: true,
    stockCount: 24,
    sku: "TP-WH-001",
    category: "Electronics",
    images: [
      "/product-headphones.jpg",
      "/product-headphones.jpg",
      "/product-headphones.jpg",
      "/product-headphones.jpg"
    ],
    colors: [
      { name: 'black', value: '#000000', label: 'Midnight Black' },
      { name: 'white', value: '#ffffff', label: 'Pearl White' },
      { name: 'blue', value: '#3b82f6', label: 'Ocean Blue' }
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    features: [
      "Active Noise Cancellation",
      "30-hour battery life",
      "Premium leather comfort",
      "Hi-Res audio certified",
      "Quick charge: 3 hours in 15 minutes"
    ],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      "Impedance": "32Ω",
      "Sensitivity": "100dB",
      "Weight": "250g",
      "Connectivity": "Bluetooth 5.0, 3.5mm jack",
      "Battery": "30 hours playback",
      "Charging": "USB-C fast charging"
    },
    description: "Experience audio like never before with our Premium Wireless Headphones. Featuring industry-leading noise cancellation technology and premium materials, these headphones deliver exceptional sound quality and all-day comfort. Perfect for music lovers, professionals, and anyone who demands the best in audio technology."
  };

  const relatedProducts = [
    { id: 2, name: "Smart Watch Pro", price: 299.99, image: "/home2.jpg", rating: 4.9 },
    { id: 3, name: "Wireless Speaker", price: 89.99, image: "/product-speaker.jpg", rating: 4.7 },
    { id: 4, name: "USB-C Cable", price: 29.99, image: "/electronic1.jpg", rating: 4.5 },
    { id: 5, name: "Phone Stand", price: 19.99, image: "/product-backpack.jpg", rating: 4.6 }
  ];


  
  const handleAddToCart = () => {
    // Get the selected color object
    const colorObj = product.colors.find(c => c.name === selectedColor);
    
   const cartItem = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.images[0],
    brand: product.brand,
    color: selectedColor,
    colorLabel: colorObj?.label || selectedColor,
    colorValue: colorObj?.value || selectedColor,
    size: selectedSize,
    quantity: quantity,
    cartId: Date.now() + product.id
  };

  addToCart(cartItem);
  toggleCart();
  
  // Show success toast
  toast.success('Added to cart!', {
    position: 'bottom-right',
    style: {
      background: '#10B981',
      color: '#fff',
    },
  });
    // Optional: Show success message or feedback
    console.log('Added to cart:', cartItem);
  };

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
            <a href={`/category/${product.category.toLowerCase()}`} className="text-gray-400 hover:text-white transition-colors">{product.category}</a>
            <span className="text-gray-600">/</span>
            <span className="text-white font-medium">{product.name}</span>
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
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4">
                <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                  product.badge === 'Best Seller' ? 'bg-blue-500' :
                  product.badge === 'New' ? 'bg-green-500' :
                  product.badge === 'Sale' ? 'bg-red-500' :
                  'bg-purple-500'
                } text-white`}>
                  {product.badge}
                </span>
              </div>
              
              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="absolute top-4 right-4 p-3 bg-white/90 hover:bg-white rounded-full transition-all transform hover:scale-110"
              >
                <svg className={`h-5 w-5 ${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-800'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </button>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === index 
                      ? 'border-purple-500 shadow-lg shadow-purple-500/25' 
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
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
              <p className="text-purple-300 font-medium mb-2">{product.brand}</p>
              <h1 className="text-3xl lg:text-4xl font-bold text-white mb-4">{product.name}</h1>
              
              {/* Rating and Reviews */}
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
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
                  <span className="text-white font-medium">{product.rating}</span>
                  <span className="text-gray-400">({product.reviews} reviews)</span>
                </div>
                <div className="text-gray-400">|</div>
                <p className="text-gray-400">SKU: {product.sku}</p>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-white">€{product.price}</span>
              {product.originalPrice && (
                <>
                  <span className="text-xl text-gray-500 line-through">€{product.originalPrice}</span>
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Save €{(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-400' : 'bg-red-400'}`}></div>
              <span className={`font-medium ${product.inStock ? 'text-green-400' : 'text-red-400'}`}>
                {product.inStock ? `In Stock (${product.stockCount} available)` : 'Out of Stock'}
              </span>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Color: <span className="text-purple-300">{product.colors.find(c => c.name === selectedColor)?.label}</span>
              </h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
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

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">
                Size: <span className="text-purple-300">{selectedSize}</span>
              </h3>
              <div className="flex space-x-3">
                {product.sizes.map((size) => (
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
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    className="p-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                <span className="text-gray-400">({product.stockCount} available)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span>Add to Cart</span>
              </button>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-xl font-semibold transition-colors">
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-4">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-3 text-gray-300">
                    <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

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
            {activeTab === 'description' && (
              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  {product.description}
                </p>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">What's in the Box</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• Premium Wireless Headphones</li>
                      <li>• USB-C Charging Cable</li>
                      <li>• 3.5mm Audio Cable</li>
                      <li>• Travel Case</li>
                      <li>• Quick Start Guide</li>
                      <li>• Warranty Card</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-4">Compatibility</h3>
                    <ul className="space-y-2 text-gray-300">
                      <li>• iOS devices (iPhone, iPad)</li>
                      <li>• Android smartphones and tablets</li>
                      <li>• Windows PC and Mac</li>
                      <li>• Gaming consoles</li>
                      <li>• Smart TVs with Bluetooth</li>
                      <li>• Any device with 3.5mm jack</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid md:grid-cols-2 gap-8">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-gray-800">
                    <span className="font-medium text-gray-300">{key}</span>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-2xl font-semibold text-white">Customer Reviews</h3>
                  <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-xl font-medium transition-colors">
                    Write a Review
                  </button>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="bg-gray-900/50 backdrop-blur-md rounded-2xl p-6 border border-gray-800">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-white mb-2">{product.rating}</div>
                      <div className="flex justify-center mb-2">
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
                      <p className="text-gray-400">Based on {product.reviews} reviews</p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-2 space-y-6">
                    {/* Sample Reviews */}
                    {[
                      {
                        name: "Sarah M.",
                        rating: 5,
                        date: "2 days ago",
                        title: "Exceptional sound quality!",
                        comment: "These headphones exceeded my expectations. The noise cancellation is incredible and the battery life is amazing. Perfect for my daily commute."
                      },
                      {
                        name: "Mike R.",
                        rating: 4,
                        date: "1 week ago", 
                        title: "Great value for money",
                        comment: "Really impressed with the build quality and comfort. Only minor complaint is they can get a bit warm during long sessions."
                      }
                    ].map((review, index) => (
                      <div key={index} className="bg-gray-900/30 rounded-xl p-6 border border-gray-800">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-white">{review.title}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <svg
                                    key={i}
                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-600'}`}
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                ))}
                              </div>
                              <span className="text-gray-400 text-sm">by {review.name}</span>
                              <span className="text-gray-500 text-sm">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-300">{review.comment}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">Shipping Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-green-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                      </svg>
                      <div>
                        <h4 className="font-semibold text-white">Free Standard Shipping</h4>
                        <p className="text-gray-300">Orders over €50 • 3-5 business days</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-blue-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                        <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1V5a1 1 0 00-1-1H3zM14 7a1 1 0 00-1 1v6.05A2.5 2.5 0 0115.95 16H17a1 1 0 001-1V8a1 1 0 00-1-1h-3z" />
                      </svg>
                      <div>
                        <h4 className="font-semibold text-white">Express Delivery</h4>
                        <p className="text-gray-300">€9.99 • Next business day</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-white">Return Policy</h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-purple-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-semibold text-white">30-Day Returns</h4>
                        <p className="text-gray-300">Free returns within 30 days of purchase</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <svg className="w-6 h-6 text-yellow-400 mt-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <div>
                        <h4 className="font-semibold text-white">Quality Guarantee</h4>
                        <p className="text-gray-300">1-year manufacturer warranty included</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-white">You Might Also Like</h2>
            <button className="text-purple-400 hover:text-purple-300 font-semibold flex items-center space-x-2 transition-colors group">
              <span>View all</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group">
                <div className="relative h-64 mb-4 overflow-hidden rounded-2xl bg-gray-900">
                  <Image
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-all duration-300"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all"></div>
                  
                  {/* Quick add button for related products */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all transform translate-y-4 group-hover:translate-y-0">
                    <button className="w-full bg-white text-black py-2 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
                      Quick View
                    </button>
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {relatedProduct.name}
                </h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-white">€{relatedProduct.price}</span>
                  <div className="flex items-center space-x-1">
                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-gray-400 text-sm">{relatedProduct.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recently Viewed */}
        <div className="mt-16 bg-gray-900/50 backdrop-blur-md rounded-2xl p-8 border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-6">Recently Viewed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative h-32 mb-2 overflow-hidden rounded-xl bg-gray-800">
                  <Image
                    src="/product-headphones.jpg"
                    alt="Recently viewed product"
                    fill
                    className="object-cover group-hover:scale-110 transition-all duration-300"
                  />
                </div>
                <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
                  Sample Product {index + 1}
                </p>
                <p className="text-sm font-semibold text-white">€{(99.99 + index * 10).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Add to Cart Bar (Mobile) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-black/95 backdrop-blur-md border-t border-gray-800 p-4 z-50">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-semibold">€{product.price}</p>
            <p className="text-gray-400 text-sm">{product.name}</p>
          </div>
          <button
            onClick={handleAddToCart}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-purple-900 to-blue-900 relative overflow-hidden mt-16">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated
            </h2>
            <p className="text-purple-100 text-lg mb-8">
              Get notified about new products, exclusive deals, and special offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="flex-grow px-6 py-3 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 text-white placeholder-gray-300 focus:outline-none focus:border-white/40 transition-all"
              />
              <button className="bg-white text-purple-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="absolute top-10 left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
      </section>

      <Footer />
    </div>
  );
}