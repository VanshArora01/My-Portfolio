import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const location = useLocation();

    const menuItems = [
        { name: 'My Self', href: '/', id: 'home' },
        { name: 'My Work', href: '/mywork', id: 'work' },
        { name: 'My Résumé', href: '/resume', id: 'resume' },
    ];

    // Get current active section based on location
    const getActiveSection = () => {
        const path = location.pathname;
        if (path === '/') return 'home';
        if (path === '/mywork') return 'work';
        if (path === '/resume') return 'resume';
        return 'home';
    };

    // Hide navbar on mobile scroll down
    useEffect(() => {
        const controlNavbar = () => {
            const currentScrollY = window.scrollY;
            if (window.innerWidth < 768) {
                if (currentScrollY > lastScrollY && currentScrollY > 100) {
                    setIsVisible(false);
                } else {
                    setIsVisible(true);
                }
            } else {
                setIsVisible(true);
            }
            setLastScrollY(currentScrollY);
        };
        const handleResize = () => {
            if (window.innerWidth >= 768) setIsVisible(true);
        };
        window.addEventListener('scroll', controlNavbar);
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('scroll', controlNavbar);
            window.removeEventListener('resize', handleResize);
        };
    }, [lastScrollY]);

    // ESC key closes menu
    useEffect(() => {
        const handleEscKey = (e) => e.key === 'Escape' && setIsMenuOpen(false);
        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
    }, []);

    // Lock body scroll when menu open and dispatch events
    useEffect(() => {
        if (isMenuOpen) {
            const prev = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            // Dispatch custom event to notify other components
            window.dispatchEvent(new CustomEvent('dialog-open'));
            return () => {
                document.body.style.overflow = prev;
                // Dispatch custom event when menu closes
                window.dispatchEvent(new CustomEvent('dialog-close'));
            };
        } else {
            // Dispatch close event when menu is closed
            window.dispatchEvent(new CustomEvent('dialog-close'));
        }
    }, [isMenuOpen]);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const menuVariants = {
        hidden: { opacity: 0, scale: 0.9, x: 20, y: -10 },
        visible: {
            opacity: 1,
            scale: 1,
            x: 0,
            y: 0,
            transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94], staggerChildren: 0.05 },
        },
        exit: { opacity: 0, scale: 0.9, x: 20, y: -10, transition: { duration: 0.2 } },
    };

    const linkVariants = {
        hidden: { opacity: 0, x: 15 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    };

    return (
        <>
            {/* Navbar Container */}
            <motion.nav
                className="fixed left-0 right-0 z-50 px-6 sm:px-8 py-3 sm:py-5 top-3 sm:top-5 md:top-6 transition-all duration-300"
                animate={{ y: isVisible ? 0 : -120, opacity: isVisible ? 1 : 0 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex items-center justify-between lg:max-w-[80%] mx-auto">
                    {/* Logo */}
                    <motion.div
                        className="text-2xl md:text-3xl font-bold text-lime-400"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Link to="/" className="block">
                            Vansh
                        </Link>
                    </motion.div>

                    {/* Menu Trigger */}
                    <motion.button
                        onClick={toggleMenu}
                        className="relative p-3 sm:p-2 group"
                        aria-label="Toggle menu"
                        aria-expanded={isMenuOpen}
                    >
                        <div className="relative w-7 h-5 flex flex-col justify-between">
                            <motion.div
                                className="h-0.5 bg-blue-600"
                                animate={{
                                    rotate: isMenuOpen ? 45 : 0,
                                    y: isMenuOpen ? 9 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.div
                                className="h-0.5 bg-blue-600"
                                animate={{
                                    rotate: isMenuOpen ? -45 : 0,
                                    y: isMenuOpen ? -9 : 0,
                                }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </motion.button>
                </div>
            </motion.nav>

            {/* Animated Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-sm"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                        />

                        {/* Menu Dialog */}
                        <motion.div
                            className="fixed top-[4.5rem] sm:top-[5.5rem] inset-x-4 sm:inset-x-6 md:right-8 md:left-auto z-50 bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 sm:p-8 w-auto sm:min-w-[280px] max-w-full max-h-[70vh] overflow-y-auto"
                            variants={menuVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            {/* Navigation Links */}
                            <motion.div
                                className="space-y-6 mb-8 text-center sm:text-left"
                                variants={menuVariants}
                                initial="hidden"
                                animate="visible"
                            >
                                {menuItems.map((item) => (
                                    <motion.div key={item.id} variants={linkVariants}>
                                        <Link
                                            to={item.href}
                                            onClick={() => setIsMenuOpen(false)}
                                            className={`block text-lg font-medium transition-colors duration-300 py-2 relative 
                        ${getActiveSection() === item.id
                                                    ? 'text-blue-700'
                                                    : 'text-blue-600 hover:text-blue-800'}
                      `}
                                        >
                                            {item.name}
                                            {/* Active underline animation */}
                                            {getActiveSection() === item.id && (
                                                <motion.span
                                                    layoutId="underline"
                                                    className="absolute lg:left-10 left-1/2 -translate-x-1/2 bottom-0 h-[2px] w-20 bg-blue-600 rounded-full"
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                ))}
                            </motion.div>

                            {/* Contact Section */}
                            <motion.div
                                className="border-t border-gray-100 pt-6 space-y-4 text-center sm:text-left"
                                variants={linkVariants}
                            >
                                <div className="text-xs font-medium text-gray-400 uppercase">
                                    Say Hello
                                </div>
                                <a  className="block text-sm text-blue-600 hover:text-blue-800">
                                    Vanshcodes01@gmail.com
                                </a>
                                <a href="https://www.linkedin.com/in/vansharora01/" className="block text-sm text-blue-600 hover:text-blue-800">
                                    linkedin/Vansharora01
                                </a>
                            </motion.div>

                            {/* Social Links */}
                            <motion.div
                                className="border-t border-gray-100 pt-4 mt-6 flex justify-center sm:justify-between gap-8"
                                variants={linkVariants}
                            >
                             
                            </motion.div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
