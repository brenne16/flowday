import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import useThemeStore from '../../store/useThemeStore';
import useTaskStore from '../../store/useTaskStore';
import AddTaskModal from '../../components/AddTaskModal';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function PlanningScreen() {
  const theme = useThemeStore((state) => state.theme);
  const { tasks, defaultRoutine, loadTasks, loadRoutine, saveAsRoutine, resetDailyTasks, deleteTask, toggleTask } = useTaskStore();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDay, setSelectedDay] = useState(new Date().getDay() === 0 ? 6 : new Date().getDay() - 1);

  useEffect(() => {
    loadTasks();
    loadRoutine();
  }, []);

  const today = new Date();
  const weekDates = DAYS.map((_, i) => {
    const date = new Date(today);
    const dayOfWeek = today.getDay() === 0 ? 6 : today.getDay() - 1;
    date.setDate(today.getDate() - dayOfWeek + i);
    return date.getDate();
  });

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Planning</Text>
          <Text style={[styles.subtitle, { color: theme.textMuted }]}>
            {today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
          </Text>
        </View>

        {/* Week selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.weekRow}>
          {DAYS.map((day, index) => (
            <TouchableOpacity
              key={day}
              onPress={() => setSelectedDay(index)}
              style={[
                styles.dayBtn,
                { backgroundColor: selectedDay === index ? theme.primary : theme.surface },
              ]}
            >
              <Text style={[styles.dayName, { color: selectedDay === index ? '#fff' : theme.textMuted }]}>
                {day}
              </Text>
              <Text style={[styles.dayDate, { color: selectedDay === index ? '#fff' : theme.text }]}>
                {weekDates[index]}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Routine actions */}
        <View style={styles.routineRow}>
          <TouchableOpacity
            style={[styles.routineBtn, { backgroundColor: theme.surface }]}
            onPress={saveAsRoutine}
          >
            <Text style={[styles.routineBtnText, { color: theme.textMuted }]}>💾 Save as routine</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.routineBtn, { backgroundColor: theme.surface }]}
            onPress={resetDailyTasks}
          >
            <Text style={[styles.routineBtnText, { color: theme.textMuted }]}>🔁 Reset to routine</Text>
          </TouchableOpacity>
        </View>

        {/* Routine info */}
        {defaultRoutine.length > 0 && (
          <View style={[styles.routineInfo, { backgroundColor: theme.accent }]}>
            <Text style={[styles.routineInfoText, { color: theme.textMuted }]}>
              🌸 Your routine has {defaultRoutine.length} tasks — reset anytime to reload it
            </Text>
          </View>
        )}

        {/* Add button */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>
            {selectedDay === (today.getDay() === 0 ? 6 : today.getDay() - 1) ? "Today's tasks" : `${DAYS[selectedDay]}'s tasks`}
          </Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={[styles.addBtn, { backgroundColor: theme.primary }]}
          >
            <Text style={styles.addBtnText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        {/* Tasks list */}
        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: theme.textMuted }]}>No tasks yet 🌸</Text>
            <Text style={[styles.emptySubText, { color: theme.textMuted }]}>
              Add tasks or reset to your routine
            </Text>
          </View>
        ) : (
          <View style={styles.tasksList}>
            {tasks.map((task) => (
              <View key={task.id} style={[styles.taskRow, { backgroundColor: theme.surface }]}>
                <TouchableOpacity
                  style={[styles.checkbox, { borderColor: task.done ? theme.primary : theme.textMuted, backgroundColor: task.done ? theme.primary : 'transparent' }]}
                  onPress={() => toggleTask(task.id)}
                >
                  {task.done && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
                <View style={styles.taskInfo}>
                  <Text style={[styles.taskName, { color: task.done ? theme.textMuted : theme.text }, task.done && styles.strikethrough]}>
                    {task.emoji} {task.name}
                  </Text>
                  <Text style={[styles.taskTime, { color: theme.textMuted }]}>
                    {task.startTime}{task.endTime ? ` – ${task.endTime}` : ''}
                    {task.isRoutine ? ' · 🔁 Routine' : ''}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => deleteTask(task.id)}>
                  <Text style={[styles.deleteBtn, { color: theme.textMuted }]}>✕</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

      </ScrollView>

      <AddTaskModal visible={modalVisible} onClose={() => setModalVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontSize: 26, fontWeight: '500' },
  subtitle: { fontSize: 13, marginTop: 2 },
  weekRow: { paddingLeft: 16, marginBottom: 16 },
  dayBtn: { alignItems: 'center', padding: 10, borderRadius: 14, marginRight: 8, minWidth: 48 },
  dayName: { fontSize: 11, fontWeight: '500' },
  dayDate: { fontSize: 16, fontWeight: '500', marginTop: 2 },
  routineRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginBottom: 12 },
  routineBtn: { flex: 1, borderRadius: 12, padding: 10, alignItems: 'center' },
  routineBtnText: { fontSize: 12, fontWeight: '500' },
  routineInfo: { marginHorizontal: 16, borderRadius: 12, padding: 12, marginBottom: 16 },
  routineInfoText: { fontSize: 12 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10 },
  sectionTitle: { fontSize: 11, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.5 },
  addBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  addBtnText: { color: '#fff', fontSize: 13, fontWeight: '500' },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 16 },
  emptySubText: { fontSize: 13, marginTop: 6 },
  tasksList: { paddingHorizontal: 16, paddingBottom: 30, gap: 8 },
  taskRow: { flexDirection: 'row', alignItems: 'center', borderRadius: 14, padding: 14, gap: 12 },
  checkbox: { width: 22, height: 22, borderRadius: 11, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center' },
  checkmark: { color: '#fff', fontSize: 12, fontWeight: '500' },
  taskInfo: { flex: 1 },
  taskName: { fontSize: 14, fontWeight: '500' },
  taskTime: { fontSize: 12, marginTop: 2 },
  strikethrough: { textDecorationLine: 'line-through' },
  deleteBtn: { fontSize: 16, padding: 4 },
});