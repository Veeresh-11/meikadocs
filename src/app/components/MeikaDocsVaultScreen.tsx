import { useState, memo, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  FolderOpen, Search, Upload, List, Grid, Lock, Star, Share2,
  Download, MoreHorizontal, FileText, Image, Film, Archive,
  FileCode, Shield, Activity, Users, CloudUpload, Settings,
  LogOut, ChevronRight, HardDrive, Menu, Home, CheckCircle2
} from 'lucide-react';

type NavView = 'dashboard' | 'vault' | 'shared' | 'security' | 'connections' | 'logs';

interface FileItem {
  id: string; name: string; type: 'pdf'|'doc'|'img'|'vid'|'zip'|'code';
  size: string; modified: string; source: string; secured: boolean; starred: boolean;
}

const FILES: FileItem[] = [
  { id:'f1', name:'Q2 Financial Report.pdf',  type:'pdf',  size:'2.4 MB', modified:'2h ago', source:'GD', secured:true,  starred:true  },
  { id:'f2', name:'Product Roadmap 2026.docx', type:'doc',  size:'840 KB', modified:'5h ago', source:'OD', secured:true,  starred:false },
  { id:'f3', name:'Brand Assets.zip',          type:'zip',  size:'18 MB',  modified:'1d ago', source:'DB', secured:false, starred:false },
  { id:'f4', name:'Team Photo Offsite.jpg',    type:'img',  size:'5.2 MB', modified:'2d ago', source:'LC', secured:false, starred:true  },
  { id:'f5', name:'Contract — Acme Corp.pdf',  type:'pdf',  size:'340 KB', modified:'3d ago', source:'BX', secured:true,  starred:true  },
  { id:'f6', name:'API Documentation.md',      type:'code', size:'120 KB', modified:'5d ago', source:'LC', secured:false, starred:false },
];

const FILE_META: Record<string, {icon: React.ElementType; color: string; bg: string}> = {
  pdf:  {icon:FileText, color:'text-red-400',    bg:'bg-red-500/10'   },
  doc:  {icon:FileText, color:'text-blue-400',   bg:'bg-blue-500/10'  },
  img:  {icon:Image,    color:'text-green-400',  bg:'bg-green-500/10' },
  vid:  {icon:Film,     color:'text-purple-400', bg:'bg-purple-500/10'},
  zip:  {icon:Archive,  color:'text-yellow-400', bg:'bg-yellow-500/10'},
  code: {icon:FileCode, color:'text-cyan-400',   bg:'bg-cyan-500/10'  },
};

const SOURCE_COLORS: Record<string,{color:string;bg:string}> = {
  GD:{color:'#4285F4',bg:'bg-blue-500/10 border-blue-500/20'},
  OD:{color:'#0078D4',bg:'bg-sky-500/10 border-sky-500/20'},
  DB:{color:'#0061FF',bg:'bg-indigo-500/10 border-indigo-500/20'},
  BX:{color:'#0061D5',bg:'bg-blue-600/10 border-blue-600/20'},
  LC:{color:'#8B5CF6',bg:'bg-violet-500/10 border-violet-500/20'},
};

const NAV_ITEMS:{id:NavView;icon:React.ElementType;label:string}[] = [
  {id:'dashboard',  icon:Home,        label:'Dashboard'     },
  {id:'vault',      icon:FolderOpen,  label:'My Vault'      },
  {id:'shared',     icon:Users,       label:'Shared with Me'},
  {id:'security',   icon:Shield,      label:'Security'      },
  {id:'connections',icon:CloudUpload, label:'Connections'   },
  {id:'logs',       icon:Activity,    label:'Access Logs'   },
];

const VIEW_TITLES: Record<NavView,string> = {
  dashboard:'Dashboard', vault:'My Vault', shared:'Shared with Me',
  security:'Security Center', connections:'Cloud Connections', logs:'Access Logs',
};

