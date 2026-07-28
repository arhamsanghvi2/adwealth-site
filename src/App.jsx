import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Careers from './pages/Careers';

// Helper component to reset scroll position on page navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

// Top scroll indicator progress bar
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-black origin-left z-[60]"
      style={{ scaleX }}
    />
  );
}

// Circular progress Back to Top button
function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.5,
        y: isVisible ? 0 : 20
      }}
      onClick={scrollToTop}
      className="fixed bottom-8 right-8 z-50 group cursor-pointer focus:outline-none"
    >
      <div className="relative flex items-center justify-center p-4 bg-white rounded-full shadow-2xl border border-neutral-100 hover:bg-black transition-colors duration-500">
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <motion.circle
            cx="50%"
            cy="50%"
            r="44%"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-neutral-200"
          />
          <motion.circle
            cx="50%"
            cy="50%"
            r="44%"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            style={{ pathLength: scrollYProgress }}
            className="text-black group-hover:text-white"
          />
        </svg>
        <ArrowRight className="-rotate-90 text-black group-hover:text-white transition-colors duration-500" size={20} />
      </div>
    </motion.button>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ScrollProgress />
      
      <div className="min-h-screen bg-white text-black flex flex-col justify-between selection:bg-black selection:text-white">
        {/* Navbar */}
        <Navbar />
        
        {/* Main Content Area */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/careers" element={<Careers />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Circular scroll Back to Top */}
        <BackToTop />
      </div>
    </Router>
  );
}

export default App;
