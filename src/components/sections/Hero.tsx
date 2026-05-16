import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { SpiralAnimation } from '../ui/SpiralAnimation';

import logoFloema from '../../assets/floema.png';

const WORDS = ['FLUIDO URBANO', 'CULTURA DE CALLE', 'ENERGÍA VITAL'];

const TypeAnimate = () => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = WORDS[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else {
      setDeleting(false);
      setIndex((i) => (i + 1) % WORDS.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, deleting, index]);

  return (
    <span>
      {displayed}
      <span className="animate-pulse text-gold">|</span>
    </span>
  );
};

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
});

export const Hero = () => {
  return (
    <section id="inicio" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-black">

      {/* SpiralAnimation — fondo full-screen */}
      <div className="absolute inset-0 z-0">
        <SpiralAnimation />
      </div>

      {/* Overlay para oscurecer y que el contenido se lea bien */}
      <div className="absolute inset-0 z-[2] bg-black/55 pointer-events-none" />
      <div className="absolute inset-0 z-[2] bg-gradient-to-b from-black/40 via-transparent to-black/70 pointer-events-none" />

      {/* Contenido */}
      <div className="relative z-[3] w-full flex flex-col items-center text-center px-6 max-w-4xl mx-auto">

        {/* Logo */}
        <motion.img
          src={logoFloema}
          alt="Floema"
          className="w-36 md:w-52 mb-10 mix-blend-screen"
          style={{ filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.8))' }}
          {...fadeUp(0.2)}
        />

        {/* Bloque de texto */}
        <div className="px-8 py-6 rounded-sm bg-black/20 backdrop-blur-[2px]">
          <motion.h1
            {...fadeUp(0.5)}
            className="text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-[0.15em] mb-5 uppercase min-h-[1.2em]"
            style={{
              fontFamily: 'var(--font-heading)',
              textShadow: '0 2px 20px rgba(0,0,0,0.9), 0 0 40px rgba(0,0,0,0.6)',
            }}
          >
            <TypeAnimate />
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="w-16 h-px bg-gold mb-6 mx-auto"
          />

          <motion.p
            {...fadeUp(0.9)}
            className="text-white/80 text-sm md:text-base max-w-md tracking-wider leading-relaxed uppercase"
            style={{ textShadow: '0 2px 12px rgba(0,0,0,0.95)' }}
          >
            Llevando la esencia de la calle a cada rincón de la ciudad
          </motion.p>
        </div>

        {/* CTAs */}
        <motion.div {...fadeUp(1.1)} className="flex flex-col sm:flex-row gap-4 mt-10">
          <motion.a
            href="#productos"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-3.5 bg-gold text-black text-xs font-medium uppercase tracking-[0.2em] hover:bg-gold-light transition-colors duration-300"
          >
            Ver Colección
          </motion.a>
          <motion.a
            href="#nosotros"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="px-10 py-3.5 border border-white/30 text-white/70 hover:text-white hover:border-white/60 text-xs uppercase tracking-[0.2em] transition-all duration-300"
          >
            Nuestra Historia
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-white/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ArrowDown className="w-3.5 h-3.5 text-gold/60" />
        </motion.div>
      </motion.div>
    </section>
  );
};
