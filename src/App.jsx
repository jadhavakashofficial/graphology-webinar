// src/App.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PencilIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
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

  useEffect(() => {
    const now = new Date();
    setInitialDays(Math.floor((targetDate - now) / (1000*60*60*24)));

    const update = () => {
      const diff    = targetDate - new Date();
      const days    = Math.max(Math.floor(diff / (1000*60*60*24)), 0);
      const hours   = Math.max(Math.floor((diff % (1000*60*60*24))/(1000*60*60)),0);
      const minutes = Math.max(Math.floor((diff % (1000*60*60))/(1000*60)),0);
      const seconds = Math.max(Math.floor((diff % (1000*60))/1000),0);
      setTimeLeft({ days, hours, minutes, seconds });
    };

    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  // ──────────────────────────────────────────────────────────────

  // ─── FAQ Accordion State ────────────────────────────────────
  const [open, setOpen] = useState(null);
  // ──────────────────────────────────────────────────────────────

  return (
    <div className="relative min-h-screen flex flex-col items-center bg-[#0a0a0f] px-4 sm:px-6 lg:px-8 py-16">
      {/* === Hero Section === */}
      {/* …your hero JSX here… */}



      {/* === Hero Section === */}
      <div className="absolute inset-0 bg-[repeating-linear-gradient(to bottom,rgba(255,255,255,0.05),rgba(255,255,255,0.05)_1px,transparent_1px,transparent_30px)]" />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-xl bg-black/60 backdrop-blur-md border border-white/20 rounded-3xl p-6 sm:p-8 md:p-10 text-center text-white"
      >
        {/* Badge */}
        <span className="inline-block bg-gradient-to-r from-teal-300 to-purple-500 text-black font-bold text-xs sm:text-sm uppercase px-3 py-1 rounded-full mb-4">
          Top Recommended in 2025
        </span>
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-teal-400 via-blue-400 to-purple-500 leading-tight">
          Decode Your Signature,
          <br />
          Discover Yourself
        </h1>
        {/* Pen-writing underline */}
        <div className="relative w-full max-w-xs sm:max-w-sm mx-auto h-1 mt-2 mb-6 overflow-visible">
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
        <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-md mx-auto mb-2">
          Join Nirav Pakai’s immersive webinar on Graphology (Handwriting & Signature Analysis).
        </p>
        {/* Date & Time */}
        <p className="text-xs sm:text-sm text-gray-400 mb-8">
          June 15, 2025 | 6:00 PM IST | Online via Zoom
        </p>
        {/* CTA */}
        <motion.a
          href="#"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)' }}
          transition={{ type: 'spring', stiffness: 300 }}
          className="inline-block px-6 sm:px-8 py-3 bg-gradient-to-r from-blue-500 via-cyan-400 to-purple-600 font-semibold text-white rounded-full shadow-lg cursor-pointer"
        >
          🔮 Register Now
        </motion.a>
      </motion.div>
      {/* === End Hero Section === */}

      {/* === Section 2: What Is Graphology? === */}
      <section className="w-full bg-gradient-to-br from-[#0f0f19] via-[#161622] to-[#0f0f19] py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500 mb-4"
          >
            What Is Graphology?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-4 max-w-3xl mx-auto text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed"
          >
            Graphology is the scientific study of handwriting and signatures, revealing personality traits, emotional patterns, and subconscious motivations through detailed stroke analysis.
          </motion.p>
          <motion.div
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.2 } } }}
          >
            {[
              { icon: '✍️', title: 'Personality Insights' },
              { icon: '🧠', title: 'Cognitive Patterns' },
              { icon: '💼', title: 'Leadership Traits' },
              { icon: '💬', title: 'Communication Styles' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={{ hidden: { opacity: 0, y: 20, scale: 0.9 }, visible: { opacity: 1, y: 0, scale: 1 } }}
                whileHover={{ scale: 1.05, rotateY: 10 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="bg-black/50 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center text-center cursor-pointer"
              >
                <div className="p-4 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full text-4xl mb-4">
                  {item.icon}
                </div>
                <h3 className="text-white font-semibold text-lg sm:text-xl">
                  {item.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      {/* === End Section 2 === */}

      {/* === Section 3: What You’ll Learn === */}

      {/* === Section 3: What You’ll Learn === */}
<section className="relative w-full bg-gradient-to-br from-[#010117] via-[#13132a] to-[#010117] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
  {/* Background accent shapes */}
  <div className="absolute inset-0 pointer-events-none">
    <div className="absolute top-0 left-1/2 w-64 h-64 bg-gradient-to-tr from-purple-600 to-teal-400 opacity-20 rounded-full -translate-x-1/2 filter blur-3xl"/>
    <div className="absolute bottom-0 right-1/3 w-72 h-72 bg-gradient-to-br from-teal-400 to-purple-600 opacity-20 rounded-full filter blur-3xl"/>
  </div>

  <div className="relative max-w-5xl mx-auto text-center">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500"
    >
      What You’ll Learn
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="mt-4 text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto"
    >
      In this immersive webinar, you will master:
    </motion.p>

    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8">
      {[
        {
          icon: "🎯",
          title: "Decode Emotional Patterns",
          desc: "Spot emotional triggers and balance feelings through handwriting analysis."
        },
        {
          icon: "🏅",
          title: "Identify Leadership Traits",
          desc: "Uncover confidence, integrity & leadership cues hidden in your signature."
        },
        {
          icon: "💬",
          title: "Boost Communication",
          desc: "Improve expression and decision-making by revealing your cognitive style."
        },
        {
          icon: "🔍",
          title: "Live Signature Reading",
          desc: "Experience a real-time demo and receive personalized insights."
        }
      ].map((item, idx) => (
        <div key={idx} className="group relative">
          {/* Gradient border */}
          <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-purple-500 rounded-3xl opacity-40 group-hover:opacity-80 transition-all duration-500"/>
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ scale: 1.05, rotateY: 10 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: idx * 0.1 }}
            viewport={{ once: true }}
            className="relative bg-black/60 backdrop-blur-md rounded-3xl p-6 flex flex-col items-start text-white cursor-pointer"
          >
            <div className="mb-4 p-4 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full text-2xl transition-transform group-hover:rotate-12">
              {item.icon}
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        </div>
      ))}
    </div>
  </div>
</section>
{/* === Section 4: About the Speaker === */}
{/* === Section 4: About the Speaker === */}
<section className="relative w-full bg-gradient-to-br from-[#080815] via-[#1b0e3a] to-[#080815] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
  {/* Background Blobs */}
  <div className="absolute inset-0 pointer-events-none">
    <motion.div
      className="absolute top-0 left-1/3 w-72 h-72 bg-gradient-to-tr from-purple-700 to-teal-400 opacity-15 rounded-full filter blur-2xl"
      animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-teal-400 to-purple-700 opacity-15 rounded-full filter blur-2xl"
      animate={{ x: [0, -50, 0], y: [0, 30, 0] }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
    />
  </div>

  <div className="relative max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
    {/* Portrait */}
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="flex justify-center"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="relative"
      >
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-teal-400 to-purple-500 opacity-60 blur-lg" />
        <img
          src="https://thealcworld.in/wp-content/uploads/2025/05/23-CL.jpg"
          alt="Nirav Pakai"
          className="relative w-80 h-80 sm:w-96 sm:h-96 md:w-[360px] md:h-[360px] object-cover rounded-full border-4 border-black shadow-2xl"
        />
      </motion.div>
    </motion.div>

    {/* Bio & Credentials */}
    <div className="space-y-8 text-center md:text-left">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-5xl sm:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500"
      >
        Nirav Pakai
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-2xl font-semibold text-teal-300"
      >
        Founder & Chief Mentor, The Active Learning Company
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-lg text-gray-300 leading-relaxed max-w-xl"
      >
        Transformational mentor and educator since 2004, graphologist since 2010—combining leadership psychology with spiritual wisdom to ignite breakthrough growth.
      </motion.p>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-300 text-base">
        {[
          "20+ years as science teacher & educator",
          "Graphologist & Signature Analyst since 2010",
          "Delivered 162+ seminars for 18+ MNCs & 150K+ individuals",
          "ISO 9001:2015 Certified",
          "Author of The 8CL – playbook for 1 Billion Smiles"
        ].map((item, idx) => (
          <motion.li
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 + idx * 0.1, duration: 0.5 }}
            className="flex items-start"
          >
            <span className="text-teal-400 mr-2 text-xl">✔</span>
            {item}
          </motion.li>
        ))}
      </ul>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mt-8 justify-center md:justify-start">
        <motion.a
          href="#"
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0,255,255,0.6)" }}
          transition={{ type: "spring", stiffness: 200 }}
          className="px-8 py-3 bg-gradient-to-r from-teal-400 to-purple-500 text-black font-semibold rounded-full shadow-lg"
        >
          Download Brochure
        </motion.a>
        <motion.a
          href="#"
          initial={{ scale: 0.9 }}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(255,255,255,0.4)" }}
          transition={{ type: "spring", stiffness: 200 }}
          className="px-8 py-3 border-2 border-teal-400 text-teal-400 font-semibold rounded-full shadow-lg"
        >
          Follow on Instagram
        </motion.a>
      </div>
    </div>
  </div>
</section>
{/* === Section 5: Who Should Attend === */}
{/* === Section 5: Who Should Attend === */}
<section className="relative w-full bg-gradient-to-br from-[#010114] via-[#1b1033] to-[#010114] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
  {/* Animated Accent Orbs */}
  <motion.div
    className="absolute top-10 left-10 w-72 h-72 bg-purple-600/20 rounded-full filter blur-3xl pointer-events-none"
    animate={{ rotate: 360 }}
    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
  />
  <motion.div
    className="absolute bottom-10 right-10 w-72 h-72 bg-teal-400/20 rounded-full filter blur-3xl pointer-events-none"
    animate={{ rotate: -360 }}
    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
  />

  <div className="relative max-w-6xl mx-auto text-center">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500"
    >
      Who Should Attend
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="mt-4 text-gray-300 text-lg sm:text-xl max-w-2xl mx-auto"
    >
      Ideal for anyone seeking deep insights into personality, communication, and behavior.
    </motion.p>

    <motion.div
      className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-8"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.2 } }
      }}
    >
      {[
        {
          icon: "👩‍🎓",
          title: "Students (14+)",
          desc: "Teens boosting confidence & self-awareness."
        },
        {
          icon: "👩‍🏫",
          title: "Educators & Teachers",
          desc: "Decode learners’ mindsets to enhance teaching."
        },
        {
          icon: "👨‍💼",
          title: "Working Professionals",
          desc: "Sharpen communication & leadership skills."
        },
        {
          icon: "👪",
          title: "Parents & Guardians",
          desc: "Understand children’s strengths & stress signals."
        },
        {
          icon: "🤝",
          title: "Coaches & HR",
          desc: "Gain personality insights for hiring & mentoring."
        },
        {
          icon: "🧠",
          title: "Lifelong Learners",
          desc: "Explore the science of human behavior."
        }
      ].map((item, idx) => (
        <motion.div
          key={idx}
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.9 },
            visible: { opacity: 1, y: 0, scale: 1 }
          }}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(0,255,255,0.2)" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative bg-black/60 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center text-center text-white cursor-pointer"
        >
          <div className="mb-4 p-4 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full text-3xl transition-transform group-hover:rotate-12">
            {item.icon}
          </div>
          <h3 className="text-xl sm:text-2xl font-semibold mb-2">
            {item.title}
          </h3>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {item.desc}
          </p>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>
{/* === Section 6: Agenda / Schedule === */}
{/* === Section 6: Agenda / Schedule === */}
<section className="relative w-full bg-gradient-to-br from-[#00010d] via-[#12122b] to-[#00010d] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
  {/* Header */}
  <div className="max-w-4xl mx-auto text-center mb-12">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500"
    >
      Agenda & Schedule
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="mt-4 text-gray-300 text-lg"
    >
      June 15, 2025 • 6:00 PM – 7:30 PM IST
    </motion.p>
  </div>

  {/* Connector Line (desktop only) */}
  <div className="hidden md:block absolute inset-x-8 top-1/2 h-1 bg-gray-700" />

  {/* Cards Grid */}
  <motion.div
    className="relative max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}
  >
    {[
      { time: "6:00 – 6:10 PM", title: "Welcome & Introduction" },
      { time: "6:10 – 6:30 PM", title: "Handwriting Fundamentals" },
      { time: "6:30 – 6:50 PM", title: "Signature Psychology" },
      { time: "6:50 – 7:20 PM", title: "Live Reading Demo" },
      { time: "7:20 – 7:30 PM", title: "Q&A & Next Steps" },
    ].map((item, idx) => (
      <motion.div
        key={idx}
        className="relative bg-black/60 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center text-center text-white cursor-pointer hover:scale-105 transition-transform"
        variants={{
          hidden: { opacity: 0, y: 20, scale: 0.9 },
          visible: { opacity: 1, y: 0, scale: 1 }
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20, delay: idx * 0.1 }}
      >
        {/* Number badge */}
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-400 to-purple-500 flex items-center justify-center text-white font-bold">
            {idx + 1}
          </div>
        </div>
        {/* Content */}
        <div className="mt-6 pt-4">
          <h3 className="text-white font-semibold text-base sm:text-lg mb-2">
            {item.time}
          </h3>
          <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
            {item.title}
          </p>
        </div>
      </motion.div>
    ))}
  </motion.div>