export const MeikaDocsVaultScreen = memo(function MeikaDocsVaultScreen() {
  const [activeView, setActiveView] = useState<NavView>('vault');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [viewMode, setViewMode] = useState<'list'|'grid'>('list');
  const [search, setSearch] = useState('');

  const files = useMemo(() =>
    FILES.filter(f => f.name.toLowerCase().includes(search.toLowerCase())),
    [search],
  );

  return (
    <div className="w-full h-full bg-[#06070F] rounded-xl overflow-hidden border border-white/10 flex flex-col">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2 bg-[#0A0B12] border-b border-white/8 flex-shrink-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500/70"/><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70"/><div className="w-2.5 h-2.5 rounded-full bg-green-500/70"/>
        </div>
        <div className="flex-1 flex justify-center">
          <div className="flex items-center gap-2 px-3 py-0.5 bg-white/5 border border-white/8 rounded-full text-[10px] text-[#9EA3B0]">
            <Lock className="w-2.5 h-2.5 text-indigo-400"/>docs.meika.io/vault
          </div>
        </div>
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-[9px] text-white font-bold">V</div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <AnimatePresence initial={false}>
          {sidebarOpen && (
            <motion.div key="sb" initial={{width:0,opacity:0}} animate={{width:156,opacity:1}} exit={{width:0,opacity:0}} transition={{duration:0.2}}
              className="bg-[#0A0B12] border-r border-white/8 flex flex-col py-2 overflow-hidden flex-shrink-0">
              <div className="px-3 pb-2 mb-1 border-b border-white/5">
                <div className="flex items-center gap-1.5">
                  <button onClick={()=>setSidebarOpen(false)} className="p-0.5 hover:bg-white/10 rounded text-[#9EA3B0]"><Menu className="w-3 h-3"/></button>
                  <div className="w-4 h-4 rounded bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center"><FolderOpen className="w-2.5 h-2.5 text-white"/></div>
                  <span className="text-white text-[10px] font-semibold">Meika<span className="text-indigo-400">Docs</span></span>
                </div>
              </div>
              <nav className="flex-1 px-1.5 space-y-0.5">
                {NAV_ITEMS.map(({id,icon:Icon,label})=>{
                  const active=activeView===id;
                  return (
                    <button key={id} onClick={()=>setActiveView(id)}
                      className={`w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-left text-[10px] transition-all ${active?'bg-indigo-500/15 text-indigo-300 border border-indigo-500/20':'text-[#9EA3B0] hover:text-white hover:bg-white/5 border border-transparent'}`}>
                      <Icon className={`w-3 h-3 flex-shrink-0 ${active?'text-indigo-400':''}`}/>{label}
                      {active&&<motion.div layoutId="sd" className="ml-auto w-1.5 h-1.5 rounded-full bg-indigo-400"/>}
                    </button>
                  );
                })}
              </nav>
              <div className="px-1.5 pt-1.5 border-t border-white/5 space-y-0.5">
                {[{Icon:Settings,label:'Settings'},{Icon:LogOut,label:'Sign out'}].map(({Icon,label})=>(
                  <button key={label} className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[10px] text-[#9EA3B0] hover:text-white hover:bg-white/5 transition-all"><Icon className="w-3 h-3"/>{label}</button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-2 px-3 py-1.5 border-b border-white/5 bg-[#0A0B12]/60 flex-shrink-0">
            {!sidebarOpen&&<button onClick={()=>setSidebarOpen(true)} className="p-1 hover:bg-white/10 rounded text-[#9EA3B0]"><Menu className="w-3 h-3"/></button>}
            <div className="text-[10px] text-[#9EA3B0] flex items-center gap-1">
              <span>Vault</span><ChevronRight className="w-3 h-3"/><span className="text-white">{VIEW_TITLES[activeView]}</span>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="flex items-center gap-1.5 bg-white/5 border border-white/8 rounded-lg px-2 py-1">
                <Search className="w-3 h-3 text-[#9EA3B0]"/>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search…" className="bg-transparent text-[10px] text-white placeholder-[#9EA3B0] outline-none w-20"/>
              </div>
              <button className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg text-[10px] text-white">
                <Upload className="w-2.5 h-2.5"/>Import
              </button>
              <div className="flex border border-white/10 rounded-lg overflow-hidden">
                {(['list','grid'] as const).map(m=>(
                  <button key={m} onClick={()=>setViewMode(m)} className={`p-1.5 transition-colors ${viewMode===m?'bg-indigo-500/20 text-indigo-400':'text-[#9EA3B0] hover:bg-white/5'}`}>
                    {m==='list'?<List className="w-3 h-3"/>:<Grid className="w-3 h-3"/>}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-auto p-3" style={{scrollbarWidth:'thin',scrollbarColor:'rgba(255,255,255,0.06) transparent'}}>
            <AnimatePresence mode="wait">
              <motion.div key={activeView} initial={{opacity:0,x:8}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-8}} transition={{duration:0.15}}>

                {activeView==='dashboard' && (
                  <div>
                    {/* Welcome */}
                    <div className="mb-3 p-3 bg-gradient-to-r from-indigo-600/10 to-violet-600/5 border border-indigo-500/20 rounded-xl flex items-center justify-between">
                      <div><p className="text-white text-xs font-medium mb-0.5">Welcome to MeikaDocs</p><p className="text-[#9EA3B0] text-[10px]">Your secure unified document vault.</p></div>
                      <button className="flex items-center gap-1 px-2.5 py-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-lg text-[10px] text-white"><Upload className="w-2.5 h-2.5"/>Import files</button>
                    </div>
                    {/* Tiles */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[
                        {icon:FolderOpen, color:'text-indigo-400', bg:'from-indigo-600/20 border-indigo-500/20', title:'My Vault',        stat:'321 files'},
                        {icon:Share2,     color:'text-blue-400',   bg:'from-blue-600/20 border-blue-500/20',     title:'Share Center',    stat:'4 shared' },
                        {icon:Shield,     color:'text-orange-400', bg:'from-orange-600/20 border-orange-500/20', title:'Security Center', stat:'3 secured'},
                        {icon:CloudUpload,color:'text-violet-400', bg:'from-violet-600/20 border-violet-500/20', title:'Connections',     stat:'4 connected'},
                        {icon:Users,      color:'text-green-400',  bg:'from-green-600/20 border-green-500/20',   title:'Shared with Me',  stat:'12 files' },
                        {icon:Activity,   color:'text-cyan-400',   bg:'from-cyan-600/20 border-cyan-500/20',     title:'Access Logs',     stat:'24 events'},
                      ].map((t,i)=>{const Icon=t.icon; return (
                        <motion.button key={t.title} onClick={()=>setActiveView(t.title==='My Vault'?'vault':t.title==='Share Center'?'shared':t.title==='Security Center'?'security':t.title==='Connections'?'connections':t.title==='Shared with Me'?'shared':'logs')}
                          className={`text-left p-2.5 rounded-xl border bg-gradient-to-br ${t.bg} hover:brightness-125 transition-all group`}
                          initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} transition={{delay:i*0.06}} whileHover={{y:-2}}>
                          <Icon className={`w-4 h-4 ${t.color} mb-1.5`}/>
                          <p className="text-white text-[10px] font-medium">{t.title}</p>
                          <p className={`text-[9px] ${t.color}`}>{t.stat}</p>
                        </motion.button>
                      );})}
                    </div>
                    {/* Recent */}
                    <div className="bg-white/[0.03] border border-white/8 rounded-xl p-2.5">
                      <p className="text-white text-[10px] font-medium mb-2">Recent files</p>
                      {FILES.slice(0,4).map(f=>{const fi=FILE_META[f.type]; const FI=fi.icon; const sc=SOURCE_COLORS[f.source]; return (
                        <div key={f.id} className="flex items-center gap-2 p-1.5 hover:bg-white/[0.04] rounded-lg cursor-pointer">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${fi.bg}`}><FI className={`w-3 h-3 ${fi.color}`}/></div>
                          <span className="text-white text-[10px] truncate flex-1">{f.name}</span>
                          {f.secured&&<Lock className="w-2.5 h-2.5 text-indigo-400"/>}
                          <span className={`text-[9px] px-1 py-0.5 rounded border ${sc.bg}`} style={{color:sc.color}}>{f.source}</span>
                        </div>
                      );})}
                    </div>
                  </div>
                )}

                {activeView==='vault' && (
                  <div>
                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[{l:'Files',v:'321',I:FileText,c:'text-indigo-400'},{l:'Secured',v:'3',I:Lock,c:'text-orange-400'},{l:'Shared',v:'4',I:Share2,c:'text-blue-400'},{l:'Storage',v:'6.2GB',I:HardDrive,c:'text-violet-400'}].map(s=>(
                        <div key={s.l} className="p-2 bg-white/[0.03] border border-white/8 rounded-lg flex items-center gap-1.5"><s.I className={`w-3 h-3 ${s.c}`}/><div><p className="text-white text-[10px] font-medium">{s.v}</p><p className="text-[#9EA3B0] text-[9px]">{s.l}</p></div></div>
                      ))}
                    </div>

                    {viewMode==='list' ? (
                      <div className="bg-white/[0.02] border border-white/8 rounded-xl overflow-hidden">
                        <table className="w-full">
                          <thead><tr className="border-b border-white/8 bg-white/[0.03]">{['Name','Src','Size','Modified',''].map(h=><th key={h} className="text-left text-[9px] text-[#9EA3B0] uppercase tracking-wider px-3 py-2 font-medium">{h}</th>)}</tr></thead>
                          <tbody>{files.map(f=>{
                            const fi=FILE_META[f.type]; const FI=fi.icon; const sc=SOURCE_COLORS[f.source];
                            return (
                              <tr key={f.id} className="group border-b border-white/[0.04] hover:bg-white/[0.04] transition-colors cursor-pointer">
                                <td className="px-3 py-2"><div className="flex items-center gap-2">
                                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${fi.bg}`}><FI className={`w-3 h-3 ${fi.color}`}/></div>
                                  <span className="text-white text-[10px] truncate max-w-[120px]">{f.name}</span>
                                  {f.secured&&<Lock className="w-2.5 h-2.5 text-indigo-400"/>}
                                  {f.starred&&<Star className="w-2.5 h-2.5 text-yellow-400"/>}
                                </div></td>
                                <td className="px-3 py-2"><span className={`text-[8px] px-1 py-0.5 rounded border ${sc.bg}`} style={{color:sc.color}}>{f.source}</span></td>
                                <td className="px-3 py-2 text-[#9EA3B0] text-[10px]">{f.size}</td>
                                <td className="px-3 py-2 text-[#9EA3B0] text-[10px]">{f.modified}</td>
                                <td className="px-3 py-2"><div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button className="p-1 hover:bg-white/10 rounded"><Share2 className="w-3 h-3 text-[#9EA3B0]"/></button>
                                  <button className="p-1 hover:bg-white/10 rounded"><Download className="w-3 h-3 text-[#9EA3B0]"/></button>
                                  <button className="p-1 hover:bg-white/10 rounded"><MoreHorizontal className="w-3 h-3 text-[#9EA3B0]"/></button>
                                </div></td>
                              </tr>
                            );
                          })}</tbody>
                        </table>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {files.map(f=>{const fi=FILE_META[f.type]; const FI=fi.icon; return (
                          <motion.div key={f.id} className="p-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/8 rounded-xl cursor-pointer relative" whileHover={{y:-2}}>
                            {f.secured&&<div className="absolute top-2 right-2"><Lock className="w-2.5 h-2.5 text-indigo-400"/></div>}
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-2 ${fi.bg}`}><FI className={`w-4 h-4 ${fi.color}`}/></div>
                            <p className="text-white text-[10px] truncate">{f.name}</p>
                            <p className="text-[#9EA3B0] text-[9px]">{f.size}</p>
                          </motion.div>
                        );})}
                      </div>
                    )}
                  </div>
                )}

                {activeView==='security' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-3 gap-2">
                      {[{I:Shield,c:'text-green-400',bg:'bg-green-500/10 border-green-500/20',l:'Protected',v:'3'},{I:Activity,c:'text-red-400',bg:'bg-red-500/10 border-red-500/20',l:'Blocked',v:'2'},{I:CheckCircle2,c:'text-blue-400',bg:'bg-blue-500/10 border-blue-500/20',l:'Verified Opens',v:'14'}].map(s=>(
                        <div key={s.l} className={`p-3 rounded-xl border ${s.bg}`}><s.I className={`w-4 h-4 ${s.c} mb-1.5`}/><p className="text-xl text-white">{s.v}</p><p className="text-[10px] text-[#9EA3B0]">{s.l}</p></div>
                      ))}
                    </div>
                    <div className="bg-white/[0.03] border border-white/8 rounded-xl p-3">
                      <p className="text-white text-[10px] font-medium mb-2">File Security Toggles</p>
                      {FILES.map(f=>{const fi=FILE_META[f.type]; const FI=fi.icon; return (
                        <div key={f.id} className="flex items-center gap-2 p-1.5 border border-white/5 rounded-lg mb-1.5">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 ${fi.bg}`}><FI className={`w-3 h-3 ${fi.color}`}/></div>
                          <span className="text-white text-[10px] truncate flex-1">{f.name}</span>
                          <div className={`relative inline-flex h-4 w-7 items-center rounded-full transition-colors ${f.secured?'bg-indigo-500':'bg-white/15'} cursor-pointer`}>
                            <span className={`inline-block h-3 w-3 transform rounded-full bg-white shadow transition-transform ${f.secured?'translate-x-3.5':'translate-x-0.5'}`}/>
                          </div>
                          <span className={`text-[9px] w-12 text-right ${f.secured?'text-indigo-400':'text-[#9EA3B0]'}`}>{f.secured?'Secured':'Off'}</span>
                        </div>
                      );})}
                    </div>
                  </div>
                )}

                {(activeView==='shared'||activeView==='connections'||activeView==='logs') && (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    {activeView==='shared'&&<><Users className="w-8 h-8 text-indigo-400 mb-3"/><p className="text-white text-sm mb-1">Shared with Me</p><p className="text-[#9EA3B0] text-xs">Files shared into your vault by colleagues</p></>}
                    {activeView==='connections'&&<><CloudUpload className="w-8 h-8 text-violet-400 mb-3"/><p className="text-white text-sm mb-1">Cloud Connections</p><p className="text-[#9EA3B0] text-xs">Google Drive, OneDrive, Dropbox, Box, iCloud</p></>}
                    {activeView==='logs'&&<><Activity className="w-8 h-8 text-cyan-400 mb-3"/><p className="text-white text-sm mb-1">Access Logs</p><p className="text-[#9EA3B0] text-xs">Immutable audit trail of every event</p></>}
                  </div>
                )}

              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
});
