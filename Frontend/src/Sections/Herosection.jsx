import React from 'react';
import { motion } from 'framer-motion';
import Me from '../assets/Me-1.jpg'

const HeroSection = () => {
    return (
        
        <div className="relative min-h-screen flex items-center">

            
            {/* Split Background */}
            <div className="absolute inset-0 flex flex-col lg:flex-row">
                <div className="flex-1 lg:w-1/2 bg-[#4338CA]"></div>
                <div className="flex-1 lg:w-1/2 bg-[#D9F99D]"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-7xl sm:px-10 mx-auto px-6  md:px-8 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                    {/* Left Side - Text Content */}
                    <motion.div
                        className="text-white relative space-y-4 -mt-20 mb-30 sm:space-y-6 lg:space-y-8 px-4 sm:px-6 lg:py-10 lg:top-20"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        {/* Left Side Decorative Elements */}

                        {/* Dot Grid Pattern - Top Left Corner */}
                        <motion.div
                            className="absolute -top-12 -left-6 sm:-top-16 sm:-left-8 lg:-left-16 w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.8, duration: 0.6 }}
                        >
                            <div className="grid grid-cols-3 lg:grid-cols-4 gap-[2px] lg:gap-1">
                                {[...Array(12)].map((_, i) => (
                                    <div key={i} className="w-0.5 h-0.5 sm:w-0.5 sm:h-0.5 lg:w-1 lg:h-1 bg-white/30 rounded-full"></div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Curvy Squiggly Line - Near Heading */}
                        <motion.div
                            className="absolute -top-2 -right-4 sm:-top-4 sm:-right-8 lg:-right-16"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 2.0, duration: 0.6 }}
                        >
                            <svg width="40" height="64" viewBox="0 0 50 80" fill="none" className="scale-75 sm:scale-75 lg:scale-100">
                                <path
                                    d="M10 5 Q30 15, 20 35 Q5 55, 40 70"
                                    stroke="white"
                                    strokeWidth="1"
                                    fill="none"
                                    strokeOpacity="0.4"
                                />
                            </svg>
                        </motion.div>

                        {/* Thin Outlined Circle - Near Bottom Text */}
                        <motion.div
                            className="absolute bottom-6 -left-10 sm:bottom-8 sm:-left-12 lg:-left-20 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full border border-white/30"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 2.2, duration: 0.6 }}
                        ></motion.div>

                        {/* Main Heading */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="relative z-10"
                        >
                            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight">
                                <span className="text-[#D9F99D]">Full Stack</span>
                                <br />
                                Developer.
                            </h1>
                        </motion.div>

                        {/* Subtext */}
                        <motion.p
                            className="relative z-10 text-base sm:text-lg lg:text-xl text-white/90 max-w-prose leading-relaxed"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            I like to craft solid and scalable web apps & SaaS products with great user experiences.
                        </motion.p>

                        {/* Two Column Highlights */}
                        <motion.div
                            className="relative z-10 flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8 pt-2 sm:pt-4 lg:pt-8"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.8 }}
                        >
                            <div className="space-y-2">
                                <p className="text-[#D9F99D] font-medium text-sm sm:text-base">
                                    Skilled at frontend, backend & UI engineering.
                                </p>
                            </div>
                            <div className="space-y-2">
                                <p className="text-[#D9F99D] font-medium text-sm sm:text-base">
                                    Experience building products for clients & startups.
                                </p>
                            </div>
                        </motion.div>
                    </motion.div>   

                    {/* Right Side - Image and Decorations */}
                    <div className="relative flex justify-center lg:justify-end mt-8 lg:mt-0">
                        {/* Main Image Container */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                        >
                            {/* Image */}
                            <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96">
                                <div className="w-full h-full bg-gray-200 rounded-lg shadow-2xl overflow-hidden border-4 border-white">
                                    <img
                                        src={Me}
                                        alt="Profile"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDQwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxjaXJjbGUgY3g9IjIwMCIgY3k9IjE2MCIgcj0iNDAiIGZpbGw9IiM5Q0EzQUYiLz4KPHBhdGggZD0iTTEyMCAzMDBDMTIwIDI2MC4yIDEzNS44IDIyNCAyMDAgMjI0QzI2NC4yIDIyNCAyODAgMjYwLjIgMjgwIDMwMFYzMjBIMTIwVjMwMFoiIGZpbGw9IiM5Q0EzQUYiLz4KPC9zdmc+';
                                        }}
                                    />
                                </div>
                            </div>

                            {/* Decorative Elements */}

                            {/* Dot Grid Pattern - Top Right */}
                            <motion.div
                                className="absolute -top-6 -right-6 sm:-top-8 sm:-right-8 w-14 h-14 sm:w-16 sm:h-16"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8, duration: 0.6 }}
                            >
                                <div className="grid grid-cols-4 gap-[2px] sm:gap-1">
                                    {[...Array(16)].map((_, i) => (
                                        <div key={i} className="w-1 h-1 bg-indigo-900/70 rounded-full"></div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Curvy Line - Left Side */}
                            <motion.div
                                className="absolute -left-10 sm:-left-12 top-1/4"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 1.0, duration: 0.6 }}
                            >
                                <svg width="32" height="48" viewBox="0 0 40 60" fill="none" className="sm:w-[40px] sm:h-[60px]">
                                    <path
                                        d="M5 10 Q20 5, 15 25 Q10 45, 35 50"
                                        stroke="#1e1b4b"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeOpacity="0.7"
                                    />
                                </svg>
                            </motion.div>

                            {/* Stair-step Line - Bottom */}
                            <motion.div
                                className="absolute -bottom-6 sm:-bottom-8 left-1/4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.2, duration: 0.6 }}
                            >
                                <svg width="48" height="24" viewBox="0 0 60 30" fill="none" className="sm:w-[60px] sm:h-[30px]">
                                    <path
                                        d="M0 25 L10 25 L10 20 L20 20 L20 15 L30 15 L30 10 L40 10 L40 5 L50 5"
                                        stroke="#1e1b4b"
                                        strokeWidth="2"
                                        fill="none"
                                        strokeOpacity="0.7"
                                    />
                                </svg>
                            </motion.div>

                            {/* Square Outline - Bottom Right */}
                            <motion.div
                                className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-16 h-16 sm:w-20 sm:h-20 border border-indigo-900/70"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 1.4, duration: 0.6 }}
                            ></motion.div>

                            {/* Additional Small Diamonds */}
                            <motion.div
                                className="absolute top-6 -right-12 sm:top-8 sm:-right-16 space-y-2"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.6, duration: 0.6 }}
                            >
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-900/70 rotate-45"></div>
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-900/70 rotate-45"></div>
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-900/70 rotate-45"></div>
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-indigo-900/70 rotate-45"></div>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;