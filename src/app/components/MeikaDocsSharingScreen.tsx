import { useState, memo, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Share2, Link2, Check, X, Eye, Clock, Lock, FileText, Users, Download, ExternalLink } from 'lucide-react';

const SHARED_FILES = [
  { id:'s1', name:'Q2 Financial Report.pdf', recipients:['alice@corp.com','bob@corp.com'], views:7,  expires:'6d', secured:true,  source:'GD', color:'#4285F4' },
  { id:'s2', name:'Contract — Acme Corp.pdf',recipients:['legal@acme.com'],                views:3,  expires:'13d',secured:true,  source:'BX', color:'#0061D5' },
  { id:'s3', name:'Brand Assets.zip',        recipients:['design@team.io'],                views:12, expires:'2d', secured:false, source:'DB', color:'#0061FF' },
  { id:'s4', name:'API Documentation.md',    recipients:['dev@corp.com','ops@corp.com'],   views:18, expires:'27d',secured:false, source:'LC', color:'#8B5CF6' },
];

const TARGETS = [
  {id:'gd',abbr:'GD',name:'Google Drive', color:'#4285F4',bg:'bg-blue-500/10 border-blue-500/20'},
  {id:'od',abbr:'OD',name:'OneDrive',      color:'#0078D4',bg:'bg-sky-500/10 border-sky-500/20'},
  {id:'db',abbr:'DB',name:'Dropbox',       color:'#0061FF',bg:'bg-indigo-500/10 border-indigo-500/20'},
  {id:'bx',abbr:'BX',name:'Box',           color:'#0061D5',bg:'bg-blue-600/10 border-blue-600/20'},
];

