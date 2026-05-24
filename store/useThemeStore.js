import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { themes, defaultTheme } from '../constants/theme';

const useThemeStore = create((set) => ({
  themeName: defaultTheme,
  theme: themes[defaultTheme],

  setTheme: async (themeName) => {
    await AsyncStorage.setItem('userTheme', themeName);
    set({ themeName, theme: themes[themeName] });
  },

  loadTheme: async () => {
    const saved = await AsyncStorage.getItem('userTheme');
    if (saved && themes[saved]) {
      set({ themeName: saved, theme: themes[saved] });
    }
  },
}));

export default useThemeStore;