import React, { useState } from 'react';
import { X, Mail, Phone, MapPin, Clock, Send, MessageSquare } from 'lucide-react';

interface ContactModalProps {
  onClose: () => void;
}

export function ContactModal({ onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-md w-full p-8 shadow-2xl">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Message Sent!</h3>
            <p className="text-slate-600 dark:text-slate-300">Thank you for contacting us. We'll get back to you within 24 hours.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-slate-700">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Contact Us</h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">Get in touch with our expert team</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 p-2 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 p-8">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Get in Touch</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                    <Mail className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">Email</h4>
                    <p className="text-slate-600 dark:text-slate-300">support@gundamverse.com</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">We reply within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                    <Phone className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">Phone</h4>
                    <p className="text-slate-600 dark:text-slate-300">+1 (555) 123-4567</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Mon-Fri 9AM-6PM PST</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                    <MapPin className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">Address</h4>
                    <p className="text-slate-600 dark:text-slate-300">123 Collector's Lane<br />Tokyo District, CA 90210</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-slate-600 dark:text-slate-300" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">Business Hours</h4>
                    <p className="text-slate-600 dark:text-slate-300">Monday - Friday: 9AM - 6PM PST</p>
                    <p className="text-slate-600 dark:text-slate-300">Saturday: 10AM - 4PM PST</p>
                    <p className="text-slate-600 dark:text-slate-300">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 dark:bg-slate-700 rounded-2xl p-6">
              <h4 className="font-bold text-slate-800 dark:text-white mb-4">Why Choose GundamVerse?</h4>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-slate-800 dark:bg-slate-300 rounded-full"></div>
                  <span>Authentic products from official distributors</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-slate-800 dark:bg-slate-300 rounded-full"></div>
                  <span>Expert customer support team</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-slate-800 dark:bg-slate-300 rounded-full"></div>
                  <span>Free worldwide shipping on orders over $50</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-slate-800 dark:bg-slate-300 rounded-full"></div>
                  <span>30-day return guarantee</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Inquiry Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:border-transparent bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white transition-all"
                >
                  <option value="general">General Inquiry</option>
                  <option value="order">Order Support</option>
                  <option value="product">Product Question</option>
                  <option value="shipping">Shipping & Returns</option>
                  <option value="wholesale">Wholesale Inquiry</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:border-transparent bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white transition-all"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-4 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:border-transparent bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white transition-all"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-4 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:border-transparent bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white transition-all"
                  placeholder="How can we help you?"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-4 border border-slate-200 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-800 dark:focus:ring-slate-400 focus:border-transparent bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white transition-all resize-none"
                  placeholder="Please provide details about your inquiry..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-800 dark:bg-slate-600 text-white py-4 rounded-xl font-bold hover:bg-slate-700 dark:hover:bg-slate-500 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <MessageSquare className="w-5 h-5" />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}