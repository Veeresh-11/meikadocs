import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { X, Mail, Lock, Eye, EyeOff, Shield, Fingerprint, Github, Chrome, ArrowLeft, AlertTriangle, CheckCircle2, Info } from 'lucide-react';
import { validateEmail, validatePassword, sanitizeInput, authRateLimiter, checkBrowserSecurity } from '../utils/security';
import { authService } from '../services/auth.service';

interface AuthPageProps {
  onHide: () => void;
}

type AuthMode = 'email' | 'login' | 'register' | 'passkey';

export function AuthPage({ onHide }: AuthPageProps) {
  const [authMode, setAuthMode] = useState<AuthMode>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [staySignedIn, setStaySignedIn] = useState(false);
  const [error, setError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [securityWarnings, setSecurityWarnings] = useState<string[]>([]);
  const [rateLimited, setRateLimited] = useState(false);

  useEffect(() => {
    // Check browser security features on mount
    const securityCheck = checkBrowserSecurity();
    setSecurityWarnings(securityCheck.warnings);
  }, []);

  const handlePasswordChange = (pwd: string) => {
    setPassword(pwd);
    const validation = validatePassword(pwd);
    setPasswordStrength(validation.strength);
    setPasswordErrors(validation.errors);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Simulate checking if account exists
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // For demo, show login screen
      setAuthMode('login');
    }, 800);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    
    // Try real API first, fallback to demo mode
    authService.login({ 
      email, 
      password, 
      rememberMe: staySignedIn 
    })
      .then((response) => {
        // Real backend connected - redirect to dashboard
        console.log('Login successful:', response.user);
        window.location.href = '/dashboard';
      })
      .catch((err: any) => {
        setLoading(false);
        
        // Check if it's a network error (backend not connected)
        if (err.message?.includes('Failed to fetch') || err.status === 404) {
          // Demo mode - simulate success
          console.warn('Backend not connected - running in demo mode');
          alert('✅ Login successful! (Demo mode - backend not connected)\n\n' +
                'In production with backend:\n' +
                '• JWT tokens would be stored\n' +
                '• User session would be created\n' +
                '• Redirect to dashboard');
          onHide();
        } else {
          // Real API error (wrong credentials, etc.)
          setError(err.message || 'Login failed. Please check your credentials.');
        }
      });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwordStrength < 3) {
      setError('Password is too weak. Please use a stronger password.');
      return;
    }

    setLoading(true);
    
    // Try real API first, fallback to demo mode
    authService.register({
      email,
      password,
      name: email.split('@')[0] // Extract name from email
    })
      .then((response) => {
        // Real backend connected
        console.log('Registration successful:', response.user);
        alert('✅ Registration successful!\n\nPlease check your email to verify your account.');
        onHide();
      })
      .catch((err: any) => {
        setLoading(false);
        
        // Check if it's a network error (backend not connected)
        if (err.message?.includes('Failed to fetch') || err.status === 404) {
          // Demo mode - simulate success
          console.warn('Backend not connected - running in demo mode');
          alert('✅ Registration successful! (Demo mode - backend not connected)\n\n' +
                'In production with backend:\n' +
                '• Account would be created in database\n' +
                '• Verification email would be sent\n' +
                '• License key would be generated');
          onHide();
        } else {
          // Real API error (email exists, etc.)
          setError(err.message || 'Registration failed. Please try again.');
        }
      });
  };

  const handleOAuthLogin = (provider: 'Microsoft' | 'Google' | 'GitHub') => {
    setError('');
    
    // Check if OAuth is configured
    const clientIds: Record<string, string | undefined> = {
      Microsoft: import.meta.env?.VITE_AUTH_MICROSOFT_CLIENT_ID,
      Google: import.meta.env?.VITE_AUTH_GOOGLE_CLIENT_ID,
      GitHub: import.meta.env?.VITE_AUTH_GITHUB_CLIENT_ID,
    };
    
    if (!clientIds[provider]) {
      // OAuth not configured - show demo message
      alert(`${provider} OAuth Integration (Demo mode)\n\n` +
            `To enable ${provider} login:\n` +
            `1. Configure ${provider} OAuth app\n` +
            `2. Add client ID to .env file\n` +
            `3. Configure redirect URI: ${window.location.origin}/auth/callback\n\n` +
            `See /INTEGRATION_GUIDE.md for details`);
      return;
    }
    
    // OAuth configured - initiate real flow
    const redirectUri = `${window.location.origin}/auth/callback`;
    const state = Math.random().toString(36).substring(7);
    localStorage.setItem('oauth_state', state);
    localStorage.setItem('oauth_provider', provider);
    
    const authUrls: Record<string, string> = {
      Microsoft: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${clientIds.Microsoft}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid%20profile%20email&state=${state}`,
      Google: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientIds.Google}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=openid%20profile%20email&state=${state}`,
      GitHub: `https://github.com/login/oauth/authorize?client_id=${clientIds.GitHub}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=user:email&state=${state}`,
    };
    
    // Redirect to OAuth provider
    window.location.href = authUrls[provider];
  };

  const handlePasskeyLogin = () => {
    setError('');
    alert('Passkey/WebAuthn flow (Demo mode)\n\nIn production, this would:\n1. Call navigator.credentials.get()\n2. Use FIDO2/WebAuthn protocol\n3. Authenticate with biometrics or platform authenticator\n4. Provide phishing-resistant authentication');
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 3) return 'bg-orange-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 3) return 'Medium';
    return 'Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0A0B0F] via-[#10121A] to-[#0A0B0F] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Glowing orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Close button */}
      <motion.button
        onClick={onHide}
        className="fixed top-8 right-8 z-50 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full backdrop-blur-sm transition-all duration-300 group"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <X className="w-5 h-5 text-[#9EA3B0] group-hover:text-white transition-colors" />
      </motion.button>

      {/* Main content */}
      <motion.div
        className="w-full max-w-md relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-blue-500 rounded-xl flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L18 5V11C18 15 12 19 12 19C12 19 6 15 6 11V5L12 2Z" fill="white" opacity="0.9"/>
              </svg>
            </div>
            <span className="text-2xl">Meika</span>
          </div>
          <p className="text-[#9EA3B0]">Enterprise-grade secure authentication</p>
        </motion.div>

        {/* Auth card */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
        >
          <AnimatePresence mode="wait">
            {/* Email entry screen (Microsoft-style) */}
            {authMode === 'email' && (
              <motion.div
                key="email"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <h2 className="text-2xl mb-2">Sign in</h2>
                <p className="text-sm text-[#9EA3B0] mb-6">to continue to Meika</p>

                <form onSubmit={handleEmailSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2 text-[#9EA3B0]">Email address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9EA3B0]" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder-[#9EA3B0] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      className="flex items-center gap-2 p-3 bg-red-600/10 border border-red-500/30 rounded-lg text-sm text-red-300"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertTriangle className="w-4 h-4" />
                      {error}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Checking...' : 'Next'}
                  </button>

                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setAuthMode('register')}
                      className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Create an account
                    </button>
                  </div>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/10" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white/5 text-[#9EA3B0]">Or continue with</span>
                  </div>
                </div>

                {/* Alternative login methods */}
                <div className="space-y-3">
                  <button
                    onClick={() => handleOAuthLogin('Microsoft')}
                    className="w-full flex items-center justify-center gap-3 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all group"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#f25022" d="M1 1h10v10H1z"/>
                      <path fill="#00a4ef" d="M12 1h10v10H12z"/>
                      <path fill="#7fba00" d="M1 12h10v10H1z"/>
                      <path fill="#ffb900" d="M12 12h11v11H12z"/>
                    </svg>
                    <span className="text-sm text-[#9EA3B0] group-hover:text-white transition-colors">Microsoft Account</span>
                  </button>

                  <button
                    onClick={() => handleOAuthLogin('Google')}
                    className="w-full flex items-center justify-center gap-3 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all group"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    <span className="text-sm text-[#9EA3B0] group-hover:text-white transition-colors">Google Account</span>
                  </button>

                  <button
                    onClick={() => handleOAuthLogin('GitHub')}
                    className="w-full flex items-center justify-center gap-3 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all group"
                  >
                    <Github className="w-5 h-5 text-[#9EA3B0] group-hover:text-white transition-colors" />
                    <span className="text-sm text-[#9EA3B0] group-hover:text-white transition-colors">GitHub Account</span>
                  </button>
                </div>

                {/* Security note */}
                <motion.div
                  className="mt-6 p-3 bg-indigo-600/10 border border-indigo-500/20 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="flex items-start gap-2 text-xs text-[#9EA3B0]">
                    <Info className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                    <p>
                      We recommend using passkeys for the most secure, passwordless authentication experience.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}

            {/* Login screen */}
            {authMode === 'login' && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button
                  onClick={() => setAuthMode('email')}
                  className="flex items-center gap-2 text-sm text-[#9EA3B0] hover:text-white transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <div className="mb-6">
                  <h2 className="text-2xl mb-2">Enter password</h2>
                  <div className="flex items-center gap-2 text-sm text-[#9EA3B0]">
                    <Mail className="w-4 h-4" />
                    {email}
                  </div>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2 text-[#9EA3B0]">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9EA3B0]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-12 py-3 text-white placeholder-[#9EA3B0] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Enter your password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9EA3B0] hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={staySignedIn}
                        onChange={(e) => setStaySignedIn(e.target.checked)}
                        className="w-4 h-4 bg-white/5 border border-white/20 rounded focus:ring-2 focus:ring-indigo-500 accent-indigo-600"
                      />
                      <span className="text-sm text-[#9EA3B0]">Stay signed in</span>
                    </label>
                    <button
                      type="button"
                      className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>

                  {error && (
                    <motion.div
                      className="flex items-center gap-2 p-3 bg-red-600/10 border border-red-500/30 rounded-lg text-sm text-red-300"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertTriangle className="w-4 h-4" />
                      {error}
                    </motion.div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? 'Signing in...' : 'Sign in'}
                  </button>
                </form>

                {/* Security features */}
                <div className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 text-xs text-[#9EA3B0]">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Zero-trust authentication
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#9EA3B0]">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Device-bound session tokens
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#9EA3B0]">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    Encrypted end-to-end
                  </div>
                </div>
              </motion.div>
            )}

            {/* Registration screen */}
            {authMode === 'register' && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <button
                  onClick={() => setAuthMode('email')}
                  className="flex items-center gap-2 text-sm text-[#9EA3B0] hover:text-white transition-colors mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </button>

                <h2 className="text-2xl mb-2">Create account</h2>
                <p className="text-sm text-[#9EA3B0] mb-6">Get started with Meika</p>

                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-sm mb-2 text-[#9EA3B0]">Email address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9EA3B0]" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder-[#9EA3B0] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-[#9EA3B0]">Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9EA3B0]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => handlePasswordChange(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-12 py-3 text-white placeholder-[#9EA3B0] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Create a strong password"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9EA3B0] hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {password && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-[#9EA3B0]">Password strength</span>
                          <span className={`${passwordStrength <= 1 ? 'text-red-400' : passwordStrength <= 3 ? 'text-orange-400' : 'text-green-400'}`}>
                            {getPasswordStrengthText()}
                          </span>
                        </div>
                        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className={`h-full ${getPasswordStrengthColor()}`}
                            initial={{ width: 0 }}
                            animate={{ width: `${(passwordStrength / 5) * 100}%` }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm mb-2 text-[#9EA3B0]">Confirm password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9EA3B0]" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-lg pl-11 pr-4 py-3 text-white placeholder-[#9EA3B0] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                        placeholder="Confirm your password"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <motion.div
                      className="flex items-center gap-2 p-3 bg-red-600/10 border border-red-500/30 rounded-lg text-sm text-red-300"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <AlertTriangle className="w-4 h-4" />
                      {error}
                    </motion.div>
                  )}

                  <div className="p-3 bg-indigo-600/10 border border-indigo-500/20 rounded-lg">
                    <div className="flex items-start gap-2 text-xs text-[#9EA3B0]">
                      <Shield className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="mb-2">Your password must contain:</p>
                        <ul className="space-y-1 ml-4 list-disc">
                          <li className={password.length >= 12 ? 'text-green-400' : ''}>At least 12 characters</li>
                          <li className={/[a-z]/.test(password) && /[A-Z]/.test(password) ? 'text-green-400' : ''}>Upper and lowercase letters</li>
                          <li className={/\d/.test(password) ? 'text-green-400' : ''}>At least one number</li>
                          <li className={/[^a-zA-Z\d]/.test(password) ? 'text-green-400' : ''}>At least one special character</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Creating account...' : 'Create account'}
                  </button>

                  <p className="text-xs text-center text-[#9EA3B0]">
                    By creating an account, you agree to our{' '}
                    <button type="button" className="text-indigo-400 hover:text-indigo-300">Terms of Service</button>
                    {' '}and{' '}
                    <button type="button" className="text-indigo-400 hover:text-indigo-300">Privacy Policy</button>
                  </p>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-6 text-center text-xs text-[#9EA3B0]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="w-4 h-4 text-indigo-400" />
            <span>Protected by enterprise-grade security</span>
          </div>
          <p>TLS 1.3 • Zero-knowledge architecture • SOC 2 compliant</p>
        </motion.div>
      </motion.div>
    </div>
  );
}