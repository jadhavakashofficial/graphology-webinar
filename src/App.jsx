// src/App.jsx
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PencilIcon, ChevronDownIcon, PlayIcon, SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

export default function App() {
  // ─── Counter State & Animation ──────────────────────────────
  const [students, setStudents]   = useState(0);
  const [parents, setParents]     = useState(0);
  const [seminars, setSeminars]   = useState(0);
  const [companies, setCompanies] = useState(0);

  useEffect(() => {
    const duration = 2000, steps = 100, interval = duration / steps;
    let count = 0;
    const targets = { students:150000, parents:35000, seminars:162, companies:18 };
    const inc = {
      students:  targets.students  / steps,
      parents:   targets.parents   / steps,
      seminars:  targets.seminars  / steps,
      companies: targets.companies / steps,
    };
    const timer = setInterval(() => {
      count++;
      setStudents(s => Math.min(targets.students,  Math.round(inc.students  * count)));
      setParents(p  => Math.min(targets.parents,   Math.round(inc.parents   * count)));
      setSeminars(q => Math.min(targets.seminars,  Math.round(inc.seminars  * count)));
      setCompanies(c=> Math.min(targets.companies, Math.round(inc.companies * count)));
      if (count >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);
  // ──────────────────────────────────────────────────────────────

  // ─── Countdown State & Logic ──────────────────────────────
  const targetDate = new Date("2025-06-15T18:00:00+05:30");
  const [timeLeft, setTimeLeft]       = useState({ days:0, hours:0, minutes:0, seconds:0 });
  const [initialDays, setInitialDays] = useState(0);

  // Live seats logic with urgency
  const [liveSeats, setLiveSeats] = useState(100);
  
  useEffect(() => {
    const now = new Date();
    setInitialDays(Math.floor((targetDate - now) / (1000*60*60*24)));
    
    // Initialize seats based on time remaining
    const initialSeats = Math.max(10, 100 - Math.floor((new Date() - now) / (1000 * 60 * 60)));
    setLiveSeats(initialSeats);

    const update = () => {
      const diff    = targetDate - new Date();
      const days    = Math.max(Math.floor(diff / (1000*60*60*24)), 0);
      const hours   = Math.max(Math.floor((diff % (1000*60*60*24))/(1000*60*60)),0);
      const minutes = Math.max(Math.floor((diff % (1000*60*60))/(1000*60)),0);
      const seconds = Math.max(Math.floor((diff % (1000*60))/1000),0);
      setTimeLeft({ days, hours, minutes, seconds });
      
      // Update seats decreasing over time
      const hoursPassed = (new Date() - now) / (1000 * 60 * 60);
      setLiveSeats(Math.max(1, Math.floor(100 - hoursPassed * 1.5)));
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  // ──────────────────────────────────────────────────────────────

  // ─── FAQ Accordion State ────────────────────────────────────
  const [open, setOpen] = useState(null);
  
  // Video hover state
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [mutedStates, setMutedStates] = useState([true, true, true]);
  const videoRefs = useRef([]);
  
  // Handle video hover
  const handleVideoHover = (index) => {
    setHoveredVideo(index);
    if (videoRefs.current[index]) {
      videoRefs.current[index].play();
    }
  };
  
  const handleVideoLeave = (index) => {
    setHoveredVideo(null);
    if (videoRefs.current[index]) {
      videoRefs.current[index].pause();
      videoRefs.current[index].currentTime = 0;
    }
  };
  
  const toggleMute = (index, e) => {
    e.stopPropagation();
    const newMutedStates = [...mutedStates];
    newMutedStates[index] = !newMutedStates[index];
    setMutedStates(newMutedStates);
    
    if (videoRefs.current[index]) {
      videoRefs.current[index].muted = newMutedStates[index];
    }
  };

  // FAQ Data
  const faqs = [
    {
      question: "What will I learn in this webinar?",
      answer: "You'll learn the fundamentals of graphology, how to analyze handwriting and signatures, and gain insights into personality traits, emotional patterns, and cognitive styles."
    },
    {
      question: "Do I need any prior experience?",
      answer: "No prior experience is needed. This webinar is designed for beginners and will cover all the foundational concepts."
    },
    {
      question: "Will I get a certificate?",
      answer: "Yes, all participants will receive a certificate of completion recognized by industry professionals."
    },
    {
      question: "How long is the webinar?",
      answer: "The webinar is approximately 90 minutes long, including a live Q&A session at the end."
    },
    {
      question: "Can I access the recording after?",
      answer: "Yes, all registered participants will receive a recording of the webinar to watch at their convenience."
    },
    {
      question: "What do I need to participate?",
      answer: "You just need a stable internet connection and a device to access Zoom. We recommend having a notebook and pen to take notes."
    }
  ];

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-gradient-to-b from-[#0a0a1a] to-[#1a1030] px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      {/* Gradient Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[50vw] h-[50vw] bg-gradient-to-r from-indigo-900/30 to-teal-700/30 rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] bg-gradient-to-r from-teal-700/30 to-blue-900/30 rounded-full blur-[100px]"></div>
        <div className="absolute top-1/3 right-1/3 w-[30vw] h-[30vw] bg-gradient-to-r from-blue-800/30 to-purple-900/30 rounded-full blur-[80px] animate-pulse"></div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(to_right,rgba(255,255,255,0.03)_0_1px,transparent_1px_40px),repeating-linear-gradient(to_bottom,rgba(255,255,255,0.03)_0_1px,transparent_1px_40px)]" />
      
      {/* === Hero Section === */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-4xl bg-gradient-to-br from-[#1a1a2e]/90 to-[#16213e]/90 backdrop-blur-xl border border-white/20 rounded-3xl p-8 sm:p-10 md:p-12 text-center text-white mt-12"
        style={{
          boxShadow: "0 10px 50px rgba(101, 87, 255, 0.3)",
        }}
      >
        {/* Urgency Banner */}
        <motion.div 
          className="bg-gradient-to-r from-red-500 to-red-700 text-white font-bold text-sm uppercase px-4 py-2 rounded-full mb-6 inline-flex items-center animate-pulse"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <span className="mr-2">🔥</span> 
          {liveSeats} LIVE SEATS LEFT! 
          <span className="ml-2">🔥</span>
        </motion.div>
        
        {/* Title */}
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-400 to-purple-500 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Decode Your Signature,
          <br />
          <span className="text-white">Discover Yourself</span>
        </motion.h1>
        
        {/* Pen-writing underline */}
        <div className="relative w-full max-w-md mx-auto h-1 mt-4 mb-8 overflow-visible">
          <motion.div
            className="absolute top-0 left-0 h-1 bg-gradient-to-r from-teal-400 to-purple-500"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            style={{ transformOrigin: 'left center' }}
          />
          <motion.div
            className="absolute -top-2 left-0"
            initial={{ x: 0 }}
            animate={{ x: '100%' }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
          >
            <PencilIcon className="w-6 h-6 text-white" />
          </motion.div>
        </div>
        
        {/* Subtitle */}
        <motion.p 
          className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Join Nirav Pakai’s immersive webinar on Graphology (Handwriting & Signature Analysis).
        </motion.p>
        
        {/* Date & Time */}
        <motion.p 
          className="text-sm sm:text-base text-gray-400 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          June 15, 2025 | 6:00 PM IST | Online via Zoom
        </motion.p>
        
        {/* Countdown Timer */}
        <motion.div 
          className="flex justify-center mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="grid grid-cols-4 gap-3 max-w-md w-full">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="bg-gradient-to-br from-blue-800/50 to-purple-900/50 rounded-xl p-3 text-center">
                <div className="text-2xl font-bold text-white">{value.toString().padStart(2, '0')}</div>
                <div className="text-xs text-gray-300 uppercase">{unit}</div>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* CTA */}
        <motion.a
          href="https://thealcworld.in/courses-2/graphology-signature-analysis-webinar/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 sm:px-10 py-4 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 font-semibold text-white rounded-full shadow-lg cursor-pointer text-lg group"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: '0 0 30px rgba(101, 87, 255, 0.7)',
            background: "linear-gradient(45deg, #6366f1, #8b5cf6, #ec4899)"
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <span className="group-hover:animate-pulse">🔮</span> Claim Your Spot Now
        </motion.a>
      </motion.div>
      {/* === End Hero Section === */}

      {/* === What Is Graphology Section === */}
      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500 mb-4"
            >
              What Is Graphology?
            </motion.h2>
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              The scientific study of handwriting and signatures revealing personality traits and subconscious patterns
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '✍️', title: 'Personality Insights', desc: 'Reveals core personality traits through handwriting patterns' },
              { icon: '🧠', title: 'Cognitive Patterns', desc: 'Uncovers thinking styles and decision-making processes' },
              { icon: '💼', title: 'Leadership Traits', desc: 'Identifies natural leadership abilities and management style' },
              { icon: '💬', title: 'Communication Styles', desc: 'Shows how you express yourself and relate to others' },
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                <div className="relative bg-black/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6 flex flex-col items-center text-center h-full">
                  <div className="p-4 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full text-4xl mb-4">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300 text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* === End What Is Graphology Section === */}

      {/* === What You'll Learn Section === */}
      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0f0f2a] to-[#1a1035]">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500 mb-4"
            >
              What You'll Learn
            </motion.h2>
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Master the art of signature analysis in this immersive webinar
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { icon: "🎯", title: "Decode Emotional Patterns", desc: "Spot emotional triggers and balance feelings through handwriting analysis" },
              { icon: "🏅", title: "Identify Leadership Traits", desc: "Uncover confidence, integrity & leadership cues hidden in your signature" },
              { icon: "💬", title: "Boost Communication", desc: "Improve expression and decision-making by revealing your cognitive style" },
              { icon: "🔍", title: "Live Signature Reading", desc: "Experience a real-time demo and receive personalized insights" }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                <div className="relative bg-black/50 backdrop-blur-lg border border-white/10 rounded-3xl p-6">
                  <div className="mb-4 p-4 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full text-2xl w-16 h-16 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-gray-300">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* === End What You'll Learn Section === */}

      {/* === Video Section === */}
      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500 mb-4"
            >
              Discover the Power of Graphology
            </motion.h2>
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              See how handwriting analysis reveals personality traits and emotional patterns
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* YouTube Video 1 */}
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-600/20 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
              <div className="relative bg-black/70 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative aspect-video">
                  <iframe 
                    className="w-full h-full rounded-t-3xl"
                    src="https://www.youtube.com/embed/WUTRPkZQzqc"
                    title="Graphology Explained"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">The Science Behind Handwriting Analysis</h3>
                  <p className="text-gray-300">Learn how graphology decodes personality traits through handwriting patterns</p>
                </div>
              </div>
            </motion.div>

            {/* YouTube Video 2 */}
            <motion.div 
              className="relative group"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -10 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-blue-600/20 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
              <div className="relative bg-black/70 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                <div className="relative aspect-video">
                  <iframe 
                    className="w-full h-full rounded-t-3xl"
                    src="https://www.youtube.com/embed/H6puD23YoZg"
                    title="Signature Analysis"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2">What Your Signature Reveals About You</h3>
                  <p className="text-gray-300">Discover the hidden meanings behind signature styles and strokes</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* === End Video Section === */}

      {/* === About Speaker Section === */}
      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0f0f1f] to-[#1a1a35]">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500 mb-4"
            >
              Meet Your Mentor
            </motion.h2>
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Learn from a renowned expert in graphology and personality analysis
            </motion.p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <motion.div 
              className="flex-1 max-w-lg flex justify-center"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-teal-400 to-purple-500 rounded-2xl w-full h-full transform rotate-3 blur-lg opacity-30"></div>
                <div className="bg-gradient-to-br from-teal-500/20 to-purple-600/20 rounded-2xl p-1">
                  <img 
                    src="https://thealcworld.in/wp-content/uploads/2025/06/b008c9db-e55e-47e5-b6e7-65d50723323d-scaled.jpeg" 
                    alt="Nirav Pakai" 
                    className="w-full max-w-md rounded-2xl object-cover border-4 border-black mx-auto"
                  />
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-3xl p-8 flex-1 max-w-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-r from-teal-500/10 to-purple-600/10 rounded-2xl p-6 mb-6">
                <h3 className="text-3xl font-bold text-white mb-4">Nirav Pakai</h3>
                <p className="text-teal-300 text-xl mb-4">Founder & Chief Mentor, The Active Learning Company</p>
                <p className="text-gray-300 mb-4">
                  Transformational mentor and educator since 2004, graphologist since 2010—combining leadership psychology with spiritual wisdom to ignite breakthrough growth.
                </p>
                <ul className="space-y-2 mt-6">
                  {[
                    "20+ years as science teacher & educator",
                    "Graphologist & Signature Analyst since 2010",
                    "Delivered 162+ seminars for 18+ MNCs & 150K+ individuals",
                    "ISO 9001:2015 Certified",
                    "Author of The 8CL – playbook for 1 Billion Smiles"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="text-teal-400 mr-2 text-xl">✔</span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* === End About Speaker Section === */}

      {/* === Testimonials Section === */}
      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0f0f2a] to-[#1a1035]">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500 mb-4"
            >
              What Our Students Say
            </motion.h2>
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Hear from individuals who transformed their understanding through graphology
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                img: "https://thealcworld.in/wp-content/uploads/2025/06/91995856-3E48-4D39-AEA4-D2D45E0091B8.jpeg",
                name: "Akash Jadhav",
                review: "The seminar completely changed how I view handwriting. I can now understand people's personalities just by looking at their signatures!",
                stars: 5
              },
              {
                img: "https://thealcworld.in/wp-content/uploads/2025/06/IMG_5352-scaled.jpg",
                name: "Araman Salunkhe",
                review: "Nirav's insights into signature analysis helped me improve my professional relationships. Highly recommended!",
                stars: 5
              },
              {
                img: "https://thealcworld.in/wp-content/uploads/2025/06/IMG_5646.jpg",
                name: "Pratik",
                review: "This webinar opened my eyes to how much our handwriting reveals. The live analysis session was mind-blowing!",
                stars: 4
              },
              {
                img: "https://thealcworld.in/wp-content/uploads/2025/06/IMG_5650.jpg",
                name: "Avniash",
                review: "As an HR professional, this seminar gave me a powerful new tool for understanding candidates beyond their resumes.",
                stars: 5
              }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-3xl p-6 hover:shadow-xl hover:shadow-purple-500/20 transition-all"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
              >
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.img} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full object-cover border-2 border-purple-500"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                    <div className="flex mt-1">
                      {[...Array(testimonial.stars)].map((_, i) => (
                        <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.review}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* === End Testimonials Section === */}

      {/* === Video Testimonials Section === */}
      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0f0f2a] to-[#1a1035]">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500 mb-4"
            >
              Real Transformation Stories
            </motion.h2>
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              See how graphology has changed lives and careers
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                src: "https://thealcworld.in/wp-content/uploads/2025/06/WhatsApp-Video-2025-05-31-at-11.42.05-AM.mp4",
                title: "Career Transformation"
              },
              {
                src: "https://thealcworld.in/wp-content/uploads/2025/06/WhatsApp-Video-2025-05-31-at-11.41.48-AM.mp4",
                title: "Personal Growth Journey"
              },
              {
                src: "https://thealcworld.in/wp-content/uploads/2025/06/WhatsApp-Video-2025-05-31-at-11.37.15-AM.mp4",
                title: "Improved Relationships"
              }
            ].map((video, index) => (
              <motion.div 
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                onMouseEnter={() => handleVideoHover(index)}
                onMouseLeave={() => handleVideoLeave(index)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-teal-500/20 to-purple-600/20 rounded-3xl transform group-hover:scale-105 transition-all duration-500"></div>
                <div className="relative bg-black/70 backdrop-blur-lg border border-white/10 rounded-3xl overflow-hidden shadow-2xl h-full">
                  <div className="relative aspect-video">
                    <video 
                      ref={el => videoRefs.current[index] = el}
                      src={video.src}
                      className="w-full h-full object-cover rounded-t-3xl"
                      muted={mutedStates[index]}
                      loop
                      playsInline
                    />
                    {hoveredVideo !== index && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                          <PlayIcon className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    )}
                    <button 
                      onClick={(e) => toggleMute(index, e)}
                      className="absolute top-3 right-3 bg-black/50 rounded-full p-2 hover:bg-black/80 transition"
                    >
                      {mutedStates[index] ? (
                        <SpeakerXMarkIcon className="w-5 h-5 text-white" />
                      ) : (
                        <SpeakerWaveIcon className="w-5 h-5 text-white" />
                      )}
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-white mb-2">{video.title}</h3>
                    <p className="text-gray-300">Hover to play testimonial • Click speaker to toggle sound</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* === End Video Testimonials Section === */}

      {/* === Certification Section === */}
      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0f0f1f] to-[#1a1a35]">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500 mb-4"
            >
              Industry-Recognized Certification
            </motion.h2>
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Earn a certificate that validates your knowledge of graphology
            </motion.p>
          </motion.div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <motion.div 
              className="bg-black/40 backdrop-blur-lg border border-white/10 rounded-3xl p-8 flex-1 max-w-lg"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-r from-teal-500/10 to-purple-600/10 rounded-2xl p-6 mb-6">
                <h3 className="text-xl font-bold text-white mb-4">Your Graphology Certificate</h3>
                <p className="text-gray-300 mb-4">Upon completion, you'll receive a certificate recognized by industry professionals.</p>
                <div className="space-y-4 mt-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <span className="text-teal-400">✓</span>
                    </div>
                    <p className="text-gray-300">Digital and printable formats</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <span className="text-teal-400">✓</span>
                    </div>
                    <p className="text-gray-300">Industry-recognized credential</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <span className="text-teal-400">✓</span>
                    </div>
                    <p className="text-gray-300">Enhances your professional profile</p>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                *Certificate sample shown is for illustration purposes. Actual certificate design may vary.
              </p>
            </motion.div>

            <motion.div 
              className="flex-1 max-w-lg"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-gradient-to-br from-teal-500/20 to-purple-600/20 rounded-3xl p-1 shadow-2xl">
                <div className="bg-black/70 backdrop-blur-md rounded-2xl overflow-hidden border border-white/10">
                  <img 
                    src="https://thealcworld.in/wp-content/uploads/2025/06/Screenshot-2025-06-04-at-3.14.05 AM.png" 
                    alt="Graphology Certificate" 
                    className="w-full h-auto object-cover rounded-2xl"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* === End Certification Section === */}

      {/* === FAQ Section === */}
      <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#0f0f2a] to-[#1a1035]">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500 mb-4"
            >
              Frequently Asked Questions
            </motion.h2>
            <motion.p 
              className="text-gray-300 max-w-2xl mx-auto text-lg"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Everything you need to know about the webinar
            </motion.p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div 
                key={index}
                className="bg-black/50 backdrop-blur-lg border border-white/10 rounded-2xl overflow-hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center bg-gradient-to-r from-teal-500/10 to-purple-600/10"
                  onClick={() => setOpen(open === index ? null : index)}
                >
                  <span className="font-bold text-white">{faq.question}</span>
                  <ChevronDownIcon 
                    className={`w-5 h-5 text-white transition-transform duration-300 ${open === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                
                <AnimatePresence>
                  {open === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 py-4 text-gray-300">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* === End FAQ Section === */}

      {/* === Final CTA Section === */}
      <section className="relative w-full py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-blue-900/30 z-0"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(101,87,255,0.1)_0%,rgba(101,87,255,0)_70%)] z-0"></div>
        
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <motion.div 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.h2 
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6"
            >
              Unlock the Secrets of Handwriting
            </motion.h2>
            <motion.p 
              className="text-gray-300 text-lg max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Join thousands who have discovered the power of graphology to understand themselves and others
            </motion.p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-xl border border-white/20 rounded-3xl p-8 mb-12"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-2">Graphology Signature Analysis Webinar</h3>
                <p className="text-gray-300">June 15, 2025 • 6:00 PM IST • Online via Zoom</p>
              </div>
              <motion.a
                href="https://thealcworld.in/courses-2/graphology-signature-analysis-webinar/"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 font-bold text-white rounded-full shadow-lg text-lg group"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 0 30px rgba(101, 87, 255, 0.7)',
                  background: "linear-gradient(45deg, #6366f1, #8b5cf6)"
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <span className="group-hover:animate-pulse">🔮</span> Register Now
              </motion.a>
            </div>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            <motion.a
              href="https://www.instagram.com/activelearningcompany/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Instagram</span>
            </motion.a>

            <motion.a
              href="https://www.youtube.com/@niravpakai1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-500 to-red-700 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </div>
              <span>YouTube</span>
            </motion.a>

            <motion.a
              href="https://www.facebook.com/ALCNiravPakai"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-300 hover:text-white transition"
              whileHover={{ scale: 1.1 }}
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </div>
              <span>Facebook</span>
            </motion.a>

            <motion.a
  href="https://wa.me/919820587467"
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 text-gray-300 hover:text-white transition"
  whileHover={{ scale: 1.1 }}
>
  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center">
    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.485 3.488"/>
    </svg>
  </div>
  <span>WhatsApp: +91 98205 87467</span>
</motion.a>
          </div>
        </div>
      </section>

      {/* === Footer === */}
<footer className="relative w-full py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
  <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-purple-500">
        <img 
          src="https://thealcworld.in/wp-content/uploads/2025/05/23-CL.jpg" 
          alt="ALC Logo" 
          className="w-full h-full object-contain"
        />
      </div>
      <div>
        <h3 className="font-bold text-white">The Active Learning Company</h3>
        <p className="text-gray-400 text-sm">Decoding Potential Since 2004</p>
      </div>
    </div>
    
    <div className="text-gray-400 text-sm text-center">
      © {new Date().getFullYear()} The Active Learning Company. All rights reserved.
    </div>
    
    <div className="text-gray-400 text-sm">
      Designed with ❤️ by <a href="https://www.linkedin.com/in/classictechak/" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:underline">Akash Jadhav</a>
    </div>
  </div>
</footer>
        
    </div>
  );
}
