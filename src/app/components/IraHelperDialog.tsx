import { motion, AnimatePresence } from 'motion/react';
import { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ira';
  timestamp: Date;
}

interface IraHelperDialogProps {
  isOpen: boolean;
  onClose: () => void;
  theme?: 'yellow' | 'blue-green';
}

const predefinedQuestions = [
  'How does encryption work?',
  'What are your pricing plans?',
  'Is my data safe?',
  'How do I get started?',
  'Do you support team collaboration?',
  'What file types are supported?'
];

const responses: Record<string, string> = {
  'how does encryption work': "Great question! 🔒 Meika uses military-grade AES-256 encryption to protect your documents. This means your files are scrambled into an unreadable format that only you can decrypt with your unique key. Think of it like a super-secure vault that only you have the combination to!",
  
  'what are your pricing plans': "We have three flexible plans! 💰\n\n• **Starter** ($9/month) - Perfect for individuals\n• **Professional** ($29/month) - Great for small teams\n• **Enterprise** (Custom) - Built for large organizations\n\nAll plans include end-to-end encryption and 24/7 support. Want to see the full details? Just head over to our Pricing page!",
  
  'is my data safe': "Absolutely! 🛡️ Your data security is our top priority. Here's why you can trust us:\n\n✓ Zero-knowledge architecture (we can't see your files)\n✓ End-to-end encryption\n✓ Offline-first design\n✓ GDPR & HIPAA compliant\n✓ Regular security audits\n\nYour files never leave your device unencrypted!",
  
  'how do i get started': "Getting started is super easy! 🚀\n\n1. Click 'Download Software' button\n2. Install Meika on your device\n3. Create your account\n4. Start encrypting files!\n\nThe whole process takes less than 5 minutes. Plus, we have a free trial so you can test everything out!",
  
  'do you support team collaboration': "Yes, we do! 👥 Our Professional and Enterprise plans include:\n\n✓ Team workspaces\n✓ Shared encrypted folders\n✓ Role-based access control\n✓ Real-time collaboration\n✓ Activity logs\n\nYou can securely share files with your team while maintaining full encryption!",
  
  'what file types are supported': "We support all file types! 📁 Whether it's:\n\n• Documents (PDF, DOCX, TXT)\n• Images (JPG, PNG, SVG)\n• Videos (MP4, MOV, AVI)\n• Archives (ZIP, RAR)\n• Code files\n• Or anything else!\n\nMeika encrypts any file type without limitations.",

  'features': "Meika is packed with powerful features! ⚡\n\n✓ Military-grade AES-256 encryption\n✓ Offline-first architecture\n✓ Cross-platform (Windows, Mac, Linux, Mobile)\n✓ Zero-knowledge security\n✓ Team collaboration tools\n✓ Audit logs & compliance\n✓ Two-factor authentication\n✓ Automated backups\n\nWhat specific feature would you like to know more about?",

  'about': "Meika was built by security experts who believe privacy is a fundamental right! 🎯\n\nWe're on a mission to make enterprise-grade document security accessible to everyone - from individual professionals to large organizations.\n\nWant to learn more? Check out our About page!",

  'contact': "I'd love to help you get in touch! 📧\n\nYou can reach our team through:\n• Email: support@meika.io\n• Live chat (coming soon!)\n• Contact form on our Contact page\n\nWe typically respond within 2 hours during business hours!",

  'download': "Ready to try Meika? 📥\n\nJust click the 'Download' button at the top right of the page! We offer:\n\n✓ 14-day free trial (no credit card required)\n✓ Available for Windows, Mac, and Linux\n✓ Mobile apps for iOS & Android\n\nDownload now and start securing your documents in minutes!",

  'trial': "Great news! We offer a 14-day free trial! 🎉\n\nNo credit card required - just:\n1. Download the software\n2. Create your account\n3. Start encrypting!\n\nYou'll get full access to all Starter plan features. Upgrade anytime if you need more!",

  'thanks': "You're very welcome! 🐕 That's what I'm here for!\n\nIs there anything else you'd like to know about Meika? I'm always happy to help!",

  'hello': "Woof woof! 👋 Hello there! How can I help you learn about Meika today?",
  
  'authenticator': "Great question about Meika Authenticator! 🔐\n\nMeika Authenticator is our zero-trust passwordless identity platform that provides:\n\n✓ Passwordless authentication with passkeys\n✓ Enterprise SSO integration\n✓ Multi-factor authentication (MFA)\n✓ Biometric login support\n✓ Real-time threat detection\n✓ 99.99% uptime SLA\n\nIt's designed to match enterprise benchmarks like Microsoft Entra ID and Okta Workforce Identity!",
  
  'passkey': "Passkeys are the future of authentication! 🔑\n\nWith Meika Authenticator, you can:\n• Login without passwords using biometrics\n• Use device-based authentication\n• Eliminate phishing attacks\n• Enjoy faster, more secure logins\n\nPasskeys are 40% faster than traditional passwords and virtually impossible to phish!",

  'default': "Woof! 🐕 I'm not sure I understood that perfectly, but I'm here to help!\n\nTry asking me about:\n• 🔒 Encryption & security features\n• 💰 Pricing plans & trials\n• 🚀 Getting started guide\n• 👥 Team collaboration\n• 📱 Supported platforms\n• 📧 Contacting our team\n• 🔐 Meika Authenticator\n\nWhat would you like to know?"
};

