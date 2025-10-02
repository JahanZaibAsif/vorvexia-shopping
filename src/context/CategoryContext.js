// context/CategoryContext.js
'use client';
import { createContext, useContext, useReducer, useCallback } from 'react';

const CategoryContext = createContext();

// Category reducer to handle state changes
const categoryReducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_CATEGORIES_START':
      return {
        ...state,
        loading: true,
        error: null,
      };

    case 'FETCH_CATEGORIES_SUCCESS':
      return {
        ...state,
        loading: false,
        categories: action.payload,
        error: null,
      };

    case 'FETCH_CATEGORY_PRODUCTS_START':
      return {
        ...state,
        productsLoading: true,
        productsError: null,
      };

    case 'FETCH_CATEGORY_PRODUCTS_SUCCESS':
      return {
        ...state,
        productsLoading: false,
        categoryProducts: action.payload.products,
        currentCategory: action.payload.category,
        productsError: null,
      };

    case 'FETCH_CATEGORY_PRODUCTS_ERROR':
      return {
        ...state,
        productsLoading: false,
        productsError: action.payload,
      };

    case 'FETCH_CATEGORIES_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case 'SET_CURRENT_CATEGORY':
      return {
        ...state,
        currentCategory: action.payload,
      };

    case 'SET_CATEGORY_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };

    case 'CLEAR_CURRENT_CATEGORY':
      return {
        ...state,
        currentCategory: null,
        categoryProducts: [],
      };

    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null,
        productsError: null,
      };

    case 'CLEAR_PRODUCTS_ERROR':
      return {
        ...state,
        productsError: null,
      };

    default:
      return state;
  }
};

// Initial category state
const initialState = {
  categories: [],
  categoryProducts: [],
  currentCategory: null,
  loading: false,
  productsLoading: false,
  error: null,
  productsError: null,
  filters: {
    priceRange: { min: 0, max: Infinity },
    sortBy: 'featured',
    inStock: false,
    brands: [],
  },
};

