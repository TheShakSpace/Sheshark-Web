/** Curated app content aligned with the native SheShark app / mock-data. */

export type ProductOffer = { title: string; detail: string };

export type MarketplaceProduct = {
  id: string;
  name: string;
  category: string;
  brand: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  description: string;
  /** What we offer on SheShark */
  offers: ProductOffer[];
  warranty?: string;
  shipping?: string;
  specs?: { label: string; value: string }[];
};

export const marketplaceProducts: MarketplaceProduct[] = [
  {
    id: "inv-1",
    name: "Microtek Heavy Duty 2350 Pure Sine Wave 2000VA/24V Inverter",
    category: "Solar Inverter",
    brand: "Microtek",
    price: 11800,
    image: "https://m.media-amazon.com/images/I/31MsUvPF-CS._AC_UY436_FMwebp_QL65_.jpg",
    rating: 4.8,
    reviews: 412,
    description:
      "2000VA pure sine wave inverter supporting dual batteries. Ideal for homes, offices and shops with digital display and 2-year warranty.",
    offers: [
      { title: "SheShark buyer protection", detail: "Dispute support and documented seller communication for eligible orders." },
      { title: "Installation guidance", detail: "Checklist for safe wiring and AC distribution — use a licensed electrician for final install." },
      { title: "Returns window", detail: "Review return policy with seller before purchase; keep packaging for DOA claims." },
    ],
    warranty: "Manufacturer warranty as per Microtek retail policy (typically 24 months on inverter — verify on invoice).",
    shipping: "Pan-India courier; remote areas may need extra days.",
    specs: [
      { label: "VA rating", value: "2000 VA" },
      { label: "Waveform", value: "Pure sine wave" },
      { label: "Battery", value: "24V dual battery compatible" },
    ],
  },
  {
    id: "inv-2",
    name: "Solarverter PUC PRO 3KVA/36V Hybrid Solar Inverter",
    category: "Solar Inverter",
    brand: "Hybrid Solar",
    price: 29999,
    image: "https://m.media-amazon.com/images/I/61+syISwrCL._SL1210_.jpg",
    rating: 4.7,
    reviews: 289,
    description:
      "Hybrid MPPT solar inverter with smart energy management and high efficiency solar priority charging.",
    offers: [
      { title: "Hybrid readiness", detail: "Prioritize PV when sun is available and fall back to grid/battery smoothly." },
      { title: "Energy coaching", detail: "SheShark learning hub links for sizing panels and batteries to this class of inverter." },
      { title: "B2B quote", detail: "Multiple units for a women-led cluster? Note interest in the funding form for partner intros." },
    ],
    warranty: "Verify dealer warranty and on-site support before payment.",
    shipping: "Heavy unit — lift-assist delivery may be required.",
    specs: [
      { label: "Capacity", value: "3 KVA" },
      { label: "Battery bus", value: "36V" },
      { label: "topology", value: "Hybrid MPPT" },
    ],
  },
  {
    id: "inv-3",
    name: "UTL Sun Lion 1000 rMPPT Solar Inverter with Lithium Battery",
    category: "Solar Inverter",
    brand: "UTL",
    price: 22000,
    image: "https://m.media-amazon.com/images/I/61QBVAtqsLL._SL1500_.jpg",
    rating: 4.9,
    reviews: 356,
    description:
      "800VA inverter with inbuilt LiFePO4 battery, rMPPT technology and wall-mountable compact design.",
    offers: [
      { title: "Compact footprint", detail: "Good for shops and home offices where floor space is limited." },
      { title: "LiFePO4", detail: "Generally longer cycle life than lead-acid — follow manufacturer charging limits." },
      { title: "SheShark verification", detail: "Ask seller for serial and warranty card photos before high-value transfer." },
    ],
    specs: [
      { label: "Type", value: "Integrated Li inverter" },
      { label: "MPPT", value: "rMPPT" },
    ],
  },
  {
    id: "bat-1",
    name: "Exide INVA Master IMTT1500 150Ah Tall Tubular Battery",
    category: "Solar Battery",
    brand: "Exide",
    price: 14102,
    image: "https://m.media-amazon.com/images/I/51KXnETjtgL._SX679_.jpg",
    rating: 4.8,
    reviews: 901,
    description:
      "150Ah tall tubular inverter battery offering long backup, low maintenance and 60-month warranty.",
    offers: [
      { title: "Pairing advice", detail: "Match C10/C20 ratings with your inverter — avoid under-sizing strings." },
      { title: "Watering", detail: "Tubular types may need topping — follow Exide maintenance schedule." },
      { title: "Recycle", detail: "Disposed batteries should go to authorized scrap/recyclers only." },
    ],
    warranty: "Pro-rated warranty common — read fine print with dealer.",
    specs: [{ label: "Capacity", value: "150 Ah tubular" }],
  },
  {
    id: "bat-2",
    name: "Amaron 150TT42 150Ah Tall Tubular Battery",
    category: "Solar Battery",
    brand: "Amaron",
    price: 14500,
    image: "https://m.media-amazon.com/images/I/61RDSeiNgsL._SX679_.jpg",
    rating: 4.8,
    reviews: 772,
    description:
      "150Ah tall tubular battery with fast charging TEKMAX technology and long backup performance.",
    offers: [
      { title: "Fast charge ready", detail: "Use with compatible chargers/inverters only." },
      { title: "SheShark compare", detail: "Use marketplace filters to compare Exide vs Amaron total cost of ownership." },
    ],
    specs: [{ label: "Capacity", value: "150 Ah" }],
  },
  {
    id: "light-1",
    name: "Epyz 200W Solar Flood Light Outdoor Waterproof",
    category: "Solar Lighting",
    brand: "Epyz",
    price: 4400,
    image: "https://m.media-amazon.com/images/I/71vlWKh6ayL._SX679_.jpg",
    rating: 4.6,
    reviews: 1240,
    description:
      "200W solar flood light with 571 LEDs, remote control, IP65 waterproof design and 10–12 hour illumination.",
    offers: [
      { title: "Retail starter SKU", detail: "Popular entry product for women-led solar lamp micro-businesses." },
      { title: "IP65", detail: "Outdoor mounting — still avoid submerging or blocking the panel." },
    ],
    specs: [
      { label: "Power", value: "200W class LED" },
      { label: "Protection", value: "IP65" },
    ],
  },
  {
    id: "acc-1",
    name: "ASHAPOWER NEON 70A Solar MPPT Charge Controller",
    category: "Solar Accessories",
    brand: "ASHAPOWER",
    price: 13237,
    image: "https://m.media-amazon.com/images/I/61DEHk1q4EL._SL1500_.jpg",
    rating: 4.7,
    reviews: 315,
    description:
      "70A MPPT solar charge controller supporting 12V–48V battery banks with ultra-fast power tracking.",
    offers: [
      { title: "System design", detail: "SheShark Energy Hub tutorials cover string voltage and MPPT selection." },
      { title: "Safety", detail: "Fuse/breaker sizing must match 70A capability — engineer your DC side." },
    ],
    specs: [{ label: "Current", value: "70 A MPPT" }],
  },
];

