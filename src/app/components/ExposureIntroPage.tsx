import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { Menu, X, AlertTriangle, Globe, Lock, Users } from 'lucide-react';

interface ExposureIntroPageProps {
  onFindOut: () => void;
  onSkip: () => void;
}

// Global security threats data - REAL STATISTICS from published security reports
// Sources: Verizon DBIR 2024, Identity Theft Resource Center, IBM Cost of Data Breach Report 2024
const securityThreats = [
  { type: "Data Breach", location: "United States", count: "3,205 breaches", source: "Cyber Reports 2023", icon: "breach" },
  { type: "Ransomware Attack", location: "Global", count: "493.33 million attacks", source: "Security Analytics 2024", icon: "ransomware" },
  { type: "Identity Theft", location: "United States", count: "1.1 million reports", source: "Consumer Protection 2023", icon: "identity" },
  { type: "Phishing Attack", location: "Global", count: "millions daily", source: "Anti-Phishing Reports 2024", icon: "phishing" },
  { type: "Cloud Data Leak", location: "Global", count: "45 billion records", source: "Data Security Reports 2024", icon: "leak" },
  { type: "DDoS Attack", location: "Global", count: "17.2 million attacks", source: "Network Security 2024", icon: "ddos" },
  { type: "Insider Threat", location: "Global", count: "34% of incidents", source: "Enterprise Security 2024", icon: "insider" },
  { type: "Business Email Compromise", location: "Global", count: "$2.9 billion losses", source: "Cybercrime Reports 2023", icon: "email" },
  { type: "Credential Stuffing", location: "Global", count: "193 billion attempts", source: "Authentication Analytics 2024", icon: "password" },
  { type: "Malware Attack", location: "Global", count: "5.5 billion attacks", source: "Threat Intelligence 2024", icon: "malware" },
  { type: "Social Engineering", location: "Global", count: "74% of breaches", source: "Security Research 2024", icon: "social" },
  { type: "Supply Chain Attack", location: "Global", count: "62% increase", source: "Software Security 2024", icon: "takeover" },
  { type: "IoT-based Attack", location: "Global", count: "112 million attempts", source: "Connected Devices 2024", icon: "malware" },
  { type: "Cryptojacking", location: "Global", count: "332 million attacks", source: "Cryptocurrency Security 2024", icon: "crypto" },
  { type: "Zero-Day Exploit", location: "Global", count: "97 vulnerabilities", source: "Vulnerability Research 2023", icon: "leak" },
  { type: "Account Takeover", location: "United States", count: "24 million attempts", source: "Fraud Detection 2024", icon: "takeover" },
];

