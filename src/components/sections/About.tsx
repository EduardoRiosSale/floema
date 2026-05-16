import { motion } from 'framer-motion';
import { Waves, MapPin, UserCheck } from 'lucide-react';

const features = [
  {
    icon: <Waves className="w-5 h-5 text-gold" />,
    number: '01',
    title: 'Nuestra Esencia',
    description:
      'Floema nace del concepto botánico del flujo vital: así como la planta necesita un conducto para trasladar su energía, nuestra indumentaria busca ser el canal que lleve esa energía constante a cada rincón de la ciudad.',
  },
  {
    icon: <MapPin className="w-5 h-5 text-gold" />,
    number: '02',
    title: 'Origen y Sueño',
    description:
      'Desde el corazón de Mataderos, CABA, transformamos una búsqueda interna en realidad. Lo que empezó como un sueño personal hoy es una marca que respira la identidad de nuestro barrio y nuestra pasión.',
  },
  {
    icon: <UserCheck className="w-5 h-5 text-gold" />,
    number: '03',
    title: 'Identidad con Orgullo',
    description:
      'Creamos prendas para que quienes las usen se sientan identificados con nuestro propósito. Llevar Floema es un símbolo de representación y orgullo compartido en el movimiento diario.',
  },
];

export const About = () => {
  return (
    <section id="nosotros" className="py-32 bg-obsidian px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-gold text-xs uppercase tracking-[0.4em] mb-4"
          >
            Quiénes somos
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-light text-white leading-tight max-w-2xl"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Cultura de Calle,{' '}
            <em className="text-white/40 not-italic">Energía Vital.</em>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-12 h-px bg-gold mt-8 origin-left"
          />
        </div>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-white/30 text-lg md:text-xl font-light leading-relaxed border-l border-gold/30 pl-6 mb-20 max-w-3xl"
          style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}
        >
          "No somos solo una marca de indumentaria. Somos el pulso de la cultura skater y urbana plasmado en cada prenda. Diseñamos para el movimiento, nacimos para la ciudad."
        </motion.blockquote>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
          {features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              className="group bg-obsidian p-10 relative overflow-hidden hover:bg-zinc-950 transition-colors duration-500"
            >
              {/* Número de fondo */}
              <span
                className="absolute top-6 right-8 text-7xl font-bold text-white/3 select-none"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {f.number}
              </span>

              {/* Línea superior animada */}
              <div className="w-0 group-hover:w-full h-px bg-gold transition-all duration-500 mb-8" />

              {/* Icono */}
              <div className="mb-6 flex items-center gap-3">
                {f.icon}
                <span className="text-gold/60 text-xs tracking-[0.3em] uppercase">{f.number}</span>
              </div>

              <h3
                className="text-xl font-light text-white mb-4 tracking-wide"
                style={{ fontFamily: 'var(--font-heading)' }}
              >
                {f.title}
              </h3>
              <p className="text-white/40 leading-relaxed text-sm">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
