import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import useThemeStore from '../../store/useThemeStore';
import useTaskStore from '../../store/useTaskStore';

const TEMPLATES = [
  {
    id: 1,
    name: 'Morning routine',
    emoji: '☀️',
    tasks: [
      { name: 'Wake up', emoji: '☀️', startTime: '07:00', endTime: '07:10' },
      { name: 'Skincare', emoji: '✨', startTime: '07:10', endTime: '07:25' },
      { name: 'Breakfast', emoji: '🥣', startTime: '07:25', endTime: '07:45' },
    ],
  },
  {
    id: 2,
    name: 'Study session',
    emoji: '📚',
    tasks: [
      { name: 'Review notes', emoji: '📝', startTime: '09:00', endTime: '09:30' },
      { name: 'Deep work', emoji: '💻', startTime: '09:30', endTime: '11:00' },
      { name: 'Short break', emoji: '☕', startTime: '11:00', endTime: '11:15' },
    ],
  },
  {
    id: 3,
    name: 'Self care evening',
    emoji: '🌙',
    tasks: [
      { name: 'Skincare routine', emoji: '🧴', startTime: '20:00', endTime: '20:20' },
      { name: 'Reading', emoji: '📖', startTime: '20:20', endTime: '21:00' },
      { name: 'Meditation', emoji: '🧘‍♀️', startTime: '21:00', endTime: '21:15' },
    ],
  },
  {
    id: 4,
    name: 'Workout',
    emoji: '💪',
    tasks: [
      { name: 'Warm up', emoji: '🤸‍♀️', startTime: '07:00', endTime: '07:15' },
      { name: 'Training', emoji: '💪', startTime: '07:15', endTime: '08:00' },
      { name: 'Stretch & cool down', emoji: '🧘‍♀️', startTime: '08:00', endTime: '08:15' },
    ],
  },
  {
    id: 5,
    name: 'Grocery list',
    emoji: '🛒',
    tasks: [
      { name: 'Make shopping list', emoji: '📝', startTime: '10:00', endTime: '10:10' },
      { name: 'Go grocery shopping', emoji: '🛒', startTime: '10:30', endTime: '11:30' },
      { name: 'Meal prep', emoji: '🥗', startTime: '12:00', endTime: '13:00' },
    ],
  },
];

const POST_CATEGORIES = ['Routine', 'Beauty tip', 'Self care', 'Nutrition', 'Motivation'];

