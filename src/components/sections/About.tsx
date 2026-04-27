import { motion } from 'framer-motion';
import { Zap, Shield, TrendingUp } from 'lucide-react';

export const About = () => {
  const features = [
    {
      icon: <Zap className="w-8 h-8 text-white" />,
      title: "Potencia Continua",
      description: "Desarrollamos soluciones que mantienen tu negocio en movimiento sin interrupciones."
    },
    {
      icon: <Shield className="w-8 h-8 text-white" />,
      title: "Estructura Sólida",
      description: "Bases robustas y seguras para escalar cualquier tipo de proyecto tecnológico."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-white" />,
      title: "Crecimiento Vital",
      description: "Como el floema en las plantas, distribuimos el valor hacia cada rincón de tu empresa."
    }
  ];

  return (
    <section id="nosotros" className="py-24 bg-zinc-950 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">El Flujo de tu Negocio</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Floema nace con la misión de ser el canal principal por donde circula la energía de tu marca. 
            No solo creamos productos, construimos el ecosistema que te permite crecer de manera constante.
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