export const MeikaDocsSharingScreen = memo(function MeikaDocsSharingScreen() {
  const [selectedFile, setSelectedFile] = useState<string|null>(null);
  const [copied, setCopied] = useState(false);
  const [dest, setDest] = useState<string|null>(null);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState('');
  const copyTimer = useRef<ReturnType<typeof setTimeout>|null>(null);

  useEffect(() => () => { if (copyTimer.current) clearTimeout(copyTimer.current); }, []);

  const handleCopy = () => {
    setCopied(true);
    copyTimer.current = setTimeout(() => setCopied(false), 2000);
  };

  const file = SHARED_FILES.find(f => f.id === selectedFile);

  return (
    <div className="w-full h-full bg-[#06070F] rounded-xl overflow-hidden border border-white/10 flex flex-col">
      <div className="px-4 py-3 border-b border-white/8 bg-[#0A0B12] flex items-center gap-3">
        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
          <Share2 className="w-4 h-4 text-white"/>
        </div>
        <div><p className="text-white text-xs font-medium">Share Center</p><p className="text-[#9EA3B0] text-[10px]">OrangeDox-style tracked sharing</p></div>
        <div className="ml-auto flex items-center gap-3 text-[10px] text-[#9EA3B0]">
          <span className="text-blue-400">{SHARED_FILES.length} shared</span>
          <span>{SHARED_FILES.reduce((a,f)=>a+f.views,0)} total views</span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* File list */}
        <div className="w-1/2 border-r border-white/8 flex flex-col overflow-hidden">
          <div className="px-3 py-2 border-b border-white/5">
            <p className="text-[10px] text-[#9EA3B0] uppercase tracking-wider">Shared files</p>
          </div>
          <div className="flex-1 overflow-auto" style={{scrollbarWidth:'thin',scrollbarColor:'rgba(255,255,255,0.06) transparent'}}>
            {SHARED_FILES.map((f,i)=>(
              <motion.button key={f.id} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.07}}
                onClick={()=>{ setSelectedFile(f.id); setDest(null); setSent(false); setEmail(''); }}
                className={`w-full text-left p-3 border-b border-white/[0.04] transition-all hover:bg-white/[0.04] ${selectedFile===f.id?'bg-indigo-500/5 border-l-2 border-l-indigo-500':''}`}>
                <div className="flex items-start gap-2 mb-2">
                  <div className="w-6 h-6 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0"><FileText className="w-3 h-3 text-red-400"/></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-[10px] truncate">{f.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      {f.secured&&<Lock className="w-2 h-2 text-indigo-400"/>}
                      <span className={`text-[8px] px-1 py-0.5 rounded border`} style={{color:f.color,borderColor:`${f.color}30`,backgroundColor:`${f.color}15`}}>{f.source}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[9px] text-[#9EA3B0]">
                  <span className="flex items-center gap-0.5"><Eye className="w-2.5 h-2.5"/>{f.views} views</span>
                  <span className="flex items-center gap-0.5"><Clock className="w-2.5 h-2.5"/>Exp {f.expires}</span>
                  <span className="flex items-center gap-0.5"><Users className="w-2.5 h-2.5"/>{f.recipients.length}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Share panel */}
        <div className="w-1/2 flex flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {!selectedFile ? (
              <motion.div key="empty" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex-1 flex flex-col items-center justify-center p-4 text-center">
                <Share2 className="w-8 h-8 text-[#9EA3B0] mb-3 opacity-40"/>
                <p className="text-[#9EA3B0] text-xs">Select a file to manage sharing</p>
              </motion.div>
            ) : file ? (
              <motion.div key={file.id} initial={{opacity:0,x:12}} animate={{opacity:1,x:0}} exit={{opacity:0}} className="flex-1 overflow-auto p-3" style={{scrollbarWidth:'thin',scrollbarColor:'rgba(255,255,255,0.06) transparent'}}>
                {/* File info */}
                <div className="flex items-center gap-2 p-2.5 bg-white/5 border border-white/8 rounded-xl mb-3">
                  <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0"><FileText className="w-3.5 h-3.5 text-red-400"/></div>
                  <div className="flex-1 min-w-0"><p className="text-white text-[10px] truncate">{file.name}</p><p className="text-[#9EA3B0] text-[9px]">{file.views} views · Exp in {file.expires}</p></div>
                  {file.secured&&<Lock className="w-3 h-3 text-indigo-400"/>}
                </div>

                {/* Recipients */}
                <p className="text-[9px] text-[#9EA3B0] uppercase tracking-wider mb-1.5">Recipients</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {file.recipients.map(r=>(
                    <span key={r} className="text-[9px] px-2 py-0.5 bg-white/5 border border-white/10 rounded-full text-[#9EA3B0] flex items-center gap-1">
                      {r}<button className="hover:text-red-400 transition-colors"><X className="w-2 h-2"/></button>
                    </span>
                  ))}
                </div>

                {/* Add email */}
                <div className="flex gap-1.5 mb-3">
                  <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Add recipient…"
                    className="flex-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5 text-[10px] text-white placeholder-[#9EA3B0] outline-none focus:border-indigo-500/40 transition-colors"/>
                  <button onClick={()=>{if(email){setSent(true);setEmail('');}}} className={`px-2.5 py-1.5 rounded-lg text-[10px] border transition-all ${sent?'bg-green-500/10 border-green-500/30 text-green-400':'bg-indigo-500/10 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20'}`}>
                    {sent?<Check className="w-3 h-3"/>:'Add'}
                  </button>
                </div>

                {/* Secure link */}
                <p className="text-[9px] text-[#9EA3B0] uppercase tracking-wider mb-1.5">Secure link</p>
                <div className="flex gap-1.5 mb-3">
                  <div className="flex-1 flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2 py-1.5">
                    <Link2 className="w-2.5 h-2.5 text-[#9EA3B0] flex-shrink-0"/>
                    <span className="text-[#9EA3B0] text-[9px] truncate">docs.meika.io/s/xK9pQr…</span>
                  </div>
                  <button onClick={handleCopy} className={`px-2 py-1.5 rounded-lg text-[9px] border transition-all ${copied?'bg-green-500/10 border-green-500/30 text-green-400':'bg-white/5 border-white/10 text-[#9EA3B0] hover:text-white'}`}>
                    {copied?<Check className="w-3 h-3"/>:'Copy'}
                  </button>
                </div>

                {/* Export to cloud */}
                <p className="text-[9px] text-[#9EA3B0] uppercase tracking-wider mb-1.5">Export to cloud</p>
                <div className="grid grid-cols-2 gap-1.5 mb-3">
                  {TARGETS.map(t=>(
                    <button key={t.id} onClick={()=>setDest(t.id)}
                      className={`flex items-center gap-2 p-2 rounded-xl border transition-all text-xs ${dest===t.id?t.bg:'bg-white/[0.03] border-white/8 hover:bg-white/[0.06]'}`}>
                      <div className={`w-6 h-6 rounded-lg text-[9px] font-bold flex items-center justify-center border ${t.bg}`} style={{color:t.color}}>{t.abbr}</div>
                      <span className="text-[#9EA3B0] text-[9px]">{t.name.split(' ')[0]}</span>
                      {dest===t.id&&<Check className="w-2.5 h-2.5 text-green-400 ml-auto"/>}
                    </button>
                  ))}
                </div>

                {dest&&(
                  <motion.button initial={{opacity:0,y:4}} animate={{opacity:1,y:0}}
                    className="w-full py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-[10px] font-medium transition-all flex items-center justify-center gap-1.5">
                    <ExternalLink className="w-3 h-3"/>Export to {TARGETS.find(t=>t.id===dest)?.name}
                  </motion.button>
                )}
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
});
