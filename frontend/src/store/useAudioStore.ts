import { create } from "zustand";

interface AudioState {
  play: boolean;
  setPlay: (value: boolean) => void;
  togglePlay: () => void;
}

export const useAudioStore = create<AudioState>((set) => ({
  play: false,
  setPlay: (value) => set({ play: value }),
  togglePlay: () => set((state) => ({ play: !state.play })),
}));
