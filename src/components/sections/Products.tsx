import { Swiper, SwiperSlide } from 'swiper/react';
// Cambiamos EffectCards por EffectCoverflow
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

import img1 from '../../assets/img1.jpeg';
import img2 from '../../assets/img2.jpeg';
import img3 from '../../assets/img3.jpeg';
import img4 from '../../assets/img4.jpeg';
import img5 from '../../assets/img5.jpeg';
import img6 from '../../assets/img6.jpeg';
import img7 from '../../assets/img7.jpeg';
import img8 from '../../assets/img8.jpeg';

const productos = [
  { id: 1, title: '', image: img1 },
  { id: 2, title: '', image: img2 },
  { id: 3, title: '', image: img3 },
  { id: 4, title: '', image: img4 },
  { id: 5, title: '', image: img5 },
];

export const Products = () => {
  return (
    <section id="productos" className="min-h-screen bg-black flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
      <div className="text-center mb-16 px-4">
  {/* Título con espaciado y un detalle de color */}
  <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase">
    Colección <span className="text-zinc-500">Urbana</span>
  </h2>
  
  {/* Una línea divisoria sutil para separar el título del catálogo */}
  <div className="w-20 h-1 bg-white mx-auto mb-6"></div>
  
  <p className="text-gray-400 text-lg md:text-xl font-light max-w-lg mx-auto leading-relaxed">
    Explorá el flujo. Prendas diseñadas para resistir el movimiento constante de la ciudad.
  </p>
</div>
      {/* Ampliamos el contenedor máximo para que ocupe más ancho en Desktop */}
      <div className="w-full max-w-6xl">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0, 
            stretch: 0, 
            depth: 150, 
            modifier: 2.5, 
            slideShadows: true,
          }}
          // 3. Agregamos Navigation al array de modules
          modules={[EffectCoverflow, Pagination, Navigation]}
          pagination={{ clickable: true }}
          // 4. Activamos las flechas
          navigation={true} 
          className="w-full h-[450px] sm:h-[600px] py-10"
        >
          {productos.map((prod) => (
            <SwiperSlide 
              key={prod.id} 
              // 2. Y ACÁ: Fijamos el ancho por style, y le decimos que ocupe el 100% del alto del contenedor
              style={{ width: '280px', height: '100%' }}
              className="sm:!w-[380px] relative flex items-end justify-center rounded-2xl shadow-2xl overflow-hidden bg-zinc-900"
            >
              <img 
                src={prod.image} 
                alt={prod.title} 
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
              <h3 className="relative z-10 text-2xl font-semibold text-white mb-8 tracking-wide">
                {prod.title}
              </h3>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};