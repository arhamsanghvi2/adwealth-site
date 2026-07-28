import { useState, useEffect, Fragment } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ShieldCheck, Mail, Phone, MapPin, Loader2, CheckCircle2, Zap, Activity } from 'lucide-react';
import { mockApi } from '../services/api';
import { companyDetails, corporateActionProduct } from '../data/mockData';

// Animation configurations
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

function Home() {
  const location = useLocation();
  const [team, setTeam] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('scroll') === 'contact') {
      const timer = setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location]);
  const [featuredJobs, setFeaturedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Contact form state
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', company: '', subject: '', message: '' });
  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | submitting | success | error
  const [submitMsg, setSubmitMsg] = useState('');

  useEffect(() => {
    // Load mock API data
    const loadData = async () => {
      try {
        const companyRes = await mockApi.getCompanyDetails();
        const careersRes = await mockApi.getCareers();
        setTeam(companyRes.data.team);
        setFeaturedJobs(careersRes.data.jobs.slice(0, 2)); // Teaser with 2 jobs
      } catch (err) {
        console.error('Error fetching dashboard details:', err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const officeImages = Array.from({ length: 11 }, (_, i) => `/static/office/${i + 1}.webp`);
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % officeImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [officeImages.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus('submitting');
    try {
      const res = await mockApi.submitContactForm(formData);
      if (res.status === 201) {
        setSubmitStatus('success');
        setSubmitMsg(res.data.message);
        setFormData({ name: '', phone: '', email: '', company: '', subject: '', message: '' });
      } else {
        setSubmitStatus('error');
        setSubmitMsg(res.data?.message || 'Something went wrong. Please try again.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setSubmitMsg('Network error. Failed to reach operations server.');
    }
  };

  return (
    <div className="w-full relative overflow-hidden bg-white text-black font-sans selection:bg-black selection:text-white">
      
      {/* 1. HERO SECTION WITH 3D DASHBOARD */}
      <section className="relative min-h-[700px] flex items-center pt-24 pb-12 overflow-hidden bg-white border-b border-neutral-200">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-neutral-50 rounded-full blur-3xl opacity-60 -translate-y-1/4 translate-x-1/4 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid lg:grid-cols-2 gap-12 lg:gap-24 items-center relative z-10">
          {/* Left: Content */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="space-y-8 text-center lg:text-left"
          >
            <motion.div variants={fadeInUp} className="flex justify-center lg:justify-start">
              <span className="px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-black" />
                <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-600 font-bold">
                  IT Solutions for Financial Markets
                </span>
              </span>
            </motion.div>

            <motion.h1 
              variants={fadeInUp}
              className="text-4xl md:text-6xl font-bold font-heading text-black leading-[1.1] tracking-tight max-w-xl mx-auto lg:mx-0"
            >
              We build software for people who live in the markets.
            </motion.h1>

            <motion.p 
              variants={fadeInUp} 
              className="text-lg text-neutral-600 leading-relaxed max-w-lg mx-auto lg:mx-0 font-light"
            >
              Whether you're tracking dozens of tickers, running a strategy, managing a team, or just trying to automate that one annoying task — we'll help you make it real.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/careers" className="bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-neutral-800 transition-colors text-center shadow-sm">
                Join Our Team
              </Link>
              <button
                onClick={() => document.getElementById('flagship-platform')?.scrollIntoView({ behavior: 'smooth' })}
                className="border border-black text-black px-8 py-3 rounded-full font-medium hover:bg-neutral-100 transition-colors text-center cursor-pointer focus:outline-none"
              >
                View Products
              </button>
            </motion.div>

            <motion.div variants={fadeInUp} className="pt-8 flex items-center justify-center lg:justify-start gap-8 opacity-60 grayscale select-none">
               {['NSE', 'BSE', 'MCX'].map(ex => (
                  <span key={ex} className="font-bold text-xl text-neutral-300 tracking-widest font-mono">{ex}</span>
               ))}
            </motion.div>
          </motion.div>

          {/* Right: 3D Visual Dashboard */}
          <motion.div
             initial={{ opacity: 0, x: 100 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1.2, ease: "easeOut" }}
             className="relative h-[480px] w-full hidden lg:block perspective-[1200px]"
          >
             {/* The Floating Card Container */}
             <motion.div
               animate={{ rotateY: [-5, 5], rotateX: [2, -2] }}
               transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
               className="w-full h-full [transform-style:preserve-3d]"
             >
                {/* Main Dashboard Panel */}
                <div className="absolute inset-0 bg-white border border-neutral-200 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
                   <div className="h-10 bg-neutral-50 border-b border-neutral-100 flex items-center px-4 gap-2">
                      <div className="flex gap-1.5">
                         <div className="w-2 h-2 rounded-full bg-neutral-300" />
                         <div className="w-2 h-2 rounded-full bg-neutral-300" />
                      </div>
                      <div className="ml-auto text-[9px] font-mono text-neutral-400">STATUS: ACTIVE</div>
                   </div>
                   
                   <div className="flex-grow p-6 flex flex-col gap-6">
                      {/* Graph Area */}
                      <div className="flex-grow bg-neutral-50 rounded-lg border border-neutral-100 relative overflow-hidden group min-h-[180px]">
                          <div className="absolute inset-0 flex items-end justify-between px-4 pb-0 pt-8 gap-2 opacity-50">
                             {[30, 50, 45, 70, 60, 80, 55, 90, 65, 85].map((h, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ height: 0 }}
                                  animate={{ height: `${h}%` }}
                                  transition={{ duration: 1, delay: 0.5 + (i * 0.05) }}
                                  className="w-full bg-black rounded-t-sm opacity-80 group-hover:bg-neutral-800 transition-colors"
                                />
                             ))}
                          </div>
                          {/* Overlay Line */}
                          <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                             <motion.path
                                d="M0,150 C50,150 50,100 100,100 C150,100 150,50 200,50 C250,50 250,120 300,120 C350,120 350,20 400,20"
                                fill="none"
                                stroke="black"
                                strokeWidth="2.5"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                             />
                          </svg>
                      </div>

                      {/* Stats Row */}
                      <div className="h-24 grid grid-cols-2 gap-4">
                          <div className="bg-black text-white p-4 rounded-lg flex flex-col justify-between shadow-md">
                              <Zap size={16} />
                              <div>
                                 <div className="text-2xl font-bold font-heading">24ms</div>
                                 <div className="text-[10px] text-neutral-400 uppercase font-mono tracking-widest">Latency</div>
                              </div>
                          </div>
                          <div className="border border-neutral-200 p-4 rounded-lg flex flex-col justify-between bg-white shadow-sm">
                              <Activity size={16} className="text-neutral-400" />
                              <div>
                                 <div className="text-2xl font-bold text-black font-heading">99.9%</div>
                                 <div className="text-[10px] text-neutral-400 uppercase font-mono tracking-widest">Uptime</div>
                              </div>
                          </div>
                      </div>
                   </div>
                </div>

                {/* Floating Element Behind */}
                <motion.div 
                   className="absolute -z-10 -right-8 -bottom-8 w-48 h-48 bg-neutral-900 rounded-2xl"
                   animate={{ y: [0, 20, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
             </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. HORIZONTAL TICKER MARQUEE */}
      <section className="bg-white py-12">
        <div className="bg-black py-4 overflow-hidden border-y border-neutral-800">
            <motion.div 
                className="flex whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 20, ease: "linear", repeat: Infinity }}
            >
                {[...Array(2)].map((_, idx) => (
                    <div key={idx} className="flex gap-16 mx-8 items-center shrink-0">
                        {["MERGERS & ACQUISITIONS", "OFFER FOR SALE (OFS)", "DIVIDEND PAYMENTS", "STOCK SPLITS", "RIGHTS ISSUES", "BONUS ISSUES", "SHARE BUYBACKS", "SPIN-OFFS"].map((text) => (
                            <div key={text} className="flex items-center gap-4">
                                <span className="w-2 h-2 rounded-full bg-white" />
                                <span className="text-white text-xs font-mono font-bold tracking-widest">{text}</span>
                            </div>
                        ))}
                    </div>
                ))}
            </motion.div>
        </div>
      </section>

      {/* 3. PRODUCT TEASER (FLAGSHIP HIGHLIGHT) */}
      <section id="flagship-platform" className="py-24 px-6 md:px-12 border-b border-neutral-200 bg-neutral-50 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-5 flex flex-col gap-6">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">
                Our Flagship Platform
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-black tracking-tight">
                {corporateActionProduct.name}
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed">
                {corporateActionProduct.description}
              </p>
              <div className="mt-4">
                <Link
                  to="/product/corporate-action"
                  className="inline-flex items-center gap-2 text-black hover:text-neutral-700 font-semibold text-sm transition-all group"
                >
                  Explore Product Details
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-6">
              {corporateActionProduct.benefits.map((benefit, idx) => (
                <div key={idx} className="bg-white border border-neutral-200 p-8 rounded-2xl flex flex-col justify-between min-h-[220px] shadow-sm hover:border-neutral-300 transition-all duration-300">
                  <div className="text-4xl md:text-5xl font-heading font-bold text-black">
                    {benefit.metric}
                  </div>
                  <div>
                    <h3 className="text-black font-heading font-semibold text-sm mb-2">
                      {benefit.label}
                    </h3>
                    <p className="text-neutral-500 text-xs leading-normal font-light">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 3.5. WHY ADWEALTH SECTION */}
      <section className="py-24 bg-white border-b border-neutral-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Why Us */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest mb-3 font-bold">
                About ADwealth
              </p>
              <h2 className="text-4xl md:text-5xl font-bold tracking-tight font-heading text-black">
                Why ADwealth?
              </h2>
            </div>
            
            <div className="space-y-8">
              {[
                { 
                  t: "Market & Tech Expertise", 
                  d: "Not just coders. We are financial IT engineers who understand order routing, clearing mechanisms, and low-latency database architectures." 
                },
                { 
                  t: "High Performance Infrastructure", 
                  d: "In fintech, milliseconds matter. Our platforms are engineered for high throughput, sub-millisecond execution, and maximum uptime." 
                },
                { 
                  t: "Professional System Support", 
                  d: "When you deploy our solutions, you get direct 24/7 access to the system architects and engineers who wrote the core codebase." 
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 group">
                  <div className="w-8 h-8 rounded-xl bg-neutral-100 text-black flex items-center justify-center text-xs font-bold group-hover:bg-black group-hover:text-white transition-colors shrink-0 mt-1">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-1 text-black font-heading">{item.t}</h4>
                    <p className="text-neutral-500 text-sm leading-relaxed font-light">{item.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Slideshow */}
          <div className="relative h-[320px] sm:h-[400px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border border-neutral-100 group">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentImg}
                src={officeImages[currentImg]}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors duration-500" />
            <div className="absolute bottom-6 left-6 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-[10px] text-white font-mono uppercase tracking-widest select-none">
              Live Workspace Gallery
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPANY OVERVIEW */}
      {/* <section className="py-24 px-6 md:px-12 border-b border-neutral-200">
        <div className="max-w-7xl mx-auto flex flex-col gap-16">
          
          <div className="max-w-2xl flex flex-col gap-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">
              About Adwealth
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-heading text-black tracking-tight">
              Operational simplicity. Absolute certainty.
            </h2>
          </div>

          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-neutral-200 p-10 rounded-2xl flex flex-col gap-4 bg-neutral-50">
              <span className="text-xs uppercase font-mono font-bold text-neutral-500">Our Mission</span>
              <p className="text-black text-lg font-light leading-relaxed">
                {companyDetails.mission}
              </p>
            </div>
            <div className="border border-neutral-200 p-10 rounded-2xl flex flex-col gap-4 bg-neutral-50">
              <span className="text-xs uppercase font-mono font-bold text-neutral-500">Our Vision</span>
              <p className="text-black text-lg font-light leading-relaxed">
                {companyDetails.vision}
              </p>
            </div>
          </div>

          
          <div className="flex flex-col gap-8 mt-8">
            <h3 className="text-xl font-heading font-bold text-black border-b border-neutral-200 pb-4">
              Leadership Team
            </h3>
            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {team.map((member) => (
                  <div key={member.id} className="bg-white border border-neutral-200 p-6 rounded-2xl flex flex-col gap-4 shadow-sm">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-48 object-cover rounded-xl grayscale hover:grayscale-0 transition-all duration-300"
                    />
                    <div>
                      <h4 className="text-black font-heading font-bold text-lg">{member.name}</h4>
                      <p className="text-neutral-500 text-xs mb-3 font-mono">{member.role}</p>
                      <p className="text-neutral-600 text-sm font-light leading-relaxed">{member.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </section> */}

      {/* 5. CAREERS TEASER
      <section className="py-24 px-6 md:px-12 border-b border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto flex flex-col gap-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-xl flex flex-col gap-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 font-bold">
                Careers
              </span>
              <h2 className="text-3xl md:text-5xl font-bold font-heading text-black tracking-tight">
                Build the future of clearing infrastructure.
              </h2>
            </div>
            <Link
              to="/careers"
              className="inline-flex items-center gap-2 bg-black hover:bg-neutral-800 text-white font-semibold text-sm px-6 py-3.5 rounded-full transition-all duration-200 shadow-md"
            >
              View All Openings
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="w-6 h-6 animate-spin text-neutral-400" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredJobs.map((job) => (
                <div key={job.id} className="border border-neutral-200 p-8 rounded-2xl bg-white flex flex-col justify-between gap-6 shadow-sm">
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <h3 className="text-black font-heading font-bold text-lg md:text-xl">
                        {job.title}
                      </h3>
                      <span className="text-xs text-neutral-700 border border-neutral-200 px-2.5 py-1 rounded-full uppercase tracking-wider bg-neutral-50 font-mono whitespace-nowrap">
                        {job.type}
                      </span>
                    </div>
                    <p className="text-neutral-500 text-xs mb-4 font-mono">
                      {job.department} · {job.location} · {job.experience}
                    </p>
                    <p className="text-neutral-600 text-sm font-light leading-relaxed line-clamp-3">
                      {job.summary}
                    </p>
                  </div>
                  <div>
                    <Link
                      to="/careers"
                      className="inline-flex items-center gap-2 text-black hover:text-neutral-700 text-sm font-semibold"
                    >
                      Apply Now
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section> */}

      {/* 5. JOIN THE TEAM CTA BANNER */}
      <section className="py-16 px-6 bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto">
          <div className="bg-neutral-50 border border-neutral-200 rounded-[2.5rem] p-12 md:p-16 flex flex-col items-center justify-center text-center shadow-sm">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 font-heading tracking-tight">
              Join the Team
            </h2>
            <p className="text-neutral-600 max-w-xl text-sm sm:text-base mb-8 leading-relaxed font-light">
              We are always looking for curious minds, quantitative thinkers, and builders who live at the intersection of Finance & Tech.
            </p>
            <Link 
              to="/careers" 
              className="bg-black text-white hover:bg-neutral-800 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200 flex items-center gap-2 shadow-md hover:scale-[1.02] active:scale-95 cursor-pointer"
            >
              Explore Careers
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Testimonials />

      {/* 6. CONTACT SECTION */}
      <section id="contact" className="py-24 px-6 md:px-12 relative bg-white border-t border-neutral-200">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Info Details (Left Column) */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="bg-neutral-50 rounded-2xl p-8 border border-neutral-200 shadow-sm space-y-8">
              <h2 className="text-2xl font-bold text-black font-heading tracking-tight">Get In Touch</h2>
              
              <div className="space-y-6">
                
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">Email</span>
                    <a
                      href="https://mail.google.com/mail/?view=cm&fs=1&to=adwealthindia@gmail.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base sm:text-lg font-semibold text-black hover:underline break-all block"
                    >
                      adwealthindia@gmail.com
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">Phone</span>
                    <a href="tel:+917228882088" className="text-base sm:text-lg font-semibold text-black hover:underline">
                      +91-7228882088
                    </a>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest block mb-1">Address</span>
                    <p className="text-base sm:text-lg font-semibold text-black leading-snug font-sans">
                      301-303, Pramukh Tangent, KH-0,
                      <br />Gandhinagar, Gujarat, India - 382421
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-2xl overflow-hidden border border-neutral-200 h-64 lg:h-[420px] shadow-sm">
              <iframe
                title="ARHAM FinTech Office Location"
                src="https://maps.google.com/maps?q=Pramukh+Tangent+KH-0+Gandhinagar+Gujarat+382421+India&output=embed&z=16"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form (Right Column) */}
          <div className="lg:col-span-7">
            <form onSubmit={handleContactSubmit} className="bg-white border border-neutral-200 rounded-2xl p-8 space-y-6 shadow-sm">
              
              {submitStatus === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle2 className="w-12 h-12 text-black mb-4" />
                  <h4 className="text-black font-heading font-bold text-lg mb-2">Message Send</h4>
                  <p className="text-neutral-500 text-sm max-w-sm font-light">
                    {submitMsg}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubmitStatus('idle')}
                    className="mt-6 bg-black text-white hover:bg-neutral-800 font-mono text-xs tracking-widest uppercase px-6 py-3 rounded-full"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Your Name */}
                  <div>
                    <label htmlFor="form-name" className="block text-sm font-semibold text-black mb-2">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="form-name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 border border-neutral-300 focus:border-black rounded-lg focus:outline-none transition-colors text-black bg-white"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="form-phone" className="block text-sm font-semibold text-black mb-2">
                      Phone Number <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value="+91"
                        disabled
                        className="w-20 px-4 py-3 border border-neutral-300 rounded-lg bg-neutral-50 text-neutral-500 font-mono"
                      />
                      <input
                        type="tel"
                        id="form-phone"
                        name="phone"
                        required
                        pattern="[0-9]{10}"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="flex-1 px-4 py-3 border border-neutral-300 focus:border-black rounded-lg focus:outline-none transition-colors text-black bg-white"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>

                  {/* Your Email */}
                  <div>
                    <label htmlFor="form-email" className="block text-sm font-semibold text-black mb-2">
                      Your Email
                    </label>
                    <input
                      type="email"
                      id="form-email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border border-neutral-300 focus:border-black rounded-lg focus:outline-none transition-colors text-black bg-white"
                    />
                  </div>

                  {/* Your Company */}
                  <div>
                    <label htmlFor="form-company" className="block text-sm font-semibold text-black mb-2">
                      Your Company
                    </label>
                    <input
                      type="text"
                      id="form-company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Enter your company name"
                      className="w-full px-4 py-3 border border-neutral-300 focus:border-black rounded-lg focus:outline-none transition-colors text-black bg-white"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="form-subject" className="block text-sm font-semibold text-black mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="form-subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Enter subject"
                      className="w-full px-4 py-3 border border-neutral-300 focus:border-black rounded-lg focus:outline-none transition-colors text-black bg-white"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="form-message" className="block text-sm font-semibold text-black mb-2">
                      Your Question
                    </label>
                    <textarea
                      id="form-message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Enter your message"
                      className="w-full px-4 py-3 border border-neutral-300 focus:border-black rounded-lg focus:outline-none transition-colors resize-none text-black bg-white"
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <p className="text-red-500 text-xs">
                      {submitMsg}
                    </p>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={submitStatus === 'submitting'}
                    className="w-full bg-black text-white py-4 rounded-full font-semibold text-lg hover:bg-neutral-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
                  >
                    {submitStatus === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin text-white" />
                        Sending Message...
                      </>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </>
              )}

            </form>
          </div>

        </div>
      </section>

    </div>
  );
}

const testimonials = [
  { name: "Arham", role: "Prop Trader", text: "The automated announcement normalization matches every NSE and BSE filing with 100% precision. It changed our processing game." },
  { name: "Devam", role: "Market Participant", text: "Fast, robust API integrations. The entitlement tracking engine handles complex stock splits and mergers flawlessly." },
  { name: "Amee", role: "Tech Consultant", text: "Excellently designed corporate actions dashboard. The election routing UI is extremely intuitive for custodians." },
  { name: "Tejas", role: "Investment Manager", text: "The straight-through processing logic has reduced our manual reconciliation workload to absolute zero." },
  { name: "Chirag", role: "Operations Head", text: "The Corporate Actions platform has missed zero announcements since we migrated. Their event matching is incredibly precise." },
  { name: "Ronak", role: "Quantitative Analyst", text: "Scaling dividend reconciliation was a bottleneck until we integrated Adwealth. High throughput with zero latency." },
  { name: "Deepak", role: "Retail Broker", text: "Uptime and API reliability are excellent. The platform handles millions of stock announcements daily with ease." },
  { name: "Hiren", role: "Active Trader", text: "The custom corporate actions tracking layout is outstanding. It presents complex event schedules beautifully." },
  { name: "Meet", role: "System Architect", text: "Seamless database structure and robust error logging. It integrates directly into our existing clearing pipeline." },
  { name: "Param", role: "Risk Manager", text: "Adwealth's real-time notification feed makes event tracking effortless. The UI response latency is outstanding." },
  { name: "Darshan", role: "Trading Head", text: "The AI-driven announcement summaries extract key event dates with incredible accuracy." },
  { name: "Ajay", role: "Compliance Officer", text: "Simplified our tax calculation and entitlement workflows overnight. Clean code and highly stable." },
  { name: "Utsav", role: "Portfolio Manager", text: "Handles heavy concurrent database transaction logs with ease. Zero database locks on peak announcement days." },
  { name: "Devarsh", role: "Tech Lead", text: "Adwealth's entitlement matching engine has saved our operations team from countless manual processing errors." },
  { name: "Yash", role: "Operations Director", text: "An institutional-grade product. Their SWIFT ISO 20022 messaging compatibility is a massive advantage." },
  { name: "Disha", role: "Wealth Manager", text: "Very clean endpoints and detailed documentation. Adding custom webhook listeners for dividend declarations took minutes." },
  { name: "Yuvraj", role: "Settlement Specialist", text: "Exceptional edge-case handling for complex corporate actions like rights offerings and reverse splits." },
  { name: "Harsh", role: "Asset Servicing Associate", text: "The low-latency architecture handles high event volume during peak earnings season with absolute stability." },
];

const TestimonialsColumn = (props) => {
  return (
    <div className={props.className}>
      <motion.div
        animate={{
          translateY: "-50%",
        }}
        transition={{
          duration: props.duration || 10,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-col gap-6 pb-6"
      >
        {[...new Array(2)].fill(0).map((_, index) => (
          <Fragment key={index}>
            {props.testimonials.map(({ text, name, role }, i) => (
              <div className="p-8 sm:p-10 rounded-3xl border border-neutral-200 shadow-xl shadow-black/5 bg-white max-w-xs w-full" key={i}>
                <div className="text-neutral-600 leading-relaxed text-sm">"{text}"</div>
                <div className="flex items-center gap-3 mt-8">
                  <div className="w-10 h-10 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-bold text-black border border-neutral-200 uppercase">
                    {name.charAt(0)}
                  </div>
                  <div className="flex flex-col">
                    <div className="font-bold text-black text-xs uppercase tracking-widest">{name}</div>
                    <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-tight">{role}</div>
                  </div>
                </div>
              </div>
            ))}
          </Fragment>
        ))}
      </motion.div>
    </div>
  );
};

const Testimonials = () => {
  const firstColumn = testimonials.slice(0, 6);
  const secondColumn = testimonials.slice(6, 12);
  const thirdColumn = testimonials.slice(12, 18);

  return (
    <section className="bg-white py-24 relative overflow-hidden border-t border-neutral-200">
      <div className="max-w-7xl mx-auto px-6 z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto mb-20"
        >
          <div className="flex justify-center mb-6">
            <div className="border border-neutral-200 py-1.5 px-5 rounded-full text-[10px] font-bold uppercase tracking-widest text-neutral-500 bg-neutral-50">
              Testimonials
            </div>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center text-black mb-8 leading-[1.1] font-heading">
            What our users say <br /> across the market
          </h2>
          <p className="text-center text-neutral-500 text-lg leading-relaxed max-w-lg font-light">
            See why corporate action specialists and global wealth managers trust Adwealth to power their operations.
          </p>
        </motion.div>

        <div className="flex justify-center gap-8 [mask-image:linear-gradient(to_bottom,transparent,black_15%,black_85%,transparent)] max-h-[640px] overflow-hidden select-none">
          <TestimonialsColumn testimonials={firstColumn} duration={25} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={35} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={30} />
        </div>
      </div>
    </section>
  );
};

export default Home;
