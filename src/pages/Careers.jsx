import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MapPin, X, Loader2, Check } from 'lucide-react';
import LaptopAnimation from '../components/careers/LaptopAnimation';
import { mockApi } from '../services/api';

const SKILLS = [
  { id: 'html_css', name: 'HTML/CSS' },
  { id: 'node_js', name: 'Node JS' },
  { id: 'next_js', name: 'Next JS' },
  { id: 'react_native', name: 'React Native' },
  { id: 'databases', name: 'Databases (SQL/NoSQL)' }
];

const QUALIFICATIONS = [
  { id: 'diploma', name: 'Diploma Computer/IT' },
  { id: 'be_btech', name: 'B.E./B.TECH' },
  { id: 'mca_msc', name: 'Msc.IT/MCA' },
  { id: 'bca_bsc', name: 'Bsc.IT/BCA' }
];

export default function Careers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formStep, setFormStep] = useState(1); // 1: Personal, 2: Technical
  
  // Application details
  const [appForm, setAppForm] = useState({
    name: '',
    phone: '',
    email: '',
    gender: 'Male',
    address: '',
    twelfthPercentage: '',
    cgpa: '',
    collegeName: '',
    qualification: 'B.E./B.TECH',
    experience: '',
    skills: {
      html_css: 'None',
      node_js: 'None',
      next_js: 'None',
      react_native: 'None',
      databases: 'None'
    },
    notes: ''
  });

  const [submitStatus, setSubmitStatus] = useState('idle'); // idle | submitting | success
  const [appId, setAppId] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSkillChange = (skillId, level) => {
    setAppForm((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        [skillId]: level
      }
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (
      !appForm.name ||
      !appForm.phone ||
      !appForm.email ||
      !appForm.address ||
      !appForm.twelfthPercentage ||
      !appForm.cgpa ||
      !appForm.collegeName
    ) {
      alert("Please fill all required fields before proceeding.");
      return;
    }
    setFormStep(2);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!appForm.experience || !appForm.qualification) {
      alert("Please complete the required details.");
      return;
    }

    setSubmitStatus('submitting');
    try {
      const refCode = `APP-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      const res = await mockApi.submitJobApplication({
        reference_code: refCode,
        full_name: appForm.name,
        phone: appForm.phone,
        email: appForm.email,
        gender: appForm.gender,
        address: appForm.address,
        percentage_12th: parseFloat(appForm.twelfthPercentage) || 0,
        cgpa: parseFloat(appForm.cgpa) || 0,
        college: appForm.collegeName,
        skills: appForm.skills,
        experience: parseInt(appForm.experience, 10) || 0,
        comments: appForm.notes || ''
      });
      
      if (res.status === 201) {
        setSubmitStatus('success');
        setAppId(refCode);
      } else {
        setSubmitStatus('idle');
        alert(res.data.message || "Unable to submit application. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setSubmitStatus('idle');
      alert("Unable to submit application. Connection error.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => {
      setFormStep(1);
      setSubmitStatus('idle');
      setAppForm({
        name: '',
        phone: '',
        email: '',
        gender: 'Male',
        address: '',
        twelfthPercentage: '',
        cgpa: '',
        collegeName: '',
        qualification: 'B.E./B.TECH',
        experience: '',
        skills: {
          html_css: 'None',
          node_js: 'None',
          next_js: 'None',
          react_native: 'None',
          databases: 'None'
        },
        notes: ''
      });
    }, 300);
  };

  const handleDownloadBrochure = (e) => {
    e.preventDefault();
    const link = document.createElement('a');
    link.href = '/static/Hiring Brochure.pdf';
    link.download = 'ARHAM_FinTech_Hiring_Brochure.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <style>{`
        @keyframes scan-line {
            0% { transform: translateY(-100%); opacity: 0; }
            50% { opacity: 0.5; }
            100% { transform: translateY(400%); opacity: 0; }
        }
        .animate-scan {
            animation: scan-line 4s linear infinite;
        }
        .dot-grid {
            background-image: radial-gradient(circle, #000 1px, transparent 1px);
            background-size: 32px 32px;
        }
      `}</style>

      <section className="bg-white text-black font-sans selection:bg-black selection:text-white pt-24 pb-12">
        <main className="max-w-7xl mx-auto">
          
          {/* Hero Section */}
          <section className="flex flex-col md:flex-row items-center px-6 md:px-12 pb-24 gap-12 overflow-hidden">
            <div className="w-full md:w-1/2 flex flex-col items-start gap-8">
              <div className="flex flex-col">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-7xl md:text-[9rem] font-black leading-[0.85] tracking-tighter text-black"
                >
                  WE ARE<br/>HIRING
                </motion.h1>
              </div>
              <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-col gap-6 max-w-lg mt-8"
              >
                <p className="text-neutral-600 text-lg font-light">
                  Join our mission to revolutionize the stock market software space.
                </p>
              </motion.div>
            </div>
            
            {/* Hiring Visual (Animated Laptop Component) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 0.6, delay: 0.4 }}
               className="w-full md:w-1/2 h-[600px] relative flex flex-col items-center justify-center bg-neutral-100 rounded-3xl overflow-hidden shadow-inner border border-neutral-200/50"
            >
              <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none"></div>
              <LaptopAnimation />
            </motion.div>
          </section>

          {/* Information Grid */}
          <section className="bg-neutral-100 px-6 md:px-12 py-32 border-y border-neutral-200/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-neutral-200">
              
              {/* Qualifications */}
              <div className="bg-white p-12 md:p-20">
                <h3 className="font-sans text-2xl tracking-[0.2em] uppercase font-bold text-black mb-16 flex items-center gap-4">
                  <span className="w-3 h-3 bg-black rounded-full"></span> QUALIFICATIONS
                </h3>
                <ul className="flex flex-col gap-8">
                  <li className="flex flex-col group">
                    <span className="text-2xl font-bold tracking-tight">Diploma IT/CS</span>
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mt-1">Foundational Engineering</span>
                  </li>
                  <li className="flex flex-col group">
                    <span className="text-2xl font-bold tracking-tight">B.E. CS/IT</span>
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mt-1">Bachelor of Engineering</span>
                  </li>
                  <li className="flex flex-col group">
                    <span className="text-2xl font-bold tracking-tight">B.Tech IT/CS</span>
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mt-1">Technical Specialization</span>
                  </li>
                  <li className="flex flex-col group">
                    <span className="text-2xl font-bold tracking-tight">MCA</span>
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mt-1">Masters in Computer App.</span>
                  </li>
                  <li className="flex flex-col group">
                    <span className="text-2xl font-bold tracking-tight">MSC IT/CS</span>
                    <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mt-1">Scientific Research Path</span>
                  </li>
                </ul>
              </div>
              
              {/* Tech Stack */}
              <div className="bg-white p-12 md:p-20">
                <h3 className="font-sans text-2xl tracking-[0.2em] uppercase font-bold text-black mb-16 flex items-center gap-4">
                  <span className="w-3 h-3 bg-black rounded-full"></span> TECH STACK
                </h3>
                <ul className="flex flex-col gap-8">
                  {[
                    { name: 'Python', sub: 'Backend & Automation' },
                    { name: 'PHP', sub: 'Server-Side Scripting' },
                    { name: 'HTML/CSS', sub: 'UI Markup & Styling' },
                    { name: 'Node Js', sub: 'Runtime Environment' },
                    { name: 'React Native', sub: 'Cross-Platform Mobile' },
                    { name: 'Next JS', sub: 'Full-Stack Framework' },
                    { name: 'Flutter', sub: 'Native App Development' },
                  ].map(({ name, sub }) => (
                    <li key={name} className="flex flex-col group">
                      <span className="text-2xl font-bold tracking-tight">{name}</span>
                      <span className="text-xs font-mono text-neutral-500 uppercase tracking-widest mt-1">{sub}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-16 pt-8 border-t border-neutral-100">
                  <p className="text-sm text-neutral-600 leading-relaxed italic">
                    We're looking for people who can build, break, learn, and grow. At ARHAM FinTech we're not just building tools—we're crafting intelligent, automated, and scalable products for the Indian stock market ecosystem.
                  </p>
                </div>
              </div>
              
            </div>
          </section>

          {/* CTA / Contact Section */}
          <section className="px-6 md:px-12 py-32 bg-white">
            <div className="flex flex-col md:flex-row justify-between items-start gap-16">
              
              <div className="max-w-2xl">
                <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-8 leading-none">BUILD THE FUTURE OF FINTECH.</h2>
                <p className="text-neutral-600 leading-relaxed text-lg mb-12 font-light">
                  We are looking for ambitious individuals who are ready to push the boundaries of financial technology. Join ARHAM FinTech and start your career in an environment that values innovation and precision. We're a fast-growing team solving unique tech challenges for real financial use-cases.
                  <br/><br/>
                  Let's build something great, together.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-black text-white px-10 py-5 font-mono text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors rounded-sm inline-block shadow-md cursor-pointer"
                  >
                    APPLY NOW
                  </button>
                  <button
                    onClick={handleDownloadBrochure}
                    className="border border-black text-black px-10 py-5 font-mono text-xs tracking-widest uppercase hover:bg-neutral-50 transition-colors rounded-sm inline-block cursor-pointer"
                  >
                    DOWNLOAD BROCHURE
                  </button>
                </div>
              </div>

              {/* Contact Details Card */}
              <div className="w-full md:w-1/3 flex flex-col gap-12 bg-white p-12 shadow-[40px_40px_60px_-15px_rgba(0,0,0,0.05)] border border-neutral-100 rounded-xl">
                <div className="flex flex-col gap-2">
                  <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">Information</span>
                  <h4 className="text-2xl font-bold tracking-tight">Contact Details</h4>
                </div>
                <div className="space-y-8">
                  
                  <div className="flex items-start gap-4">
                    <Mail className="text-black mt-1 shrink-0" size={24} />
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Email</span>
                      <a
                        className="text-sm font-bold border-b border-transparent hover:border-black transition-all text-black self-start"
                        href="https://mail.google.com/mail/?view=cm&fs=1&to=adwealthindia@gmail.com"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        adwealthindia@gmail.com
                      </a>
                      <p className="text-xs text-neutral-500 mt-2 font-light">Include your resume, project samples, and anything that tells us why you're awesome.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="text-black mt-1 shrink-0" size={24} />
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Contact Number</span>
                      <a className="text-sm font-bold text-black" href="tel:+917228882088">+91 7228882088</a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="text-black mt-1 shrink-0" size={24} />
                    <div className="flex flex-col">
                      <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest mb-1">Office Address</span>
                      <span className="text-sm font-bold leading-relaxed text-black">
                        301-303, Pramukh Tangent, KH-0,
                        <br />Gandhinagar, Gujarat, India-382421
                      </span>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </section>

        </main>
      </section>

      {/* 5. MULTI-STEP APPLICATION FORM MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            
            {/* Backdrop close capture */}
            <div className="absolute inset-0" onClick={handleCloseModal} />

            {/* Modal Panel content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="bg-white w-full max-w-2xl max-h-[95vh] overflow-y-auto relative text-black rounded-lg shadow-2xl flex flex-col z-10"
            >
              {/* Sticky Header */}
              <div className="sticky top-0 bg-white border-b border-neutral-200 px-8 py-6 flex justify-between items-center z-10">
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase">
                    Application · Step {formStep} / 2
                  </span>
                  <h3 className="text-2xl font-black tracking-tighter mt-1">
                    {formStep === 1 ? 'Personal Information' : 'Technical Background'}
                  </h3>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="text-neutral-400 hover:text-black transition-colors p-1"
                  aria-label="Close form"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Form content */}
              {submitStatus === 'success' ? (
                <div className="px-8 py-12 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mb-6 shadow-xl">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-2xl font-black uppercase tracking-widest text-black mb-3">
                    Application Logged
                  </h4>
                  <p className="text-neutral-500 text-sm max-w-md mb-4 leading-relaxed font-light">
                    Thank you! Your coordinates and basic credentials have been successfully indexed. Your Application Reference ID is:
                  </p>
                  <div className="bg-neutral-100 border border-neutral-200 rounded-lg px-6 py-2.5 font-mono text-base font-bold mb-6">
                    {appId}
                  </div>

                  {/* Next Step Interview Form Call to Action */}
                  <div className="w-full bg-neutral-50 border border-neutral-200 rounded-xl p-6 mb-8 text-left">
                    <h5 className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase mb-2 font-bold">Next Stage</h5>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4">
                      To initiate the next stage of our interview process, you must complete the secondary technical screening questionnaire. Please click the button below to proceed to the Google Form.
                    </p>
                    <a
                      href="https://forms.gle/8hAmivNEiK7nPfaG7"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-black text-white px-6 py-4 font-mono text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors rounded-sm text-center block shadow-md cursor-pointer"
                    >
                      PROCEED TO INTERVIEW FORM →
                    </a>
                  </div>

                  <button
                    onClick={handleCloseModal}
                    className="font-mono text-xs tracking-widest uppercase text-neutral-400 hover:text-black transition-colors cursor-pointer"
                  >
                    Close Window
                  </button>
                </div>
              ) : (
                <form onSubmit={formStep === 1 ? handleNextStep : handleSubmit} className="px-8 py-8 flex flex-col gap-6">
                  
                  {formStep === 1 ? (
                    /* STEP 1: PERSONAL DETAILS */
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          required
                          value={appForm.name}
                          onChange={handleInputChange}
                          placeholder="Jane Miller"
                          className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-white text-black"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="phone" className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block">
                            Phone Number *
                          </label>
                          <div className="flex">
                            <span className="border border-r-0 border-neutral-200 px-3 py-3 text-sm text-neutral-500 bg-neutral-50 select-none">
                              +91
                            </span>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              required
                              pattern="[0-9]{10}"
                              value={appForm.phone}
                              onChange={handleInputChange}
                              placeholder="10 digit number"
                              className="flex-1 border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-white text-black"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-2">
                          <label htmlFor="email" className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block">
                            Email ID *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            value={appForm.email}
                            onChange={handleInputChange}
                            placeholder="jane@arhamfintech.ai"
                            className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-white text-black"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block">
                          Gender *
                        </label>
                        <div className="flex gap-6 mt-1">
                          {['Male', 'Female', 'Other'].map((g) => (
                            <label key={g} className="flex items-center gap-2 cursor-pointer text-sm">
                              <input
                                type="radio"
                                name="gender"
                                value={g}
                                checked={appForm.gender === g}
                                onChange={handleInputChange}
                                className="accent-black"
                              />
                              {g}
                            </label>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="address" className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block">
                          Current Address *
                        </label>
                        <textarea
                          id="address"
                          name="address"
                          required
                          rows={2}
                          value={appForm.address}
                          onChange={handleInputChange}
                          placeholder="Your residential coordinates..."
                          className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none bg-white text-black"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="twelfthPercentage" className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block">
                            12th Percentage *
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            id="twelfthPercentage"
                            name="twelfthPercentage"
                            required
                            min="0"
                            max="100"
                            value={appForm.twelfthPercentage}
                            onChange={handleInputChange}
                            placeholder="e.g. 85.5"
                            className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-white text-black"
                          />
                        </div>
                        <div className="flex flex-col gap-2">
                          <label htmlFor="cgpa" className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block">
                            College CGPA *
                          </label>
                          <input
                            type="number"
                            step="0.01"
                            id="cgpa"
                            name="cgpa"
                            required
                            min="0"
                            max="10"
                            value={appForm.cgpa}
                            onChange={handleInputChange}
                            placeholder="e.g. 8.5"
                            className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-white text-black"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="collegeName" className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block">
                          Name of College *
                        </label>
                        <input
                          type="text"
                          id="collegeName"
                          name="collegeName"
                          required
                          value={appForm.collegeName}
                          onChange={handleInputChange}
                          placeholder="Gujarat Technological University"
                          className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-white text-black"
                        />
                      </div>
                    </div>
                  ) : (
                    /* STEP 2: TECHNICAL DETAILS */
                    <div className="flex flex-col gap-6">
                      <div className="flex flex-col gap-2">
                        <label className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block mb-1">
                          Programming Skills *
                        </label>
                        <div className="border border-neutral-200 overflow-hidden text-sm rounded bg-white">
                          
                          {/* Grid Header */}
                          <div className="grid grid-cols-5 bg-neutral-50 border-b border-neutral-200 text-center py-2 px-3">
                            <span className="col-span-2 text-left font-mono text-[9px] tracking-widest text-neutral-500 uppercase">Skill</span>
                            <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase">None</span>
                            <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase">Basic</span>
                            <span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase">Expert</span>
                          </div>

                          {/* Skill Rows */}
                          {SKILLS.map((skill) => (
                            <div key={skill.id} className="grid grid-cols-5 border-b border-neutral-100 last:border-0 items-center py-3 px-3">
                              <span className="col-span-2 font-medium text-black">{skill.name}</span>
                              {['None', 'Basic', 'Expert'].map((level) => (
                                <div key={level} className="flex justify-center">
                                  <input
                                    type="radio"
                                    name={`skill-${skill.id}`}
                                    value={level}
                                    checked={appForm.skills[skill.id] === level}
                                    onChange={() => handleSkillChange(skill.id, level)}
                                    className="accent-black cursor-pointer"
                                  />
                                </div>
                              ))}
                            </div>
                          ))}
                          
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                          <label htmlFor="experience" className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block">
                            Experience (Years) *
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            id="experience"
                            name="experience"
                            required
                            min="0"
                            value={appForm.experience}
                            onChange={handleInputChange}
                            placeholder="e.g. 1.5"
                            className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-white text-black"
                          />
                        </div>

                        <div className="flex flex-col gap-2">
                          <label htmlFor="qualification" className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block">
                            Qualification *
                          </label>
                          <select
                            id="qualification"
                            name="qualification"
                            required
                            value={appForm.qualification}
                            onChange={handleInputChange}
                            className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors bg-white text-black"
                          >
                            {QUALIFICATIONS.map((q) => (
                              <option key={q.id} value={q.name}>
                                {q.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="notes" className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase block">
                          Technical Notes (Optional)
                        </label>
                        <textarea
                          id="notes"
                          name="notes"
                          rows={3}
                          value={appForm.notes}
                          onChange={handleInputChange}
                          placeholder="Tell us about your projects, achievements, or anything that makes you stand out..."
                          className="w-full border border-neutral-200 px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none bg-white text-black"
                        />
                      </div>
                    </div>
                  )}

                  {/* Actions buttons */}
                  <div className="flex justify-between items-center mt-8 pt-6 border-t border-neutral-200">
                    {formStep === 2 ? (
                      <button
                        type="button"
                        onClick={() => setFormStep(1)}
                        className="font-mono text-xs tracking-widest uppercase text-neutral-500 hover:text-black transition-colors cursor-pointer"
                      >
                        ← BACK
                      </button>
                    ) : (
                      <div />
                    )}

                    {formStep === 1 ? (
                      <button
                        type="submit"
                        className="bg-black text-white px-10 py-4 font-mono text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors cursor-pointer"
                      >
                        NEXT →
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={submitStatus === 'submitting'}
                        className="bg-black text-white px-10 py-4 font-mono text-xs tracking-widest uppercase hover:bg-neutral-800 transition-colors disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                      >
                        {submitStatus === 'submitting' ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin text-white" />
                            SUBMITTING...
                          </>
                        ) : (
                          'SUBMIT APPLICATION'
                        )}
                      </button>
                    )}
                  </div>
                  
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