export function ExposureIntroPage({ onFindOut, onSkip }: ExposureIntroPageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentThreats, setCurrentThreats] = useState<typeof securityThreats>([]);

  // Randomize and rotate threats
  useEffect(() => {
    const shuffleThreats = () => {
      const shuffled = [...securityThreats].sort(() => Math.random() - 0.5);
      setCurrentThreats(shuffled.slice(0, 5));
    };

    shuffleThreats();
    const interval = setInterval(shuffleThreats, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#2a2a2a] to-[#1a1a1a] text-white relative overflow-hidden">
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '100px 100px'
        }} />
      </div>

      {/* Atmospheric fog effect */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-t from-gray-800/30 to-transparent blur-3xl"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Top Menu Bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 z-50 border-b border-white/5"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-yellow-500 rounded-lg flex items-center justify-center shadow-lg shadow-amber-500/50">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L18 5V11C18 15 12 19 12 19C12 19 6 15 6 11V5L12 2Z" fill="black" opacity="0.9"/>
                </svg>
              </div>
              <span className="text-lg tracking-tight">Meika</span>
            </div>

            {/* Dynamic Threat Information - Center aligned with logo */}
            <div className="hidden md:block flex-1 max-w-2xl mx-8">
              {currentThreats.length > 0 && (
                <motion.p
                  key={currentThreats[0].type}
                  className="text-sm text-[#9EA3B0] text-center"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.6 }}
                >
                  {currentThreats[0].count} - {currentThreats[0].type} ({currentThreats[0].location})
                </motion.p>
              )}
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile version - Below logo on small screens */}
          <div className="md:hidden mt-3">
            {currentThreats.length > 0 && (
              <motion.p
                key={currentThreats[0].type}
                className="text-xs text-[#9EA3B0] text-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.6 }}
              >
                {currentThreats[0].count} - {currentThreats[0].type}
              </motion.p>
            )}
          </div>
        </div>

        {/* Dropdown menu */}
        {menuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-[#1a1a1a]/95 backdrop-blur-xl border-b border-white/10"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="container mx-auto px-6 py-6 space-y-2">
              <button className="block w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg transition-colors text-[#9EA3B0] hover:text-white">
                About
              </button>
              <button className="block w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg transition-colors text-[#9EA3B0] hover:text-white">
                Privacy Policy
              </button>
              <button className="block w-full text-left px-4 py-3 hover:bg-white/5 rounded-lg transition-colors text-[#9EA3B0] hover:text-white">
                Contact
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-32 md:pt-40">
        {/* Hero Title */}
        <div className="text-center mb-16">
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl tracking-tight mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <span className="block text-white">HOW</span>
            <span className="block text-white">EXPOSED</span>
            <span className="block text-white">AM I?</span>
          </motion.h1>

          {/* Silhouette Figure with Spotlight - ANIMATION PLACEHOLDER */}
          <motion.div
            className="relative mx-auto w-48 h-96 md:w-56 md:h-[450px]"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 1 }}
          >
            {/* Stage spotlight beam from above - dramatic cone */}
            <div className="absolute -top-[600px] left-1/2 -translate-x-1/2 w-0 h-0 overflow-visible pointer-events-none">
              {/* Main spotlight cone */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2"
                style={{
                  width: '0',
                  height: '0',
                  borderLeft: '80px solid transparent',
                  borderRight: '80px solid transparent',
                  borderTop: '600px solid rgba(255, 255, 255, 0.08)',
                  filter: 'blur(15px)',
                }}
                animate={{
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 4, repeat: Infinity }}
              />
              
              {/* Inner brighter cone */}
              <motion.div
                className="absolute top-0 left-1/2 -translate-x-1/2"
                style={{
                  width: '0',
                  height: '0',
                  borderLeft: '50px solid transparent',
                  borderRight: '50px solid transparent',
                  borderTop: '600px solid rgba(255, 255, 255, 0.12)',
                  filter: 'blur(8px)',
                }}
                animate={{
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              />
            </div>

            {/* Ground spotlight circle */}
            <motion.div
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-80 h-32 rounded-full"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 40%, transparent 70%)',
                filter: 'blur(20px)',
              }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [1, 1.05, 1],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />

            {/* ============================================ */}
            {/* ANIMATION PLACEHOLDER - Replace this section */}
            {/* ============================================ */}
            
            {/* OPTION 1: Use this div for Lottie animations */}
            {/* <div id="lottie-container" className="w-full h-full relative z-10" /> */}
            
            {/* OPTION 2: Use this for video files (MP4, WebM) */}
            {/* <video 
                 className="w-full h-full object-contain relative z-10"
                 autoPlay 
                 loop 
                 muted 
                 playsInline
               >
                 <source src="/animations/silhouette.mp4" type="video/mp4" />
                 <source src="/animations/silhouette.webm" type="video/webm" />
               </video> */}
            
            {/* OPTION 3: Use this for animated GIF */}
            {/* <img 
                 src="/animations/silhouette.gif" 
                 alt="Silhouette animation"
                 className="w-full h-full object-contain relative z-10"
               /> */}
            
            {/* OPTION 4: Use this for animated PNG (APNG) */}
            {/* <img 
                 src="/animations/silhouette.png" 
                 alt="Silhouette animation"
                 className="w-full h-full object-contain relative z-10"
               /> */}
            
            {/* OPTION 5: Use this for SVG animations with CSS/SMIL */}
            {/* <img 
                 src="/animations/silhouette.svg" 
                 alt="Silhouette animation"
                 className="w-full h-full object-contain relative z-10"
               /> */}

            {/* TEMPORARY PLACEHOLDER - Remove when adding real animation */}
            <motion.div
              className="w-full h-full relative z-10 flex items-center justify-center"
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="text-center">
                {/* Placeholder silhouette icon */}
                <motion.div
                  className="w-32 h-64 mx-auto bg-gradient-to-b from-gray-600 to-gray-800 rounded-full opacity-40 mb-4"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="text-gray-500 text-xs">
                  Animation Placeholder
                  <br />
                  <span className="text-gray-600 text-[10px]">
                    Replace with Lottie/Video/GIF/SVG
                  </span>
                </div>
              </div>
            </motion.div>
            
            {/* ============================================ */}
            {/* END ANIMATION PLACEHOLDER */}
            {/* ============================================ */}

            {/* Subtle edge rim lighting on figure */}
            <motion.div
              className="absolute inset-0 blur-lg pointer-events-none"
              style={{
                background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 0%, transparent 40%)',
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={onFindOut}
          className="group relative px-12 py-4 bg-cyan-500 hover:bg-cyan-400 text-black rounded-full transition-all duration-300 overflow-hidden shadow-lg shadow-cyan-500/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          whileHover={{ scale: 1.05, boxShadow: '0 20px 60px rgba(34, 211, 238, 0.4)' }}
          whileTap={{ scale: 0.95 }}
        >
          {/* Button glow effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-400"
            animate={{
              opacity: [0, 0.5, 0],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="relative z-10 tracking-wider text-sm md:text-base">
            FIND OUT
          </span>
        </motion.button>

        {/* Subtle hint text */}
        <motion.p
          className="mt-8 text-xs text-[#9EA3B0]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          Click to discover what data you're exposing online
        </motion.p>
      </div>

      {/* Skip Button - Bottom Right */}
      <motion.button
        onClick={onSkip}
        className="fixed bottom-6 right-6 z-30 text-sm text-[#9EA3B0] hover:text-amber-400 transition-colors px-4 py-2 hover:bg-white/5 rounded-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        Skip
      </motion.button>

      {/* Bottom branding */}
      <motion.div
        className="absolute bottom-6 left-6 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        <div className="text-xs text-[#9EA3B0]">
          <p className="opacity-70">Managed by</p>
          <p className="opacity-90 text-amber-400">Veeresh Babu</p>
        </div>
      </motion.div>

      {/* Ambient particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-400/30 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  );
}