import React, { useState } from 'react';
import { Percent, Tag, Clock, Gift, X, Check, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Discount } from '../types';

interface DiscountSystemProps {
  discounts: Discount[];
  onApplyDiscount: (discount: Discount | null) => void;
  appliedDiscount: Discount | null;
  cartTotal: number;
  isOpen: boolean;
  onClose: () => void;
}

export function DiscountSystem({ 
  discounts, 
  onApplyDiscount, 
  appliedDiscount, 
  cartTotal, 
  isOpen, 
  onClose 
}: DiscountSystemProps) {
  const [manualCode, setManualCode] = useState('');
  const [error, setError] = useState('');
  const [showManualEntry, setShowManualEntry] = useState(false);

  const activeDiscounts = discounts.filter(d => 
    d.isActive && 
    new Date() >= d.validFrom && 
    new Date() <= d.validTo &&
    (!d.usageLimit || d.usedCount < d.usageLimit)
  );

  const validateDiscount = (discount: Discount): string | null => {
    if (!discount.isActive) return 'This discount is no longer active';
    if (new Date() < discount.validFrom) return 'This discount is not yet valid';
    if (new Date() > discount.validTo) return 'This discount has expired';
    if (discount.usageLimit && discount.usedCount >= discount.usageLimit) return 'This discount has reached its usage limit';
    if (discount.minOrderAmount && cartTotal < discount.minOrderAmount) {
      return `Minimum order amount is $${discount.minOrderAmount}`;
    }
    return null;
  };

  const calculateDiscountAmount = (discount: Discount): number => {
    if (discount.type === 'percentage') {
      const amount = cartTotal * (discount.value / 100);
      return discount.maxDiscount ? Math.min(amount, discount.maxDiscount) : amount;
    }
    return Math.min(discount.value, cartTotal);
  };

  const handleApplyManualCode = () => {
    setError('');
    const discount = discounts.find(d => d.code.toLowerCase() === manualCode.toLowerCase());
    
    if (!discount) {
      setError('Invalid discount code');
      return;
    }

    const validationError = validateDiscount(discount);
    if (validationError) {
      setError(validationError);
      return;
    }

    onApplyDiscount(discount);
    setManualCode('');
    setShowManualEntry(false);
  };

  const handleApplyDiscount = (discount: Discount) => {
    const validationError = validateDiscount(discount);
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError('');
    onApplyDiscount(discount);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="bg-slate-800 dark:bg-slate-700 text-white p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">Discount Center</h2>
                <p className="text-slate-300 text-sm">Save on your favorite collectibles</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-slate-300 p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {/* Applied Discount */}
          {appliedDiscount && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                    <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="font-bold text-lg text-green-800 dark:text-green-200">{appliedDiscount.code}</p>
                    <p className="text-green-600 dark:text-green-400 text-sm">
                      Save ${calculateDiscountAmount(appliedDiscount).toFixed(2)} on your order
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => onApplyDiscount(null)}
                  className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 p-2 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-all"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4"
            >
              <div className="flex items-center space-x-3">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
              </div>
            </motion.div>
          )}

          {/* Manual Code Entry */}
          <div className="mb-6">
            <button
              onClick={() => setShowManualEntry(!showManualEntry)}
              className="w-full bg-slate-50 dark:bg-slate-700 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-4 text-center hover:border-slate-400 dark:hover:border-slate-500 transition-all group"
            >
              <div className="flex items-center justify-center space-x-3">
                <Tag className="w-5 h-5 text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400" />
                <span className="font-semibold text-slate-700 dark:text-slate-300 group-hover:text-slate-800 dark:group-hover:text-slate-200">
                  {showManualEntry ? 'Hide Manual Entry' : 'Enter Discount Code'}
                </span>
              </div>
            </button>

            <AnimatePresence>
              {showManualEntry && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 space-y-3">
                    <input
                      type="text"
                      placeholder="Enter discount code"
                      value={manualCode}
                      onChange={(e) => {
                        setManualCode(e.target.value.toUpperCase());
                        setError('');
                      }}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-500 bg-white dark:bg-slate-700 text-slate-800 dark:text-white transition-all"
                    />
                    <button
                      onClick={handleApplyManualCode}
                      disabled={!manualCode.trim()}
                      className={`w-full py-3 rounded-xl font-semibold transition-all ${
                        manualCode.trim()
                          ? 'bg-slate-800 dark:bg-slate-600 text-white hover:bg-slate-700 dark:hover:bg-slate-500 shadow-lg hover:shadow-xl'
                          : 'bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                      }`}
                    >
                      Apply Code
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Available Discounts */}
          {activeDiscounts.length > 0 ? (
            <>
              <h3 className="font-bold text-slate-800 dark:text-white mb-4 text-lg">Available Discounts</h3>
              <div className="space-y-3">
                {activeDiscounts.map((discount) => {
                  const discountAmount = calculateDiscountAmount(discount);
                  const isEligible = !validateDiscount(discount);
                  
                  return (
                    <motion.div
                      key={discount.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                        appliedDiscount?.id === discount.id
                          ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                          : isEligible
                          ? 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500 bg-white dark:bg-slate-700'
                          : 'border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 opacity-60'
                      }`}
                      onClick={() => isEligible && handleApplyDiscount(discount)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            appliedDiscount?.id === discount.id
                              ? 'bg-green-100 dark:bg-green-900/30'
                              : 'bg-slate-100 dark:bg-slate-600'
                          }`}>
                            <Percent className={`w-5 h-5 ${
                              appliedDiscount?.id === discount.id
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-slate-600 dark:text-slate-400'
                            }`} />
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-slate-800 dark:text-white text-lg">
                                {discount.code}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                appliedDiscount?.id === discount.id
                                  ? 'bg-green-500 text-white'
                                  : 'bg-slate-500 text-white'
                              }`}>
                                {discount.value}{discount.type === 'percentage' ? '% OFF' : '$ OFF'}
                              </span>
                            </div>
                            <p className="text-slate-500 dark:text-slate-400 text-sm">
                              {discount.description || `Save $${discountAmount.toFixed(2)} on this order`}
                            </p>
                            {discount.minOrderAmount && (
                              <p className="text-xs text-slate-400 dark:text-slate-500">
                                Min order: ${discount.minOrderAmount}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1 text-slate-500 dark:text-slate-400 text-xs">
                            <Clock className="w-3 h-3" />
                            <span>Until {discount.validTo.toLocaleDateString()}</span>
                          </div>
                          {discount.usageLimit && (
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                              {discount.usedCount}/{discount.usageLimit} used
                            </p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
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
        </div>

        {/* Footer */}
        <div className="bg-slate-50 dark:bg-slate-700 p-4 border-t border-slate-200 dark:border-slate-600">
          <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
            Discounts cannot be combined. Terms and conditions apply.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}