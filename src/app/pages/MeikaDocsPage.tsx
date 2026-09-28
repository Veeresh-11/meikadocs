import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import {
  FolderOpen, Shield, Upload, Share2, Lock,
  CheckCircle2, CloudUpload, Activity, Globe,
  ChevronRight, ShieldCheck, Users, Clock, Zap,
  FileText, AlertTriangle
} from 'lucide-react';
import { MeikaDocsNavigation }    from '../components/MeikaDocsNavigation';
import { MeikaDocsFooter }        from '../components/MeikaDocsFooter';
import { MeikaDocsVaultScreen }   from '../components/MeikaDocsVaultScreen';
import { MeikaDocsSecurityScreen }from '../components/MeikaDocsSecurityScreen';
import { MeikaDocsUploadScreen }  from '../components/MeikaDocsUploadScreen';
import { MeikaDocsSharingScreen } from '../components/MeikaDocsSharingScreen';
import {
  FloatingDocuments,
  VaultHexGrid,
  CloudSyncLines,
  DocSecurityRings,
  DataRain,
  DocParticles,
} from '../components/MeikaDocsAnimations';

interface MeikaDocsPageProps {
  setCurrentPage: (page: string) => void;
}

type DemoScreen = 'vault' | 'security' | 'upload' | 'sharing';

const DEMO_SCREENS: { id: DemoScreen; label: string; icon: React.ElementType }[] = [
  { id: 'vault',    label: 'File Vault',       icon: FolderOpen  },
  { id: 'security', label: 'Security Alerts',  icon: Shield      },
  { id: 'upload',   label: 'Cloud Import',     icon: Upload      },
  { id: 'sharing',  label: 'Share Center',     icon: Share2      },
];

const FEATURES = [
  { icon: Upload,      title: 'Universal Cloud Import',      desc: 'Connect Google Drive, OneDrive, Dropbox, Box, iCloud and local storage. Import files without ever moving your data.' },
  { icon: Shield,      title: 'Identity-Verified Access',    desc: 'Every secured file triggers a real-time "Was this you?" alert before it opens — just like Google\'s sign-in verification.' },
  { icon: Share2,      title: 'OrangeDox-Style Sharing',     desc: 'Share files via expiring links or export to any cloud. Track who opened it, when, and from where. Revoke at any time.' },
  { icon: Lock,        title: 'Per-File Encryption',         desc: 'Each file gets its own AES-256 key stored in your vault. Even Meika cannot read your files.' },
  { icon: Activity,    title: 'Immutable Audit Logs',        desc: 'Every open, block, upload and share is logged permanently. Meets SOC 2, ISO 27001, GDPR and HIPAA requirements.' },
  { icon: CloudUpload, title: 'Bidirectional Cloud Sync',    desc: 'Changes propagate back to your cloud providers in real time. Your files stay in sync across every platform.' },
];

const COMPLIANCE = [
  { name: 'AES-256',    status: 'Encryption'    },
  { name: 'SOC 2 II',   status: 'Certified'     },
  { name: 'GDPR',       status: 'Compliant'     },
  { name: 'ISO 27001',  status: 'Certified'     },
  { name: 'HIPAA',      status: 'Compliant'     },
  { name: 'Zero-Knowledge', status: 'Architecture' },
];

