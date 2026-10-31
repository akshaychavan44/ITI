// Growth Booster Website Content Final: lab values are % w/w.
export const GROWTH_COMPOSITION = [
  { symbol: "C", label: "Total organic carbon", hindi: "कुल जैविक कार्बन", value: "46.37%" },
  { symbol: "Pr", label: "Protein", hindi: "प्रोटीन", value: "16.54%" },
  { symbol: "N", label: "Total nitrogen (as N)", hindi: "कुल नाइट्रोजन (N)", value: "2.65%" },
  { symbol: "P", label: "Total phosphates (as P₂O₅)", hindi: "कुल फॉस्फेट (P₂O₅)", value: "0.52%" },
  { symbol: "K", label: "Potassium (as K)", hindi: "पोटैशियम (K)", value: "0.338%" },
  { symbol: "Mg", label: "Magnesium (as MgSO₄)", hindi: "मैग्नीशियम (MgSO₄)", value: "0.85%" },
  { symbol: "Fe", label: "Iron (as FeSO₄)", hindi: "आयरन (FeSO₄)", value: "0.48%" },
  { symbol: "Zn", label: "Zinc (as ZnSO₄)", hindi: "जिंक (ZnSO₄)", value: "0.088%" },
  { symbol: "Mn", label: "Manganese (as MnSO₄)", hindi: "मैंगनीज (MnSO₄)", value: "0.064%" },
];

