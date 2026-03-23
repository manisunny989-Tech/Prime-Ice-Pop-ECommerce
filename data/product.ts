export const STORE_PRODUCTS = [
  {
    id: "prime-strawberry-watermelon",
    name: "Strawberry Watermelon",
    price: 20.00,
    color: "#E22668",
    image: "/images/prime-bottle-static1.png", // Fallback mock image since we only have one transparent PNG
    description: "The ultimate sweet and refreshing fusion."
  },
  {
    id: "prime-ice-pop",
    name: "Ice Pop",
    price: 20.00,
    color: "#0072BC",
    image: "/images/prime-bottle-static1.png",
    description: "Classic cherry, blue raspberry, and lime."
  },
  {
    id: "prime-blue-raspberry",
    name: "Blue Raspberry",
    price: 20.00,
    color: "#00AEEF",
    image: "/images/prime-bottle-static1.png",
    description: "Bold, tangy, and electrifying blue raspberry."
  },
  {
    id: "prime-lemon-lime",
    name: "Lemon Lime",
    price: 20.00,
    color: "#8BC53F",
    image: "/images/prime-bottle-static1.png",
    description: "Crisp and citrusy for maximum refreshment."
  }
];

export const productData = {
  name: "Prime Ice Pop",
  price: "$20.00",
  colors: {
    blue: "#0072BC",
    red: "#E31C23",
    white: "#FFFFFF",
  },
  staticAssets: {
    staticBottle: "/images/prime-bottle-static1.png",
    finalTagline: "THE ULTIMATE FREEZE. HYDRATE NOW.",
  },
  specs: [
    "10% Coconut Water",
    "834mg Electrolytes",
    "250mg BCAAs",
    "Zero Sugar"
  ],
  storySections: [
    {
      title: "THE ARCTIC BLAST",
      description: "Experience the chill that never fades. Prime Ice Pop brings the ultimate freeze directly to your taste buds."
    },
    {
      title: "TRIPLE FLAVOR THREAT",
      description: "A legendary trio of cherry, blue raspberry, and lime. Power through your workout with uncompromised taste."
    },
    {
      title: "ZERO SUGAR. PURE FUEL.",
      description: "Nothing holding you back. Just clean, crisp hydration designed to keep you at peak performance all day long."
    },
    {
      title: "ULTIMATE HYDRATION",
      description: "Packed with 834mg of electrolytes and 10% coconut water. Recover faster and push harder with every sip."
    }
  ],
  postSequenceContent: {
    hydrationSpecs: {
      title: "Hydration Specs",
      details: "Detailed breakdown of electrolytes. Prime provides the ultimate recovery with a potent mix of sodium, potassium, and magnesium."
    },
    athleteTested: {
      title: "Athlete Tested",
      details: "Performance benefits proven by the world's elite. Whether you are on the field or in the gym, Prime Ice Pop delivers."
    }
  }
};
