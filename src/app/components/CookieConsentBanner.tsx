import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cookie, Shield, BarChart2, Settings2, X, Lock } from 'lucide-react';
import { MeikaStorage } from '../utils/cookies';

// ─── Types ─────────────────────────────────────────────────────────────────
type ConsentChoice = 'all' | 'required' | 'rejected' | 'custom';

interface CookieConsentBannerProps {
  onDecision: (choice: ConsentChoice) => void;
  setCurrentPage: (page: string) => void;
}

// ─── Per-cookie item definitions ────────────────────────────────────────────
interface CookieItem {
  key: string;
  name: string;
  storage: string;
  duration: string;
  description: string;
  required: boolean;
  category: 'essential' | 'functional' | 'analytics';
}

const COOKIE_ITEMS: CookieItem[] = [
  // Essential
  {
    key: 'hasAcceptedPrivacyNotice',
    name: 'hasAcceptedPrivacyNotice *',
    storage: 'localStorage',
    duration: 'Persistent',
    description: 'Records whether you accepted the privacy notice on first visit. Required for the intro flow to function.',
    required: true,
    category: 'essential',
  },
  {
    key: 'hasVisitedBefore',
    name: 'hasVisitedBefore *',
    storage: 'localStorage',
    duration: 'Persistent',
    description: 'Tracks if you have visited previously so the site can manage the onboarding sequence.',
    required: true,
    category: 'essential',
  },
  {
    key: 'oauth_state',
    name: 'oauth_state *',
    storage: 'localStorage',
    duration: 'Transient',
    description: 'CSRF-protection token generated during OAuth sign-in. Deleted immediately after authentication.',
    required: true,
    category: 'essential',
  },
  {
    key: 'oauth_provider',
    name: 'oauth_provider *',
    storage: 'localStorage',
    duration: 'Transient',
    description: 'Records which OAuth provider you selected so the callback handler can complete the correct flow.',
    required: true,
    category: 'essential',
  },
  {
    key: 'meika_cookie_consent',
    name: 'meika_cookie_consent *',
    storage: 'localStorage',
    duration: 'Persistent',
    description: 'Saves your cookie consent choice so the banner does not appear on every visit.',
    required: true,
    category: 'essential',
  },
  // Functional
  {
    key: 'ira_welcome_seen',
    name: 'ira-welcome-seen',
    storage: 'sessionStorage',
    duration: 'Session',
    description: 'Prevents the Ira assistant welcome bubble from appearing more than once per session.',
    required: false,
    category: 'functional',
  },
  {
    key: 'sidebar_state',
    name: 'sidebar_state',
    storage: 'Cookie (7 days)',
    duration: '7 days',
    description: 'Remembers whether the sidebar is open or collapsed in dashboard views.',
    required: false,
    category: 'functional',
  },
  // Analytics
  {
    key: 'analytics_session',
    name: 'analytics_session',
    storage: 'sessionStorage',
    duration: 'Session',
    description: 'Anonymised session identifier used to measure page performance and feature usage. No personal data is collected.',
    required: false,
    category: 'analytics',
  },
];

const CATEGORY_META = {
  essential: {
    icon: Shield,
    label: 'Strictly Necessary',
    color: 'text-red-400',
    bg: 'bg-red-500/10',
    border: 'border-red-500/20',
    description: 'These cookies are required for the site to work. They cannot be disabled.',
  },
  functional: {
    icon: Cookie,
    label: 'Functional',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
    border: 'border-yellow-500/20',
    description: 'These cookies remember your preferences to improve your experience.',
  },
  analytics: {
    icon: BarChart2,
    label: 'Analytics',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/20',
    description: 'Help us understand how visitors use the site so we can improve it.',
  },
} as const;

