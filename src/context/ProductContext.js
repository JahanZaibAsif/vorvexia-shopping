// context/ProductContext.js
'use client';
import { createContext, useContext, useReducer, useCallback } from 'react';

const ProductContext = createContext();

// Product reducer to handle state changes
const productReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_PRODUCTS_START':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'FETCH_PRODUCTS_SUCCESS':
      return {
        ...state,
        loading: false,
        products: action.payload,
        error: null,
      };

    case 'FETCH_PRODUCT_SUCCESS':
      return {
        ...state,
        loading: false,
        currentProduct: action.payload,
        error: null,
      };

    case 'FETCH_PRODUCTS_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'SET_CURRENT_PRODUCT':
      return {
        ...state,
        currentProduct: action.payload,
      };

    case 'SET_RELATED_PRODUCTS':
      return {
        ...state,
        relatedProducts: action.payload,
      };

    case 'SET_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case 'CLEAR_CURRENT_PRODUCT':
      return {
        ...state,
        currentProduct: null,
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// Initial product state
const initialState = {
  products: [],
  currentProduct: null,
  relatedProducts: [],
  loading: false,
  error: null,
  filters: {
    category: '',
    priceRange: { min: 0, max: Infinity },
    searchTerm: '',
    brand: '',
    inStock: false,
  },
};

// API base URL - adjust this to match your backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export function ProductProvider({ children }) {
  const [state, dispatch] = useReducer(productReducer, initialState);

  // Memoized API Functions to prevent infinite re-renders
  const fetchProducts = useCallback(async (filters = {}) => {
    dispatch({ type: 'FETCH_PRODUCTS_START' });
    
    try {
      // Build query string from filters
      const queryParams = new URLSearchParams();
      
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.brand) queryParams.append('brand', filters.brand);
      if (filters.searchTerm) queryParams.append('search', filters.searchTerm);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.inStock) queryParams.append('inStock', 'true');

      const queryString = queryParams.toString();
      const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`;
      console.log("API_BASE_URL:", API_BASE_URL, "Final URL:", url);

      const response = await fetch("http://localhost:3001/api/products")
      console.log(response);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }

      const data = await response.json();
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: data.products || data });
      
      return data.products || data;
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  const fetchProductById = useCallback(async (id) => {
    dispatch({ type: 'FETCH_PRODUCTS_START' });
    
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch product: ${response.statusText}`);
      }

      const product = await response.json();
      dispatch({ type: 'FETCH_PRODUCT_SUCCESS', payload: product });
      
      return product;
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  const fetchRelatedProducts = useCallback(async (productId, category, limit = 4) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/products/related/${productId}?category=${category}&limit=${limit}`
      );
      
      if (!response.ok) {
        // Fallback: fetch products from same category
        const fallbackResponse = await fetch(
          `${API_BASE_URL}/products?category=${category}&limit=${limit}`
        );
        
        if (fallbackResponse.ok) {
          const fallbackData = await fallbackResponse.json();
          const relatedProducts = (fallbackData.products || fallbackData)
            .filter(product => product.id !== productId)
            .slice(0, limit);
          
          dispatch({ type: 'SET_RELATED_PRODUCTS', payload: relatedProducts });
          return relatedProducts;
        }
        
        throw new Error('Failed to fetch related products');
      }

      const relatedProducts = await response.json();
      dispatch({ type: 'SET_RELATED_PRODUCTS', payload: relatedProducts.products || relatedProducts });
      
      return relatedProducts.products || relatedProducts;
    } catch (error) {
      console.warn('Failed to fetch related products:', error.message);
      // Don't dispatch error for related products as it's not critical
      dispatch({ type: 'SET_RELATED_PRODUCTS', payload: [] });
      return [];
    }
  }, []);

  const fetchProductsByCategory = useCallback(async (category, limit) => {
    dispatch({ type: 'FETCH_PRODUCTS_START' });
    
    try {
      const response = await fetch(
        `${API_BASE_URL}/products?category=${category}${limit ? `&limit=${limit}` : ''}`
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch products by category: ${response.statusText}`);
      }

      const data = await response.json();
      const products = data.products || data;
      
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: products });
      return products;
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  const searchProducts = useCallback(async (searchTerm, filters = {}) => {
    dispatch({ type: 'FETCH_PRODUCTS_START' });
    
    try {
      const queryParams = new URLSearchParams({
        search: searchTerm,
        ...filters,
      });

      const response = await fetch(`${API_BASE_URL}/products/search?${queryParams.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to search products: ${response.statusText}`);
      }

      const data = await response.json();
      const products = data.products || data;
      
      dispatch({ type: 'FETCH_PRODUCTS_SUCCESS', payload: products });
      return products;
    } catch (error) {
      dispatch({ type: 'FETCH_PRODUCTS_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  // Memoized helper functions
  const setCurrentProduct = useCallback((product) => {
    dispatch({ type: 'SET_CURRENT_PRODUCT', payload: product });
  }, []);

  const clearCurrentProduct = useCallback(() => {
    dispatch({ type: 'CLEAR_CURRENT_PRODUCT' });
  }, []);

  const setFilters = useCallback((filters) => {
    dispatch({ type: 'SET_FILTERS', payload: filters });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  // Computed values
  const filteredProducts = state.products.filter(product => {
    const { category, priceRange, searchTerm, brand, inStock } = state.filters;
    
    // Category filter
    if (category && product.category !== category) return false;
    
    // Brand filter
    if (brand && product.brand !== brand) return false;
    
    // Price range filter
    if (product.price < priceRange.min || product.price > priceRange.max) return false;
    
    // Search term filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesName = product.name.toLowerCase().includes(searchLower);
      const matchesDescription = product.description?.toLowerCase().includes(searchLower);
      const matchesBrand = product.brand?.toLowerCase().includes(searchLower);
      
      if (!matchesName && !matchesDescription && !matchesBrand) return false;
    }
    
    // Stock filter
    if (inStock && !product.inStock) return false;
    
    return true;
  });

  // Get unique categories and brands from products
  const categories = [...new Set(state.products.map(p => p.category).filter(Boolean))];
  const brands = [...new Set(state.products.map(p => p.brand).filter(Boolean))];

  // Context value
  const value = {
    // State
    products: state.products,
    currentProduct: state.currentProduct,
    relatedProducts: state.relatedProducts,
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    
    // Computed values
    filteredProducts,
    categories,
    brands,
    
    // Actions
    fetchProducts,
    fetchProductById,
    fetchRelatedProducts,
    fetchProductsByCategory,
    searchProducts,
    setCurrentProduct,
    clearCurrentProduct,
    setFilters,
    clearError,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}

// Custom hook to use the product context
export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};