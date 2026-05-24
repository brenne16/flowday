import { View, Text, StyleSheet } from 'react-native';
import useThemeStore from '../../store/useThemeStore';

export default function ProfileScreen() {
  const theme = useThemeStore((state) => state.theme);
  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.text, { color: theme.text }]}>👤 Profile</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  text: { fontSize: 24, fontWeight: '500' },
});