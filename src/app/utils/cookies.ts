/**
 * Meika cookie & browser-storage utility
 *
 * Single source of truth for every key stored in document.cookie,
 * localStorage, and sessionStorage across the application.
 *
 * Usage:
 *   import { MeikaStorage } from '@/utils/cookies';
 *
 *   MeikaStorage.privacyNotice.set(true);
 *   MeikaStorage.privacyNotice.get();   // → true | false
 *   MeikaStorage.privacyNotice.clear();
 */

// ─── Cookie helpers ──────────────────────────────────────────────────────────

function setCookie(name: string, value: string, maxAgeDays: number) {
  const maxAge = maxAgeDays * 24 * 60 * 60;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function getCookie(name: string): string | null {
  const encoded = encodeURIComponent(name);
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith(`${encoded}=`));
  return match ? decodeURIComponent(match.split('=')[1]) : null;
}

function deleteCookie(name: string) {
  document.cookie = `${encodeURIComponent(name)}=; path=/; max-age=0`;
}

// ─── localStorage helpers ────────────────────────────────────────────────────

function lsGet(key: string): string | null {
  try { return localStorage.getItem(key); } catch { return null; }
}

function lsSet(key: string, value: string) {
  try { localStorage.setItem(key, value); } catch { /* quota exceeded or private mode */ }
}

function lsRemove(key: string) {
  try { localStorage.removeItem(key); } catch { /* noop */ }
}

// ─── sessionStorage helpers ──────────────────────────────────────────────────

function ssGet(key: string): string | null {
  try { return sessionStorage.getItem(key); } catch { return null; }
}

function ssSet(key: string, value: string) {
  try { sessionStorage.setItem(key, value); } catch { /* noop */ }
}

function ssRemove(key: string) {
  try { sessionStorage.removeItem(key); } catch { /* noop */ }
}

// ─── Public API ──────────────────────────────────────────────────────────────

export const MeikaStorage = {
  /**
   * localStorage — 'hasAcceptedPrivacyNotice'
   * Set to 'true' when the user accepts the data-collection notice
   * on the exposure intro flow.
   */
  privacyNotice: {
    get: (): boolean => lsGet('hasAcceptedPrivacyNotice') === 'true',
    set: (accepted: boolean) => lsSet('hasAcceptedPrivacyNotice', String(accepted)),
    clear: () => lsRemove('hasAcceptedPrivacyNotice'),
  },

  /**
   * localStorage — 'hasVisitedBefore'
   * Set once the user has completed the intro flow so subsequent
   * visits can skip or shorten the onboarding sequence.
   */
  visitedBefore: {
    get: (): boolean => lsGet('hasVisitedBefore') === 'true',
    set: (visited: boolean) => lsSet('hasVisitedBefore', String(visited)),
    clear: () => lsRemove('hasVisitedBefore'),
  },

  /**
   * sessionStorage — 'ira-welcome-seen'
   * Prevents the Ira assistant welcome bubble from showing more than
   * once per browser session. Cleared automatically on tab close.
   */
  iraWelcomeSeen: {
    get: (): boolean => ssGet('ira-welcome-seen') === 'true',
    set: () => ssSet('ira-welcome-seen', 'true'),
    clear: () => ssRemove('ira-welcome-seen'),
  },

  /**
   * localStorage — 'oauth_state'
   * Ephemeral CSRF token generated at the start of an OAuth flow.
   * Must be verified in the callback handler and deleted immediately.
   */
  oauthState: {
    get: (): string | null => lsGet('oauth_state'),
    set: (state: string) => lsSet('oauth_state', state),
    clear: () => lsRemove('oauth_state'),
  },

  /**
   * localStorage — 'oauth_provider'
   * Records which OAuth provider was selected (e.g. 'google', 'github')
   * so the callback handler can complete the correct flow.
   * Deleted immediately after authentication completes.
   */
  oauthProvider: {
    get: (): string | null => lsGet('oauth_provider'),
    set: (provider: string) => lsSet('oauth_provider', provider),
    clear: () => lsRemove('oauth_provider'),
  },

  /**
   * localStorage — 'meika_cookie_consent'
   * Stores the user's cookie consent choice.
   * Values: 'all' | 'required' | 'rejected' | null (not yet decided)
   */
  cookieConsent: {
    get: (): 'all' | 'required' | 'rejected' | null => {
      const v = lsGet('meika_cookie_consent');
      if (v === 'all' || v === 'required' || v === 'rejected') return v;
      return null;
    },
    set: (choice: 'all' | 'required' | 'rejected') => lsSet('meika_cookie_consent', choice),
    clear: () => lsRemove('meika_cookie_consent'),
  },

  /**
   * document.cookie — 'sidebar_state'
   * Persists the sidebar open/collapsed preference across page loads.
   * Expires after 7 days (matches the sidebar component's own logic).
   */
  sidebarState: {
    KEY: 'sidebar_state',
    DAYS: 7,
    get: (): boolean => getCookie('sidebar_state') === 'true',
    set: (open: boolean) => setCookie('sidebar_state', String(open), 7),
    clear: () => deleteCookie('sidebar_state'),
  },
} as const;

// ─── Dev utilities ───────────────────────────────────────────────────────────

/**
 * Resets all Meika-managed storage.
 * Useful in development: call resetMeikaStorage() from the browser console.
 */
export function resetMeikaStorage() {
  Object.values(MeikaStorage).forEach((entry) => {
    if ('clear' in entry && typeof entry.clear === 'function') entry.clear();
  });
  console.info('[Meika] All storage cleared. Reload to restart the onboarding flow.');
}

/**
 * Dumps a snapshot of all Meika storage values.
 * Call dumpMeikaStorage() from the browser console during development.
 */
export function dumpMeikaStorage() {
  const snapshot = {
    cookieConsent: MeikaStorage.cookieConsent.get(),
    privacyNotice: MeikaStorage.privacyNotice.get(),
    visitedBefore: MeikaStorage.visitedBefore.get(),
    iraWelcomeSeen: MeikaStorage.iraWelcomeSeen.get(),
    oauthState: MeikaStorage.oauthState.get(),
    oauthProvider: MeikaStorage.oauthProvider.get(),
    sidebarState: MeikaStorage.sidebarState.get(),
  };
  console.table(snapshot);
  return snapshot;
}

// Expose dev helpers on window in non-production environments
if (import.meta.env.DEV) {
  (window as any).resetMeikaStorage = resetMeikaStorage;
  (window as any).dumpMeikaStorage = dumpMeikaStorage;
}
