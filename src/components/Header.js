// components/Header.js
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { cartCount, toggleCart } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/logo.jpg"
                alt="MJ Global Logo"
                width={58}
                height={58}
                className="object-cover"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              MJ Global
            </span>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-300 hover:text-white font-medium transition-colors relative group">
              Home
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/all-products" className="text-gray-300 hover:text-white font-medium transition-colors relative group">
              All Products
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/new" className="text-gray-300 hover:text-white font-medium transition-colors relative group">
              New
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/women" className="text-gray-300 hover:text-white font-medium transition-colors relative group">
              Women
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/men" className="text-gray-300 hover:text-white font-medium transition-colors relative group">
              Men
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/electronics" className="text-gray-300 hover:text-white font-medium transition-colors relative group">
              Electronics
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/home" className="text-gray-300 hover:text-white font-medium transition-colors relative group">
              Home & Living
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-blue-500 transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <button className="p-3 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            {/* Cart */}
            <button 
              onClick={toggleCart}
              className="p-3 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors group relative"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-purple-500 text-xs rounded-full h-5 w-5 flex items-center justify-center text-white animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* User Account */}
            <button className="p-3 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors group">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300 group-hover:text-white transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 rounded-full bg-gray-900 hover:bg-gray-800 transition-colors"
            >
              <svg className="h-5 w-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 py-4 border-t border-gray-800">
            <nav className="flex flex-col space-y-4">
              <Link href="/aproducts" className="text-gray-300 hover:text-white font-medium transition-colors px-2">
                All Products
              </Link>
              <Link href="/new" className="text-gray-300 hover:text-white font-medium transition-colors px-2">
                New
              </Link>
              <Link href="/women" className="text-gray-300 hover:text-white font-medium transition-colors px-2">
                Women
              </Link>
              <Link href="/men" className="text-gray-300 hover:text-white font-medium transition-colors px-2">
                Men
              </Link>
              <Link href="/electronics" className="text-gray-300 hover:text-white font-medium transition-colors px-2">
                Electronics
              </Link>
              <Link href="/home" className="text-gray-300 hover:text-white font-medium transition-colors px-2">
                Home & Living
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}