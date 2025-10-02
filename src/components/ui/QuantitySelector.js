// Quantity selector component

"use client"
import React, { useState, useEffect } from 'react'

const QuantitySelector = ({ quantity, onQuantityChange, stock }) => {
  const decreaseQuantity = () => {
    if (quantity > 1) {
      onQuantityChange(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < stock) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
   <div className="flex items-center space-x-2">
  <button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      decreaseQuantity();
    }}
    disabled={quantity <= 1}
    className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
  >
    -
  </button>

  <span className="w-8 text-center text-black font-medium">{quantity}</span>

  <button
    onClick={(e) => {
      e.preventDefault();
      e.stopPropagation();
      increaseQuantity();
    }}
    disabled={quantity >= stock}
    className="w-8 h-8 rounded-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-white transition-colors"
  >
    +
  </button>
</div>

  );
};

export default QuantitySelector