import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "te";

const en = {
  nav: { home: "Home", about: "About", artwork: "Artwork", custom: "Custom Art", process: "Process", work: "Our Work", faq: "FAQ", contact: "Contact" },
  cta: "Enquire on WhatsApp",
  menu: "Menu",
  hero: {
    label: "Manjunath Art Studio",
    h1a: "Tradition on Canvas.",
    h1b: "Art from the Heart.",
    desc: "Handmade devotional, traditional and mythological artwork inspired by Indian culture and Telugu traditions.",
    explore: "Explore Artwork",
    request: "Request Custom Art",
    location: "Punganur, Andhra Pradesh",
  },
  features: [
    ["Handmade Artwork", "Created with patience and attention to detail."],
    ["Traditional Inspiration", "Inspired by Indian culture, mythology and Telugu traditions."],
    ["Custom Creations", "Discuss your own artwork idea directly with the artist."],
  ],
  about: {
    label: "The Artist",
    h: "Meet the Artist",
    p: [
      "Manjunath is a passionate artist from Punganur with a strong interest in drawing, painting and creating artwork by hand.",
      "His interest in art extends beyond painting on paper and canvas. During the Ganesh festival season, he creates Ganesha idols using natural materials such as clay and dry grass. The patience, creativity and effort involved in these handmade creations reflect his genuine passion for art.",
      "His artwork is particularly inspired by Indian deities, mythology, Telugu traditions and cultural themes. He enjoys developing designs before beginning the painting process and exploring new ways to present traditional subjects.",
      "Through Manjunath Art Studio, he is taking a step toward sharing his artwork with more people and turning his passion and talent into meaningful handmade creations.",
    ],
    photoSoon: "Artist photo coming soon",
  },
  gallery: {
    label: "Gallery",
    h: "Featured Artwork",
    desc: "Explore a selection of Manjunath's handmade devotional, traditional and mythological artwork.",
    all: "All",
    enquire: "Enquire",
    available: "Available for enquiry",
    empty: "No artwork in this category yet — ask about a custom piece.",
    pricing: "Pricing varies according to the artwork, size, materials and framing. Contact us for a personalised quote.",
    photoSoon: "Photo coming soon",
    close: "Close", prev: "Previous artwork", next: "Next artwork",
  },
  cats: { devotional: "Devotional", telugu: "Telugu Traditional", temple: "Temple", mythological: "Mythological", thanjavur: "Thanjavur-Inspired", custom: "Custom" },
  custom: {
    label: "Custom Orders",
    h: "Have an Idea for an Artwork?",
    p: "Have a favourite deity, temple, traditional subject or reference image in mind? Share your idea with Manjunath and discuss a handmade artwork created according to your requirements.",
    types: ["Devotional Art", "Telugu Traditional Art", "Temple Art", "Mythological Art", "Custom Art", "Thanjavur-Inspired Art"],
    note: "Thanjavur-inspired artwork created while developing traditional techniques.",
    cta: "Start a Custom Order",
  },
  process: {
    label: "How It Works",
    h: "From Your Idea to Artwork",
    steps: [
      ["Enquire", "Contact Manjunath through WhatsApp and share the artwork or custom idea."],
      ["Discuss", "Discuss subject, reference, size, design, materials and framing."],
      ["Get Your Quote", "The final price is discussed based on the requirements."],
      ["Confirm With Advance", "An advance payment is required to confirm the order."],
      ["Artwork Creation", "Manjunath creates the artwork according to the agreed requirements."],
      ["Final Payment & Delivery", "After completion, remaining payment and delivery/collection arrangements are discussed."],
    ],
  },
  materials: {
    label: "Materials",
    h: "Materials for Every Creation",
    p: "Materials are selected according to the artwork, design and desired finish.",
    list: ["Drawing Paper", "Watercolour", "Acrylic", "Oil Colours", "Poster Colours", "Gold Foil", "Gold Leaf", "Stones", "Beads", "Wood", "MDF Board"],
    vary: "Not every artwork uses all of these — materials vary by artwork.",
    frame: "Framing options are selected according to the artwork and customer requirements.",
  },
  why: {
    h: "Created With Care",
    items: [
      ["Handmade", "Artwork created by hand with patience and attention to detail."],
      ["Traditional Inspiration", "Inspired by Indian culture, mythology and Telugu traditions."],
      ["Custom Approach", "Customers can discuss their own ideas and references."],
      ["Direct Communication", "Customers can speak directly with the artist."],
    ],
  },
  insta: { label: "Our Work", h: "Follow the Art Journey", p: "See more artwork, creative process and new creations on Instagram.", btn: "View on Instagram" },
  faq: {
    label: "FAQ",
    h: "Frequently Asked Questions",
    items: [
      ["Do you accept custom artwork?", "Yes. Customers can share their reference image, subject or idea and discuss the requirements directly with Manjunath."],
      ["Can I send a reference image?", "Yes. Reference images can be shared through WhatsApp."],
      ["Can I request a deity or traditional subject?", "Yes. Subject requests can be discussed with the artist."],
      ["How is the price decided?", "Pricing depends on the artwork size, design, materials, framing and custom requirements."],
      ["Is an advance required?", "Yes. An advance payment is required to confirm a custom order."],
      ["Where do you currently serve?", "Currently serving customers in and around Punganur, Chittoor and Annamayya regions."],
      ["Do you create Thanjavur paintings?", "Manjunath also creates Thanjavur-inspired artwork while continuing to develop traditional Thanjavur painting techniques."],
    ],
  },
  contact: {
    label: "Contact",
    h: "Let's Create Something Meaningful",
    p: "Have a painting idea, a reference image, or simply want to know more about an artwork? Get in touch with Manjunath.",
    whatsapp: "WhatsApp", phone: "Phone", email: "Email", instagram: "Instagram", location: "Location",
    area: "Currently serving customers in and around Punganur, Chittoor and Annamayya regions.",
  },
  footer: { tagline: "Tradition on Canvas. Art from the Heart.", rights: "© 2026 Manjunath Art Studio. All rights reserved." },
};

