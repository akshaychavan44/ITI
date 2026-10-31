import { GROWTH_COMPOSITION } from "./growth-booster";

type Nutrient = { symbol: string; label: string; value: string; color: string };
const nutrient = (symbol: string, label: string, value: string, color: string): Nutrient => ({ symbol, label, value, color });
const GREEN = "#5b812b", AMBER = "#ac7626", BLUE = "#3a7393", GOLD = "#9d841b", SILVER = "#808580", PURPLE = "#96589b";
export const PRODUCT_COMPOSITION: Record<string, Nutrient[]> = {
  "growth-booster": GROWTH_COMPOSITION.map((item) => nutrient(item.symbol, item.label, item.value, GREEN)),
  "bio-guard": [nutrient("10", "Microbial groups", "10-in-1 blend", GREEN), nutrient("CFU", "Cells per gram", "≥ 5 × 10⁷", BLUE)],
  "organic-phospho": [nutrient("N", "Nitrogen", "0.4–1.0%", GREEN), nutrient("P", "Phosphorus", "8–20%", AMBER), nutrient("C", "Organic carbon", "14%", GOLD), nutrient("C:N", "C:N ratio", "Below 20%", PURPLE)],
  "potash-plus": [nutrient("N", "Nitrogen", "1.66%", GREEN), nutrient("P", "Phosphorus", "0.38%", AMBER), nutrient("K", "Potassium", "14.50%", BLUE)],
  "phospho-gypsum": [nutrient("Ca", "CaSO₄·2H₂O", "70%", SILVER), nutrient("S", "SO₃", "13%", AMBER)],
  "jio-gypsum": [nutrient("Ca", "CaSO₄·2H₂O", "70%", SILVER), nutrient("S", "SO₃", "13%", AMBER), nutrient("Mg+", "Mg · B · Fe · Zn · Mn", "Added micronutrients", GREEN)],
};


export const COMPOSITION_HINDI: Record<string, string> = {"Nitrogen": "नाइट्रोजन", "Phosphorus": "फॉस्फोरस", "Organic carbon": "जैविक कार्बन", "C:N ratio": "कार्बन : नाइट्रोजन अनुपात", "Potassium": "पोटैशियम", "Microbial groups": "सूक्ष्मजीव समूह", "Cells per gram": "प्रति ग्राम कोशिकाएं", "Mg · B · Fe · Zn · Mn": "Mg · B · Fe · Zn · Mn"};
