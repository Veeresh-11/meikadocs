import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Mail, 
  Lock, 
  Fingerprint, 
  Key, 
  Eye, 
  EyeOff,
  Shield,
  Chrome,
  Github,
  AlertCircle
} from 'lucide-react';
import { MeikaLogo } from './MeikaLogo';

export function MeikaSignInScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [authMethod, setAuthMethod] = useState<'password' | 'passkey' | 'security-key'>('password');

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-[#0A0B0F] to-[#10121A] rounded-3xl border border-white/10 overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-between p-12 bg-gradient-to-br from-blue-500/20 to-green-500/20 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-full h-full" style={{
              backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '40px 40px'
            }} />
          </div>

          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
              <MeikaLogo size={60} animated={false} />
              <div>
                <h1 className="text-3xl font-bold text-white">Meika Authenticator</h1>
                <p className="text-blue-300 text-sm">Meika Security Platform</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-2xl text-white">Zero-Trust Authentication</h2>
              <p className="text-blue-100/80">
                Secure your enterprise with passwordless biometric authentication, 
                adaptive risk scoring, and comprehensive threat protection.
              </p>

              <div className="space-y-3 pt-6">
                <div className="flex items-center gap-3 text-blue-100">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>FIDO2 & Passkey Support</span>
                </div>
                <div className="flex items-center gap-3 text-blue-100">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>Hardware Key Compatible</span>
                </div>
                <div className="flex items-center gap-3 text-blue-100">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span>Adaptive Security Enabled</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 text-sm text-blue-200/60">
            Protected by enterprise-grade security
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <div className="flex flex-col justify-center p-8 lg:p-12">
          <div className="max-w-md mx-auto w-full">
            {/* Mobile Logo */}
            <div className="lg:hidden mb-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <MeikaLogo size={50} />
                <div className="text-left">
                  <h1 className="text-2xl font-bold text-white">Meika Authenticator</h1>
                  <p className="text-blue-400 text-xs">Meika Security Platform</p>
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-white mb-2">Sign in to your account</h2>
              <p className="text-[#9EA3B0] mb-8">Choose your preferred authentication method</p>

              {/* Risk Banner */}
              <div className="mb-6 p-3 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center gap-3">
                <Shield className="w-5 h-5 text-green-400" />
                <div className="flex-1">
                  <p className="text-sm text-green-300 font-medium">Adaptive Security Enabled</p>
                  <p className="text-xs text-green-400/70">Risk level: Low • Location verified</p>
                </div>
              </div>

              {/* Auth Method Tabs */}
              <div className="grid grid-cols-3 gap-2 mb-6 p-1 bg-white/5 rounded-lg">
                <button
                  onClick={() => setAuthMethod('password')}
                  className={`py-2 px-3 rounded-md text-sm font-medium transition-all ${
                    authMethod === 'password'
                      ? 'bg-blue-500 text-white'
                      : 'text-[#9EA3B0] hover:text-white'
                  }`}
                >
                  <Lock className="w-4 h-4 mx-auto mb-1" />
                  Password
                </button>
                <button
                  onClick={() => setAuthMethod('passkey')}
                  className={`py-2 px-3 rounded-md text-sm font-medium transition-all ${
                    authMethod === 'passkey'
                      ? 'bg-blue-500 text-white'
                      : 'text-[#9EA3B0] hover:text-white'
                  }`}
                >
                  <Fingerprint className="w-4 h-4 mx-auto mb-1" />
                  Passkey
                </button>
                <button
                  onClick={() => setAuthMethod('security-key')}
                  className={`py-2 px-3 rounded-md text-sm font-medium transition-all ${
                    authMethod === 'security-key'
                      ? 'bg-blue-500 text-white'
                      : 'text-[#9EA3B0] hover:text-white'
                  }`}
                >
                  <Key className="w-4 h-4 mx-auto mb-1" />
                  Security Key
                </button>
              </div>

              {/* Email/Username Field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm text-[#9EA3B0] mb-2">
                  Email or Username
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                  <input
                    id="email"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#6B7280] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                  />
                </div>
              </div>

              {/* Password Field (conditional) */}
              {authMethod === 'password' && (
                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm text-[#9EA3B0] mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#6B7280]" />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-[#6B7280] focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-white transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Passkey Prompt */}
              {authMethod === 'passkey' && (
                <div className="mb-4 p-6 bg-blue-500/10 border border-blue-500/30 rounded-lg text-center">
                  <Fingerprint className="w-12 h-12 text-blue-400 mx-auto mb-3" />
                  <p className="text-white font-medium mb-2">Use your biometric</p>
                  <p className="text-sm text-blue-300">Touch ID, Face ID, or Windows Hello</p>
                  <button className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all">
                    Authenticate with Passkey
                  </button>
                </div>
              )}

              {/* Security Key Prompt */}
              {authMethod === 'security-key' && (
                <div className="mb-4 p-6 bg-green-500/10 border border-green-500/30 rounded-lg text-center">
                  <Key className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <p className="text-white font-medium mb-2">Insert your security key</p>
                  <p className="text-sm text-green-300">YubiKey, FIDO2, or compatible hardware</p>
                  <button className="mt-4 px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all">
                    Authenticate with Key
                  </button>
                </div>
              )}

              {/* Stay Signed In */}
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={staySignedIn}
                    onChange={(e) => setStaySignedIn(e.target.checked)}
                    className="w-4 h-4 rounded border-white/20 bg-white/5 text-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-sm text-[#9EA3B0]">Stay signed in</span>
                </label>
                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Forgot password?
                </button>
              </div>

              {/* Sign In Button */}
              {authMethod === 'password' && (
                <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-blue-500/30 mb-6">
                  Sign In
                </button>
              )}

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#10121A] text-[#6B7280]">Or continue with</span>
                </div>
              </div>

              {/* Social Enterprise Login */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group">
                  <svg className="w-6 h-6 mx-auto" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.5 12.3c0-.8-.1-1.6-.2-2.4H12v4.5h6.5c-.3 1.4-1.1 2.6-2.4 3.4v2.9h3.9c2.2-2.1 3.5-5.1 3.5-8.4z" fill="#4285F4"/>
                    <path d="M12 24c3.2 0 6-1.1 8-2.9l-3.9-2.9c-1.1.7-2.5 1.2-4.1 1.2-3.2 0-5.9-2.1-6.8-5H1.1v3c2 3.9 6.1 6.6 10.9 6.6z" fill="#34A853"/>
                    <path d="M5.2 14.3c-.2-.7-.4-1.5-.4-2.3s.1-1.6.4-2.3v-3H1.1C.4 8.2 0 10.1 0 12s.4 3.8 1.1 5.3l4.1-3z" fill="#FBBC05"/>
                    <path d="M12 4.8c1.8 0 3.4.6 4.7 1.8l3.5-3.5C18 1.1 15.2 0 12 0 7.1 0 3 2.7 1.1 6.7l4.1 3c.9-2.9 3.6-5 6.8-5z" fill="#EA4335"/>
                  </svg>
                  <span className="sr-only">Google</span>
                </button>
                <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group">
                  <svg className="w-6 h-6 mx-auto text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.04 0H.96C.43 0 0 .43 0 .96v22.08c0 .53.43.96.96.96h22.08c.53 0 .96-.43.96-.96V.96c0-.53-.43-.96-.96-.96zM7.05 20.45H3.54V9h3.51v11.45zM5.3 7.58c-1.13 0-2.04-.92-2.04-2.04s.91-2.04 2.04-2.04 2.04.92 2.04 2.04-.91 2.04-2.04 2.04zM20.45 20.45h-3.51v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.44V9h3.37v1.56h.05c.47-.89 1.61-1.82 3.32-1.82 3.55 0 4.21 2.34 4.21 5.38v6.33h.06z"/>
                  </svg>
                  <span className="sr-only">Microsoft</span>
                </button>
                <button className="p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all group">
                  <Github className="w-6 h-6 mx-auto text-white" />
                  <span className="sr-only">GitHub</span>
                </button>
              </div>

              {/* Compliance Footer */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-xs text-[#6B7280] text-center mb-3">
                  Protected by enterprise-grade security
                </p>
                <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-[#6B7280]">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3" /> ISO 27001
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3" /> SOC 2
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3" /> GDPR
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3" /> FIPS
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
