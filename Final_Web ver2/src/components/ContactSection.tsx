import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, ExternalLink } from 'lucide-react';

export function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
      setIsSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '', type: 'general' });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleMapClick = () => {
    const address = "123 Collector's Lane, Tokyo District, CA 90210";
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section ref={ref} className="py-24 bg-slate-50 dark:bg-slate-800 transition-colors">
      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-slate-800 dark:text-white mb-6">
            Get in Touch
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Have questions about our products or need assistance? Our expert team is here to help you find the perfect collectibles.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-8"
          >
            <motion.div variants={itemVariants}>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-8">Contact Information</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: 'Email',
                    content: 'support@gundamverse.com',
                    subtitle: 'We reply within 24 hours'
                  },
                  {
                    icon: Phone,
                    title: 'Phone',
                    content: '+1 (555) 123-4567',
                    subtitle: 'Mon-Fri 9AM-6PM PST'
                  },
                  {
                    icon: MapPin,
                    title: 'Address',
                    content: '123 Collector\'s Lane\nTokyo District, CA 90210',
                    subtitle: 'Visit our flagship store'
                  },
                  {
                    icon: Clock,
                    title: 'Business Hours',
                    content: 'Monday - Friday: 9AM - 6PM PST\nSaturday: 10AM - 4PM PST\nSunday: Closed',
                    subtitle: 'Extended holiday hours'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    className="flex items-start space-x-4 bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="w-12 h-12 bg-slate-800 dark:bg-slate-600 rounded-xl flex items-center justify-center text-white">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-white mb-1">{item.title}</h4>
                      <p className="text-slate-600 dark:text-slate-300 whitespace-pre-line">{item.content}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{item.subtitle}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Store Location */}
            <motion.div variants={itemVariants} className="bg-white dark:bg-slate-700 rounded-2xl p-6 shadow-sm">
              <h4 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <span>Visit Our Store</span>
              </h4>
              
              <div 
                className="relative bg-slate-100 dark:bg-slate-600 rounded-xl h-48 flex items-center justify-center cursor-pointer group hover:bg-slate-200 dark:hover:bg-slate-500 transition-all border-2 border-dashed border-slate-300 dark:border-slate-500 hover:border-slate-400 dark:hover:border-slate-400"
                onClick={handleMapClick}
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-slate-800 dark:bg-slate-600 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <MapPin className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-semibold text-slate-800 dark:text-white mb-1">GundamVerse Flagship Store</p>
                  <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">123 Collector's Lane, Tokyo District, CA 90210</p>
                  <div className="flex items-center justify-center space-x-2 text-slate-600 dark:text-slate-400 group-hover:text-slate-800 dark:group-hover:text-slate-200">
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm font-semibold">Open in Google Maps</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-slate-800 dark:bg-slate-700 rounded-2xl p-6 text-white">
              <h4 className="font-bold mb-4">Why Choose GundamVerse?</h4>
              <ul className="space-y-3 text-sm">
                {[
                  'Authentic products from official distributors',
                  'Expert customer support team',
                  'Free worldwide shipping on orders over $50',
                  '30-day return guarantee',
                  'Exclusive collector community access'
                ].map((item, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="bg-white dark:bg-slate-700 rounded-2xl p-8 shadow-sm"
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">Message Sent!</h3>
                <p className="text-slate-600 dark:text-slate-300">Thank you for contacting us. We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                      Inquiry Type
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white transition-all"
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
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white transition-all"
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
                        className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white transition-all"
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
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white transition-all"
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
                      rows={5}
                      className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-xl focus:ring-2 focus:ring-slate-500 focus:border-transparent bg-white dark:bg-slate-800 text-slate-800 dark:text-white transition-all resize-none"
                      placeholder="Please provide details about your inquiry..."
                      required
                    />
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-slate-800 dark:bg-slate-600 text-white py-4 rounded-xl font-bold hover:bg-slate-700 dark:hover:bg-slate-500 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Send Message</span>
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}