import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { Header } from './components/Header';
import { ProductGrid } from './components/ProductGrid';
import { Cart } from './components/Cart';
import { ProductModal } from './components/ProductModal';
import { AuthModal } from './components/AuthModal';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { CompareModal } from './components/CompareModal';
import { AdminPanel } from './components/AdminPanel';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { FilterPanel } from './components/FilterPanel';
import { DiscountSystem } from './components/DiscountSystem';
import { TrackingModal } from './components/TrackingModal';
import { CustomServicesModal } from './components/CustomServicesModal';
import { products as initialProducts } from './data/products';
import type { Product, CartItem, User, Discount, FilterOptions } from './types';

function AppContent() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [compareItems, setCompareItems] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isDiscountSystemOpen, setIsDiscountSystemOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isCustomServicesOpen, setIsCustomServicesOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);
  
  const [filters, setFilters] = useState<FilterOptions>({
    category: 'all',
    subcategory: 'all',
    priceRange: 'all',
    manufacturer: 'all',
    difficulty: 'all',
    series: 'all',
    tags: [],
    inStock: false,
    hasModel3D: false,
    minPrice: 0,
    maxPrice: 1000,
    sortBy: 'name',
    sortOrder: 'asc'
  });
  
  const [discounts, setDiscounts] = useState<Discount[]>([
    {
      id: '1',
      code: 'GUNDAM20',
      type: 'percentage',
      value: 20,
      minOrderAmount: 0,
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31'),
      isActive: true,
      usageLimit: 1000,
      usedCount: 45,
      description: 'Get 20% off on all Gundam models',
      applicableCategories: ['gundam']
    },
    {
      id: '2',
      code: 'FIGURE10',
      type: 'percentage',
      value: 10,
      minOrderAmount: 50,
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31'),
      isActive: true,
      usageLimit: 500,
      usedCount: 23,
      description: 'Save 10% on premium figures (min $50)',
      applicableCategories: ['figure']
    },
    {
      id: '3',
      code: 'WELCOME15',
      type: 'percentage',
      value: 15,
      minOrderAmount: 30,
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31'),
      isActive: true,
      usageLimit: 200,
      usedCount: 67,
      description: 'Welcome discount for new customers',
      applicableCategories: []
    },
    {
      id: '4',
      code: 'TOOLS5',
      type: 'fixed',
      value: 5,
      minOrderAmount: 25,
      validFrom: new Date('2024-01-01'),
      validTo: new Date('2024-12-31'),
      isActive: true,
      usageLimit: 300,
      usedCount: 12,
      description: '$5 off professional tools',
      applicableCategories: ['tools']
    }
  ]);

  // Show discount popup on first visit
  useEffect(() => {
    const hasSeenDiscountPopup = localStorage.getItem('hasSeenDiscountPopup');
    if (!hasSeenDiscountPopup) {
      setTimeout(() => {
        setIsDiscountSystemOpen(true);
        localStorage.setItem('hasSeenDiscountPopup', 'true');
      }, 3000);
    }
  }, []);

  // Load data from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
    
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist));
    }
    
    const savedCompare = localStorage.getItem('compare');
    if (savedCompare) {
      setCompareItems(JSON.parse(savedCompare));
    }
    
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }

    const savedDiscounts = localStorage.getItem('discounts');
    if (savedDiscounts) {
      setDiscounts(JSON.parse(savedDiscounts));
    }

    const savedFilters = localStorage.getItem('filters');
    if (savedFilters) {
      setFilters(JSON.parse(savedFilters));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  useEffect(() => {
    localStorage.setItem('compare', JSON.stringify(compareItems));
  }, [compareItems]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('discounts', JSON.stringify(discounts));
  }, [discounts]);

  useEffect(() => {
    localStorage.setItem('filters', JSON.stringify(filters));
  }, [filters]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const addToWishlist = (product: Product) => {
    setWishlistItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== id));
  };

  const addToCompare = (product: Product) => {
    setCompareItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.filter(item => item.id !== product.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), product];
      }
      return [...prev, product];
    });
  };

  const removeFromCompare = (id: string) => {
    setCompareItems(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    if (appliedDiscount) {
      const discountAmount = appliedDiscount.type === 'percentage' 
        ? subtotal * (appliedDiscount.value / 100)
        : appliedDiscount.value;
      return Math.max(0, subtotal - (appliedDiscount.maxDiscount ? Math.min(discountAmount, appliedDiscount.maxDiscount) : discountAmount));
    }
    return subtotal;
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const isInWishlist = (productId: string) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const isInCompare = (productId: string) => {
    return compareItems.some(item => item.id === productId);
  };

  const applyFilters = (products: Product[]) => {
    return products.filter(product => {
      // Search query
      const matchesSearch = !searchQuery || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.series?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      // Category filter
      const matchesCategory = filters.category === 'all' || product.category === filters.category;
      
      // Subcategory filter
      const matchesSubcategory = filters.subcategory === 'all' || product.subcategory === filters.subcategory;
      
      // Price range filter
      const matchesPriceRange = filters.priceRange === 'all' || product.priceRange === filters.priceRange;
      
      // Custom price range
      const matchesCustomPrice = product.price >= filters.minPrice && product.price <= filters.maxPrice;
      
      // Manufacturer filter
      const matchesManufacturer = filters.manufacturer === 'all' || product.manufacturer === filters.manufacturer;
      
      // Difficulty filter
      const matchesDifficulty = filters.difficulty === 'all' || product.difficulty === filters.difficulty;
      
      // Series filter
      const matchesSeries = filters.series === 'all' || product.series === filters.series;
      
      // Tags filter
      const matchesTags = filters.tags.length === 0 || filters.tags.some(tag => product.tags.includes(tag));
      
      // Stock filter
      const matchesStock = !filters.inStock || product.inStock;
      
      // 3D Model filter
      const matches3D = !filters.hasModel3D || product.hasModel3D;

      return matchesSearch && matchesCategory && matchesSubcategory && matchesPriceRange && 
             matchesCustomPrice && matchesManufacturer && matchesDifficulty && matchesSeries && 
             matchesTags && matchesStock && matches3D;
    });
  };

  const sortProducts = (products: Product[]) => {
    return [...products].sort((a, b) => {
      let comparison = 0;
      
      switch (filters.sortBy) {
        case 'name':
          comparison = a.name.localeCompare(b.name);
          break;
        case 'price':
          comparison = a.price - b.price;
          break;
        case 'rating':
          comparison = b.rating - a.rating;
          break;
        case 'newest':
          comparison = (b.releaseDate || '0').localeCompare(a.releaseDate || '0');
          break;
        case 'popular':
          comparison = b.reviews - a.reviews;
          break;
        default:
          comparison = 0;
      }
      
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });
  };

  const filteredProducts = sortProducts(applyFilters(products));
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category)))];

  const handleApplyDiscount = (discount: Discount | null) => {
    setAppliedDiscount(discount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors">
      <Header
        cartItemCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthModalOpen(true)}
        user={user}
        onLogout={() => {
          setUser(null);
          localStorage.removeItem('user');
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={(category) => {
          setSelectedCategory(category);
          setFilters(prev => ({ ...prev, category }));
        }}
        wishlistCount={wishlistItems.length}
        onWishlistClick={() => setIsWishlistOpen(true)}
        compareCount={compareItems.length}
        onCompareClick={() => setIsCompareOpen(true)}
        onAdminClick={() => setIsAdminOpen(true)}
        onDiscountClick={() => setIsDiscountSystemOpen(true)}
        onFilterClick={() => setIsFilterOpen(true)}
        onTrackingClick={() => setIsTrackingOpen(true)}
        onCustomServicesClick={() => setIsCustomServicesOpen(true)}
      />

      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600 bg-clip-text text-transparent mb-6 leading-tight">
              Premium Gundam &<br />
              <span className="bg-gradient-to-r from-slate-600 to-blue-500 bg-clip-text text-transparent">Collectible Figures</span>
            </h1>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed mb-8">
              Discover authentic Gundam models, premium figures, and professional tools. 
              Experience detailed galleries and join thousands of satisfied collectors worldwide.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center justify-center space-x-8 text-slate-500 dark:text-slate-400"
            >
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(34, 197, 94, 0.7)',
                      '0 0 0 10px rgba(34, 197, 94, 0)',
                      '0 0 0 0 rgba(34, 197, 94, 0)'
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="w-3 h-3 bg-green-500 rounded-full"
                ></motion.div>
                <span className="text-sm font-medium">Authentic Products</span>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(59, 130, 246, 0.7)',
                      '0 0 0 10px rgba(59, 130, 246, 0)',
                      '0 0 0 0 rgba(59, 130, 246, 0)'
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  className="w-3 h-3 bg-blue-500 rounded-full"
                ></motion.div>
                <span className="text-sm font-medium">Premium Gallery</span>
              </div>
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ 
                    scale: [1, 1.2, 1],
                    boxShadow: [
                      '0 0 0 0 rgba(168, 85, 247, 0.7)',
                      '0 0 0 10px rgba(168, 85, 247, 0)',
                      '0 0 0 0 rgba(168, 85, 247, 0)'
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                  className="w-3 h-3 bg-purple-500 rounded-full"
                ></motion.div>
                <span className="text-sm font-medium">Free Worldwide Shipping</span>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Products Section */}
        <section className="container mx-auto px-6 pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
                  Featured Products
                </h2>
                <span className="text-slate-500 dark:text-slate-400">
                  ({filteredProducts.length} items)
                </span>
              </div>
              <button
                onClick={() => setIsFilterOpen(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-slate-800 dark:bg-slate-600 text-white rounded-xl font-semibold hover:bg-slate-700 dark:hover:bg-slate-500 transition-all shadow-lg hover:shadow-xl"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                </svg>
                <span>Filters</span>
              </button>
            </div>
            
            <ProductGrid
              products={filteredProducts}
              onProductClick={setSelectedProduct}
              onAddToCart={addToCart}
              onAddToWishlist={addToWishlist}
              onAddToCompare={addToCompare}
              isInWishlist={isInWishlist}
              isInCompare={isInCompare}
            />
          </motion.div>
        </section>

        {/* About Section */}
        <AboutSection />

        {/* Contact Section */}
        <ContactSection />
      </main>

      {/* Filter Panel */}
      <FilterPanel
        filters={filters}
        onFiltersChange={setFilters}
        onClose={() => setIsFilterOpen(false)}
        isOpen={isFilterOpen}
      />

      {/* Modals */}
      {isCartOpen && (
        <Cart
          items={cartItems}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={updateCartQuantity}
          onRemoveItem={removeFromCart}
          onCheckout={() => {
            setIsCartOpen(false);
            if (!user) {
              setIsAuthModalOpen(true);
            } else {
              setIsCheckoutOpen(true);
            }
          }}
          totalPrice={getTotalPrice()}
        />
      )}

      {isWishlistOpen && (
        <WishlistModal
          items={wishlistItems}
          onClose={() => setIsWishlistOpen(false)}
          onAddToCart={addToCart}
          onRemoveFromWishlist={removeFromWishlist}
        />
      )}

      {isCompareOpen && (
        <CompareModal
          products={compareItems}
          onClose={() => setIsCompareOpen(false)}
          onAddToCart={addToCart}
          onRemoveFromCompare={removeFromCompare}
        />
      )}

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          onAddToWishlist={addToWishlist}
          onAddToCompare={addToCompare}
          isInWishlist={isInWishlist(selectedProduct.id)}
          isInCompare={isInCompare(selectedProduct.id)}
        />
      )}

      {isAuthModalOpen && (
        <AuthModal
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={(userData) => {
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
            setIsAuthModalOpen(false);
            if (cartItems.length > 0) {
              setIsCheckoutOpen(true);
            }
          }}
        />
      )}

      {isCheckoutOpen && user && (
        <CheckoutModal
          items={cartItems}
          user={user}
          totalPrice={getTotalPrice()}
          onClose={() => setIsCheckoutOpen(false)}
          onOrderComplete={() => {
            clearCart();
            setAppliedDiscount(null);
            setIsCheckoutOpen(false);
          }}
          discounts={discounts}
        />
      )}

      {isAdminOpen && user?.email === 'admin@gundamverse.com' && (
        <AdminPanel
          onClose={() => setIsAdminOpen(false)}
          products={products}
          onUpdateProducts={setProducts}
          discounts={discounts}
          onUpdateDiscounts={setDiscounts}
        />
      )}

      {isDiscountSystemOpen && (
        <DiscountSystem
          discounts={discounts}
          onApplyDiscount={handleApplyDiscount}
          appliedDiscount={appliedDiscount}
          cartTotal={cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
          isOpen={isDiscountSystemOpen}
          onClose={() => setIsDiscountSystemOpen(false)}
        />
      )}

      {isTrackingOpen && (
        <TrackingModal
          onClose={() => setIsTrackingOpen(false)}
        />
      )}

      {isCustomServicesOpen && (
        <CustomServicesModal
          onClose={() => setIsCustomServicesOpen(false)}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;