</section>
{/* === Section 7: Testimonials === */}



{/* === Section 7: Testimonials === */}

{/* === Section 7: Testimonials === */}
<section
  className="relative w-full bg-gradient-to-br from-[#00010d] via-[#12122b] to-[#00010d] py-20 px-4 sm:px-6 lg:px-8"
>
  {/* Header */}
  <div className="max-w-4xl mx-auto text-center mb-12">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-purple-500"
    >
      What Attendees Say
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="mt-4 text-gray-300 text-lg"
    >
      Real feedback from past participants
    </motion.p>
  </div>


  {/* Testimonials Grid */}
  <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
    {[
      {
        img: "https://randomuser.me/api/portraits/women/44.jpg",
        quote:
          "“I was amazed by how accurately the handwriting analysis reflected my personality. Truly eye-opening!”",
        name: "Aditi Sharma",
        role: "Undergraduate Student"
      },
      {
        img: "https://randomuser.me/api/portraits/men/46.jpg",
        quote:
          "“Nirav’s live signature demo gave me actionable insights I use daily in my leadership role.”",
        name: "Rajeev Menon",
        role: "HR Manager, TechCorp"
      },
      {
        img: "https://randomuser.me/api/portraits/women/65.jpg",
        quote:
          "“This webinar transformed how I approach communication—my team notices the difference!”",
        name: "Priya Rao",
        role: "Team Lead, FinSolutions"
      },
      {
        img: "https://randomuser.me/api/portraits/women/68.jpg",
        quote:
          "“As a parent, I finally understand my child’s stress patterns through their handwriting.”",
        name: "Sneha Kulkarni",
        role: "Parent & Educator"
      },
      {
        img: "https://randomuser.me/api/portraits/men/52.jpg",
        quote:
          "“A perfect blend of science and intuition—graphology has become my go-to tool.”",
        name: "Vikram Singh",
        role: "Life Coach"
      }
    ].map((t, idx) => (
      <div
        key={idx}
        style={{ perspective: "1000px" }}
        className="group"
      >
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: idx * 0.1 }}
          whileHover={{ scale: 1.05 }}
          className="relative bg-black/60 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center text-center text-white cursor-pointer transform-style-preserve-3d"
        >
          {/* Portrait with subtle parallax */}
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="mb-4 p-1 bg-gradient-to-r from-teal-400 to-purple-500 rounded-full"
          >
            <img
              src={t.img}
              alt={t.name}
              className="w-20 h-20 object-cover rounded-full border-2 border-black"
            />
          </motion.div>

          {/* Quote */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 + 0.2, duration: 0.6 }}
            className="italic text-gray-200 mb-4 leading-snug"
          >
            {t.quote}
          </motion.p>

          {/* Stars */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 + 0.3, duration: 0.6 }}
            className="flex mb-4"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} className="w-5 h-5 text-teal-400 mx-0.5" />
            ))}
          </motion.div>

          {/* Name & Role */}
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 + 0.4, duration: 0.6 }}
            className="font-semibold text-lg sm:text-xl"
          >
            {t.name}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 + 0.5, duration: 0.6 }}
            className="text-gray-400 text-sm sm:text-base"
          >
            {t.role}
          </motion.p>
        </motion.div>
      </div>
    ))}
  </div>
