/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useSpring, AnimatePresence } from 'motion/react';
import Lenis from 'lenis';
import { 
  ArrowUpRight, 
  Plus, 
  Mail, 
  Phone, 
  Globe, 
  Linkedin, 
  ChevronDown,
  ExternalLink,
  Instagram,
  Twitter,
  Send,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-brand-deep/80 backdrop-blur-md py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 flex items-center justify-center bg-brand-primary">
            <span className="text-xs font-black text-white">JB</span>
          </div>
          <span className="font-display font-black tracking-tighter text-2xl text-white">
            BASNILLO
          </span>
        </div>
        
        <div className="hidden lg:flex items-center gap-12">
          {['About', 'Expertise', 'Projects', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 hover:text-brand-primary text-white"
            >
              {item}
            </a>
          ))}
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-white"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <motion.div 
        initial={false}
        animate={{ height: isMenuOpen ? '100vh' : 0, opacity: isMenuOpen ? 1 : 0 }}
        className="lg:hidden bg-brand-deep fixed inset-0 z-40 overflow-hidden"
      >
        <div className="h-full flex flex-col items-center justify-center gap-8">
          {['About', 'Expertise', 'Projects', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              onClick={() => setIsMenuOpen(false)}
              className="text-6xl font-display font-black uppercase tracking-tighter hover:italic hover:text-brand-primary transition-all"
            >
              {item}
            </a>
          ))}
        </div>
      </motion.div>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  const xLeft = useSpring(useTransform(scrollYProgress, [0, 1], [0, -800]), springConfig);
  const xRight = useSpring(useTransform(scrollYProgress, [0, 1], [0, 800]), springConfig);
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, -25]), springConfig);
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [1, 0.5]), springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const yImage = useSpring(useTransform(scrollYProgress, [0, 1], [0, -200]), springConfig);

  return (
    <section ref={containerRef} className="relative h-[300vh] bg-brand-deep">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background Text Layers */}
        <motion.div 
          style={{ x: xLeft, opacity }}
          className="absolute top-[15%] left-0 whitespace-nowrap pointer-events-none"
        >
          <h2 className="text-[30vw] font-display font-black text-white/[0.02] leading-none uppercase tracking-tighter">
            STRATEGIC DESIGNER
          </h2>
        </motion.div>

        <motion.div 
          style={{ x: xRight, opacity }}
          className="absolute bottom-[15%] right-0 whitespace-nowrap pointer-events-none"
        >
          <h2 className="text-[30vw] font-display font-black text-white/[0.02] leading-none uppercase tracking-tighter">
            WEB ARCHITECT
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="relative z-10 text-center">
          <div className="overflow-hidden mask-reveal">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ scale }}
              className="text-[15vw] font-display font-black leading-[0.8] tracking-tighter uppercase text-white"
            >
              JAYVEE
            </motion.h1>
          </div>
          
          <div className="overflow-hidden mask-reveal">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ scale }}
              className="text-[15vw] font-display font-black leading-[0.8] tracking-tighter uppercase italic outline-text"
            >
              BASNILLO
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="pt-12 flex flex-col items-center gap-4"
          >
            <p className="text-xs font-black uppercase tracking-[0.4em] text-white/30 max-w-2xl">
              Graphic/Web Designer | WordPress Elementor Builder | AI Web Developer
            </p>
            <motion.div 
              animate={{ height: [0, 80, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px bg-brand-primary/40" 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section id="about" ref={ref} className="section-spacing bg-brand-deep">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-4 text-brand-primary/40"
            >
              <div className="w-12 h-px bg-brand-primary/20" />
              <span className="text-xs font-black uppercase tracking-widest">The Designer</span>
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-6xl leading-tight text-white"
            >
              Strategic.<br />Visionary.<br />Results driven.
            </motion.h2>
          </div>
          <div className="lg:col-span-8 space-y-12">
            <div className="overflow-hidden">
              <motion.p 
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-2xl md:text-3xl font-display font-black uppercase tracking-tighter leading-[1.2] text-white"
              >
                A designer with 10+ years of experience in graphic and web design, specializing in website design and development using WordPress and Elementor, while incorporating AI powered tools to create modern, efficient digital experiences.
              </motion.p>
            </div>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="text-white/60 text-lg font-light leading-relaxed max-w-3xl space-y-6"
            >
              <p>
                Specializes in UX UI design and WordPress development, delivering websites that combine strong visual design with effective structure and usability. Experienced in designing and implementing full websites, landing pages, and brand assets for businesses, nonprofits, and organizations.
              </p>
              <p>
                Extensive experience building websites using WordPress, Elementor, and Crocoblock tools such as JetEngine and JetElements, enabling dynamic and scalable web solutions.
              </p>
              <p>
                Also incorporates AI assisted workflows and modern design tools to accelerate prototyping, streamline development, and improve overall design efficiency.
              </p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.6 }}
                className="space-y-4"
              >
                <h4 className="text-sm font-black uppercase tracking-widest text-brand-primary">Web Design & UX/UI</h4>
                <p className="text-white/60 font-light">Creating intuitive interfaces and seamless user journeys that drive engagement.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.7 }}
                className="space-y-4"
              >
                <h4 className="text-sm font-black uppercase tracking-widest text-brand-primary">WordPress Development</h4>
                <p className="text-white/60 font-light">Building dynamic, high-performance websites using Elementor and Crocoblock.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8 }}
                className="space-y-4"
              >
                <h4 className="text-sm font-black uppercase tracking-widest text-brand-primary">Brand & Visual Design</h4>
                <p className="text-white/60 font-light">Crafting unique brand identities and visual assets that resonate with audiences.</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 }}
                className="space-y-4"
              >
                <h4 className="text-sm font-black uppercase tracking-widest text-brand-primary">AI Assisted Design Workflow</h4>
                <p className="text-white/60 font-light">Leveraging cutting-edge AI tools to enhance creativity and optimize production.</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const CapabilitySection = () => {
  const capabilities = [
    {
      title: "WordPress & Elementor",
      tags: ["WordPress & Elementor", "Elementor Pro", "Crocoblock", "JetEngine", "JetElements"],
    },
    {
      title: "Web Design & UX/UI Tools",
      tags: ["Figma", "Prototyping & Responsive Design"],
    },
    {
      title: "Graphic Design & Branding Tools",
      tags: ["Adobe Photoshop", "Adobe Illustrator", "Canva", "Logo Design & Brand Identity", "Print Design", "Social Media Assets"],
    },
    {
      title: "AI-Assisted Design Tools",
      tags: ["ChatGPT / OpenAI", "Google AI Studio", "Cursor AI", "Vercel"],
    }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section id="expertise" ref={ref} className="section-spacing bg-brand-secondary relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-4 text-brand-primary/40"
            >
              <div className="w-12 h-px bg-brand-primary/20" />
              <span className="text-xs font-black uppercase tracking-widest">Core Skills</span>
            </motion.div>
            <div className="space-y-8">
              <motion.h2 
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-8xl leading-tight text-white"
              >
                Expertise Built<br />on Precision
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl font-light leading-relaxed text-white/60 max-w-xl"
              >
                A comprehensive suite of digital design and development services tailored for modern business needs. Leveraging the latest tools and AI-assisted workflows to deliver high-performance, visually compelling results.
              </motion.p>
            </div>
          </div>
          
          <div className="space-y-8">
            {capabilities.map((c, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="group cursor-pointer border-b border-white/10 pb-8"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-black uppercase tracking-tighter group-hover:translate-x-4 transition-transform duration-500 text-white">{c.title}</h3>
                  <Plus className="w-6 h-6 transition-transform duration-500 group-hover:rotate-90 text-brand-primary" />
                </div>
                <div className="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {c.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-brand-primary text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ToolsSection = () => {
  const tools = [
    "Canva", "Figma", "Adobe XD", "WordPress", 
    "Elementor / Elementor Pro", "Crocoblock", "JetEngine", "JetElements",
    "Adobe Photoshop", "Adobe Illustrator", "Cursor AI", "GitHub",
    "Vercel", "HTML", "CSS", "JS"
  ];

  return (
    <section className="py-12 bg-brand-deep overflow-hidden relative border-y border-white/5">
      <div className="flex whitespace-nowrap">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 items-center"
        >
          {[...tools, ...tools].map((tool, i) => (
            <React.Fragment key={i}>
              <span className="text-white/20 text-xl md:text-3xl font-display font-black uppercase tracking-widest hover:text-white/60 transition-colors cursor-default">
                {tool}
              </span>
              <span className="text-white/5 text-2xl">/</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ExperienceSection = () => {
  const experience = [
    { company: "Excelsior Creative", role: "Graphic/Web Designer | WordPress Elementor Builder | AI Web Developer", period: "Jan 2020 - Present", location: "United States · Remote" },
    { company: "DIGITALON AUSTRALIA", role: "Front-End Developer Wordpress-Elementor", period: "2021 - 2023", location: "Australia · Remote" },
    { company: "Advallu", role: "Senior Web Designer", period: "Jan 2019 - Dec 2019", location: "Remote" },
    { company: "You1st Global Solutions", role: "Design Team Lead", period: "Oct 2014 - Jan 2019", location: "Remote" },
    { company: "99designs", role: "Freelance logo and Web Designer", period: "Jan 2012 - Dec 2014", location: "Remote" }
  ];

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="experience" ref={ref} className="section-spacing bg-brand-deep">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-4 space-y-8">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              className="flex items-center gap-4 text-brand-primary/40"
            >
              <div className="w-12 h-px bg-brand-primary/20" />
              <span className="text-xs font-black uppercase tracking-widest">Career History</span>
            </motion.div>
            <div className="space-y-8">
              <motion.h2 
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-8xl text-white"
              >
                Experience<br />& Growth
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-xl md:text-2xl font-light leading-relaxed text-white/60"
              >
                A decade of refining digital craft, from early freelance explorations to leading design teams and building high-performance web solutions for global clients.
              </motion.p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-12">
            {experience.map((exp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-white/5 pb-12 group hover:border-brand-primary transition-colors duration-500"
              >
                <div className="md:col-span-3">
                  <span className="text-xs font-black uppercase tracking-[0.3em] opacity-30 group-hover:opacity-100 transition-opacity text-white">{exp.period}</span>
                </div>
                <div className="md:col-span-9 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h3 className="text-4xl md:text-5xl font-display font-black uppercase tracking-tighter group-hover:italic transition-all duration-500 text-white group-hover:text-brand-primary">{exp.company}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest opacity-30 group-hover:opacity-100 text-white">{exp.location}</span>
                  </div>
                  <p className="text-xl md:text-2xl font-light opacity-60 group-hover:opacity-100 transition-opacity text-white">{exp.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const ProjectGrid = ({ onProjectClick }: { onProjectClick: (project: any) => void }) => {
  const projects = [
    { title: "VietRise", category: "Community", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fvietrise.org%2F?w=1200", url: "https://vietrise.org/", description: "A community-focused platform for VietRise, empowering the Vietnamese community through cultural and civic engagement. The site features a clean, responsive design with integrated event management and resource libraries." },
    { title: "OC MECCA", category: "Community", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Focmecca.org%2F?w=1200", url: "https://ocmecca.org/", description: "Digital home for Orange County Multi-Ethnic Collaborative of Community Agencies. Designed to facilitate collaboration and resource sharing among diverse community groups with a focus on accessibility and multi-lingual support." },
    { title: "AA Museum GP", category: "Museum", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Faamuseumgp.org%2F?w=1200", url: "https://aamuseumgp.org/", description: "An immersive digital museum experience showcasing African American history and culture. Features high-resolution galleries, interactive timelines, and educational resources built with a focus on visual storytelling." },
    { title: "Strata Expanse", category: "Corporate", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fstrataexpanse.com%2F?w=1200", url: "https://strataexpanse.com/", description: "A high-performance corporate landing page for Strata Expanse, highlighting their strategic consulting services. Built with a brutalist aesthetic and smooth scroll animations to communicate authority and modernism." },
    { title: "Anaheim CF", category: "Foundation", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fanaheimcf.org%2F?w=1200", url: "https://anaheimcf.org/", description: "Official website for the Anaheim Community Foundation. Streamlined donation processes and community grant applications with a focus on transparency and user-friendly navigation." },
    { title: "Devoted to Design", category: "Foundation", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fdevotedtodesignfoundation.org%2F?w=1200", url: "https://devotedtodesignfoundation.org/", description: "A visually striking platform for a design-centric foundation. Emphasizes aesthetic precision and creative impact through bold typography and dynamic layout transitions." },
    { title: "CLAOC", category: "Coalition", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fclaoc.org%2F?w=1200", url: "https://claoc.org/", description: "Digital platform for the CEO Leadership Alliance Orange County. Facilitates high-level collaboration and strategic planning with a professional, data-driven design language." },
    { title: "OC Fellows", category: "Non-Profit", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Focfellows.org%2F?w=1200", url: "https://ocfellows.org/", description: "A networking and resource platform for Orange County fellows. Focuses on professional development and community building with integrated member directories and event calendars." },
    { title: "Terrorism Law", category: "Legal", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fterrorismlaw.com%2F?w=1200", url: "https://terrorismlaw.com/", description: "A specialized legal resource site providing insights and analysis on terrorism law. Features a robust content management system for legal articles and case studies." },
    { title: "Susan Choi Law", category: "Legal", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fsusanchoi.law%2F?w=1200", url: "https://susanchoi.law/", description: "Professional portfolio for attorney Susan Choi. Emphasizes trust and expertise through a clean, minimalist design and clear communication of legal services." },
    { title: "MKC Law", category: "Legal", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmkc-law.com%2F?w=1200", url: "https://mkc-law.com/", description: "Modern website for MKC Law firm. Streamlined client intake forms and clear service overviews built with a focus on conversion and professional authority." },
    { title: "Albanos", category: "E-Commerce", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Falbanos.com%2F?w=1200", url: "https://albanos.com/", description: "A high-conversion e-commerce platform for Albanos. Features advanced product filtering, seamless checkout flows, and a visually rich shopping experience." },
    { title: "1in6", category: "Non-Profit", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2F1in6.org%2F?w=1200", url: "https://1in6.org/", description: "A sensitive and supportive platform for 1in6, providing resources for male survivors of sexual abuse. Focuses on privacy, accessibility, and compassionate design." },
    { title: "Thompson Family Foundation", category: "Foundation", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fthompsonfamilyfoundation.us%2F?w=1200", url: "https://thompsonfamilyfoundation.us/", description: "Official site for the Thompson Family Foundation. Highlights philanthropic initiatives and grant opportunities with a focus on legacy and community impact." },
    { title: "Gold Futures Challenge", category: "Initiative", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fgoldfutureschallenge.org%2F?w=1200", url: "https://goldfutureschallenge.org/", description: "A dynamic platform for the Gold Futures Challenge initiative. Features real-time tracking of challenges and community contributions with a bold, energetic design." },
    { title: "Green Door Hospitality", category: "Hospitality", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fgreendoorhospitality.com%2F?w=1200", url: "https://greendoorhospitality.com/", description: "A luxurious digital experience for Green Door Hospitality. Emphasizes high-end service and unique hospitality experiences through elegant typography and rich imagery." }
  ];

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-85%"]);

  return (
    <section id="projects" ref={targetRef} className="relative h-[600vh] bg-brand-deep">
      <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-24 px-[10vw]">
          {projects.map((p, i) => (
            <motion.div 
              key={i}
              onClick={() => onProjectClick(p)}
              className="group relative flex-shrink-0 w-[85vw] md:w-[60vw] aspect-[16/10] overflow-hidden cursor-pointer border border-white/5"
            >
              <img 
                src={p.image} 
                alt={p.title} 
                className="w-full h-full object-cover object-top grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-brand-deep/90 opacity-0 group-hover:opacity-100 transition-all duration-500 p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-brand-primary text-xs font-black uppercase tracking-widest">{p.category}</span>
                  <div className="w-16 h-16 bg-brand-primary flex items-center justify-center rounded-full transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                    <ArrowUpRight className="text-white w-8 h-8" />
                  </div>
                </div>
                <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                  <h3 className="text-white text-6xl md:text-8xl font-display font-black uppercase tracking-tighter leading-none">{p.title}</h3>
                  <p className="text-brand-accent text-xs font-black uppercase tracking-widest mt-6 flex items-center gap-4">
                    <span className="w-8 h-px bg-brand-primary/40" />
                    View Case Study
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProjectDetail = ({ project, onClose, allProjects }: { project: any, onClose: () => void, allProjects: any[] }) => {
  if (!project) return null;

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-brand-deep overflow-y-auto"
    >
      <button 
        onClick={onClose}
        className="fixed top-8 right-8 z-[110] p-4 bg-brand-primary text-white rounded-full hover:scale-110 transition-transform"
      >
        <X className="w-8 h-8" />
      </button>

      <div className="max-w-[1800px] mx-auto px-6 md:px-12 py-32 text-white">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
          <div className="space-y-12">
            <div className="space-y-4">
              <span className="text-xs font-black uppercase tracking-[0.5em] text-brand-primary/40">{project.category}</span>
              <h2 className="text-7xl md:text-9xl font-display font-black uppercase tracking-tighter leading-none">{project.title}</h2>
            </div>
            
            <p className="text-2xl md:text-3xl font-light leading-relaxed text-white/60">
              {project.description}
            </p>

            <a 
              href={project.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-6 bg-brand-primary text-white px-12 py-6 text-xl font-black uppercase tracking-widest hover:bg-brand-accent transition-all group rounded-full"
            >
              Visit Live Website
              <ArrowUpRight className="w-8 h-8 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
            </a>
          </div>

          <div className="aspect-[16/10] overflow-hidden border border-white/10">
            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover object-top"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Related Projects Slider */}
        <div className="mt-48 space-y-12">
          <div className="flex items-center gap-4 text-brand-primary/40">
            <div className="w-12 h-px bg-brand-primary/20" />
            <span className="text-xs font-black uppercase tracking-widest">Other Projects</span>
          </div>
          
          <div className="flex gap-8 overflow-x-auto pb-12 scrollbar-hide">
            {allProjects.filter(p => p.title !== project.title).map((p, i) => (
              <div 
                key={i}
                onClick={() => {
                  onClose();
                  setTimeout(() => window.dispatchEvent(new CustomEvent('openProject', { detail: p })), 100);
                }}
                className="flex-shrink-0 w-[300px] md:w-[450px] space-y-4 cursor-pointer group"
              >
                <div className="aspect-[16/10] overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-500 border border-white/10">
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover object-top" referrerPolicy="no-referrer" />
                </div>
                <h4 className="text-xl font-black uppercase tracking-tighter text-white group-hover:text-brand-primary transition-colors">{p.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="contact" ref={ref} className="section-spacing bg-brand-deep text-white relative overflow-hidden">
      <div className="absolute inset-0 blue-glow pointer-events-none" />
      <div className="max-w-[1800px] mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
          <div className="lg:col-span-12 space-y-12 text-center">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="flex items-center justify-center gap-4 text-brand-primary/40"
            >
              <div className="w-12 h-px bg-brand-primary/20" />
              <span className="text-xs font-black uppercase tracking-widest">Connect</span>
              <div className="w-12 h-px bg-brand-primary/20" />
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[12vw] leading-none font-display font-black uppercase tracking-tighter"
            >
              Build with<br />
              <span className="italic outline-text">Confidence.</span>
            </motion.h2>
            
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-8 pt-12"
            >
              <a 
                href="#contact-form" 
                className="inline-flex items-center gap-6 bg-brand-primary text-white px-12 py-6 text-xl md:text-2xl font-black uppercase tracking-widest hover:bg-brand-accent transition-all group rounded-full"
              >
                Get in Touch
                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });
  
  const stats = [
    { label: "Years Experience", value: "10+" },
    { label: "Projects Completed", value: "50+" },
  ];

  return (
    <section ref={ref} className="py-24 bg-brand-deep text-white overflow-hidden border-t border-white/5">
      <div className="max-w-[1800px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="space-y-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
              {stats.map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 1, delay: i * 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-center md:items-start"
                >
                  <span className="text-7xl md:text-8xl font-display font-black tracking-tighter leading-none">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] mt-4 opacity-40">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl font-light leading-relaxed opacity-60"
            >
              A web and digital designer focused on creating clean, modern, and functional websites. Specializing in WordPress and Elementor development, with experience building scalable websites using Crocoblock tools such as JetEngine and JetElements.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '', honeypot: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.honeypot) {
      console.log('Spam detected');
      return;
    }
    console.log('Form submitted to basnillo.jayv@gmail.com:', formState);
    alert('Thank you for your message! I will get back to you soon.');
    setFormState({ name: '', email: '', message: '', honeypot: '' });
  };

  return (
    <footer className="bg-brand-deep py-20 px-6 md:px-12 border-t border-white/5">
      <div className="max-w-[1800px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 mb-24">
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-primary flex items-center justify-center">
                <span className="text-white text-xs font-black">JB</span>
              </div>
              <span className="text-2xl font-display font-black uppercase tracking-tighter text-white">Basnillo</span>
            </div>
            <h3 className="text-4xl md:text-6xl font-display font-black uppercase tracking-tighter leading-none text-white">
              Let's create something<br />extraordinary together.
            </h3>
            <div className="space-y-4">
              <p className="text-brand-primary/40 text-xs font-black uppercase tracking-widest">Contact Details</p>
              <a href="mailto:basnillo.jayv@gmail.com" className="text-2xl font-light hover:italic transition-all text-white/60 hover:text-white">basnillo.jayv@gmail.com</a>
            </div>
          </div>

          <form id="contact-form" onSubmit={handleSubmit} className="space-y-8">
            <input 
              type="text" 
              name="honeypot" 
              style={{ display: 'none' }} 
              tabIndex={-1} 
              autoComplete="off"
              value={formState.honeypot}
              onChange={(e) => setFormState({...formState, honeypot: e.target.value})}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-primary/40">Name</label>
                <input 
                  type="text" 
                  required
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-brand-primary transition-colors font-light text-white"
                  placeholder="Your Name"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-brand-primary/40">Email</label>
                <input 
                  type="email" 
                  required
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                  className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-brand-primary transition-colors font-light text-white"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-brand-primary/40">Message</label>
              <textarea 
                required
                rows={4}
                value={formState.message}
                onChange={(e) => setFormState({...formState, message: e.target.value})}
                className="w-full bg-transparent border-b border-white/10 py-4 focus:outline-none focus:border-brand-primary transition-colors font-light text-white resize-none"
                placeholder="Tell me about your project"
              />
            </div>
            <button 
              type="submit"
              className="w-full md:w-auto bg-brand-primary text-white px-12 py-6 text-xs font-black uppercase tracking-widest hover:bg-brand-accent transition-all flex items-center justify-center gap-4 group"
            >
              Send Message
              <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </form>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-12 pt-12 border-t border-white/5">
          <div className="flex items-center gap-4">
            <span className="text-white text-xs font-black uppercase tracking-widest">Jayvee Basnillo • Strategic Design</span>
          </div>
          
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest text-white/40">
            <a href="https://linkedin.com/in/jayvee-basnillo" target="_blank" rel="noopener noreferrer" className="hover:text-brand-primary transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-brand-primary transition-colors">Portfolio</a>
            <a href="mailto:basnillo.jayv@gmail.com" className="hover:text-brand-primary transition-colors">Email</a>
          </div>
          
          <div className="text-[10px] font-black uppercase tracking-widest text-white/20">
            © 2026 JAYVEE BASNILLO. ALL RIGHTS RESERVED.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    const handleOpenProject = (e: any) => setSelectedProject(e.detail);
    window.addEventListener('openProject', handleOpenProject);
    return () => window.removeEventListener('openProject', handleOpenProject);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const projects = [
    { title: "VietRise", category: "Community", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fvietrise.org%2F?w=1200", url: "https://vietrise.org/", description: "A community-focused platform for VietRise, empowering the Vietnamese community through cultural and civic engagement. The site features a clean, responsive design with integrated event management and resource libraries." },
    { title: "OC MECCA", category: "Community", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Focmecca.org%2F?w=1200", url: "https://ocmecca.org/", description: "Digital home for Orange County Multi-Ethnic Collaborative of Community Agencies. Designed to facilitate collaboration and resource sharing among diverse community groups with a focus on accessibility and multi-lingual support." },
    { title: "AA Museum GP", category: "Museum", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Faamuseumgp.org%2F?w=1200", url: "https://aamuseumgp.org/", description: "An immersive digital museum experience showcasing African American history and culture. Features high-resolution galleries, interactive timelines, and educational resources built with a focus on visual storytelling." },
    { title: "Strata Expanse", category: "Corporate", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fstrataexpanse.com%2F?w=1200", url: "https://strataexpanse.com/", description: "A high-performance corporate landing page for Strata Expanse, highlighting their strategic consulting services. Built with a brutalist aesthetic and smooth scroll animations to communicate authority and modernism." },
    { title: "Anaheim CF", category: "Foundation", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fanaheimcf.org%2F?w=1200", url: "https://anaheimcf.org/", description: "Official website for the Anaheim Community Foundation. Streamlined donation processes and community grant applications with a focus on transparency and user-friendly navigation." },
    { title: "Devoted to Design", category: "Foundation", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fdevotedtodesignfoundation.org%2F?w=1200", url: "https://devotedtodesignfoundation.org/", description: "A visually striking platform for a design-centric foundation. Emphasizes aesthetic precision and creative impact through bold typography and dynamic layout transitions." },
    { title: "CLAOC", category: "Coalition", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fclaoc.org%2F?w=1200", url: "https://claoc.org/", description: "Digital platform for the CEO Leadership Alliance Orange County. Facilitates high-level collaboration and strategic planning with a professional, data-driven design language." },
    { title: "OC Fellows", category: "Non-Profit", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Focfellows.org%2F?w=1200", url: "https://ocfellows.org/", description: "A networking and resource platform for Orange County fellows. Focuses on professional development and community building with integrated member directories and event calendars." },
    { title: "Terrorism Law", category: "Legal", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fterrorismlaw.com%2F?w=1200", url: "https://terrorismlaw.com/", description: "A specialized legal resource site providing insights and analysis on terrorism law. Features a robust content management system for legal articles and case studies." },
    { title: "Susan Choi Law", category: "Legal", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fsusanchoi.law%2F?w=1200", url: "https://susanchoi.law/", description: "Professional portfolio for attorney Susan Choi. Emphasizes trust and expertise through a clean, minimalist design and clear communication of legal services." },
    { title: "MKC Law", category: "Legal", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fmkc-law.com%2F?w=1200", url: "https://mkc-law.com/", description: "Modern website for MKC Law firm. Streamlined client intake forms and clear service overviews built with a focus on conversion and professional authority." },
    { title: "Albanos", category: "E-Commerce", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Falbanos.com%2F?w=1200", url: "https://albanos.com/", description: "A high-conversion e-commerce platform for Albanos. Features advanced product filtering, seamless checkout flows, and a visually rich shopping experience." },
    { title: "1in6", category: "Non-Profit", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2F1in6.org%2F?w=1200", url: "https://1in6.org/", description: "A sensitive and supportive platform for 1in6, providing resources for male survivors of sexual abuse. Focuses on privacy, accessibility, and compassionate design." },
    { title: "Thompson Family Foundation", category: "Foundation", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fthompsonfamilyfoundation.us%2F?w=1200", url: "https://thompsonfamilyfoundation.us/", description: "Official site for the Thompson Family Foundation. Highlights philanthropic initiatives and grant opportunities with a focus on legacy and community impact." },
    { title: "Gold Futures Challenge", category: "Initiative", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fgoldfutureschallenge.org%2F?w=1200", url: "https://goldfutureschallenge.org/", description: "A dynamic platform for the Gold Futures Challenge initiative. Features real-time tracking of challenges and community contributions with a bold, energetic design." },
    { title: "Green Door Hospitality", category: "Hospitality", image: "https://s.wordpress.com/mshots/v1/https%3A%2F%2Fgreendoorhospitality.com%2F?w=1200", url: "https://greendoorhospitality.com/", description: "A luxurious digital experience for Green Door Hospitality. Emphasizes high-end service and unique hospitality experiences through elegant typography and rich imagery." }
  ];

  return (
    <div className="min-h-screen bg-brand-deep selection:bg-brand-primary selection:text-white">
      <div className="noise" />
      <Navbar />
      <main>
        <Hero />
        <ToolsSection />
        <AboutSection />
        <StatsSection />
        <CapabilitySection />
        <ProjectGrid onProjectClick={setSelectedProject} />
        <ExperienceSection />
        <Contact />
      </main>
      <Footer />
      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail 
            project={selectedProject} 
            onClose={() => setSelectedProject(null)} 
            allProjects={projects}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
