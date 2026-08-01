import { create } from 'zustand';

type AppMode = 'STANDARD' | 'EDGE_AI';

interface AppState {
  aiMode: AppMode;
  isOnline: boolean;
  toggleMode: () => void;
  setOnlineStatus: (status: boolean) => void;
}

export const useAppStore = create<AppState>((set) => ({
  aiMode: 'STANDARD',
  isOnline: true,
  toggleMode: () => set((state) => ({ aiMode: state.aiMode === 'STANDARD' ? 'EDGE_AI' : 'STANDARD' })),
  setOnlineStatus: (status) => set({ isOnline: status }),
}));
