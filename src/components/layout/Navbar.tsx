import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'Productos', href: '#productos' },
    { name: 'Contacto', href: '#contacto' },
  ];

  const handleLinkClick = (href: string) => {
    setIsOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 300);
  };

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 bg-black/60 backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#inicio" className="text-white font-bold tracking-widest text-xl cursor-pointer">
          FLOEMA
        </a>
        
        {/* Menú Desktop */}
        <ul className="hidden md:flex gap-8">
          {links.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                className="text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-wider"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Botón hamburguesa - solo mobile */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Menú Mobile desplegable */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden flex flex-col bg-black/90 px-4 pb-4 gap-4"
          >
            {links.map((link) => (
              <li key={link.name}>
                <a 
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="block text-gray-300 hover:text-white transition-colors text-sm uppercase tracking-wider py-2 border-b border-white/10"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
/*         /*{/* Botón de acceso para la futura App */
        /*<a 
          href="#contacto" 
          className="hidden md:block px-5 py-2 bg-white text-black text-sm font-semibold rounded-full hover:bg-gray-200 transition-colors"
        >
          Ingresar
        </a>*/