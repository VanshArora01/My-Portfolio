import React from 'react';
import { Link } from 'react-router-dom';


const Footer = () => {
  const socialLinks = [
    { name: 'GitHub', href: 'https://github.com/vansharora01', label: 'GitHub' },
    { name: 'LinkedIn', href: 'https://linkedin.com/in/vansharora01', label: 'LinkedIn' },
    
  ];

  const quickLinks = [
    { name: 'My Work', href: '/mywork' },
    { name: 'My Shelf', href: '/' },
    { name: 'My Résumé', href: '/resume' }
  ];

  return (
    <footer className="bg-[#2c0055] w-full">
      {/* Top Section - Contact Info and Links */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {/* Left Side - Say Hello */}
          <div className="text-center md:text-left">
            <h3 className="text-gray-300 text-xs md:text-sm uppercase tracking-widest mb-6 font-medium">
              Say Hello
            </h3>
            <div className="space-y-3">
              <a 
                href="mailto:vanshcodes01@gmail.com" 
                className="block text-lime-300 hover:text-lime-200 transition-colors duration-200"
              >
                Vanshcodes01@gmail.com
              </a>
             
            </div>
          </div>

          {/* Right Side - Quick Links */}
          <div className="text-center md:text-left md:ml-auto">
            <div className="space-y-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="block text-lime-300 hover:text-lime-200 hover:underline transition-all duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Divider Line */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="border-t border-gray-500/40"></div>
      </div>

      {/* Bottom Section - Copyright and Social Links */}
      <div className="container mx-auto px-6 md:px-12 lg:px-20 py-6 md:py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Copyright */}
          <div className="text-center md:text-left">
            <p className="text-lime-300 text-sm">
              © Vansh Arora 2025
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="text-lime-300 hover:text-lime-200 hover:scale-110 transition-all duration-200 text-sm font-medium"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;