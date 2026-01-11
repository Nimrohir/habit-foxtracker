import { useState, useCallback } from 'react';

interface ToastConfig {
  message: string;
  author?: string;
  duration?: number;
  type?: 'success' | 'info' | 'warning';
}

export const useToast = () => {
  const [toast, setToast] = useState<ToastConfig | null>(null);
  const [visible, setVisible] = useState(false);

  const showToast = useCallback((config: ToastConfig) => {
    setToast(config);
    setVisible(true);
    
    setTimeout(() => {
      setVisible(false);
    }, config.duration || 5000);
  }, []);

  const hideToast = useCallback(() => {
    setVisible(false);
  }, []);

  return { toast, visible, showToast, hideToast };
};