import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage('All fields are required.');
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please enter a valid email address.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!validateForm()) return;

    setStatus('sending');

    try {
      // Replace 'YOUR_FORM_ID' with your actual Formspree endpoint ID
      const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
          setErrorMessage(data.errors.map((error: any) => error.message).join(', '));
        } else {
          setErrorMessage('Oops! There was a problem submitting your form');
        }
        setStatus('error');
      }
    } catch (error) {
      setErrorMessage('Oops! There was a problem submitting your form');
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.02 }}
      className="max-w-7xl mx-auto px-4 md:px-6 min-h-full flex flex-col items-center justify-start md:justify-center py-16 md:py-24"
    >
      <div className="text-center mb-8 md:mb-16 space-y-4 md:space-y-6">
        <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl leading-tight md:leading-none">Initiate Communication.</h1>
        <p className="text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto font-light leading-relaxed">
          Whether you have a specific project in mind or want to discuss technical architectures, I am available for high-impact collaborations.
        </p>
      </div>

      <div className="w-full max-w-2xl bg-surface-dim p-5 sm:p-8 md:p-12 border border-outline relative shadow-2xl">
        <div className="absolute top-0 right-0 p-4 opacity-10 hidden md:block">
          <Mail size={120} />
        </div>
        
        <h2 className="label-caps text-primary mb-8 md:mb-12 flex items-center gap-2">
          <span className="w-8 h-[1px] bg-primary"></span> TRANSMISSION_FORM
        </h2>

        {status === 'success' ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 space-y-6"
          >
            <CheckCircle2 size={64} className="mx-auto text-primary" />
            <div className="space-y-2">
              <h3 className="text-2xl md:text-3xl font-serif">Message Sent Successfully!</h3>
              <p className="text-on-surface-variant">Thank you for reaching out. I will get back to you soon.</p>
            </div>
            <button 
              onClick={() => setStatus('idle')}
              className="border border-outline px-8 py-3 label-caps hover:bg-surface-container transition-all"
            >
              SEND ANOTHER MESSAGE
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 md:space-y-12 relative z-10">
            <div className="space-y-2 group">
              <label className="label-caps text-on-surface-variant group-focus-within:text-primary transition-colors">NAME</label>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="E.G. ALAN TURING"
                required
                className="w-full bg-transparent border-b border-outline pb-4 focus:outline-none focus:border-primary font-serif text-lg md:text-2xl placeholder:text-on-surface-variant/20 transition-all"
              />
            </div>

            <div className="space-y-2 group">
              <label className="label-caps text-on-surface-variant group-focus-within:text-primary transition-colors">EMAIL_ADDRESS</label>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E.G. ALAN@ENIGMA.TECH"
                required
                className="w-full bg-transparent border-b border-outline pb-4 focus:outline-none focus:border-primary font-serif text-lg md:text-2xl placeholder:text-on-surface-variant/20 transition-all"
              />
            </div>

            <div className="space-y-2 group">
              <label className="label-caps text-on-surface-variant group-focus-within:text-primary transition-colors">MESSAGE_BODY</label>
              <textarea 
                rows={4}
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="DESCRIBE YOUR PROJECT OR ARCHITECTURE..."
                required
                className="w-full bg-transparent border-b border-outline pb-4 focus:outline-none focus:border-primary font-serif text-lg md:text-2xl placeholder:text-on-surface-variant/20 transition-all resize-none"
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-error text-sm">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <button 
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-primary text-on-primary py-5 md:py-6 label-caps text-sm hover:brightness-110 active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed transition-all flex justify-center items-center gap-2"
            >
              {status === 'sending' ? (
                <>SENDING... <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}><Mail size={16} /></motion.div></>
              ) : (
                <>SEND_TRANSMISSION <ArrowRight size={16} /></>
              )}
            </button>
          </form>
        )}
      </div>
    </motion.div>
  );
};
