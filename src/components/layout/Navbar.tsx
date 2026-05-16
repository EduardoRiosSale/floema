import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Colección', href: '#productos' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/8 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#inicio"
          className="text-white tracking-[0.35em] text-base font-light cursor-pointer"
          style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', letterSpacing: '0.4em' }}
        >
          FLOEMA
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-10 items-center">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="relative text-white/60 hover:text-white transition-colors duration-300 text-xs uppercase tracking-widest group"
              >
                {link.name}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* CTA Tienda */}
        <a
          href="#productos"
          className="hidden md:flex items-center gap-2 px-5 py-2 border border-gold/50 text-gold hover:bg-gold hover:text-black transition-all duration-400 text-xs tracking-widest uppercase rounded-sm"
        >
          Tienda
        </a>

        {/* Hamburguesa mobile */}
        <button
          className="md:hidden text-white/70 hover:text-white transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95 backdrop-blur-xl border-t border-white/5"
          >
            <ul className="flex flex-col px-6 py-6 gap-5">
              {links.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleLinkClick(link.href); }}
                    className="block text-white/60 hover:text-white transition-colors text-sm uppercase tracking-widest py-2 border-b border-white/5"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#productos"
                  className="inline-block mt-2 px-5 py-2 border border-gold/50 text-gold text-xs tracking-widest uppercase"
                >
                  Tienda
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
