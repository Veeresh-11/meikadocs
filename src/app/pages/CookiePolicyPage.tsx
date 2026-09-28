import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Cookie, Shield, ToggleLeft, Globe, Lock,
  ChevronRight, AlertCircle, Info, CheckCircle2,
  BarChart2, Settings2, Key, Eye, RefreshCw, Layers
} from 'lucide-react';
import { Footer } from '../components/Footer';

interface CookiePolicyPageProps {
  setCurrentPage: (page: string) => void;
}

const LAST_UPDATED = 'June 16, 2026';
const NAV_OFFSET = 96; // px — matches sticky top-24 (6rem)

// ─── Nav sections ─────────────────────────────────────────────────────────────
const NAV_SECTIONS = [
  { id: 'what-are-cookies',   label: 'What Are Cookies?',      icon: Cookie    },
  { id: 'why-we-use-them',    label: 'Why We Use Them',        icon: Info      },
  { id: 'essential-cookies',  label: 'Essential Cookies',      icon: Shield    },
  { id: 'functional-cookies', label: 'Functional Cookies',     icon: Settings2 },
  { id: 'analytics-cookies',  label: 'Analytics Cookies',      icon: BarChart2 },
  { id: 'third-party',        label: 'Third-Party Cookies',    icon: Globe     },
  { id: 'your-choices',       label: 'Your Choices',           icon: ToggleLeft},
  { id: 'full-inventory',     label: 'Full Cookie Inventory',  icon: Layers    },
  { id: 'contact',            label: 'Contact Us',             icon: ChevronRight },
];

// ─── Cookie data ──────────────────────────────────────────────────────────────
interface CookieDetail {
  name: string;
  type: string;
  duration: string;
  purpose: string;
  why: string;
  required: boolean;
  icon: React.ElementType;
}

const ESSENTIAL_COOKIES: CookieDetail[] = [
  {
    name: 'hasAcceptedPrivacyNotice',
    type: 'localStorage',
    duration: 'Persistent',
    purpose: 'Records whether you accepted the data-collection notice shown on first visit.',
    why: 'Without this flag the site cannot tell whether you have seen and accepted the privacy notice. Every page load would restart the intro flow, making the site unusable. This is the minimum record needed to respect your decision.',
    required: true,
    icon: CheckCircle2,
  },
  {
    name: 'hasVisitedBefore',
    type: 'localStorage',
    duration: 'Persistent',
    purpose: 'Tracks whether you have previously completed the onboarding intro flow.',
    why: 'The site shows a first-visit intro sequence that explains our data exposure tool. Without this flag the intro would replay on every visit. Storing it means you only see the onboarding experience once.',
    required: true,
    icon: Eye,
  },
  {
    name: 'meika_cookie_consent',
    type: 'localStorage',
    duration: 'Persistent',
    purpose: 'Saves your cookie consent choice (Accept All / Accept Required / Reject All).',
    why: 'This is the record of the choice you make in the cookie consent banner. Without it, the banner would reappear on every page load. Storing your preference is itself required to honour it.',
    required: true,
    icon: Shield,
  },
  {
    name: 'oauth_state',
    type: 'localStorage',
    duration: 'Transient — deleted immediately after authentication',
    purpose: 'A randomly generated CSRF-protection token used during OAuth sign-in.',
    why: 'OAuth 2.0 requires a "state" parameter to prevent cross-site request forgery (CSRF) attacks during login. If this token were not stored and verified, an attacker could trick your browser into completing a login on your behalf. It is deleted the moment authentication completes.',
    required: true,
    icon: Key,
  },
  {
    name: 'oauth_provider',
    type: 'localStorage',
    duration: 'Transient — deleted immediately after authentication',
    purpose: 'Records which sign-in provider you selected (e.g. Google, GitHub, Microsoft).',
    why: 'When you click a social sign-in button, your browser is redirected to that provider and then back to Meika. The callback page needs to know which provider initiated the flow so it can complete the correct token exchange. This entry is deleted once authentication finishes.',
    required: true,
    icon: RefreshCw,
  },
];

