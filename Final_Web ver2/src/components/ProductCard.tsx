import React from 'react';
import { Star, ShoppingCart, Eye, Award, Package, Heart, BarChart3, Percent } from 'lucide-react';
import { motion } from 'framer-motion';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onProductClick: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onAddToWishlist: (product: Product) => void;
  onAddToCompare: (product: Product) => void;
  isInWishlist: boolean;
  isInCompare: boolean;
}

export function ProductCard({ 
  product, 
  onProductClick, 
  onAddToCart, 
  onAddToWishlist, 
  onAddToCompare,
  isInWishlist,
  isInCompare 
}: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToWishlist(product);
  };

  const handleAddToCompare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCompare(product);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'gundam': return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'figure': return 'bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      case 'accessories': return 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800';
      case 'tools': return 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800';
      default: return 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'Intermediate': return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'Advanced': return 'bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'Expert': return 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800';
      default: return 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -3, scale: 1.01 }}
      className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group overflow-hidden border border-slate-100 dark:border-slate-700"
      onClick={() => onProductClick(product)}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Discount Badge */}
        {product.discountPercentage && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold flex items-center space-x-1 shadow-lg">
            <Percent className="w-3 h-3" />
            <span>{product.discountPercentage}% OFF</span>
          </div>
        )}

        {product.hasModel3D && (
          <div className="absolute top-3 right-3 bg-slate-800 dark:bg-slate-700 text-white px-2 py-1 rounded-full text-xs font-semibold flex items-center space-x-1 shadow-lg">
            <Package className="w-3 h-3" />
            <span>3D</span>
          </div>
        )}
        
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white font-semibold bg-red-600 px-3 py-1 rounded-lg shadow-lg text-sm">Out of Stock</span>
          </div>
        )}
        
        <div className="absolute bottom-3 right-3 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => {
              e.stopPropagation();
              onProductClick(product);
            }}
            className="bg-white dark:bg-slate-800 bg-opacity-95 hover:bg-opacity-100 p-1.5 rounded-full shadow-lg transition-all"
          >
            <Eye className="w-3 h-3 text-slate-700 dark:text-slate-300" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToWishlist}
            className={`bg-white dark:bg-slate-800 bg-opacity-95 hover:bg-opacity-100 p-1.5 rounded-full shadow-lg transition-all ${
              isInWishlist ? 'text-red-500' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            <Heart className={`w-3 h-3 ${isInWishlist ? 'fill-current' : ''}`} />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCompare}
            className={`bg-white dark:bg-slate-800 bg-opacity-95 hover:bg-opacity-100 p-1.5 rounded-full shadow-lg transition-all ${
              isInCompare ? 'text-blue-500' : 'text-slate-700 dark:text-slate-300'
            }`}
          >
            <BarChart3 className="w-3 h-3" />
          </motion.button>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getCategoryColor(product.category)}`}>
            {product.subcategory || product.category}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-amber-400 fill-current" />
            <span className="text-xs text-slate-600 dark:text-slate-300 font-semibold">{product.rating}</span>
            <span className="text-xs text-slate-400 dark:text-slate-500">({product.reviews})</span>
          </div>
        </div>
        
        <h3 className="font-bold text-slate-800 dark:text-white mb-2 line-clamp-2 group-hover:text-slate-600 dark:group-hover:text-slate-300 transition-colors leading-tight">
          {product.name}
        </h3>
        
        <div className="space-y-1 mb-2">
          {product.scale && (
            <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center space-x-2">
              <span className="font-medium">Scale:</span>
              <span>{product.scale}</span>
            </p>
          )}
          
          {product.series && (
            <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center space-x-2">
              <span className="font-medium">Series:</span>
              <span className="truncate">{product.series}</span>
            </p>
          )}
          
          {product.manufacturer && (
            <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center space-x-2">
              <Award className="w-3 h-3 text-slate-400 dark:text-slate-500" />
              <span>{product.manufacturer}</span>
            </p>
          )}
        </div>
        
        {product.difficulty && (
          <div className="mb-3">
            <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${getDifficultyColor(product.difficulty)}`}>
              {product.difficulty} Level
            </span>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-slate-800 dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-slate-500 dark:text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Free shipping</p>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              product.inStock
                ? 'bg-slate-800 dark:bg-slate-600 text-white hover:bg-slate-700 dark:hover:bg-slate-500 shadow-lg hover:shadow-xl'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="w-3 h-3" />
            <span>Add to Cart</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}