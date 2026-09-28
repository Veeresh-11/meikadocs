import { motion } from 'motion/react';
import { Mail, MapPin, Phone, Send, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { Footer } from '../components/Footer';
import { validateEmail, sanitizeName, sanitizeMessage, formRateLimiter } from '../utils/security';

interface ContactPageProps {
  setCurrentPage: (page: string) => void;
}

export function ContactPage({ setCurrentPage }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [rateLimited, setRateLimited] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setRateLimited(false);

    // Validate inputs
    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    const sanitizedName = sanitizeName(formData.name);
    if (!sanitizedName || sanitizedName.length < 2) {
      setError('Please enter a valid name (at least 2 characters)');
      return;
    }

    if (formData.subject.trim().length < 3) {
      setError('Please enter a subject (at least 3 characters)');
      return;
    }

    if (formData.message.trim().length < 10) {
      setError('Please enter a message (at least 10 characters)');
      return;
    }

    // Check rate limiting
    const rateLimitId = `contact-${formData.email}`;
    if (!formRateLimiter.isAllowed(rateLimitId)) {
      setRateLimited(true);
      const remainingTime = Math.ceil(formRateLimiter.getRemainingTime(rateLimitId) / 1000);
      setError(`Too many submissions. Please wait ${remainingTime} seconds before trying again.`);
      return;
    }

    // Sanitize all inputs
    const sanitizedData = {
      name: sanitizedName,
      email: formData.email,
      subject: sanitizeMessage(formData.subject, 200),
      message: sanitizeMessage(formData.message)
    };

    // In production, send sanitized data to backend
    console.log('Sanitized form data:', sanitizedData);

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      setError('');
    }, 3000);
  };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="container mx-auto px-4 lg:px-8 py-24 lg:py-32">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 bg-yellow-500/10 border border-yellow-500/20 rounded-full text-yellow-400 text-sm mb-6">
            We're Here to Help
          </div>
          <h1 className="text-4xl lg:text-6xl tracking-tight mb-6">
            Get in Touch
          </h1>
          <p className="text-xl text-[#9EA3B0] leading-relaxed">
            Have questions about Meika? Our team is ready to help you secure your documents and find the perfect plan for your needs.
          </p>
        </motion.div>
      </section>

      {/* Contact Form & Info */}
      <section className="container mx-auto px-4 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div>
              <h2 className="text-3xl tracking-tight mb-6">Contact Information</h2>
              <p className="text-[#9EA3B0] mb-8">
                Reach out through any of these channels, and we'll get back to you within 24 hours.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-600/20 border border-yellow-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg mb-1">Email</h3>
                  <a href="mailto:hello@meika.io" className="text-[#9EA3B0] hover:text-yellow-400 transition-colors">
                    hello@meika.io
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-600/20 border border-yellow-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg mb-1">Phone</h3>
                  <a href="tel:+1-555-123-4567" className="text-[#9EA3B0] hover:text-yellow-400 transition-colors">
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-yellow-600/20 border border-yellow-500/30 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-yellow-400" />
                </div>
                <div>
                  <h3 className="text-lg mb-1">Office</h3>
                  <p className="text-[#9EA3B0]">
                    123 Security Boulevard<br />
                    San Francisco, CA 94102
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/10">
              <h3 className="text-xl mb-4">Enterprise Inquiries</h3>
              <p className="text-[#9EA3B0] mb-6">
                Need a custom solution for your organization? Let's schedule a call to discuss your requirements.
              </p>
              <motion.button
                className="px-6 py-3 bg-white text-[#0A0B0F] rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-[#0A0B0F]"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Book a Meeting
              </motion.button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-2xl p-8">
              <h2 className="text-2xl tracking-tight mb-6">Send us a Message</h2>

              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm mb-2 text-[#9EA3B0]">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#9EA3B0] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm mb-2 text-[#9EA3B0]">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#9EA3B0] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="john@company.com"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm mb-2 text-[#9EA3B0]">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#9EA3B0] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    placeholder="How can we help?"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm mb-2 text-[#9EA3B0]">
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#9EA3B0] focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all resize-none"
                    placeholder="Tell us more about your inquiry..."
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  className="w-full px-6 py-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-[#10121A] flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={submitted}
                >
                  {submitted ? (
                    <>
                      <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Submit Securely
                    </>
                  )}
                </motion.button>

                <p className="text-xs text-[#9EA3B0] text-center">
                  🔒 Your message is encrypted and sent securely
                </p>

                {error && (
                  <div className="mt-4 text-sm text-red-500 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    {error}
                  </div>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}