import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Shield, Award, Users, Globe, Package, Truck, Star, MapPin } from 'lucide-react';

export function AboutSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

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
          <motion.div variants={itemVariants} className="w-20 h-20 bg-gradient-to-br from-slate-800 to-slate-600 dark:from-slate-600 dark:to-slate-400 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Shield className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-4xl font-bold text-slate-800 dark:text-white mb-6">
            About GundamVerse
          </motion.h2>
          <motion.p variants={itemVariants} className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Since 2015, we've been the world's leading marketplace for authentic Gundam models, premium figures, and collectible accessories. 
            Our passion for quality and authenticity drives everything we do.
          </motion.p>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
        >
          {[
            { icon: Users, number: '50K+', label: 'Happy Customers' },
            { icon: Package, number: '1000+', label: 'Products' },
            { icon: Star, number: '95%', label: 'Satisfaction Rate' },
            { icon: Globe, number: '50+', label: 'Countries Served' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="text-center bg-white dark:bg-slate-700 rounded-2xl p-8 shadow-sm"
            >
              <stat.icon className="w-8 h-8 text-slate-600 dark:text-slate-300 mx-auto mb-4" />
              <div className="text-3xl font-bold text-slate-800 dark:text-white mb-2">{stat.number}</div>
              <div className="text-slate-600 dark:text-slate-300 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Mission & Values */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-16 items-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">Our Mission</h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed mb-6 text-lg">
              We believe that every collector deserves access to authentic, high-quality products. Our mission is to bridge 
              the gap between passionate collectors and the premium models they desire, while providing an exceptional 
              shopping experience that builds lasting relationships.
            </p>
            <div className="space-y-4">
              {[
                '100% Authentic Products Guaranteed',
                'Expert Curation & Quality Control',
                'Worldwide Shipping & Support',
                'Premium Customer Experience'
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-slate-800 dark:bg-slate-300 rounded-full"></div>
                  <span className="text-slate-600 dark:text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 gap-6">
            {[
              { icon: Award, title: 'Premium Quality', desc: 'Only authentic products from official distributors' },
              { icon: Globe, title: 'Global Reach', desc: 'Serving collectors in over 50 countries worldwide' },
              { icon: Package, title: 'Secure Packaging', desc: 'Professional packaging for safe delivery' },
              { icon: Truck, title: 'Fast Shipping', desc: 'Free worldwide shipping on orders over $50' },
            ].map((feature, index) => (
              <div key={index} className="bg-white dark:bg-slate-700 rounded-2xl p-6 text-center shadow-sm">
                <feature.icon className="w-8 h-8 text-slate-600 dark:text-slate-300 mx-auto mb-3" />
                <h4 className="font-bold text-slate-800 dark:text-white mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-600 dark:text-slate-300">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Store Location */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="bg-white dark:bg-slate-700 rounded-2xl p-8 shadow-sm"
        >
          <div className="flex items-center justify-center mb-6">
            <MapPin className="w-8 h-8 text-slate-600 dark:text-slate-300 mr-3" />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Visit Our Store</h3>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left">
              <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-4">GundamVerse Flagship Store</h4>
              <div className="space-y-3 text-slate-600 dark:text-slate-300">
                <p className="flex items-center justify-center lg:justify-start space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>123 Collector's Lane, Tokyo District, CA 90210</span>
                </p>
                <p><strong>Hours:</strong> Mon-Fri 9AM-6PM, Sat 10AM-4PM</p>
                <p><strong>Phone:</strong> +1 (555) 123-4567</p>
                <p><strong>Email:</strong> store@gundamverse.com</p>
              </div>
            </div>
            
            <div className="bg-slate-100 dark:bg-slate-600 rounded-xl h-64 flex items-center justify-center">
              <div className="text-center text-slate-500 dark:text-slate-400">
                <MapPin className="w-12 h-12 mx-auto mb-2" />
                <p>Interactive Store Map</p>
                <p className="text-sm">Visit us for exclusive in-store collections</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}