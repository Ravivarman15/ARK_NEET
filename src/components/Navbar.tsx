import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaBook } from 'react-icons/fa';
import arkLogo from '@/assets/ark-logo.jpeg';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Programme', href: '#programme' },
    { label: 'Offline', href: '#offline' },
    { label: 'Online', href: '#online' },
    { label: 'Why ARK', href: '#why-ark' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-ark-blue/95 backdrop-blur-md shadow-lg' 
            : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
            {/* Desktop Navigation - Left */}
            <div className="hidden md:flex items-center gap-6 flex-1">
              {navLinks.slice(0, 3).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-ark-white/90 hover:text-ark-yellow transition-colors font-medium text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button - Left on mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden text-ark-white p-2"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>

            {/* Logo - Centered */}
            <a href="#" className="flex items-center gap-3 absolute left-1/2 -translate-x-1/2">
              <img 
                src={arkLogo} 
                alt="ARK Learning Arena" 
                className="h-12 md:h-[60px] lg:h-[72px] w-auto rounded"
              />
            </a>

            {/* Desktop Navigation - Right */}
            <div className="hidden md:flex items-center gap-6 flex-1 justify-end">
              {navLinks.slice(3).map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-ark-white/90 hover:text-ark-yellow transition-colors font-medium text-sm"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#free-books"
                className="btn-primary inline-flex items-center gap-2 text-sm"
              >
                <FaBook className="text-base" />
                Get Free Books
              </a>
            </div>

            {/* Mobile CTA - Right on mobile */}
            <a
              href="#free-books"
              className="md:hidden btn-primary inline-flex items-center gap-2 text-xs px-3 py-2"
            >
              <FaBook className="text-sm" />
              Free Books
            </a>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-ark-blue/98 backdrop-blur-lg md:hidden border-t border-ark-white/10"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-ark-white/90 hover:text-ark-yellow transition-colors font-medium py-2 border-b border-ark-white/10"
                  >
                    {link.label}
                  </a>
                ))}
                <a
                  href="#free-books"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="btn-primary inline-flex items-center justify-center gap-2 mt-4"
                >
                  <FaBook />
                  Get Free Books
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
