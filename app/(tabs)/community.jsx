import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import useThemeStore from '../../store/useThemeStore';
import useTaskStore from '../../store/useTaskStore';

const POSTS = [
  {
    id: 1,
    user: 'Sarah',
    avatar: 'S',
    time: '2h ago',
    category: 'Routine',
    content: 'My morning routine changed my life 🌅 Wake up at 6am, 10min meditation, journaling then a walk. I feel so much more productive!',
    likes: 24,
    tips: ['🧘‍♀️ 10min meditation', '📓 Journaling', '🚶‍♀️ Morning walk'],
  },
  {
    id: 2,
    user: 'Amina',
    avatar: 'A',
    time: '4h ago',
    category: 'Beauty tip',
    content: 'Did you know drinking clove tea helps with body odor? 🌿 I drink one cup every morning and it works amazingly!',
    likes: 18,
    tips: ['☕ Clove tea every morning'],
  },
  {
    id: 3,
    user: 'Léa',
    avatar: 'L',
    time: '6h ago',
    category: 'Self care',
    content: 'Walking 10,000 steps a day transformed my energy levels 💪 I started 3 weeks ago and I sleep so much better now!',
    likes: 31,
    tips: ['👟 10 000 steps daily'],
  },
];

const CATEGORIES = ['All', 'Routine', 'Beauty tip', 'Self care', 'Nutrition', 'Motivation'];

export default function CommunityScreen() {
  const theme = useThemeStore((state) => state.theme);
  const addTask = useTaskStore((state) => state.addTask);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedPosts, setLikedPosts] = useState([]);

  const filteredPosts = selectedCategory === 'All'
    ? POSTS
    : POSTS.filter((p) => p.category === selectedCategory);

  const toggleLike = (id) => {
    setLikedPosts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const addTipToRoutine = async (tip) => {
    const parts = tip.split(' ');
    const emoji = parts[0];
    const name = parts.slice(1).join(' ').trim();
    await addTask({
      name: name || tip,
      emoji,
      startTime: '08:00',
      endTime: '',
      isRoutine: true,
    });
    Alert.alert('Added! 🌸', `"${name}" has been added to your routine.`);
  };

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>Community</Text>
          <Text style={[styles.subtitle, { color: theme.textMuted }]}>
            Share your routines & tips 🌸
          </Text>
        </View>

        {/* Search bar */}
        <View style={[styles.searchBar, { backgroundColor: theme.surface }]}>
          <Text style={[styles.searchIcon, { color: theme.textMuted }]}>🔍</Text>
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search tips, routines..."
            placeholderTextColor={theme.textMuted}
          />
        </View>

        {/* Categories */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesRow}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setSelectedCategory(cat)}
              style={[
                styles.categoryChip,
                { backgroundColor: selectedCategory === cat ? theme.primary : theme.surface },
              ]}
            >
              <Text style={[
                styles.categoryText,
                { color: selectedCategory === cat ? '#fff' : theme.textMuted },
              ]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Posts */}
        <View style={styles.posts}>
          {filteredPosts.map((post) => (
            <View key={post.id} style={[styles.postCard, { backgroundColor: theme.surface }]}>

              {/* Post header */}
              <View style={styles.postHeader}>
                <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
                  <Text style={styles.avatarText}>{post.avatar}</Text>
                </View>
                <View style={styles.postMeta}>
                  <Text style={[styles.postUser, { color: theme.text }]}>{post.user}</Text>
                  <Text style={[styles.postTime, { color: theme.textMuted }]}>{post.time}</Text>
                </View>
                <View style={[styles.categoryBadge, { backgroundColor: theme.accent }]}>
                  <Text style={[styles.categoryBadgeText, { color: theme.textMuted }]}>
                    {post.category}
                  </Text>
                </View>
              </View>

              {/* Post content */}
              <Text style={[styles.postContent, { color: theme.text }]}>{post.content}</Text>

              {/* Tips */}
              {post.tips && (
                <View style={styles.tipsRow}>
                  {post.tips.map((tip, i) => (
                    <TouchableOpacity
                      key={i}
                      style={[styles.tipChip, { backgroundColor: theme.accent }]}
                      onPress={() => addTipToRoutine(tip)}
                    >
                      <Text style={[styles.tipText, { color: theme.textMuted }]}>{tip} +</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              )}

              {/* Actions */}
              <View style={styles.postActions}>
                <TouchableOpacity
                  style={styles.likeBtn}
                  onPress={() => toggleLike(post.id)}
                >
                  <Text style={styles.likeIcon}>
                    {likedPosts.includes(post.id) ? '❤️' : '🤍'}
                  </Text>
                  <Text style={[styles.likeCount, { color: theme.textMuted }]}>
                    {post.likes + (likedPosts.includes(post.id) ? 1 : 0)}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.addToRoutineBtn, { backgroundColor: theme.accent }]}
                  onPress={() => addTipToRoutine(post.tips[0])}
                >
                  <Text style={[styles.addToRoutineText, { color: theme.textMuted }]}>
                    + Add to my routine
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          ))}
        </View>

      </ScrollView>

      {/* Floating post button */}
      <TouchableOpacity style={[styles.fab, { backgroundColor: theme.primary }]}>
        <Text style={styles.fabText}>+ Share</Text>
      </TouchableOpacity>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { padding: 20, paddingBottom: 8 },
  title: { fontSize: 26, fontWeight: '500' },
  subtitle: { fontSize: 13, marginTop: 2 },
  searchBar: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 16, borderRadius: 14, padding: 12, marginBottom: 16, gap: 8 },
  searchIcon: { fontSize: 16 },
  searchInput: { flex: 1, fontSize: 14 },
  categoriesRow: { paddingLeft: 16, marginBottom: 16 },
  categoryChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  categoryText: { fontSize: 13, fontWeight: '500' },
  posts: { paddingHorizontal: 16, paddingBottom: 100, gap: 12 },
  postCard: { borderRadius: 16, padding: 16 },
  postHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12, gap: 10 },
  avatar: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  avatarText: { color: '#fff', fontWeight: '500', fontSize: 14 },
  postMeta: { flex: 1 },
  postUser: { fontSize: 14, fontWeight: '500' },
  postTime: { fontSize: 11 },
  categoryBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 10 },
  categoryBadgeText: { fontSize: 11, fontWeight: '500' },
  postContent: { fontSize: 14, lineHeight: 20, marginBottom: 12 },
  tipsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  tipChip: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 10 },
  tipText: { fontSize: 12 },
  postActions: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  likeBtn: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  likeIcon: { fontSize: 18 },
  likeCount: { fontSize: 13 },
  addToRoutineBtn: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 10 },
  addToRoutineText: { fontSize: 12, fontWeight: '500' },
  fab: { position: 'absolute', bottom: 24, right: 24, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 24, elevation: 4 },
  fabText: { color: '#fff', fontWeight: '500', fontSize: 14 },
});