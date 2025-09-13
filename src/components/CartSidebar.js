// components/CartSidebar.js
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '../context/CartContext';
import { useEffect } from 'react';

export default function CartSidebar() {
  const { 
    items, 
    isOpen, 
    cartCount, 
    cartTotal, 
    removeFromCart, 
    updateQuantity, 
    closeCart, 
    clearCart 
  } = useCart();

  // Close cart on escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        closeCart();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, closeCart]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={closeCart}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-gray-900 border-l border-gray-800 z-50 transform transition-transform duration-300 ease-in-out">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-800">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
            <span className="bg-purple-500 text-white text-sm px-2 py-1 rounded-full">
              {cartCount}
            </span>
          </div>
          <button
            onClick={closeCart}
            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex-1 flex flex-col h-full">
          {items.length === 0 ? (
            /* Empty Cart */
            <div className="flex-1 flex items-center justify-center p-6">
              <div className="text-center">
                <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-12 h-12 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">Your cart is empty</h3>
                <p className="text-gray-400 mb-6">Add some products to get started</p>
                <button
                  onClick={closeCart}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map((item) => (
                  <div key={item.cartId} className="bg-gray-800/50 rounded-2xl p-4 border border-gray-700">
                    <div className="flex space-x-4">
                      {/* Product Image */}
                      <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-700 flex-shrink-0">
                        <Image
                          src={item.image || '/placeholder.jpg'}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-sm mb-1 truncate">
                          {item.name}
                        </h3>
                        <p className="text-gray-400 text-xs mb-2">{item.brand}</p>
                        
                        {/* Color and Size */}
                        <div className="flex items-center space-x-4 mb-2">
                          {item.color && (
                            <div className="flex items-center space-x-1">
                              <div 
                                className="w-3 h-3 rounded-full border border-gray-600"
                                style={{ backgroundColor: item.colorValue || item.color }}
                              />
                              <span className="text-gray-400 text-xs">{item.colorLabel || item.color}</span>
                            </div>
                          )}
                          {item.size && (
                            <span className="text-gray-400 text-xs">Size: {item.size}</span>
                          )}
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between">
                          <span className="text-white font-semibold">
                            €{(item.price * item.quantity).toFixed(2)}
                          </span>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                              </svg>
                            </button>
                            <span className="text-white font-medium text-sm w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                              className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-gray-300 hover:text-white transition-colors"
                            >
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.cartId)}
                          className="mt-2 text-red-400 hover:text-red-300 text-xs flex items-center space-x-1 transition-colors"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Clear Cart Button */}
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="w-full text-red-400 hover:text-red-300 text-sm py-2 transition-colors"
                  >
                    Clear All Items
                  </button>
                )}
              </div>

              {/* Cart Footer */}
              <div className="border-t border-gray-800 p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Subtotal:</span>
                  <span className="text-xl font-bold text-white">€{cartTotal.toFixed(2)}</span>
                </div>

                {/* Shipping Notice */}
                <div className="text-sm text-gray-400 text-center">
                  {cartTotal >= 50 ? (
                    <span className="text-green-400">🎉 Free shipping included!</span>
                  ) : (
                    <span>Add €{(50 - cartTotal).toFixed(2)} more for free shipping</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <Link 
                    href="/cart"
                    onClick={closeCart}
                    className="w-full bg-gray-800 hover:bg-gray-700 text-white py-3 rounded-xl font-semibold transition-colors text-center block"
                  >
                    View Cart
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 rounded-xl font-semibold transition-all transform hover:scale-105 text-center block"
                  >
                    Checkout
                  </Link>
                </div>

                {/* Trust Badges */}
                <div className="flex items-center justify-center space-x-4 pt-4 border-t border-gray-800">
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <svg className="w-3 h-3 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                    <span>Secure</span>
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-400">
                    <svg className="w-3 h-3 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                    </svg>
                    <span>Free Returns</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}