export type WomenBrand = {
  id: string;
  name: string;
  image: string;
  description: string;
  category: string;
  url: string;
};

export const womenBrands: WomenBrand[] = [
  {
    id: "b1",
    name: "Nykaa",
    image: "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQFjYOV6Mu2wL1JmYP0VpTMvVPveKlRpdn2Y-OniAU0C6JEBKYKIOXNX2spcmYZ",
    description:
      "India's leading beauty and wellness marketplace founded by Falguni Nayar, empowering millions of women consumers and creators.",
    category: "Beauty",
    url: "https://www.nykaa.com",
  },
  {
    id: "b2",
    name: "SUGAR Cosmetics",
    image: "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSabtggJTA63UrzXZlbA5cd3mRxYydnoWrMshmy_kq_kenkEeZFwzYbq08kdFQ5",
    description:
      "High performance makeup brand co-founded by Vineeta Singh, built for Indian skin tones and weather.",
    category: "Beauty",
    url: "https://in.sugarcosmetics.com",
  },
  {
    id: "b3",
    name: "Mamaearth",
    image: "https://cdn3.f-cdn.com//files/download/215747435/mama%20earth%20logo.jpg?width=780&height=780&fit=crop",
    description:
      "Toxin-free personal care brand co-founded by Ghazal Alagh, focused on safe products for families.",
    category: "Personal Care",
    url: "https://www.mamaearth.in",
  },
  {
    id: "b8",
    name: "TaxShe",
    image: "https://images.unsplash.com/photo-1554260570-e9689a3418b8?w=200",
    description:
      "Women-focused taxi and corporate commute service, employing women drivers and prioritizing rider safety.",
    category: "Transport",
    url: "https://taxshe.com",
  },
];

