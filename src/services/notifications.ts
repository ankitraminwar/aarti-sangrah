import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowList: true,
  }),
});

type Lang = "hi" | "mr" | "en";

const FIXED_SLOTS: {
  id: string;
  hour: number;
  minute: number;
  content: Record<Lang, { title: string; body: string }>;
}[] = [
  {
    id: "aarti-morning",
    hour: 6,
    minute: 0,
    content: {
      hi: { title: "🌅 सुप्रभात आरती", body: "नए दिन की शुरुआत पवित्र आरती से करें।" },
      mr: { title: "🌅 सुप्रभात आरती", body: "नवीन दिवसाची सुरुवात पवित्र आरतीने करा." },
      en: { title: "🌅 Morning Aarti", body: "Start your day with a sacred aarti." },
    },
  },
  {
    id: "aarti-afternoon",
    hour: 12,
    minute: 0,
    content: {
      hi: { title: "☀️ दोपहर की आरती", body: "दिन के बीच में एक पल भक्ति के लिए।" },
      mr: { title: "☀️ दुपारची आरती", body: "दिवसाच्या मध्यभागी एक क्षण भक्तीसाठी." },
      en: {
        title: "☀️ Afternoon Aarti",
        body: "Take a moment for devotion in the middle of your day.",
      },
    },
  },
  {
    id: "aarti-evening",
    hour: 18,
    minute: 0,
    content: {
      hi: { title: "🌇 संध्या आरती", body: "शाम की आरती के साथ दिन को आशीर्वाद दें।" },
      mr: { title: "🌇 सायंकाळची आरती", body: "संध्याकाळच्या आरतीने दिवसाला आशीर्वाद द्या." },
      en: { title: "🌇 Evening Aarti", body: "Bless your evening with a devotional aarti." },
    },
  },
  {
    id: "aarti-night",
    hour: 21,
    minute: 0,
    content: {
      hi: { title: "🌙 शुभ रात्रि!", body: "रात की शांति में एक आरती पढ़ें और मन को सुकून दें।" },
      mr: {
        title: "🌙 शुभ रात्री!",
        body: "रात्रीच्या शांततेत एक आरती वाचा आणि मनाला शांती द्या.",
      },
      en: { title: "🌙 Good Night!", body: "Wind down with a calming aarti before you rest." },
    },
  },
];

const RANDOM_CONTENT: Record<Lang, { title: string; body: string }> = {
  hi: { title: "🕉️ आज की विशेष आरती", body: "आरती संग्रह में आज की अनुशंसित आरती देखें।" },
  mr: { title: "🕉️ आजची विशेष आरती", body: "आरती संग्रहात आजची शिफारस केलेली आरती पहा." },
  en: {
    title: "🕉️ Today's Recommended Aarti",
    body: "Check out today's featured aarti in Aarti Sangrah.",
  },
};

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === "web") return false;
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  if (existingStatus === "granted") return true;
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

/**
 * Requests permission and, if granted, schedules all daily notifications:
 * morning (6 AM), afternoon (12 PM), evening (6 PM), night (9 PM),
 * and a random recommendation at a random time between 6 AM – 9 PM.
 * Safe to call multiple times — cancels previous notifications first.
 */
export async function scheduleAllNotifications(lang: Lang = "hi"): Promise<boolean> {
  if (Platform.OS === "web") return false;

  const granted = await requestNotificationPermission();
  if (!granted) return false;

  await Notifications.cancelAllScheduledNotificationsAsync();

  for (const slot of FIXED_SLOTS) {
    const { title, body } = slot.content[lang];
    await Notifications.scheduleNotificationAsync({
      identifier: slot.id,
      content: { title, body, sound: true },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: slot.hour,
        minute: slot.minute,
      },
    });
  }

  // Random recommendation — random hour between 6 and 20 (inclusive), random minute
  const randomHour = 6 + Math.floor(Math.random() * 15); // 6..20
  const randomMinute = Math.floor(Math.random() * 60);
  const { title, body } = RANDOM_CONTENT[lang];
  await Notifications.scheduleNotificationAsync({
    identifier: "aarti-random",
    content: { title, body, sound: true },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: randomHour,
      minute: randomMinute,
    },
  });

  return true;
}

export async function cancelAllNotifications(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
