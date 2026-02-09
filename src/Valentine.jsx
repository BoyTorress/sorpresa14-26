import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Music, Music2, Heart, Sparkles, Code2, Calendar, MapPin, Star, Coffee } from 'lucide-react';
import confetti from 'canvas-confetti';

// ==================== ALL PHOTOS (57 images) ====================
const allPhotos = Array.from({ length: 57 }, (_, i) => `/IMG-20260209-WA${String(i).padStart(4, '0')}.jpg`);

// Specific collections based on user request
const besoPhotos = [allPhotos[0]];
const pololeoPhotos = [allPhotos[7], allPhotos[17], allPhotos[18], allPhotos[19]];
const aventurasPhotos = [allPhotos[51], allPhotos[52], allPhotos[38], allPhotos[37], allPhotos[36], allPhotos[27], allPhotos[23], allPhotos[15], allPhotos[12], allPhotos[11]];
const vivirJuntosPhotos = [allPhotos[34], allPhotos[42], allPhotos[46]];

// Identify used photos to filter them out later
const usedIndices = [0, 7, 17, 18, 19, 51, 52, 38, 37, 36, 27, 23, 15, 12, 11, 34, 42, 46];
const remainingPhotos = allPhotos.filter((_, index) => !usedIndices.includes(index));

// ==================== TIMELINE DATA ====================
const milestones = [
    {
        id: 1,
        title: 'Nuestro primer beso',
        date: 'Diciembre 2023',
        description: 'Nuestra primera salida. Yo estaba súper nervioso, no sabía cómo reaccionar. Tú querías un amor de verano, pero yo ya sabía que serías el amor de mi vida.',
        images: besoPhotos,
        icon: Sparkles
    },
    {
        id: 2,
        title: 'Cada día más enamorado',
        date: 'Verano 2024',
        description: 'Mil panoramas juntos, risas, llantos, paseos en moto para arriba y para abajo. Cada momento me enamoraba más y más de ti.',
        images: aventurasPhotos,
        icon: Heart
    },
    {
        id: 3,
        title: 'El día que te pedí pololeo',
        date: '26 de Abril, 2024',
        description: 'Te preparé una cita en la playa con decoraciones. Te pregunté si querías ser mi pareja, porque sé que te mereces todo en este mundo. Y altiro me dijiste que sí. 💍',
        images: pololeoPhotos,
        icon: Star
    },
    {
        id: 4,
        title: 'Viviendo juntos',
        date: 'Mayo 2025',
        description: 'Dimos el gran paso. Nos ha costado, hemos tenido peleas, pero seguimos acá luchando por lo nuestro. Thiago o Aurora nos esperan en el futuro. 🏠',
        images: vivirJuntosPhotos,
        icon: Coffee
    }
];