export type Lesson = { id: string; title: string; duration: string };
export type Course = {
  id: string;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  image: string;
  category: string;
  instructor: string;
  students: number;
  rating: number;
  syllabus: string[];
  lessonsDetail: Lesson[];
  /** YouTube watch, embed, youtu.be, nocookie embed, or 11-char video id */
  videoIntroUrl?: string;
  /** Shown under the player (source credit / context). */
  videoAttribution?: string;
  resources: string[];
};

export const courses: Course[] = [
  {
    id: "course-1",
    title: "Introduction to Solar Energy",
    description:
      "Foundations of photovoltaic systems: how sunlight becomes electricity, components of a home or shop plant, and safety basics. Matches the native app Learning hub structure.",
    duration: "2h 15m",
    lessons: 5,
    image:
      "https://images.pexels.com/photos/159397/solar-panel-array-power-sun-electricity-159397.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Energy",
    instructor: "SheShark Academy · aligns with TED-Ed solar primer",
    students: 8420,
    rating: 4.85,
    syllabus: [
      "Physics intuition without heavy math",
      "On-grid vs off-grid vs hybrid",
      "How to read a datasheet summary",
      "Basic safety and DC handling",
      "Next steps toward micro-business",
    ],
    lessonsDetail: [
      { id: "l-1-1", title: "What is solar energy?", duration: "15 min" },
      { id: "l-1-2", title: "How solar panels work", duration: "20 min" },
      { id: "l-1-3", title: "Types of solar systems", duration: "25 min" },
      { id: "l-1-4", title: "Solar energy benefits", duration: "15 min" },
      { id: "l-1-5", title: "Getting started with solar", duration: "20 min" },
    ],
    videoIntroUrl: "xKxrkht7CpY",
    videoAttribution:
      "Video: TED-Ed / Richard Komp — “How do solar panels work?” (YouTube). Licensed for playback via embed; © TED-Ed.",
    resources: [
      "MNRE (India renewables policy & schemes): https://mnre.gov.in/",
      "NREL — solar fundamentals & datasets: https://www.nrel.gov/solar/",
      "IEC / local safety: follow your state DISCOM & certified installer for live work",
    ],
  },
  {
    id: "course-2",
    title: "Start Your First Energy Business",
    description:
      "From identifying demand in your village or ward to simple bookkeeping and your first repeatable sale — built for women-led clean energy micro-enterprises in India.",
    duration: "3h 10m",
    lessons: 4,
    image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Business",
    instructor: "SheShark Academy · paired with TED expert session",
    students: 5100,
    rating: 4.9,
    syllabus: [
      "Problem discovery interviews",
      "One-page business plan",
      "Capital: Mudra, Stand-Up India, state schemes",
      "First ten customers playbook",
    ],
    lessonsDetail: [
      { id: "l-2-1", title: "Finding your niche", duration: "30 min" },
      { id: "l-2-2", title: "Business plan basics", duration: "45 min" },
      { id: "l-2-3", title: "Funding your business", duration: "30 min" },
      { id: "l-2-4", title: "Your first sale", duration: "35 min" },
    ],
    videoIntroUrl: "eHJnEHyyN1Y",
    videoAttribution:
      "Video: TED / John Mullins — “6 tips on being a successful entrepreneur” (YouTube). Pair with India scheme links below.",
    resources: [
      "Startup India hub: https://www.startupindia.gov.in/",
      "Pradhan Mantri MUDRA loans — portal: https://www.mudra.org.in/",
      "Stand-Up India (scheduled banks): https://www.standupmitra.in/",
    ],
  },
  {
    id: "course-3",
    title: "Basic Digital Marketing",
    description:
      "Practical distribution for solar SKUs and services: Instagram reels, WhatsApp Business catalogs, and local referrals.",
    duration: "2h 35m",
    lessons: 4,
    image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Marketing",
    instructor: "SheShark Academy · HubSpot-style campaign lens",
    students: 12050,
    rating: 4.82,
    syllabus: [
      "Channel fit for your audience",
      "Content batching",
      "Trust signals and testimonials",
      "Measurement that fits feature-phone users too",
    ],
    lessonsDetail: [
      { id: "l-3-1", title: "Social media basics", duration: "25 min" },
      { id: "l-3-2", title: "Creating content", duration: "30 min" },
      { id: "l-3-3", title: "WhatsApp Business", duration: "20 min" },
      { id: "l-3-4", title: "Growing your audience", duration: "35 min" },
    ],
    videoIntroUrl: "https://www.youtube.com/watch?v=3dW5RJxX_gQ",
    videoAttribution:
      "Video: HubSpot — “How To Create a Marketing Campaign” (YouTube). Useful structure for lean distribution on Reels / WhatsApp.",
    resources: [
      "Google Digital Garage (free fundamentals): https://learndigital.withgoogle.com/digitalgarage",
      "HubSpot — what is digital marketing: https://blog.hubspot.com/marketing/what-is-digital-marketing",
      "Meta Blueprint (optional): https://www.facebook.com/business/learn",
    ],
  },
  {
    id: "course-4",
    title: "Rooftop Sizing & Customer Proposals",
    description:
      "Estimate kWh, module count, and rough payback to present a clear, honest proposal — reduces refunds and builds trust.",
    duration: "2h",
    lessons: 3,
    image: "https://images.pexels.com/photos/9875448/pexels-photo-9875448.jpeg?auto=compress&cs=tinysrgb&w=1200",
    category: "Energy",
    instructor: "SheShark Academy · real rooftop economics lens",
    students: 3200,
    rating: 4.88,
    syllabus: ["Load audit", "Sun hours and derating", "Proposal structure"],
    lessonsDetail: [
      { id: "l-4-1", title: "Load tables made simple", duration: "40 min" },
      { id: "l-4-2", title: "Sizing strings conservatively", duration: "40 min" },
      { id: "l-4-3", title: "Presenting ROI honestly", duration: "40 min" },
    ],
    videoIntroUrl: "YJClQ6P1YIo",
    videoAttribution:
      "Video: real DIY rooftop solar expansion & hardware costs (YouTube). Complement with MNRE policy + a certified site survey before quoting customers.",
    resources: [
      "MNRE — grid-connected rooftop programme: https://mnre.gov.in/grid-connected-rooftop-and-small-solar-plants-programme/",
      "NREL PVWatts (yield estimates): https://pvwatts.nrel.gov/",
      "Validate every customer build with local DISCOM net-metering + a qualified installer",
    ],
  },
];

