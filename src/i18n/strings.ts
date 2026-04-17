import type { AppLanguage } from "@/src/types";

const translations = {
  // ── Tabs ──────────────────────────────────────────────────────────
  "tab.home": { hi: "होम", mr: "होम", en: "Home" },
  "tab.search": { hi: "खोजें", mr: "शोधा", en: "Search" },
  "tab.favorites": { hi: "पसंदीदा", mr: "आवडते", en: "Favorites" },
  "tab.settings": { hi: "सेटिंग्स", mr: "सेटिंग्ज", en: "Settings" },

  // ── Home Screen ───────────────────────────────────────────────────
  "home.badge": { hi: "ॐ आरती संग्रह", mr: "ॐ आरती संग्रह", en: "ॐ Aarti Sangrah" },
  "home.headline": {
    hi: "पवित्र\nसंग्रह",
    mr: "पवित्र\nसंग्रह",
    en: "The Sacred\nEditorial",
  },
  "home.loading": {
    hi: "आपका पवित्र संग्रह तैयार हो रहा है...",
    mr: "आपला पवित्र संग्रह तयार होत आहे...",
    en: "Preparing your sacred collection...",
  },
  "home.todaysAarti": { hi: "आज की आरती", mr: "आजची आरती", en: "Today's Aarti" },
  "home.collections": { hi: "दैवी संग्रह", mr: "दैवी संग्रह", en: "Divine Collections" },
  "home.popular": { hi: "लोकप्रिय आरतियाँ", mr: "लोकप्रिय आरत्या", en: "Popular Aartis" },
  "home.seeAll": { hi: "सभी देखें", mr: "सर्व पहा", en: "See All" },
  "home.continueReading": { hi: "पढ़ना जारी रखें", mr: "वाचन सुरू ठेवा", en: "Continue Reading" },

  // ── Search Screen ─────────────────────────────────────────────────
  "search.placeholder": {
    hi: "आरती, देवता, गीत खोजें...",
    mr: "आरती, देवता, गीत शोधा...",
    en: "Search hymns, deities, lyrics...",
  },
  "search.searching": { hi: "खोज रहे हैं...", mr: "शोधत आहे...", en: "Searching..." },
  "search.noResults": { hi: "कोई परिणाम नहीं", mr: "कोणताही निकाल नाही", en: "No Results" },
  "search.noResultsMsg": {
    hi: '"{query}" के लिए कोई आरती नहीं मिली। कोई और शब्द आज़माएं।',
    mr: '"{query}" साठी कोणतीही आरती सापडली नाही। वेगळा शब्द वापरा.',
    en: 'No aartis found for "{query}". Try a different keyword.',
  },

  // ── Favorites Screen ──────────────────────────────────────────────
  "favorites.title": { hi: "पसंदीदा", mr: "आवडते", en: "Favorites" },
  "favorites.loading": {
    hi: "पसंदीदा लोड हो रहे हैं...",
    mr: "आवडते लोड होत आहेत...",
    en: "Loading favorites...",
  },
  "favorites.emptyTitle": {
    hi: "अभी तक कोई पसंदीदा नहीं",
    mr: "अजून आवडते नाहीत",
    en: "No Favorites Yet",
  },
  "favorites.emptyMsg": {
    hi: "किसी भी आरती पर हृदय आइकन टैप करें।",
    mr: "कोणत्याही आरतीवर हृदय चिन्ह टॅप करा.",
    en: "Tap the heart icon on any aarti to save it here for quick access.",
  },
  "favorites.browse": { hi: "आरती देखें", mr: "आरत्या पहा", en: "Browse Aartis" },
  "favorites.saved": { hi: "सहेजी गई", mr: "जतन केलेल्या", en: "saved" },
  "favorites.hymn": { hi: "आरती", mr: "आरती", en: "hymn" },
  "favorites.hymns": { hi: "आरतियाँ", mr: "आरत्या", en: "hymns" },

  // ── Settings Screen ───────────────────────────────────────────────
  "settings.title": { hi: "सेटिंग्स", mr: "सेटिंग्ज", en: "Settings" },
  "settings.appearance": { hi: "दिखावट", mr: "स्वरूप", en: "Appearance" },
  "settings.theme": { hi: "थीम", mr: "थीम", en: "Theme" },
  "settings.light": { hi: "लाइट", mr: "लाइट", en: "Light" },
  "settings.dark": { hi: "डार्क", mr: "डार्क", en: "Dark" },
  "settings.auto": { hi: "ऑटो", mr: "ऑटो", en: "Auto" },
  "settings.textSize": { hi: "अक्षर आकार", mr: "अक्षर आकार", en: "Text Size" },
  "settings.textSizeDesc": {
    hi: "आरामदायक पढ़ने के लिए अक्षर आकार बदलें",
    mr: "आरामदायक वाचनासाठी अक्षर आकार बदला",
    en: "Adjust the reading text size for comfortable reading",
  },
  "settings.fontSmall": { hi: "छोटा", mr: "लहान", en: "Small" },
  "settings.fontMedium": { hi: "मध्यम", mr: "मध्यम", en: "Medium" },
  "settings.fontLarge": { hi: "बड़ा", mr: "मोठा", en: "Large" },
  "settings.fontXLarge": { hi: "बहुत बड़ा", mr: "खूप मोठा", en: "Extra Large" },
  "settings.language": { hi: "भाषा", mr: "भाषा", en: "Language" },
  "settings.languageDesc": {
    hi: "अपनी पसंदीदा भाषा चुनें",
    mr: "आपली पसंतीची भाषा निवडा",
    en: "Choose your preferred language",
  },
  "settings.data": { hi: "डेटा", mr: "डेटा", en: "Data" },
  "settings.refreshAartis": {
    hi: "आरती रीफ्रेश करें",
    mr: "आरत्या रिफ्रेश करा",
    en: "Refresh Aartis",
  },
  "settings.syncing": { hi: "सिंक हो रहा है...", mr: "सिंक होत आहे...", en: "Syncing..." },
  "settings.lastSynced": {
    hi: "अंतिम सिंक: {time}",
    mr: "शेवटचे सिंक: {time}",
    en: "Last synced: {time}",
  },
  "settings.fetchLatest": {
    hi: "क्लाउड से नवीनतम आरतियाँ प्राप्त करें",
    mr: "क्लाउडवरून नवीनतम आरत्या मिळवा",
    en: "Fetch latest aartis from the cloud",
  },
  "settings.about": { hi: "जानकारी", mr: "माहिती", en: "About" },
  "settings.version": { hi: "संस्करण", mr: "आवृत्ती", en: "Version" },
  "settings.storage": { hi: "स्टोरेज", mr: "स्टोरेज", en: "Storage" },
  "settings.offlineSqlite": { hi: "ऑफलाइन", mr: "ऑफलाइन", en: "Offline" },
  "settings.footer": {
    hi: "भक्ति के साथ बनाया गया • आरती संग्रह",
    mr: "भक्तीने बनवलेले • आरती संग्रह",
    en: "Made with devotion • Aarti Sangrah",
  },
  "settings.syncSuccess": { hi: "सफल", mr: "यशस्वी", en: "Success" },
  "settings.syncSuccessMsg": {
    hi: "आरतियाँ क्लाउड से रीफ्रेश हो गई हैं।",
    mr: "आरत्या क्लाउडवरून रिफ्रेश झाल्या आहेत.",
    en: "Aartis have been refreshed from the cloud.",
  },
  "settings.syncOffline": { hi: "ऑफलाइन", mr: "ऑफलाइन", en: "Offline" },
  "settings.syncOfflineMsg": {
    hi: "सर्वर से संपर्क नहीं हो सका। कैश्ड आरतियाँ उपलब्ध हैं।",
    mr: "सर्व्हरशी संपर्क होऊ शकला नाही. कॅश्ड आरत्या उपलब्ध आहेत.",
    en: "Could not reach the server. Your cached aartis are still available.",
  },

  // ── Category Screen ───────────────────────────────────────────────
  "category.fallback": { hi: "श्रेणी", mr: "वर्ग", en: "Category" },
  "category.loading": {
    hi: "आरतियाँ लोड हो रही हैं...",
    mr: "आरत्या लोड होत आहेत...",
    en: "Loading aartis...",
  },
  "category.emptyTitle": {
    hi: "कोई आरती नहीं मिली",
    mr: "कोणतीही आरती सापडली नाही",
    en: "No Aartis Found",
  },
  "category.emptyMsg": {
    hi: "{name} श्रेणी में अभी कोई आरती उपलब्ध नहीं है।",
    mr: "{name} वर्गात अजून कोणतीही आरती उपलब्ध नाही.",
    en: "No aartis available in the {name} category yet.",
  },
  "category.goHome": { hi: "होम जाएं", mr: "होम वर जा", en: "Go Home" },
  "category.hymn": { hi: "आरती", mr: "आरती", en: "hymn" },
  "category.hymns": { hi: "आरतियाँ", mr: "आरत्या", en: "hymns" },
  "category.description": {
    hi: "पवित्र भजनों का संग्रह",
    mr: "पवित्र भजनांचा संग्रह",
    en: "A collection of sacred hymns",
  },

  // ── Detail Screen ─────────────────────────────────────────────────
  "detail.loading": {
    hi: "आरती लोड हो रही है...",
    mr: "आरती लोड होत आहे...",
    en: "Loading aarti...",
  },
  "detail.appName": { hi: "आरती संग्रह", mr: "आरती संग्रह", en: "Aarti Sangrah" },
  "detail.tagline": { hi: "पवित्र संग्रह", mr: "पवित्र संग्रह", en: "The Sacred Editorial" },
  "detail.sharedFrom": {
    hi: "आरती संग्रह से साझा • aartisangrah.app",
    mr: "आरती संग्रहातून शेअर • aartisangrah.app",
    en: "Shared from Aarti Sangrah • aartisangrah.app",
  },

  // ── Category Card ─────────────────────────────────────────────────
  "categoryCard.aarti": { hi: "आरती", mr: "आरती", en: "aarti" },
  "categoryCard.aartis": { hi: "आरतियाँ", mr: "आरत्या", en: "aartis" },

  // ── Generic ───────────────────────────────────────────────────────
  "generic.loading": { hi: "लोड हो रहा है...", mr: "लोड होत आहे...", en: "Loading..." },
  "searchBar.placeholder": { hi: "आरती खोजें...", mr: "आरती शोधा...", en: "Search aartis..." },

  // ── Help & FAQ ────────────────────────────────────────────────────
  "settings.helpFaq": { hi: "सहायता और FAQ", mr: "मदत आणि FAQ", en: "Help & FAQ" },
  "settings.helpFaqDesc": {
    hi: "अक्सर पूछे जाने वाले प्रश्न और सहायता",
    mr: "वारंवार विचारले जाणारे प्रश्न आणि मदत",
    en: "Frequently asked questions and support",
  },
  "help.title": { hi: "सहायता और FAQ", mr: "मदत आणि FAQ", en: "Help & FAQ" },
  "help.intro": {
    hi: "यहाँ कुछ सामान्य प्रश्न और उत्तर दिए गए हैं जो आपकी मदद कर सकते हैं।",
    mr: "येथे काही सामान्य प्रश्न आणि उत्तरे दिली आहेत जी आपल्याला मदत करू शकतात.",
    en: "Here are some common questions and answers that may help you.",
  },
  "help.q1": {
    hi: "ऑफलाइन होने पर ऐप काम करता है?",
    mr: "ऑफलाइन असताना अॅप काम करतो का?",
    en: "Does the app work offline?",
  },
  "help.a1": {
    hi: "हाँ! सभी आरतियाँ आपके डिवाइस पर स्थानीय रूप से सहेजी जाती हैं। एक बार डाउनलोड होने के बाद, आप बिना इंटरनेट के पढ़ सकते हैं।",
    mr: "होय! सर्व आरत्या आपल्या डिव्हाइसवर स्थानिकरित्या जतन केल्या जातात. एकदा डाउनलोड झाल्यानंतर, आपण इंटरनेटशिवाय वाचू शकता.",
    en: "Yes! All aartis are saved locally on your device. Once downloaded, you can read them without internet.",
  },
  "help.q2": {
    hi: "नई आरतियाँ कैसे प्राप्त करें?",
    mr: "नवीन आरत्या कशा मिळवायच्या?",
    en: "How do I get new aartis?",
  },
  "help.a2": {
    hi: 'सेटिंग्स में "आरती रीफ्रेश करें" पर टैप करें। यह क्लाउड से नवीनतम आरतियाँ डाउनलोड करेगा।',
    mr: 'सेटिंग्जमध्ये "आरत्या रिफ्रेश करा" वर टॅप करा. यामुळे क्लाउडवरून नवीनतम आरत्या डाउनलोड होतील.',
    en: 'Tap "Refresh Aartis" in Settings. This will download the latest aartis from the cloud.',
  },
  "help.q3": {
    hi: "पसंदीदा कैसे सहेजें?",
    mr: "आवडते कसे जतन करायचे?",
    en: "How do I save favorites?",
  },
  "help.a3": {
    hi: "किसी भी आरती के विवरण पृष्ठ पर हृदय आइकन टैप करें। आपके पसंदीदा 'पसंदीदा' टैब में दिखाई देंगे।",
    mr: "कोणत्याही आरतीच्या तपशील पृष्ठावर हृदय चिन्ह टॅप करा. आपले आवडते 'आवडते' टॅबमध्ये दिसतील.",
    en: "Tap the heart icon on any aarti detail page. Your favorites will appear in the Favorites tab.",
  },
  "help.q4": {
    hi: "अक्षर का आकार कैसे बदलें?",
    mr: "अक्षराचा आकार कसा बदलायचा?",
    en: "How do I change the text size?",
  },
  "help.a4": {
    hi: "सेटिंग्स > दिखावट में जाएं और अपनी पसंद का अक्षर आकार चुनें — छोटा, मध्यम, बड़ा या बहुत बड़ा।",
    mr: "सेटिंग्ज > स्वरूप मध्ये जा आणि आपल्या आवडीचा अक्षर आकार निवडा — लहान, मध्यम, मोठा किंवा खूप मोठा.",
    en: "Go to Settings > Appearance and choose your preferred text size — Small, Medium, Large, or Extra Large.",
  },
  "help.q5": {
    hi: "आरती की इमेज कैसे कॉपी करें?",
    mr: "आरतीची प्रतिमा कशी कॉपी करायची?",
    en: "How do I copy an aarti as an image?",
  },
  "help.a5": {
    hi: "आरती विवरण पृष्ठ पर कॉपी आइकन टैप करें। यह आरती की इमेज आपके क्लिपबोर्ड में कॉपी कर देगा।",
    mr: "आरती तपशील पृष्ठावर कॉपी चिन्ह टॅप करा. यामुळे आरतीची प्रतिमा आपल्या क्लिपबोर्डमध्ये कॉपी होईल.",
    en: "Tap the copy icon on the aarti detail page. This will copy the aarti as an image to your clipboard.",
  },
  "help.q6": {
    hi: "ऐप किन भाषाओं का समर्थन करता है?",
    mr: "अॅप कोणत्या भाषांना सपोर्ट करतो?",
    en: "What languages does the app support?",
  },
  "help.a6": {
    hi: "ऐप हिन्दी, मराठी और अंग्रेज़ी का समर्थन करता है। आप सेटिंग्स में भाषा बदल सकते हैं।",
    mr: "अॅप हिंदी, मराठी आणि इंग्रजी भाषांना सपोर्ट करतो. आपण सेटिंग्जमध्ये भाषा बदलू शकता.",
    en: "The app supports Hindi, Marathi, and English. You can change the language in Settings.",
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: TranslationKey, lang: AppLanguage, params?: Record<string, string>): string {
  const entry = translations[key];
  let text: string = entry[lang] ?? entry.en;
  if (params) {
    for (const [k, v] of Object.entries(params)) {
      text = text.replace(`{${k}}`, v);
    }
  }
  return text;
}
