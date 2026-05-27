import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scheduleAllTaskNotifications } from '../hooks/useNotifications';

const useTaskStore = create((set, get) => ({
  tasks: [],
  defaultRoutine: [],

  addTask: async (task) => {
    const newTask = {
      id: Date.now().toString(),
      name: task.name,
      emoji: task.emoji || '📌',
      startTime: task.startTime,
      endTime: task.endTime,
      done: false,
      isRoutine: task.isRoutine || false,
    };
    const updated = [...get().tasks, newTask].sort((a, b) =>
      a.startTime.localeCompare(b.startTime)
    );
    await AsyncStorage.setItem('tasks', JSON.stringify(updated));
    await scheduleAllTaskNotifications(updated);
    set({ tasks: updated });
  },

  toggleTask: async (id) => {
    const updated = get().tasks.map((t) =>
      t.id === id ? { ...t, done: !t.done } : t
    );
    await AsyncStorage.setItem('tasks', JSON.stringify(updated));
    await scheduleAllTaskNotifications(updated);
    set({ tasks: updated });
  },

  deleteTask: async (id) => {
    const updated = get().tasks.filter((t) => t.id !== id);
    await AsyncStorage.setItem('tasks', JSON.stringify(updated));
    await scheduleAllTaskNotifications(updated);
    set({ tasks: updated });
  },

  loadTasks: async () => {
    const saved = await AsyncStorage.getItem('tasks');
    if (saved) set({ tasks: JSON.parse(saved) });
  },

  resetDailyTasks: async () => {
    const routine = get().defaultRoutine;
    const resetTasks = routine.map((t) => ({
      ...t,
      done: false,
      id: Date.now().toString() + Math.random(),
    }));
    await AsyncStorage.setItem('tasks', JSON.stringify(resetTasks));
    await scheduleAllTaskNotifications(resetTasks);
    set({ tasks: resetTasks });
  },

  saveAsRoutine: async () => {
    const routine = get().tasks;
    await AsyncStorage.setItem('defaultRoutine', JSON.stringify(routine));
    set({ defaultRoutine: routine });
  },

  loadRoutine: async () => {
    const saved = await AsyncStorage.getItem('defaultRoutine');
    if (saved) set({ defaultRoutine: JSON.parse(saved) });
  },
}));

export default useTaskStore;