export const GROWTH_COPY = {
  en: {
    category: "Organic Fertilizers & Biostimulants", description: "Organic Growth Booster & Soil Conditioner",
    packLabel: "Pack sizes", pack: "1 kg / 5 kg", packaging: "Confirm available sizes with our team.",
    cropsLabel: "Recommended crops", crops: "All crops", formulationLabel: "Formulation", formulation: "Solid / Powder",
    doseLabel: "Application rate", dose: "Follow the product label", enquiry: "Enquire about Growth Booster",
    help: "For crop-specific guidance, contact our team.",
    inside: "Inside the formulation", composition: "Composition", lab: "As per lab analysis · % w/w",
    support: "Support for your soil", benefitsTitle: "Expected benefits",
    benefits: [
      ["Soil & plant health", "46.37% total organic carbon helps condition the soil, improve aeration and water retention, and support beneficial microbial activity around the roots."],
      ["Physiological growth", "16.54% protein contributes amino acids to support plant metabolism and vegetative growth."],
      ["Stress tolerance & chlorophyll production", "Magnesium, iron and manganese support chlorophyll synthesis, leaf greenness and photosynthesis, and help prevent nutrient-related yellowing."],
    ],
    guidance: "Application guide", use: "How to use",
    steps: [
      { title: "When to apply", items: [
        ["Time of day", "Apply early morning (6:00–9:00 AM) or late afternoon/evening (after 4:00 PM), when temperatures are cooler."],
        ["Soil & weather", "Apply to soil with adequate moisture and follow immediately with light irrigation. Avoid extreme heat or application just before heavy rainfall."],
      ] },
      { title: "Crop growth stages", items: [
        ["Vegetative stage · 15–30 days after sowing/transplanting", "Nitrogen (2.65%) and protein (16.54%) support early leaf, shoot and root development."],
        ["Pre-flowering / reproductive stage", "Magnesium, iron and zinc support flower initiation, reduced blossom drop and healthy early fruit or pod formation."],
      ] },
      { title: "Mixing & application", items: [
        ["Soil application", "Mix the label-recommended dose thoroughly with dry soil, sand or well-rotted organic compost."],
        ["Broadcast & irrigate", "Spread the mixture evenly near the root zones and irrigate immediately to help the organic matter integrate into the soil."],
      ] },
    ],
    legalEyebrow: "Product information", legalTitle: "Manufacturer & package details", manufacturer: "Manufacturer & marketer",
    address: "Iti Biotech, Plot No. 89, Industrial Area Koshmi, Betul (M.P.) 460001, Bharat.",
    contact: "Contact", packageTitle: "Check your package", packageNote: "Batch number, manufacturing date, expiry date and MRP are printed on the package.",
  },
  hi: {
    category: "जैविक उर्वरक एवं बायोस्टिमुलेंट", description: "जैविक ग्रोथ बूस्टर एवं मृदा सुधारक",
    packLabel: "पैक आकार", pack: "1 किग्रा / 5 किग्रा", packaging: "उपलब्ध पैक आकार के लिए हमारी टीम से संपर्क करें।",
    cropsLabel: "उपयुक्त फसलें", crops: "सभी फसलें", formulationLabel: "उत्पाद का रूप", formulation: "ठोस / पाउडर",
    doseLabel: "उपयोग की मात्रा", dose: "पैक पर दिए निर्देशों के अनुसार", enquiry: "ग्रोथ बूस्टर की जानकारी लें",
    help: "फसल के अनुसार मार्गदर्शन के लिए हमारी टीम से संपर्क करें।",
    inside: "उत्पाद में क्या है", composition: "संरचना", lab: "प्रयोगशाला विश्लेषण के अनुसार · % भार/भार",
    support: "मिट्टी और पौधे के लिए", benefitsTitle: "अपेक्षित लाभ",
    benefits: [
      ["मिट्टी और पौधे का स्वास्थ्य", "46.37% जैविक कार्बन मिट्टी को भुरभुरा बनाने, जल धारण क्षमता बढ़ाने और जड़ों के पास लाभकारी सूक्ष्मजीवों की गतिविधि बढ़ाने में मदद करता है।"],
      ["पौधे का विकास", "16.54% प्रोटीन अमीनो एसिड प्रदान करता है, जो पौधे की चयापचय क्रिया और वानस्पतिक विकास में सहायक है।"],
      ["तनाव सहनशीलता और हरियाली", "मैग्नीशियम, आयरन और मैंगनीज क्लोरोफिल निर्माण, पत्तियों की हरियाली और प्रकाश संश्लेषण में सहायक हैं तथा पोषक तत्वों की कमी से होने वाले पीलेपन को रोकने में मदद करते हैं।"],
    ],
    guidance: "उपयोग संबंधी मार्गदर्शन", use: "उपयोग कैसे करें",
    steps: [
      { title: "उपयोग का सही समय", items: [
        ["दिन का समय", "सुबह जल्दी (6:00–9:00 बजे) या देर शाम (4:00 बजे के बाद) प्रयोग करें, जब तापमान कम हो।"],
        ["मिट्टी और मौसम", "मिट्टी में पर्याप्त नमी होने पर प्रयोग करें और तुरंत हल्की सिंचाई करें। अत्यधिक गर्मी या भारी बारिश से ठीक पहले उपयोग से बचें।"],
      ] },
      { title: "फसल की अवस्था", items: [
        ["वानस्पतिक विकास · बुवाई/रोपाई के 15–30 दिन बाद", "2.65% नाइट्रोजन और 16.54% प्रोटीन शुरुआती अवस्था में पत्तियों, शाखाओं और जड़ों के विकास में मदद करते हैं।"],
        ["फूल आने से पहले / प्रजनन अवस्था", "मैग्नीशियम, आयरन और जिंक फूल बनने, फूलों का झड़ना कम करने और शुरुआती फल या फलियों के स्वस्थ विकास में सहायक हैं।"],
      ] },
      { title: "मिश्रण और उपयोग का तरीका", items: [
        ["मिट्टी में उपयोग", "पैक पर अनुशंसित मात्रा को सूखी मिट्टी, रेत या अच्छी तरह सड़ी हुई जैविक खाद में मिलाएं।"],
        ["भुरकाव और सिंचाई", "मिश्रण को जड़ों के पास समान रूप से बिखेरें और तुरंत सिंचाई करें, ताकि जैविक पदार्थ मिट्टी में अच्छी तरह मिल जाए।"],
      ] },
    ],
    legalEyebrow: "उत्पाद की जानकारी", legalTitle: "निर्माता और पैक संबंधी विवरण", manufacturer: "निर्माता एवं विपणनकर्ता",
    address: "इति बायोटेक, प्लॉट नं. 89, औद्योगिक क्षेत्र कोसमी, बैतूल (म.प्र.) 460001, भारत।",
    contact: "संपर्क", packageTitle: "पैक पर देखें", packageNote: "बैच नंबर, निर्माण तिथि, समाप्ति तिथि और अधिकतम खुदरा मूल्य (MRP) पैक पर दिए गए हैं।",
  },
};
