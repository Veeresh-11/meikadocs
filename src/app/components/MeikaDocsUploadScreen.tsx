import { useState, memo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Upload, Check, HardDrive, RefreshCw, FolderOpen, FileText, Image, Archive } from 'lucide-react';

const SOURCES = [
  { id:'gd', name:'Google Drive',  abbr:'GD', color:'#4285F4', bg:'bg-blue-500/10 border-blue-500/20',    files:142 },
  { id:'od', name:'OneDrive',       abbr:'OD', color:'#0078D4', bg:'bg-sky-500/10 border-sky-500/20',      files:89  },
  { id:'db', name:'Dropbox',        abbr:'DB', color:'#0061FF', bg:'bg-indigo-500/10 border-indigo-500/20',files:67  },
  { id:'bx', name:'Box',            abbr:'BX', color:'#0061D5', bg:'bg-blue-600/10 border-blue-600/20',    files:0   },
  { id:'ic', name:'iCloud Drive',   abbr:'IC', color:'#147EFB', bg:'bg-cyan-500/10 border-cyan-500/20',    files:0   },
  { id:'lc', name:'Local Storage',  abbr:'LC', color:'#8B5CF6', bg:'bg-violet-500/10 border-violet-500/20',files:23  },
];

const IMPORT_FILES = [
  {name:'Q4_Report.pdf',  icon:FileText, color:'text-red-400',    bg:'bg-red-500/10',   size:'2.1 MB'},
  {name:'Proposal.docx',  icon:FileText, color:'text-blue-400',   bg:'bg-blue-500/10',  size:'480 KB'},
  {name:'Logo_Final.png', icon:Image,    color:'text-green-400',  bg:'bg-green-500/10', size:'1.4 MB'},
  {name:'Assets.zip',     icon:Archive,  color:'text-yellow-400', bg:'bg-yellow-500/10',size:'8.2 MB'},
];

type Stage = 'pick' | 'browse' | 'importing' | 'done';

