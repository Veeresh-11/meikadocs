import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Monitor,
  Smartphone,
  Tablet,
  MapPin,
  Clock,
  Shield,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Lock,
  Unlock,
  LogOut,
  MoreVertical,
  Activity,
  Globe,
  Wifi
} from 'lucide-react';

interface Session {
  id: string;
  device: string;
  deviceType: 'desktop' | 'mobile' | 'tablet';
  os: string;
  browser: string;
  location: string;
  country: string;
  ip: string;
  current: boolean;
  lastActive: string;
  created: string;
  trustScore: number;
  riskLevel: 'low' | 'medium' | 'high';
}

export function MeikaSessionsScreen() {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [showMenu, setShowMenu] = useState<string | null>(null);

  const sessions: Session[] = [
    {
      id: '1',
      device: 'MacBook Pro 16"',
      deviceType: 'desktop',
      os: 'macOS 14.2',
      browser: 'Chrome 120',
      location: 'San Francisco, CA',
      country: 'United States',
      ip: '192.168.1.100',
      current: true,
      lastActive: 'Now',
      created: '2 hours ago',
      trustScore: 100,
      riskLevel: 'low'
    },
    {
      id: '2',
      device: 'iPhone 15 Pro',
      deviceType: 'mobile',
      os: 'iOS 17.2',
      browser: 'Safari Mobile',
      location: 'San Francisco, CA',
      country: 'United States',
      ip: '192.168.1.101',
      current: false,
      lastActive: '5 minutes ago',
      created: '3 days ago',
      trustScore: 98,
      riskLevel: 'low'
    },
    {
      id: '3',
      device: 'iPad Pro 12.9"',
      deviceType: 'tablet',
      os: 'iPadOS 17.1',
      browser: 'Safari',
      location: 'Oakland, CA',
      country: 'United States',
      ip: '10.0.0.50',
      current: false,
      lastActive: '2 hours ago',
      created: '1 week ago',
      trustScore: 95,
      riskLevel: 'low'
    },
    {
      id: '4',
      device: 'Windows Desktop',
      deviceType: 'desktop',
      os: 'Windows 11',
      browser: 'Edge 120',
      location: 'New York, NY',
      country: 'United States',
      ip: '203.0.113.45',
      current: false,
      lastActive: '1 day ago',
      created: '2 weeks ago',
      trustScore: 85,
      riskLevel: 'medium'
    },
    {
      id: '5',
      device: 'Unknown Device',
      deviceType: 'desktop',
      os: 'Linux',
      browser: 'Firefox 121',
      location: 'Moscow, Russia',
      country: 'Russia',
      ip: '45.142.212.61',
      current: false,
      lastActive: '3 hours ago',
      created: '3 hours ago',
      trustScore: 35,
      riskLevel: 'high'
    }
  ];

  const getDeviceIcon = (type: Session['deviceType']) => {
    switch (type) {
      case 'mobile':
        return Smartphone;
      case 'tablet':
        return Tablet;
      default:
        return Monitor;
    }
  };

  const getRiskColor = (level: Session['riskLevel']) => {
    switch (level) {
      case 'low':
        return 'text-green-400 bg-green-500/20 border-green-500/30';
      case 'medium':
        return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'high':
        return 'text-red-400 bg-red-500/20 border-red-500/30';
    }
  };

  const handleRevoke = (sessionId: string) => {
    console.log('Revoke session:', sessionId);
    setShowMenu(null);
  };

  const handleLock = (sessionId: string) => {
    console.log('Lock session:', sessionId);
    setShowMenu(null);
  };

  const handleStepUp = (sessionId: string) => {
    console.log('Step-up authentication for:', sessionId);
    setShowMenu(null);
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
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white">Active Sessions & Devices</h2>
                <p className="text-[#9EA3B0]">Monitor and manage your authenticated sessions</p>
              </div>
            </div>
            <button className="px-6 py-3 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl font-medium transition-all border border-red-500/30 flex items-center gap-2">
              <LogOut className="w-5 h-5" />
              Revoke All
            </button>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <Activity className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-[#9EA3B0]">Active Sessions</span>
              </div>
              <div className="text-2xl font-bold text-white">{sessions.length}</div>
            </div>
            <div className="p-4 bg-green-500/10 rounded-xl border border-green-500/30">
              <div className="flex items-center gap-3 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
                <span className="text-sm text-green-300">Trusted</span>
              </div>
              <div className="text-2xl font-bold text-green-400">
                {sessions.filter(s => s.riskLevel === 'low').length}
              </div>
            </div>
            <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/30">
              <div className="flex items-center gap-3 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                <span className="text-sm text-yellow-300">Medium Risk</span>
              </div>
              <div className="text-2xl font-bold text-yellow-400">
                {sessions.filter(s => s.riskLevel === 'medium').length}
              </div>
            </div>
            <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/30">
              <div className="flex items-center gap-3 mb-2">
                <XCircle className="w-5 h-5 text-red-400" />
                <span className="text-sm text-red-300">High Risk</span>
              </div>
              <div className="text-2xl font-bold text-red-400">
                {sessions.filter(s => s.riskLevel === 'high').length}
              </div>
            </div>
          </div>

          {/* Sessions List */}
          <div className="space-y-4">
            {sessions.map((session, index) => {
              const DeviceIcon = getDeviceIcon(session.deviceType);
              const isExpanded = selectedSession === session.id;

              return (
                <motion.div
                  key={session.id}
                  className={`group p-6 rounded-xl border transition-all ${
                    session.current
                      ? 'bg-blue-500/10 border-blue-500/50'
                      : session.riskLevel === 'high'
                      ? 'bg-red-500/5 border-red-500/30 hover:border-red-500/50'
                      : 'bg-white/5 border-white/10 hover:border-blue-500/30'
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <div className="flex items-start gap-4">
                    {/* Device Icon */}
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      session.current
                        ? 'bg-blue-500 text-white'
                        : session.riskLevel === 'high'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-white/10 text-white'
                    }`}>
                      <DeviceIcon className="w-6 h-6" />
                    </div>

                    {/* Session Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-white font-medium">{session.device}</h3>
                            {session.current && (
                              <span className="px-2 py-0.5 bg-blue-500 text-white text-xs rounded-md">
                                Current
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-[#9EA3B0] mb-1">
                            {session.os} • {session.browser}
                          </p>
                          <div className="flex items-center gap-3 text-xs text-[#6B7280]">
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3 h-3" />
                              {session.location}
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {session.lastActive}
                            </span>
                          </div>
                        </div>

                        {/* Actions Menu */}
                        <div className="relative">
                          <button
                            onClick={() => setShowMenu(showMenu === session.id ? null : session.id)}
                            className="p-2 text-[#9EA3B0] hover:text-white hover:bg-white/10 rounded-lg transition-all"
                          >
                            <MoreVertical className="w-5 h-5" />
                          </button>

                          {showMenu === session.id && (
                            <motion.div
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="absolute right-0 mt-2 w-48 bg-[#1a1b23] border border-white/10 rounded-lg shadow-xl z-10 overflow-hidden"
                            >
                              {!session.current && (
                                <>
                                  <button
                                    onClick={() => handleStepUp(session.id)}
                                    className="w-full px-4 py-3 text-left text-sm text-white hover:bg-white/5 transition-all flex items-center gap-2"
                                  >
                                    <Lock className="w-4 h-4" />
                                    Step-up Auth
                                  </button>
                                  <button
                                    onClick={() => handleLock(session.id)}
                                    className="w-full px-4 py-3 text-left text-sm text-yellow-400 hover:bg-yellow-500/10 transition-all flex items-center gap-2"
                                  >
                                    <Unlock className="w-4 h-4" />
                                    Lock Session
                                  </button>
                                  <div className="h-px bg-white/10" />
                                  <button
                                    onClick={() => handleRevoke(session.id)}
                                    className="w-full px-4 py-3 text-left text-sm text-red-400 hover:bg-red-500/10 transition-all flex items-center gap-2"
                                  >
                                    <LogOut className="w-4 h-4" />
                                    Revoke Session
                                  </button>
                                </>
                              )}
                              {session.current && (
                                <div className="px-4 py-3 text-sm text-[#6B7280]">
                                  Can't modify current session
                                </div>
                              )}
                            </motion.div>
                          )}
                        </div>
                      </div>

                      {/* Trust Score Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-[#9EA3B0]">Trust Score</span>
                          <span className={`font-medium ${
                            session.trustScore >= 90 ? 'text-green-400' :
                            session.trustScore >= 70 ? 'text-yellow-400' :
                            'text-red-400'
                          }`}>
                            {session.trustScore}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all ${
                              session.trustScore >= 90 ? 'bg-gradient-to-r from-green-500 to-green-400' :
                              session.trustScore >= 70 ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' :
                              'bg-gradient-to-r from-red-500 to-red-400'
                            }`}
                            style={{ width: `${session.trustScore}%` }}
                          />
                        </div>
                      </div>

                      {/* Risk Badge & Details Toggle */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`px-3 py-1 rounded-lg text-xs font-medium border ${getRiskColor(session.riskLevel)}`}>
                            {session.riskLevel === 'low' && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                            {session.riskLevel === 'medium' && <AlertTriangle className="w-3 h-3 inline mr-1" />}
                            {session.riskLevel === 'high' && <XCircle className="w-3 h-3 inline mr-1" />}
                            {session.riskLevel.charAt(0).toUpperCase() + session.riskLevel.slice(1)} Risk
                          </div>
                          {session.country !== 'United States' && (
                            <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-lg border border-yellow-500/30">
                              Foreign Location
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => setSelectedSession(isExpanded ? null : session.id)}
                          className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
                        >
                          {isExpanded ? 'Hide Details' : 'Show Details'}
                        </button>
                      </div>

                      {/* Expanded Details */}
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-4 pt-4 border-t border-white/10 grid md:grid-cols-2 gap-4"
                        >
                          <div>
                            <h4 className="text-xs text-[#9EA3B0] uppercase tracking-wider mb-3">Connection Details</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-[#6B7280]" />
                                <span className="text-[#9EA3B0]">IP:</span>
                                <span className="text-white font-mono">{session.ip}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#6B7280]" />
                                <span className="text-[#9EA3B0]">Country:</span>
                                <span className="text-white">{session.country}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#6B7280]" />
                                <span className="text-[#9EA3B0]">Created:</span>
                                <span className="text-white">{session.created}</span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <h4 className="text-xs text-[#9EA3B0] uppercase tracking-wider mb-3">Security Checks</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                <span className="text-white">Device fingerprint verified</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-green-400" />
                                <span className="text-white">MFA completed</span>
                              </div>
                              <div className="flex items-center gap-2">
                                {session.riskLevel === 'high' ? (
                                  <XCircle className="w-4 h-4 text-red-400" />
                                ) : (
                                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                                )}
                                <span className="text-white">Location trusted</span>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Security Recommendation */}
          {sessions.some(s => s.riskLevel === 'high') && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6 p-6 bg-red-500/10 border border-red-500/30 rounded-xl"
            >
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-red-400 flex-shrink-0" />
                <div>
                  <h3 className="text-white font-medium mb-2">High-Risk Session Detected</h3>
                  <p className="text-red-200 text-sm mb-4">
                    We've detected an unusual session from an unfamiliar location. If this wasn't you, 
                    revoke the session immediately and update your password.
                  </p>
                  <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg font-medium transition-all">
                    Secure My Account
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
