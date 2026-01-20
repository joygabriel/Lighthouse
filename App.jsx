import React, { useState, useEffect, useRef } from 'react';
import { 
  Menu, 
  X, 
  TrendingUp, 
  Users, 
  Search, 
  Target, 
  BarChart3, 
  CheckCircle2, 
  ArrowRight, 
  Anchor,
  Globe,
  Zap,
  ChevronRight,
  MousePointer2,
  MessageSquare,
  Share2,
  Heart
} from 'lucide-react';

// --- Components ---

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:scale-95";
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20",
    secondary: "bg-white text-slate-900 hover:bg-slate-50 border border-slate-200",
    accent: "bg-amber-500 hover:bg-amber-400 text-slate-900 shadow-amber-900/20",
    outline: "border-2 border-white/20 hover:bg-white/10 text-white"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const SectionHeading = ({ subtitle, title, align = 'center', light = false }) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <span className={`uppercase tracking-wider text-sm font-bold ${light ? 'text-blue-300' : 'text-blue-600'} mb-2 block`}>
      {subtitle}
    </span>
    <h2 className={`text-3xl md:text-5xl font-bold ${light ? 'text-white' : 'text-slate-900'}`}>
      {title}
    </h2>
    <div className={`h-1.5 w-24 rounded-full mt-4 bg-gradient-to-r from-blue-500 to-amber-400 ${align === 'center' ? 'mx-auto' : ''}`} />
  </div>
);

const ServiceCard = ({ icon: Icon, title, description }) => (
  <div className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-150 group-hover:bg-blue-100/50" />
    <div className="relative z-10">
      <div className="w-14 h-14 bg-slate-900 rounded-xl flex items-center justify-center mb-6 text-amber-400 shadow-lg group-hover:scale-110 transition-transform">
        <Icon size={28} />
      </div>
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  </div>
);

// --- Main App Component ---

