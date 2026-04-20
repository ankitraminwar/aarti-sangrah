import type { AppLanguage } from "@/src/types";

const translations = {
  // ── App Tour ────────────────────────────────────────────────────────
  "tour.next": { hi: "अगला", mr: "पुढील", en: "Next" },
  "tour.skip": { hi: "छोड़ें", mr: "वगळा", en: "Skip" },
  "tour.done": { hi: "शुरू करें", mr: "सुरू करा", en: "Get Started" },
  "tour.slide1.title": {
    hi: "आरती संग्रह में स्वागत है",
    mr: "आरती संग्रहात स्वागत आहे",
    en: "Welcome to Aarti Sangrah",
  },
  "tour.slide1.desc": {
    hi: "भक्ति से बनाया गया पवित्र आरतियों का सबसे बड़ा संग्रह। देवताओं और भाषाओं के अनुसार वर्गीकृत।",
    mr: "भक्तीने बनवलेला पवित्र आरत्यांचा सर्वात मोठा संग्रह. देवता आणि भाषांनुसार वर्गीकृत.",
    en: "The most comprehensive collection of sacred aartis, made with devotion. Categorised by deities and languages.",
  },
  "tour.slide2.title": {
    hi: "श्रेणियाँ और खोजें",
    mr: "श्रेण्या आणि शोधा",
    en: "Browse & Search",
  },
  "tour.slide2.desc": {
    hi: "होम स्क्रीन पर देवी-देवताओं की श्रेणियाँ देखें और खोज से तुरंत कोई भी आरती ढूँढें।",
    mr: "होम स्क्रीनवर देवी-देवतांच्या श्रेण्या पहा आणि शोधाने लगेच कोणतीही आरती शोधा.",
    en: "Explore deity categories on Home and instantly find any aarti with powerful search.",
  },
  "tour.slide3.title": {
    hi: "पसंदीदा संग्रह",
    mr: "आवडते संग्रह",
    en: "Your Favorites",
  },
  "tour.slide3.desc": {
    hi: "हृदय आइकन टैप करके पसंदीदा आरतियाँ सहेजें। पसंदीदा टैब से कभी भी जल्दी पहुँचें।",
    mr: "हृदय चिन्ह टॅप करून आवडत्या आरत्या जतन करा. आवडते टॅबवरून केव्हाही त्वरित प्रवेश करा.",
    en: "Save aartis by tapping the heart icon. Access them anytime from the Favorites tab.",
  },
  "tour.slide4.title": {
    hi: "अपनी पसंद के अनुसार सेटिंग्स",
    mr: "आपल्या आवडीनुसार सेटिंग्ज",
    en: "Personalize Settings",
  },
  "tour.slide4.desc": {
    hi: "थीम, अक्षर आकार और भाषा बदलें। सेटिंग्स से डेटा रीफ्रेश करें।",
    mr: "थीम, अक्षर आकार आणि भाषा बदला. सेटिंग्जमधून डेटा रिफ्रेश करा.",
    en: "Change theme, text size, and language. Refresh data anytime from Settings.",
  },
  "tour.slide5.title": {
    hi: "ऑफ़लाइन पढ़ें, कहीं भी",
    mr: "ऑफलाइन वाचा, कुठेही",
    en: "Read Offline, Anywhere",
  },
  "tour.slide5.desc": {
    hi: "सभी आरतियाँ आपके फ़ोन में सहेजी जाती हैं। बिना इंटरनेट के भी पढ़ें।",
    mr: "सर्व आरत्या आपल्या फोनमध्ये जतन केल्या जातात. इंटरनेटशिवायही वाचा.",
    en: "All aartis are saved on your phone. Read even without internet.",
  },

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
  "home.todaysAarti": { hi: "आज की प्रार्थना", mr: "आजची प्रार्थना", en: "Today's Prayer" },
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
  "settings.syncNoInternet": {
    hi: "इंटरनेट नहीं है",
    mr: "इंटरनेट नाही",
    en: "No Internet Connection",
  },
  "settings.syncNoInternetMsg": {
    hi: "डेटा सिंक करने के लिए इंटरनेट कनेक्शन आवश्यक है। कृपया अपना नेटवर्क जाँचें और दोबारा कोशिश करें।",
    mr: "डेटा सिंक करण्यासाठी इंटरनेट कनेक्शन आवश्यक आहे. कृपया आपले नेटवर्क तपासा आणि पुन्हा प्रयत्न करा.",
    en: "An internet connection is required to sync data. Please check your network and try again.",
  },
  "settings.syncOffline": { hi: "सिंक विफल", mr: "सिंक अयशस्वी", en: "Sync Failed" },
  "settings.syncOfflineMsg": {
    hi: "सर्वर से संपर्क नहीं हो सका। आपकी सहेजी हुई आरतियाँ अभी भी उपलब्ध हैं।",
    mr: "सर्व्हरशी संपर्क होऊ शकला नाही. आपल्या जतन केलेल्या आरत्या अजूनही उपलब्ध आहेत.",
    en: "Could not reach the server. Your saved aartis are still available.",
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
    mr: "ऑफलाइन असताना ॲप काम करतो का?",
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
    mr: "ॲप कोणत्या भाषांना सपोर्ट करतो?",
    en: "What languages does the app support?",
  },
  "help.a6": {
    hi: "ऐप हिन्दी, मराठी और अंग्रेज़ी का समर्थन करता है। आप सेटिंग्स में भाषा बदल सकते हैं।",
    mr: "ॲप हिंदी, मराठी आणि इंग्रजी भाषांना सपोर्ट करतो. आपण सेटिंग्जमध्ये भाषा बदलू शकता.",
    en: "The app supports Hindi, Marathi, and English. You can change the language in Settings.",
  },
  "help.requestSection": {
    hi: "नई सामग्री का अनुरोध करें",
    mr: "नवीन सामग्रीची विनंती करा",
    en: "Request New Content",
  },
  "help.requestButton": {
    hi: "आरती / मंत्र का अनुरोध करें",
    mr: "आरती / मंत्राची विनंती करा",
    en: "Request Aarti / Mantra",
  },
  "search.requestMsg": {
    hi: "यहाँ आरती का अनुरोध करें",
    mr: "येथे आरतीची विनंती करा",
    en: "Request an Aarti here",
  },

  // ── Settings — Privacy row ─────────────────────────────────────────
  "settings.privacy": {
    hi: "गोपनीयता नीति",
    mr: "गोपनीयता धोरण",
    en: "Privacy Policy",
  },
  "settings.privacyDesc": {
    hi: "हम आपका डेटा कैसे संभालते हैं",
    mr: "आम्ही आपला डेटा कसा हाताळतो",
    en: "How we handle your data",
  },

  // ── Privacy Policy Screen ─────────────────────────────────────────
  "privacy.title": { hi: "गोपनीयता नीति", mr: "गोपनीयता धोरण", en: "Privacy Policy" },
  "privacy.intro": {
    hi: "आपकी गोपनीयता हमारे लिए महत्वपूर्ण है। आरती संग्रह आपकी गोपनीयता का सम्मान करने के लिए बनाया गया है — हम चीजें सरल रखते हैं: आपका डेटा आपके डिवाइस पर ही रहता है।",
    mr: "आपली गोपनीयता आमच्यासाठी महत्त्वाची आहे. आरती संग्रह आपल्या गोपनीयतेचा आदर करण्यासाठी डिझाइन केले आहे — आम्ही गोष्टी सोप्या ठेवतो: आपला डेटा आपल्या डिव्हाइसवरच राहतो.",
    en: "Your privacy matters to us. Aarti Sangrah is designed to respect your privacy — we keep things simple: your data stays on your device.",
  },
  "privacy.s1.title": {
    hi: "कोई व्यक्तिगत डेटा नहीं",
    mr: "कोणताही वैयक्तिक डेटा नाही",
    en: "No Personal Data Collected",
  },
  "privacy.s1.body": {
    hi: "आरती संग्रह कोई भी व्यक्तिगत पहचान योग्य जानकारी एकत्र, संग्रहीत या प्रसारित नहीं करता। हम आपका नाम, ईमेल, फोन नंबर या स्थान नहीं माँगते। कोई खाता पंजीकरण आवश्यक नहीं है।",
    mr: "आरती संग्रह कोणतीही वैयक्तिकरित्या ओळखता येणारी माहिती गोळा करत नाही, संग्रहित करत नाही किंवा प्रसारित करत नाही. आम्ही आपले नाव, ईमेल, फोन नंबर किंवा स्थान विचारत नाही. खाते नोंदणी आवश्यक नाही.",
    en: "Aarti Sangrah does not collect, store, or transmit any personally identifiable information. We do not ask for your name, email, phone number, or location. No account registration is required.",
  },
  "privacy.s2.title": {
    hi: "सारा डेटा आपके डिवाइस पर",
    mr: "सर्व डेटा आपल्या डिव्हाइसवर",
    en: "All Data Stays on Your Device",
  },
  "privacy.s2.body": {
    hi: "आरतियाँ, आपके पसंदीदा और ऐप की प्राथमिकताएँ (थीम, अक्षर आकार, भाषा) सभी SQLite का उपयोग करके आपके डिवाइस पर स्थानीय रूप से संग्रहीत हैं। यह डेटा आपके फोन से बाहर नहीं जाता।",
    mr: "आरत्या, आपले आवडते आणि ॲप प्राधान्ये (थीम, अक्षर आकार, भाषा) सर्व SQLite वापरून आपल्या डिव्हाइसवर स्थानिकरित्या संग्रहित आहेत. हा डेटा आपल्या फोनमधून बाहेर जात नाही.",
    en: "Aartis, your favorites, and app preferences (theme, font size, language) are all stored locally on your device using SQLite. This data never leaves your phone and is not accessible to us.",
  },
  "privacy.s3.title": {
    hi: "इंटरनेट केवल सामग्री सिंक के लिए",
    mr: "इंटरनेट फक्त सामग्री सिंकसाठी",
    en: "Internet Used Only for Content Sync",
  },
  "privacy.s3.body": {
    hi: "ऐप केवल हमारे CDN (jsDelivr) से नवीनतम आरती सामग्री डाउनलोड करने के लिए इंटरनेट से जुड़ता है। इस प्रक्रिया के दौरान कोई उपयोग डेटा, एनालिटिक्स या व्यक्तिगत जानकारी नहीं भेजी जाती। सिंक के बाद ऐप पूरी तरह ऑफलाइन काम करता है।",
    mr: "ॲप फक्त आमच्या CDN (jsDelivr) वरून नवीनतम आरती सामग्री डाउनलोड करण्यासाठी इंटरनेटशी जोडते. या प्रक्रियेदरम्यान कोणताही वापर डेटा, विश्लेषण किंवा वैयक्तिक माहिती पाठवली जात नाही. सिंक झाल्यानंतर ॲप पूर्णपणे ऑफलाइन काम करते.",
    en: "The app connects to the internet solely to download the latest aarti content from our CDN (jsDelivr). No usage data, analytics, or personal information is sent during this process. The app works fully offline once synced.",
  },
  "privacy.s4.title": {
    hi: "कोई विज्ञापन, कोई ट्रैकिंग नहीं",
    mr: "कोणतेही जाहिरात, कोणतीही ट्रॅकिंग नाही",
    en: "No Ads, No Trackers",
  },
  "privacy.s4.body": {
    hi: "आरती संग्रह में कोई विज्ञापन नहीं है और कोई तृतीय-पक्ष एनालिटिक्स या ट्रैकिंग SDK का उपयोग नहीं किया जाता। आपकी पढ़ने की आदतें और प्राथमिकताएँ कभी निगरानी या साझा नहीं की जाती।",
    mr: "आरती संग्रहात कोणत्याही जाहिराती नाहीत आणि कोणत्याही तृतीय-पक्ष विश्लेषण किंवा ट्रॅकिंग SDK चा वापर केला जात नाही. आपल्या वाचन सवयी आणि प्राधान्ये कधीही निरीक्षण किंवा सामायिक केली जात नाहीत.",
    en: "Aarti Sangrah contains no advertisements and uses no third-party analytics or tracking SDKs. Your reading habits and preferences are never monitored or shared.",
  },
  "privacy.s5.title": {
    hi: "सभी उम्र के लिए सुरक्षित",
    mr: "सर्व वयोगटांसाठी सुरक्षित",
    en: "Safe for All Ages",
  },
  "privacy.s5.body": {
    hi: "आरती संग्रह एक भक्ति ऐप है जो सभी उम्र के लिए उपयुक्त है। चूँकि हम कोई व्यक्तिगत डेटा एकत्र नहीं करते, बच्चे बिना किसी चिंता के इसका उपयोग कर सकते हैं।",
    mr: "आरती संग्रह हे एक भक्ती ॲप आहे जे सर्व वयोगटांसाठी योग्य आहे. आम्ही कोणताही वैयक्तिक डेटा गोळा करत नसल्यामुळे, मुले कोणत्याही चिंतेशिवाय याचा वापर करू शकतात.",
    en: "Aarti Sangrah is a devotional app suitable for all ages. Since we collect no personal data, the app is safe for children to use without any concern.",
  },
  "privacy.s6.title": {
    hi: "नीति में परिवर्तन",
    mr: "धोरणातील बदल",
    en: "Changes to This Policy",
  },
  "privacy.s6.body": {
    hi: "हम समय-समय पर इस गोपनीयता नीति को अपडेट कर सकते हैं। कोई भी बदलाव ऐप में प्रतिबिंबित किया जाएगा। अपडेट के बाद ऐप का निरंतर उपयोग संशोधित नीति की स्वीकृति को दर्शाता है।",
    mr: "आम्ही वेळोवेळी हे गोपनीयता धोरण अपडेट करू शकतो. कोणतेही बदल ॲपमध्ये प्रतिबिंबित केले जातील. अपडेटनंतर ॲपचा सतत वापर सुधारित धोरणाची स्वीकृती दर्शवतो.",
    en: "We may update this privacy policy from time to time. Any changes will be reflected in the app. Continued use of the app after updates constitutes acceptance of the revised policy.",
  },
  "privacy.lastUpdated": {
    hi: "अंतिम अपडेट: अप्रैल 2026",
    mr: "शेवटचे अपडेट: एप्रिल 2026",
    en: "Last updated: April 2026",
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
