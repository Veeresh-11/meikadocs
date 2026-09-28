import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useEffect } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
  onClose: (id: string) => void;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const colorMap = {
  success: {
    bg: 'from-green-600/20 to-emerald-600/20',
    border: 'border-green-500/30',
    icon: 'text-green-400',
    text: 'text-green-200',
  },
  error: {
    bg: 'from-red-600/20 to-red-900/20',
    border: 'border-red-500/30',
    icon: 'text-red-400',
    text: 'text-red-200',
  },
  warning: {
    bg: 'from-yellow-600/20 to-orange-600/20',
    border: 'border-yellow-500/30',
    icon: 'text-yellow-400',
    text: 'text-yellow-200',
  },
  info: {
    bg: 'from-blue-600/20 to-indigo-600/20',
    border: 'border-blue-500/30',
    icon: 'text-blue-400',
    text: 'text-blue-200',
  },
};

export function Toast({ id, type, message, duration = 5000, onClose }: ToastProps) {
  const Icon = iconMap[type];
  const colors = colorMap[type];

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: 200, scale: 0.5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`flex items-start gap-3 p-4 rounded-xl border backdrop-blur-sm bg-gradient-to-r ${colors.bg} ${colors.border} shadow-lg min-w-[300px] max-w-md`}
    >
      <Icon className={`w-5 h-5 ${colors.icon} flex-shrink-0 mt-0.5`} />
      <p className={`flex-1 text-sm ${colors.text}`}>{message}</p>
      <button
        onClick={() => onClose(id)}
        className={`${colors.icon} hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10`}
        aria-label="Close notification"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
}

export interface ToastContainerProps {
  toasts: Array<{
    id: string;
    type: ToastType;
    message: string;
    duration?: number;
  }>;
  onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-3">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
}