export default function LighthouseLanding() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('managed');
  const [formStatus, setFormStatus] = useState('idle');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const cyclingTexts = ["LLEO Strategy", "Global Scaling", "Top 1% Talent", "Community Growth", "Social Dominance"];
  const heroRef = useRef(null);

  // Mouse tracking for hero interactive background
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePos({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cycling text effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % cyclingTexts.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const scrollToSection = (id) => {
    setIsMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-slate-900/90 backdrop-blur-lg border-b border-slate-800 text-white">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="bg-gradient-to-br from-blue-500 to-amber-500 p-2 rounded-lg group-hover:rotate-12 transition-transform">
              <Anchor size={24} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight">Lighthouse</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('services')} className="hover:text-blue-400 transition-colors">Services</button>
            <button onClick={() => scrollToSection('talent')} className="hover:text-blue-400 transition-colors">Find Talent</button>
            <button onClick={() => scrollToSection('about')} className="hover:text-blue-400 transition-colors">About</button>
            <Button variant="accent" onClick={() => scrollToSection('contact')} className="!py-2 !px-4 text-sm">
              Get Started
            </Button>
          </div>

          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-slate-800 absolute w-full animate-in slide-in-from-top duration-300">
            <div className="flex flex-col p-6 gap-4">
              <button onClick={() => scrollToSection('services')} className="text-left py-2 hover:text-blue-400">Services</button>
              <button onClick={() => scrollToSection('talent')} className="text-left py-2 hover:text-blue-400">Find Talent</button>
              <button onClick={() => scrollToSection('about')} className="text-left py-2 hover:text-blue-400">About</button>
              <Button variant="accent" onClick={() => scrollToSection('contact')}>Get Started</Button>
            </div>
          </div>
        )}
      </nav>

      {/* Interactive Hero Section */}
      <header 
        ref={heroRef}
        className="relative pt-32 pb-24 md:pt-52 md:pb-48 bg-slate-950 overflow-hidden cursor-default"
      >
        <div 
          className="absolute pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}px ${mousePos.y}px, rgba(59, 130, 246, 0.15) 0%, transparent 40%)`,
            inset: 0,
          }}
        />

        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-600/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/5 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 mb-10 animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping"></span>
              Scaling World-Class Brands & Communities
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black text-white mb-8 leading-[1.1] tracking-tight">
              Illuminate Your <br />
              <div className="h-20 md:h-32 flex items-center justify-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-white to-amber-400 transition-all duration-700 ease-in-out">
                  {cyclingTexts[currentTextIndex]}
                </span>
              </div>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
              We scale elite brands through a dedicated in-house growth engine or by installing the top 1% of vetted marketing, social, and community talent.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Button variant="primary" onClick={() => scrollToSection('contact')} className="w-full sm:w-auto text-lg px-8">
                Start Scaling <ArrowRight size={22} />
              </Button>
              <Button variant="outline" onClick={() => scrollToSection('services')} className="w-full sm:w-auto text-lg px-8">
                The Lighthouse Model
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Model Selection */}
      <section id="about" className="py-24 bg-white relative -mt-12 rounded-t-[3.5rem] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Managed Card */}
            <div 
              className={`group p-10 rounded-3xl border-2 transition-all duration-500 ${activeTab === 'managed' ? 'border-blue-500 bg-blue-50/40 shadow-2xl scale-[1.03]' : 'border-slate-100 grayscale hover:grayscale-0 hover:border-blue-200'}`}
              onMouseEnter={() => setActiveTab('managed')}
            >
              <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mb-8 shadow-lg group-hover:rotate-6 transition-transform">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">In-House Growth Engine</h3>
              <p className="text-slate-600 mb-8 text-lg">
                We act as your dedicated growth arm. We handle the strategy, social management, and revenue execution while you focus on the vision.
              </p>
              <ul className="space-y-4">
                {['Omnichannel Strategy', 'Social & Community Mgmt', 'Revenue Attribution'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium text-slate-800">
                    <CheckCircle2 size={20} className="text-blue-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Talent Placement Card */}
            <div 
              className={`group p-10 rounded-3xl border-2 transition-all duration-500 ${activeTab === 'talent' ? 'border-amber-500 bg-amber-50/40 shadow-2xl scale-[1.03]' : 'border-slate-100 grayscale hover:grayscale-0 hover:border-amber-200'}`}
              onMouseEnter={() => setActiveTab('talent')}
            >
              <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center text-slate-900 mb-8 shadow-lg group-hover:-rotate-6 transition-transform">
                <Users size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Top 1% Talent Partner</h3>
              <p className="text-slate-600 mb-8 text-lg">
                Stop guessing on hires. We vet and place specialized community managers, social directors, and SEO experts into your ecosystem.
              </p>
              <ul className="space-y-4">
                {['Pre-Vetted Specialists', 'Cultural Fit Matching', 'Onboarding Support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium text-slate-800">
                    <CheckCircle2 size={20} className="text-amber-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-24 bg-slate-50 overflow-hidden relative">
        <div className="container mx-auto px-6">
          <SectionHeading 
            subtitle="Expertise Across Every Niche"
            title="A Fully Integrated Growth Stack"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ServiceCard 
              icon={Share2}
              title="Social Media Management"
              description="Full-service content creation and scheduling across all major platforms. We build a brand voice that resonates and converts followers into fans."
            />
            <ServiceCard 
              icon={MessageSquare}
              title="Community Growth"
              description="We build and nurture engaged communities on Discord, Slack, or Circle. Turn your brand into a movement with expert moderation and engagement."
            />
            <ServiceCard 
              icon={Search}
              title="LLEO & SEO"
              description="The new era of search. We optimize your brand for Large Language Engines (AI) and Search Engines to ensure you own the conversation."
            />
            <ServiceCard 
              icon={Target}
              title="Paid Acquisition"
              description="Surgical media buying across Meta, Google, and TikTok focused on high-intent conversion and sustainable acquisition costs."
            />
            <ServiceCard 
              icon={Heart}
              title="Retention & LTV"
              description="Automation and email marketing systems designed to turn one-time buyers into lifelong brand advocates through community nurturing."
            />
            <ServiceCard 
              icon={Zap}
              title="Growth Strategy"
              description="Deep-dive funnel analysis and market forecasting to keep your brand ahead of competitors and cultural shifts."
            />
          </div>
        </div>
      </section>

      {/* Talent Highlight Section */}
      <section id="talent" className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6">
          <div className="bg-slate-800 rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 -skew-x-12 transform translate-x-20"></div>
            
            <div className="max-w-3xl relative z-10">
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Role-Specific Excellence.</h2>
              <p className="text-xl text-slate-300 mb-12">
                We fill every seat in your marketing and community departments with specialists who have already done it for the world's biggest brands.
              </p>
              
              <div className="flex flex-wrap gap-4">
                {['Community Managers', 'Social Media Directors', 'SEO Strategists', 'LLEO Experts', 'Growth Partners', 'Media Buyers', 'Content Creators'].map((role) => (
                  <div key={role} className="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white font-semibold hover:bg-white/10 transition-colors">
                    {role}
                  </div>
                ))}
              </div>

              <div className="mt-16 flex flex-col sm:flex-row items-start gap-8">
                <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-14 h-14 rounded-full border-4 border-slate-800 bg-slate-700 flex items-center justify-center font-bold">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-400">Top 1% Only</div>
                  <p className="text-slate-400">Our vetting process includes technical audits & community engagement tests.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row rounded-[2.5rem] bg-slate-50 overflow-hidden shadow-2xl">
            <div className="lg:w-1/3 bg-slate-900 p-12 text-white">
              <h3 className="text-3xl font-bold mb-6">Let's Illuminate Your Growth.</h3>
              <p className="text-slate-400 mb-10 leading-relaxed">
                Whether you need full-service management or a specific elite hire to grow your community, we're ready to guide the way.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400">
                    <CheckCircle2 size={20} />
                  </div>
                  <span>Strategy Map in <span className="text-blue-400 font-bold">24 Hours</span></span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center text-blue-400">
                    <CheckCircle2 size={20} />
                  </div>
                  <span>Custom Talent Search</span>
                </div>
              </div>
            </div>

            <div className="lg:w-2/3 p-12">
              {formStatus === 'success' ? (
                <div className="h-full flex flex-col items-center justify-center text-center animate-in zoom-in duration-500">
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} />
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900 mb-3">Transmission Received.</h3>
                  <p className="text-slate-600 mb-8">A Lighthouse strategist will be in touch shortly.</p>
                  <Button variant="secondary" onClick={() => setFormStatus('idle')}>Send New Request</Button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Full Name</label>
                    <input required className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="Enter name" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Work Email</label>
                    <input required type="email" className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="name@brand.com" />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Primary Focus</label>
                    <select className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                      <option>Managed Growth & Social</option>
                      <option>Community Building & Mgmt</option>
                      <option>Hire 1% Talent</option>
                      <option>Full Growth Stack</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Brand URL</label>
                    <input className="w-full bg-white border border-slate-200 px-4 py-3 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="e.g. yourbrand.com" />
                  </div>
                  <div className="md:col-span-2">
                    <Button type="submit" variant="primary" className="w-full py-4 text-lg" disabled={formStatus === 'sending'}>
                      {formStatus === 'sending' ? 'Sending...' : 'Request Growth Audit'}
                    </Button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-slate-950 text-slate-500 py-12 border-t border-slate-900">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white text-xl font-bold">
            <Anchor size={20} className="text-blue-500" /> Lighthouse
          </div>
          <div className="flex gap-8 text-sm">
            <span className="hover:text-blue-400 cursor-pointer transition-colors">Privacy</span>
            <span className="hover:text-blue-400 cursor-pointer transition-colors">Terms</span>
            <span className="hover:text-blue-400 cursor-pointer transition-colors">Contact</span>
          </div>
          <p className="text-xs">&copy; 2026 Lighthouse Digital. Leading the New Era of Growth.</p>
        </div>
      </footer>
    </div>
  );
}