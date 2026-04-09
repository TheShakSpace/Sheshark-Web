/** Localized mirrors of appContent / dashboard copy (English source strings). */
export const dataEn = {
  courses: {
    'course-1': {
      title: 'Introduction to Solar Energy',
      description:
        'Foundations of photovoltaic systems: how sunlight becomes electricity, components of a home or shop plant, and safety basics. Matches the native app Learning hub structure.',
      duration: '2h 15m',
      category: 'Energy',
      instructor: 'SheShark Academy · aligns with TED-Ed solar primer',
      videoAttribution:
        'Video: TED-Ed / Richard Komp — “How do solar panels work?” (YouTube). Licensed for playback via embed; © TED-Ed.',
      syllabus: [
        'Physics intuition without heavy math',
        'On-grid vs off-grid vs hybrid',
        'How to read a datasheet summary',
        'Basic safety and DC handling',
        'Next steps toward micro-business',
      ],
      resources: [
        'MNRE (India renewables policy & schemes): https://mnre.gov.in/',
        'NREL — solar fundamentals & datasets: https://www.nrel.gov/solar/',
        'IEC / local safety: follow your state DISCOM & certified installer for live work',
      ],
      lessons: {
        'l-1-1': { title: 'What is solar energy?', duration: '15 min' },
        'l-1-2': { title: 'How solar panels work', duration: '20 min' },
        'l-1-3': { title: 'Types of solar systems', duration: '25 min' },
        'l-1-4': { title: 'Solar energy benefits', duration: '15 min' },
        'l-1-5': { title: 'Getting started with solar', duration: '20 min' },
      },
    },
    'course-2': {
      title: 'Start Your First Energy Business',
      description:
        'From identifying demand in your village or ward to simple bookkeeping and your first repeatable sale — built for women-led clean energy micro-enterprises in India.',
      duration: '3h 10m',
      category: 'Business',
      instructor: 'SheShark Academy · paired with TED expert session',
      videoAttribution:
        'Video: TED / John Mullins — “6 tips on being a successful entrepreneur” (YouTube). Pair with India scheme links below.',
      syllabus: [
        'Problem discovery interviews',
        'One-page business plan',
        'Capital: Mudra, Stand-Up India, state schemes',
        'First ten customers playbook',
      ],
      resources: [
        'Startup India hub: https://www.startupindia.gov.in/',
        'Pradhan Mantri MUDRA loans — portal: https://www.mudra.org.in/',
        'Stand-Up India (scheduled banks): https://www.standupmitra.in/',
      ],
      lessons: {
        'l-2-1': { title: 'Finding your niche', duration: '30 min' },
        'l-2-2': { title: 'Business plan basics', duration: '45 min' },
        'l-2-3': { title: 'Funding your business', duration: '30 min' },
        'l-2-4': { title: 'Your first sale', duration: '35 min' },
      },
    },
    'course-3': {
      title: 'Basic Digital Marketing',
      description:
        'Practical distribution for solar SKUs and services: Instagram reels, WhatsApp Business catalogs, and local referrals.',
      duration: '2h 35m',
      category: 'Marketing',
      instructor: 'SheShark Academy · HubSpot-style campaign lens',
      videoAttribution:
        'Video: HubSpot — “How To Create a Marketing Campaign” (YouTube). Useful structure for lean distribution on Reels / WhatsApp.',
      syllabus: [
        'Channel fit for your audience',
        'Content batching',
        'Trust signals and testimonials',
        'Measurement that fits feature-phone users too',
      ],
      resources: [
        'Google Digital Garage (free fundamentals): https://learndigital.withgoogle.com/digitalgarage',
        'HubSpot — what is digital marketing: https://blog.hubspot.com/marketing/what-is-digital-marketing',
        'Meta Blueprint (optional): https://www.facebook.com/business/learn',
      ],
      lessons: {
        'l-3-1': { title: 'Social media basics', duration: '25 min' },
        'l-3-2': { title: 'Creating content', duration: '30 min' },
        'l-3-3': { title: 'WhatsApp Business', duration: '20 min' },
        'l-3-4': { title: 'Growing your audience', duration: '35 min' },
      },
    },
    'course-4': {
      title: 'Rooftop Sizing & Customer Proposals',
      description:
        'Estimate kWh, module count, and rough payback to present a clear, honest proposal — reduces refunds and builds trust.',
      duration: '2h',
      category: 'Energy',
      instructor: 'SheShark Academy · real rooftop economics lens',
      videoAttribution:
        'Video: real DIY rooftop solar expansion & hardware costs (YouTube). Complement with MNRE policy + a certified site survey before quoting customers.',
      syllabus: ['Load audit', 'Sun hours and derating', 'Proposal structure'],
      resources: [
        'MNRE — grid-connected rooftop programme: https://mnre.gov.in/grid-connected-rooftop-and-small-solar-plants-programme/',
        'NREL PVWatts (yield estimates): https://pvwatts.nrel.gov/',
        'Validate every customer build with local DISCOM net-metering + a qualified installer',
      ],
      lessons: {
        'l-4-1': { title: 'Load tables made simple', duration: '40 min' },
        'l-4-2': { title: 'Sizing strings conservatively', duration: '40 min' },
        'l-4-3': { title: 'Presenting ROI honestly', duration: '40 min' },
      },
    },
  },
  quizzes: {
    'course-1': {
      q1: {
        question: 'What is the primary source of solar energy?',
        options: ['Wind', 'Sun', 'Water', 'Coal'],
      },
      q2: {
        question: 'Solar panels convert sunlight into:',
        options: ['Heat only', 'Electricity', 'Water', 'Gas'],
      },
      q3: {
        question: 'Which is a benefit of solar energy?',
        options: ['High local air pollution', 'Renewable and clean when operated', 'Always free to install', 'No maintenance'],
      },
    },
    'course-2': {
      q1: {
        question: 'First step in starting a business?',
        options: ['Buy inventory first', 'Identify a real customer need', 'Print visiting cards', 'Rent a large office'],
      },
      q2: {
        question: 'A business plan helps you:',
        options: ['Avoid customers', 'Communicate your path simply', 'Skip taxes', 'Hide costs'],
      },
      q3: {
        question: 'A common small-business loan route in India includes:',
        options: ['MUDRA / bank schemes', 'Unregulated apps only', 'Avoiding invoices', 'No record keeping'],
      },
    },
    'course-3': {
      q1: {
        question: 'Strong channel for local businesses in India:',
        options: ['WhatsApp Business', 'Only print newspaper', 'Cold calls only', 'No photos'],
      },
      q2: {
        question: 'Content marketing means:',
        options: ['Spamming inboxes', 'Sharing useful stories and tips', 'Buying bots', 'Hiding prices'],
      },
      q3: {
        question: 'Social media helps mainly by:',
        options: ['Replacing legal contracts', 'Discovery and trust', 'Eliminating warranties', 'Removing support'],
      },
    },
    'course-4': {
      q1: {
        question: 'Before sizing PV, you should:',
        options: ['Guess panel count', 'Understand load and usage hours', 'Ignore shading', 'Oversell always'],
      },
      q2: {
        question: 'Conservative design usually:',
        options: ['Ignores downtime', 'Adds margin for heat and dust', 'Uses zero safety factor', 'Skips breakers'],
      },
    },
  },
  products: {
    'inv-1': {
      name: 'Microtek Heavy Duty 2350 Pure Sine Wave 2000VA/24V Inverter',
      category: 'Solar Inverter',
      description:
        '2000VA pure sine wave inverter supporting dual batteries. Ideal for homes, offices and shops with digital display and 2-year warranty.',
      warranty: 'Manufacturer warranty as per Microtek retail policy (typically 24 months on inverter — verify on invoice).',
      shipping: 'Pan-India courier; remote areas may need extra days.',
      offers: [
        {
          title: 'SheShark buyer protection',
          detail: 'Dispute support and documented seller communication for eligible orders.',
        },
        {
          title: 'Installation guidance',
          detail: 'Checklist for safe wiring and AC distribution — use a licensed electrician for final install.',
        },
        {
          title: 'Returns window',
          detail: 'Review return policy with seller before purchase; keep packaging for DOA claims.',
        },
      ],
      specs: [
        { label: 'VA rating', value: '2000 VA' },
        { label: 'Waveform', value: 'Pure sine wave' },
        { label: 'Battery', value: '24V dual battery compatible' },
      ],
    },
    'inv-2': {
      name: 'Solarverter PUC PRO 3KVA/36V Hybrid Solar Inverter',
      category: 'Solar Inverter',
      description:
        'Hybrid MPPT solar inverter with smart energy management and high efficiency solar priority charging.',
      warranty: 'Verify dealer warranty and on-site support before payment.',
      shipping: 'Heavy unit — lift-assist delivery may be required.',
      offers: [
        {
          title: 'Hybrid readiness',
          detail: 'Prioritize PV when sun is available and fall back to grid/battery smoothly.',
        },
        {
          title: 'Energy coaching',
          detail: 'SheShark learning hub links for sizing panels and batteries to this class of inverter.',
        },
        {
          title: 'B2B quote',
          detail: 'Multiple units for a women-led cluster? Note interest in the funding form for partner intros.',
        },
      ],
      specs: [
        { label: 'Capacity', value: '3 KVA' },
        { label: 'Battery bus', value: '36V' },
        { label: 'topology', value: 'Hybrid MPPT' },
      ],
    },
    'inv-3': {
      name: 'UTL Sun Lion 1000 rMPPT Solar Inverter with Lithium Battery',
      category: 'Solar Inverter',
      description:
        '800VA inverter with inbuilt LiFePO4 battery, rMPPT technology and wall-mountable compact design.',
      offers: [
        {
          title: 'Compact footprint',
          detail: 'Good for shops and home offices where floor space is limited.',
        },
        {
          title: 'LiFePO4',
          detail: 'Generally longer cycle life than lead-acid — follow manufacturer charging limits.',
        },
        {
          title: 'SheShark verification',
          detail: 'Ask seller for serial and warranty card photos before high-value transfer.',
        },
      ],
      specs: [
        { label: 'Type', value: 'Integrated Li inverter' },
        { label: 'MPPT', value: 'rMPPT' },
      ],
    },
    'bat-1': {
      name: 'Exide INVA Master IMTT1500 150Ah Tall Tubular Battery',
      category: 'Solar Battery',
      description:
        '150Ah tall tubular inverter battery offering long backup, low maintenance and 60-month warranty.',
      warranty: 'Pro-rated warranty common — read fine print with dealer.',
      offers: [
        {
          title: 'Pairing advice',
          detail: 'Match C10/C20 ratings with your inverter — avoid under-sizing strings.',
        },
        {
          title: 'Watering',
          detail: 'Tubular types may need topping — follow Exide maintenance schedule.',
        },
        {
          title: 'Recycle',
          detail: 'Disposed batteries should go to authorized scrap/recyclers only.',
        },
      ],
      specs: [{ label: 'Capacity', value: '150 Ah tubular' }],
    },
    'bat-2': {
      name: 'Amaron 150TT42 150Ah Tall Tubular Battery',
      category: 'Solar Battery',
      description:
        '150Ah tall tubular battery with fast charging TEKMAX technology and long backup performance.',
      offers: [
        {
          title: 'Fast charge ready',
          detail: 'Use with compatible chargers/inverters only.',
        },
        {
          title: 'SheShark compare',
          detail: 'Use marketplace filters to compare Exide vs Amaron total cost of ownership.',
        },
      ],
      specs: [{ label: 'Capacity', value: '150 Ah' }],
    },
    'light-1': {
      name: 'Epyz 200W Solar Flood Light Outdoor Waterproof',
      category: 'Solar Lighting',
      description:
        '200W solar flood light with 571 LEDs, remote control, IP65 waterproof design and 10–12 hour illumination.',
      offers: [
        {
          title: 'Retail starter SKU',
          detail: 'Popular entry product for women-led solar lamp micro-businesses.',
        },
        {
          title: 'IP65',
          detail: 'Outdoor mounting — still avoid submerging or blocking the panel.',
        },
      ],
      specs: [
        { label: 'Power', value: '200W class LED' },
        { label: 'Protection', value: 'IP65' },
      ],
    },
    'acc-1': {
      name: 'ASHAPOWER NEON 70A Solar MPPT Charge Controller',
      category: 'Solar Accessories',
      description:
        '70A MPPT solar charge controller supporting 12V–48V battery banks with ultra-fast power tracking.',
      offers: [
        {
          title: 'System design',
          detail: 'SheShark Energy Hub tutorials cover string voltage and MPPT selection.',
        },
        {
          title: 'Safety',
          detail: 'Fuse/breaker sizing must match 70A capability — engineer your DC side.',
        },
      ],
      specs: [{ label: 'Current', value: '70 A MPPT' }],
    },
  },
  brands: {
    b1: {
      description:
        "India's leading beauty and wellness marketplace founded by Falguni Nayar, empowering millions of women consumers and creators.",
      category: 'Beauty',
    },
    b2: {
      description:
        'High performance makeup brand co-founded by Vineeta Singh, built for Indian skin tones and weather.',
      category: 'Beauty',
    },
    b3: {
      description:
        'Toxin-free personal care brand co-founded by Ghazal Alagh, focused on safe products for families.',
      category: 'Personal Care',
    },
    b8: {
      description:
        'Women-focused taxi and corporate commute service, employing women drivers and prioritizing rider safety.',
      category: 'Transport',
    },
  },
  fundingRows: {
    'fund-1': {
      title: 'PM-KUSUM Solar Subsidy',
      provider: 'Ministry of New & Renewable Energy',
      amount: 'Up to ₹3,00,000 (program-dependent)',
      deadline: '2026-06-30',
      description:
        'Government support for solar pumps and decentralised solar; useful for agri-adjacent women entrepreneurs.',
      eligibility:
        'Rural / farmer-linked categories per current MNRE guidelines — verify with DISCOM or approved vendor.',
    },
    'fund-2': {
      title: 'Stand-Up India Scheme',
      provider: 'Government of India (scheduled banks)',
      amount: '₹10 lakh – ₹1 crore',
      deadline: 'Ongoing',
      description:
        'Bank loans for greenfield enterprises by women or SC/ST founders; manufacturing or services including clean-tech retail.',
      eligibility: 'First-time entrepreneur in target category; bank appraisal required.',
    },
    'fund-3': {
      title: 'Women Entrepreneurship Platform Grant',
      provider: 'NITI Aayog / partner windows',
      amount: 'Up to ₹5,00,000 (illustrative)',
      deadline: '2026-09-15',
      description:
        'Grants and visibility for women-led startups in sustainability and impact — timelines vary by call.',
      eligibility: 'Registered India entity; traction criteria per call document.',
    },
    'fund-4': {
      title: 'MUDRA Loan for Women',
      provider: 'Scheduled commercial banks / NBFCs / MFIs',
      amount: 'Up to ₹10,00,000 under Shishu / Kishor bands',
      deadline: 'Ongoing',
      description:
        'Working capital and term needs for micro and small units; collateral-free in many cases under PMMY norms.',
      eligibility: 'Business plan and KYC; institution-specific.',
    },
    'fund-5': {
      title: 'SECI / state DISCOM rooftop incentives',
      provider: 'SECI / State nodal agencies',
      amount: 'Varies by tender',
      deadline: 'Check state portal',
      description:
        'Central or state-specific rooftop programs — subsidy % changes; always read the active circular.',
      eligibility: 'Residential / institutional categories as per active tender.',
    },
  },
  activityFeed: {
    a1: {
      title: 'Order ORD-1042 delivered',
      detail: 'Exide 150Ah tubular — Meerut — COD cleared',
      time: '32 min ago',
    },
    a2: {
      title: 'Payout initiated',
      detail: '₹18,400 → HDFC ****2188 (UTR in ~24h)',
      time: '3 h ago',
    },
    a3: {
      title: 'Course milestone',
      detail: '“Start your first energy business” — 75% complete',
      time: 'Yesterday',
    },
    a4: {
      title: 'Low stock',
      detail: 'MPPT 40A controllers — 4 units left',
      time: 'Yesterday',
    },
    a5: {
      title: 'New taxi corporate inquiry',
      detail: '3 monthly rides — Bengaluru office park',
      time: '2 d ago',
    },
  },
  funnel: {
    Leads: 'Leads',
    Quoted: 'Quoted',
    Won: 'Won',
    Repeat: 'Repeat',
  },
  ordersPipeline: {
    'ord-1042': { product: '150Ah Tubular', buyer: 'Meera K.', city: 'Meerut', sla: 'On time' },
    'ord-1043': { product: '200W Flood light', buyer: 'Ritu S.', city: 'Indore', sla: '24h' },
    'ord-1044': { product: '70A MPPT', buyer: 'Kavita P.', city: 'Pune', sla: '48h' },
    'ord-1045': { product: '3KVA hybrid', buyer: 'Deepa R.', city: 'Chennai', sla: 'Payment' },
  },
};