</section>
{/* === Section 8: About ALC === */}

{/* === Section 8: About ALC === */}
<section className="relative w-full bg-gradient-to-br from-[#080818] via-[#1c1035] to-[#080818] py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
  {/* Spotlight behind logo */}
  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
    <div className="w-80 h-80 bg-gradient-to-tr from-teal-400 to-purple-500 opacity-10 rounded-full filter blur-3xl"></div>
  </div>

  <div className="relative max-w-6xl mx-auto text-center space-y-10">
    {/* Logo */}
    <motion.img
      src="https://thealcworld.in/wp-content/uploads/2025/05/23-CL.jpg"
      alt="ALC Logo"
      className="mx-auto w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 object-cover rounded-full border-4 border-white shadow-2xl"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    />

    {/* Mission & Vision */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="space-y-4"
    >
      <h2 className="text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-purple-400">
        About The Active Learning Company
      </h2>
      <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
        We empower ambitious individuals to unlock their full potential through transformative
        learning in academics, business, and leadership—paired with spiritual growth.
      </p>
      <p className="text-gray-400 italic max-w-3xl mx-auto">
        “A world where driven individuals don’t just pursue success—they redefine it.”
      </p>
    </motion.div>

    {/* Counters */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
      {[
        { label: "Students Empowered",  value: students,    suffix: "+" },
        { label: "Parents Mentored",   value: parents,     suffix: "+" },
        { label: "Seminars Delivered", value: seminars,    suffix: ""  },
        { label: "MNCs Trained",       value: companies,   suffix: ""  },
      ].map((stat, i) => (
        <motion.div
          key={i}
          className="bg-black/50 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.1, duration: 0.6 }}
          whileHover={{ scale: 1.05, boxShadow: "0 8px 24px rgba(0,255,255,0.3)" }}
        >
          <span className="text-4xl sm:text-5xl font-bold text-teal-400">
            {stat.value.toLocaleString()}{stat.suffix}
          </span>
          <p className="mt-2 text-gray-300 text-sm sm:text-base">{stat.label}</p>
        </motion.div>
      ))}
    </div>

    {/* CTA */}
    <motion.a
      href="#"
      className="inline-block mt-12 px-8 py-4 bg-gradient-to-r from-teal-400 to-purple-500 text-black font-semibold rounded-full shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.8, duration: 0.6 }}
      whileHover={{ scale: 1.05, boxShadow: "0 12px 32px rgba(0,255,255,0.4)" }}
    >
      Join Our Community
    </motion.a>
  </div>
</section>
{/* === Section 9: Countdown Timer === */}

{/* === Section 8: About ALC (Counters) === */}
<section className="relative w-full bg-gradient-to-br from-[#080818] via-[#1c1035] to-[#080818] py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
  {/* Subtle animated background orbs */}
  <motion.div
    className="absolute top-0 left-1/3 w-64 h-64 bg-gradient-to-tr from-teal-400 to-purple-500 opacity-10 rounded-full filter blur-3xl pointer-events-none"
    animate={{ rotate: 360 }}
    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
  />
  <motion.div
    className="absolute bottom-0 right-1/4 w-72 h-72 bg-gradient-to-br from-purple-600 to-teal-400 opacity-10 rounded-full filter blur-3xl pointer-events-none"
    animate={{ rotate: -360 }}
    transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
  />

  <div className="relative max-w-6xl mx-auto text-center space-y-12">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl sm:text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-purple-400"
    >
      Our Impact in Numbers
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="text-gray-300 max-w-3xl mx-auto text-lg sm:text-xl"
    >
      Transforming lives through immersive learning experiences worldwide.
    </motion.p>

    <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
      {[
        { label: "Students Empowered",  value: students,   suffix: "+" },
        { label: "Parents Mentored",   value: parents,    suffix: "+" },
        { label: "Seminars Delivered", value: seminars,   suffix: ""  },
        { label: "MNCs Trained",       value: companies,  suffix: ""  },
      ].map((stat, i) => (
        <motion.div
          key={i}
          className="bg-black/50 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20, delay: i * 0.2 }}
          whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,255,255,0.2)" }}
        >
          <motion.span
            className="text-4xl sm:text-5xl md:text-6xl font-bold text-teal-400"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15, delay: i * 0.2 + 0.3 }}
          >
            {stat.value.toLocaleString()}{stat.suffix}
          </motion.span>
          <p className="mt-2 text-gray-300 text-sm sm:text-base">{stat.label}</p>
        </motion.div>
      ))}
    </div>

    <motion.a
      href="#"
      className="inline-block mt-12 px-8 py-4 bg-gradient-to-r from-teal-400 to-purple-500 text-black font-semibold rounded-full shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
      whileHover={{ scale: 1.05, boxShadow: "0 12px 32px rgba(0,255,255,0.4)" }}
    >
      Join Our Community
    </motion.a>
  </div>
