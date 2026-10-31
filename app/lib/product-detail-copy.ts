import type { CatalogueProduct } from "./catalogue";
import { BENEFIT_EXPLANATIONS } from "./benefits";
import { GROWTH_COPY } from "./growth-booster";

// Translations of existing catalogue content. Product-specific PDF guidance is
// available only for Growth Booster and must not be copied to other products.
const HINDI: Record<string, { description: string; benefits: string[][] }> = {
  "bio-guard": {
    description: "पोटैशियम की उपलब्धता बढ़ाने वाला दानेदार जैव उर्वरक। न्यूनतम CFU 5×10⁷ कोशिकाएं/ग्राम।",
    benefits: [
      ["एक पैक में दस सूक्ष्मजीव समूह", "दस सूक्ष्मजीव समूह पोषक तत्वों की उपलब्धता, मिट्टी की जैविक गतिविधि और जड़ों के स्वास्थ्य में सहायक हैं।"],
      ["मिट्टी की उर्वरता और सूक्ष्मजीव गतिविधि", "लाभकारी सूक्ष्मजीव जैविक पदार्थों के अपघटन और पोषक तत्वों के पुनर्चक्रण में मदद करते हैं।"],
      ["NPK और पोषक तत्वों की उपलब्धता", "सूक्ष्मजीव मिट्टी में मौजूद पोषक तत्वों को पौधों के लिए अधिक सुलभ बनाने वाली प्रक्रियाओं में मदद करते हैं।"],
      ["जड़ों, फूलों और फलों का विकास", "जड़ों के आसपास बेहतर पोषण इन विकास अवस्थाओं में सहायक होता है।"],
      ["प्रतिकूल मौसम में सहारा", "स्वस्थ जड़ें और संतुलित पोषण उचित सिंचाई के साथ सूखे और गर्मी जैसी परिस्थितियों का सामना करने में मदद करते हैं।"],
      ["कीट, जड़ रोग और फसल गिरने से सुरक्षा", "जड़ों के स्वास्थ्य और पौधे को सीधा खड़ा रहने में सहायक। फसल के अनुसार प्रबंधन के लिए हमारी टीम से सलाह लें।"],
    ],
  },
  "organic-phospho": {
    description: "फॉस्फेट युक्त दानेदार जैविक खाद (PROM)।",
    benefits: [
      ["जड़ों के विकास में सहायक", "विकसित जड़ें मिट्टी से पानी और पोषक तत्व लेने में पौधे की मदद करती हैं।"],
      ["मिट्टी में फॉस्फोरस की उपलब्धता", "फॉस्फेट युक्त उत्पाद जड़ों के विकास और पौधे की ऊर्जा प्रक्रियाओं के लिए फॉस्फोरस प्रदान करता है।"],
      ["फूल और फल बनने में सहायक", "फॉस्फोरस फूल और फल के विकास से जुड़ी ऊर्जा प्रक्रियाओं में योगदान देता है।"],
      ["जैविक कार्बन और सूक्ष्म पोषक तत्व", "जैविक कार्बन मिट्टी के सूक्ष्मजीवों को पोषण देता है और सूक्ष्म पोषक तत्व पौधे के पोषण में सहायक होते हैं।"],
      ["मिट्टी की संरचना और सूक्ष्मजीव गतिविधि", "जैविक पदार्थ जड़ों, हवा और नमी के लिए मिट्टी का वातावरण बेहतर बनाने में मदद करता है।"],
    ],
  },
  "potash-plus": {
    description: "शीरे से प्राप्त दानेदार पोटाश।",
    benefits: [
      ["फलों और सब्जियों की गुणवत्ता", "पोटैशियम शर्करा के परिवहन और फलों के विकास में भूमिका निभाता है तथा उपज की गुणवत्ता में सहायक है।"],
      ["रोग और कीटों के प्रति प्रतिरोध", "संतुलित पोटैशियम पोषण पौधे के सामान्य कार्य और ऊतक विकास में सहायक है।"],
      ["पानी के बेहतर उपयोग में सहायक", "पोटैशियम पत्तियों के रंध्रों के खुलने और बंद होने तथा पानी के प्रबंधन में सहायक है।"],
      ["तनों को मजबूत बनाने में सहायक", "पोटैशियम पौधे के ऊतकों के विकास और सामान्य कार्य में योगदान देता है।"],
      ["ठंड सहने की क्षमता", "पर्याप्त पोटैशियम ठंड में जल संतुलन और कोशिकाओं के सामान्य कार्य में सहायक है।"],
      ["पोषक तत्वों का अवशोषण और प्रकाश संश्लेषण", "पोटैशियम पोषक तत्वों के परिवहन और सूर्य के प्रकाश से भोजन बनाने की प्रक्रियाओं में योगदान देता है।"],
    ],
  },
};