const FUNCTIONAL_COOKIES: CookieDetail[] = [
  {
    name: 'ira-welcome-seen',
    type: 'sessionStorage',
    duration: 'Session — cleared when the browser tab is closed',
    purpose: 'Prevents the Ira assistant welcome message from appearing more than once per session.',
    why: 'Ira is our AI assistant. Without this flag, the welcome bubble would pop up every time you navigate between pages within the same session. Storing it in sessionStorage (not localStorage) means it resets when you close the tab — so you see a welcome on your next fresh visit.',
    required: false,
    icon: Cookie,
  },
  {
    name: 'sidebar_state',
    type: 'Cookie (7 days)',
    duration: '7 days',
    purpose: 'Remembers whether you have the sidebar open or collapsed in dashboard views.',
    why: 'Without this preference your sidebar would reset to its default state every time you reload the page. Storing your layout choice means the dashboard looks the way you left it.',
    required: false,
    icon: Layers,
  },
];

const ANALYTICS_COOKIES: CookieDetail[] = [
  {
    name: 'analytics_session',
    type: 'sessionStorage',
    duration: 'Session — cleared when the browser tab is closed',
    purpose: 'An anonymised session identifier used to measure page performance and feature usage.',
    why: 'Understanding which features are used and which pages load slowly helps us prioritise improvements. No personal data is attached to this identifier — it cannot be linked back to you. It is only active if you have consented to analytics cookies.',
    required: false,
    icon: BarChart2,
  },
];

// ─── Precise scroll-to with header offset ─────────────────────────────────────
function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET - 16;
  window.scrollTo({ top, behavior: 'smooth' });
}

