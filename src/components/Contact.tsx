import React from 'react';
import { motion } from 'motion/react';
import { Send, Phone, Mail } from 'lucide-react';

export const Contact = () => {
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'success'>('idle');

  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    propertyType: 'Residential',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill all required fields');
      return;
    }

    setStatus('sending');

    try {
      const res = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setFormData({
          name: '',
          email: '',
          propertyType: 'Residential',
          message: '',
        });
      } else {
        setStatus('idle');
        alert('Something went wrong');
      }
    } catch (error) {
      console.error(error);
      setStatus('idle');
      alert('Error sending message');
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-1/3 h-full bg-emerald-600/10 blur-[120px]" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-8">
              Protect your health today. <br />
              <span className="text-emerald-400">Request a free quote.</span>
            </h2>

            <p className="text-slate-400 text-lg mb-12 max-w-md">
              Our technical team will contact you in less than 24 hours.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">Phone</p>
                  <p className="text-lg font-medium">0425 257 142</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <p className="text-sm text-slate-500 uppercase font-bold tracking-wider">Email</p>
                  <p className="text-lg font-medium">business.support@aesaus.com.au</p>
                </div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl"
          >
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send className="w-10 h-10 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Message Sent!</h3>
                <p className="text-slate-600">We will get back to you shortly.</p>
                <button 
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-emerald-600 font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">

                <div className="grid sm:grid-cols-2 gap-6">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />

                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    type="email"
                    placeholder="john@example.com"
                    className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500"
                >
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Industrial</option>
                </select>

                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="How can we help you?"
                  className="w-full bg-slate-50 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500"
                />

                <button 
                  disabled={status === 'sending'}
                  className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl hover:bg-emerald-500 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {status === 'sending' ? 'Sending...' : 'Request Quote'}
                  <Send className="w-5 h-5" />
                </button>

              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};