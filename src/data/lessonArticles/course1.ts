/** ~1000 words each — text-only learning track for SheShark course-1 (Intro to Solar). */

export const course1Articles: Record<string, string> = {
  "l-1-1": `## What is solar energy?

Solar energy is the light and heat that reach Earth from the Sun. For entrepreneurs in clean power, the useful part is **radiant energy**—photons travelling from the Sun that we can convert into **electricity** using photovoltaic (PV) modules, or into **heat** using solar thermal collectors. Most SheShark learners who sell rooftop systems or village-scale kits focus on **photovoltaics**: silent, modular hardware with no fuel cost during operation.

### Why the Sun is a business asset

Unlike coal or diesel, sunshine is **distributed**: it falls on rooftops, fields, and industrial sheds across India. That distribution means **last-mile businesses** can serve customers without depending on a single fuel supply chain—though you still depend on quality hardware, skilled labour, grid rules, and honest customer education. The “fuel” is free, but the **system** (panels, inverter, structure, wiring, protection, and maintenance) is not. Your job as a seller or integrator is to translate sunlight into **reliable kilowatt-hours** and **clear savings or backup**, then explain that story in simple language.

### From fusion in the Sun to electrons in a wire

Inside the Sun, nuclear fusion releases enormous energy. A tiny fraction reaches Earth after roughly eight minutes of travel at the speed of light. On a clear day near noon, a square metre at the surface might receive on the order of **one kilowatt** of solar power before accounting for atmosphere, angle, and weather—that is an intuitive anchor, not a precise design number. **Real designs** use local **irradiation data** (units like kWh per m² per day), tilt, azimuth, shading, soiling, and temperature. You do not need to memorise astrophysics; you need to respect that **site conditions dominate** real output.

### Energy versus power: language your customers understand

Customers often mix up **kW** and **kWh**. **Power** (kilowatts) is how fast energy is being used or produced at an instant. **Energy** (kilowatt-hours) is power multiplied by time—what appears on electricity bills. A **3 kW** rooftop plant might produce a certain number of **kWh per day** depending on location and losses. When you pitch solar, lead with **“units”** (kWh) and **bills**, then connect to **kilowatts of installation capacity** only after the customer grasps outcomes. This reduces confusion and complaints later.

### Direct versus diffuse sunlight

Some sunlight arrives in a straight beam from the Sun’s disk (**direct**). Some is scattered by clouds, haze, and air (**diffuse**). Flat-plate PV modules use **both**, but **shading**—trees, water tanks, parapets—can disproportionately hurt output because modules in a string are **electrically interdependent** in many designs. That is why site surveys and honest shade talk are not optional extras; they are part of ethical selling.

### Solar thermal in one paragraph

Solar **thermal** systems collect heat—for water, process heat, or drying. They are valuable in agriculture and industry. PV converts light to electricity. Many SheShark paths focus on **PV plus storage or grid export**, but knowing that thermal exists helps you spot **wrong-tool-for-job** mistakes (trying to use PV resistance heaters where thermal collectors would be more efficient, for example).

### Policy and grid context (India snapshot)

National and state programmes (for example MNRE-tracked rooftop categories, net metering rules, and distribution company procedures) change over time. Treat MNRE portals and **state DISCOM** circulars as the **source of truth** for what is eligible, how billing works, and what paperwork you need. Your tutorial role is not to memorise every circular—it is to **build a habit**: verify rules before you promise payback, export, or subsidy.

### How this lesson connects to your next steps

You now have a plain-language mental model: solar entrepreneurship is about converting **steady sunlight** into **useful, metered energy outcomes** while navigating real-world losses and regulations. The next lessons walk through **how** the hardware does that, **what system types** you will sell, and **why safety and clarity** build trust. When someone asks, “What is solar energy?” you can answer in one breath: **the practical use of sunlight to power work**—and then guide them to what matters on **their roof, their bill, and their aspirations**.

### Supplement — glossary flash cards (drill aloud)

- **Irradiance** — instant sunlight power per area (W/m² intuition).  
- **Insolation / irradiation** — energy accumulated over time (kWh/m²/day).  
- **Nameplate kWp** — installed DC capacity label, not annual outcome.  
- **Capacity factor** — ratio of actual energy to theoretical if sun ran nameplate 24/7—always modest for rooftop.  
- **Balance-of-system** — everything that is not modules: inverter, DC combiner, ACDB, cables, structure, earthing, monitoring—often half the story.

### Supplement — customer myth busters

**“Panels need heat.”** No—they produce more voltage when cooler; heat is a drag. **“Night export still pays.”** Usually not without storage; clarify settlement. **“Bigger inverter always better.”** Oversizing needs MPPT and regulatory sense—**matching** beats machismo.

### Mentorship prompt

Teach a **teen sibling** this lesson in 10 minutes using only household analogies—if you can, you truly grasp the chapter.`,

  "l-1-2": `## How solar panels work

Solar panels—more precisely **photovoltaic modules**—turn light into **direct current (DC) electricity** using semiconductor physics. The most common cells today are made from **silicon**. Understanding the basics helps you answer customer questions without overpromising, and it helps you spot low-quality marketing claims in the supply chain.

### Photons and the PV sandwich

Sunlight carries packets of energy called **photons**. When photons with enough energy strike silicon arranged in a **p-n junction**, they can **excite electrons** from the valence band into the conduction band, leaving behind **holes**. An internal **electric field** at that junction separates charges so that, when you connect an external circuit, electrons flow as **current** and deliver **power** to a load—or into an **inverter** that converts DC to **alternating current (AC)** for homes and the grid.

### From cell to module to string

A **cell** is a small unit—often six inches square on conventional silicon products. Manufacturers connect many cells in **series** to raise **voltage** to a useful range, encapsulate them in glass and polymer, add a frame and junction box, and ship a **module**. Installers connect modules in **strings** (more series) and **arrays** (parallel strings) to match **inverter** voltage windows and power ratings. When one module underperforms—because of shade, soiling, or failure—string behaviour depends on **passive bypass diodes** and, increasingly, **module-level power electronics** in premium designs.

### Open-circuit voltage and short-circuit current

Datasheets quote many numbers; two big ones for intuition are **Voc (open-circuit voltage)** and **Isc (short-circuit current)**. Voc is measured with nothing connected; Isc is the current in a theoretical short. Neither is the operating point under sun—that lives on an **IV curve** where **voltage × current** is maximised at the **maximum power point (MPP)**. **MPPT** (maximum power point tracking) is what a good grid-tie inverter does thousands of times per day: it adjusts operating voltage to harvest the most energy as temperature and irradiance change.

### Temperature silently steals voltage

Silicon behaves in a way that **higher cell temperature reduces voltage**. Hotter rooftops can mean **lower peak efficiency** even though cold bright days can feel great for power. Orientation (**tilt and azimuth**), **dust**, bird droppings, and **shading** all move the curve. Entrepreneurs should **never** quote lab-cell hero numbers as if they were annual customer reality. Use **conservative PR ratios** (performance ratio) and **real irradiation** for payback talk.

### Monocrystalline versus polycrystalline (and perception)

**Mono** cells cut from single-crystal boules often show **higher efficiency per area** (black aesthetic). **Poly** uses multiple grains and historically lagged slightly in efficiency but competed on cost. Markets shift; **tier-1 bankability**, **warranty terms**, and **independently audited manufacturing** matter more than colour alone. Train customers to ask: **Who made the cells and modules? What warranty exists? Who honours it in India?**

### Bifacial and other variants

**Bifacial** modules can harvest reflected light from the ground (**albedo**). Gains depend on **height**, **ground surface**, and **array design**. It is not automatic free energy; it is **site-specific**. Knowing the term helps you evaluate supplier claims without mystique.

### AC modules and micro-inverters

Some products integrate small **micro-inverters** per module or use **AC modules**. Architecture affects **shade tolerance**, monitoring granularity, and **maintenance** patterns. There is no universal “best”; there is **fit** to roof, budget, and grid rules.

### Efficiency limits and honesty

The **Shockley–Queisser** limit is a theoretical ceiling for single-junction cells under ideal conditions—think high-twenties percent for silicon in theory, lower in mass-market products under real conditions. When someone advertises a miracle “50% panel,” treat it as a **red flag** unless they are describing concentrators or exotic lab tech not relevant to your residential roof sale.

### What you should explain to a first-time buyer

In plain words: **modules catch light, the inverter makes plug-ready AC power, safety gear disconnects faults, and the meter tells the story of import and export.** You promise **process** (survey, design, install, commissioning) and **documentation** (warranties, single-line diagrams, compliance), not **magic**.

### Moving forward

You now understand PV at the level that builds **trust**: enough physics to respect the product, enough systems thinking to respect the **whole plant**. Next you will map **on-grid, off-grid, and hybrid** architectures so every conversation lands on the correct topology for the customer’s goals.

### Supplement — IV curve bedtime story (for sellers, not exam trolls)

Imagine a dimmer on a festival light string: at one extreme, voltage high but almost no current; at the other, current wants to surge but voltage collapses—somewhere in the middle is the **brightest bulb moment**—that is MPP. MPPT hunts that point as clouds flirt with your roof.

### Supplement — walkaway red flags in the supply chain

Mysterious **re-labelled** modules, **no serial traceability**, cash-only deals with **no GST trail**, and **pressure signing today**—walk. Your reputation is a decade asset; dodgy kilowatts are a weekend mistake.

### Hands-on micro exercise

Find any module datasheet online—circle Voc, Isc, Vmpp, Impp, temp coeff, NOCT—**selfie with highlights** for your training album.`,

  "l-1-3": `## Types of solar systems

Customers rarely know whether they want **grid-tied**, **off-grid**, or **hybrid** power—they know they want **lower bills**, **backup**, or **independence**. Your skill is mapping those desires to **architectures** that match **regulations**, **safety standards**, and **economic reality** in their state and building type.

### On-grid (grid-tied) systems

An **on-grid** photovoltaic plant is synchronised with the utility network. During the day, solar may **offset** consumption behind the meter; surplus may **export** according to **net metering** or **net billing** rules that depend on the DISCOM. There is typically **no meaningful backup** during a grid outage unless additional **anti-islanding** protection and export rules allow specific designs—or unless you add **storage** with the correct controls. The economic story is **bill savings and export credits**, not “always-on fortress power.”

### Off-grid systems

**Off-grid** systems stand alone: solar charges **batteries** through **charge controllers**, and **inverters** supply AC loads. Sizing is driven by **worst-case days** (monsoon stretches), **night loads**, and **battery cycle life**. Off-grid is common where the grid is absent or unreliable, but it costs more per reliable kWh because **storage is expensive** and **must be replaced**. Under-sizing batteries is a classic cause of **early failure and angry customers**.

### Hybrid systems

**Hybrid** usually means **PV + grid + battery**, with an inverter ecosystem that can **charge from solar and/or grid**, **supply critical loads** during outages, and sometimes **export** within programme rules. Marketing overuses “hybrid.” Demand clarity: **which inverter platform**, **which battery chemistry**, **which protection**, and **whether export is intended** or blocked. Hybrids are powerful for **resilience** but require **clear load segmentation**—critical circuits versus nice-to-haves.

### AC coupling versus DC coupling (intuition)

In **DC-coupled** designs, solar feeds a **charge controller** or hybrid inverter’s DC bus before inversion. In **AC-coupled**, solar has its own inverter and storage has another, coordinated by controls. Both are valid; complexity rises with **retrofits** and **existing rooftop constraints**. Installers choose for **compatibility, monitoring, and warranty ecosystems**—not buzzwords.

### String inverters, central inverters, and module-level electronics

**String inverters** are wall-mounted units serving one or more strings of modules—economical and common on rooftops. **Central** inverters appear more in **utility-scale** fields. **Power optimisers** or **micro-inverters** mitigate **partial shading** and improve **safety** through rapid shutdown compliance in some markets. Cost and serviceability differ; **shaded roofs** often justify premium module-level gear.

### Three-phase versus single-phase (commercial hint)

Homes are often **single-phase**; small shops and factories may be **three-phase**. Inverter selection must match **service connection** and **utility requirements**. Putting the wrong phase class in a quote wastes everyone’s time.

### Mounting: flush tilt, high tilt, and structures

**Rooftop** mounting may be **flush** to minimise wind load or **tilted** on rails to improve winter yield. **Ballasted** systems on flat roofs avoid penetrations but add weight; **penetration** systems need **waterproofing discipline**. Ground mounts allow **ideal tilt** but need **land rights** and fencing. Every choice affects **shadow**, **cleaning access**, and **O&M contracts**.

### Storage chemistries at a glance

Common home and small C&I storage today includes **LFP (lithium iron phosphate)** for safer, longer-cycle economics versus some **NMC** packs. **Lead-acid** still appears in budget off-grid but with **depth-of-discharge limits**. Never sell storage without **clear warranty cycles**, **temperature constraints**, and **recycling/return path** basics.

### Permits, inspections, and DISCOM paperwork

In India the **exact** paperwork trail depends on **state policy** and **DISCOM** workflow: application forms, single-line diagrams, inverter certification lists, inspection, and meter change. Treat public programme pages as **living documents**—verify before quoting timelines.

### Choosing the right topology: a simple decision tree

If the grid is **stable** and the goal is **bill reduction**, start with **on-grid** and honest export expectations. If outages are **frequent** and **critical loads** exist, explore **hybrid** with explicit **backup minutes/hours**, not vibes. If there is **no grid**, go **off-grid** with **conservative** battery days and robust lightning protection conversation.

### Summary

System type is not a lifestyle label—it is an **engineering and regulatory bundle**. Mastering these categories lets you steer women-led energy businesses toward **repeatable installations** with fewer **margin-killing callbacks** and more **referrals from clarity**.

### Supplement — one-page sketch assignment

Draw four boxes: **Sun → DC array → inverter → loads/grid/battery**. Annotate where **earthing**, **SPD**, and **disconnects** sit. If you cannot draw it, you cannot sell it—keep sketching until boringly easy.

### Supplement — retrofit nightmares to mention early

**Old asbestos**, **spongy trusses**, **heritage façades**, and **tenant–landlord split metering**—flag early so **civil and legal** friends join your squad before you price EPC optimism.

### Sales ethics line test

If you would not WhatsApp the same topology choice to your **own mother**, do not recommend it to a stranger.`,

  "l-1-4": `## Benefits of solar energy—for people, planet, and your P&L

Solar photovoltaics offer a rare combination of **local job creation**, **energy bill relief**, **air-quality improvement at use point**, and **portfolio diversification** for entrepreneurs. Honest storytelling sells better than hype because customers detect exaggeration—especially in villages where word travels fast.

### Economic benefits households feel

For many homes and small enterprises, solar reduces **monthly cash outflow** on electricity—money that can be redirected to education, inventory, or reinvestment. **On-grid net-metered** savings are simple in concept but depend on **tariff slabs**, **fixed charges**, and **export settlement rules**. Off-grid users skip diesel genset runtime or **kerosene substitutes**, which are expensive and harmful to indoor air quality. You should habitually translate **kWh** into **rupees** with transparent assumptions, not cherry-picked peak-sun hero days.

### Energy access and women-led enterprises

Reliable electricity supports **home businesses**: tailoring cold storage, phone charging micro-retail, digital payments, and evening study lights. Women entrepreneurs often juggle domestic schedules with commercial hours; **predictable evening power** changes what is possible. When selling, collect **load inventories**—wattage and hours—so labour-saving claims map to real equipment lists.

### Climate and local pollution (framed responsibly)

Operating PV emits **negligible local pollution** compared to diesel generators in neighbourhoods. Life-cycle assessments consider manufacturing impacts; **responsible suppliers** work on **low-carbon fabs**, **recycling pilots**, and **module take-back** programmes. You do not need to be a climate scientist—you need to **avoid greenwashing** and **cite programme goals** where relevant (national clean energy targets, pollution reductions in cities).

### Grid support at scale (macro context)

Distributed solar can reduce **transmission congestion** and **peak daytime demand** in sunny regions—valuable at utility level. At customer level, that story is secondary to **bill math** unless you pitch **commercial PPAs** or **captive open access** topics (outside many micro-seller scopes).

### Resilience where outages hurt most

Hospitals and cold chains cannot tolerate long brownouts. **Hybrid backup** for **critical circuits** can protect inventory and medicines. Always specify **what loads are backed** and **for how long under realistic battery state of charge**, especially during monsoon.

### Property and financing angles

Rooftop PV may increase **asset attractiveness** where buyers value lower operating costs—this is **market-dependent**. Financing via **loans, NBFCs, or on-bill programmes** can spread capex. Compliance with **lender checklists** (approved vendor lists, insurance, warranties) speeds disbursal—know your partners.

### Jobs along the value chain

SheShark-aligned businesses create **surveyors, designers, installers, electricians, O&M crews, and customer-education roles**. Train for **safe lifting**, **fall protection**, and **basic electrical literacy**—skills are the moat when commodity modules converge.

### Risks you must name alongside benefits

**Shading**, **poor installs**, **inverter mismatch**, **weak structures**, and **battery misuse** undermine benefits. **Subsidy fraud** and **substandard kits** damage community trust. Lead with benefits but embed a **risk-and-mitigation** paragraph in proposals—professionals sound like professionals.

### Maintenance: the hidden benefit multiplier

**Cleaning schedules**, **torque checks**, **growth trimming**, and **inverter firmware** updates preserve yields. Sell **annual O&M** as insurance on the customer’s investment—not as an upsell insult.

### Policy stability as business weather

Tariff rules evolve; export regimes tighten or loosen. Build a **news ritual**—monthly scan of **MNRE** and your **state regulator** for rooftop and storage circulars. Communities reward vendors who **communicate changes** early.

### Closing thought

Solar’s benefits are **real**, but they are **conditional** on honest design and context. When your tone matches that reality, you attract customers who pay on time and refer neighbours. That is the flywheel SheShark-style entrepreneurship aims to power.

### Supplement — benefits with receipts template

Maintain a **folder of anonymised before/after bills** with signed consent PDFs—not screenshots cropped like conspiracy memes. Pair each with a **one-paragraph honest caveat** (“winter lower yield expected”).

### Supplement — community co-benefits pitch (non-cringe)

Frame solar savings funding **girls’ tuition** or **shop reinventory**—only if customer volunteers that dream; never invent sob stories. Ethics first, storytelling second.

### Seasonal honesty chart

Sketch **January vs July kWh bars** on napkins during sales chats—it immunises you against “**July disappointed me**” summer calls.`,

  "l-1-5": `## Getting started with solar—as a learner, seller, or future installer

This closing lesson turns concepts into **next actions**. Whether you aim to **sell**, **install**, or **finance** systems, the pattern is the same: **learn continuously**, **standardise checklists**, **partner credibly**, and **document everything**.

### Clarify your role in the value chain

Are you a **lead generator**, an **EPC** (engineering-procurement-construction contractor), a **component retailer**, or a **trainer**? Roles overlap, but confusion creates liability. If you are not a licensed electrical contractor in contexts that require it, **do not pretend you are**. **Subcontract** qualified electricians and **supervise** quality instead.

### Build a minimum credible toolkit

Minimum items include: a **laser measurer**, **camera**, **shade analysis app or fisheye lens workflow**, **multimeter training**, **cable sizing charts** approved by your chief electrician, and templated **proposals** that separate **facts, assumptions, and guarantees**. Add **safety PPE**—gloves, helmets, harnesses—before you touch roofs.

### Master the customer interview

Ask: **current monthly consumption (kWh or bills)**, **planned new loads**, **day versus night usage**, **outage pain**, **roof age and material**, **three-phase or single-phase**, **export ambition**, and **financing constraints**. Listen for **expectation management moments**—customers often want “zero bill forever” or “full-home backup through the night without enough battery.” Address gently with numbers.

### Site survey habits that prevent disputes

Capture **true south / tilt**, **obstacles**, **waterproofing risk**, **path for cable runs**, **inverter wall strength**, **earthing plan**, and **lightning exposure** basics. Photograph **before** states. If you skip surveys to cut cost, you **loan trouble** into the project.

### Learn product paperwork

Read **module datasheets**, **inverter manuals**, and **warranty documents**. Know **STP conditions** versus **NOCT** ratings on modules; know **inverter MPPT voltage windows** so you never design an electrically impossible string. Suppliers love detail-oriented partners.

### Rules-first quoting

Before publishing prices, align with **DISCOM** application steps in your territory, including **harmonic and protection** expectations for the inverter brands you stock. If subsidies or programmes attach, **verify eligibility** with primary circulars—not WhatsApp forwards.

### Finance partnerships

Map **MUDRA**, **NBFC EMI**, **vendor credit**, and corporate **CSR** channels relevant to your geography. Prepare a **one-page bank pack**: promoter profile, installation track record, warranties, insurance draft, and customer references.

### Marketing without embarrassment

Teach in public: short **Reels** showing **clamp quality**, **torque marks**, **inverter labelling**, and **customer bill comparisons** with consent. Demystification builds **trust** better than shouting “50% off.”

### Safety culture is your brand

**Lock-out/tag-out**, **DC isolation**, and **no jewellery on roofs** are non-negotiable. Publish **incident near-miss reviews** internally; celebrate **clean installations** as craft.

### Education pathway

If you plan to install, pursue **structured electrical training** and local competency norms. If you plan to sell, pursue **design literacy** and **contract clarity**. SheShark encourages **women-led teams** at every layer—mentorship accelerates learning.

### Your 30-day starter plan

**Week 1:** shadow two surveys; build a bill-reading worksheet. **Week 2:** design two practice arrays on paper with string voltages checked against inverter limits. **Week 3:** write a sample proposal with explicit assumptions. **Week 4:** host a free community Q&A on rooftop myths—measure attendance and leads.

### What success looks like at the micro-business level

Success is **repeat orders**, **low warranty claims**, **fast DISCOM clearance**, and **customers who can explain their system to a neighbour**. That is how solar entrepreneurship compounds—in sunlight and in trust.

Congratulations on finishing the reading track for **Introduction to Solar Energy**. Pair this text with the **knowledge check** and optional intro video, then move into business-building courses when you are ready to sell what you understand.

### Supplement — 7-day implementation sprint (solo founders)

**Day 1** — Organise digital folder structure: surveys, proposals, commissions. **Day 2** — Create WhatsApp Business quick replies for five FAQs. **Day 3** — Film **60 s** “**tools in my survey bag**” reel. **Day 4** — Peer review a friend’s quote—even fiction—against **DISCOM realistic timelines**. **Day 5** — Sleep eight hours (sleep deprivation causes **DC polarity mistakes**). **Day 6** — Visit one distributor warehouse—smell the professionalism. **Day 7** — Journal: **what scared you**—fear mapped is fear halved.

### Supplement — allies list

Write five names: electrician mentor, CA, banker friend, woman SHG leader, honest competitor coffee buddy—**coffee quarterly** prevents echo chambers.

### Permission to be new

If you are starting, say so while pairing with **supervised installs**—customers forgive learners who are **transparent**, not those who fake decade wars.`,
};
