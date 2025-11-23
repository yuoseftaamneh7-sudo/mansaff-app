import React, { useState, useEffect, useRef } from 'react';
import { Menu, ShoppingBag, UtensilsCrossed, Facebook, Instagram, X } from 'lucide-react';

interface NavbarProps {
  onOpenOrder: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenOrder }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-40 transition-all duration-300 ${scrolled ? 'bg-zinc-950/90 backdrop-blur-md shadow-lg py-2 border-b border-zinc-800' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-amber-600 p-2 rounded-full text-white shadow-lg shadow-amber-600/20">
            <UtensilsCrossed size={24} />
          </div>
          <span className={`text-2xl font-bold text-white tracking-tighter`}>
            مطبخ <span className="text-amber-500">أبو محمد</span>
          </span>
        </div>

        <div className="hidden md:flex gap-8 font-semibold text-lg text-zinc-300">
          <button onClick={() => scrollToSection('home')} className="hover:text-amber-500 transition-colors">الرئيسية</button>
          <button onClick={() => scrollToSection('story')} className="hover:text-amber-500 transition-colors">من نحن</button>
        </div>

        <button 
          onClick={onOpenOrder}
          className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-md shadow-amber-600/20"
        >
          <ShoppingBag size={18} />
          <span className="hidden sm:inline">اطلب الآن</span>
        </button>

        {/* Mobile Menu & Social Links Dropdown */}
        <div className="md:hidden relative" ref={menuRef}>
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white p-2 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Dropdown Menu - Changed left-0 to end-0 for better RTL support */}
          {isMenuOpen && (
            <div className="absolute top-full end-0 mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-50">
               <div className="p-2 space-y-1">
                  <a 
                    href="https://www.facebook.com/share/19K8Cb8Kwd/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 text-zinc-200 hover:bg-blue-900/20 hover:text-blue-400 rounded-lg transition-all group"
                  >
                    <Facebook size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="font-bold">تابعنا على فيسبوك</span>
                  </a>
                  
                  <a 
                    href="https://www.instagram.com/mansaf.abu?igsh=eGVzemgzcnN6NTNq" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 px-4 py-3 text-zinc-200 hover:bg-pink-900/20 hover:text-pink-500 rounded-lg transition-all group"
                  >
                    <Instagram size={20} className="group-hover:scale-110 transition-transform" />
                    <span className="font-bold">تابعنا على انستغرام</span>
                  </a>
               </div>
               
               {/* Mobile Navigation Links inside dropdown for better UX */}
               <div className="border-t border-zinc-800 p-2 bg-zinc-950/50">
                  <button 
                    onClick={() => scrollToSection('home')} 
                    className="w-full text-right block px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    الرئيسية
                  </button>
                  <button 
                    onClick={() => scrollToSection('story')} 
                    className="w-full text-right block px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                  >
                    من نحن
                  </button>
               </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;