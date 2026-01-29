import { create } from 'zustand';

interface NotificationState {
  isVisible: boolean;
  message: string;
  showNotification: (message?: string) => void;
  hideNotification: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
  isVisible: false,
  message: '',
  showNotification: (message = '') => {
    set({ isVisible: true, message });
    // Auto-hide after 1.2 seconds
    setTimeout(() => {
      set({ isVisible: false, message: '' });
    }, 1200);
  },
  hideNotification: () => set({ isVisible: false, message: '' }),
}));
