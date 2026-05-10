import { getAllAartis } from "@/src/database";
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
  hi: {
    title: "🕉️ आज का विशेष पाठ",
    body: "आरती संग्रह में आज की अनुशंसित आरती, मंत्र या श्लोक देखें।",
  },
  mr: {
    title: "🕉️ आजचे विशेष पाठ",
    body: "आरती संग्रहात आजची शिफारस केलेली आरती, मंत्र किंवा श्लोक पहा.",
  },
  en: {
    title: "🕉️ Today's Recommendation",
    body: "Check out today's featured aarti, mantra or shloka in Aarti Sangrah.",
  },
};

/** Maps the `type` field from the CDN data to a short localized word. */
function getTypeLabel(type: string, lang: Lang): string {
  const t = type.toLowerCase();
  if (lang === "en") {
    if (t === "mantra") return "mantra";
    if (t === "chalisa") return "chalisa";
    if (t === "stotra" || t === "stotram") return "stotra";
    if (t === "stuti") return "stuti";
    if (t === "ashtak") return "ashtakam";
    if (t === "shlok" || t === "shloka") return "shloka";
    if (t === "prayer" || t === "prarthana") return "prayer";
    return "aarti";
  }
  if (lang === "mr") {
    if (t === "mantra") return "मंत्र";
    if (t === "chalisa") return "चाळीसा";
    if (t === "stotra" || t === "stotram") return "स्तोत्र";
    if (t === "stuti") return "स्तुती";
    if (t === "ashtak") return "अष्टक";
    if (t === "shlok" || t === "shloka") return "श्लोक";
    if (t === "prayer" || t === "prarthana") return "प्रार्थना";
    return "आरती";
  }
  // hi (default)
  if (t === "mantra") return "मंत्र";
  if (t === "chalisa") return "चालीसा";
  if (t === "stotra" || t === "stotram") return "स्तोत्र";
  if (t === "stuti") return "स्तुति";
  if (t === "ashtak") return "अष्टक";
  if (t === "shlok" || t === "shloka") return "श्लोक";
  if (t === "prayer" || t === "prarthana") return "प्रार्थना";
  return "आरती";
}

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

  // Load aartis once — used for both morning and weekly slots
  let allAartis: Awaited<ReturnType<typeof getAllAartis>> = [];
  try {
    allAartis = await getAllAartis();
  } catch (err) {
    console.warn("Failed to load aartis for notifications", err);
  }

  // Helper: extract localized title from an aarti row
  const getTitle = (aarti: (typeof allAartis)[0]): string => {
    try {
      const t = JSON.parse(aarti.translationsJson);
      if (t[lang]?.title) return t[lang].title;
    } catch {}
    return aarti.title;
  };

  // Personalize morning slot if we have a morning-tagged aarti
  const morningAarti = allAartis.find((a) => {
    try {
      return (JSON.parse(a.tags) as string[]).includes("morning");
    } catch {
      return false;
    }
  });

  const morningSlot = FIXED_SLOTS.find((s) => s.id === "aarti-morning")!;
  const morningContent = morningAarti
    ? {
        hi: {
          title: `🌅 सुप्रभात — ${getTypeLabel(morningAarti.type, "hi")}`,
          body: `${getTitle(morningAarti)} के साथ दिन की शुरुआत करें। 🙏`,
        },
        mr: {
          title: `🌅 सुप्रभात — ${getTypeLabel(morningAarti.type, "mr")}`,
          body: `${getTitle(morningAarti)} सह दिवसाची सुरुवात करा. 🙏`,
        },
        en: {
          title: `🌅 Good Morning — ${getTypeLabel(morningAarti.type, "en")}`,
          body: `Begin your day with ${getTitle(morningAarti)}. 🙏`,
        },
      }
    : morningSlot.content;

  // Schedule fixed daily slots (morning slot uses dynamic content if available)
  for (const slot of FIXED_SLOTS) {
    const content = slot.id === "aarti-morning" ? morningContent[lang] : slot.content[lang];
    await Notifications.scheduleNotificationAsync({
      identifier: slot.id,
      content: { title: content.title, body: content.body, sound: true },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DAILY,
        hour: slot.hour,
        minute: slot.minute,
      },
    });
  }

  // Dynamic day-of-week slots based on JSON tags
  try {
    const dayTags: Record<string, number> = {
      sunday: 1,
      monday: 2,
      tuesday: 3,
      wednesday: 4,
      thursday: 5,
      friday: 6,
      saturday: 7,
    };

    const scheduledDays = new Set<number>();

    for (const aarti of allAartis) {
      let tagsArr: string[] = [];
      try {
        tagsArr = JSON.parse(aarti.tags);
      } catch {
        continue;
      }

      for (const tag of tagsArr) {
        const lowerTag = tag.toLowerCase();
        if (dayTags[lowerTag]) {
          const weekday = dayTags[lowerTag];

          // Only schedule one notification per weekday to avoid spamming
          if (scheduledDays.has(weekday)) continue;

          const aartiTitle = getTitle(aarti);
          const typeLabel = getTypeLabel(aarti.type, lang);
          const localizedBody =
            lang === "en"
              ? `Today is an auspicious day to read this ${typeLabel}: ${aartiTitle}`
              : lang === "mr"
                ? `आज ${aartiTitle} हा ${typeLabel} वाचण्याचा शुभ दिवस आहे`
                : `आज ${aartiTitle} ${typeLabel} पढ़ने का शुभ दिन है`;

          const weeklyTitle =
            lang === "en"
              ? `🌸 Today's ${typeLabel.charAt(0).toUpperCase() + typeLabel.slice(1)}`
              : lang === "mr"
                ? `🌸 आजचा ${typeLabel}`
                : `🌸 आज का ${typeLabel}`;

          await Notifications.scheduleNotificationAsync({
            identifier: `aarti-weekly-${weekday}-${aarti.id}`,
            content: {
              title: weeklyTitle,
              body: localizedBody,
              sound: true,
            },
            trigger: {
              type: Notifications.SchedulableTriggerInputTypes.WEEKLY,
              weekday,
              hour: 7,
              minute: 30,
            },
          });

          scheduledDays.add(weekday);
        }
      }
    }
  } catch (err) {
    console.warn("Failed to schedule weekly tag-based notifications", err);
  }

  // Random recommendation — random hour between 8 and 20 (inclusive), random minute
  const randomHour = 8 + Math.floor(Math.random() * 13); // 8..20
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