// API base URL - adjust this to match your backend
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export function CategoryProvider({ children }) {
  const [state, dispatch] = useReducer(categoryReducer, initialState);

  // Memoized API Functions to prevent infinite re-renders
  const fetchCategories = useCallback(async () => {
    dispatch({ type: 'FETCH_CATEGORIES_START' });
    
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      const data = await response.json();
      const categories = data.categories || data;
      
      dispatch({ type: 'FETCH_CATEGORIES_SUCCESS', payload: categories });
      
      return categories;
    } catch (error) {
      dispatch({ type: 'FETCH_CATEGORIES_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  const fetchProductsByCategory = useCallback(async (categoryId, filters = {}) => {
    dispatch({ type: 'FETCH_CATEGORY_PRODUCTS_START' });
    
    try {
      // Build query string from filters
      const queryParams = new URLSearchParams();
      
      if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.inStock) queryParams.append('inStock', 'true');
      if (filters.brands && filters.brands.length > 0) {
        filters.brands.forEach(brand => queryParams.append('brand', brand));
      }

      const queryString = queryParams.toString();
      const url = `${API_BASE_URL}/categories/${categoryId}/products${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch category products: ${response.statusText}`);
      }

      const data = await response.json();
      const products = data.products || data;
      
      // Find the category details
      const category = state.categories.find(cat => cat._id === categoryId) || 
                      { _id: categoryId, name: 'Category' };

      dispatch({ 
        type: 'FETCH_CATEGORY_PRODUCTS_SUCCESS', 
        payload: { 
          products, 
          category 
        } 
      });
      
      return products;
    } catch (error) {
      dispatch({ type: 'FETCH_CATEGORY_PRODUCTS_ERROR', payload: error.message });
      throw error;
    }
  }, [state.categories]);

  const fetchCategoryById = useCallback(async (categoryId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/categories/${categoryId}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch category: ${response.statusText}`);
      }

      const category = await response.json();
      return category;
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  }, []);

  const fetchAllCategoryProducts = useCallback(async (filters = {}) => {
    dispatch({ type: 'FETCH_CATEGORY_PRODUCTS_START' });
    
    try {
      // Build query string from filters
      const queryParams = new URLSearchParams();
      
      if (filters.sortBy) queryParams.append('sortBy', filters.sortBy);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);
      if (filters.inStock) queryParams.append('inStock', 'true');
      if (filters.brands && filters.brands.length > 0) {
        filters.brands.forEach(brand => queryParams.append('brand', brand));
      }

      const queryString = queryParams.toString();
      const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch all products: ${response.statusText}`);
      }

      const data = await response.json();
      const products = data.products || data;
      
      dispatch({ 
        type: 'FETCH_CATEGORY_PRODUCTS_SUCCESS', 
        payload: { 
          products, 
          category: { _id: 'all', name: 'All Products' } 
        } 
      });
      
      return products;
    } catch (error) {
      dispatch({ type: 'FETCH_CATEGORY_PRODUCTS_ERROR', payload: error.message });
      throw error;
    }
  }, []);

  // Memoized helper functions
  const setCurrentCategory = useCallback((category) => {
    dispatch({ type: 'SET_CURRENT_CATEGORY', payload: category });
  }, []);

  const clearCurrentCategory = useCallback(() => {
    dispatch({ type: 'CLEAR_CURRENT_CATEGORY' });
  }, []);

  const setCategoryFilters = useCallback((filters) => {
    dispatch({ type: 'SET_CATEGORY_FILTERS', payload: filters });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  const clearProductsError = useCallback(() => {
    dispatch({ type: 'CLEAR_PRODUCTS_ERROR' });
  }, []);

  // Computed values
  const filteredCategoryProducts = state.categoryProducts.filter(product => {
    const { priceRange, inStock, brands } = state.filters;
    
    // Price range filter
    const productPrice = product.salePrice || product.originalPrice || product.price;
    if (productPrice < priceRange.min || productPrice > priceRange.max) return false;
    
    // Stock filter
    if (inStock && (!product.stock || product.stock === 0)) return false;
    
    // Brand filter
    if (brands.length > 0 && product.brand && !brands.includes(product.brand)) return false;
    
    return true;
  });

  // Sort products based on current filter
  const sortedCategoryProducts = [...filteredCategoryProducts].sort((a, b) => {
    const priceA = a.salePrice || a.originalPrice || a.price || 0;
    const priceB = b.salePrice || b.originalPrice || b.price || 0;

    switch (state.filters.sortBy) {
      case 'price-low':
        return priceA - priceB;
      case 'price-high':
        return priceB - priceA;
      case 'newest':
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'name-asc':
        return a.name.localeCompare(b.name);
      case 'name-desc':
        return b.name.localeCompare(a.name);
      default: // featured
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    }
  });

  // Get unique brands from current category products
  const availableBrands = [...new Set(state.categoryProducts
    .map(p => p.brand)
    .filter(Boolean)
  )];

  // Get price range from current category products
  const productsPriceRange = state.categoryProducts.length > 0 ? {
    min: Math.min(...state.categoryProducts.map(p => p.salePrice || p.originalPrice || p.price)),
    max: Math.max(...state.categoryProducts.map(p => p.salePrice || p.originalPrice || p.price))
  } : { min: 0, max: 1000 };

  // Context value
  const value = {
    // State
    categories: state.categories,
    categoryProducts: state.categoryProducts,
    currentCategory: state.currentCategory,
    loading: state.loading,
    productsLoading: state.productsLoading,
    error: state.error,
    productsError: state.productsError,
    filters: state.filters,
    
    // Computed values
    filteredCategoryProducts: sortedCategoryProducts,
    availableBrands,
    productsPriceRange,
    
    // Actions
    fetchCategories,
    fetchProductsByCategory,
    fetchCategoryById,
    fetchAllCategoryProducts,
    setCurrentCategory,
    clearCurrentCategory,
    setCategoryFilters,
    clearError,
    clearProductsError,
  };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};