// ==================== DECORATIVE COMPONENTS ====================
function Tulip({ className, delay = 0 }) {
    return (
        <motion.svg
            viewBox="0 0 100 100"
            className={`w-12 h-12 text-pink-400 ${className}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, rotate: [0, 5, -5, 0] }}
            transition={{
                opacity: { delay, duration: 1 },
                y: { delay, duration: 1 },
                rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay }
            }}
        >
            {/* Stem */}
            <path d="M50 100 Q50 80 50 60" stroke="#4ade80" strokeWidth="3" fill="none" />
            <path d="M50 80 Q60 70 70 60" stroke="#4ade80" strokeWidth="3" fill="none" />
            <path d="M50 85 Q40 75 30 65" stroke="#4ade80" strokeWidth="3" fill="none" />

            {/* Flower */}
            <path d="M50 60 C30 60 30 30 50 20 C70 30 70 60 50 60" fill="#f472b6" /> {/* Main petal */}
            <path d="M50 60 C40 60 35 40 45 25" fill="#fbcfe8" /> {/* Left highlight */}
            <path d="M50 60 C60 60 65 40 55 25" fill="#fbcfe8" /> {/* Right highlight */}
            <path d="M35 30 Q50 10 65 30" stroke="#f472b6" strokeWidth="1" fill="none" /> {/* Top detail */}
        </motion.svg>
    );
}

// ==================== HERO SECTION ====================
function HeroSection() {
    const titleWords = ['Nuestra', 'historia,', 'línea', 'por', 'línea'];

    return (
        <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 animated-gradient relative overflow-hidden">
            {/* Decorative elements */}
            <motion.div
                className="absolute top-20 left-10 text-champagne/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
                <Heart size={40} />
            </motion.div>

            <motion.div
                className="absolute bottom-20 right-10 text-burgundy/20"
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
                <Sparkles size={50} />
            </motion.div>

            {/* Tulips Decoration */}
            <Tulip className="absolute bottom-10 left-10 w-16 h-16 sm:w-20 sm:h-20" delay={0.5} />
            <Tulip className="absolute bottom-24 left-24 w-12 h-12 sm:w-14 sm:h-14 opacity-80" delay={1.2} />
            <div className="absolute top-10 right-10 flex gap-[-10px]">
                <Tulip className="w-14 h-14 sm:w-16 sm:h-16 transform scale-x-[-1]" delay={0.8} />
            </div>

            <motion.div
                className="text-center z-10 max-w-4xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex justify-center mb-6"
                >
                    <Heart className="text-burgundy fill-burgundy w-12 h-12 md:w-16 md:h-16 animate-pulse-glow" />
                </motion.div>

                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-burgundy leading-tight mb-6">
                    {titleWords.map((word, index) => (
                        <motion.span
                            key={index}
                            className="inline-block mr-3 sm:mr-4"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.6,
                                delay: 0.3 + index * 0.15,
                                ease: [0.215, 0.61, 0.355, 1]
                            }}
                        >
                            {word}
                        </motion.span>
                    ))}
                </h1>

                <motion.p
                    className="font-body text-lg sm:text-xl text-burgundy/70 max-w-2xl mx-auto leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.5, duration: 1 }}
                >
                    La historia de Brandon y Nadia, escrita con el corazón
                </motion.p>
            </motion.div>

            <motion.div
                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-burgundy/40"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <span className="text-xs uppercase tracking-widest">Desliza</span>
                <div className="w-1 h-12 bg-gradient-to-b from-burgundy/40 to-transparent rounded-full" />
            </motion.div>
        </section>
    );
}

// ==================== FOOTER ====================
function Footer() {
    return (
        <footer className="py-12 bg-cream/50 relative overflow-hidden">
            {/* Footer Tulips */}
            <div className="absolute bottom-0 left-0 flex items-end">
                <Tulip className="w-10 h-10 opacity-50" delay={0} />
                <Tulip className="w-14 h-14 -ml-4 mb-2 opacity-60" delay={1} />
                <Tulip className="w-8 h-8 -ml-3 mb-1 opacity-40" delay={2} />
            </div>

            <div className="absolute bottom-0 right-0 flex items-end transform scale-x-[-1]">
                <Tulip className="w-12 h-12 opacity-50" delay={0.5} />
                <Tulip className="w-16 h-16 -ml-5 mb-3 opacity-60" delay={1.5} />
            </div>

            <motion.div
                className="text-center relative z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
            >
                <div className="flex items-center justify-center gap-2 text-burgundy/40 font-body text-sm">
                    <span>Hecho con</span>
                    <Heart size={14} fill="#5D0E11" className="text-burgundy" />
                    <span>mucho amor</span>
                </div>
                <p className="mt-2 text-burgundy/30 font-body text-xs">
                    San Valentín 2026
                </p>
            </motion.div>
        </footer>
    );
}

// ==================== LYRICS DATA (Synced subtitles - Spanish) ====================
const subtitles = [
    { time: 0, text: "🎵 Nuestra canción..." },
    { time: 4, text: "Por un tiempo, fue difícil..." },
    { time: 8, text: "Pero últimamente he estado mejorando" },
    { time: 14, text: "Encontré a una chica que mis padres aman" },
    { time: 20, text: "Y creo que lo tengo todo" },
    { time: 26, text: "Y agradezco a Dios todos los días" },
    { time: 30, text: "Por la chica que me envió" },
    { time: 34, text: "Pero sé que las cosas que Él me da, puede quitármelas" },
    { time: 42, text: "Y te abrazo todas las noches" },
    { time: 48, text: "No hay hombre más aterrorizado..." },
    { time: 52, text: "Que el que corre el riesgo de perderte" },
    { time: 58, text: "Oh, espero no perderte..." },
    { time: 64, text: "Por favor, quédate 💕" },
    { time: 70, text: "Te quiero, te necesito" },
    { time: 76, text: "No quites estas cosas hermosas que tengo" },
    { time: 84, text: "Por favor, no me quites esto..." },
    { time: 92, text: "Recuperé mi juicio, me siento cuerdo" },
    { time: 98, text: "Ha pasado un tiempo, pero estoy encontrando mi fe" },
    { time: 106, text: "Tengo paz y tengo amor" },
    { time: 112, text: "Pero estoy despierto pensando que podría perderlo todo" },
    { time: 120, text: "Por favor, quédate..." },
    { time: 128, text: "Te quiero, te necesito" },
    { time: 136, text: "Estas cosas hermosas que tengo" },
    { time: 144, text: "Eres tú, Nadia 💕" },
    { time: 152, text: "Mi cosa hermosa..." },
    { time: 160, text: "Estas cosas hermosas que tengo" },
    { time: 170, text: "Te amo, de aquí al más allá ❤️" },
    { time: 180, text: "Por siempre y para siempre, 26/04 💕" },
];

// ==================== MUSIC PLAYER ====================
function MusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSubtitle, setCurrentSubtitle] = useState(subtitles[0].text);
    const [showLyrics, setShowLyrics] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        // Create audio element
        audioRef.current = new Audio('/musica.mp3');
        audioRef.current.loop = true;

        // Update subtitles based on current time
        const updateSubtitle = () => {
            if (!audioRef.current) return;
            const currentTime = audioRef.current.currentTime;

            // Find the current subtitle
            for (let i = subtitles.length - 1; i >= 0; i--) {
                if (currentTime >= subtitles[i].time) {
                    setCurrentSubtitle(subtitles[i].text);
                    break;
                }
            }
        };

        const interval = setInterval(updateSubtitle, 500);

        return () => {
            clearInterval(interval);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
            setShowLyrics(false);
        } else {
            audioRef.current.play();
            setShowLyrics(true);
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <>
            {/* Subtitle display */}
            <AnimatePresence>
                {showLyrics && (
                    <motion.div
                        className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-burgundy/90 text-cream rounded-2xl shadow-xl max-w-sm text-center backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.p
                            key={currentSubtitle}
                            className="font-body text-sm sm:text-base italic"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            {currentSubtitle}
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Music button */}
            <motion.button
                className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-burgundy text-cream rounded-full shadow-xl flex items-center justify-center float-animation"
                onClick={togglePlay}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 0.5 }}
            >
                <AnimatePresence mode="wait">
                    {isPlaying ? (
                        <motion.div
                            key="playing"
                            initial={{ opacity: 0, rotate: -180 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 180 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Music2 size={24} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="paused"
                            initial={{ opacity: 0, rotate: 180 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: -180 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Music size={24} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Animated rings when playing */}
                {isPlaying && (
                    <>
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute inset-0 rounded-full border-2 border-burgundy/30"
                                initial={{ scale: 1, opacity: 0.5 }}
                                animate={{ scale: 1.5 + i * 0.3, opacity: 0 }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                    ease: 'easeOut'
                                }}
                            />
                        ))}
                    </>
                )}
            </motion.button>
        </>
    );
}


// ==================== TIMELINE CARD ====================
// ==================== TIMELINE CARD ====================
function TimelineCard({ milestone, index }) {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const isEven = index % 2 === 0;
    const IconComponent = milestone.icon;
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Auto-slideshow for timeline cards with multiple images
    useEffect(() => {
        if (!milestone.images || milestone.images.length <= 1) return;

        const interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % milestone.images.length);
        }, 3000 + index * 500); // Stagger timings slightly

        return () => clearInterval(interval);
    }, [milestone.images, index]);

    return (
        <motion.div
            ref={ref}
            className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${isEven ? '' : 'md:flex-row-reverse'}`}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.215, 0.61, 0.355, 1] }}
        >
            {/* Image Slider */}
            <motion.div
                className="w-full md:w-1/2 aspect-[4/3] rounded-3xl overflow-hidden shadow-xl relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImageIndex}
                        src={milestone.images[currentImageIndex]}
                        alt={milestone.title}
                        className="w-full h-full object-cover absolute inset-0"
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    />
                </AnimatePresence>

                {/* Dots indicator if multiple images */}
                {milestone.images.length > 1 && (
                    <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-10">
                        {milestone.images.map((_, idx) => (
                            <div
                                key={idx}
                                className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/50'
                                    }`}
                            />
                        ))}
                    </div>
                )}
            </motion.div>

            {/* Content */}
            <div className="w-full md:w-1/2">
                <motion.div
                    className="glass-card p-6 sm:p-8 rounded-3xl shadow-lg"
                    initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-burgundy/10 rounded-xl flex items-center justify-center">
                            <IconComponent className="w-5 h-5 text-burgundy" />
                        </div>
                        <span className="text-sm font-medium text-burgundy/50 font-body">
                            {milestone.date}
                        </span>
                    </div>

                    <h3 className="font-display text-2xl sm:text-3xl text-burgundy mb-3">
                        {milestone.title}
                    </h3>

                    <p className="text-burgundy/70 font-body leading-relaxed">
                        {milestone.description}
                    </p>
                </motion.div>
            </div>
        </motion.div>
    );
}

// ==================== TIMELINE SECTION ====================
function TimelineSection() {
    return (
        <section className="py-20 px-6 bg-cream">
            <div className="max-w-5xl mx-auto">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Calendar className="w-10 h-10 mx-auto text-burgundy/40 mb-4" />
                    <h2 className="font-display text-3xl sm:text-4xl text-burgundy">
                        Nuestros momentos
                    </h2>
                </motion.div>

                <div className="space-y-16 md:space-y-24">
                    {milestones.map((milestone, index) => (
                        <TimelineCard key={milestone.id} milestone={milestone} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}

// ==================== CODE SECTION ====================
function CodeSection() {
    const [displayedCode, setDisplayedCode] = useState('');
    const [showCursor, setShowCursor] = useState(true);
    const codeLines = [
        'const nosotros = {',
        '  él: "Brandon",',
        '  ella: "Nadia",',
        '  inicio: "Diciembre 2023",',
        '  hijos: ["Thiago", "Aurora"],',
        '  duración: Infinity',
        '};',
        '',
        'if (Brandon && Nadia) {',
        '  return "Para siempre ❤️";',
        '}'
    ];
    const fullCode = codeLines.join('\n');
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });

    useEffect(() => {
        if (!isInView) return;

        let currentIndex = 0;
        const interval = setInterval(() => {
            if (currentIndex <= fullCode.length) {
                setDisplayedCode(fullCode.slice(0, currentIndex));
                currentIndex++;
            } else {
                clearInterval(interval);
                // Keep cursor blinking
                const cursorInterval = setInterval(() => {
                    setShowCursor(prev => !prev);
                }, 530);
                return () => clearInterval(cursorInterval);
            }
        }, 50);

        return () => clearInterval(interval);
    }, [isInView, fullCode]);

    return (
        <section ref={ref} className="py-20 px-6 bg-cream">
            <div className="max-w-2xl mx-auto">
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <Code2 className="w-10 h-10 mx-auto text-burgundy/40 mb-4" />
                    <h2 className="font-display text-3xl sm:text-4xl text-burgundy">
                        En código
                    </h2>
                </motion.div>

                <motion.div
                    className="bg-[#1a1a1a] rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {/* Terminal header */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                        <span className="ml-4 text-white/30 text-sm font-mono">amor.js</span>
                    </div>

                    {/* Code content */}
                    <pre className="font-mono text-sm sm:text-base text-green-400 whitespace-pre-wrap leading-relaxed">
                        <code>
                            {displayedCode}
                            {showCursor && <span className="text-green-400 animate-pulse">|</span>}
                        </code>
                    </pre>
                </motion.div>
            </div>
        </section>
    );
}

// ==================== PROPOSAL SECTION ====================
function ProposalSection() {
    const [accepted, setAccepted] = useState(false);
    const [noButtonPos, setNoButtonPos] = useState({ top: 0, left: 0 });
    const [hasMovedNo, setHasMovedNo] = useState(false);
    const containerRef = useRef(null);

    const fireConfetti = () => {
        // Heart-shaped confetti
        const defaults = {
            spread: 360,
            ticks: 100,
            gravity: 0,
            decay: 0.94,
            startVelocity: 30,
            shapes: ['heart'],
            colors: ['#5D0E11', '#E8D4B8', '#D4AF37', '#FF6B6B', '#FFE4E1']
        };

        confetti({
            ...defaults,
            particleCount: 50,
            scalar: 2
        });

        confetti({
            ...defaults,
            particleCount: 25,
            scalar: 3
        });

        // Secondary burst
        setTimeout(() => {
            confetti({
                ...defaults,
                particleCount: 100,
                scalar: 1.5,
                shapes: ['circle', 'heart']
            });
        }, 200);
    };

    const handleYesClick = () => {
        setAccepted(true);
        fireConfetti();
        // Fire more confetti after a delay
        setTimeout(fireConfetti, 1000);
        setTimeout(fireConfetti, 2000);
    };

    const moveNoButton = () => {
        if (!containerRef.current) return;

        const container = containerRef.current.getBoundingClientRect();
        const buttonWidth = 120;
        const buttonHeight = 50;
        const padding = 20;

        const maxX = container.width - buttonWidth - padding;
        const maxY = container.height - buttonHeight - padding;

        const newLeft = Math.max(padding, Math.random() * maxX);
        const newTop = Math.max(padding, Math.random() * maxY);

        setNoButtonPos({ top: newTop, left: newLeft });
        setHasMovedNo(true);
    };

    return (
        <section className="py-20 px-6 bg-cream min-h-screen flex items-center justify-center">
            <motion.div
                ref={containerRef}
                className="w-full max-w-lg relative"
                style={{ minHeight: '400px' }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <AnimatePresence mode="wait">
                    {!accepted ? (
                        <motion.div
                            key="question"
                            className="glass-card p-8 sm:p-12 rounded-3xl shadow-2xl text-center"
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                        >
                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <Heart className="w-16 h-16 mx-auto text-burgundy mb-6" fill="#5D0E11" />
                            </motion.div>

                            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl text-burgundy mb-4">
                                Nuestro tercer San Valentín
                            </h2>

                            <p className="text-burgundy/70 font-body text-lg mb-10 leading-relaxed">
                                Después de todo lo que hemos vivido y luchado juntos, después de cada risa y cada lágrima, solo hay una cosa que quiero preguntarte...
                            </p>

                            <h3 className="font-display text-2xl sm:text-3xl text-burgundy italic mb-12">
                                ¿Deseas pasar este San Valentín conmigo, Mi princesa hermosa?
                            </h3>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative">
                                {/* YES Button */}
                                <motion.button
                                    className="px-10 py-4 bg-burgundy text-cream font-body font-semibold text-lg rounded-2xl pulse-glow transition-all"
                                    onClick={handleYesClick}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    ¡Sí, quiero! 💕
                                </motion.button>

                                {/* NO Button - Evasive */}
                                <motion.button
                                    className="px-10 py-4 bg-cream border-2 border-burgundy/30 text-burgundy/60 font-body font-medium text-lg rounded-2xl transition-all hover:border-burgundy/50"
                                    style={hasMovedNo ? {
                                        position: 'absolute',
                                        top: noButtonPos.top,
                                        left: noButtonPos.left,
                                    } : {}}
                                    onMouseEnter={moveNoButton}
                                    onTouchStart={moveNoButton}
                                    animate={hasMovedNo ? { x: 0, y: 0 } : {}}
                                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                                >
                                    No 😢
                                </motion.button>
                            </div>

                            {hasMovedNo && (
                                <motion.p
                                    className="mt-8 text-sm text-burgundy/40 font-body italic"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    (¡Yapo achuntale si podi! 😏)
                                </motion.p>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            className="glass-card p-8 sm:p-12 rounded-3xl shadow-2xl text-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }}
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1, rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            >
                                <div className="text-7xl sm:text-8xl mb-6">🥰</div>
                            </motion.div>

                            <motion.h2
                                className="font-display text-3xl sm:text-4xl md:text-5xl text-burgundy mb-4"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                ¡Jeje sabia que dirias que si!
                            </motion.h2>

                            <motion.p
                                className="text-burgundy/70 font-body text-lg leading-relaxed mb-8"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                Te amo demasiado mi chanchi. Eres lo mejor que me ha pasado en la vida. Nunca tendré una segunda opción, siempre serás mi prioridad número 1. De aquí al más allá. 💕
                            </motion.p>

                            <motion.div
                                className="flex items-center justify-center gap-2 text-burgundy"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.8 }}
                            >
                                <Heart size={20} fill="#5D0E11" />
                                <span className="font-display text-xl italic">Por siempre y para siempre 26/04 </span>
                                <Heart size={20} fill="#5D0E11" />
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </section>
    );
}

// ==================== FOOTER ====================


// ==================== PHOTO CAROUSEL (The Rest of Our Madness) ====================
function PhotoCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (remainingPhotos.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % remainingPhotos.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    if (remainingPhotos.length === 0) return null;

    return (
        <section className="py-16 px-6 bg-cream overflow-hidden">
            <motion.div
                className="text-center mb-10"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <Heart className="w-10 h-10 mx-auto text-burgundy/40 mb-4" fill="#5D0E11" />
                <h2 className="font-display text-3xl sm:text-4xl text-burgundy">
                    El resto de nuestras locuras
                </h2>
                <p className="text-burgundy/50 font-body mt-2">Más momentos inolvidables juntos</p>
            </motion.div>

            <div className="relative max-w-4xl mx-auto">
                <div className="aspect-[16/10] rounded-3xl overflow-hidden shadow-2xl">
                    <AnimatePresence mode="wait">
                        <motion.img
                            key={currentIndex}
                            src={remainingPhotos[currentIndex]}
                            alt={`Locura ${currentIndex + 1}`}
                            className="w-full h-full object-cover"
                            initial={{ opacity: 0, scale: 1.1 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        />
                    </AnimatePresence>
                </div>

                {/* Progress indicator */}
                <div className="flex justify-center mt-6 gap-1">
                    {remainingPhotos.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`w-2 h-2 rounded-full transition-all ${idx === currentIndex ? 'bg-burgundy w-6' : 'bg-burgundy/20'
                                }`}
                        />
                    ))}
                </div>

                <p className="text-center mt-4 text-burgundy/40 font-body text-sm">
                    {currentIndex + 1} / {remainingPhotos.length}
                </p>
            </div>
        </section>
    );
}

// ==================== PHOTO GALLERY (Masonry Grid - Remaining Photos) ====================
function PhotoGallery() {
    if (remainingPhotos.length === 0) return null;

    return (
        <section className="py-16 px-4 sm:px-6 bg-cream">
            <div className="max-w-6xl mx-auto columns-2 sm:columns-3 md:columns-4 gap-3 sm:gap-4">
                {remainingPhotos.map((photo, index) => (
                    <motion.div
                        key={index}
                        className="break-inside-avoid mb-3 sm:mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ delay: (index % 8) * 0.05 }}
                    >
                        <motion.div
                            className="rounded-2xl overflow-hidden shadow-lg cursor-pointer"
                            whileHover={{ scale: 1.03, y: -5 }}
                            transition={{ duration: 0.2 }}
                        >
                            <img
                                src={photo}
                                alt={`Locura ${index + 1}`}
                                className="w-full h-auto object-cover"
                                loading="lazy"
                            />
                        </motion.div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

// ==================== MAIN COMPONENT ====================
export default function Valentine() {
    return (
        <div className="bg-cream min-h-screen">
            <HeroSection />
            <TimelineSection />
            <PhotoCarousel />
            <PhotoGallery />
            <CodeSection />
            <ProposalSection />
            <Footer />
            <MusicPlayer />
        </div>
    );
}