export type QuizQuestion = { id: string; question: string; options: string[]; correctIndex: number };

export const quizzes: Record<string, QuizQuestion[]> = {
  "course-1": [
    { id: "q1", question: "What is the primary source of solar energy?", options: ["Wind", "Sun", "Water", "Coal"], correctIndex: 1 },
    { id: "q2", question: "Solar panels convert sunlight into:", options: ["Heat only", "Electricity", "Water", "Gas"], correctIndex: 1 },
    {
      id: "q3",
      question: "Which is a benefit of solar energy?",
      options: ["High local air pollution", "Renewable and clean when operated", "Always free to install", "No maintenance"],
      correctIndex: 1,
    },
  ],
  "course-2": [
    { id: "q1", question: "First step in starting a business?", options: ["Buy inventory first", "Identify a real customer need", "Print visiting cards", "Rent a large office"], correctIndex: 1 },
    { id: "q2", question: "A business plan helps you:", options: ["Avoid customers", "Communicate your path simply", "Skip taxes", "Hide costs"], correctIndex: 1 },
    { id: "q3", question: "A common small-business loan route in India includes:", options: ["MUDRA / bank schemes", "Unregulated apps only", "Avoiding invoices", "No record keeping"], correctIndex: 0 },
  ],
  "course-3": [
    { id: "q1", question: "Strong channel for local businesses in India:", options: ["WhatsApp Business", "Only print newspaper", "Cold calls only", "No photos"], correctIndex: 0 },
    { id: "q2", question: "Content marketing means:", options: ["Spamming inboxes", "Sharing useful stories and tips", "Buying bots", "Hiding prices"], correctIndex: 1 },
    { id: "q3", question: "Social media helps mainly by:", options: ["Replacing legal contracts", "Discovery and trust", "Eliminating warranties", "Removing support"], correctIndex: 1 },
  ],
  "course-4": [
    { id: "q1", question: "Before sizing PV, you should:", options: ["Guess panel count", "Understand load and usage hours", "Ignore shading", "Oversell always"], correctIndex: 1 },
    { id: "q2", question: "Conservative design usually:", options: ["Ignores downtime", "Adds margin for heat and dust", "Uses zero safety factor", "Skips breakers"], correctIndex: 1 },
  ],
};

