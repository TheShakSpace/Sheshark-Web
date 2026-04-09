/** ~1000 words each — course-4: Rooftop Sizing & Customer Proposals */

export const course4Articles: Record<string, string> = {
  "l-4-1": `## Load tables made simple for honest rooftop quotes

A **load table** is the honest mirror of how a building uses electricity. Without it, you are guessing panel counts—and guesswork becomes **refund demands** when summer AC loads appear that winter surveys ignored. This lesson teaches a **practical table** you can build on-site with a clamp meter, customer honesty, and conservative factors.

### Gather bills first, then validate

Collect **twelve months** of bills if possible. Note **kWh**, **billing period length**, **tariff category**, and **demand charges** if any. Bills lie sometimes when **meter faults** or **shared meters** occur—use **spot measurements** to cross-check big discrepancies.

### List appliances methodically

Walk room by room: **lights**, **fans**, **fridges**, **iron**, **mixer**, **pump**, **AC units** with **star ratings**, **motors**, and **workshop tools**. Record **nameplate wattage** where visible. For unknowns, use **reference tables**—but label them as **estimates**.

### Duty cycle: the hidden multiplier

A **2000 W** geyser used **30 minutes/day** is not the same as **2000 W for 8 hours**. Capture **hours/day** and **seasonality** (“**AC only April–October**”). Summertime surveys miss winter realities and vice versa.

### Peak versus energy

**Inverter sizing** cares about **simultaneous peak**—what runs at the same time in the evening surge.**Energy** (kWh/day) drives **panel count** and **battery capacity**. Confuse the two and you **undersize inverters** or **oversell panels** with clipped output.

### Three-column worksheet template

**Column A:** Appliance.**Column B:** Rated W.**Column C:** Hours/day.**Column D:** Daily Wh = B×C.**Sum** daily Wh → divide by 1000 for rough **kWh/day** before system losses.This is a **starting point**, not the final PO.

### Reserve factors

Add **10–20%** for **future loads** only if customer commits openly (“**Second AC in two years**”). Do not stealth-pad—it inflates quotes and loses deals. Instead, offer **modular expansion** path in writing.

### Three-phase and motor quirks

**Motors** draw **inrush**; **inverters** need **surge headroom**. Note **star-delta** arrangements if present (often in small factories). If you lack motor expertise, **subcontract** assessment—**inverter damage** is expensive PR.

### Cooking loads and honesty

**Induction** adoption changes winter peaks. Ask what fuel migration they plan over five years—ethical upsizing discussion beats silent undersizing.

### Export versus self-consumption framing

If **export** is limited by policy, prioritise **load offset timing**—panels west-tilted for evening AC may beat textbook south in some tariff worlds.**Model** both **financially** and **transparently**.

### Documentation photos

Snap **distribution board**, **breaker ratings**, **earthing**, and **available spare ways**—proposal credibility skyrockets when clients see you **noticed details**.

### Customer interview traps

Customers forget **night pumps** and **security lights**. Ask about **festivals**, **weddings**, and **tenant sub-meters**—these change **load diversity**.

### Handoff to simulation

Once table stabilises, export **kWh/day target** and **peak kW** to your **PVWatts** or spreadsheet model.**Garbage in, garbage out**—challenge rows that imply **free energy perpetual motion**.

### Legal caution

You are not always a **licensed electrical auditor**—phrase reports as **site observations** unless credentialed. **Liability language** belongs in **contracts**.

### Summary

Load tables are **respect in spreadsheet form**. Invest time, teach the customer what you did, and you will **close more**, **fight less**, and **build referral depth** that flash marketers cannot buy.

### Supplement — sample appliance rows (illustrative)

- **LED tubes** 20 W × six units → 120 W, ~6 h/day evening study block.  
- **Ceiling fans** 75 W × four → 300 W, ~10 h/day with summer bias.  
- **Fridge (inverter compressor)** ~120 W run → 24 h; verify with a **clamp** over a full day.  
- **1.5 T AC** ~1800 W → ~4 h/day but flag **Apr–Sep only** in the notes column.  
- **0.5 HP pump** ~375 W → ~1.5 h/day morning irrigation peak.

Totals flow to **daily kWh** only after you apply **diversity** (not everything peaks simultaneously). If you are spreadsheet-shy, draw this on **chart paper** during the survey—customers trust handwriting they watched you create.

### Supplement — when bills disagree with clamps

If billed kWh implies impossible loads, suspect **meter degradation**, **tap before meter**, or **billing cycle quirks**. Recommend licensed **utility complaint** pathways—your job is solar, not vigilante detective—but flag honestly so the **customer doesn’t blame panels later for pre-existing theft losses.`,

  "l-4-2": `## Sizing strings conservatively (thermal, electrical, mechanical)

**String sizing** matches **module voltages and currents** to **inverter MPPT windows**, with margin for **record cold** (voltage rise) and **hot noon** (voltage sag). Mechanical **orientation and spacing** decide **self-shading** and **wind loads**. Conservative design is **kindness**—it protects sleep.

### Datasheet numbers you cannot skip

**Voc**, **Isc**, **Vmpp**, **Impp**, **temp coefficients**—typically **%/°C** for Voc. Your inverter lists **min start voltage**, **max DC input**, and **per-MPPT current max**. If any high-school algebra discomfort appears, **use vendor configurators**—then **hand-verify** extremes.

### Temperature extremes

**Record local lows** push **string Voc** up—exceeding inverter max **voids warranty or trips DC OV**. **Hot cell temperatures** on rooftops **depress** voltage—strings may fail **MPPT window** on muggy mornings.**Rule of thumb:** model **coldest dawn** and **hottest operational afternoon** your climate actually experiences—not textbook STC only.

### String length decisions

**More modules in series** raises voltage (fewer parallel strings).**Too long** risks **cold Voc**.**Too short** risks **low voltage** and **high current** on parallel recombination.**Optimisers** change math—follow **manufacturer chain calculators**.

### Shading granularity

**Horizon shading** needs **fisheye** or software.**Neighbour parapet** shading may require **shorter strings** or **module-level electronics**. **Do not uniform-size** arrays on partially shaded roofs without modelling—**mismatch** losses punish lazy symmetry.

### DC conductor sizing

Ampacity considers **roof temperature adder**, **bundling**, and **distance**. **Voltage drop** percent caps protect **energy yield** and **stability**. If you are not the signing electrician, **attach their stamp**—do not freelance ampacity.

### Protection devices

**DC fuses**, **surge protectors**, **rapid shutdown** where mandated—selection depends on **string Isc** and code. Keep a **one-line** with **device ratings** in customer handover pack.

### Mechanical loads

**Wind speed maps**, **building height**, **parapet interference**, and **ballast vs anchor** decisions belong to **struct engineers** beyond threshold areas.**Stamped drawings** protect you when **storm claims** arrive.

### Expansion hooks

Leave **conduit routes**, **space on rails**, or **inverter AC breakers** for **add-ons** if you marketed modularity—document **max additional kWp** assumptions honestly.

### Software hygiene

Screenshot **calculator inputs** with **dates**—future-you defends choices in disputes.**Version-control** template updates when inverter firmware changes MPPT behaviour.

### Sales ethics on “panel count games”

**More panels** do not always mean **more customer value** if **export caps** or **self-consumption mismatch** apply.**Right-size**, then sell **monitoring clarity** as premium.

### Quality assurance checks

Peer review another designer’s **string calc** monthly—**fresh eyes** catch coefficient typos that screens miss.

### Summary

Conservative string sizing is the **engineering hug** your customers unknowingly crave: fewer alarms, fewer truck rolls, more **quiet inverters humming** through heatwaves—your best marketing asset.

### Supplement — quick temperature intuition drill

If Voc coefficient is **−0.30 %/°C** (example—use your datasheet), a **25°C** STC reference means **hot 65°C cells** shave roughly **12%** off Voc (very rough mental math illustration, verify per module). Combine that with **record winter dawn** lows on your terrace to choose string lengths—you are painting a **temperature sandwich**. Document the sandwich in the appendix so any auditor sees **you predicted**, not guessed.

### Supplement — when optimisers help ethics

Sites with **chimney shade stripes** often tempt sales teams to ignore mismatch losses because the prize feels close.**Module-level power electronics** cost more but reduce the urge to **silence customer anger** later—price transparently: “**₹X buys forgiveness for partial shade complexity.**” If they decline, capture **signed shade acknowledgment**—paper protects both sides.

### Peer review culture

Pair every string calc with a **second electrician WhatsApp voice review**—five minutes saves five site visits. Celebrate reviewers in team meetings; quality is a **social contract**, not a lone hero myth.`,

  "l-4-3": `## Presenting ROI honestly in customer proposals

**Return on investment** storytelling makes or breaks rooftop deals—and **misleading ROI** invites **consumer courts** and **community shame**. Build proposals where **assumptions breathe** on the page: **degradation**, **tariff inflation**, **export settlement changes**, **O&M costs**, and **financing interest**.

### Separate simple payback from NPV

**Payback years** = net capex ÷ annual rupee savings.NPV (net present value) discounts future savings with a chosen rate—more accurate but **harder to explain**. Offer **both** in appendix if corporate; stick to **transparent payback** for households—with **scenario bands**.

### Energy yield bands, not hero numbers

Present **P50/P90** style framing even if informal: “**Expected ~X kWh/year, poor monsoon year ~Y**.” Tie to **PVWatts** or on-site reference arrays if you have them.Cite **loss breakdown**: inverter, mismatch, soiling, downtime.

### Tariff escalation assumptions

India’s **retail tariffs** evolve—show **low/mid/high** escalation curves sourced from **historical DISCOM orders** where possible. If purely illustrative, **label illustrative**.

### Subsidy and policy footnotes

If programme subsidies influence capex, print **eligibility snapshot date** and **link**. If **net-metering rules** shift mid-process, define **who absorbs** policy risk per contract clause.

### Financing in ROI math

If EMI applies, compare **solar EMI versus average bill** month by month—**cash-positive day-one** claims require airtight math; otherwise say “**cash-positive after year Z** under assumptions A–D.”

### Non-monetary benefits

**Backup hours**, **genset deferral**, **comfort**, and **property perk** belong in proposal narrative—but **separate** them from rupee ROI boxes to avoid **double counting**.

### Visual hygiene

One **chart** max on overview page; more detail in appendix.**Colour contrast** for older readers.**Font sizes** mobile-friendly because forwards happen on phones.

### Objection pre-empts

**“What if a panel fails?”** → Warranty pathway and **temporary yield impact**.  
**“What if DISCOM delays export meter?”** → Timeline range and **interim self-consumption only**.

### Contract coupling

Proposal becomes **Schedule A** to contract; assumptions **initialled**—reduces selective memory later.

### Post-install reconciliation

Offer **Year 1 true-up report** as upsell—compare **predicted vs actual** with humility; adjust models for **next customers**. Transparency is a **product**.

### Legal review for scale

If you cross **turnover thresholds**, get **consumer-law-aware** counsel on **warranty and liability** language—cheap relative to one **district forum** case.

### Emotional closure

End proposals with **values alignment**: “**We design so you sleep**,” not **fear**. Fear sells short-term; **clarity** sells **referrals**.

### Final word

Honest ROI is **brand insurance**. Women-led energy firms especially succeed when communities whisper, “**She shows the full bill, not just the sunny side.**” That whisper is worth crores over a career.

### Supplement — proposal annex checklist

Attach: **shading photos**, **single-line with isolator ratings**, **string voltage calculation snapshot**, **loss table**, **tariff assumptions PDF print link**, **DISCOM application screenshot date-stamped**, **O&M price list**. Initial every page corner with customer if they insist old-school formality—surprisingly bonding.

### Supplement — sensitivity table layout

Show **Base / Poor monsoon / Aggressive tariff hike** scenarios side by side—three columns, same rows: annual kWh, annual savings ₹, payback years.Reveal formulas—not black box wizardry.When one column crosses **customer discomfort threshold**, discuss **smaller system** or **staged phases** honestly.

### Emotional pricing traps

Never anchor ROI with **neighbour envy quotes** (“Sharma ji got five-year payback so you will too”)—Sharma ji may lie, have different tariffs, or forgot diesel genset savings.**Your** maths only.

### Handover sentence

End meetings: “**If anything here feels optimistic, tell me now—we adjust before signature, not after first rain disappointment.**” That sentence saves friendships.`,
};