// ─── WhyBox ───────────────────────────────────────────────────────────────────
function WhyBox({ text }: { text: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="mt-3">
      <button
        onClick={() => setOpen(v => !v)}
        className="inline-flex items-center gap-1.5 text-[11px] text-cyan-400 hover:text-cyan-300 transition-colors"
      >
        <Info className="w-3 h-3" />
        {open ? 'Hide explanation' : 'Why is this needed?'}
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="why"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="mt-2 p-3 bg-cyan-500/5 border border-cyan-500/15 rounded-lg text-[11px] text-[#9EA3B0] leading-relaxed">
              {text}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── CookieCard ───────────────────────────────────────────────────────────────
function CookieCard({ cookie }: { cookie: CookieDetail }) {
  const Icon = cookie.icon;
  return (
    <div className="p-5 bg-white/[0.03] border border-white/8 rounded-xl">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
            cookie.required ? 'bg-red-500/10 border border-red-500/20' : 'bg-yellow-500/10 border border-yellow-500/20'
          }`}>
            <Icon className={`w-3.5 h-3.5 ${cookie.required ? 'text-red-400' : 'text-yellow-400'}`} />
          </div>
          <code className={`text-xs px-2 py-0.5 rounded ${
            cookie.required ? 'text-red-300 bg-red-500/10' : 'text-yellow-300 bg-yellow-500/10'
          }`}>
            {cookie.name}{cookie.required ? ' *' : ''}
          </code>
        </div>
        {cookie.required ? (
          <span className="text-[10px] text-red-400 bg-red-500/10 border border-red-500/20 rounded-full px-2 py-0.5 flex items-center gap-1 whitespace-nowrap flex-shrink-0">
            <Lock className="w-2.5 h-2.5" /> Required
          </span>
        ) : (
          <span className="text-[10px] text-[#9EA3B0] bg-white/5 border border-white/10 rounded-full px-2 py-0.5 whitespace-nowrap flex-shrink-0">
            Optional
          </span>
        )}
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        <span className="text-[10px] text-[#9EA3B0] bg-white/5 border border-white/8 rounded px-1.5 py-0.5">{cookie.type}</span>
        <span className="text-[10px] text-cyan-500/80 bg-cyan-500/5 border border-cyan-500/10 rounded px-1.5 py-0.5">{cookie.duration}</span>
      </div>
      <p className="text-xs text-[#C0C5D0] leading-relaxed">{cookie.purpose}</p>
      <WhyBox text={cookie.why} />
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      {children}
    </section>
  );
}

// ─── SectionHeading ───────────────────────────────────────────────────────────
function SectionHeading({
  icon: Icon, title, color, badge,
}: {
  icon: React.ElementType; title: string; color: string; badge?: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-5">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 bg-white/5 border border-white/10">
        <Icon className={`w-4 h-4 ${color}`} />
      </div>
      <h2 className="text-2xl tracking-tight">{title}</h2>
      {badge && (
        <span className={`text-[10px] px-2 py-0.5 rounded-full border ml-1 ${
          badge === 'Always On'
            ? 'text-red-400 bg-red-500/10 border-red-500/20'
            : 'text-[#9EA3B0] bg-white/5 border-white/10'
        }`}>
          {badge}
        </span>
      )}
    </div>
  );
}

// ─── Prose ────────────────────────────────────────────────────────────────────
function Prose({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <p className={`text-sm text-[#9EA3B0] leading-relaxed ${className}`}>{children}</p>;
}

// ─── Main page ────────────────────────────────────────────────────────────────
export function CookiePolicyPage({ setCurrentPage }: CookiePolicyPageProps) {
  const [activeSection, setActiveSection] = useState(NAV_SECTIONS[0].id);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // ── Reliable scroll-spy using scroll event ────────────────────────────────
  // Finds the last section whose top edge has passed 30% of the viewport.
  // More reliable than IntersectionObserver for doc-style sidebars because:
  //  - fires on every scroll tick (no threshold ambiguity)
  //  - deterministically picks the topmost visible section
  //  - works regardless of section height
  const updateActiveSection = useCallback(() => {
    const trigger = window.scrollY + window.innerHeight * 0.3;
    let current = NAV_SECTIONS[0].id;

    for (const { id } of NAV_SECTIONS) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= trigger) {
        current = id;
      }
    }

    setActiveSection(prev => (prev !== current ? current : prev));
  }, []);

  useEffect(() => {
    // Run once on mount to set initial state
    updateActiveSection();

    window.addEventListener('scroll', updateActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', updateActiveSection);
  }, [updateActiveSection]);

  // ── Auto-scroll active nav item into the sidebar's visible area ───────────
  useEffect(() => {
    if (!navRef.current) return;
    const activeBtn = navRef.current.querySelector<HTMLElement>('[data-active="true"]');
    if (!activeBtn) return;

    const nav = navRef.current;
    const btnTop = activeBtn.offsetTop;
    const btnBottom = btnTop + activeBtn.offsetHeight;
    const navTop = nav.scrollTop;
    const navBottom = navTop + nav.clientHeight;

    if (btnTop < navTop + 24) {
      nav.scrollTo({ top: btnTop - 24, behavior: 'smooth' });
    } else if (btnBottom > navBottom - 24) {
      nav.scrollTo({ top: btnBottom - nav.clientHeight + 24, behavior: 'smooth' });
    }
  }, [activeSection]);

  const activeLabel = NAV_SECTIONS.find(s => s.id === activeSection)?.label ?? '';

  return (
    <div className="min-h-screen bg-[#0A0B0F] text-white">

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative pt-32 pb-14 border-b border-white/5">
        {/* Grid background — overflow-hidden scoped to hero only, cannot affect sticky below */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-amber-500/4 rounded-full blur-[120px]" />
          <div
            className="absolute inset-0 opacity-[0.025]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="relative container mx-auto px-6 max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-full text-amber-400 text-xs mb-6">
              <Cookie className="w-3.5 h-3.5" />
              Last updated {LAST_UPDATED}
            </div>
            <h1 className="text-5xl md:text-6xl tracking-tight mb-5">Cookie Policy</h1>
            <p className="text-lg text-[#9EA3B0] max-w-2xl leading-relaxed mb-8">
              A transparent explanation of every cookie and storage item Meika uses — what it does,
              why it exists, and how you can control it.
            </p>
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Shield,    label: '5 essential cookies',      color: 'text-red-400 bg-red-500/10 border-red-500/20' },
                { icon: Cookie,    label: '2 functional cookies',      color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20' },
                { icon: BarChart2, label: '1 analytics cookie',        color: 'text-blue-400 bg-blue-500/10 border-blue-500/20' },
                { icon: Globe,     label: 'Zero third-party trackers', color: 'text-green-400 bg-green-500/10 border-green-500/20' },
              ].map(p => {
                const Icon = p.icon;
                return (
                  <div key={p.label} className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs ${p.color}`}>
                    <Icon className="w-3.5 h-3.5" />
                    {p.label}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div className="container mx-auto px-6 max-w-5xl py-12">
        {/*
          Layout: flex row with items-start so the aside shrinks to its own
          content height (not the full content column height). With items-start
          the aside is a short flex child, and sticky on the aside itself makes
          it lock to top-24 as the long content column scrolls past it.
        */}
        <div className="flex gap-8 items-start">

          {/* ── Sticky sidebar — desktop ─────────────────────────────────── */}
          {/*
            sticky + top-24 is on the <aside> directly (not an inner wrapper).
            The parent has items-start so the aside is only as tall as the nav
            list. sticky then correctly pins it at top-24 relative to the
            viewport as the main content scrolls past.
          */}
          <aside className="hidden lg:block w-56 flex-shrink-0 sticky top-24">
            <div
              ref={navRef}
              className="max-h-[calc(100vh-8rem)] overflow-y-auto"
              style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.08) transparent' }}
            >
              {/* Vertical accent line */}
              <div className="absolute left-0 inset-y-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent pointer-events-none" />

              <p className="text-[10px] text-[#9EA3B0] uppercase tracking-widest mb-3 px-3 pt-1 select-none">
                On this page
              </p>

              <nav className="space-y-0.5">
                {NAV_SECTIONS.map(({ id, label, icon: Icon }, idx) => {
                  const active = activeSection === id;
                  const sectionIdx = NAV_SECTIONS.findIndex(s => s.id === activeSection);
                  const isAbove = idx < sectionIdx;

                  return (
                    <button
                      key={id}
                      data-active={active}
                      onClick={() => scrollToSection(id)}
                      className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-left text-xs transition-all duration-150 group relative ${
                        active
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                          : 'text-[#9EA3B0] hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      {/* Progress pip */}
                      <span className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[1px] w-[3px] rounded-full transition-all duration-300 ${
                        active ? 'h-5 bg-amber-400' : isAbove ? 'h-2 bg-white/25' : 'h-1 bg-white/10'
                      }`} />
                      <Icon className={`w-3.5 h-3.5 flex-shrink-0 transition-colors ${
                        active ? 'text-amber-400' : 'text-[#9EA3B0] group-hover:text-white'
                      }`} />
                      <span className="leading-snug flex-1">{label}</span>
                      {active && (
                        <motion.span
                          layoutId="nav-dot"
                          className="w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0"
                        />
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* ── Mobile nav pill ─────────────────────────────────────────── */}
          <div className="lg:hidden fixed bottom-24 left-1/2 -translate-x-1/2 z-40">
            <button
              onClick={() => setMobileNavOpen(v => !v)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#10121A]/95 backdrop-blur-sm border border-white/10 rounded-full text-xs text-white shadow-xl"
            >
              <Cookie className="w-3.5 h-3.5 text-amber-400" />
              {activeLabel}
              <span className="text-[#9EA3B0]">▾</span>
            </button>
            <AnimatePresence>
              {mobileNavOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.18 }}
                  className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-64 bg-[#10121A] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                >
                  {NAV_SECTIONS.map(({ id, label, icon: Icon }) => (
                    <button
                      key={id}
                      onClick={() => { scrollToSection(id); setMobileNavOpen(false); }}
                      className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-left text-xs transition-colors ${
                        activeSection === id
                          ? 'bg-amber-500/10 text-amber-400'
                          : 'text-[#9EA3B0] hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                      {label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Main content ─────────────────────────────────────────────── */}
          <div className="flex-1 min-w-0 space-y-16">

            {/* What Are Cookies */}
            <Section id="what-are-cookies">
              <SectionHeading icon={Cookie} title="What Are Cookies?" color="text-amber-400" />
              <Prose>
                Cookies are small text files placed on your device by a website. They are sent back to the
                server with each request so the site can remember things about you — whether you are signed
                in, your display preferences, and so on.
              </Prose>
              <Prose>Meika also uses two browser storage APIs that work similarly:</Prose>
              <div className="grid sm:grid-cols-2 gap-4 mt-4">
                {[
                  { label: 'localStorage',   desc: 'Persistent key-value storage that remains until explicitly cleared. Used for preferences that should survive across browser sessions.' },
                  { label: 'sessionStorage', desc: 'Temporary storage that is automatically cleared when the browser tab is closed. Used for short-lived state like the Ira welcome flag.' },
                ].map(item => (
                  <div key={item.label} className="p-4 bg-white/[0.03] border border-white/8 rounded-xl">
                    <code className="text-xs text-amber-300 mb-2 block">{item.label}</code>
                    <p className="text-xs text-[#9EA3B0] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <Prose className="mt-4">
                Throughout this policy, "cookies" refers to all three mechanisms collectively. The table in
                the{' '}
                <button onClick={() => scrollToSection('full-inventory')} className="text-amber-400 hover:underline">
                  Full Cookie Inventory
                </button>{' '}
                section specifies exactly which storage type each item uses.
              </Prose>
            </Section>

            {/* Why We Use Them */}
            <Section id="why-we-use-them">
              <SectionHeading icon={Info} title="Why We Use Them" color="text-cyan-400" />
              <Prose>
                Every cookie or storage item Meika sets exists for a specific, documented reason. We do not
                use cookies to track you across the web, build advertising profiles, or share your behaviour
                with third parties. Our purposes fall into three categories:
              </Prose>
              <div className="space-y-3 mt-5">
                {[
                  { icon: Shield,    color: 'text-red-400',    bg: 'bg-red-500/10 border-red-500/20',       title: 'Security & Core Functionality', body: 'Certain storage items are non-negotiable. CSRF tokens during authentication, session identifiers, and your consent record must be stored for the site to work safely. Disabling these would break sign-in, expose you to CSRF attacks, or cause the consent banner to show on every page load.' },
                  { icon: Settings2, color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', title: 'Preference Memory',               body: 'Functional cookies remember choices you have made — like sidebar layout or whether you have seen the Ira welcome message this session. Without them, every page load would reset your experience to the default state.' },
                  { icon: BarChart2, color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20',     title: 'Product Improvement',            body: 'Analytics storage, when consented to, helps us understand which features are used and where performance can be improved. No personal data is attached to analytics identifiers — they cannot be linked back to you.' },
                ].map(item => {
                  const Icon = item.icon;
                  return (
                    <div key={item.title} className="p-5 bg-white/[0.03] border border-white/8 rounded-xl">
                      <div className="flex items-center gap-2.5 mb-2">
                        <div className={`w-7 h-7 rounded-lg border flex items-center justify-center flex-shrink-0 ${item.bg}`}>
                          <Icon className={`w-3.5 h-3.5 ${item.color}`} />
                        </div>
                        <h3 className="text-sm text-white">{item.title}</h3>
                      </div>
                      <p className="text-xs text-[#9EA3B0] leading-relaxed">{item.body}</p>
                    </div>
                  );
                })}
              </div>
            </Section>

            {/* Essential Cookies */}
            <Section id="essential-cookies">
              <SectionHeading icon={Shield} title="Essential Cookies" color="text-red-400" badge="Always On" />
              <Prose>
                These items are required for the site to function correctly and securely. They are active
                regardless of your consent choice and cannot be disabled without breaking core features.
                Click <span className="text-cyan-400">"Why is this needed?"</span> under any cookie to read
                a plain-language explanation.
              </Prose>
              <div className="space-y-4 mt-5">
                {ESSENTIAL_COOKIES.map(c => <CookieCard key={c.name} cookie={c} />)}
              </div>
            </Section>

            {/* Functional Cookies */}
            <Section id="functional-cookies">
              <SectionHeading icon={Settings2} title="Functional Cookies" color="text-yellow-400" badge="Optional" />
              <Prose>
                Functional cookies improve your experience by remembering preferences within and across
                sessions. They are enabled when you choose <strong className="text-white">"Accept Required"</strong>{' '}
                or higher. You can disable them individually in the cookie preferences dialog.
              </Prose>
              <div className="space-y-4 mt-5">
                {FUNCTIONAL_COOKIES.map(c => <CookieCard key={c.name} cookie={c} />)}
              </div>
            </Section>

            {/* Analytics Cookies */}
            <Section id="analytics-cookies">
              <SectionHeading icon={BarChart2} title="Analytics Cookies" color="text-blue-400" badge="Optional" />
              <Prose>
                Analytics storage is only active if you choose{' '}
                <strong className="text-white">"Accept All"</strong>. It helps us understand site performance
                and feature adoption using anonymised, non-personal data. No analytics identifiers are shared
                with advertising networks.
              </Prose>
              <div className="space-y-4 mt-5">
                {ANALYTICS_COOKIES.map(c => <CookieCard key={c.name} cookie={c} />)}
              </div>
            </Section>

            {/* Third-Party Cookies */}
            <Section id="third-party">
              <SectionHeading icon={Globe} title="Third-Party Cookies" color="text-green-400" />
              <Prose>
                Meika does not embed advertising networks, social media tracking pixels, or third-party
                analytics platforms that set cookies on our pages.
              </Prose>
              <div className="space-y-3 mt-5">
                {[
                  { title: 'OAuth Providers (Google, GitHub, Microsoft)', body: "When you use a social sign-in button you are redirected to that provider's domain. The provider may set its own cookies during authentication. Those cookies are governed by the provider's own policy — not ours — and are deleted from our localStorage immediately after we receive the token." },
                  { title: 'Google Fonts', body: "We load typography via a CSS @import from fonts.googleapis.com. According to Google's published documentation, Fonts loaded this way do not set tracking cookies or log personally identifiable information." },
                ].map(item => (
                  <div key={item.title} className="p-5 bg-white/[0.03] border border-white/8 rounded-xl">
                    <h4 className="text-sm text-white mb-2">{item.title}</h4>
                    <p className="text-xs text-[#9EA3B0] leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Your Choices */}
            <Section id="your-choices">
              <SectionHeading icon={ToggleLeft} title="Your Choices" color="text-amber-400" />
              <Prose>
                You have full control over which cookies Meika stores. You can exercise that control in
                three ways:
              </Prose>
              <div className="space-y-3 mt-5">
                {[
                  { step: '1', title: 'Cookie Consent Banner',     body: 'When you first visit the site, the banner gives you three options: Accept All, Accept Required, or manage granular choices by clicking "View Cookies". Your selection is saved immediately.' },
                  { step: '2', title: 'Individual Cookie Toggles', body: 'Clicking "View Cookies" in the banner opens a dialog where you can switch each optional cookie on or off individually. Required cookies are locked and labelled with an asterisk (*).' },
                  { step: '3', title: 'Browser Settings',          body: "You can view, delete, or block cookies at any time via your browser's developer tools or settings. In Chromium-based browsers: Settings → Privacy and Security → Site Settings → View permissions and data stored across sites. Clearing Meika storage will reset your preferences and show the consent banner again." },
                ].map(item => (
                  <div key={item.step} className="flex gap-4 p-5 bg-white/[0.03] border border-white/8 rounded-xl">
                    <div className="w-7 h-7 rounded-full bg-amber-500/15 border border-amber-500/20 flex items-center justify-center flex-shrink-0 text-xs text-amber-400 font-semibold">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="text-sm text-white mb-1.5">{item.title}</h4>
                      <p className="text-xs text-[#9EA3B0] leading-relaxed">{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            {/* Full Inventory */}
            <Section id="full-inventory">
              <SectionHeading icon={Layers} title="Full Cookie Inventory" color="text-amber-400" />
              <Prose>
                Every storage item Meika sets, in one place. Items marked{' '}
                <span className="text-red-400">*</span> are strictly necessary.
              </Prose>

              {/* Desktop table */}
              <div className="hidden sm:block mt-5 overflow-x-auto rounded-xl border border-white/8">
                <table className="w-full text-xs">
                  <thead className="bg-white/[0.03]">
                    <tr className="border-b border-white/8">
                      {['Name', 'Storage', 'Duration', 'Category', 'Purpose'].map(h => (
                        <th key={h} className="text-left text-[10px] text-[#9EA3B0] uppercase tracking-wider font-medium py-3 px-4 whitespace-nowrap">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {[...ESSENTIAL_COOKIES, ...FUNCTIONAL_COOKIES, ...ANALYTICS_COOKIES].map(c => (
                      <tr key={c.name} className="hover:bg-white/[0.02] transition-colors">
                        <td className="py-3 px-4 align-top">
                          <code className={`text-[11px] px-1.5 py-0.5 rounded ${c.required ? 'text-red-300 bg-red-500/10' : 'text-[#9EA3B0] bg-white/5'}`}>
                            {c.name}{c.required ? ' *' : ''}
                          </code>
                        </td>
                        <td className="py-3 px-4 align-top text-[#9EA3B0]">{c.type}</td>
                        <td className="py-3 px-4 align-top text-cyan-500/80 whitespace-nowrap">{c.duration}</td>
                        <td className="py-3 px-4 align-top">
                          <span className={`text-[10px] rounded px-1.5 py-0.5 border ${
                            c.required
                              ? 'text-red-400 bg-red-500/10 border-red-500/20'
                              : [...FUNCTIONAL_COOKIES].includes(c)
                              ? 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20'
                              : 'text-blue-400 bg-blue-500/10 border-blue-500/20'
                          }`}>
                            {c.required ? 'Essential' : [...FUNCTIONAL_COOKIES].includes(c) ? 'Functional' : 'Analytics'}
                          </span>
                        </td>
                        <td className="py-3 px-4 align-top text-[#9EA3B0] leading-relaxed">{c.purpose}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile cards */}
              <div className="sm:hidden space-y-3 mt-5">
                {[...ESSENTIAL_COOKIES, ...FUNCTIONAL_COOKIES, ...ANALYTICS_COOKIES].map(c => (
                  <div key={c.name} className="p-4 bg-white/[0.03] border border-white/8 rounded-xl">
                    <code className={`text-[11px] px-1.5 py-0.5 rounded block mb-2 w-fit ${c.required ? 'text-red-300 bg-red-500/10' : 'text-[#9EA3B0] bg-white/5'}`}>
                      {c.name}{c.required ? ' *' : ''}
                    </code>
                    <div className="flex gap-2 flex-wrap mb-2">
                      <span className="text-[10px] text-[#9EA3B0] bg-white/5 border border-white/8 rounded px-1.5 py-0.5">{c.type}</span>
                      <span className="text-[10px] text-cyan-500/80">{c.duration}</span>
                    </div>
                    <p className="text-[11px] text-[#9EA3B0] leading-relaxed">{c.purpose}</p>
                  </div>
                ))}
              </div>
            </Section>

            {/* Contact */}
            <Section id="contact">
              <motion.div
                className="p-8 bg-gradient-to-br from-amber-950/30 to-[#0d1117] border border-amber-500/20 rounded-2xl"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-4 h-4 text-amber-400" />
                      <h3 className="text-white">Questions about our cookie use?</h3>
                    </div>
                    <p className="text-sm text-[#9EA3B0] leading-relaxed">
                      If anything in this policy is unclear, or if you believe we are storing something not
                      documented here, please contact our security team. We update this policy whenever our
                      storage practices change.
                    </p>
                  </div>
                  <button
                    onClick={() => { setCurrentPage('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className="flex items-center gap-2 px-6 py-3 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 hover:border-amber-500/60 rounded-xl text-amber-400 text-sm transition-all duration-200 whitespace-nowrap"
                  >
                    Contact Us
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            </Section>

          </div>{/* end main content */}
        </div>{/* end flex row */}
      </div>{/* end container */}

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}
