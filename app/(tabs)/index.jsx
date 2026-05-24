import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useThemeStore from '../../store/useThemeStore';

export default function HomeScreen() {
  const theme = useThemeStore((state) => state.theme);

  const tasks = [
    { id: 1, time: '7:00', endTime: '7:30', name: 'Wake up & morning routine', emoji: '☀️', done: true },
    { id: 2, time: '9:00', endTime: '11:30', name: 'Study session', emoji: '📚', done: false, active: true },
    { id: 3, time: '12:00', endTime: '13:00', name: 'Lunch', emoji: '🥗', done: false },
    { id: 4, time: '14:00', endTime: '15:00', name: 'Sport', emoji: '🏃‍♀️', done: false },
  ];

  const habits = [
    { id: 1, name: 'Water 1L', done: true },
    { id: 2, name: '10 000 steps', done: true },
    { id: 3, name: 'Meditation', done: false },
  ];

  const doneTasks = tasks.filter((t) => t.done).length;
  const progress = doneTasks / tasks.length;

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.greeting, { color: theme.textMuted }]}>Good morning ✨</Text>
          <Text style={[styles.name, { color: theme.text }]}>Yasmine</Text>
          <View style={[styles.dateChip, { backgroundColor: theme.accent }]}>
            <Text style={[styles.dateText, { color: theme.textMuted }]}>
              Saturday · Week 4
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
          <Text style={styles.progressPct}>{doneTasks}/{tasks.length} tasks · {Math.round(progress * 100)}%</Text>
        </View>

        {/* Habits */}
        <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>Today's habits</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.habitsRow}>
          {habits.map((habit) => (
            <View key={habit.id} style={[styles.habitChip, { backgroundColor: theme.surface }]}>
              <View style={[styles.habitDot, { backgroundColor: habit.done ? theme.primary : theme.accent }]} />
              <Text style={[styles.habitText, { color: habit.done ? theme.textMuted : theme.accent }]}>
                {habit.name}
              </Text>
            </View>
          ))}
        </ScrollView>

        {/* Timeline */}
        <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>Today's schedule</Text>
        <View style={styles.timeline}>
          {tasks.map((task) => (
            <View key={task.id} style={styles.timeBlock}>
              <View style={styles.timeCol}>
                <Text style={[styles.timeLabel, { color: theme.textMuted }]}>{task.time}</Text>
                <View style={[styles.timeLine, { backgroundColor: theme.accent }]} />
              </View>
              <View style={[
                styles.taskCard,
                { backgroundColor: task.active ? theme.background : theme.surface },
                task.active && { borderWidth: 1.5, borderColor: theme.primary },
              ]}>
                <View style={[
                  styles.taskDot,
                  { backgroundColor: task.done || task.active ? theme.primary : theme.accent }
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
                    {task.time} – {task.endTime}{task.active ? ' · In progress' : ''}
                  </Text>
                </View>
                <Text style={styles.taskEmoji}>{task.emoji}</Text>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>
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
  sectionTitle: { fontSize: 11, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.5, paddingHorizontal: 20, marginBottom: 10 },
  habitsRow: { paddingLeft: 16, marginBottom: 20 },
  habitChip: { borderRadius: 20, paddingHorizontal: 14, paddingVertical: 8, marginRight: 8, flexDirection: 'row', alignItems: 'center', gap: 6 },
  habitDot: { width: 8, height: 8, borderRadius: 4 },
  habitText: { fontSize: 12, fontWeight: '500' },
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