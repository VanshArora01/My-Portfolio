import React from "react";

const Sections = () => {
    return (
        <section className="w-full min-h-screen -mt-20 bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 relative overflow-hidden">
            <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20">
                {/* Design Section */}
                <div className="relative flex flex-col items-center md:items-start text-center md:text-left md:translate-y-[-70px]">
                    {/* Circle Decoration - Hidden on mobile */}
                    <div className="absolute -top-10 -left-16 w-40 h-40 border-2 -z-10 border-lime-300 rounded-full hidden md:block"></div>

                    {/* Dot Grid - Hidden on mobile */}
                    <div className="absolute top-0 -right-32 grid grid-cols-6 gap-2 opacity-70 hidden lg:grid">
                        {Array.from({ length: 36 }).map((_, i) => (
                            <span
                                key={i}
                                className="w-1 h-1 bg-lime-400 rounded-full inline-block"
                            ></span>
                        ))}
                    </div>

                    {/* Horizontal dots - Hidden on mobile */}
                    <div className="flex space-x-3 mb-6 hidden md:flex">
                        {[1, 2, 3, 4, 5].map((dot, i) => (
                            <span
                                key={i}
                                className="w-3 h-3 border-2 border-purple-600 rounded-full transition"
                            ></span>
                        ))}
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold z-50 text-purple-700 mb-4 sm:mb-6 leading-snug">
                        Developing
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-md mx-auto md:mx-0">
                        I might not be a traditional designer working in Figma all day, but I design through code — crafting clean layouts, smooth interactions, and intuitive user experiences. My goal is to build interfaces that not only look good but also feel right to use.
                    </p>
                </div>

                {/* Engineering Section */}
                <div className="relative flex flex-col items-center md:items-start text-center md:text-left md:translate-y-[90px]">
                    {/* Dotted decoration - Hidden on mobile */}
                    <div className="absolute top-60 -right-32 grid grid-cols-6 gap-3 opacity-70 hidden lg:grid">
                        {Array.from({ length: 36 }).map((_, i) => (
                            <span
                                key={i}
                                className="w-1 h-1 bg-purple-400 rounded-full inline-block"
                            ></span>
                        ))}
                    </div>

                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-purple-700 mb-4 sm:mb-6 leading-snug">
                        Engineering
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed max-w-md mx-auto md:mx-0">
                        In building JavaScript applications, I'm equipped with just the
                        right tools, and can absolutely function independently of them to
                        deliver fast, resilient solutions optimized for scale — performance
                        and scalability are priorities on my radar.
                    </p>
                </div>
            </div>

            {/* Stairs Decoration - Hidden on mobile */}
            <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 hidden md:block">
                <div className="flex flex-col space-y-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <div
                            key={i}
                            className="w-6 h-1 bg-purple-600"
                            style={{ marginLeft: `${6 * i}px` }}
                        ></div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Sections;