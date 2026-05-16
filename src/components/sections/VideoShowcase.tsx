import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX } from 'lucide-react';

interface VideoCardProps {
  youtubeId?: string;
  localSrc?: string;
  poster?: string;
  label: string;
  title: string;
  description: string;
  index: number;
}

const VideoCard = ({ youtubeId, localSrc, poster, label, title, description, index }: VideoCardProps) => {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setPlaying(true);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const toggleMute = () => {
    setMuted((m) => !m);
    if (videoRef.current) videoRef.current.muted = !muted;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      {/* Label */}
      <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-3">{label}</p>

      {/* Video container — formato vertical para Shorts */}
      <div className="relative w-full max-w-[320px] mx-auto bg-zinc-950 border border-white/8 overflow-hidden rounded-sm" style={{ aspectRatio: '9/16' }}>

        {/* Video local */}
        {localSrc && (
          <video
            ref={videoRef}
            src={localSrc}
            poster={poster}
            muted={muted}
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        )}

        {/* YouTube embed */}
        {youtubeId && playing && (
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0&modestbranding=1&controls=1&playsinline=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        )}

        {/* Thumbnail / overlay cuando no está reproduciéndose */}
        {(!playing || localSrc) && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />
        )}

        {/* Poster image para YouTube antes de reproducir */}
        {youtubeId && !playing && poster && (
          <img src={poster} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        )}

        {/* Fallback visual si no hay poster */}
        {youtubeId && !playing && !poster && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-full bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
              <span className="text-white/5 text-9xl font-bold" style={{ fontFamily: 'var(--font-heading)' }}>F</span>
            </div>
          </div>
        )}

        {/* Botón Play */}
        {!playing && (
          <motion.button
            onClick={handlePlay}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="absolute inset-0 flex items-center justify-center group/btn z-10"
          >
            {/* Glow ring animado */}
            <span className="absolute w-20 h-20 rounded-full border border-gold/20 animate-ping opacity-30" />
            <span className="relative w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm border border-gold/40 flex items-center justify-center group-hover/btn:border-gold group-hover/btn:bg-black/80 transition-all duration-300">
              <Play className="w-5 h-5 text-gold fill-gold ml-0.5" />
            </span>
          </motion.button>
        )}

        {/* Control mute para video local */}
        {localSrc && playing && (
          <button
            onClick={toggleMute}
            className="absolute bottom-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 border border-white/10 flex items-center justify-center hover:border-gold/40 transition-colors"
          >
            {muted ? <VolumeX className="w-3.5 h-3.5 text-white/60" /> : <Volume2 className="w-3.5 h-3.5 text-white/60" />}
          </button>
        )}

        {/* Línea dorada bottom al hover */}
        <div className="absolute bottom-0 left-0 w-0 group-hover:w-full h-px bg-gold transition-all duration-700" />
      </div>

      {/* Info debajo */}
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3
            className="text-white text-xl font-light mb-1.5"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            {title}
          </h3>
          <p className="text-white/40 text-xs leading-relaxed max-w-xs">{description}</p>
        </div>
        <div className="w-8 h-px bg-gold/30 mt-3 shrink-0" />
      </div>
    </motion.div>
  );
};

export const VideoShowcase = () => {
  return (
    <section id="videos" className="py-32 bg-black px-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-gold text-xs uppercase tracking-[0.4em] mb-4"
          >
            En movimiento
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl font-light text-white max-w-xl leading-tight"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            El Flujo <em className="text-white/40 not-italic">en Acción</em>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="w-12 h-px bg-gold mt-8 origin-left"
          />
        </div>

        {/* Grid de 2 videos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 justify-items-center">
          <VideoCard
            index={0}
            label="Colección / Temporada"
            title="La Ciudad es Nuestra Pasarela"
            description="Cada prenda nace en la calle y vuelve a ella. Mirá cómo Floema toma vida en el asfalto de Mataderos."
            youtubeId="uPaAsdR0dq0"
          />
          <VideoCard
            index={1}
            label="Behind the Scenes"
            title="Así se Hace Floema"
            description="El proceso detrás de cada diseño: desde el boceto hasta la prenda final. Cultura, calle y detalle en cada costura."
            youtubeId="v0cHILr0r60"
          />
        </div>
      </div>
    </section>
  );
};
