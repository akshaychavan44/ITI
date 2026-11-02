export type BlogPost = {
  slug: string;
  title: string;
  category: "Soil Care" | "Farming Tips" | "Product Guides" | "Updates";
  excerpt: string;
  image: string;
  imageAlt: string;
  takeaway: string;
  photos: { src: string; alt: string }[];
  sections: { heading: string; paragraphs: string[] }[];
};

// Starter editorial content. Add articles here; routes are generated at build time.
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "good-soil-good-beginning",
    photos: [
      { src: "/photos/blog/soil-1.webp", alt: "Spring Seedlings in Close-Up" },
      { src: "/photos/blog/soil-2.webp", alt: "Detailed Soil Texture" },
      { src: "/photos/blog/soil-3.webp", alt: "Cracked Earth Texture" },
      { src: "/photos/blog/soil-4.webp", alt: "Brown Soil Texture Close-Up" },
      { src: "/photos/blog/soil-5.webp", alt: "Potted Plant Root System" },
      { src: "/photos/blog/soil-6.webp", alt: "Seedlings in Dark Soil" },
      { src: "/photos/blog/soil-7.webp", alt: "Rich Brown Soil Texture" },
      { src: "/photos/blog/soil-8.webp", alt: "Seedlings Sprouting from Fertile Soil" },
    ],
    title: "Good soil is a good beginning",
    category: "Soil Care",
    excerpt: "Know your field. Ask better questions. Plan your next season with purpose.",
    image: "/photos/blog/soil-1.webp",
    imageAlt: "Spring Seedlings in Close-Up",
    takeaway: "Observe first. Test your soil. Choose inputs with a clear purpose.",
    sections: [
      { heading: "Start with your own field", paragraphs: ["Record last season’s crop, uneven growth and places where water collected.", "Photograph the same spots over time. Note whether changes affect one patch or the whole field."] },
      { heading: "Let a soil test guide you", paragraphs: ["Ask your local testing service how to collect a representative soil sample.", "Review the results with an agricultural adviser, alongside your crop and irrigation records."] },
      { heading: "Choose with a clear purpose", paragraphs: ["Compare composition, intended use and application directions—not just product names.", "Follow the label and local advice. Record what you apply, where and when."] },
    ],
  },
  {
    slug: "preparing-for-a-new-growing-season",
    photos: [
      { src: "/photos/blog/season-1.webp", alt: "Sunlit Golden Wheat Field" },
      { src: "/photos/blog/season-2.webp", alt: "Terraced Rice Fields" },
      { src: "/photos/blog/season-3.webp", alt: "Sunlit Golden Wheat Field" },
      { src: "/photos/blog/season-4.webp", alt: "Sprinkler-Irrigated Crop Field" },
      { src: "/photos/blog/season-5.webp", alt: "Terraced Rice Fields in Sunlight" },
      { src: "/photos/blog/season-6.webp", alt: "Assorted Seeds in Wooden Compartments" },
      { src: "/photos/blog/season-7.webp", alt: "Assorted Grains and Seeds in Glass Bowls" },
      { src: "/photos/blog/season-8.webp", alt: "Sunlit Wheat Field" },
    ],
    title: "Preparing for a new growing season",
    category: "Farming Tips",
    excerpt: "A fresh season starts with a clear plan for your field, crop and inputs.",
    image: "/photos/blog/season-1.webp",
    imageAlt: "Sunlit Golden Wheat Field",
    takeaway: "Review the last season, plan for local conditions and keep your records together.",
    sections: [
      { heading: "Review the season behind you", paragraphs: ["Note what grew well, which areas needed attention and when major field operations happened.", "Keep soil-test reports, input labels and photographs together in a simple field notebook."] },
      { heading: "Plan around local conditions", paragraphs: ["Discuss crop choice, water availability and field preparation with a local agricultural adviser.", "Check equipment, supplies and labour before the season begins."] },
      { heading: "Keep your input plan readable", paragraphs: ["For each input, record its purpose, intended field and label directions.", "Check packaging and storage requirements. Leave space for observations as the season unfolds."] },
    ],
  },
  {
    slug: "a-closer-look-at-your-field",
    photos: [
      { src: "/photos/blog/observe-1.webp", alt: "Dew-Kissed Leaves" },
      { src: "/photos/blog/observe-2.webp", alt: "Macro Water-Drop Leaf Detail" },
      { src: "/photos/blog/observe-3.webp", alt: "Dew-Kissed Green Leaves" },
      { src: "/photos/blog/observe-4.webp", alt: "Dewy Green Leaves" },
      { src: "/photos/blog/observe-5.webp", alt: "Rain-Kissed Leaf" },
      { src: "/photos/blog/observe-6.webp", alt: "Dew-Kissed Green Foliage" },
      { src: "/photos/blog/observe-7.webp", alt: "Dew-Kissed Green Foliage" },
      { src: "/photos/blog/observe-8.webp", alt: "Dew-Kissed Greenery" },
    ],
    title: "A closer look at your field",
    category: "Soil Care",
    excerpt: "Small observations. Clearer questions. A better record of every growing season.",
    image: "/photos/blog/observe-1.webp",
    imageAlt: "Dew-Kissed Leaves",
    takeaway: "Notice the change, record the context and ask for advice before choosing a treatment.",
    sections: [
      { heading: "Make observation a habit", paragraphs: ["Revisit the same places regularly. Note the date, weather, irrigation and crop changes.", "Take a wide photograph and a close-up to capture both the field and the detail."] },
      { heading: "Describe before you diagnose", paragraphs: ["Record which plant parts changed, how widespread it is and when it began.", "Share those details and recent input records with a qualified adviser before choosing a treatment."] },
      { heading: "Close the loop", paragraphs: ["Write down the advice received and any action taken. Keep observing the same areas.", "Review the notes after harvest to identify questions for the next season."] },
    ],
  },
  {
    slug: "understanding-the-bio-growth-range",
    photos: [
      { src: "/photos/blog/guide-1.webp", alt: "Lush Greenhouse Interior" },
      { src: "/photos/blog/guide-2.webp", alt: "Greenhouse Oasis" },
      { src: "/photos/blog/guide-3.webp", alt: "Misty Vietnamese Rice Terraces" },
      { src: "/photos/blog/guide-4.webp", alt: "Greenhouse Botanical Oasis" },
      { src: "/photos/blog/guide-5.webp", alt: "Irrigation Rig Watering Cornfield" },
      { src: "/photos/blog/guide-6.webp", alt: "Golden Wheat Field" },
      { src: "/photos/blog/guide-7.webp", alt: "Greenhouse Foliage" },
      { src: "/photos/blog/guide-8.webp", alt: "Mountain Rice Terraces" },
    ],
    title: "Finding your place in the Bio Growth+ range",
    category: "Product Guides",
    excerpt: "Start with your field’s needs. Explore the range with the right questions in mind.",
    image: "/photos/blog/guide-1.webp",
    imageAlt: "Lush Greenhouse Interior",
    takeaway: "Know the purpose, read the label and bring your questions to the Iti Biotech team.",
    sections: [
      { heading: "Begin with your field", paragraphs: ["Describe what you want to understand about your soil or crop.", "Keep your crop stage, field observations and soil-test results ready for the conversation."] },
      { heading: "Read the details together", paragraphs: ["Compare composition, stated uses and pack information in the Bio Growth+ catalogue.", "Follow the current label for rates, timing, handling and compatibility. Ask when anything is unclear."] },
      { heading: "Bring your questions to us", paragraphs: ["Tell the team your crop, field location and the support you are looking for.", "Mention existing inputs and advice. Explore the collection, then use the enquiry link to get in touch."] },
    ],
  },
];

export function readingTime(post: BlogPost) {
  const words = [post.excerpt, post.takeaway, ...post.sections.flatMap((section) => [section.heading, ...section.paragraphs])].join(" ").split(/\s+/).length;
  return `${Math.max(1, Math.ceil(words / 200))} min read`;
}