const GYPSUM_BENEFITS = [
  ["क्षारीय मिट्टी का सुधार", "उपयुक्त सोडियम प्रभावित मिट्टी में जिप्सम सुधारक के रूप में उपयोग किया जाता है। उपयुक्तता और मात्रा तय करने के लिए मिट्टी की जांच कराएं।"],
  ["जड़ों और तनों का विकास", "कैल्शियम कोशिका भित्तियों की संरचना में योगदान देता है। उचित पोषण जड़ों और तनों के विकास में सहायक है।"],
  ["फसल गिरने से बचाव", "मजबूत जड़ों और तनों को सहारा मिलने से पौधे सीधे खड़े रहने में मदद मिलती है।"],
  ["क्लोरोफिल निर्माण में सहायक", "पोषण पत्तियों की हरियाली और सूर्य के प्रकाश से भोजन बनाने की प्रक्रियाओं में सहायक है।"],
  ["मिट्टी में हवा और पानी का आवागमन", "मिट्टी का सुधार जड़ों के आसपास जल निकास और हवा के लिए बेहतर वातावरण बनाने में सहायक है।"],
];

export function productDetailCopy(product: CatalogueProduct, language: "en" | "hi") {
  if (product.id === "growth-booster") return GROWTH_COPY[language];
  const base = GROWTH_COPY[language];
  const hindi = language === "hi";
  const translated = HINDI[product.id];
  const description = translated?.description ?? (product.id === "jio-gypsum"
    ? "मैग्नीशियम, बोरॉन, आयरन, जिंक और मैंगनीज युक्त दानेदार जिप्सम उर्वरक।"
    : "दानेदार मृदा सुधारक।");
  const categories: Record<string, string> = { "Organic Fertilisers": "जैविक उर्वरक", "Bio Fertilisers": "जैव उर्वरक", "Soil Conditioners": "मृदा सुधारक" };
  return {
    ...base,
    category: hindi ? categories[product.category] : product.category,
    description: hindi ? description : product.kind,
    pack: hindi ? product.pack.replace("kg", "किग्रा") : product.pack,
    formulation: hindi ? "दानेदार" : "Granular",
    dose: hindi ? product.dosage.replace("kg per acre", "किग्रा प्रति एकड़") : product.dosage,
    enquiry: hindi ? `${product.hindi} की जानकारी लें` : `Enquire about ${product.name}`,
    lab: hindi ? "उत्पाद विवरण के अनुसार · दानेदार" : "As listed in product specifications · Granular",
    benefits: hindi ? (translated?.benefits ?? GYPSUM_BENEFITS) : product.benefits.map((title) => [title, BENEFIT_EXPLANATIONS[title]]),
    steps: [{
      title: hindi ? "उपयोग संबंधी मार्गदर्शन" : "Application guidance",
      items: [
        [hindi ? "पैक पर दी गई मात्रा" : "Label dosage", hindi ? product.dosage.replace("kg per acre", "किग्रा प्रति एकड़") : product.dosage],
        [hindi ? "फसल के अनुसार उपयोग" : "Crop-specific application", hindi ? "उपयोग के समय और तरीके के लिए पैक के निर्देशों का पालन करें और हमारी टीम से सलाह लें।" : "Follow the product label and contact our team for application timing and methods suited to your crop."],
      ],
    }],
  };
}
