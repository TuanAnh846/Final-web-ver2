import React, { useState, useEffect } from 'react';
import { X, Percent, Tag, Clock, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Discount } from '../types';

interface DiscountPopupProps {
  discounts: Discount[];
  onClose: () => void;
  onApplyDiscount: (code: string) => void;
}

export function DiscountPopup({ discounts, onClose, onApplyDiscount }: DiscountPopupProps) {
  const [selectedCode, setSelectedCode] = useState('');

  const activeDiscounts = discounts.filter(d => d.isActive);

  const handleApplyDiscount = () => {
    if (selectedCode) {
      onApplyDiscount(selectedCode);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white bg-opacity-20 rounded-xl flex items-center justify-center">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Special Offers!</h2>
                <p className="text-red-100 text-sm">Save on your favorite collectibles</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-red-100 p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeDiscounts.length > 0 ? (
            <>
              <h3 className="font-bold text-slate-800 dark:text-white mb-4">Available Discounts</h3>
              <div className="space-y-3 mb-6">
                {activeDiscounts.map((discount) => (
                  <motion.div
                    key={discount.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                      selectedCode === discount.code
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-slate-200 dark:border-slate-600 hover:border-red-300 dark:hover:border-red-400'
                    }`}
                    onClick={() => setSelectedCode(discount.code)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                          <Percent className="w-5 h-5 text-red-600 dark:text-red-400" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-slate-800 dark:text-white text-lg">
                              {discount.code}
                            </span>
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                              {discount.value}{discount.type === 'percentage' ? '% OFF' : '$ OFF'}
                            </span>
                          </div>
                          <p className="text-slate-500 dark:text-slate-400 text-sm">
                            {discount.minOrderAmount ? `Min order: $${discount.minOrderAmount}` : 'No minimum order'}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 text-xs">
                          <Clock className="w-3 h-3" />
                          <span>Until {discount.validTo.toLocaleDateString()}</span>
                        </div>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                          {discount.usedCount}/{discount.usageLimit || '∞'} used
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleApplyDiscount}
                disabled={!selectedCode}
                className={`w-full py-3 rounded-xl font-bold transition-all ${
                  selectedCode
                    ? 'bg-red-500 text-white hover:bg-red-600 shadow-lg hover:shadow-xl'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                }`}
              >
                {selectedCode ? `Apply ${selectedCode}` : 'Select a discount'}
              </motion.button>
            </>
          ) : (
            <div className="text-center py-8">
              <Tag className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">
                No Active Discounts
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                Check back later for amazing deals!
              </p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-600">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              Discounts cannot be combined. Terms and conditions apply.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}