// ─── Toggle component ────────────────────────────────────────────────────────
function Toggle({
  enabled,
  onChange,
  disabled = false,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      disabled={disabled}
      onClick={() => !disabled && onChange(!enabled)}
      className={`relative inline-flex h-7 w-[52px] flex-shrink-0 items-center rounded-full transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 ${
        enabled ? 'bg-[#3B9EDB]' : 'bg-white/15'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'}`}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
          enabled ? 'translate-x-[28px]' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

// ─── Preferences Dialog ──────────────────────────────────────────────────────
type Selections = Record<string, boolean>;

const requiredDefault = (): Selections =>
  Object.fromEntries(COOKIE_ITEMS.map((c) => [c.key, c.required]));

const allDefault = (): Selections =>
  Object.fromEntries(COOKIE_ITEMS.map((c) => [c.key, true]));

function CookiePreferencesDialog({
  onClose,
  onAcceptSelected,
  onAcceptRequired,
  onRejectAll,
}: {
  onClose: () => void;
  onAcceptSelected: (selections: Selections) => void;
  onAcceptRequired: () => void;
  onRejectAll: () => void;
}) {
  const [selections, setSelections] = useState<Selections>(requiredDefault);
  const [expandedCat, setExpandedCat] = useState<string | null>('essential');

  const toggle = (key: string, val: boolean) =>
    setSelections((prev) => ({ ...prev, [key]: val }));

  const categories = ['essential', 'functional', 'analytics'] as const;

  return (
    <div className="fixed inset-0 z-[300] flex items-end sm:items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Dialog */}
      <motion.div
        className="relative w-full max-w-2xl bg-[#10121A] border border-white/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden flex flex-col max-h-[90vh]"
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: 'spring', damping: 28, stiffness: 300 }}
      >
        {/* Top accent */}
        <div className="h-[2px] bg-gradient-to-r from-yellow-500/0 via-yellow-400 to-yellow-500/0 flex-shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center">
              <Settings2 className="w-4 h-4 text-yellow-400" />
            </div>
            <div>
              <h2 className="text-white text-base leading-tight">Cookie Preferences</h2>
              <p className="text-[11px] text-[#9EA3B0] mt-0.5">
                Cookies marked <span className="text-red-400 font-medium">*</span> are required and cannot be disabled.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-[#9EA3B0] hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <div className="p-6 space-y-3">
            {categories.map((cat) => {
              const meta = CATEGORY_META[cat];
              const Icon = meta.icon;
              const items = COOKIE_ITEMS.filter((c) => c.category === cat);
              const isOpen = expandedCat === cat;

              return (
                <div
                  key={cat}
                  className="border border-white/8 rounded-xl overflow-hidden"
                >
                  {/* Category header row */}
                  <button
                    type="button"
                    onClick={() => setExpandedCat(isOpen ? null : cat)}
                    className="w-full flex items-center justify-between px-4 py-3.5 bg-white/[0.03] hover:bg-white/[0.06] transition-colors text-left"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg ${meta.bg} border ${meta.border} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-3.5 h-3.5 ${meta.color}`} />
                      </div>
                      <div>
                        <span className="text-sm text-white">{meta.label}</span>
                        <p className="text-[11px] text-[#9EA3B0] mt-0.5">{meta.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                      {cat === 'essential' && (
                        <div className="flex items-center gap-1 text-[10px] text-red-400 bg-red-500/10 border border-red-500/20 rounded px-1.5 py-0.5">
                          <Lock className="w-2.5 h-2.5" />
                          Always On
                        </div>
                      )}
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-[#9EA3B0] text-xs"
                      >
                        ▾
                      </motion.span>
                    </div>
                  </button>

                  {/* Individual cookies */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="items"
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.22, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="divide-y divide-white/5">
                          {items.map((item) => (
                            <div
                              key={item.key}
                              className="px-4 py-3.5 flex items-start gap-4 bg-[#0A0B0F]/60"
                            >
                              {/* Text */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap mb-1">
                                  <code className={`text-[11px] px-1.5 py-0.5 rounded ${
                                    item.required
                                      ? 'text-red-300 bg-red-500/10'
                                      : 'text-[#9EA3B0] bg-white/5'
                                  }`}>
                                    {item.name}
                                  </code>
                                  <span className="text-[10px] text-[#9EA3B0] border border-white/10 rounded px-1.5 py-0.5">{item.storage}</span>
                                  <span className="text-[10px] text-cyan-500/70">{item.duration}</span>
                                </div>
                                <p className="text-[11px] text-[#9EA3B0] leading-relaxed">{item.description}</p>
                              </div>

                              {/* Toggle */}
                              <div className="flex-shrink-0 pt-0.5">
                                <Toggle
                                  enabled={selections[item.key] ?? item.required}
                                  onChange={(v) => toggle(item.key, v)}
                                  disabled={item.required}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action footer */}
        <div className="flex-shrink-0 border-t border-white/8 px-6 py-4 bg-[#0A0B0F]/60 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
            {/* Left: reject + cancel */}
            <div className="flex gap-2">
              <button
                onClick={onRejectAll}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-xs text-[#9EA3B0] hover:text-white transition-all duration-200"
              >
                Reject All
              </button>
              <button
                onClick={onClose}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#9EA3B0] hover:text-white transition-all duration-200"
              >
                Cancel
              </button>
            </div>

            {/* Right: accept required + accept selected */}
            <div className="flex gap-2 sm:ml-auto">
              <button
                onClick={() => {
                  setSelections(requiredDefault());
                  onAcceptRequired();
                }}
                className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-500/30 text-xs text-[#9EA3B0] hover:text-yellow-300 transition-all duration-200"
              >
                Accept Required
              </button>
              <button
                onClick={() => onAcceptSelected(selections)}
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-[#0A0B0F] text-xs font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-[0.97] shadow-lg shadow-yellow-500/20 whitespace-nowrap"
              >
                Accept Selected
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Banner ──────────────────────────────────────────────────────────────────
export function CookieConsentBanner({ onDecision, setCurrentPage }: CookieConsentBannerProps) {
  const [bannerVisible, setBannerVisible] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);

  const commit = (choice: ConsentChoice) => {
    if (choice !== 'custom') MeikaStorage.cookieConsent.set(choice as 'all' | 'required' | 'rejected');
    setBannerVisible(false);
    setDialogOpen(false);
    setTimeout(() => onDecision(choice), 350);
  };

  const handleAcceptRequired = () => commit('required');

  const handleRejectAll = () => commit('rejected');

  const handleAcceptSelected = (selections: Selections) => {
    const allOn = COOKIE_ITEMS.every((c) => selections[c.key]);
    const onlyRequired = COOKIE_ITEMS.every(
      (c) => (c.required ? selections[c.key] === true : selections[c.key] === false || !selections[c.key])
    );
    if (allOn) { MeikaStorage.cookieConsent.set('all'); }
    else if (onlyRequired) { MeikaStorage.cookieConsent.set('required'); }
    else { MeikaStorage.cookieConsent.set('required'); } // custom → store as required minimum
    setBannerVisible(false);
    setDialogOpen(false);
    setTimeout(() => onDecision('custom'), 350);
  };

  return (
    <>
      {/* ── Banner ─────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {bannerVisible && (
          <motion.div
            key="cookie-banner"
            className="fixed bottom-0 left-0 right-0 z-[200] px-4 pb-4 sm:px-6 sm:pb-6 pointer-events-none"
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '110%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 260, delay: 0.5 }}
          >
            <div className="pointer-events-auto max-w-2xl mx-auto">
              <div className="relative rounded-2xl bg-[#10121A]/96 backdrop-blur-xl border border-white/10 shadow-2xl shadow-black/60 overflow-hidden">

                {/* Accent bar */}
                <div className="h-[2px] bg-gradient-to-r from-yellow-500/0 via-yellow-400 to-yellow-500/0" />

                {/* Ambient glow */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-16 bg-yellow-400/5 blur-3xl pointer-events-none" />

                <div className="relative p-5 sm:p-6">
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-9 h-9 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Cookie className="w-4 h-4 text-yellow-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white text-sm leading-tight mb-1">We use cookies</h3>
                      <p className="text-[#9EA3B0] text-xs leading-relaxed">
                        Meika uses cookies to keep the site secure and to remember your preferences.
                        Click <span className="text-white">"View Cookies"</span> to choose exactly which ones you allow.
                      </p>
                    </div>
                    {/* Cancel = dismiss for session */}
                    <button
                      onClick={() => setBannerVisible(false)}
                      className="flex-shrink-0 p-1.5 rounded-lg hover:bg-white/10 transition-colors text-[#9EA3B0] hover:text-white"
                      aria-label="Dismiss"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-2 justify-end">
                    {/* Cookie policy link */}
                    <button
                      onClick={() => { setCurrentPage('cookies'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="text-[11px] text-[#9EA3B0] hover:text-white transition-colors underline underline-offset-2 mr-auto"
                    >
                      Cookie Policy
                    </button>

                    {/* Cancel */}
                    <button
                      onClick={() => setBannerVisible(false)}
                      className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#9EA3B0] hover:text-white transition-all duration-200"
                    >
                      Cancel
                    </button>

                    {/* Accept Required */}
                    <button
                      onClick={handleAcceptRequired}
                      className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-yellow-500/30 text-xs text-[#9EA3B0] hover:text-yellow-300 transition-all duration-200"
                    >
                      Accept Required
                    </button>

                    {/* View Cookies — primary */}
                    <button
                      onClick={() => setDialogOpen(true)}
                      className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-400 hover:to-amber-400 text-[#0A0B0F] text-xs font-semibold transition-all duration-200 hover:scale-[1.03] active:scale-[0.97] shadow-lg shadow-yellow-500/20"
                    >
                      <Settings2 className="w-3.5 h-3.5" />
                      View Cookies
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Preferences dialog ─────────────────────────────────────────── */}
      <AnimatePresence>
        {dialogOpen && (
          <CookiePreferencesDialog
            onClose={() => setDialogOpen(false)}
            onAcceptSelected={handleAcceptSelected}
            onAcceptRequired={handleAcceptRequired}
            onRejectAll={handleRejectAll}
          />
        )}
      </AnimatePresence>
    </>
  );
}
