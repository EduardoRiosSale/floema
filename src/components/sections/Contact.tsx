import { motion } from 'framer-motion';
import { Mail, MapPin } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

const whatsappNumber = '5491168296741';
const whatsappMessage = '¡Hola! Me contacto desde la web de Floema.';
const whatsappHref = `whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, delay },
});

export const Contact = () => {
  return (
    <footer id="contacto" className="bg-obsidian border-t border-white/5">

      {/* Franja superior de contacto */}
      <div className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Marca */}
          <motion.div {...fadeUp(0)} className="md:col-span-1">
            <p
              className="text-white tracking-[0.4em] text-base mb-4 font-light"
              style={{ fontFamily: 'var(--font-heading)', letterSpacing: '0.35em' }}
            >
              FLOEMA
            </p>
            <div className="w-8 h-px bg-gold mb-5" />
            <p className="text-white/30 text-xs leading-relaxed">
              Diseñamos el flujo. Vestimos la energía de quienes nunca se detienen. De Mataderos para todo el mundo.
            </p>
          </motion.div>

          {/* Navegación */}
          <motion.div {...fadeUp(0.1)}>
            <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-5">Navegación</p>
            <ul className="flex flex-col gap-3">
              {['Inicio', 'Nosotros', 'Colección', 'Videos'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item === 'Inicio' ? 'inicio' : item === 'Nosotros' ? 'nosotros' : item === 'Colección' ? 'productos' : 'videos'}`}
                    className="text-white/40 hover:text-white text-xs uppercase tracking-widest transition-colors duration-300"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contacto */}
          <motion.div {...fadeUp(0.2)}>
            <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-5">Contacto</p>
            <ul className="flex flex-col gap-4">
              <li>
                <a
                  href="mailto:floema.urbano@gmail.com"
                  className="flex items-center gap-3 text-white/40 hover:text-white transition-colors text-xs"
                >
                  <Mail className="w-3.5 h-3.5 text-gold/60" />
                  floema.urbano@gmail.com
                </a>
              </li>
              <li>
                <a
                  href={whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-white/40 hover:text-green-400 transition-colors text-xs"
                >
                  <FaWhatsapp className="w-3.5 h-3.5 text-gold/60" />
                  +54 11 6829‑6741
                </a>
              </li>
              <li className="flex items-center gap-3 text-white/40 text-xs">
                <MapPin className="w-3.5 h-3.5 text-gold/60" />
                Mataderos, Buenos Aires
              </li>
            </ul>
          </motion.div>

          {/* Redes */}
          <motion.div {...fadeUp(0.3)}>
            <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-5">Seguinos</p>
            <div className="flex flex-col gap-4">
              <motion.a
                href="https://www.instagram.com/floema_urbanoskater"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-sm border border-white/10 group-hover:border-pink-500/50 flex items-center justify-center transition-colors">
                  <FaInstagram className="w-3.5 h-3.5 group-hover:text-pink-400 transition-colors" />
                </div>
                <span className="text-xs tracking-widest uppercase">Instagram</span>
              </motion.a>

              <motion.a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group"
              >
                <div className="w-8 h-8 rounded-sm border border-white/10 group-hover:border-green-500/50 flex items-center justify-center transition-colors">
                  <FaWhatsapp className="w-3.5 h-3.5 group-hover:text-green-400 transition-colors" />
                </div>
                <span className="text-xs tracking-widest uppercase">WhatsApp</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Franja inferior */}
      <div className="border-t border-white/5 px-6 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3 text-white/20 text-[11px]">
          <p>© {new Date().getFullYear()} Floema. Todos los derechos reservados.</p>
          <div className="w-8 h-px bg-gold/20 hidden md:block" />
          <p>
            Desarrollado por{' '}
            <a
              href="https://www.linkedin.com/in/eduardo-rios-sale/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 hover:text-gold transition-colors border-b border-transparent hover:border-gold/40"
            >
              Eduardo Rios
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
