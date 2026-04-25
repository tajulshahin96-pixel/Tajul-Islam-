/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Zap, 
  ShieldCheck, 
  Clock, 
  Wrench, 
  Home, 
  Factory, 
  PhoneCall, 
  MessageCircle,
  ChevronRight,
  Star,
  CheckCircle2,
  AlertCircle,
  Loader2
} from 'lucide-react';

export default function App() {
  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [formData, setFormData] = useState({ name: '', phone: '', service: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const services = [
    {
      title: "Home Wiring",
      desc: "Complete house wiring, socket repairs, and electrical safety audits.",
      icon: <Home className="w-8 h-8 text-yellow-500" />,
      id: "service-home"
    },
    {
      title: "Appliance Repair",
      desc: "AC, Fridge, and heavy appliance maintenance with warranty.",
      icon: <Wrench className="w-8 h-8 text-yellow-500" />,
      id: "service-appliance"
    },
    {
      title: "Industrial Maintenance",
      desc: "Factory load calculations, generator maintenance, and panel upgrades.",
      icon: <Factory className="w-8 h-8 text-yellow-500" />,
      id: "service-industrial"
    }
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormState('loading');
    
    try {
      // Use absolute path with window.location.origin to ensure correct routing in the proxy environment
      const targetUrl = `${window.location.origin}/api/subscribe`;
      console.log('Sending request to:', targetUrl, formData);

      const response = await fetch(targetUrl, {
        method: 'POST',
        mode: 'cors', // Added explicit cors mode
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState('success');
      } else {
        const text = await response.text();
        console.error('Response not OK:', response.status, text);
        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          data = { error: `Server error (${response.status}): ${text.substring(0, 50)}` };
        }
        setErrorMessage(data.error || `Server error: ${response.status}`);
        setFormState('error');
      }
    } catch (err: any) {
      console.error('Fetch operation failed:', err);
      // More descriptive error
      const msg = err.name === 'TypeError' ? 'Failed to connect to the server. Please try again later.' : err.message;
      setErrorMessage(`Network error: ${msg}`);
      setFormState('error');
    }
  };

  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="editorial-container">
      {/* Editorial Header */}
      <header className="editorial-header">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 flex items-center justify-center rounded-sm text-black font-black text-xl">
            ⚡
          </div>
          <span className="text-2xl font-black tracking-tighter uppercase shrink-0">
            Electrical <span className="text-yellow-400">Solution</span>
          </span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-bold">Emergency 24/7</p>
            <p className="text-xl font-black text-yellow-400 tracking-tight">+880 1718 417207</p>
          </div>
          <div className="px-5 py-2 bg-neutral-800 border border-neutral-700 rounded-full text-[10px] font-black uppercase tracking-widest">
            📍 Mohammadpur, Dhaka
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-0 overflow-x-hidden">
        
        {/* Left Column: Hero & Services */}
        <div className="editorial-left-col">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-black leading-[0.9] uppercase mb-8 tracking-tighter">
              Mohammadpur’s <br/>
              <span className="text-yellow-400 underline decoration-8 decoration-yellow-400/20 underline-offset-4">Most Trusted</span> <br/>
              Electrical Service.
            </h1>
            <p className="text-lg md:text-xl text-neutral-400 max-w-md border-l-4 border-yellow-400 pl-6 py-2 leading-relaxed mb-12">
              Fast, Safe & Reliable support with certified electricians available round the clock for your peace of mind.
            </p>
          </motion.div>

          {/* Services Desktop Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
            {services.map((service) => (
              <div key={service.id} className="editorial-service-card group">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                  {service.id === 'service-home' ? '🏠' : service.id === 'service-appliance' ? '🔌' : '🏭'}
                </div>
                <h3 className="font-bold text-sm uppercase tracking-tight text-white mb-2">{service.title}</h3>
                <p className="text-[10px] text-neutral-500 uppercase font-medium leading-tight">
                  {service.desc.split(',')[0]} & more
                </p>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap gap-6 items-center pt-8 border-t border-neutral-800">
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 font-bold">✓</span>
              <span className="text-[10px] uppercase font-black tracking-widest text-neutral-500">Certified Experts</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 font-bold">✓</span>
              <span className="text-[10px] uppercase font-black tracking-widest text-neutral-500">Verified Safety Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 font-bold">✓</span>
              <span className="text-[10px] uppercase font-black tracking-widest text-neutral-500">Instant Response</span>
            </div>
          </div>
        </div>

        {/* Right Column: Lead Form & Offer */}
        <div className="editorial-right-col" id="lead-form">
          <div className="mb-10">
            <div className="editorial-badge">
              Limited Time Offer
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-none uppercase tracking-tighter text-black">
              Get FREE <br/>Safety Inspection
            </h2>
            <p className="text-sm font-black mt-3 uppercase tracking-widest text-black/80">
              + 10% OFF Your First Service
            </p>
          </div>

          <AnimatePresence mode="wait">
            {formState === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black text-yellow-400 p-8 border-4 border-black"
              >
                <CheckCircle2 className="w-12 h-12 mb-6" />
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Request Sent!</h3>
                <p className="text-sm font-bold uppercase tracking-wide leading-relaxed mb-8">
                  We typically respond within 15 minutes. Our lead engineer will call you shortly.
                </p>
                <a 
                  href="https://wa.me/8801718417207" 
                  className="flex items-center justify-center gap-3 bg-yellow-400 text-black py-4 font-black uppercase tracking-widest text-xs hover:bg-white transition-colors"
                >
                  Direct WhatsApp Help
                </a>
              </motion.div>
            ) : (
              <div className="space-y-6">
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="editorial-label">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Md. Arif Hossain" 
                      className="editorial-input"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="editorial-label">Phone (WhatsApp)</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="+880 17XXXXXXXX" 
                      className="editorial-input"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="editorial-label">Service Type</label>
                    <div className="relative">
                      <select 
                        required
                        className="editorial-input appearance-none rounded-none pr-10"
                        value={formData.service}
                        onChange={e => setFormData({...formData, service: e.target.value})}
                      >
                        <option value="">Select a service</option>
                        <option value="Home Wiring">Home Wiring</option>
                        <option value="Appliance Repair">Appliance Repair</option>
                        <option value="Industrial Maintenance">Industrial Maintenance</option>
                        <option value="Emergency Support">Emergency Support</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                        <ChevronRight className="w-5 h-5 rotate-90" />
                      </div>
                    </div>
                  </div>

                  <AnimatePresence>
                    {formState === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-black/5 border-2 border-black/20 text-xs font-black uppercase tracking-tight leading-tight flex items-start gap-2"
                      >
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <div>{errorMessage}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    type="submit"
                    disabled={formState === 'loading'}
                    className="editorial-btn"
                  >
                    {formState === 'loading' ? (
                      <Loader2 className="w-8 h-8 animate-spin" />
                    ) : (
                      'Book Service Now'
                    )}
                  </button>
                </form>
                
                <p className="text-[10px] font-black text-black/50 uppercase text-center leading-tight tracking-widest pt-4">
                  We typically respond within 15 minutes.<br/>
                  Secure & private lead handling.
                </p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* WhatsApp Float */}
      <div className="fixed bottom-10 right-10 flex items-center gap-4 z-50">
        <div className="hidden sm:block bg-white px-5 py-2 rounded-full text-black text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl border-2 border-black">
          Need help fast? <span className="text-green-600">Online Now</span>
        </div>
        <a 
          href="https://wa.me/8801718417207" 
          target="_blank"
          rel="noreferrer"
          className="w-16 h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl border-4 border-black group hover:scale-110 active:scale-95 transition-all"
        >
           <MessageCircle className="w-8 h-8 text-white fill-white" />
        </a>
      </div>
    </div>
  );
}

