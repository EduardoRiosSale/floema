import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import 'swiper/css/bundle';

import img1 from '../../assets/img1.jpeg';
import img2 from '../../assets/img2.jpeg';
import img3 from '../../assets/img3.jpeg';
import img4 from '../../assets/img4.jpeg';
import img5 from '../../assets/img5.jpeg';
import img6 from '../../assets/img6.jpeg';
import img7 from '../../assets/img7.jpeg';
import img8 from '../../assets/img8.jpeg';
import img9 from '../../assets/img9.jpeg';
import img10 from '../../assets/img10.jpeg';
import img11 from '../../assets/img11.jpeg';
import img12 from '../../assets/img12.jpeg';

const productos = [
  { id: 1,  title: 'Remera Oversize',             categoria: 'Remeras',      image: img1  },
  { id: 2,  title: 'Remera Over Blanca',          categoria: 'Remeras',      image: img2  },
  { id: 3,  title: 'Espalda',                     categoria: 'Remeras Over', image: img3  },
  { id: 4,  title: 'Remera Over Blanca Diseño',   categoria: 'Remeras',      image: img4  },
  { id: 5,  title: 'Hoodie Dark',                 categoria: 'Buzos',        image: img5  },
  { id: 6,  title: 'Hoja Floema',                 categoria: 'Remeras Over', image: img6  },
  { id: 7,  title: 'Tee Mataderos',               categoria: 'Remeras',      image: img7  },
  { id: 8,  title: 'Remera Over Black',           categoria: 'Remeras',      image: img8  },
  { id: 9,  title: 'Remera Over',                 categoria: 'Remeras Over', image: img9  },
  { id: 10, title: 'Gorras Floema Gris/Negra',    categoria: 'Gorras',       image: img10 },
  { id: 11, title: 'Buzo Vital',                  categoria: 'Buzos',        image: img11 },
  { id: 12, title: 'Camiseta Pulso',              categoria: 'Remeras',      image: img12 },
];

// ── Lightbox ──────────────────────────────────────────────────────────────────

interface LightboxProps {
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

const Lightbox = ({ index, onClose, onPrev, onNext }: LightboxProps) => {
  const prod = productos[index];

  // Teclado
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  return (
    <motion.div
      key="lightbox-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md"
      onClick={onClose}
    >
      {/* Cerrar */}
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 w-10 h-10 rounded-sm border border-white/10 bg-black/60 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Contador */}
      <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/30 text-xs tracking-[0.3em] uppercase">
        {index + 1} / {productos.length}
      </div>

      {/* Flecha izquierda */}
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 z-10 w-11 h-11 rounded-sm border border-white/10 bg-black/60 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/40 transition-all"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Imagen con animación */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="relative max-h-[85vh] max-w-[85vw] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={prod.image}
            alt={prod.title}
            className="max-h-[78vh] max-w-[80vw] object-contain rounded-sm"
            style={{ boxShadow: '0 0 60px rgba(0,0,0,0.8)' }}
          />
          {/* Info debajo */}
          <div className="mt-4 text-center">
            <p className="text-gold/60 text-[10px] tracking-[0.35em] uppercase mb-1">{prod.categoria}</p>
            <p className="text-white/70 text-sm tracking-wide" style={{ fontFamily: 'var(--font-heading)' }}>
              {prod.title}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Flecha derecha */}
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 z-10 w-11 h-11 rounded-sm border border-white/10 bg-black/60 flex items-center justify-center text-white/60 hover:text-gold hover:border-gold/40 transition-all"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Miniaturas en el fondo */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5">
        {productos.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'bg-gold w-4' : 'bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </motion.div>
  );
};

// ── Sección Products ──────────────────────────────────────────────────────────

export const Products = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prev = useCallback(() => setLightboxIndex((i) => i === null ? null : (i - 1 + productos.length) % productos.length), []);
  const next = useCallback(() => setLightboxIndex((i) => i === null ? null : (i + 1) % productos.length), []);

  return (
    <section id="productos" className="py-32 bg-obsidian overflow-hidden">

      {/* Header */}
      <div className="px-6 max-w-7xl mx-auto mb-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-gold text-xs uppercase tracking-[0.4em] mb-4"
        >
          Temporada actual
        </motion.p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-light text-white leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Colección <em className="text-white/40 not-italic">Urbana</em>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white/30 text-sm max-w-xs leading-relaxed"
          >
            Hacé click en cualquier prenda para verla en detalle.
          </motion.p>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="w-12 h-px bg-gold mt-8 origin-left"
        />
      </div>

      {/* Carrusel */}
      <div className="w-full">
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          coverflowEffect={{ rotate: 0, stretch: 0, depth: 120, modifier: 2, slideShadows: false }}
          modules={[EffectCoverflow, Pagination, Navigation]}
          pagination={{ clickable: true }}
          navigation
          className="w-full py-10 pb-16"
        >
          {productos.map((prod, i) => (
            <SwiperSlide
              key={prod.id}
              style={{ width: '280px', height: '420px' }}
              className="sm:!w-[360px] sm:!h-[500px] relative rounded-sm overflow-hidden bg-zinc-900 border border-white/5 group cursor-pointer"
              onClick={() => openLightbox(i)}
            >
              <img
                src={prod.image}
                alt={prod.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent" />

              {/* Ícono zoom al hover */}
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 rounded-sm bg-black/60 border border-white/20 flex items-center justify-center">
                  <ZoomIn className="w-3.5 h-3.5 text-white/70" />
                </div>
              </div>

              {/* Línea gold al hover */}
              <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-gold transition-all duration-500" />

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-gold/70 text-[10px] tracking-[0.3em] uppercase mb-1">{prod.categoria}</p>
                <h3
                  className="text-white text-xl font-light"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {prod.title}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CTA */}
      <div className="text-center mt-4">
        <motion.a
          href="whatsapp://send?phone=5491168296741&text=¡Hola! Me contacto desde la web de Floema para consultar disponibilidad."
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.03 }}
          className="inline-block px-10 py-3.5 border border-gold/40 text-gold hover:bg-gold hover:text-black transition-all duration-300 text-xs tracking-[0.25em] uppercase"
        >
          Consultar disponibilidad
        </motion.a>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <Lightbox
            index={lightboxIndex}
            onClose={closeLightbox}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
