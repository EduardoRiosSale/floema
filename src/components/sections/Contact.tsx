import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import { FaInstagram, FaWhatsapp } from 'react-icons/fa';

export const Contact = () => {
  const whatsappNumber = '5491168296741'; // Reemplazá con tu número real (código país + número sin espacios ni +)
  const whatsappMessage = '¡Hola! Me contacto desde la web de Floema.';

  return (
    <section id="contacto" className="bg-zinc-950 py-20 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-12">
        
        {/* Info de la marca */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-white tracking-wider mb-4">FLOEMA</h2>
          <p className="text-gray-400 max-w-sm">
            Energía Constante. Conectando el flujo vital de tus proyectos hacia el futuro.
          </p>
        </div>

        {/* Contacto directo */}
        <div className="flex flex-col gap-4 text-gray-300">
          <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
            <Mail className="w-5 h-5" />
            <span>floema.urbano@gmail.com</span>
          </div>
          <a 
            href={`whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-gray-300 hover:text-green-400 transition-colors cursor-pointer"
          >
            <Phone className="w-5 h-5" />
            <span>+54 11 68296741</span>
          </a>
          <div className="flex items-center gap-3 hover:text-white transition-colors cursor-pointer">
            <MapPin className="w-5 h-5" />
            <span>Buenos Aires, Argentina</span>
          </div>
        </div>

        {/* Redes Sociales */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <h3 className="text-white font-semibold mb-2">Seguinos</h3>
          <div className="flex gap-4">
            <motion.a 
              href="https://www.instagram.com/floema_urbanoskater?igsh=Ym9qbzNxb254bXpl"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="bg-zinc-900 p-3 rounded-full border border-zinc-800 hover:border-pink-500 transition-colors text-white hover:text-pink-500"
            >
              <FaInstagram className="w-6 h-6" />
            </motion.a>

            <motion.a 
              href={`whatsapp://send?phone=${whatsappNumber}&text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              className="bg-zinc-900 p-3 rounded-full border border-zinc-800 hover:border-green-500 transition-colors text-white hover:text-green-500"
            >
              <FaWhatsapp className="w-6 h-6" />
            </motion.a>
          </div>
        </div>

      </div>
      
      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Floema. Todos los derechos reservados.</p>
      </div>
    </section>
  );
};