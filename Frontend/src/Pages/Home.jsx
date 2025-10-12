import React, { useEffect, useRef, useState } from 'react'
import Herosection from '../Sections/Herosection'
import Navbar from '../Components/Navbar'
import Section2 from '../Sections/Section2'
import Section3 from '../Sections/Section3'
import Section4 from '../Sections/Section4'
import Footer from '../Components/Footer'

// Clean section indicator without magnetic effects

const Home = () => {
    const containerRef = useRef(null)
    const [currentSection, setCurrentSection] = useState(0)
    const [isScrolling, setIsScrolling] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const sections = 5
    let scrollTimeout = useRef(null)

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener('resize', checkMobile)
        return () => window.removeEventListener('resize', checkMobile)
    }, [])

    // Monitor for dialog/modal elements in the DOM
    useEffect(() => {
        const checkForDialog = () => {
            // Check for common dialog/modal selectors
            const dialogs = document.querySelectorAll(
                'dialog[open], [role="dialog"], [role="alertdialog"], .modal, .dialog-overlay, [data-dialog], [data-modal]'
            )
            setIsDialogOpen(dialogs.length > 0)
        }

        // Initial check
        checkForDialog()

        // Use MutationObserver to watch for dialog elements being added/removed
        const observer = new MutationObserver(checkForDialog)

        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['open', 'data-state', 'class']
        })

        // Also listen for specific events that might indicate dialog state changes
        const handleDialogOpen = () => setIsDialogOpen(true)
        const handleDialogClose = () => setIsDialogOpen(false)

        window.addEventListener('dialog-open', handleDialogOpen)
        window.addEventListener('dialog-close', handleDialogClose)

        return () => {
            observer.disconnect()
            window.removeEventListener('dialog-open', handleDialogOpen)
            window.removeEventListener('dialog-close', handleDialogClose)
        }
    }, [])

    // Custom smooth scroll with easing animation
    const smoothScrollTo = (targetPosition, duration = 1000) => {
        if (!containerRef.current || isMobile) return

        const container = containerRef.current
        const startPosition = container.scrollTop
        const distance = targetPosition - startPosition
        const startTime = performance.now()

        // Custom easing function for gradual acceleration/deceleration
        const easeInOutCubic = (t) => {
            return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
        }

        const animateScroll = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easedProgress = easeInOutCubic(progress)

            container.scrollTop = startPosition + distance * easedProgress

            if (progress < 1) {
                requestAnimationFrame(animateScroll)
            }
        }

        requestAnimationFrame(animateScroll)
    }

    // Scroll to section with custom animation
    const scrollToSection = (sectionIndex) => {
        if (!containerRef.current || isMobile) return

        const targetPosition = sectionIndex * window.innerHeight
        smoothScrollTo(targetPosition, 800)
    }

    // Handle wheel event for smooth section navigation
    useEffect(() => {
        if (isMobile) return

        const handleWheel = (e) => {
            e.preventDefault()

            // Clear any existing timeout
            if (scrollTimeout.current) {
                clearTimeout(scrollTimeout.current)
            }

            // Longer debounce for more controlled scrolling
            scrollTimeout.current = setTimeout(() => {
                if (isScrolling) return

                setIsScrolling(true)

                const delta = e.deltaY
                let newSection = currentSection

                // Only trigger on more significant scroll movements
                if (Math.abs(delta) > 10) {
                    if (delta > 0 && currentSection < sections - 1) {
                        newSection = currentSection + 1
                    } else if (delta < 0 && currentSection > 0) {
                        newSection = currentSection - 1
                    }
                }

                if (newSection !== currentSection) {
                    setCurrentSection(newSection)
                    scrollToSection(newSection)
                }

                // Longer cooldown for eye-soothing experience
                setTimeout(() => {
                    setIsScrolling(false)
                }, 1400)

            }, 100)
        }

        const container = containerRef.current
        if (container) {
            container.addEventListener('wheel', handleWheel, { passive: false })

            return () => {
                container.removeEventListener('wheel', handleWheel)
                if (scrollTimeout.current) {
                    clearTimeout(scrollTimeout.current)
                }
            }
        }
    }, [currentSection, isScrolling, isMobile])

    return (
        <>
            <style jsx>{`
                /* Hide scrollbar */
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                
                /* Premium glassmorphism effects */
                @supports (backdrop-filter: blur(10px)) {
                    .backdrop-blur-md {
                        backdrop-filter: blur(12px);
                    }
                    .backdrop-blur-sm {
                        backdrop-filter: blur(4px);
                    }
                }
                
                /* Diamond and Square Navigation Styles */
                .nav-dot {
                    width: 12px;
                    height: 12px;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                    position: relative;
                }
                
                /* Diamond shape (inactive state) */
                .nav-dot.diamond {
                    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #06b6d4 100%);
                    transform: rotate(45deg);
                    border-radius: 2px;
                    box-shadow: 0 2px 8px rgba(99, 102, 241, 0.3);
                }
                
                /* Square shape (active state) */
                .nav-dot.square {
                    background: White;
                    transform: rotate(0deg);
                    border-radius: 50%;
                    box-shadow: 0 4px 12px rgba(255, 255, 255, 0.4);
                }
                
                /* Hover effects */
                .nav-dot.diamond:hover {
                    background: linear-gradient(135deg, #818cf8 0%, #a78bfa 50%, #22d3ee 100%);
                    transform: rotate(45deg) scale(1.15);
                    box-shadow: 0 4px 16px rgba(99, 102, 241, 0.5);
                }
                
                .nav-dot.square:hover {
                    background: #f8fafc;
                    transform: rotate(0deg) scale(1.1);
                    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.6);
                }
                
                /* Enhanced shadow effects */
                .enhanced-shadow {
                    filter: drop-shadow(0 10px 20px rgba(59, 130, 246, 0.2));
                }

                /* Navigation z-index transition */
                .nav-container {
                    transition: z-index 0s, opacity 0.3s ease-in-out;
                }

                .nav-container.behind-dialog {
                    z-index: 10 !important;
                    opacity: 0.3;
                    pointer-events: none;
                }
            `}</style>

            <Navbar className="z-50" />

            {/* Scrollable container - preserving original layout */}
            <div
                ref={containerRef}
                className={`h-screen w-full no-scrollbar ${isMobile ? 'overflow-y-scroll scroll-smooth' : 'overflow-y-scroll'
                    }`}
            >
                <section className="h-screen">
                    <Herosection />
                </section>

                <section className={`${isMobile ? 'min-h-screen' : 'h-screen'} ${isMobile ? 'py-8' : 'mt-19'}`}>
                    <Section2 />
                </section>

                <section className={`${isMobile ? 'min-h-screen' : 'h-screen'}`}>
                    <Section3 />
                </section>

                <section className={`${isMobile ? 'min-h-screen' : 'h-screen'}`}>
                    <Section4 />
                </section>

                <section>
                    <Footer />
                </section>
            </div>

            {/* Diamond/Square Navigation Dots */}
            {!isMobile && (
                <div
                    className={`fixed right-8 top-[47%] transform -translate-y-1/2 nav-container ${isDialogOpen ? 'behind-dialog' : 'z-30'
                        }`}
                >
                    {/* Navigation container with subtle backdrop */}
                    <div className="relative bg-black/10 backdrop-blur-sm rounded-full p-4 border border-white/10">
                        <ul className="flex flex-col gap-4 list-none m-0 p-0">
                            {Array.from({ length: sections }).map((_, index) => (
                                <li key={index}>
                                    <button
                                        onClick={() => {
                                            if (!isScrolling && !isDialogOpen) {
                                                setIsScrolling(true)
                                                setCurrentSection(index)
                                                scrollToSection(index)
                                                setTimeout(() => setIsScrolling(false), 1400)
                                            }
                                        }}
                                        className="relative group focus:outline-none p-2 transition-all duration-300 hover:bg-white/5 rounded-full flex items-center justify-center"
                                        aria-label={`Go to section ${index + 1}`}
                                        disabled={isDialogOpen}
                                    >
                                        {/* Navigation dot with dynamic styling */}
                                        <div
                                            className={`nav-dot ${currentSection === index ? 'square' : 'diamond'
                                                }`}
                                        />
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {/* Progress indicator */}
                        <div className="absolute left-2 top-4 bottom-4 w-0.5 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="w-full bg-gradient-to-b from-indigo-400 via-purple-500 to-cyan-400 transition-all duration-1000 ease-out rounded-full"
                                style={{
                                    height: `${((currentSection + 1) / sections) * 100}%`,
                                    boxShadow: '0 0 8px rgba(139, 92, 246, 0.6)'
                                }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Home