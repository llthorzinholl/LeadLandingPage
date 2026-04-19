import React from 'react';
import { motion } from 'motion/react';
import { Send, Phone, Mail } from 'lucide-react';

type FormDataType = {
  name: string;
  email: string;
  phone: string;
  propertyType: string;
  message: string;
};

type FormErrorsType = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Aceita:
// Mobile:
// 0412 345 678
// 0412345678
// +61 412 345 678
// +61412345678
//
// Landline / commercial:
// (02) 9546 7655
// 02 9546 7655
// 0295467655
// +61 2 9546 7655
// +61295467655
const AU_PHONE_REGEX =
  /^(?:\+61\s?[2378]\s?\d{4}\s?\d{4}|\+61\s?4\d{2}\s?\d{3}\s?\d{3}|\(0[2378]\)\s?\d{4}\s?\d{4}|0[2378]\s?\d{4}\s?\d{4}|04\d{2}\s?\d{3}\s?\d{3})$/;

const formatAustralianPhone = (value: string) => {
  const hasPlus61 = value.trim().startsWith('+61');
  const digitsOnly = value.replace(/\D/g, '');

  if (hasPlus61) {
    const localDigits = digitsOnly.startsWith('61')
      ? digitsOnly.slice(2, 11)
      : digitsOnly.slice(0, 9);

    if (!localDigits) return '+61';

    // Mobile after +61 => 4XXXXXXXX
    if (localDigits.startsWith('4')) {
      if (localDigits.length <= 1) return `+61 ${localDigits}`;
      if (localDigits.length <= 4) return `+61 ${localDigits}`;
      if (localDigits.length <= 7) {
        return `+61 ${localDigits.slice(0, 3)} ${localDigits.slice(3)}`;
      }
      return `+61 ${localDigits.slice(0, 3)} ${localDigits.slice(3, 6)} ${localDigits.slice(6, 9)}`;
    }

    // Landline after +61 => 2XXXXXXXX / 3XXXXXXXX / 7XXXXXXXX / 8XXXXXXXX
    if (localDigits.length <= 1) return `+61 ${localDigits}`;
    if (localDigits.length <= 5) return `+61 ${localDigits}`;
    return `+61 ${localDigits.slice(0, 1)} ${localDigits.slice(1, 5)} ${localDigits.slice(5, 9)}`;
  }

  const cleaned = digitsOnly.slice(0, 10);

  if (!cleaned) return '';

  // Mobile local
  if (cleaned.startsWith('04')) {
    if (cleaned.length <= 4) return cleaned;
    if (cleaned.length <= 7) return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
    return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 10)}`;
  }

  // Landline local
  if (/^0[2378]/.test(cleaned)) {
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 6) return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2)}`;
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)} ${cleaned.slice(6, 10)}`;
  }

  return cleaned;
};

const normalizeAustralianPhoneForDb = (value: string) => {
  const digits = value.replace(/\D/g, '');

  if (!digits) return null;

  if (digits.startsWith('61')) {
    return `+${digits}`;
  }

  if (digits.startsWith('0')) {
    return `+61${digits.slice(1)}`;
  }

  return value;
};

export const Contact = () => {
  const [status, setStatus] = React.useState<'idle' | 'sending' | 'success'>('idle');

  const [formData, setFormData] = React.useState<FormDataType>({
    name: '',
    email: '',
    phone: '',
    propertyType: 'Residential',
    message: '',
  });

  const [errors, setErrors] = React.useState<FormErrorsType>({});

  const validateForm = (data: FormDataType) => {
    const newErrors: FormErrorsType = {};

    if (!data.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!data.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(data.email.trim())) {
      newErrors.email = 'Enter a valid email address';
    }

    if (!data.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!AU_PHONE_REGEX.test(data.phone.trim())) {
      newErrors.phone = 'Enter a valid Australian phone number';
    }

    if (!data.message.trim()) {
      newErrors.message = 'Message is required';
    }

    return newErrors;
  };

  const inputBaseClass =
    'w-full rounded-xl px-4 py-3 text-slate-900 focus:ring-2 outline-none transition-all';

  const getInputClass = (hasError?: string) =>
    `${inputBaseClass} ${
      hasError
        ? 'bg-red-50 border border-red-500 placeholder-red-400 focus:ring-red-500'
        : 'bg-slate-50 border border-transparent focus:ring-emerald-500'
    }`;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    let finalValue = value;

    if (name === 'phone') {
      finalValue = formatAustralianPhone(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus('sending');

    try {
      const payload = {
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim().toLowerCase(),
        phone: normalizeAustralianPhoneForDb(formData.phone),
        message: formData.message.trim(),
      };

      const res = await fetch('/api/contact-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const contentType = res.headers.get('content-type') || '';
      const isJson = contentType.includes('application/json');
      const responseData = isJson ? await res.json() : await res.text();

      if (!res.ok) {
        console.error('API error response:', responseData);
        setStatus('idle');
        alert(
          typeof responseData === 'string'
            ? responseData
            : responseData?.error || 'Something went wrong while sending the form'
        );
        return;
      }

           if (
        isJson &&
        responseData &&
        typeof responseData === 'object' &&
        responseData.success
      ) {
        // ✅ DISPARA TRACKER GOOGLE ADS (APENAS QUANDO DEU CERTO)
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'conversion', {
            send_to: 'AW-994192169/u511CIbluoUcEKnWiNoD',
            value: 1.0,
            currency: 'AUD',
          });
        }
      
        setStatus('success');
        setErrors({});
        setFormData({
          name: '',
          email: '',
          phone: '',
          propertyType: 'Residential',
          message: '',
        });
      
        return;
      }

      console.error('Unexpected server response:', responseData);
      setStatus('idle');
      alert('Unexpected server response');
    } catch (error) {
      console.error('Submit error:', error);
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
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-8 text-emerald-600 font-bold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder={errors.name || 'John Doe'}
                      className={getInputClass(errors.name)}
                    />
                    {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                  </div>

                  <div>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      type="email"
                      placeholder={errors.email || 'john@example.com'}
                      className={getInputClass(errors.email)}
                    />
                    {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    type="tel"
                    inputMode="tel"
                    placeholder={errors.phone || '0413 456 789'}
                    className={getInputClass(errors.phone)}
                  />
                  {errors.phone && <p className="mt-2 text-sm text-red-600">{errors.phone}</p>}
                </div>

                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full bg-slate-50 border border-transparent rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-emerald-500 outline-none"
                >
                  <option>Residential</option>
                  <option>Commercial</option>
                  <option>Industrial</option>
                </select>

                <div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={errors.message || 'How can we help you?'}
                    className={getInputClass(errors.message)}
                  />
                  {errors.message && (
                    <p className="mt-2 text-sm text-red-600">{errors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
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
