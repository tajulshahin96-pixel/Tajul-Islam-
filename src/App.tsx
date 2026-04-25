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
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormState('success');
      } else {
        const data = await response.json();
        setErrorMessage(data.error || 'Something went wrong. Please try again.');
        setFormState('error');
      }
    } catch (err) {
      setErrorMessage('Network error. Please check your connection.');
      setFormState('error');
    }
  };

  const scrollToForm = () => {
    document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-yellow-400 p-1.5 rounded-lg">
              <Zap className="w-6 h-6 text-slate-900 fill-slate-900" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-slate-900">ELECTRICAL<span className="text-yellow-500">SOLUTION</span></span>
          </div>
          <button 
            onClick={scrollToForm}
            className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-full font-semibold hover:bg-slate-800 transition-colors"
          >
            <PhoneCall className="w-4 h-4" />
            Book Service
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 dark-pattern opacity-5" />
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold mb-6">
              <ShieldCheck className="w-4 h-4" />
              Safety-First Certified Experts
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight mb-6">
              Mohammadpur’s <span className="text-yellow-500 underline decoration-8 decoration-yellow-400/30 underline-offset-4">Most Trusted</span> Electrical Service
            </h1>
            <p className="text-lg text-slate-600 mb-8 max-w-lg leading-relaxed">
              Fast, safe, and reliable 24/7 emergency support. We serve homes and industries across Mohammadpur with certified precision.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={scrollToForm}
                className="flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold px-8 py-4 rounded-xl text-lg transition-all transform hover:scale-105 shadow-lg shadow-yellow-400/20"
              >
                Book Service Now
                <ChevronRight className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3 px-4 py-2 border border-slate-200 rounded-xl bg-white">
                <div className="flex -space-x-2">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="text-xs font-semibold text-slate-500">
                  <div className="flex text-yellow-400">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                  </div>
                  500+ Happy Clients
                </div>
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
              <img 
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop" 
                alt="Expert Electrician"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
            </div>
            {/* Trust Badges */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-xl flex items-center gap-3 border border-slate-100"
            >
              <div className="bg-green-100 p-2 rounded-full">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <div className="font-bold text-sm text-slate-900">24/7 Response</div>
                <div className="text-xs text-slate-500">Less than 30 mins</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-slate-50" id="services">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">Our Professional Expertise</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">From residential repairs to industrial power grids, we handle it all with safety as our top priority.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={service.id}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100"
              >
                <div className="bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.desc}
                </p>
                <div className="flex items-center text-yellow-600 font-bold text-sm group cursor-pointer">
                  Learn More <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer Section */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="electrical-gradient rounded-[2rem] p-12 md:p-20 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter">
                LIMITIED TIME OFFER
              </h2>
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-bold text-slate-800 flex items-center justify-center md:justify-start gap-2">
                  <CheckCircle2 className="w-6 h-6" /> FREE Electrical Safety Inspection
                </p>
                <p className="text-2xl font-bold text-slate-800 flex items-center justify-center md:justify-start gap-2">
                  <CheckCircle2 className="w-6 h-6" /> 10% OFF Your First Service
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-4 relative z-10">
              <div className="bg-slate-900 text-white text-3xl font-black px-8 py-6 rounded-2xl rotate-3 shadow-2xl">
                COUPON: ESDHAKA10
              </div>
              <button 
                onClick={scrollToForm}
                className="bg-white text-slate-900 font-bold px-10 py-4 rounded-xl hover:bg-slate-50 transition-colors shadow-lg"
              >
                Claim Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section className="py-24" id="lead-form">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
          <div className="w-full max-w-xl">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-extrabold text-slate-900 mb-3 tracking-tight">Request a Callback</h2>
              <p className="text-slate-500">Fill out the form below and our lead engineer will call you back within 15 minutes.</p>
            </div>
            
            <AnimatePresence mode="wait">
              {formState === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 p-8 rounded-3xl text-center"
                >
                  <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">Thank you!</h3>
                  <p className="text-slate-600 mb-6">We have received your request and will reach out shortly.</p>
                  <div className="p-4 bg-white rounded-xl border border-green-100 flex flex-col gap-2">
                    <p className="text-sm font-semibold text-slate-500">For urgent needs, WhatsApp us directly:</p>
                    <a 
                      href="https://wa.me/8801718417207" 
                      target="_blank"
                      className="flex items-center justify-center gap-2 bg-green-500 text-white p-3 rounded-lg font-bold hover:bg-green-600 transition-colors"
                      rel="noreferrer"
                    >
                      <MessageCircle className="w-5 h-5" />
                      +8801718417207
                    </a>
                  </div>
                </motion.div>
              ) : (
                <motion.form 
                  onSubmit={handleSubmit}
                  className="bg-white border border-slate-100 shadow-xl shadow-slate-100/50 p-8 md:p-10 rounded-[2.5rem] relative"
                >
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="John Doe"
                        className="w-full px-5 py-4 bg-slate-50 rounded-xl border-2 border-transparent focus:border-yellow-400 focus:bg-white transition-all outline-none"
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Phone Number (WhatsApp)</label>
                      <div className="relative">
                        <span className="absolute left-5 top-1/2 -translate-y-1/2 font-bold text-slate-400">+880</span>
                        <input 
                          type="tel" 
                          required
                          placeholder="17XXXXXXXX"
                          className="w-full pl-20 pr-5 py-4 bg-slate-50 rounded-xl border-2 border-transparent focus:border-yellow-400 focus:bg-white transition-all outline-none"
                          value={formData.phone}
                          onChange={e => setFormData({...formData, phone: e.target.value})}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Service Type</label>
                      <select 
                        required
                        className="w-full px-5 py-4 bg-slate-50 rounded-xl border-2 border-transparent focus:border-yellow-400 focus:bg-white transition-all outline-none appearance-none"
                        value={formData.service}
                        onChange={e => setFormData({...formData, service: e.target.value})}
                      >
                        <option value="">Select Service</option>
                        <option value="Home Wiring">Home Wiring</option>
                        <option value="Appliance Repair">Appliance Repair</option>
                        <option value="Industrial Maintenance">Industrial Maintenance</option>
                        <option value="Safety Inspection">Safety Inspection</option>
                      </select>
                    </div>
                  </div>

                  <AnimatePresence>
                    {formState === 'error' && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="mt-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-sm"
                      >
                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                        {errorMessage}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button 
                    disabled={formState === 'loading'}
                    className="w-full mt-8 bg-slate-900 text-white font-bold py-5 rounded-2xl hover:bg-slate-800 transition-all flex items-center justify-center gap-3 relative disabled:opacity-70"
                  >
                    {formState === 'loading' ? (
                      <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                      <>
                        <Zap className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        Submit Request
                      </>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-12">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-yellow-400 p-1.5 rounded-lg">
                <Zap className="w-6 h-6 text-slate-900 fill-slate-900" />
              </div>
              <span className="font-extrabold text-2xl tracking-tighter">ELECTRICAL<span className="text-yellow-500">SOLUTION</span></span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Premium electrical engineering services in Mohammadpur, Dhaka. 
              We solve power problems with safety, speed, and certified expertise.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center gap-3">
                <PhoneCall className="w-4 h-4 text-yellow-400" />
                +8801718417207
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-yellow-400" />
                WhatsApp (24/7 Support)
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Location</h4>
            <p className="text-slate-400 text-sm">
              Mohammadpur, Dhaka<br />
              Bangladesh
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          © {new Date().getFullYear()} Electrical Solution. All Rights Reserved.
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a 
        href="https://wa.me/8801718417207" 
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 text-white p-4 rounded-full shadow-2xl hover:bg-green-600 transition-all hover:scale-110 active:scale-95 group"
      >
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-slate-900 py-1.5 px-3 rounded-lg text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          WhatsApp Support 24/7
        </span>
        <MessageCircle className="w-8 h-8" />
      </a>
    </div>
  );
}

