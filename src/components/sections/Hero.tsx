import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css/bundle';

// Importamos las imágenes
import logoFloema from '../../assets/floema.png'; 
import skate1 from '../../assets/skate1.jpg'; // Recordá guardar estas imágenes en tu carpeta
import skate2 from '../../assets/skate2.jpg';
import skate3 from '../../assets/skate3.jpg';

export const Hero = () => {
  // Array con las pistas de skate
  const fondos = [skate1, skate2, skate3];

  return (
    <section id="inicio" className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      
      {/* FONDO ANIMADO DE SKATE (Reemplaza al bg-zinc-950) */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          loop={true}
          allowTouchMove={false}
          className="w-full h-full"
        >
          {fondos.map((imagen, index) => (
            <SwiperSlide key={index}>
              <img 
                src={imagen} 
                alt={`Pista de skate ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Capa oscura para que resalte tu texto */}
      <div className="absolute inset-0 z-10 bg-black/50" />

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-20 flex flex-col items-center text-center px-4">
        <motion.img 
          src={logoFloema} 
          alt="Floema" 
          // Borramos el rounded-full y el border, y agregamos mix-blend-screen
          className="w-48 md:w-64 mb-8 mix-blend-screen" 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
        
<motion.h1 
  className="text-4xl md:text-6xl font-bold text-white tracking-widest mb-4 uppercase"
  // ... tus animaciones
>
  FLUIDO URBANO
</motion.h1>

<motion.p 
  className="text-gray-300 text-lg md:text-xl max-w-2xl mt-4 shadow-black drop-shadow-md"
  // ... tus animaciones
>
  Llevando la esencia de la calle a cada rincón de la ciudad.
</motion.p>

        <motion.a
  href="#nosotros"
  className="mt-10 inline-block px-10 py-3 bg-white/5 backdrop-blur-sm text-white text-sm md:text-base font-bold uppercase tracking-[0.2em] rounded-full border border-white/40 hover:border-white hover:bg-white hover:text-black transition-all duration-500 cursor-pointer"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  whileHover={{ 
    scale: 1.05,
    boxShadow: "0 0 20px rgba(255,255,255,0.4)"
  }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.5, delay: 0.9 }}
>
  Conoce más
</motion.a>
      </div>
    </section>
  );
};