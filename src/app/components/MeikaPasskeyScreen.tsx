import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Fingerprint,
  Key,
  Smartphone,
  Monitor,
  Trash2,
  Plus,
  CheckCircle2,
  Shield,
  Download,
  Copy,
  Eye,
  EyeOff,
  QrCode
} from 'lucide-react';

interface Passkey {
  id: string;
  name: string;
  type: 'biometric' | 'security-key' | 'device';
  device: string;
  created: string;
  lastUsed: string;
  icon: any;
}

export function MeikaPasskeyScreen() {
  const [showRecovery, setShowRecovery] = useState(false);
  const [copiedKey, setCopiedKey] = useState(false);

  const passkeys: Passkey[] = [
    {
      id: '1',
      name: 'MacBook Pro Touch ID',
      type: 'biometric',
      device: 'macOS 14.2',
      created: 'Jan 5, 2026',
      lastUsed: '2 hours ago',
      icon: Fingerprint
    },
    {
      id: '2',
      name: 'iPhone 15 Pro Face ID',
      type: 'biometric',
      device: 'iOS 17.2',
      created: 'Dec 20, 2025',
      lastUsed: 'Yesterday',
      icon: Smartphone
    },
    {
      id: '3',
      name: 'YubiKey 5C NFC',
      type: 'security-key',
      device: 'FIDO2',
      created: 'Nov 10, 2025',
      lastUsed: '3 days ago',
      icon: Key
    },
    {
      id: '4',
      name: 'Windows Hello',
      type: 'biometric',
      device: 'Windows 11',
      created: 'Oct 15, 2025',
      lastUsed: '1 week ago',
      icon: Monitor
    }
  ];

  const recoveryKeys = [
    'MEIKA-8X9F-2K4L-P7Q3',
    'MEIKA-5N6M-9R2T-W8Y1',
    'MEIKA-3H4J-7V5B-C1X6',
    'MEIKA-1D2F-6G8K-L9P4'
  ];

  const copyRecoveryKeys = () => {
    const allKeys = recoveryKeys.join('\n');
    navigator.clipboard.writeText(allKeys);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  return (
    <div className="min-h-[600px] bg-gradient-to-br from-[#0A0B0F] to-[#10121A] rounded-3xl border border-white/10 overflow-hidden">
      <div className="p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                <Fingerprint className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Passkey & Credential Manager</h2>
                <p className="text-[#9EA3B0]">Manage your biometric and hardware authentication</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl font-medium transition-all shadow-lg shadow-blue-500/30 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Register New Passkey
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Fingerprint className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-[#9EA3B0]">Biometric Keys</span>
              </div>
              <div className="text-2xl font-bold text-white">3</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Key className="w-5 h-5 text-green-400" />
                <span className="text-sm text-[#9EA3B0]">Hardware Keys</span>
              </div>
              <div className="text-2xl font-bold text-white">1</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Shield className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-[#9EA3B0]">Recovery Keys</span>
              </div>
              <div className="text-2xl font-bold text-white">4</div>
            </div>
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Monitor className="w-5 h-5 text-purple-400" />
                <span className="text-sm text-[#9EA3B0]">Trusted Devices</span>
              </div>
              <div className="text-2xl font-bold text-white">4</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Passkeys List */}
            <div className="lg:col-span-2">
              <h3 className="text-xl font-bold text-white mb-4">Your Passkeys</h3>
              <div className="space-y-3">
                {passkeys.map((passkey, index) => {
                  const Icon = passkey.icon;
                  return (
                    <motion.div
                      key={passkey.id}
                      className="group p-6 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-blue-500/50 transition-all"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          passkey.type === 'biometric' 
                            ? 'bg-blue-500/20 text-blue-400' 
                            : 'bg-green-500/20 text-green-400'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="text-white font-medium mb-1">{passkey.name}</h4>
                              <p className="text-sm text-[#9EA3B0]">{passkey.device}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                <QrCode className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-4 text-xs text-[#6B7280]">
                            <span>Created: {passkey.created}</span>
                            <span>•</span>
                            <span>Last used: {passkey.lastUsed}</span>
                          </div>

                          <div className="mt-3 flex items-center gap-2">
                            <div className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-md">
                              Active
                            </div>
                            {passkey.type === 'security-key' && (
                              <div className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-md">
                                FIDO2 Certified
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Cross-Device Sync */}
              <div className="mt-6 p-6 bg-gradient-to-br from-blue-500/10 to-green-500/10 rounded-xl border border-blue-500/30">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center">
                    <QrCode className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-medium mb-2">Cross-Device Sync</h4>
                    <p className="text-sm text-blue-200 mb-4">
                      Securely sync your passkeys across all your trusted devices using end-to-end encryption
                    </p>
                    <div className="flex items-center gap-3">
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-lg font-medium transition-all">
                        Enable Sync
                      </button>
                      <span className="text-sm text-blue-300">4 devices ready to sync</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Recovery Keys */}
            <div>
              <div className="sticky top-8">
                <h3 className="text-xl font-bold text-white mb-4">Recovery Keys</h3>
                
                <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/30 mb-4">
                  <Shield className="w-10 h-10 text-yellow-400 mb-4" />
                  <h4 className="text-white font-medium mb-2">Backup Access</h4>
                  <p className="text-sm text-yellow-200/80 mb-4">
                    Recovery keys provide backup access if you lose your passkeys or devices
                  </p>
                  <button
                    onClick={() => setShowRecovery(!showRecovery)}
                    className="w-full px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white text-sm rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                  >
                    {showRecovery ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        Hide Keys
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        Show Keys
                      </>
                    )}
                  </button>
                </div>

                {showRecovery && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="p-6 bg-white/5 rounded-xl border border-white/10 mb-4"
                  >
                    <div className="space-y-2 mb-4">
                      {recoveryKeys.map((key, index) => (
                        <div
                          key={index}
                          className="p-3 bg-white/5 rounded-lg font-mono text-sm text-white border border-white/10"
                        >
                          {key}
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={copyRecoveryKeys}
                        className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg font-medium transition-all flex items-center justify-center gap-2"
                      >
                        <Copy className="w-4 h-4" />
                        {copiedKey ? 'Copied!' : 'Copy All'}
                      </button>
                      <button className="flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm rounded-lg font-medium transition-all flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Security Tips */}
                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <h4 className="text-white font-medium mb-4 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-400" />
                    Security Best Practices
                  </h4>
                  <ul className="space-y-3 text-sm text-[#9EA3B0]">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Store recovery keys in a secure location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Register at least 2 passkeys for redundancy</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Use hardware keys for highest security</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                      <span>Review and remove unused passkeys regularly</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