export type FundingRow = {
  id: string;
  title: string;
  provider: string;
  amount: string;
  deadline: string;
  description: string;
  eligibility: string;
  type: "grant" | "scheme" | "startup";
  isNew: boolean;
};

export const fundingRows: FundingRow[] = [
  {
    id: "fund-1",
    title: "PM-KUSUM Solar Subsidy",
    provider: "Ministry of New & Renewable Energy",
    amount: "Up to ₹3,00,000 (program-dependent)",
    deadline: "2026-06-30",
    description:
      "Government support for solar pumps and decentralised solar; useful for agri-adjacent women entrepreneurs.",
    eligibility: "Rural / farmer-linked categories per current MNRE guidelines — verify with DISCOM or approved vendor.",
    type: "scheme",
    isNew: true,
  },
  {
    id: "fund-2",
    title: "Stand-Up India Scheme",
    provider: "Government of India (scheduled banks)",
    amount: "₹10 lakh – ₹1 crore",
    deadline: "Ongoing",
    description:
      "Bank loans for greenfield enterprises by women or SC/ST founders; manufacturing or services including clean-tech retail.",
    eligibility: "First-time entrepreneur in target category; bank appraisal required.",
    type: "scheme",
    isNew: false,
  },
  {
    id: "fund-3",
    title: "Women Entrepreneurship Platform Grant",
    provider: "NITI Aayog / partner windows",
    amount: "Up to ₹5,00,000 (illustrative)",
    deadline: "2026-09-15",
    description:
      "Grants and visibility for women-led startups in sustainability and impact — timelines vary by call.",
    eligibility: "Registered India entity; traction criteria per call document.",
    type: "grant",
    isNew: true,
  },
  {
    id: "fund-4",
    title: "MUDRA Loan for Women",
    provider: "Scheduled commercial banks / NBFCs / MFIs",
    amount: "Up to ₹10,00,000 under Shishu / Kishor bands",
    deadline: "Ongoing",
    description: "Working capital and term needs for micro and small units; collateral-free in many cases under PMMY norms.",
    eligibility: "Business plan and KYC; institution-specific.",
    type: "startup",
    isNew: false,
  },
  {
    id: "fund-5",
    title: "SECI / state DISCOM rooftop incentives",
    provider: "SECI / State nodal agencies",
    amount: "Varies by tender",
    deadline: "Check state portal",
    description:
      "Central or state-specific rooftop programs — subsidy % changes; always read the active circular.",
    eligibility: "Residential / institutional categories as per active tender.",
    type: "scheme",
    isNew: true,
  },
];

