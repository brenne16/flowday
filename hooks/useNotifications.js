import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function requestNotificationPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === 'granted';
}

export async function scheduleTaskNotification(task) {
  if (!task.startTime) return;

  const [hours, minutes] = task.startTime.split(':').map(Number);

  const now = new Date();
  const trigger = new Date();
  trigger.setHours(hours);
  trigger.setMinutes(minutes - 10);
  trigger.setSeconds(0);

  if (trigger <= now) return;

  await Notifications.scheduleNotificationAsync({
    content: {
      title: `⏰ Coming up in 10 min`,
      body: `${task.emoji} ${task.name} starts at ${task.startTime}`,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: trigger,
    },
  });
}

export async function cancelAllNotifications() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

export async function scheduleAllTaskNotifications(tasks) {
  await cancelAllNotifications();
  for (const task of tasks) {
    if (!task.done) {
      await scheduleTaskNotification(task);
    }
  }
}