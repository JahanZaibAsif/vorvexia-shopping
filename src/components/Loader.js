// components/Loader.js
'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function Loader({ isLoading = true, onComplete }) {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Loading');

  useEffect(() => {
    if (!isLoading) return;

    const texts = ['Loading', 'Loading.', 'Loading..', 'Loading...'];
    let textIndex = 0;

    // Animate loading text
    const textInterval = setInterval(() => {
      setLoadingText(texts[textIndex]);
      textIndex = (textIndex + 1) % texts.length;
    }, 400);

    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setTimeout(() => {
            onComplete && onComplete();
          }, 500);
          return 100;
        }
        // Realistic loading simulation
        const increment = Math.random() * 15 + 5;
        return Math.min(prev + increment, 100);
      });
    }, 200);

    return () => {
      clearInterval(progressInterval);
      clearInterval(textInterval);
    };
  }, [isLoading, onComplete]);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-8">
        {/* Logo Section */}
        <div className="flex items-center space-x-4 mb-8">
          <div className="relative">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <span className="text-white font-bold text-2xl">MJ</span>
            </div>
            {/* Rotating Ring */}
            <div className="absolute inset-0 w-16 h-16 border-2 border-transparent border-t-purple-400 rounded-2xl animate-spin"></div>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              MJ Global
            </h1>
            <p className="text-gray-400 text-sm">Premium Shopping Experience</p>
          </div>
        </div>

        {/* Primary Loader Animation */}
        <div className="relative w-24 h-24 mb-8">
          {/* Outer Ring */}
          <div className="absolute inset-0 w-24 h-24 border-4 border-gray-800 rounded-full"></div>
          
          {/* Animated Ring */}
          <div 
            className="absolute inset-0 w-24 h-24 border-4 border-transparent border-t-purple-500 border-r-blue-500 rounded-full animate-spin"
            style={{ animationDuration: '1s' }}
          ></div>
          
          {/* Inner Ring */}
          <div 
            className="absolute inset-2 w-20 h-20 border-2 border-transparent border-b-pink-400 border-l-cyan-400 rounded-full animate-spin"
            style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}
          ></div>
          
          {/* Center Dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-3 h-3 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-80 max-w-sm mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-white font-medium text-lg">{loadingText}</span>
            <span className="text-purple-300 font-semibold">{Math.round(progress)}%</span>
          </div>
          
          <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full"></div>
            
            {/* Progress Fill */}
            <div 
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              {/* Progress Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full animate-pulse"></div>
            </div>
            
            {/* Moving Shine Effect */}
            <div 
              className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-pulse"
              style={{ 
                left: `${Math.max(0, progress - 10)}%`,
                transition: 'left 0.3s ease-out'
              }}
            ></div>
          </div>
        </div>

        {/* Loading Steps */}
        <div className="flex flex-col space-y-2 text-center">
          <div className="flex items-center justify-center space-x-2">
            {progress > 20 && (
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            <span className={`text-sm transition-colors ${progress > 20 ? 'text-green-400' : 'text-gray-400'}`}>
              Initializing Application
            </span>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            {progress > 50 && (
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            <span className={`text-sm transition-colors ${progress > 50 ? 'text-green-400' : 'text-gray-400'}`}>
              Loading Products
            </span>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            {progress > 80 && (
              <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            <span className={`text-sm transition-colors ${progress > 80 ? 'text-green-400' : 'text-gray-400'}`}>
              Preparing Experience
            </span>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <p className="text-gray-500 text-sm">
            Crafted with care in Europe
          </p>
        </div>
      </div>

      {/* Exit Animation */}
      {progress === 100 && (
        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/20 to-transparent animate-fadeIn"></div>
      )}
    </div>
  );
}

