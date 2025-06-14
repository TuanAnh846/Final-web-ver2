import React, { useState } from 'react';
import { X, CreditCard, Check, Shield, Truck, Award, Tag, Percent } from 'lucide-react';
import type { CartItem, User, Address, PaymentMethod, Discount } from '../types';

interface CheckoutModalProps {
  items: CartItem[];
  user: User;
  totalPrice: number;
  onClose: () => void;
  onOrderComplete: () => void;
  discounts: Discount[];
}

export function CheckoutModal({ items, user, totalPrice, onClose, onOrderComplete, discounts }: CheckoutModalProps) {
  const [step, setStep] = useState<'address' | 'payment' | 'complete'>('address');
  const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null);
  const [discountCode, setDiscountCode] = useState('');
  const [discountError, setDiscountError] = useState('');
  const [address, setAddress] = useState<Address>({
    fullName: user.name,
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>({
    type: 'card',
    last4: '4242',
    brand: 'Visa'
  });

  const applyDiscountCode = () => {
    setDiscountError('');
    const discount = discounts.find(d => 
      d.code.toLowerCase() === discountCode.toLowerCase() && 
      d.isActive &&
      new Date() >= d.validFrom &&
      new Date() <= d.validTo
    );

    if (!discount) {
      setDiscountError('Invalid or expired discount code');
      return;
    }

    if (discount.minOrderAmount && totalPrice < discount.minOrderAmount) {
      setDiscountError(`Minimum order amount is $${discount.minOrderAmount}`);
      return;
    }

    if (discount.usageLimit && discount.usedCount >= discount.usageLimit) {
      setDiscountError('This discount code has reached its usage limit');
      return;
    }

    setAppliedDiscount(discount);
    setDiscountCode('');
  };

  const removeDiscount = () => {
    setAppliedDiscount(null);
    setDiscountError('');
  };

  const calculateDiscountAmount = () => {
    if (!appliedDiscount) return 0;
    
    if (appliedDiscount.type === 'percentage') {
      const discountAmount = totalPrice * (appliedDiscount.value / 100);
      return appliedDiscount.maxDiscount 
        ? Math.min(discountAmount, appliedDiscount.maxDiscount)
        : discountAmount;
    } else {
      return Math.min(appliedDiscount.value, totalPrice);
    }
  };

  const finalTotal = totalPrice - calculateDiscountAmount();

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('complete');
    
    // Simulate order processing
    setTimeout(() => {
      onOrderComplete();
    }, 2000);
  };

  const renderAddressForm = () => (
    <form onSubmit={handleAddressSubmit} className="space-y-6">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Shipping Address</h3>
        <p className="text-slate-500 dark:text-slate-400">Where should we send your collectibles?</p>
      </div>
      
      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Full Name</label>
        <input
          type="text"
          value={address.fullName}
          onChange={(e) => setAddress(prev => ({ ...prev, fullName: e.target.value }))}
          className="w-full px-4 py-4 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:border-transparent bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white transition-all"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Street Address</label>
        <input
          type="text"
          value={address.street}
          onChange={(e) => setAddress(prev => ({ ...prev, street: e.target.value }))}
          className="w-full px-4 py-4 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:border-transparent bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white transition-all"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">City</label>
          <input
            type="text"
            value={address.city}
            onChange={(e) => setAddress(prev => ({ ...prev, city: e.target.value }))}
            className="w-full px-4 py-4 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:border-transparent bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">State</label>
          <input
            type="text"
            value={address.state}
            onChange={(e) => setAddress(prev => ({ ...prev, state: e.target.value }))}
            className="w-full px-4 py-4 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:border-transparent bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white transition-all"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">ZIP Code</label>
          <input
            type="text"
            value={address.zipCode}
            onChange={(e) => setAddress(prev => ({ ...prev, zipCode: e.target.value }))}
            className="w-full px-4 py-4 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:border-transparent bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Country</label>
          <select
            value={address.country}
            onChange={(e) => setAddress(prev => ({ ...prev, country: e.target.value }))}
            className="w-full px-4 py-4 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:border-transparent bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white transition-all"
          >
            <option>United States</option>
            <option>Canada</option>
            <option>United Kingdom</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-slate-800 dark:bg-slate-600 text-white py-4 rounded-xl font-bold hover:bg-slate-700 dark:hover:bg-slate-500 transition-all shadow-lg hover:shadow-xl"
      >
        Continue to Payment
      </button>
    </form>
  );

  const renderPaymentForm = () => (
    <form onSubmit={handlePaymentSubmit} className="space-y-6">
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Payment Information</h3>
        <p className="text-slate-500 dark:text-slate-400">Secure payment processing</p>
      </div>
      
      {/* Discount Code Section */}
      <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6">
        <h4 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center space-x-2">
          <Tag className="w-5 h-5" />
          <span>Discount Code (Optional)</span>
        </h4>
        
        {appliedDiscount ? (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Percent className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="font-bold text-green-800 dark:text-green-200">{appliedDiscount.code}</p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    {appliedDiscount.value}{appliedDiscount.type === 'percentage' ? '% off' : '$ off'} applied
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={removeDiscount}
                className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200 text-sm font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex space-x-3">
              <input
                type="text"
                placeholder="Enter discount code"
                value={discountCode}
                onChange={(e) => {
                  setDiscountCode(e.target.value.toUpperCase());
                  setDiscountError('');
                }}
                className="flex-1 px-4 py-3 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white transition-all"
              />
              <button
                type="button"
                onClick={applyDiscountCode}
                disabled={!discountCode.trim()}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  discountCode.trim()
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-slate-200 dark:bg-slate-600 text-slate-500 dark:text-slate-400 cursor-not-allowed'
                }`}
              >
                Apply
              </button>
            </div>
            {discountError && (
              <p className="text-red-500 dark:text-red-400 text-sm">{discountError}</p>
            )}
            <div className="text-xs text-slate-500 dark:text-slate-400">
              <p>Available codes: GUNDAM20, FIGURE10, WELCOME15</p>
            </div>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6">
        <h4 className="font-bold text-slate-800 dark:text-white mb-4 text-lg">Order Summary</h4>
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                <div>
                  <span className="font-medium text-slate-800 dark:text-white">{item.name}</span>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-bold text-slate-800 dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          
          <div className="border-t border-slate-200 dark:border-slate-600 pt-4 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Subtotal</span>
              <span className="font-semibold text-slate-800 dark:text-white">${totalPrice.toFixed(2)}</span>
            </div>
            
            {appliedDiscount && (
              <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                <span>Discount ({appliedDiscount.code})</span>
                <span>-${calculateDiscountAmount().toFixed(2)}</span>
              </div>
            )}
            
            <div className="flex justify-between items-center">
              <span className="text-slate-600 dark:text-slate-400">Shipping</span>
              <span className="font-semibold text-green-600 dark:text-green-400">FREE</span>
            </div>
            
            <div className="flex justify-between items-center text-lg font-bold text-slate-800 dark:text-white border-t border-slate-200 dark:border-slate-600 pt-2">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>
            
            {appliedDiscount && (
              <div className="text-center text-sm text-green-600 dark:text-green-400 font-semibold">
                You saved ${calculateDiscountAmount().toFixed(2)}!
              </div>
            )}
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Card Number</label>
        <div className="relative">
          <CreditCard className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 dark:text-slate-500 w-5 h-5" />
          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="w-full pl-12 pr-4 py-4 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:border-transparent bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white transition-all"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">Expiry Date</label>
          <input
            type="text"
            placeholder="MM/YY"
            className="w-full px-4 py-4 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:border-transparent bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white transition-all"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">CVC</label>
          <input
            type="text"
            placeholder="123"
            className="w-full px-4 py-4 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:border-transparent bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white transition-all"
            required
          />
        </div>
      </div>

      <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-700 rounded-xl p-4">
        <Shield className="w-5 h-5" />
        <span className="text-sm">Your payment information is encrypted and secure</span>
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition-all shadow-lg hover:shadow-xl"
      >
        Complete Order - ${finalTotal.toFixed(2)}
      </button>
    </form>
  );

  const renderComplete = () => (
    <div className="text-center py-12">
      <div className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
        <Check className="w-10 h-10 text-green-600 dark:text-green-400" />
      </div>
      <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Order Placed Successfully!</h3>
      <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
        Thank you for your purchase. Your collectibles are on their way!
      </p>
      
      <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-8 text-left max-w-md mx-auto">
        <h4 className="font-bold text-slate-800 dark:text-white mb-4 text-lg">Order Details</h4>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Order Number:</span>
            <span className="font-bold text-slate-800 dark:text-white">#{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Total Amount:</span>
            <span className="font-bold text-slate-800 dark:text-white">${finalTotal.toFixed(2)}</span>
          </div>
          {appliedDiscount && (
            <div className="flex justify-between text-green-600 dark:text-green-400">
              <span>Savings:</span>
              <span className="font-bold">${calculateDiscountAmount().toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-slate-600 dark:text-slate-400">Items:</span>
            <span className="font-bold text-slate-800 dark:text-white">{items.length}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-8 mt-8 text-slate-500 dark:text-slate-400">
        <div className="flex items-center space-x-2">
          <Truck className="w-5 h-5" />
          <span className="text-sm">Ships within 24 hours</span>
        </div>
        <div className="flex items-center space-x-2">
          <Award className="w-5 h-5" />
          <span className="text-sm">Premium packaging</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
              {step === 'address' && 'Shipping Information'}
              {step === 'payment' && 'Payment Details'}
              {step === 'complete' && 'Order Complete'}
            </h2>
            {step !== 'complete' && (
              <div className="flex items-center space-x-2 mt-2">
                <div className={`w-3 h-3 rounded-full ${step === 'address' ? 'bg-slate-800 dark:bg-slate-400' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                <div className={`w-3 h-3 rounded-full ${step === 'payment' ? 'bg-slate-800 dark:bg-slate-400' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
                <div className={`w-3 h-3 rounded-full ${step === 'complete' ? 'bg-slate-800 dark:bg-slate-400' : 'bg-slate-300 dark:bg-slate-600'}`}></div>
              </div>
            )}
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          {step === 'address' && renderAddressForm()}
          {step === 'payment' && renderPaymentForm()}
          {step === 'complete' && renderComplete()}
        </div>
      </div>
    </div>
  );
}