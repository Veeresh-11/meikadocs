import { useState, memo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, ShieldCheck, CheckCircle2, Lock, X, Shield, Eye } from 'lucide-react';

type Step = 'idle' | 'alert' | 'verifying' | 'allowed' | 'blocked';

export const MeikaDocsSecurityScreen = memo(function MeikaDocsSecurityScreen() {
  const [step, setStep] = useState<Step>('idle');
  const [autoPlay, setAutoPlay] = useState(true);
  const t1 = useRef<ReturnType<typeof setTimeout>|null>(null);
  const t2 = useRef<ReturnType<typeof setTimeout>|null>(null);
  const t3 = useRef<ReturnType<typeof setTimeout>|null>(null);

  useEffect(() => {
    if (!autoPlay) return;
    // Auto-demo loop
    t1.current = setTimeout(() => setStep('alert'), 1500);
    return () => { if (t1.current) clearTimeout(t1.current); };
  }, [autoPlay]);

  useEffect(() => () => {
    [t1, t2, t3].forEach(r => { if (r.current) clearTimeout(r.current); });
  }, []);

  const handleAllow = () => {
    setAutoPlay(false);
    setStep('verifying');
    t2.current = setTimeout(() => {
      setStep('allowed');
      t3.current = setTimeout(() => { setStep('idle'); setAutoPlay(true); }, 2500);
    }, 2000);
  };

  const handleDeny = () => {
    setAutoPlay(false);
    setStep('blocked');
    t3.current = setTimeout(() => { setStep('idle'); setAutoPlay(true); }, 2500);
  };

  const resetDemo = () => {
    [t1, t2, t3].forEach(r => { if (r.current) clearTimeout(r.current); });
    setStep('idle');
    setTimeout(() => { setAutoPlay(true); }, 500);
  };

  return (
    <div className="w-full h-full bg-[#06070F] rounded-xl overflow-hidden border border-white/10 flex flex-col">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/8 bg-[#0A0B12] flex items-center gap-3">
        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <div>
          <p className="text-white text-xs font-medium">MeikaDocs Security Layer</p>
          <p className="text-[#9EA3B0] text-[10px]">Identity-verified file access</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-[10px] text-green-400">
          <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />Active
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative">

        {/* Idle state — file list with lock icons */}
        <AnimatePresence mode="wait">
          {step === 'idle' && (
            <motion.div key="idle" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="w-full max-w-sm">
              <p className="text-[#9EA3B0] text-xs text-center mb-5">Files with a security layer require identity verification before opening</p>
              <div className="space-y-2">
                {[
                  {name:'Q2 Financial Report.pdf', secured:true,  badge:'SECURED'},
                  {name:'Product Roadmap 2026.docx',secured:true,  badge:'SECURED'},
                  {name:'Brand Assets.zip',         secured:false, badge:'OPEN'   },
                  {name:'Contract — Acme Corp.pdf', secured:true,  badge:'SECURED'},
                ].map((f,i)=>(
                  <motion.button key={f.name} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}}
                    onClick={()=>{ if(f.secured){ setAutoPlay(false); setStep('alert'); } }}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-all text-left ${f.secured?'bg-indigo-500/5 border-indigo-500/20 hover:bg-indigo-500/10':'bg-white/[0.03] border-white/8 hover:bg-white/[0.06]'}`}>
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${f.secured?'bg-indigo-500/10':'bg-red-500/10'}`}>
                      {f.secured?<Lock className="w-3.5 h-3.5 text-indigo-400"/>:<Eye className="w-3.5 h-3.5 text-red-400"/>}
                    </div>
                    <span className="text-white text-xs flex-1 truncate">{f.name}</span>
                    <span className={`text-[9px] px-2 py-0.5 rounded-full border font-medium ${f.secured?'text-indigo-400 bg-indigo-500/10 border-indigo-500/20':'text-[#9EA3B0] bg-white/5 border-white/10'}`}>
                      {f.badge}
                    </span>
                  </motion.button>
                ))}
              </div>
              <p className="text-[#9EA3B0] text-[10px] text-center mt-4">↑ Click a secured file to trigger the alert</p>
            </motion.div>
          )}

          {/* Alert modal */}
          {step === 'alert' && (
            <motion.div key="alert" initial={{opacity:0,scale:0.9,y:20}} animate={{opacity:1,scale:1,y:0}} exit={{opacity:0,scale:0.9}} transition={{type:'spring',damping:26,stiffness:280}}
              className="w-full max-w-xs bg-[#0F1117] border border-indigo-500/30 rounded-2xl overflow-hidden shadow-2xl">
              <div className="h-[2px] bg-gradient-to-r from-indigo-500/0 via-indigo-400 to-indigo-500/0"/>
              <div className="p-5">
                <div className="flex justify-center mb-4">
                  <motion.div className="w-14 h-14 rounded-full bg-orange-500/10 border-2 border-orange-500/30 flex items-center justify-center"
                    animate={{scale:[1,1.07,1],boxShadow:['0 0 0px rgba(249,115,22,0)','0 0 20px rgba(249,115,22,0.3)','0 0 0px rgba(249,115,22,0)']}}
                    transition={{duration:2,repeat:Infinity}}>
                    <AlertTriangle className="w-7 h-7 text-orange-400"/>
                  </motion.div>
                </div>
                <h3 className="text-white text-center text-sm font-semibold mb-1">Access Attempt Detected</h3>
                <p className="text-[#9EA3B0] text-[10px] text-center mb-4">Someone is trying to open a secured file in your vault.</p>
                <div className="bg-white/5 border border-white/10 rounded-xl p-2.5 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0"><Lock className="w-3.5 h-3.5 text-indigo-400"/></div>
                    <div><p className="text-white text-[10px]">Q2 Financial Report.pdf</p><p className="text-[#9EA3B0] text-[9px]">Secured file · 2.4 MB</p></div>
                  </div>
                </div>
                <div className="space-y-1.5 p-2.5 bg-white/[0.02] rounded-xl border border-white/5 mb-4">
                  {[{l:'Device',v:'Chrome on macOS'},{l:'Location',v:'London, UK'},{l:'Time',v:new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}].map(r=>(
                    <div key={r.l} className="flex justify-between text-[10px]"><span className="text-[#9EA3B0]">{r.l}</span><span className="text-white">{r.v}</span></div>
                  ))}
                </div>
                <p className="text-center text-xs text-white font-medium mb-3">Was this you?</p>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={handleDeny} className="py-2 rounded-xl bg-white/5 hover:bg-red-500/10 border border-white/10 hover:border-red-500/30 text-[#9EA3B0] hover:text-red-400 text-xs transition-all">No, Block</button>
                  <button onClick={handleAllow} className="py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-medium transition-all hover:scale-[1.02]">Yes, it's me</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Verifying */}
          {step === 'verifying' && (
            <motion.div key="ver" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="text-center">
              <div className="flex justify-center mb-4">
                <motion.div className="w-16 h-16 rounded-full border-2 border-indigo-500/30 border-t-indigo-400 flex items-center justify-center"
                  animate={{rotate:360}} transition={{duration:1,repeat:Infinity,ease:'linear'}}>
                  <ShieldCheck className="w-7 h-7 text-indigo-400"/>
                </motion.div>
              </div>
              <p className="text-white text-sm mb-1">Verifying identity…</p>
              <p className="text-[#9EA3B0] text-xs">Checking your MeikaDocs access token</p>
            </motion.div>
          )}

          {/* Allowed */}
          {step === 'allowed' && (
            <motion.div key="ok" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} exit={{opacity:0}} className="text-center">
              <motion.div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mx-auto mb-4"
                initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',stiffness:300}}>
                <CheckCircle2 className="w-8 h-8 text-green-400"/>
              </motion.div>
              <p className="text-white text-sm mb-1 font-medium">Identity Verified</p>
              <p className="text-[#9EA3B0] text-xs mb-4">Opening file securely…</p>
              <button onClick={resetDemo} className="text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors">Try again</button>
            </motion.div>
          )}

          {/* Blocked */}
          {step === 'blocked' && (
            <motion.div key="blocked" initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} exit={{opacity:0}} className="text-center">
              <motion.div className="w-16 h-16 rounded-full bg-red-500/15 border border-red-500/30 flex items-center justify-center mx-auto mb-4"
                initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',stiffness:300}}>
                <X className="w-8 h-8 text-red-400"/>
              </motion.div>
              <p className="text-white text-sm mb-1 font-medium">Access Blocked</p>
              <p className="text-[#9EA3B0] text-xs mb-4">Event logged. Access denied.</p>
              <button onClick={resetDemo} className="text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors">Try again</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});