export function IraHelperDialog({ isOpen, onClose, theme = 'yellow' }: IraHelperDialogProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi there! 👋 I'm Ira, your friendly Meika helper! How can I assist you today?",
      sender: 'ira',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Theme configurations
  const themes = {
    yellow: {
      headerGradient: 'from-amber-900/20',
      headerBorder: 'border-amber-500/20',
      containerBorder: 'border-amber-500/30',
      containerShadow: 'shadow-amber-900/20',
      accentBg: 'from-amber-500 to-amber-600',
      accentColor: 'text-amber-400',
      buttonBg: 'bg-amber-600 hover:bg-amber-700',
      buttonDisabled: 'disabled:bg-amber-900/30',
      messageBg: 'bg-amber-900/30 border border-amber-500/20',
      chipBg: 'bg-amber-900/20 hover:bg-amber-900/40 border border-amber-500/20',
      chipText: 'text-amber-200',
      inputRing: 'focus:ring-amber-500/50',
      typingDot: 'bg-amber-400',
      tailBorder: 'border-amber-500/30',
    },
    'blue-green': {
      headerGradient: 'from-blue-900/20',
      headerBorder: 'border-blue-500/20',
      containerBorder: 'border-blue-500/30',
      containerShadow: 'shadow-blue-900/20',
      accentBg: 'from-blue-500 to-green-500',
      accentColor: 'text-blue-400',
      buttonBg: 'bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600',
      buttonDisabled: 'disabled:bg-blue-900/30',
      messageBg: 'bg-blue-900/30 border border-blue-500/20',
      chipBg: 'bg-blue-900/20 hover:bg-blue-900/40 border border-blue-500/20',
      chipText: 'text-blue-200',
      inputRing: 'focus:ring-blue-500/50',
      typingDot: 'bg-blue-400',
      tailBorder: 'border-blue-500/30',
    },
  };

  const currentTheme = themes[theme];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const findResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    for (const [key, response] of Object.entries(responses)) {
      if (key !== 'default' && lowerQuestion.includes(key)) {
        return response;
      }
    }
    
    return responses['default'];
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue.trim();
    if (!messageText) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate thinking delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    // Add Ira's response
    const response = findResponse(messageText);
    const iraMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'ira',
      timestamp: new Date()
    };

    setIsTyping(false);
    setMessages(prev => [...prev, iraMessage]);
  };

  const handleQuickQuestion = (question: string) => {
    handleSendMessage(question);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay for better UX */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 w-[calc(100vw-2rem)] sm:w-[400px] max-w-[400px] h-[calc(100vh-8rem)] sm:h-[600px] max-h-[calc(100vh-8rem)] z-[70] flex flex-col"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Dialog Container */}
            <div className={`bg-[#0A0B0F]/95 backdrop-blur-2xl border ${currentTheme.containerBorder} rounded-2xl shadow-2xl ${currentTheme.containerShadow} flex flex-col h-full overflow-hidden`}>
              {/* Header */}
              <div className={`flex items-center justify-between p-4 border-b ${currentTheme.headerBorder} bg-gradient-to-r ${currentTheme.headerGradient} to-transparent`}>
                <div className="flex items-center gap-3">
                  <motion.div
                    className={`w-10 h-10 bg-gradient-to-br ${currentTheme.accentBg} rounded-full flex items-center justify-center`}
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="text-xl">🐕</span>
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-white">Ira</h3>
                    <div className="flex items-center gap-1.5">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-[#9EA3B0]">Online</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors text-[#9EA3B0] hover:text-white z-10 relative"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Messages Area */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                        message.sender === 'user'
                          ? 'bg-indigo-600 text-white'
                          : `${currentTheme.messageBg} text-white`
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                      <span className="text-xs opacity-60 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </motion.div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <motion.div
                    className="flex justify-start"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <div className={`${currentTheme.messageBg} rounded-2xl px-4 py-3`}>
                      <div className="flex gap-1">
                        <motion.div
                          className={`w-2 h-2 ${currentTheme.typingDot} rounded-full`}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        />
                        <motion.div
                          className={`w-2 h-2 ${currentTheme.typingDot} rounded-full`}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        />
                        <motion.div
                          className={`w-2 h-2 ${currentTheme.typingDot} rounded-full`}
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Questions */}
              {messages.length === 1 && (
                <motion.div
                  className="px-4 pb-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-xs text-[#9EA3B0] mb-2">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {predefinedQuestions.slice(0, 3).map((question, index) => (
                      <motion.button
                        key={index}
                        onClick={() => handleQuickQuestion(question)}
                        className={`text-xs px-3 py-1.5 ${currentTheme.chipBg} ${currentTheme.chipText} rounded-full transition-colors`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {question}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Input Area */}
              <div className={`p-4 border-t ${currentTheme.headerBorder} bg-gradient-to-r ${currentTheme.headerGradient} to-transparent`}>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendMessage();
                  }}
                  className="flex gap-2"
                >
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Ask me anything..."
                    className={`flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-[#9EA3B0] focus:outline-none focus:ring-2 ${currentTheme.inputRing} focus:border-transparent text-sm`}
                  />
                  <motion.button
                    type="submit"
                    disabled={!inputValue.trim()}
                    className={`p-2.5 ${currentTheme.buttonBg} ${currentTheme.buttonDisabled} disabled:cursor-not-allowed rounded-xl text-white transition-colors`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send className="w-5 h-5" />
                  </motion.button>
                </form>
              </div>
            </div>

            {/* Pointer tail */}
            <div className={`absolute -bottom-3 right-12 w-6 h-6 bg-[#0A0B0F]/95 border-r border-b ${currentTheme.tailBorder} transform rotate-45`} />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}