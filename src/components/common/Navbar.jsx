import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll detection for glass background intensity
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const handleContactClick = (e) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/?scroll=contact');
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Product', path: '/product/corporate-action' },
    { name: 'Careers', path: '/careers' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-md border-b border-neutral-200/50 py-4 shadow-sm'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center relative">
        {/* Logo */}
        <Link to="/" className="flex items-center group">
          <img 
            src="/ADWealth_logo.png" 
            alt="ADWealth Logo" 
            className="h-16 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 md:absolute md:left-1/2 md:-translate-x-1/2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`font-sans text-sm tracking-wide transition-all duration-200 relative py-1 focus:outline-none ${
                  isActive
                    ? 'text-black font-semibold border-b-2 border-black'
                    : 'text-neutral-500 hover:text-black'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <a
            href="#contact"
            onClick={handleContactClick}
            className="font-sans text-sm tracking-wide text-neutral-500 hover:text-black transition-all duration-200"
          >
            Contact
          </a>
        </div>



        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="block md:hidden focus:outline-none transition-colors text-black hover:text-neutral-600"
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`md:hidden fixed top-[73px] left-0 w-full backdrop-blur-lg transition-all duration-300 ease-in-out ${
          isOpen ? 'opacity-100 translate-y-0 h-screen' : 'opacity-0 -translate-y-4 pointer-events-none h-0'
        } bg-white/95 border-b border-neutral-200/50`}
      >
        <div className="flex flex-col px-8 py-12 gap-8">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`font-sans text-lg tracking-wide ${
                  isActive ? 'text-black font-semibold' : 'text-neutral-500'
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <a
            href="#contact"
            onClick={handleContactClick}
            className="font-sans text-lg tracking-wide text-neutral-500"
          >
            Contact
          </a>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