export const dashboardMetrics = {
  totalEarningsInr: 730_000,
  monthlyEarningsInr: 125_000,
  pendingPayoutInr: 42_500,
  activeOrders: 37,
  shippedToday: 6,
  newLeads: 14,
  conversionPct: 18.4,
  momGrowthPct: 12.2,
  energySavedKwh: 342,
  gridSavingsInr: 45_800,
  co2SavedKg: 156,
  treesEquivalent: 8,
  inventorySkus: 24,
  lowStockSkus: 3,
  taxiBookingsMo: 42,
  learningHoursMo: 28,
  communityReach: 2150,
};

export const revenueSeries = [
  { name: "Mon", revenue: 42000, orders: 12, energy: 44 },
  { name: "Tue", revenue: 38500, orders: 9, energy: 51 },
  { name: "Wed", revenue: 51000, orders: 14, energy: 48 },
  { name: "Thu", revenue: 47800, orders: 11, energy: 56 },
  { name: "Fri", revenue: 62200, orders: 17, energy: 52 },
  { name: "Sat", revenue: 55000, orders: 15, energy: 49 },
  { name: "Sun", revenue: 41500, orders: 10, energy: 46 },
];

export const funnelData = [
  { stage: "Leads", value: 142 },
  { stage: "Quoted", value: 89 },
  { stage: "Won", value: 41 },
  { stage: "Repeat", value: 18 },
];

export type ActivityItem = {
  id: string;
  title: string;
  detail: string;
  time: string;
  type: "order" | "payout" | "course" | "alert";
};

export const activityFeed: ActivityItem[] = [
  {
    id: "a1",
    title: "Order ORD-1042 delivered",
    detail: "Exide 150Ah tubular — Meerut — COD cleared",
    time: "32 min ago",
    type: "order",
  },
  {
    id: "a2",
    title: "Payout initiated",
    detail: "₹18,400 → HDFC ****2188 (UTR in ~24h)",
    time: "3 h ago",
    type: "payout",
  },
  {
    id: "a3",
    title: "Course milestone",
    detail: "“Start your first energy business” — 75% complete",
    time: "Yesterday",
    type: "course",
  },
  {
    id: "a4",
    title: "Low stock",
    detail: "MPPT 40A controllers — 4 units left",
    time: "Yesterday",
    type: "alert",
  },
  {
    id: "a5",
    title: "New taxi corporate inquiry",
    detail: "3 monthly rides — Bengaluru office park",
    time: "2 d ago",
    type: "order",
  },
];

export type OrderRow = {
  id: string;
  product: string;
  buyer: string;
  city: string;
  amount: number;
  status: "pending" | "confirmed" | "shipped" | "delivered";
  sla: string;
};

export const ordersPipeline: OrderRow[] = [
  { id: "ord-1042", product: "150Ah Tubular", buyer: "Meera K.", city: "Meerut", amount: 14102, status: "delivered", sla: "On time" },
  { id: "ord-1043", product: "200W Flood light", buyer: "Ritu S.", city: "Indore", amount: 4400, status: "shipped", sla: "24h" },
  { id: "ord-1044", product: "70A MPPT", buyer: "Kavita P.", city: "Pune", amount: 13237, status: "confirmed", sla: "48h" },
  { id: "ord-1045", product: "3KVA hybrid", buyer: "Deepa R.", city: "Chennai", amount: 29999, status: "pending", sla: "Payment" },
];
