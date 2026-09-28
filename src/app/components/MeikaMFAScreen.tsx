import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Smartphone,
  Shield,
  MapPin,
  Monitor,
  CheckCircle2,
  X,
  AlertTriangle,
  Key,
  Clock
} from 'lucide-react';

export function MeikaMFAScreen() {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [challengeType, setChallengeType] = useState<'push' | 'number' | 'otp' | 'hardware'>('push');
  const [numberMatch, setNumberMatch] = useState('47');
  const [timer, setTimer] = useState(60);
  const [pushStatus, setPushStatus] = useState<'pending' | 'approved' | 'denied'>('pending');

  useEffect(() => {
    if (challengeType === 'push' && timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [challengeType, timer]);

  const handleCodeInput = (index: number, value: string) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newCode = [...verificationCode];
      newCode[index] = value;
      setVerificationCode(newCode);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const simulateApprove = () => {
    setPushStatus('approved');
    setTimeout(() => setPushStatus('pending'), 3000);
  };

  const simulateDeny = () => {
    setPushStatus('denied');
    setTimeout(() => setPushStatus('pending'), 3000);
  };

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-[#0A0B0F] to-[#10121A] rounded-3xl border border-white/10 overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[600px]">
        {/* Left Side - Device & Context Info */}
        <div className="p-8 lg:p-12 bg-white/[0.02] border-r border-white/10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Multi-Factor Authentication</h2>
                <p className="text-sm text-[#9EA3B0]">Verify your identity</p>
              </div>
            </div>

            {/* Device & Location Trust */}
            <div className="space-y-4 mb-8">
              <h3 className="text-sm font-medium text-[#9EA3B0] uppercase tracking-wider">Session Context</h3>
              
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-start gap-3 mb-3">
                  <Monitor className="w-5 h-5 text-blue-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-white font-medium mb-1">Device</p>
                    <p className="text-sm text-[#9EA3B0]">Chrome on macOS</p>
                    <p className="text-xs text-[#6B7280]">Last seen: Just now</p>
                  </div>
                  <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-md">
                    Trusted
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-start gap-3 mb-3">
                  <MapPin className="w-5 h-5 text-green-400 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-white font-medium mb-1">Location</p>
                    <p className="text-sm text-[#9EA3B0]">San Francisco, CA, USA</p>
                    <p className="text-xs text-[#6B7280]">IP: 192.168.1.1</p>
                  </div>
                  <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-md">
                    Verified
                  </div>
                </div>
              </div>
            </div>

            {/* Threat Risk Score */}
            <div className="p-6 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-xl border border-green-500/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-medium">Threat Risk Score</h3>
                <div className="text-2xl font-bold text-green-400">Low</div>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#9EA3B0]">Device Trust</span>
                  <span className="text-green-400 font-medium">100%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-400 w-full" />
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#9EA3B0]">Location Trust</span>
                  <span className="text-green-400 font-medium">95%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-400 w-[95%]" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#9EA3B0]">Behavioral Trust</span>
                  <span className="text-green-400 font-medium">98%</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-green-500 to-green-400 w-[98%]" />
                </div>
              </div>

              <p className="text-xs text-green-300/70 mt-4">
                All security checks passed. No anomalies detected.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Right Side - MFA Challenge */}
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Challenge Type Tabs */}
            <div className="grid grid-cols-4 gap-2 mb-8 p-1 bg-white/5 rounded-lg">
              <button
                onClick={() => setChallengeType('push')}
                className={`py-2 px-2 rounded-md text-xs font-medium transition-all ${
                  challengeType === 'push'
                    ? 'bg-blue-500 text-white'
                    : 'text-[#9EA3B0] hover:text-white'
                }`}
              >
                Push
              </button>
              <button
                onClick={() => setChallengeType('number')}
                className={`py-2 px-2 rounded-md text-xs font-medium transition-all ${
                  challengeType === 'number'
                    ? 'bg-blue-500 text-white'
                    : 'text-[#9EA3B0] hover:text-white'
                }`}
              >
                Number
              </button>
              <button
                onClick={() => setChallengeType('otp')}
                className={`py-2 px-2 rounded-md text-xs font-medium transition-all ${
                  challengeType === 'otp'
                    ? 'bg-blue-500 text-white'
                    : 'text-[#9EA3B0] hover:text-white'
                }`}
              >
                OTP
              </button>
              <button
                onClick={() => setChallengeType('hardware')}
                className={`py-2 px-2 rounded-md text-xs font-medium transition-all ${
                  challengeType === 'hardware'
                    ? 'bg-blue-500 text-white'
                    : 'text-[#9EA3B0] hover:text-white'
                }`}
              >
                Key
              </button>
            </div>

            {/* Push Approval */}
            {challengeType === 'push' && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="relative inline-block">
                    <motion.div
                      className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center mx-auto"
                      animate={{
                        scale: pushStatus === 'pending' ? [1, 1.1, 1] : 1,
                      }}
                      transition={{
                        duration: 2,
                        repeat: pushStatus === 'pending' ? Infinity : 0,
                      }}
                    >
                      {pushStatus === 'approved' && <CheckCircle2 className="w-10 h-10 text-white" />}
                      {pushStatus === 'denied' && <X className="w-10 h-10 text-white" />}
                      {pushStatus === 'pending' && <Smartphone className="w-10 h-10 text-white" />}
                    </motion.div>
                    {pushStatus === 'pending' && (
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        1
                      </div>
                    )}
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {pushStatus === 'pending' && 'Check Your Phone'}
                  {pushStatus === 'approved' && 'Authentication Approved'}
                  {pushStatus === 'denied' && 'Authentication Denied'}
                </h3>
                
                <p className="text-[#9EA3B0] mb-6">
                  {pushStatus === 'pending' && 'A push notification has been sent to your Meika Authenticator app'}
                  {pushStatus === 'approved' && 'You can now continue to your account'}
                  {pushStatus === 'denied' && 'Please try again or use a different method'}
                </p>

                {pushStatus === 'pending' && (
                  <>
                    <div className="flex items-center justify-center gap-2 mb-6 text-sm text-[#6B7280]">
                      <Clock className="w-4 h-4" />
                      <span>Expires in {timer} seconds</span>
                    </div>

                    {/* Demo Buttons */}
                    <div className="flex gap-3 justify-center mb-6">
                      <button
                        onClick={simulateApprove}
                        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-medium transition-all"
                      >
                        Simulate Approve
                      </button>
                      <button
                        onClick={simulateDeny}
                        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all"
                      >
                        Simulate Deny
                      </button>
                    </div>
                  </>
                )}

                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Didn't receive notification? Resend
                </button>
              </div>
            )}

            {/* Number Matching */}
            {challengeType === 'number' && (
              <div className="text-center">
                <Smartphone className="w-16 h-16 text-blue-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">Match the Number</h3>
                <p className="text-[#9EA3B0] mb-8">
                  Enter this number in your Meika Authenticator app
                </p>

                <div className="mb-8">
                  <div className="inline-block px-12 py-8 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-2xl border border-blue-500/30">
                    <div className="text-6xl font-bold text-white tracking-wider">
                      {numberMatch}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                  <p className="text-sm text-blue-300">
                    <AlertTriangle className="w-4 h-4 inline mr-2" />
                    Only approve if this number matches your device
                  </p>
                </div>
              </div>
            )}

            {/* OTP Code */}
            {challengeType === 'otp' && (
              <div className="text-center">
                <Key className="w-16 h-16 text-green-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-2">Enter Verification Code</h3>
                <p className="text-[#9EA3B0] mb-8">
                  Enter the 6-digit code from your authenticator app
                </p>

                <div className="flex gap-3 justify-center mb-6">
                  {verificationCode.map((digit, index) => (
                    <input
                      key={index}
                      id={`code-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleCodeInput(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="w-12 h-14 text-center text-2xl font-bold bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                    />
                  ))}
                </div>

                <button className="w-full py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-green-500/30 mb-4">
                  Verify Code
                </button>

                <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                  Problems with your code? Get help
                </button>
              </div>
            )}

            {/* Hardware Key */}
            {challengeType === 'hardware' && (
              <div className="text-center">
                <div className="mb-6">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center mx-auto"
                    animate={{
                      scale: [1, 1.05, 1],
                      rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <Key className="w-10 h-10 text-white" />
                  </motion.div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">Insert Security Key</h3>
                <p className="text-[#9EA3B0] mb-8">
                  Insert your YubiKey or FIDO2 hardware security key and tap it
                </p>

                <div className="mb-6 p-6 bg-green-500/10 border border-green-500/30 rounded-lg">
                  <Shield className="w-12 h-12 text-green-400 mx-auto mb-3" />
                  <p className="text-white font-medium mb-2">Waiting for hardware key...</p>
                  <p className="text-sm text-green-300">Please touch your security key when it blinks</p>
                </div>

                <div className="space-y-2 text-sm text-[#6B7280] text-left">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    USB key detected
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-400" />
                    FIDO2 protocol verified
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-400" />
                    Waiting for user presence...
                  </p>
                </div>
              </div>
            )}

            {/* Alternative Methods */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <p className="text-sm text-[#6B7280] text-center">
                Having trouble? <button className="text-blue-400 hover:text-blue-300 transition-colors">Try another method</button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
