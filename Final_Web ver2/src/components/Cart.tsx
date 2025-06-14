import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import type { CartItem } from '../types';

interface CartProps {
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  totalPrice: number;
}

export function Cart({ items, onClose, onUpdateQuantity, onRemoveItem, onCheckout, totalPrice }: CartProps) {
  if (items.length === 0) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Shopping Cart</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all">
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <div className="text-center py-12">
            <ShoppingBag className="w-20 h-20 text-slate-300 dark:text-slate-600 mx-auto mb-6" />
            <h3 className="text-xl font-semibold text-slate-800 dark:text-white mb-2">Your cart is empty</h3>
            <p className="text-slate-500 dark:text-slate-400">Add some amazing models to get started!</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-3xl w-full mx-4 max-h-[90vh] flex flex-col shadow-2xl">
        <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Shopping Cart</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-8">
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center space-x-6 bg-slate-50 dark:bg-slate-700 rounded-2xl p-6">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-xl shadow-sm"
                />
                
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg mb-1">{item.name}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-2">{item.subcategory || item.category}</p>
                  <p className="text-slate-600 dark:text-slate-300 font-semibold">${item.price.toFixed(2)} each</p>
                </div>
                
                <div className="flex items-center space-x-3 bg-white dark:bg-slate-600 rounded-xl p-2">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-500 rounded-lg transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  
                  <span className="w-12 text-center font-bold text-slate-800 dark:text-white">{item.quantity}</span>
                  
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-2 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-500 rounded-lg transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-slate-800 dark:text-white text-xl mb-2">${(item.price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="text-red-500 hover:text-red-700 dark:hover:text-red-400 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t border-slate-100 dark:border-slate-700 p-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-slate-600 dark:text-slate-300">Total Amount</span>
              <p className="text-sm text-slate-500 dark:text-slate-400">Free shipping included</p>
            </div>
            <span className="text-3xl font-bold text-slate-800 dark:text-white">${totalPrice.toFixed(2)}</span>
          </div>
          
          <button
            onClick={onCheckout}
            className="w-full bg-slate-800 dark:bg-slate-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-slate-700 dark:hover:bg-slate-500 transition-all shadow-lg hover:shadow-xl"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}