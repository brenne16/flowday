import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useState } from 'react';
import useThemeStore from '../../store/useThemeStore';
import useTaskStore from '../../store/useTaskStore';
import AddTaskModal from '../../components/AddTaskModal';

export default function HomeScreen() {
  const theme = useThemeStore((state) => state.theme);
  const { tasks, toggleTask, deleteTask, loadTasks } = useTaskStore();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    loadTasks();
  }, []);

  const doneTasks = tasks.filter((t) => t.done).length;
  const progress = tasks.length > 0 ? doneTasks / tasks.length : 0;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: theme.textMuted }]}>Good morning ✨</Text>
          <Text style={[styles.name, { color: theme.text }]}>Yasmine</Text>
          <View style={[styles.dateChip, { backgroundColor: theme.accent }]}>
            <Text style={[styles.dateText, { color: theme.textMuted }]}>
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </Text>
          </View>
        </View>

        {/* Progress card */}
        <View style={[styles.progressCard, { backgroundColor: theme.primary }]}>
          <Text style={styles.progressLabel}>Today's goal</Text>
          <Text style={styles.progressTitle}>Complete your routine</Text>
          <View style={styles.progressBarBg}>
            <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
          </View>
          <Text style={styles.progressPct}>
            {doneTasks}/{tasks.length} tasks · {Math.round(progress * 100)}%
          </Text>
        </View>

        {/* Timeline */}
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>Today's schedule</Text>
          <TouchableOpacity
            onPress={() => setModalVisible(true)}
            style={[styles.addBtn, { backgroundColor: theme.primary }]}
          >
            <Text style={styles.addBtnText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        {tasks.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={[styles.emptyText, { color: theme.textMuted }]}>
              No tasks yet — add your first task ! 🌸
            </Text>
          </View>
        ) : (
          <View style={styles.timeline}>
            {tasks.map((task) => (
              <View key={task.id} style={styles.timeBlock}>
                <View style={styles.timeCol}>
                  <Text style={[styles.timeLabel, { color: theme.textMuted }]}>{task.startTime}</Text>
                  <View style={[styles.timeLine, { backgroundColor: theme.accent }]} />
                </View>
                <TouchableOpacity
                  style={[
                    styles.taskCard,
                    { backgroundColor: task.done ? theme.surface : theme.background },
                    !task.done && { borderWidth: 1, borderColor: theme.accent },
                  ]}
                  onPress={() => toggleTask(task.id)}
                  onLongPress={() => deleteTask(task.id)}
                >
                  <View style={[
                    styles.taskDot,
                    { backgroundColor: task.done ? theme.primary : theme.accent }
                  ]} />
                  <View style={styles.taskInfo}>
                    <Text style={[
                      styles.taskName,
                      { color: task.done ? theme.textMuted : theme.text },
                      task.done && styles.strikethrough,
                    ]}>
                      {task.name}
                    </Text>
                    <Text style={[styles.taskSub, { color: theme.textMuted }]}>
                      {task.startTime}{task.endTime ? ` – ${task.endTime}` : ''}
                    </Text>
                  </View>
                  <Text style={styles.taskEmoji}>{task.emoji}</Text>
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
  greeting: { fontSize: 13 },
  name: { fontSize: 26, fontWeight: '500', marginTop: 2 },
  dateChip: { alignSelf: 'flex-start', paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20, marginTop: 6 },
  dateText: { fontSize: 12 },
  progressCard: { marginHorizontal: 16, borderRadius: 18, padding: 16, marginBottom: 20 },
  progressLabel: { fontSize: 12, color: '#fff', opacity: 0.85 },
  progressTitle: { fontSize: 16, fontWeight: '500', color: '#fff', marginVertical: 4 },
  progressBarBg: { backgroundColor: 'rgba(255,255,255,0.35)', borderRadius: 10, height: 6 },
  progressBarFill: { backgroundColor: '#fff', borderRadius: 10, height: 6 },
  progressPct: { fontSize: 11, color: '#fff', marginTop: 6, opacity: 0.9 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 10 },
  sectionTitle: { fontSize: 11, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.5 },
  addBtn: { paddingHorizontal: 14, paddingVertical: 6, borderRadius: 20 },
  addBtnText: { color: '#fff', fontSize: 13, fontWeight: '500' },
  emptyState: { alignItems: 'center', paddingVertical: 40 },
  emptyText: { fontSize: 14 },
  timeline: { paddingHorizontal: 16, paddingBottom: 30 },
  timeBlock: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  timeCol: { width: 36, alignItems: 'center' },
  timeLabel: { fontSize: 10, fontWeight: '500' },
  timeLine: { flex: 1, width: 1.5, marginVertical: 4 },
  taskCard: { flex: 1, borderRadius: 12, padding: 12, flexDirection: 'row', alignItems: 'center', gap: 10 },
  taskDot: { width: 8, height: 8, borderRadius: 4, flexShrink: 0 },
  taskInfo: { flex: 1 },
  taskName: { fontSize: 13, fontWeight: '500' },
  taskSub: { fontSize: 11, marginTop: 2 },
  taskEmoji: { fontSize: 18 },
  strikethrough: { textDecorationLine: 'line-through' },
});