</section>

{/* === Section 8: About ALC === */}

      {/* === Section 4: About the Speaker === */}
      {/* === Section 5: Who Should Attend === */}
      {/* === Section 6: Agenda / Schedule === */}
      {/* === Section 7: Testimonials === */}
      {/* === Section 8: About ALC === */}
      {/* === Section 9: Countdown Timer === */}

      {/* === Section 9: Countdown Timer === */}
<section className="w-full bg-[#070712] py-16 px-4 sm:px-6 lg:px-8">
  {/* Header */}
  <div className="max-w-3xl mx-auto text-center mb-8">
    <motion.h2
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500"
    >
      Webinar Starts In
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="mt-2 text-gray-400 text-sm sm:text-base"
    >
      June 15, 2025 • 6:00 PM IST — Don’t miss out!
    </motion.p>
  </div>

  {/* Countdown Grid */}
  <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6">
    {[
      { label: "Days",    value: timeLeft.days,    max: initialDays,  colors: ["#06b6d4","#8b5cf6"] },
      { label: "Hours",   value: timeLeft.hours,   max: 24,            colors: ["#06b6d4","#8b5cf6"] },
      { label: "Minutes", value: timeLeft.minutes, max: 60,            colors: ["#06b6d4","#8b5cf6"] },
      { label: "Seconds", value: timeLeft.seconds, max: 60,            colors: ["#f87171","#fb7185"] },
    ].map(({ label, value, max, colors }, i) => {
      const radius = 32;
      const circ = 2 * Math.PI * radius;
      const pct  = max > 0 ? Math.min(value / max, 1) : 0;
      const dash = circ * (1 - pct);

      return (
        <motion.div
          key={label}
          className="flex flex-col items-center space-y-1 p-2"
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300, damping: 25, delay: i * 0.1 }}
          style={{ perspective: "600px" }}
        >
          <div className="relative w-16 h-16">
            <svg
              className="absolute inset-0 -rotate-90"
              width="100%" height="100%" viewBox="0 0 80 80"
            >
              <circle
                cx="40" cy="40" r={radius}
                stroke="#2a2a38" strokeWidth="6" fill="none"
              />
              <circle
                cx="40" cy="40" r={radius}
                stroke={`url(#grad-${label})`} strokeWidth="6" fill="none"
                strokeDasharray={circ} strokeDashoffset={dash}
                style={{ transition: "stroke-dashoffset 0.5s ease-out" }}
              />
              <defs>
                <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="80" y2="80">
                  <stop offset="0%" stopColor={colors[0]} />
                  <stop offset="100%" stopColor={colors[1]} />
                </linearGradient>
              </defs>
            </svg>
            <motion.span
              key={value}
              className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg sm:text-xl"
              initial={{ scale: 0.7 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {value}
            </motion.span>
          </div>
          <p className="text-gray-300 uppercase text-xs sm:text-sm">{label}</p>
        </motion.div>
      );
    })}
  </div>

  {/* Micro-CTA */}
  <motion.p
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.5, duration: 0.6 }}
    className="mt-8 text-center text-gray-500 text-sm italic"
  >
    Seats are filling fast — hit Register Now to secure your spot!
  </motion.p>
