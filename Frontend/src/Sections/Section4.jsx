import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import Magnet from '../Components/Magnet';
import { API_ENDPOINTS } from '../config';

const Section4 = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Trigger fade-in animation on mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(API_ENDPOINTS.CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        alert('Message sent successfully! I\'ll get back to you soon.');
        // Reset form
        setFormData({
          name: '',
          email: '',
          message: ''
        });
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again later.');
    }

    setIsSubmitting(false);
  };

  return (
    <section className={`min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16 transition-opacity duration-1000 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="w-full max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-indigo-600 mb-3 sm:mb-4">
            Send me a message!
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl">
            Got a question or proposal, or just want to say hello? Go ahead.
          </p>
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8 p-4 sm:p-5">
          {/* Name and Email Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* Name Input */}
            <div className="relative">
              <label
                htmlFor="name"
                className="block text-sm text-gray-500 mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full pb-2 bg-transparent border-0 border-b border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-600 transition-colors duration-300"
              />
            </div>

            {/* Email Input */}
            <div className="relative">
              <label
                htmlFor="email"
                className="block text-sm text-gray-500 mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
                className="w-full pb-2 bg-transparent border-0 border-b border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-600 transition-colors duration-300"
              />
            </div>
          </div>

          {/* Message Textarea */}
          <div className="relative">
            <label
              htmlFor="message"
              className="block text-sm text-gray-500 mb-2"
            >
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="“Hi, I think we need a design system for our products. When can you hop on to discuss?"
              rows="2"
              className="w-full pb-2 bg-transparent border-0 border-b border-gray-300 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-indigo-600 transition-colors duration-300 resize-none"
            />
          </div>

          {/* Enhanced Submit Button */}
          <div className="flex justify-center mt-8 sm:mt-10 lg:mt-12">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative overflow-hidden px-8 sm:px-10 lg:px-12 py-3 sm:py-4 border-2 border-indigo-600 text-indigo-600 font-bold text-xs sm:text-sm tracking-wider uppercase transition-all duration-500 hover:bg-indigo-600 hover:text-white hover:shadow-2xl hover:shadow-indigo-600/25 active:scale-95 transform disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {/* Animated Background Slash */}
              <div className="absolute inset-0 bg-indigo-600 transform -skew-x-12 -translate-x-full transition-transform duration-500 group-hover:translate-x-0"></div>

              {/* Ripple Effect */}
              <div className="absolute inset-0 opacity-0 group-active:opacity-100 transition-opacity duration-200">
                <div className="absolute top-1/2 left-1/2 w-0 h-0 bg-white/30 rounded-full animate-ping transform -translate-x-1/2 -translate-y-1/2 group-active:w-32 group-active:h-32"></div>
              </div>

              {/* Particle Effect Container */}
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-1 h-1 bg-indigo-400 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-700 delay-${i * 100}`}
                    style={{
                      left: `${20 + i * 10}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.1}s`,
                      animationDuration: '1s'
                    }}
                  ></div>
                ))}
              </div>

              {/* Button Content */}
              <span className="relative flex items-center gap-3 z-10">
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    SENDING...
                  </>
                ) : (
                  <>
                    <span className="relative overflow-hidden">
                      <span className="inline-block transition-transform duration-300 group-hover:-translate-y-full">
                        SHOOT
                      </span>
                      <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-300 group-hover:translate-y-0">
                        SHOOT
                      </span>
                    </span>

                    {/* Enhanced Arrow with multiple effects */}
                    <div className="relative">
                      <ArrowRight className="w-5 h-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />

                      {/* Arrow trail effect */}
                      <ArrowRight className="absolute top-0 left-0 w-5 h-5 opacity-0 transition-all duration-300 group-hover:opacity-50 group-hover:translate-x-1 group-hover:scale-90" />
                      <ArrowRight className="absolute top-0 left-0 w-5 h-5 opacity-0 transition-all duration-300 group-hover:opacity-25 group-hover:scale-75" />
                    </div>
                  </>
                )}
              </span>

              {/* Glowing border effect */}
              <div className="absolute inset-0 border-2 border-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
            </button>
          </div>

        {/* Decorative Elements */}
        </form>
      </div>
    </section>
  );
};

export default Section4;