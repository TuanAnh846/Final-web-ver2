import React from 'react';
import { X, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import type { Product } from '../types';

interface WishlistModalProps {
  items: Product[];
  onClose: () => void;
  onAddToCart: (product: Product) => void;
  onRemoveFromWishlist: (id: string) => void;
}

export function WishlistModal({ items, onClose, onAddToCart, onRemoveFromWishlist }: WishlistModalProps) {
  if (items.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Wishlist</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="text-center py-12">
            <Heart className="w-20 h-20 text-slate-300 dark:text-slate-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Your wishlist is empty</h3>
            <p className="text-slate-500 dark:text-slate-400">Save your favorite models for later!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full mx-4 max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Wishlist</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">{items.length} {items.length === 1 ? 'item' : 'items'} saved</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8">
          <div className="grid md:grid-cols-2 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6 flex space-x-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-xl shadow-sm"
                />
                
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-2">{item.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">{item.subcategory || item.category}</p>
                  <p className="text-slate-800 dark:text-white font-bold text-xl mb-4">${item.price.toFixed(2)}</p>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onAddToCart(item)}
                      disabled={!item.inStock}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                        item.inStock
                          ? 'bg-slate-800 dark:bg-slate-600 text-white hover:bg-slate-700 dark:hover:bg-slate-500'
                          : 'bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Add to Cart</span>
                    </button>
                    
                    <button
                      onClick={() => onRemoveFromWishlist(item.id)}
                      className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}