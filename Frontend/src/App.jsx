import { useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ClickSpark from './Components/ClickSpark';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Home from './Pages/Home';
import Work from './Pages/Work';
import Resume from './Pages/Resume';
import AssistantPage from './Pages/Assistant';
import ScrollToTop from './Components/ScrollToTop';
import './App.css';

const AppContent = ({ dotRef, ringRef }) => {
  const location = useLocation();
  const hideFooter = location.pathname === '/terminal';

  return (
    <ClickSpark sparkColor='#00FF87' sparkSize={8} sparkRadius={20} sparkCount={8} duration={500}>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/terminal" element={<AssistantPage />} />
      </Routes>
      {!hideFooter && <Footer />}
    </ClickSpark>
  );
};

function App() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const moveCursor = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', moveCursor);

    let raf;
    const lerp = (a, b, t) => a + (b - a) * t;
    const animateRing = () => {
      ringPos.current.x = lerp(ringPos.current.x, mousePos.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, mousePos.current.y, 0.12);
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px';
        ringRef.current.style.top = ringPos.current.y + 'px';
      }
      raf = requestAnimationFrame(animateRing);
    };
    raf = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <Router>
      <AppContent dotRef={dotRef} ringRef={ringRef} />
    </Router>
  );
}

export default App;