export const MeikaDocsUploadScreen = memo(function MeikaDocsUploadScreen() {
  const [stage, setStage] = useState<Stage>('pick');
  const [selected, setSelected] = useState<string|null>(null);
  const [progress, setProgress] = useState(0);
  const [importedFiles, setImportedFiles] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    setSelected(id);
    setStage('browse');
  };

  const handleImport = () => {
    setStage('importing');
    let p = 0;
    const interval = setInterval(() => {
      p += 12;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setImportedFiles(IMPORT_FILES.map(f=>f.name));
        setTimeout(() => setStage('done'), 400);
      }
    }, 200);
  };

  const reset = () => { setStage('pick'); setSelected(null); setProgress(0); setImportedFiles([]); };

  const src = SOURCES.find(s => s.id === selected);

  return (
    <div className="w-full h-full bg-[#06070F] rounded-xl overflow-hidden border border-white/10 flex flex-col">
      <div className="px-4 py-3 border-b border-white/8 bg-[#0A0B12] flex items-center gap-3">
        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
          <Upload className="w-4 h-4 text-white"/>
        </div>
        <div><p className="text-white text-xs font-medium">Import Files</p><p className="text-[#9EA3B0] text-[10px]">Connect any cloud source</p></div>
        {stage !== 'pick' && <button onClick={reset} className="ml-auto flex items-center gap-1 text-[10px] text-indigo-400 hover:text-indigo-300"><RefreshCw className="w-3 h-3"/>Reset</button>}
      </div>

      <div className="flex-1 overflow-auto p-4">
        <AnimatePresence mode="wait">

          {stage === 'pick' && (
            <motion.div key="pick" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
              <p className="text-[#9EA3B0] text-xs mb-4 text-center">Select a cloud source to import from</p>
              <div className="grid grid-cols-2 gap-2">
                {SOURCES.map((s,i)=>(
                  <motion.button key={s.id} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}}
                    onClick={()=>handleSelect(s.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border ${s.bg} transition-all text-left`}
                    whileHover={{scale:1.02}} whileTap={{scale:0.98}}>
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-bold border flex-shrink-0 ${s.bg}`} style={{color:s.color}}>{s.abbr}</div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-xs">{s.name}</p>
                      {s.files>0?<p className="text-[10px] text-green-400">{s.files} files</p>:<p className="text-[10px] text-[#9EA3B0]">Connect</p>}
                    </div>
                  </motion.button>
                ))}
              </div>
              <div className="mt-3">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 cursor-pointer transition-all">
                  <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <HardDrive className="w-4 h-4 text-indigo-400"/>
                  </div>
                  <div><p className="text-white text-xs">Browse local files</p><p className="text-[10px] text-[#9EA3B0]">Upload from your device</p></div>
                  <input type="file" multiple className="hidden"/>
                </label>
              </div>
            </motion.div>
          )}

          {stage === 'browse' && src && (
            <motion.div key="browse" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-20}}>
              <div className="flex items-center gap-2 mb-4">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold border ${src.bg}`} style={{color:src.color}}>{src.abbr}</div>
                <div><p className="text-white text-xs">{src.name}</p><p className="text-[#9EA3B0] text-[10px]">{src.files} files available</p></div>
              </div>
              <div className="bg-white/[0.02] border border-white/8 rounded-xl overflow-hidden mb-3">
                <div className="px-3 py-2 border-b border-white/5 bg-white/[0.02]">
                  <p className="text-[10px] text-[#9EA3B0] uppercase tracking-wider">Select files to import</p>
                </div>
                {IMPORT_FILES.map((f,i)=>(
                  <motion.div key={f.name} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:i*0.07}}
                    className="flex items-center gap-3 px-3 py-2.5 border-b border-white/[0.04] hover:bg-white/[0.04] cursor-pointer group">
                    <input type="checkbox" defaultChecked className="w-3 h-3 accent-indigo-500"/>
                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${f.bg}`}><f.icon className={`w-3 h-3 ${f.color}`}/></div>
                    <span className="text-white text-xs flex-1">{f.name}</span>
                    <span className="text-[#9EA3B0] text-[10px]">{f.size}</span>
                  </motion.div>
                ))}
              </div>
              <button onClick={handleImport}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-medium transition-all hover:scale-[1.01] flex items-center justify-center gap-2">
                <FolderOpen className="w-3.5 h-3.5"/>Import {IMPORT_FILES.length} files to MeikaDocs
              </button>
            </motion.div>
          )}

          {stage === 'importing' && (
            <motion.div key="importing" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="flex flex-col items-center justify-center py-8">
              <motion.div className="w-14 h-14 rounded-full border-2 border-indigo-500/30 border-t-indigo-400 flex items-center justify-center mb-4"
                animate={{rotate:360}} transition={{duration:1,repeat:Infinity,ease:'linear'}}>
                <Upload className="w-6 h-6 text-indigo-400"/>
              </motion.div>
              <p className="text-white text-sm mb-1">Importing files…</p>
              <p className="text-[#9EA3B0] text-xs mb-4">Securely transferring from {src?.name}</p>
              <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full"
                  style={{width:`${progress}%`}} transition={{duration:0.1}}/>
              </div>
              <p className="text-[#9EA3B0] text-[10px] mt-2">{progress}%</p>
            </motion.div>
          )}

          {stage === 'done' && (
            <motion.div key="done" initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0}} className="flex flex-col items-center justify-center py-6">
              <motion.div className="w-14 h-14 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center mb-4"
                initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',stiffness:300}}>
                <Check className="w-7 h-7 text-green-400"/>
              </motion.div>
              <p className="text-white text-sm font-medium mb-1">Import Complete</p>
              <p className="text-[#9EA3B0] text-xs mb-4">{importedFiles.length} files added to your vault</p>
              <div className="w-full max-w-xs space-y-1.5 mb-4">
                {importedFiles.map((f,i)=>(
                  <motion.div key={f} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}}
                    className="flex items-center gap-2 p-2 bg-white/[0.03] border border-white/8 rounded-lg">
                    <Check className="w-3 h-3 text-green-400 flex-shrink-0"/>
                    <span className="text-[#9EA3B0] text-[10px] truncate">{f}</span>
                  </motion.div>
                ))}
              </div>
              <button onClick={reset} className="text-[10px] text-indigo-400 hover:text-indigo-300 transition-colors">Import more files</button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
});