type Dict = typeof en;

const te: Dict = {
  nav: { home: "హోమ్", about: "కళాకారుని గురించి", artwork: "కళాకృతులు", custom: "ప్రత్యేక ఆర్డర్", process: "విధానం", work: "మా పని", faq: "ప్రశ్నలు", contact: "సంప్రదించండి" },
  cta: "వాట్సాప్‌లో సంప్రదించండి",
  menu: "మెనూ",
  hero: {
    label: "మంజునాథ్ ఆర్ట్ స్టూడియో",
    h1a: "కళలో సంప్రదాయం —",
    h1b: "మనసుతో సృష్టించిన కళ",
    desc: "భారతీయ సంస్కృతి మరియు తెలుగు సంప్రదాయాల స్ఫూర్తితో చేతితో రూపొందించిన భక్తి, సంప్రదాయ మరియు పౌరాణిక కళాకృతులు.",
    explore: "కళాకృతులు చూడండి",
    request: "ప్రత్యేక కళాకృతి కోరండి",
    location: "పుంగనూరు, ఆంధ్రప్రదేశ్",
  },
  features: [
    ["చేతితో చేసిన కళ", "ఓపికతో, ప్రతి వివరంపై శ్రద్ధతో రూపొందించబడింది."],
    ["సంప్రదాయ స్ఫూర్తి", "భారతీయ సంస్కృతి, పురాణాలు మరియు తెలుగు సంప్రదాయాల స్ఫూర్తి."],
    ["మీ ఆలోచనకు రూపం", "మీ కళాకృతి ఆలోచనను నేరుగా కళాకారునితో చర్చించండి."],
  ],
  about: {
    label: "కళాకారుడు",
    h: "కళాకారుని పరిచయం",
    p: [
      "మంజునాథ్ పుంగనూరుకు చెందిన కళాభిమాని. చిత్రలేఖనం, పెయింటింగ్ మరియు చేతితో కళాకృతులు రూపొందించడంపై ఆయనకు ఎంతో ఆసక్తి.",
      "ఆయన కళ కాగితం, కాన్వాస్‌కే పరిమితం కాదు. వినాయక చవితి సమయంలో మట్టి, ఎండు గడ్డి వంటి సహజ పదార్థాలతో గణపతి విగ్రహాలను తయారు చేస్తారు. ఈ చేతి సృష్టిలో ఉన్న ఓపిక, సృజనాత్మకత మరియు శ్రమ ఆయనకు కళపై ఉన్న నిజమైన ప్రేమను చూపిస్తాయి.",
      "భారతీయ దేవతలు, పురాణాలు, తెలుగు సంప్రదాయాలు మరియు సాంస్కృతిక అంశాలు ఆయన కళకు ప్రధాన స్ఫూర్తి. పెయింటింగ్ మొదలుపెట్టే ముందు డిజైన్‌ను ఆలోచించి రూపొందించడం, సంప్రదాయ అంశాలను కొత్త రీతిలో చూపించడం ఆయనకు ఇష్టం.",
      "మంజునాథ్ ఆర్ట్ స్టూడియో ద్వారా తన కళను మరింత మందికి చేరువ చేస్తూ, తన ఆసక్తిని, ప్రతిభను అర్థవంతమైన చేతి కళాకృతులుగా మలచే దిశగా ఆయన అడుగు వేస్తున్నారు.",
    ],
    photoSoon: "కళాకారుని ఫోటో త్వరలో",
  },
  gallery: {
    label: "గ్యాలరీ",
    h: "ప్రత్యేక కళాకృతులు",
    desc: "మంజునాథ్ చేతితో రూపొందించిన భక్తి, సంప్రదాయ మరియు పౌరాణిక కళాకృతుల నుండి కొన్ని.",
    all: "అన్నీ",
    enquire: "వివరాలు అడగండి",
    available: "విచారణకు అందుబాటులో ఉంది",
    empty: "ఈ విభాగంలో ఇంకా కళాకృతులు లేవు — ప్రత్యేక ఆర్డర్ గురించి అడగండి.",
    pricing: "ధర కళాకృతి, పరిమాణం, పదార్థాలు మరియు ఫ్రేమ్‌ను బట్టి మారుతుంది. మీకు తగిన ధర కోసం సంప్రదించండి.",
    photoSoon: "ఫోటో త్వరలో",
    close: "మూసివేయి", prev: "మునుపటి కళాకృతి", next: "తదుపరి కళాకృతి",
  },
  cats: { devotional: "భక్తి", telugu: "తెలుగు సంప్రదాయ", temple: "ఆలయ", mythological: "పౌరాణిక", thanjavur: "తంజావూరు స్ఫూర్తి", custom: "ప్రత్యేక" },
  custom: {
    label: "ప్రత్యేక ఆర్డర్లు",
    h: "మీ మనసులో ఒక కళాకృతి ఆలోచన ఉందా?",
    p: "మీకు ఇష్టమైన దేవుడు, ఆలయం, సంప్రదాయ అంశం లేదా రిఫరెన్స్ చిత్రం ఉందా? మీ ఆలోచనను మంజునాథ్‌తో పంచుకుని, మీ అవసరాలకు తగిన చేతి కళాకృతి గురించి చర్చించండి.",
    types: ["భక్తి కళ", "తెలుగు సంప్రదాయ కళ", "ఆలయ కళ", "పౌరాణిక కళ", "ప్రత్యేక కళ", "తంజావూరు శైలి స్ఫూర్తి కళ"],
    note: "సంప్రదాయ పద్ధతులను నేర్చుకుంటూ, మెరుగుపరుచుకుంటూ రూపొందించిన తంజావూరు శైలి స్ఫూర్తి కళాకృతులు.",
    cta: "ప్రత్యేక ఆర్డర్ ప్రారంభించండి",
  },
  process: {
    label: "విధానం",
    h: "మీ ఆలోచన నుండి కళాకృతి వరకు",
    steps: [
      ["సంప్రదించండి", "వాట్సాప్ ద్వారా మంజునాథ్‌ను సంప్రదించి, కళాకృతి లేదా మీ ఆలోచనను పంచుకోండి."],
      ["చర్చించండి", "అంశం, రిఫరెన్స్, పరిమాణం, డిజైన్, పదార్థాలు మరియు ఫ్రేమ్ గురించి మాట్లాడుకోండి."],
      ["ధర తెలుసుకోండి", "మీ అవసరాలను బట్టి తుది ధర చర్చించబడుతుంది."],
      ["అడ్వాన్స్‌తో నిర్ధారించండి", "ఆర్డర్ నిర్ధారణకు అడ్వాన్స్ చెల్లింపు అవసరం."],
      ["కళాకృతి తయారీ", "అంగీకరించిన అవసరాల ప్రకారం మంజునాథ్ కళాకృతిని రూపొందిస్తారు."],
      ["తుది చెల్లింపు & అందజేత", "పూర్తయిన తర్వాత మిగిలిన చెల్లింపు మరియు డెలివరీ/తీసుకెళ్లే ఏర్పాట్లు చర్చించబడతాయి."],
    ],
  },
  materials: {
    label: "పదార్థాలు",
    h: "ప్రతి సృష్టికి తగిన పదార్థాలు",
    p: "కళాకృతి, డిజైన్ మరియు కావలసిన ముగింపును బట్టి పదార్థాలు ఎంచుకోబడతాయి.",
    list: ["డ్రాయింగ్ పేపర్", "వాటర్‌కలర్", "అక్రిలిక్", "ఆయిల్ రంగులు", "పోస్టర్ రంగులు", "బంగారు ఫాయిల్", "బంగారు రేకు", "రాళ్లు", "పూసలు", "చెక్క", "MDF బోర్డు"],
    vary: "ప్రతి కళాకృతిలో ఇవన్నీ ఉండవు — కళాకృతిని బట్టి పదార్థాలు మారుతాయి.",
    frame: "కళాకృతి మరియు మీ అవసరాలను బట్టి ఫ్రేమ్ ఎంపికలు నిర్ణయించబడతాయి.",
  },
  why: {
    h: "శ్రద్ధతో సృష్టించినవి",
    items: [
      ["చేతితో చేసినవి", "ఓపికతో, వివరాలపై శ్రద్ధతో చేతితో రూపొందించిన కళాకృతులు."],
      ["సంప్రదాయ స్ఫూర్తి", "భారతీయ సంస్కృతి, పురాణాలు మరియు తెలుగు సంప్రదాయాల స్ఫూర్తి."],
      ["మీకు నచ్చినట్లు", "మీ సొంత ఆలోచనలు, రిఫరెన్స్‌లను చర్చించవచ్చు."],
      ["నేరుగా సంభాషణ", "కళాకారునితో నేరుగా మాట్లాడవచ్చు."],
    ],
  },
  insta: { label: "మా పని", h: "కళా ప్రయాణాన్ని అనుసరించండి", p: "మరిన్ని కళాకృతులు, తయారీ విధానం మరియు కొత్త సృష్టుల కోసం ఇన్‌స్టాగ్రామ్ చూడండి.", btn: "ఇన్‌స్టాగ్రామ్‌లో చూడండి" },
  faq: {
    label: "ప్రశ్నలు",
    h: "తరచుగా అడిగే ప్రశ్నలు",
    items: [
      ["ప్రత్యేక కళాకృతులు చేస్తారా?", "అవును. మీ రిఫరెన్స్ చిత్రం, అంశం లేదా ఆలోచనను పంచుకుని, అవసరాలను నేరుగా మంజునాథ్‌తో చర్చించవచ్చు."],
      ["రిఫరెన్స్ చిత్రం పంపవచ్చా?", "అవును. రిఫరెన్స్ చిత్రాలను వాట్సాప్ ద్వారా పంపవచ్చు."],
      ["ఒక దేవుడు లేదా సంప్రదాయ అంశాన్ని కోరవచ్చా?", "అవును. మీరు కోరుకునే అంశాన్ని కళాకారునితో చర్చించవచ్చు."],
      ["ధర ఎలా నిర్ణయిస్తారు?", "కళాకృతి పరిమాణం, డిజైన్, పదార్థాలు, ఫ్రేమ్ మరియు ప్రత్యేక అవసరాలను బట్టి ధర ఉంటుంది."],
      ["అడ్వాన్స్ అవసరమా?", "అవును. ప్రత్యేక ఆర్డర్ నిర్ధారణకు అడ్వాన్స్ చెల్లింపు అవసరం."],
      ["ప్రస్తుతం ఏ ప్రాంతాలకు సేవలు అందిస్తారు?", "ప్రస్తుతం పుంగనూరు, చిత్తూరు మరియు అన్నమయ్య ప్రాంతాలు, పరిసరాలలోని వారికి సేవలు అందిస్తున్నాము."],
      ["తంజావూరు పెయింటింగ్స్ చేస్తారా?", "సంప్రదాయ తంజావూరు చిత్రకళా పద్ధతులను నేర్చుకుంటూ, మంజునాథ్ తంజావూరు శైలి స్ఫూర్తి కళాకృతులను కూడా రూపొందిస్తారు."],
    ],
  },
  contact: {
    label: "సంప్రదించండి",
    h: "కలిసి అర్థవంతమైనది సృష్టిద్దాం",
    p: "పెయింటింగ్ ఆలోచన, రిఫరెన్స్ చిత్రం ఉందా లేదా ఏదైనా కళాకృతి గురించి తెలుసుకోవాలా? మంజునాథ్‌ను సంప్రదించండి.",
    whatsapp: "వాట్సాప్", phone: "ఫోన్", email: "ఈమెయిల్", instagram: "ఇన్‌స్టాగ్రామ్", location: "ప్రాంతం",
    area: "ప్రస్తుతం పుంగనూరు, చిత్తూరు మరియు అన్నమయ్య ప్రాంతాలు, పరిసరాలలోని వారికి సేవలు అందిస్తున్నాము.",
  },
  footer: { tagline: "కళలో సంప్రదాయం — మనసుతో సృష్టించిన కళ", rights: "© 2026 మంజునాథ్ ఆర్ట్ స్టూడియో. సర్వహక్కులు ప్రత్యేకించబడ్డాయి." },
};

const DICTS = { en, te };
const Ctx = createContext<{ lang: Lang; t: Dict; setLang: (l: Lang) => void }>({ lang: "en", t: en, setLang: () => {} });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const s = localStorage.getItem("mas-lang");
    if (s === "te" || s === "en") setLangState(s);
  }, []);
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("mas-lang", l);
  };
  return <Ctx.Provider value={{ lang, t: DICTS[lang], setLang }}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx);
