import type { MenuCategory, MenuItem, MenuTag } from "./types";

export const menuCategories: { id: MenuCategory; label: string; blurb: string }[] = [
  { id: "signatures", label: "Signatures", blurb: "The cups we're known for." },
  { id: "espresso", label: "Espresso", blurb: "Classic, carefully pulled." },
  { id: "cold", label: "Cold", blurb: "For warm Cebu afternoons." },
  { id: "non-coffee", label: "Non-coffee", blurb: "Just as calm, no caffeine needed." },
  { id: "food", label: "Food & Pastries", blurb: "Something small on the side." },
];

export const menuTagLabels: Record<MenuTag, string> = {
  bestseller: "Bestseller",
  new: "New",
  iced: "Iced",
  hot: "Hot",
  "oat-friendly": "Oat-friendly",
};

// PLACEHOLDER — replace with client menu (items, descriptions, and prices).
export const menu: MenuItem[] = [
  // Signatures
  { id: "quiet-hour", category: "signatures", name: "Quiet Hour Latte", description: "Espresso, milk, and a hush of muscovado.", price: 160, tags: ["bestseller", "iced", "hot", "oat-friendly"] },
  { id: "sea-salt-cloud", category: "signatures", name: "Sea Salt Cloud", description: "Cold brew under a soft, salted cream foam.", price: 170, tags: ["iced"] },
  { id: "ube-calm", category: "signatures", name: "Ube Calm", description: "Ube cream folded into a gentle latte.", price: 175, tags: ["new", "iced", "oat-friendly"] },
  { id: "tablea-mocha", category: "signatures", name: "Tablea Mocha", description: "Cebuano tablea chocolate meets espresso.", price: 165, tags: ["hot", "iced"] },

  // Espresso
  { id: "espresso", category: "espresso", name: "Espresso", description: "A short, steady double shot.", price: 100, tags: ["hot"] },
  { id: "americano", category: "espresso", name: "Americano", description: "Espresso and water, clean and easy.", price: 120, tags: ["hot", "iced"] },
  { id: "cortado", category: "espresso", name: "Cortado", description: "Equal parts espresso and warm milk.", price: 130, tags: ["hot", "oat-friendly"] },
  { id: "flat-white", category: "espresso", name: "Flat White", description: "Velvety milk over a ristretto base.", price: 145, tags: ["hot", "oat-friendly"] },
  { id: "spanish-latte", category: "espresso", name: "Spanish Latte", description: "Sweet, round, and quietly rich.", price: 155, tags: ["bestseller", "hot", "iced"] },

  // Cold
  { id: "cold-brew", category: "cold", name: "Slow Cold Brew", description: "Steeped for 18 hours. Smooth all the way down.", price: 140, tags: ["iced"] },
  { id: "orange-tonic", category: "cold", name: "Orange Espresso Tonic", description: "Bright, fizzy, and lightly bitter.", price: 165, tags: ["iced", "new"] },
  { id: "iced-oat-latte", category: "cold", name: "Iced Oat Latte", description: "Our house espresso with creamy oat milk.", price: 170, tags: ["iced", "oat-friendly"] },

  // Non-coffee
  { id: "matcha-latte", category: "non-coffee", name: "Matcha Latte", description: "Ceremonial-grade matcha, softly sweetened.", price: 165, tags: ["iced", "hot", "oat-friendly"] },
  { id: "tablea-choco", category: "non-coffee", name: "Tablea Hot Choco", description: "Thick, comforting, made the old way.", price: 140, tags: ["hot"] },
  { id: "strawberry-milk", category: "non-coffee", name: "Strawberry Milk", description: "House strawberry jam and cold milk.", price: 150, tags: ["iced"] },

  // Food & Pastries
  { id: "butter-croissant", category: "food", name: "Butter Croissant", description: "Flaky, golden, best with any cup.", price: 110 },
  { id: "banana-loaf", category: "food", name: "Banana Loaf", description: "Moist slice with toasted walnuts.", price: 95, tags: ["bestseller"] },
  { id: "ensaymada", category: "food", name: "Cheese Ensaymada", description: "Soft brioche, butter, and grated cheese.", price: 90 },
];
