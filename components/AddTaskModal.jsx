import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { useState } from 'react';
import useThemeStore from '../store/useThemeStore';
import useTaskStore from '../store/useTaskStore';

const EMOJIS = ['📌', '📚', '🏃‍♀️', '🥗', '💆‍♀️', '☀️', '🛒', '💪', '🎨', '💻', '🧘‍♀️', '😴'];

export default function AddTaskModal({ visible, onClose }) {
  const theme = useThemeStore((state) => state.theme);
  const addTask = useTaskStore((state) => state.addTask);

  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [emoji, setEmoji] = useState('📌');
  const [isRoutine, setIsRoutine] = useState(false);

  const handleAdd = async () => {
    if (!name || !startTime) return;
    await addTask({ name, startTime, endTime, emoji, isRoutine });
    setName('');
    setStartTime('');
    setEndTime('');
    setEmoji('📌');
    setIsRoutine(false);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.overlay}
      >
        <View style={[styles.sheet, { backgroundColor: theme.background }]}>

          <Text style={[styles.title, { color: theme.text }]}>New task</Text>

          {/* Emoji picker */}
          <View style={styles.emojiRow}>
            {EMOJIS.map((e) => (
              <TouchableOpacity
                key={e}
                onPress={() => setEmoji(e)}
                style={[styles.emojiBtn, emoji === e && { backgroundColor: theme.accent }]}
              >
                <Text style={styles.emojiText}>{e}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Task name */}
          <TextInput
            style={[styles.input, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.accent }]}
            placeholder="Task name..."
            placeholderTextColor={theme.textMuted}
            value={name}
            onChangeText={setName}
          />

          {/* Time inputs */}
          <View style={styles.timeRow}>
            <TextInput
              style={[styles.timeInput, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.accent }]}
              placeholder="Start (09:00)"
              placeholderTextColor={theme.textMuted}
              value={startTime}
              onChangeText={setStartTime}
              keyboardType="numbers-and-punctuation"
            />
            <Text style={[styles.timeSep, { color: theme.textMuted }]}>→</Text>
            <TextInput
              style={[styles.timeInput, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.accent }]}
              placeholder="End (10:00)"
              placeholderTextColor={theme.textMuted}
              value={endTime}
              onChangeText={setEndTime}
              keyboardType="numbers-and-punctuation"
            />
          </View>

          {/* Routine toggle */}
          <TouchableOpacity
            style={[styles.routineBtn, { backgroundColor: isRoutine ? theme.primary : theme.surface, borderColor: theme.accent }]}
            onPress={() => setIsRoutine(!isRoutine)}
          >
            <Text style={[styles.routineText, { color: isRoutine ? '#fff' : theme.textMuted }]}>
              🔁 Add to daily routine
            </Text>
          </TouchableOpacity>

          {/* Buttons */}
          <View style={styles.btnRow}>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: theme.surface }]}
              onPress={onClose}
            >
              <Text style={[styles.btnText, { color: theme.textMuted }]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: theme.primary }]}
              onPress={handleAdd}
            >
              <Text style={[styles.btnText, { color: '#fff' }]}>Add task</Text>
            </TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.3)' },
  sheet: { borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, paddingBottom: 40 },
  title: { fontSize: 18, fontWeight: '500', marginBottom: 16 },
  emojiRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  emojiBtn: { padding: 8, borderRadius: 10 },
  emojiText: { fontSize: 22 },
  input: { borderRadius: 12, borderWidth: 1, padding: 12, fontSize: 15, marginBottom: 12 },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
  timeInput: { flex: 1, borderRadius: 12, borderWidth: 1, padding: 12, fontSize: 14 },
  timeSep: { fontSize: 16 },
  routineBtn: { borderRadius: 12, borderWidth: 1, padding: 12, alignItems: 'center', marginBottom: 16 },
  routineText: { fontSize: 14, fontWeight: '500' },
  btnRow: { flexDirection: 'row', gap: 10 },
  btn: { flex: 1, borderRadius: 12, padding: 14, alignItems: 'center' },
  btnText: { fontSize: 15, fontWeight: '500' },
});