export default function AddScreen() {
  const theme = useThemeStore((state) => state.theme);
  const addTask = useTaskStore((state) => state.addTask);

  const [activeTab, setActiveTab] = useState('templates');
  const [postContent, setPostContent] = useState('');
  const [postCategory, setPostCategory] = useState('Routine');

  const applyTemplate = async (template) => {
    for (const task of template.tasks) {
      await addTask({ ...task, isRoutine: false });
    }
    Alert.alert('Done! 🌸', `${template.tasks.length} tasks from "${template.name}" added to your day.`);
  };

  const handleSharePost = () => {
    if (!postContent.trim()) {
      Alert.alert('Oops!', 'Write something before sharing 😊');
      return;
    }
    Alert.alert('Shared! 🌸', 'Your post has been shared with the community.');
    setPostContent('');
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>Create</Text>
        <Text style={[styles.subtitle, { color: theme.textMuted }]}>
          Templates & community posts
        </Text>
      </View>

      {/* Tabs */}
      <View style={[styles.tabs, { backgroundColor: theme.surface }]}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'templates' && { backgroundColor: theme.primary }]}
          onPress={() => setActiveTab('templates')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'templates' ? '#fff' : theme.textMuted }]}>
            📋 Templates
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'share' && { backgroundColor: theme.primary }]}
          onPress={() => setActiveTab('share')}
        >
          <Text style={[styles.tabText, { color: activeTab === 'share' ? '#fff' : theme.textMuted }]}>
            ✨ Share tip
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>

        {activeTab === 'templates' ? (
          <View style={styles.content}>
            <Text style={[styles.sectionHint, { color: theme.textMuted }]}>
              Tap a template to instantly add it to your day 👇
            </Text>
            {TEMPLATES.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={[styles.templateCard, { backgroundColor: theme.surface }]}
                onPress={() => applyTemplate(template)}
              >
                <View style={styles.templateHeader}>
                  <Text style={styles.templateEmoji}>{template.emoji}</Text>
                  <View style={styles.templateInfo}>
                    <Text style={[styles.templateName, { color: theme.text }]}>{template.name}</Text>
                    <Text style={[styles.templateCount, { color: theme.textMuted }]}>
                      {template.tasks.length} tasks
                    </Text>
                  </View>
                  <View style={[styles.addChip, { backgroundColor: theme.accent }]}>
                    <Text style={[styles.addChipText, { color: theme.textMuted }]}>+ Add all</Text>
                  </View>
                </View>
                <View style={styles.templateTasks}>
                  {template.tasks.map((task, i) => (
                    <View key={i} style={styles.templateTask}>
                      <Text style={styles.templateTaskEmoji}>{task.emoji}</Text>
                      <Text style={[styles.templateTaskName, { color: theme.textMuted }]}>{task.name}</Text>
                      <Text style={[styles.templateTaskTime, { color: theme.textMuted }]}>{task.startTime}</Text>
                    </View>
                  ))}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={styles.content}>
            <Text style={[styles.sectionHint, { color: theme.textMuted }]}>
              Share a tip or routine with the community 🌸
            </Text>

            {/* Category picker */}
            <Text style={[styles.label, { color: theme.text }]}>Category</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
              {POST_CATEGORIES.map((cat) => (
                <TouchableOpacity
                  key={cat}
                  onPress={() => setPostCategory(cat)}
                  style={[
                    styles.categoryChip,
                    { backgroundColor: postCategory === cat ? theme.primary : theme.surface },
                  ]}
                >
                  <Text style={[
                    styles.categoryText,
                    { color: postCategory === cat ? '#fff' : theme.textMuted },
                  ]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Post content */}
            <Text style={[styles.label, { color: theme.text }]}>Your tip or routine</Text>
            <TextInput
              style={[styles.postInput, { backgroundColor: theme.surface, color: theme.text, borderColor: theme.accent }]}
              placeholder="Share something that helped you... 🌟"
              placeholderTextColor={theme.textMuted}
              value={postContent}
              onChangeText={setPostContent}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
            />

            <TouchableOpacity
              style={[styles.shareBtn, { backgroundColor: theme.primary }]}
              onPress={handleSharePost}
            >
              <Text style={styles.shareBtnText}>Share with community 🌸</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { padding: 20, paddingBottom: 12 },
  title: { fontSize: 26, fontWeight: '500' },
  subtitle: { fontSize: 13, marginTop: 2 },
  tabs: { flexDirection: 'row', marginHorizontal: 16, borderRadius: 14, padding: 4, marginBottom: 8 },
  tab: { flex: 1, paddingVertical: 10, borderRadius: 10, alignItems: 'center' },
  tabText: { fontSize: 13, fontWeight: '500' },
  content: { padding: 16, paddingBottom: 40 },
  sectionHint: { fontSize: 13, marginBottom: 16 },
  templateCard: { borderRadius: 16, padding: 16, marginBottom: 12 },
  templateHeader: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 12 },
  templateEmoji: { fontSize: 28 },
  templateInfo: { flex: 1 },
  templateName: { fontSize: 15, fontWeight: '500' },
  templateCount: { fontSize: 12, marginTop: 2 },
  addChip: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  addChipText: { fontSize: 12, fontWeight: '500' },
  templateTasks: { gap: 6 },
  templateTask: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  templateTaskEmoji: { fontSize: 14 },
  templateTaskName: { flex: 1, fontSize: 13 },
  templateTaskTime: { fontSize: 12 },
  label: { fontSize: 14, fontWeight: '500', marginBottom: 10 },
  categoryRow: { marginBottom: 16 },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  categoryText: { fontSize: 13, fontWeight: '500' },
  postInput: { borderRadius: 14, borderWidth: 1, padding: 14, fontSize: 14, minHeight: 120, marginBottom: 16 },
  shareBtn: { borderRadius: 14, padding: 16, alignItems: 'center' },
  shareBtnText: { color: '#fff', fontSize: 15, fontWeight: '500' },
});