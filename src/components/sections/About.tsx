import { motion } from 'framer-motion';
import { Waves, MapPin, UserCheck } from 'lucide-react';

export const About = () => {
  const features = [
  {
    icon: <Waves className="w-8 h-8 text-white" />,
    title: "Nuestra Esencia",
    description: "Floema nace del concepto botánico del flujo vital: así como la planta necesita un conducto para trasladar su energía, nuestra indumentaria busca ser el canal que lleve esa energía constante a cada rincón de la ciudad."
  },
  {
    icon: <MapPin className="w-8 h-8 text-white" />,
    title: "Origen y Sueño",
    description: "Desde el corazón de Mataderos, CABA, transformamos una búsqueda interna en realidad. Lo que empezó como un sueño personal hoy es una marca que respira la identidad de nuestro barrio y nuestra pasión."
  },
  {
    icon: <UserCheck className="w-8 h-8 text-white" />,
    title: "Identidad con Orgullo",
    description: "Creamos prendas para que quienes las usen se sientan identificados con nuestro propósito. Buscamos que llevar Floema sea un símbolo de representación y orgullo compartido en el movimiento diario."
  }
];

  return (
    <section id="nosotros" className="py-24 bg-zinc-950 px-4">
      <div className="max-w-6xl mx-auto">
  <div className="text-center mb-16">
    {/* Título con más actitud */}
    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 uppercase tracking-tighter">
      Cultura de Calle, <span className="text-gray-500">Energía Vital.</span>
    </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed italic">
      "No somos solo una marca de indumentaria. Somos el pulso de la cultura skater y urbana plasmado en cada prenda. Diseñamos para el movimiento, nacimos para la ciudad."
    </p>
  </div>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="p-8 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-colors"
            >
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};