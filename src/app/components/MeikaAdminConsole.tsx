import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  Users,
  Key,
  Shield,
  Target,
  Smartphone,
  Activity,
  FileText,
  CheckCircle2,
  Settings,
  Plug,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  XCircle,
  BarChart3,
  PieChart,
  Globe,
  Lock,
  Unlock,
  UserCheck,
  UserX,
  Fingerprint,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

type AdminView = 'dashboard' | 'users' | 'auth-methods' | 'conditional-access' | 'zero-trust' | 'devices' | 'sessions' | 'audit' | 'compliance' | 'integrations';

export function MeikaAdminConsole() {
  const [activeView, setActiveView] = useState<AdminView>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const sidebarItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'users' as const, label: 'Users', icon: Users },
    { id: 'auth-methods' as const, label: 'Authentication Methods', icon: Key },
    { id: 'conditional-access' as const, label: 'Conditional Access', icon: Target },
    { id: 'zero-trust' as const, label: 'Zero-Trust Rules', icon: Shield },
    { id: 'devices' as const, label: 'Devices', icon: Smartphone },
    { id: 'sessions' as const, label: 'Sessions', icon: Activity },
    { id: 'audit' as const, label: 'Audit Logs', icon: FileText },
    { id: 'compliance' as const, label: 'Compliance', icon: CheckCircle2 },
    { id: 'integrations' as const, label: 'Integrations', icon: Plug }
  ];

  return (
    <div className="min-h-[800px] bg-gradient-to-br from-[#0A0B0F] to-[#10121A] rounded-3xl border border-white/10 overflow-hidden flex">
      {/* Sidebar */}
      <motion.div
        className="bg-white/[0.02] border-r border-white/10 flex flex-col"
        initial={{ width: sidebarCollapsed ? 80 : 280 }}
        animate={{ width: sidebarCollapsed ? 80 : 280 }}
        transition={{ duration: 0.3 }}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-green-500 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-white font-bold">Admin Console</h2>
                  <p className="text-xs text-[#9EA3B0]">Meika Authenticator</p>
                </div>
              </div>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 text-[#9EA3B0] hover:text-white hover:bg-white/10 rounded-lg transition-all"
            >
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <div className="flex-1 overflow-y-auto p-3">
          <nav className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-blue-500 text-white'
                      : 'text-[#9EA3B0] hover:text-white hover:bg-white/5'
                  }`}
                  title={sidebarCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-3 border-t border-white/10">
          <button className="w-full flex items-center gap-3 px-3 py-3 text-[#9EA3B0] hover:text-white hover:bg-white/5 rounded-lg transition-all">
            <Settings className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="text-sm font-medium">Settings</span>}
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeView === 'dashboard' && <DashboardView key="dashboard" />}
          {activeView === 'users' && <UsersView key="users" />}
          {activeView === 'auth-methods' && <AuthMethodsView key="auth-methods" />}
          {activeView === 'conditional-access' && <ConditionalAccessView key="conditional-access" />}
          {activeView === 'zero-trust' && <ZeroTrustView key="zero-trust" />}
          {activeView === 'devices' && <DevicesView key="devices" />}
          {activeView === 'sessions' && <SessionsView key="sessions" />}
          {activeView === 'audit' && <AuditView key="audit" />}
          {activeView === 'compliance' && <ComplianceView key="compliance" />}
          {activeView === 'integrations' && <IntegrationsView key="integrations" />}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Dashboard View Component
function DashboardView() {
  const stats = [
    { label: 'Total Users', value: '12,458', change: '+12%', trend: 'up', icon: Users, color: 'blue' },
    { label: 'Active Sessions', value: '8,234', change: '+5%', trend: 'up', icon: Activity, color: 'green' },
    { label: 'Blocked Attempts', value: '142', change: '-8%', trend: 'down', icon: XCircle, color: 'red' },
    { label: 'Passkey Adoption', value: '68%', change: '+15%', trend: 'up', icon: Fingerprint, color: 'purple' }
  ];

  const recentEvents = [
    { type: 'success', message: 'New user registered with passkey', time: '2 minutes ago', icon: UserCheck },
    { type: 'warning', message: 'Suspicious login blocked from Russia', time: '5 minutes ago', icon: AlertTriangle },
    { type: 'success', message: 'MFA challenge completed successfully', time: '10 minutes ago', icon: CheckCircle2 },
    { type: 'info', message: 'New device registered for john@company.com', time: '15 minutes ago', icon: Smartphone },
    { type: 'error', message: 'Failed login attempt detected', time: '20 minutes ago', icon: XCircle }
  ];

  const threatMap = [
    { country: 'Russia', attempts: 45, risk: 'high' },
    { country: 'China', attempts: 32, risk: 'high' },
    { country: 'Nigeria', attempts: 18, risk: 'medium' },
    { country: 'Brazil', attempts: 12, risk: 'low' }
  ];

  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-[#9EA3B0]">Overview of your authentication security</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <motion.div
              key={index}
              className="p-6 bg-white/5 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-lg bg-${stat.color}-500/20 flex items-center justify-center`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-400`} />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  <TrendIcon className="w-4 h-4" />
                  {stat.change}
                </div>
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-[#9EA3B0]">{stat.label}</div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Login Activity Chart */}
        <div className="lg:col-span-2 p-6 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Login Success vs Blocked</h3>
            <select className="px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-blue-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          
          {/* Simple Bar Chart Visualization */}
          <div className="space-y-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => {
              const successRate = 70 + Math.random() * 25;
              const blockedRate = 100 - successRate;
              
              return (
                <div key={day}>
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span className="text-[#9EA3B0] w-12">{day}</span>
                    <div className="flex-1 mx-4">
                      <div className="h-8 bg-white/5 rounded-lg overflow-hidden flex">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-green-400 h-full flex items-center justify-center text-xs text-white font-medium"
                          style={{ width: `${successRate}%` }}
                        >
                          {successRate > 20 && `${successRate.toFixed(0)}%`}
                        </div>
                        <div 
                          className="bg-gradient-to-r from-red-500 to-red-400 h-full flex items-center justify-center text-xs text-white font-medium"
                          style={{ width: `${blockedRate}%` }}
                        >
                          {blockedRate > 20 && `${blockedRate.toFixed(0)}%`}
                        </div>
                      </div>
                    </div>
                    <span className="text-white text-sm w-16 text-right">
                      {(Math.random() * 2000 + 1000).toFixed(0)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-6 mt-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="text-sm text-[#9EA3B0]">Successful</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span className="text-sm text-[#9EA3B0]">Blocked</span>
            </div>
          </div>
        </div>

        {/* Threat Heatmap */}
        <div className="p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Threat Heatmap</h3>
          <div className="space-y-4">
            {threatMap.map((threat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-[#6B7280]" />
                    <span className="text-white">{threat.country}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-md ${
                    threat.risk === 'high' ? 'bg-red-500/20 text-red-400' :
                    threat.risk === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {threat.risk.toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        threat.risk === 'high' ? 'bg-red-500' :
                        threat.risk === 'medium' ? 'bg-yellow-500' :
                        'bg-green-500'
                      }`}
                      style={{ width: `${(threat.attempts / 50) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs text-[#9EA3B0] w-12 text-right">{threat.attempts}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MFA Challenges & Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* MFA Methods Distribution */}
        <div className="p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">MFA Method Distribution</h3>
          <div className="space-y-4">
            {[
              { method: 'Push Notification', percentage: 45, color: 'blue' },
              { method: 'Passkey/Biometric', percentage: 35, color: 'green' },
              { method: 'OTP Code', percentage: 15, color: 'yellow' },
              { method: 'Hardware Key', percentage: 5, color: 'purple' }
            ].map((item, index) => (
              <div key={index}>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-white">{item.method}</span>
                  <span className="text-[#9EA3B0]">{item.percentage}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full bg-${item.color}-500`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
          <div className="space-y-3">
            {recentEvents.map((event, index) => {
              const Icon = event.icon;
              return (
                <div key={index} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    event.type === 'success' ? 'bg-green-500/20 text-green-400' :
                    event.type === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                    event.type === 'error' ? 'bg-red-500/20 text-red-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white mb-1">{event.message}</p>
                    <p className="text-xs text-[#6B7280]">{event.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Placeholder views for other sections
function UsersView() {
  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 className="text-3xl font-bold text-white mb-2">User Management</h1>
      <p className="text-[#9EA3B0] mb-8">Manage users and their authentication settings</p>
      <div className="p-12 bg-white/5 rounded-xl border border-white/10 text-center">
        <Users className="w-16 h-16 text-[#9EA3B0] mx-auto mb-4" />
        <p className="text-[#9EA3B0]">User management interface coming soon</p>
      </div>
    </motion.div>
  );
}

function AuthMethodsView() {
  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 className="text-3xl font-bold text-white mb-2">Authentication Methods</h1>
      <p className="text-[#9EA3B0] mb-8">Configure available authentication methods</p>
      <div className="p-12 bg-white/5 rounded-xl border border-white/10 text-center">
        <Key className="w-16 h-16 text-[#9EA3B0] mx-auto mb-4" />
        <p className="text-[#9EA3B0]">Authentication methods interface coming soon</p>
      </div>
    </motion.div>
  );
}

function ConditionalAccessView() {
  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 className="text-3xl font-bold text-white mb-2">Conditional Access Policies</h1>
      <p className="text-[#9EA3B0] mb-8">Define access rules based on context</p>
      <div className="p-12 bg-white/5 rounded-xl border border-white/10 text-center">
        <Target className="w-16 h-16 text-[#9EA3B0] mx-auto mb-4" />
        <p className="text-[#9EA3B0]">Conditional access interface coming soon</p>
      </div>
    </motion.div>
  );
}

function ZeroTrustView() {
  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 className="text-3xl font-bold text-white mb-2">Zero-Trust Rules</h1>
      <p className="text-[#9EA3B0] mb-8">Configure zero-trust security policies</p>
      <div className="p-12 bg-white/5 rounded-xl border border-white/10 text-center">
        <Shield className="w-16 h-16 text-[#9EA3B0] mx-auto mb-4" />
        <p className="text-[#9EA3B0]">Zero-trust rules interface coming soon</p>
      </div>
    </motion.div>
  );
}

function DevicesView() {
  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 className="text-3xl font-bold text-white mb-2">Device Management</h1>
      <p className="text-[#9EA3B0] mb-8">Monitor and manage registered devices</p>
      <div className="p-12 bg-white/5 rounded-xl border border-white/10 text-center">
        <Smartphone className="w-16 h-16 text-[#9EA3B0] mx-auto mb-4" />
        <p className="text-[#9EA3B0]">Device management interface coming soon</p>
      </div>
    </motion.div>
  );
}

function SessionsView() {
  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 className="text-3xl font-bold text-white mb-2">Session Management</h1>
      <p className="text-[#9EA3B0] mb-8">Monitor active sessions across all users</p>
      <div className="p-12 bg-white/5 rounded-xl border border-white/10 text-center">
        <Activity className="w-16 h-16 text-[#9EA3B0] mx-auto mb-4" />
        <p className="text-[#9EA3B0]">Session management interface coming soon</p>
      </div>
    </motion.div>
  );
}

function AuditView() {
  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 className="text-3xl font-bold text-white mb-2">Audit Logs</h1>
      <p className="text-[#9EA3B0] mb-8">View detailed security and access logs</p>
      <div className="p-12 bg-white/5 rounded-xl border border-white/10 text-center">
        <FileText className="w-16 h-16 text-[#9EA3B0] mx-auto mb-4" />
        <p className="text-[#9EA3B0]">Audit logs interface coming soon</p>
      </div>
    </motion.div>
  );
}

function ComplianceView() {
  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 className="text-3xl font-bold text-white mb-2">Compliance</h1>
      <p className="text-[#9EA3B0] mb-8">Security compliance and certifications</p>
      <div className="p-12 bg-white/5 rounded-xl border border-white/10 text-center">
        <CheckCircle2 className="w-16 h-16 text-[#9EA3B0] mx-auto mb-4" />
        <p className="text-[#9EA3B0]">Compliance interface coming soon</p>
      </div>
    </motion.div>
  );
}

function IntegrationsView() {
  return (
    <motion.div
      className="p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <h1 className="text-3xl font-bold text-white mb-2">Integrations</h1>
      <p className="text-[#9EA3B0] mb-8">Configure OAuth, SAML, and OIDC integrations</p>
      <div className="p-12 bg-white/5 rounded-xl border border-white/10 text-center">
        <Plug className="w-16 h-16 text-[#9EA3B0] mx-auto mb-4" />
        <p className="text-[#9EA3B0]">Integrations interface coming soon</p>
      </div>
    </motion.div>
  );
}