</section>

      {/* === Section 10: FAQs === */}

   {/* === Section 10: FAQs === */}
<section className="w-full bg-gradient-to-br from-[#070712] via-[#1a162b] to-[#070712] py-20 px-4 sm:px-6 lg:px-8">
  <div className="max-w-4xl mx-auto space-y-6">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-3xl sm:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 text-center"
    >
      Frequently Asked Questions
    </motion.h2>
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="text-gray-400 text-center"
    >
      Find answers to the most common questions about the webinar
    </motion.p>

    {[
      {
        q: "What is graphology and signature analysis?",
        a: "A scientific method to decode personality traits, emotional patterns & leadership cues by examining handwriting."
      },
      {
        q: "Who should attend this webinar?",
        a: "Perfect for students (14+), educators, professionals, parents, coaches/HR and anyone curious about human behavior."
      },
      {
        q: "Do I need any prerequisites or special materials?",
        a: "No prior experience required—just paper, pen, and an open mind. We’ll guide you through every step."
      },
      {
        q: "How will the webinar be delivered?",
        a: "It’s a live Zoom session on June 15, 2025 at 6 PM IST—no software installs beyond Zoom, and a link is emailed to you."
      },
      {
        q: "Will there be a replay if I can’t make it live?",
        a: "Yes—every registrant gets access to the recording for 7 days post-event."
      },
      {
        q: "What is the refund or rescheduling policy?",
        a: "Full refund available up to 48 hours before the event, or you can transfer your spot to a future webinar."
      },
    ].map((item, idx) => (
      <motion.div
        key={idx}
        layout
        initial={{ borderRadius: "1rem" }}
        className="bg-black/50 backdrop-blur-md rounded-2xl overflow-hidden shadow-lg"
        transition={{ layout: { duration: 0.4, ease: "easeInOut" } }}
      >
        <motion.button
          layout
          onClick={() => setOpen(open === idx ? null : idx)}
          className="w-full px-6 py-4 flex justify-between items-center text-left"
          transition={{ backgroundColor: { duration: 0.2 } }}
          whileHover={{ backgroundColor: "#11101a" }}
        >
          <span className="text-white font-medium text-base sm:text-lg">
            {item.q}
          </span>
          <motion.span
            animate={{ rotate: open === idx ? 180 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <ChevronDownIcon className="w-6 h-6 text-teal-400" />
          </motion.span>
        </motion.button>

        <AnimatePresence initial={false}>
          {open === idx && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ height: { duration: 0.4, ease: "easeInOut" }, opacity: { duration: 0.3 } }}
              className="px-6 pb-4 text-gray-300 text-sm sm:text-base"
            >
              {item.a}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    ))}
  </div>
</section>

      {/* === Section 11: Final Call to Action === */}
{/* === Section 11: Final Call to Action === */}
<section className="relative w-full bg-gradient-to-br from-purple-900 via-blue-900 to-purple-900 py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
  {/* Floating Accent Orbs */}
  <motion.div
    className="absolute top-10 left-1/4 w-72 h-72 bg-gradient-to-tr from-teal-400 to-purple-500 opacity-10 rounded-full filter blur-3xl"
    animate={{ rotate: 360 }}
    transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
  />
  <motion.div
    className="absolute bottom-10 right-1/4 w-64 h-64 bg-gradient-to-br from-purple-400 to-teal-500 opacity-10 rounded-full filter blur-2xl"
    animate={{ rotate: -360 }}
    transition={{ repeat: Infinity, duration: 80, ease: "linear" }}
  />

  <div className="relative max-w-3xl mx-auto text-center space-y-8">
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white"
    >
      Ready to Decode Your Signature & Transform Your Life?
    </motion.h2>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.8 }}
      className="text-gray-300 text-lg sm:text-xl leading-relaxed"
    >
      Join Nirav Pakai’s immersive session on Graphology & Signature Analysis to uncover hidden strengths, boost confidence, and elevate your communication.
    </motion.p>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.8 }}
      className="text-gray-200 font-semibold"
    >
      June 15, 2025 • 6:00 PM IST • Live on Zoom
    </motion.p>

    <motion.a
      href="#"
      initial={{ scale: 0.9, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(16,185,129,0.7)" }}
      transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
      className="inline-block px-10 py-4 bg-gradient-to-r from-teal-400 to-purple-500 text-black font-bold rounded-full shadow-xl"
    >
      🔮 Register Now
    </motion.a>

    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.6 }}
      className="text-gray-400 italic"
    >
      Seats are limited — secure yours before they’re gone!
    </motion.p>
  </div>
</section>
{/* === Section 12: Footer === */}
{/* === Section 12: Footer === */}
<footer className="w-full bg-[#090a1a] text-gray-400 text-center py-6 px-4">
  <motion.p
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="text-sm sm:text-base"
  >
    © {new Date().getFullYear()} The Active Learning Company. Designed by{" "}
    <a
      href="https://www.linkedin.com/in/classictechak/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-teal-400 font-semibold hover:underline hover:text-teal-300 transition"
    >
      Akash Jadhav
    </a>.
  </motion.p>
</footer>


      {/* === Section 12: Footer === */}
    </div>
  );
}