export function MeikaDocsPage({ setCurrentPage }: MeikaDocsPageProps) {
  const [activeDemo, setActiveDemo] = useState<DemoScreen>('vault');
  const [scrolled, setScrolled]     = useState(false);

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleBackToMain = useCallback(() => {
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setCurrentPage]);

  const handleContactClick = useCallback(() => {
    setCurrentPage('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [setCurrentPage]);

  const renderDemo = () => {
    switch (activeDemo) {
      case 'vault':    return <MeikaDocsVaultScreen />;
      case 'security': return <MeikaDocsSecurityScreen />;
      case 'upload':   return <MeikaDocsUploadScreen />;
      case 'sharing':  return <MeikaDocsSharingScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#06070F] via-[#0A0B12] to-[#06070F]">
      <MeikaDocsNavigation onBackToMain={handleBackToMain} scrolled={scrolled} />

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background effects — mirrors MeikaAuthenticatorPage hero */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-96 h-96 bg-indigo-500 rounded-full blur-[120px]" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-500 rounded-full blur-[120px]" />
        </div>

        {/* Animations */}
        <FloatingDocuments />
        <VaultHexGrid />
        <CloudSyncLines />
        <DocSecurityRings />
        <DataRain />
        <DocParticles count={20} />

        <div className="container mx-auto max-w-7xl relative z-10">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

            {/* Logo + Brand — mirrors MeikaAuthenticatorPage logo block */}
            <div className="flex items-center justify-center gap-5 mb-8">
              <motion.div
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-2xl shadow-indigo-500/40"
                animate={{ boxShadow: ['0 0 40px rgba(99,102,241,0.3)', '0 0 80px rgba(139,92,246,0.5)', '0 0 40px rgba(99,102,241,0.3)'] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <FolderOpen className="w-10 h-10 text-white" />
              </motion.div>
              <div className="text-left">
                <h1 className="text-5xl lg:text-6xl mb-2">
                  <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
                    Meika
                  </span>
                  <br />
                  <span className="text-white">Docs</span>
                </h1>
                <p className="text-sm text-indigo-400 uppercase tracking-wider">Meika Security Platform</p>
              </div>
            </div>

            <p className="text-xl lg:text-2xl text-[#9EA3B0] max-w-3xl mx-auto mb-4 leading-relaxed">
              Your secure, unified document vault.
            </p>
            <p className="text-base text-[#6B7280] max-w-2xl mx-auto mb-10 leading-relaxed">
              Connect Google Drive, OneDrive, Dropbox, Box and local files. Add identity-verified
              security layers to sensitive documents. Share like OrangeDox — with full tracking and control.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <motion.button
                className="px-8 py-3.5 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white rounded-xl text-sm font-medium transition-all shadow-lg shadow-indigo-500/30 flex items-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}
              >
                Start Free Vault <ChevronRight className="w-4 h-4" />
              </motion.button>
              <motion.button
                className="px-8 py-3.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-xl text-sm transition-all"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              >
                Watch Demo
              </motion.button>
            </div>

            {/* Stats row — mirrors Authenticator page metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
              {[
                { value: '6+',      label: 'Cloud Sources'     },
                { value: 'AES-256', label: 'Encryption'        },
                { value: '< 1s',    label: 'Access Alerts'     },
                { value: '100%',    label: 'Audit Coverage'    },
              ].map(s => (
                <div key={s.label} className="p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-center">
                  <p className="text-2xl text-white mb-1">{s.value}</p>
                  <p className="text-xs text-[#9EA3B0]">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Features (#features) ─────────────────────────────────────────── */}
      <section id="features" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-indigo-400 text-sm uppercase tracking-widest mb-3">Core capabilities</p>
            <h2 className="text-4xl lg:text-5xl text-white mb-4">Enterprise-grade document security</h2>
            <p className="text-[#9EA3B0] max-w-2xl mx-auto leading-relaxed">
              Every feature you need to secure, organise and share sensitive documents across your organisation.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={f.title}
                  className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-indigo-500/30 transition-all group"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -4 }}>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-indigo-400" />
                  </div>
                  <h3 className="text-white text-lg mb-2">{f.title}</h3>
                  <p className="text-[#9EA3B0] text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Cloud Integrations (#integrations) ───────────────────────────── */}
      <section id="integrations" className="py-20 px-4 bg-white/[0.02]">
        <div className="container mx-auto max-w-7xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-indigo-400 text-sm uppercase tracking-widest mb-3">Connects with</p>
            <h2 className="text-4xl lg:text-5xl text-white mb-4">Import from anywhere</h2>
            <p className="text-[#9EA3B0] max-w-xl mx-auto leading-relaxed text-sm">
              Connect your existing cloud storage in seconds. Files stay where they are —
              MeikaDocs adds a security and organisation layer on top.
            </p>
          </motion.div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 mb-10">
            {[
              { abbr:'GD', name:'Google Drive',  color:'#4285F4', bg:'bg-blue-500/10 border-blue-500/20',    connected:true  },
              { abbr:'OD', name:'OneDrive',       color:'#0078D4', bg:'bg-sky-500/10 border-sky-500/20',      connected:true  },
              { abbr:'DB', name:'Dropbox',        color:'#0061FF', bg:'bg-indigo-500/10 border-indigo-500/20',connected:true  },
              { abbr:'BX', name:'Box',            color:'#0061D5', bg:'bg-blue-600/10 border-blue-600/20',    connected:false },
              { abbr:'IC', name:'iCloud Drive',   color:'#147EFB', bg:'bg-cyan-500/10 border-cyan-500/20',    connected:false },
              { abbr:'LC', name:'Local Storage',  color:'#8B5CF6', bg:'bg-violet-500/10 border-violet-500/20',connected:true  },
            ].map((src, i) => (
              <motion.div key={src.abbr}
                className={`flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border ${src.bg} transition-all cursor-pointer group`}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                whileHover={{ y: -4 }}>
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center text-sm font-bold ${src.bg} group-hover:scale-110 transition-transform`} style={{ color: src.color }}>{src.abbr}</div>
                <span className="text-xs text-[#9EA3B0] group-hover:text-white transition-colors text-center leading-tight">{src.name}</span>
                <span className={`text-[9px] flex items-center gap-1 ${src.connected ? 'text-green-400' : 'text-[#9EA3B0]'}`}>
                  {src.connected ? <><CheckCircle2 className="w-3 h-3" />Connected</> : <>Available</>}
                </span>
              </motion.div>
            ))}
          </div>

          {/* How the security flow works */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-16">
            <div className="hidden md:block absolute" />
            {[
              { step:'01', icon:Lock,         color:'text-indigo-400', bg:'bg-indigo-500/10 border-indigo-500/20', title:'File secured',   body:'Owner adds a security layer to the file inside their MeikaDocs vault.' },
              { step:'02', icon:AlertTriangle,color:'text-orange-400', bg:'bg-orange-500/10 border-orange-500/20', title:'Access attempt', body:'Someone tries to open the file — from any device or location.' },
              { step:'03', icon:Shield,       color:'text-violet-400', bg:'bg-violet-500/10 border-violet-500/20', title:'Alert triggered', body:'The owner receives an instant "Was this you?" notification.' },
              { step:'04', icon:CheckCircle2, color:'text-green-400',  bg:'bg-green-500/10 border-green-500/20',  title:'Owner confirms', body:'"Yes" → file opens. "Block" → access denied and logged forever.' },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={s.step} className="relative text-center"
                  initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
                  <div className={`w-14 h-14 rounded-2xl border flex items-center justify-center mx-auto mb-4 ${s.bg}`}>
                    <Icon className={`w-7 h-7 ${s.color}`} />
                  </div>
                  <div className={`text-[10px] font-mono mb-1 ${s.color}`}>{s.step}</div>
                  <h4 className="text-white text-sm mb-2 font-medium">{s.title}</h4>
                  <p className="text-[#9EA3B0] text-xs leading-relaxed">{s.body}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Interactive Demo (#demo) ──────────────────────────────────────── */}
      <section id="demo" className="py-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <motion.div className="text-center mb-12" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-indigo-400 text-sm uppercase tracking-widest mb-3">Live demo</p>
            <h2 className="text-4xl lg:text-5xl text-white mb-4">Try MeikaDocs right now</h2>
            <p className="text-[#9EA3B0] max-w-2xl mx-auto leading-relaxed">
              Every demo below is fully interactive. The File Vault shows the full Azure-style portal.
              Security Alerts shows the identity verification flow end-to-end.
            </p>
          </motion.div>

          {/* Demo tab switcher — mirrors MeikaAuthenticatorPage demo section */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {DEMO_SCREENS.map(({ id, label, icon: Icon }) => (
              <motion.button
                key={id}
                onClick={() => setActiveDemo(id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                  activeDemo === id
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-indigo-500/50 shadow-lg shadow-indigo-500/25'
                    : 'bg-white/5 text-[#9EA3B0] border-white/10 hover:text-white hover:bg-white/10'
                }`}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
              >
                <Icon className="w-4 h-4" />
                {label}
              </motion.button>
            ))}
          </div>

          {/* Demo frame */}
          <motion.div
            className="relative rounded-2xl overflow-hidden"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-indigo-500/20 rounded-3xl blur-xl" />
            <div className="relative" style={{ height: 560 }}>
              {renderDemo()}
            </div>
          </motion.div>

          <div className="flex justify-center mt-5">
            <div className="inline-flex items-center gap-2 text-xs text-[#9EA3B0]">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Interactive demo — all screens are fully functional
            </div>
          </div>
        </div>
      </section>

      {/* ── Security & Compliance (#security) ────────────────────────────── */}
      <section id="security" className="py-20 px-4 bg-white/[0.02]">
        <div className="container mx-auto max-w-7xl">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-indigo-400 text-sm uppercase tracking-widest mb-3">Trust & compliance</p>
            <h2 className="text-4xl lg:text-5xl text-white mb-4">Built to enterprise standards</h2>
            <p className="text-[#9EA3B0] max-w-2xl mx-auto leading-relaxed">
              MeikaDocs is designed for organisations that cannot afford to compromise on security.
            </p>
          </motion.div>

          {/* Compliance grid — identical layout to Authenticator compliance section */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-16">
            {COMPLIANCE.map((c, i) => (
              <motion.div key={c.name}
                className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center hover:border-indigo-500/30 hover:bg-white/10 transition-all"
                initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mx-auto mb-3">
                  <ShieldCheck className="w-5 h-5 text-indigo-400" />
                </div>
                <p className="text-white text-sm font-semibold mb-1">{c.name}</p>
                <p className="text-xs text-green-400">{c.status}</p>
              </motion.div>
            ))}
          </div>

          {/* Security features list */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Lock,      title: 'Zero-Knowledge Architecture', desc: 'Files are encrypted before leaving your device. Even Meika cannot read your documents.' },
              { icon: Activity,  title: 'Immutable Audit Trail',       desc: 'Every access event is logged with tamper-proof timestamps for compliance and forensics.' },
              { icon: Users,     title: 'Role-Based Access Control',   desc: 'Granular permissions per file, folder, and team. Principle of least privilege by default.' },
              { icon: Globe,     title: 'Cross-Platform Access',       desc: 'Access your vault from any browser on any device — no app installation required.' },
              { icon: Clock,     title: 'Time-Limited Shares',         desc: 'Set expiry dates on any share. Access is automatically revoked — no manual cleanup needed.' },
              { icon: Zap,       title: 'Instant Revocation',          desc: 'Revoke access to any file or share link in one click, effective immediately worldwide.' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div key={item.title}
                  className="flex gap-4 p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all"
                  initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-indigo-400" />
                  </div>
                  <div>
                    <h4 className="text-white text-sm font-medium mb-1">{item.title}</h4>
                    <p className="text-[#9EA3B0] text-xs leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="relative p-14 rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-950/50 via-[#06070F] to-violet-950/30 overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-36 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative">
                <motion.div
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-violet-500/20 border border-indigo-500/30 flex items-center justify-center mx-auto mb-6"
                  animate={{ boxShadow: ['0 0 20px rgba(99,102,241,0.2)', '0 0 40px rgba(139,92,246,0.4)', '0 0 20px rgba(99,102,241,0.2)'] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <FolderOpen className="w-10 h-10 text-indigo-400" />
                </motion.div>
                <h2 className="text-4xl lg:text-5xl text-white mb-5">Start your secure vault today</h2>
                <p className="text-[#9EA3B0] max-w-lg mx-auto mb-10 leading-relaxed">
                  MeikaDocs is free for individuals. Connect your first cloud storage, import your files,
                  and add your first security layer in under two minutes.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <motion.button
                    className="px-9 py-4 bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 rounded-xl font-medium text-white transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2"
                    whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                    Create Free Vault <ChevronRight className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={handleBackToMain}
                    className="px-9 py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-[#9EA3B0] hover:text-white transition-all"
                    whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    Back to Meika
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <MeikaDocsFooter onBackToMain={handleBackToMain} onContactClick={handleContactClick} />
    </div>
  );
}
