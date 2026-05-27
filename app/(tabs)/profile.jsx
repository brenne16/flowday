import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useThemeStore from '../../store/useThemeStore';
import { themes } from '../../constants/theme';

export default function ProfileScreen() {
  const { theme, themeName, setTheme } = useThemeStore();

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: theme.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Header */}
        <View style={styles.header}>
          <View style={[styles.avatar, { backgroundColor: theme.primary }]}>
            <Text style={styles.avatarText}>Y</Text>
          </View>
          <Text style={[styles.name, { color: theme.text }]}>Yasmine</Text>
          <Text style={[styles.subtitle, { color: theme.textMuted }]}>Building better habits 🌸</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Text style={[styles.statNumber, { color: theme.text }]}>12</Text>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>Day streak</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Text style={[styles.statNumber, { color: theme.text }]}>87%</Text>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>Completion</Text>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.surface }]}>
            <Text style={[styles.statNumber, { color: theme.text }]}>24</Text>
            <Text style={[styles.statLabel, { color: theme.textMuted }]}>Habits</Text>
          </View>
        </View>

        {/* Theme picker */}
        <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>App theme</Text>
        <View style={styles.themesGrid}>
          {Object.entries(themes).map(([key, t]) => (
            <TouchableOpacity
              key={key}
              onPress={() => setTheme(key)}
              style={[
                styles.themeCard,
                { backgroundColor: t.background, borderColor: t.primary },
                themeName === key && { borderWidth: 2.5 },
                themeName !== key && { borderWidth: 1, borderColor: t.accent },
              ]}
            >
              <View style={styles.themePreview}>
                <View style={[styles.themeCircle, { backgroundColor: t.primary }]} />
                <View style={[styles.themeCircle, { backgroundColor: t.secondary }]} />
                <View style={[styles.themeCircle, { backgroundColor: t.accent }]} />
              </View>
              <Text style={[styles.themeName, { color: t.text }]}>{t.name}</Text>
              {themeName === key && (
                <Text style={[styles.themeCheck, { color: t.primary }]}>✓</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Settings */}
        <Text style={[styles.sectionTitle, { color: theme.textMuted }]}>Settings</Text>
        <View style={[styles.settingsCard, { backgroundColor: theme.surface }]}>
          {[
            { icon: '🔔', label: 'Notifications' },
            { icon: '🔁', label: 'Daily routine reset' },
            { icon: '🌙', label: 'Dark mode' },
            { icon: '📤', label: 'Export my data' },
          ].map((item, index, arr) => (
            <TouchableOpacity
              key={item.label}
              style={[
                styles.settingsItem,
                index < arr.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.accent },
              ]}
            >
              <Text style={styles.settingsIcon}>{item.icon}</Text>
              <Text style={[styles.settingsLabel, { color: theme.text }]}>{item.label}</Text>
              <Text style={[styles.settingsArrow, { color: theme.textMuted }]}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { alignItems: 'center', padding: 24, paddingBottom: 16 },
  avatar: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  avatarText: { fontSize: 28, fontWeight: '500', color: '#fff' },
  name: { fontSize: 22, fontWeight: '500' },
  subtitle: { fontSize: 13, marginTop: 4 },
  statsRow: { flexDirection: 'row', gap: 10, paddingHorizontal: 16, marginBottom: 24 },
  statCard: { flex: 1, borderRadius: 14, padding: 14, alignItems: 'center' },
  statNumber: { fontSize: 22, fontWeight: '500' },
  statLabel: { fontSize: 11, marginTop: 2 },
  sectionTitle: { fontSize: 11, fontWeight: '500', textTransform: 'uppercase', letterSpacing: 0.5, paddingHorizontal: 20, marginBottom: 12 },
  themesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, paddingHorizontal: 16, marginBottom: 24 },
  themeCard: { width: '47%', borderRadius: 14, padding: 14 },
  themePreview: { flexDirection: 'row', gap: 6, marginBottom: 8 },
  themeCircle: { width: 18, height: 18, borderRadius: 9 },
  themeName: { fontSize: 13, fontWeight: '500' },
  themeCheck: { fontSize: 16, marginTop: 4 },
  settingsCard: { marginHorizontal: 16, borderRadius: 16, marginBottom: 30, overflow: 'hidden' },
  settingsItem: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 12 },
  settingsIcon: { fontSize: 18 },
  settingsLabel: { flex: 1, fontSize: 15 },
  settingsArrow: { fontSize: 20 },
});