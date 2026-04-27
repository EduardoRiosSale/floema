import { Swiper, SwiperSlide } from 'swiper/react';
// Cambiamos EffectCards por EffectCoverflow
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css/bundle';

import img1 from '../../assets/img1.jpeg';
import img2 from '../../assets/img2.jpeg';
import img3 from '../../assets/img3.jpeg';
import img4 from '../../assets/img4.jpeg';
import img5 from '../../assets/img5.jpeg';

const productos = [
  { id: 1, title: 'Producto 1', image: img1 },
  { id: 2, title: 'Producto 2', image: img2 },
  { id: 3, title: 'Producto 3', image: img3 },
  { id: 4, title: 'Gorras', image: img4 },
  { id: 5, title: 'Remeras', image: img5 },
];

export const Products = () => {
  return (
    <section id="productos" className="min-h-screen bg-black flex flex-col items-center justify-center py-20 px-4 overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Nuestros Productos</h2>
        <p className="text-gray-400">Deslizá para descubrir nuestro catálogo.</p>
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