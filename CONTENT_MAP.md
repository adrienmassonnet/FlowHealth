# Flow Health — Website Content Map

> Centralised reference for all user-facing copy. Use this document to review and improve copywriting across the site.
>
> **Sources:** `Hardcoded` = in `.tsx` file · `content-data.ts` = static fallback in `src/lib/content-data.ts` · `Sheets` = live from Google Sheets (60s ISR) · `Shopify` = Storefront API

---

## Table of Contents
1. [Global](#1-global)
2. [Homepage](#2-homepage)
3. [Product Detail Page](#3-product-detail-page)
4. [Ingredients](#4-ingredients-page)
5. [Our Philosophy](#5-our-philosophy-page)
6. [Our Product](#6-our-product-page)
7. [Who We Are](#7-who-we-are-page)
8. [Research](#8-research-page)
9. [FAQ](#9-faq-page)
10. [Blog](#10-blog-page)
11. [Contact](#11-contact-page)
12. [Shipping Policy](#12-shipping-policy)
13. [Terms & Conditions](#13-terms--conditions)
14. [Privacy Policy](#14-privacy-policy)
15. [Legal Notice](#15-legal-notice)

---

## 1. Global

### Site Metadata
| Location | Current Copy | Source |
|---|---|---|
| Site title | `Flow Health` | Hardcoded |
| Meta description | `Stable Energy for Deep Focus — Premium Swiss functional beverage` | Hardcoded |

### Announcement Bar
| Location | Current Copy | Source |
|---|---|---|
| Header bar | `Free shipping on orders over CHF 60 · 30-day satisfaction guarantee` | Hardcoded |

### Navigation
| Item | Current Copy | Source |
|---|---|---|
| About dropdown label | `About Flow` | Hardcoded |
| About → link 1 | `Who We Are` · `The team and story behind Flow Health.` | Hardcoded |
| About → link 2 | `Our Philosophy` · `The principles we refuse to compromise on.` | Hardcoded |
| About → link 3 | `Our Product` · `Inside the formula — every ingredient, every dose.` | Hardcoded |
| Learn dropdown label | `Latest articles` | Hardcoded |
| Learn → see all | `See all` / `View all articles` | Hardcoded |
| Mobile nav links | `Who We Are`, `Our Philosophy`, `Our Product`, `Ingredients`, `Blog`, `FAQ`, `Contact`, `Get Flow` | Hardcoded |

### Footer
| Location | Current Copy | Source |
|---|---|---|
| Column 1 label | `About Flow` | Hardcoded |
| Column 1 links | `Our Philosophy`, `Science`, `Legal notice`, `Blogs` | Hardcoded |
| Column 2 label | `Community` | Hardcoded |
| Column 2 links | `Refer a friend`, `Reviews` | Hardcoded |
| Column 3 label | `Support` | Hardcoded |
| Column 3 links | `FAQ`, `Shipping policy`, `Contact us`, `Privacy policy`, `Terms & conditions` | Hardcoded |
| Newsletter label | `Newsletter` | Hardcoded |
| Newsletter placeholder | `Enter your email` | Hardcoded |
| Newsletter CTA | `Subscribe` | Hardcoded |
| Newsletter note | `Join our newsletter. Read about our Privacy policy.` | Hardcoded |
| Copyright | `Copyright © 2026 Flow Health` | Hardcoded |

---

## 2. Homepage

### Hero Section
| Element | Current Copy | Source |
|---|---|---|
| Tagline | *(from getHomepageContent())* | Sheets |
| Heading | *(from getHomepageContent())* | Sheets |
| CTA button | `Shop Flow` | Hardcoded |

### Mission / Philosophy Strip
| Element | Current Copy | Source |
|---|---|---|
| Section label | `our philosophy` | Hardcoded |
| Body | `For those whose mind never settles, and who seeks inner peace.` | Hardcoded |
| Link | `Read more about our philosophy` | Hardcoded |

### Three Benefit Cards
| Card | Heading | Body | Source |
|---|---|---|---|
| 1 | `Empowered by stable energy` | `Flow gently restores harmony – delivering steady, calm energy that keeps distractions, fatigue, and overwhelm at bay.` | Hardcoded |
| 2 | `Unlock your full potential` | `Flow's ingredients help you tap into deep focus, effortless creativity, and crystal-clear thinking – so you can perform at your peak every day.` | Hardcoded |
| 3 | `Your daily inner peace ritual` | `Begin each day with purpose and power. Flow sets the stage for a productive, fulfilling day.` | Hardcoded |

### Featured Product
| Element | Current Copy | Source |
|---|---|---|
| Product title | *(dynamic)* | Shopify |
| Benefit copy | `Promotes homeostasis, fights over-stimulation, and supports peak cognitive performance — naturally.` | Hardcoded |
| Button 1 | `Learn More` | Hardcoded |
| Button 2 | `Shop Now` | Hardcoded |

### Health Benefits Section
| Element | Current Copy | Source |
|---|---|---|
| Section label | *(from getHomepageContent(), default: `Health Benefits`)* | Sheets |
| Heading | *(from getHomepageContent(), default: `Everything your body needs.\nNothing it doesn't.`)* | Sheets |

### Results Timeline
| Element | Current Copy | Source |
|---|---|---|
| Section label | `Timeline` | Hardcoded |
| Heading | *(from getHomepageContent())* | Sheets |
| Subheading | *(from getHomepageContent())* | Sheets |

### Venn Diagram Section
| Element | Current Copy | Source |
|---|---|---|
| Section label | `The formula` | Hardcoded |
| Heading | *(from getHomepageContent())* | Sheets |
| Link | `Read more about our product` | Hardcoded |
| Circle 1 | `A pleasant taste` | Hardcoded |
| Circle 2 | `Convenient daily packet` | Hardcoded |
| Circle 3 | `One sachet, 13 ingredients` | Hardcoded |

### Key Ingredients Section
| Element | Current Copy | Source |
|---|---|---|
| Section label | *(from getHomepageContent(), default: `our ingredients`)* | Sheets |
| Heading | *(from getHomepageContent())* | Sheets |
| Link | `See all 13 ingredients` | Hardcoded |

### Comparison Table
| Element | Current Copy | Source |
|---|---|---|
| Section label | `Why Flow` | Hardcoded |
| Heading | `How Flow compares` | Hardcoded |
| Row 1 — Flow | `Clinically-studied formula with 8 active ingredients at full doses` | Hardcoded |
| Row 1 — Others | `Underdosed or proprietary blends` | Hardcoded |
| Row 2 — Flow | `One formula replaces 4–6 separate supplements` | Hardcoded |
| Row 2 — Others | `Multiple products required` | Hardcoded |
| Row 3 — Flow | `Ready-to-drink — no pills, no mixing, no measuring` | Hardcoded |
| Row 3 — Others | `Multiple capsules or powders spread across the day` | Hardcoded |
| Row 4 — Flow | `Each ingredient backed by peer-reviewed research` | Hardcoded |
| Row 4 — Others | `Rarely cited` | Hardcoded |
| Row 5 — Flow | `Swiss-made, third-party tested for purity & safety` | Hardcoded |
| Row 5 — Others | `Rarely disclosed` | Hardcoded |

### Savings Breakdown
| Element | Current Copy | Source |
|---|---|---|
| Section label | `Save Money` | Hardcoded |
| Heading | `One bottle replaces 8 daily supplements.` | Hardcoded |
| Body | `The average person spends over CHF 265 every month on individual supplements. Flow consolidates everything into one bottle — without compromise.` | Hardcoded |
| Savings badge label | `Monthly savings` | Hardcoded |
| Savings amount | `CHF 186` | Hardcoded |
| Savings context | `switching to Flow` | Hardcoded |
| Supplement 1 | `Nootropic Stack (Zynamite®, Alpha-GPC)` · `CHF 45` | Hardcoded |
| Supplement 2 | `Adaptogens (Ashwagandha, Rhodiola, Ginseng)` · `CHF 50` | Hardcoded |
| Supplement 3 | `Lion's Mane Mushroom Extract` · `CHF 35` | Hardcoded |
| Supplement 4 | `L-Theanine & Caffeine` · `CHF 20` | Hardcoded |
| Supplement 5 | `Bacopa Monnieri` · `CHF 25` | Hardcoded |
| Supplement 6 | `Electrolytes Complex` · `CHF 30` | Hardcoded |
| Supplement 7 | `Magnesium Glycinate` · `CHF 20` | Hardcoded |
| Supplement 8 | `Prebiotics & Probiotics` · `CHF 40` | Hardcoded |
| Traditional total | `CHF 265` | Hardcoded |
| Flow price | `CHF 79` | Hardcoded |
| Savings total | `CHF 186` | Hardcoded |

### Latest Articles Rail
| Element | Current Copy | Source |
|---|---|---|
| Heading | `Latest Articles` | Hardcoded |
| Label | `From the blog` | Hardcoded |

---

## 3. Product Detail Page

### Hero
| Element | Current Copy | Source |
|---|---|---|
| Product title | *(dynamic)* | Shopify |
| Price | *(dynamic)* | Shopify |
| Description | *(dynamic, first 220 chars)* | Shopify |

### Service Pillars
| Pillar | Heading | Body | Source |
|---|---|---|---|
| 1 | `Same Day Dispatch` | `Orders before 4pm dispatched same day.` | Hardcoded |
| 2 | `Free Delivery` | `Free 2-day tracked delivery over CHF 50.` | Hardcoded |
| 3 | `30-Day Returns` | `Free returns within 30 days of shipping.` | Hardcoded |

### Purchase Selector
| Element | Current Copy | Source |
|---|---|---|
| Option 1 label | `Subscribe & Save` | Hardcoded |
| Option 1 badge | `10% OFF` | Hardcoded |
| Option 1 body | `Flow delivered every month · Cancel anytime, zero hassle` | Hardcoded |
| Option 2 label | `One Time Purchase` | Hardcoded |
| Option 2 body | `One time delivery` | Hardcoded |

### Ingredient Selection Criteria
| Element | Current Copy | Source |
|---|---|---|
| Section heading | `Our rigorous ingredient selection process.` | Hardcoded |
| Criterion 1 | `Peer-Reviewed Evidence` · `Every ingredient is backed by human clinical trials — not animal studies or in-vitro data.` | Hardcoded |
| Criterion 2 | `Clinical Dosing` · `We dose at proven therapeutic levels — no pixie-dusting or proprietary blends hiding underdoses.` | Hardcoded |
| Criterion 3 | `Bioavailable Forms` · `We select the most bioavailable form of each compound — the exact form used in the clinical research.` | Hardcoded |
| Criterion 4 | `Swiss GMP Manufacturing` · `Produced under pharmaceutical-grade Swiss GMP conditions — every batch tested for purity and potency.` | Hardcoded |

### Ingredients Accordion (Flip Cards)
| Ingredient | Tagline | Description | Source |
|---|---|---|---|
| `Zynamite®` | `Clean focus without the crash` | `A breakthrough mango leaf extract that inhibits COMT to naturally prolong dopamine and noradrenaline. Clinically shown to improve attention 11–16% within 60 minutes without the stimulant side effects of caffeine.` | Hardcoded |
| `L-Theanine & Caffeine` | `Smooth, jitter-free alertness` | `A synergistic duo that delivers smooth, jitter-free alertness. L-theanine moderates caffeine's stimulatory effects, promoting alpha brainwave activity for calm, focused awareness without the crash.` | Hardcoded |
| `Rhodiola Rosea` | `Combat fatigue, build resilience` | `An adaptogenic herb that combats fatigue and supports stress resilience. Rhodiola helps the body adapt to physical and mental demands, reducing the perception of effort during challenging tasks.` | Hardcoded |
| `Panax Ginseng` | `Cognitive function & stamina` | `A renowned adaptogen that supports cognitive function and physical stamina. Panax ginseng modulates the HPA axis and cortisol response, helping maintain balance under sustained stress.` | Hardcoded |
| `Ashwagandha KSM-66®` | `Calm, grounded, balanced` | `A clinically-studied adaptogen that reduces cortisol levels and supports healthy hormonal balance. Promotes a calm, grounded state while supporting thyroid and adrenal health.` | Hardcoded |
| `Lion's Mane Mushroom` | `Neuroplasticity & memory` | `A medicinal mushroom that stimulates NGF (Nerve Growth Factor), supporting the formation of new neural connections. Studied for its role in improving memory, cognitive speed, and long-term brain health.` | Hardcoded |
| `Electrolytes` | `Hydration & nerve signalling` | `A precise blend of sodium, potassium, and magnesium that supports optimal hydration, nerve signalling, and muscle function — ensuring your body and mind operate at full capacity.` | Hardcoded |
| `Prebiotics & Probiotics` | `Gut-brain axis support` | `A dual-action gut-brain axis support system. Prebiotics feed beneficial bacteria while probiotics replenish them, supporting mood, immunity, and serotonin production.` | Hardcoded |
| `Bacopa Monnieri` | `Memory & learning support` | `An Ayurvedic herb used for centuries to enhance memory and cognitive performance. Bacopa modulates acetylcholine and serotonin pathways, with clinical studies showing improved recall after 8–12 weeks.` | Hardcoded |
| `Alpha-GPC` | `Acetylcholine precursor` | `A highly bioavailable choline source that crosses the blood-brain barrier to boost acetylcholine levels — the neurotransmitter central to memory, focus, and learning. Popular with athletes and nootropic users.` | Hardcoded |
| `Magnesium Glycinate` | `Calm, sleep & recovery` | `The most bioavailable form of magnesium, chelated with glycine for superior absorption. Supports over 300 enzymatic reactions, deep sleep, muscle relaxation, and healthy cortisol rhythms.` | Hardcoded |
| `Green Tea Catechins` | `Antioxidant & mitochondrial health` | `Powerful antioxidants that support cellular energy production and cardiovascular health. EGCG from green tea protects neurons and supports healthy mitochondrial function for sustained vitality.` | Hardcoded |

### FAQ (Product Page)
| Question | Answer | Source |
|---|---|---|
| Shipping details | `Free shipping on orders over CHF 50. Orders are dispatched within 1–2 business days from our Swiss warehouse. Standard delivery takes 3–5 business days within Switzerland and 5–10 business days internationally.` | Hardcoded |
| Delivery details | `We offer free delivery on all orders over CHF 50. For orders under CHF 50, a flat shipping fee of CHF 5 applies. All deliveries are tracked and you will receive a confirmation email with your tracking number once your order has been dispatched.` | Hardcoded |
| Returns details | `30-day satisfaction guarantee — if you are not completely satisfied with your purchase, contact us within 30 days for a full refund. No questions asked. Returned products must be unused and in their original packaging.` | Hardcoded |

### "Still Got Questions" Section
| Element | Current Copy | Source |
|---|---|---|
| Heading | `Still got questions?` | Hardcoded |
| Subheading | `Please select where you need support.` | Hardcoded |
| Category tabs | `Product & Formula`, `Usage & Dosage`, `Shipping & Orders`, `Returns & Refunds`, `Safety & Health` | Hardcoded |

---

## 4. Ingredients Page

### Hero
| Element | Current Copy | Source |
|---|---|---|
| Label | `Transparent Formula` | Hardcoded |
| Heading | `Ingredients` | Hardcoded |
| Body | `Every ingredient in Flow is selected for its clinical evidence, bioavailability, and synergy with the full formula. No fillers, no proprietary blends — just full doses of what works.` | Hardcoded |

### Three Axes of Wellbeing
| Element | Current Copy | Source |
|---|---|---|
| Section label | `Our approach` | Hardcoded |
| Heading | `Three axes of wellbeing` | Hardcoded |
| Body | `Every ingredient in Flow was chosen for its contribution to at least one of three interconnected systems. Together, they address the whole person — not just a single symptom.` | Hardcoded |
| Axis 1 | `Cognitive Function` · `Sharpens focus, sustains mental energy, and supports long-term neuroplasticity via cholinergic, dopaminergic, and NGF pathways.` | Hardcoded |
| Axis 2 | `Mood & Hormonal Balance` · `Regulates cortisol, supports dopamine and serotonin synthesis, and builds resilience to physical and emotional stress.` | Hardcoded |
| Axis 3 | `Cellular & Metabolic Health` · `Protects neurons from oxidative stress, fuels mitochondrial efficiency, and provides the co-factors every cell needs to thrive.` | Hardcoded |

### Ingredient List
| Ingredient | Dose | Benefit Copy | Source |
|---|---|---|---|
| `Ashwagandha (KSM-66®)` | `300 mg` | `Clinically shown to reduce cortisol by up to 27%, support thyroid and adrenal health, and promote a calm, grounded state without sedation.` | Hardcoded |
| `Rhodiola Rosea` | `200 mg` | `Reduces the perception of effort during challenging tasks, combats mental fatigue, and supports sustained performance under stress.` | Hardcoded |
| `L-Tyrosine` | `500 mg` | `Precursor to dopamine and noradrenaline. Supports focus and cognitive performance during high-stress or sleep-deprived conditions.` | Hardcoded |
| `Mucuna Pruriens` | `200 mg` | `Natural source of L-DOPA, a direct precursor to dopamine. Supports mood, motivation, and healthy stress response.` | Hardcoded |
| `Alpha-GPC` | `150 mg` | `Rapidly elevates brain acetylcholine levels, supporting memory formation, mental clarity, and neuromuscular function.` | Hardcoded |
| `L-Theanine` | `200 mg` | `Promotes alpha brainwave activity for calm alertness. Synergises with caffeine to eliminate jitters while enhancing focus.` | Hardcoded |
| `Lion's Mane Mushroom` | `500 mg` | `Stimulates Nerve Growth Factor (NGF) synthesis, supporting neuroplasticity, memory, and long-term brain health.` | Hardcoded |
| `Bacopa Monnieri` | `300 mg` | `Ayurvedic herb backed by clinical trials showing improvements in memory recall, processing speed, and anxiety reduction after 4–8 weeks.` | Hardcoded |
| `Vitamin B1 (Thiamine)` | `1.1 mg` | `Supports carbohydrate metabolism and nerve function.` | Hardcoded |
| `Vitamin B3 (Niacin)` | `16 mg NE` | `Key role in cellular energy production (NAD+) and DNA repair.` | Hardcoded |
| `Vitamin B6 (P-5-P)` | `1.4 mg` | `Co-factor for serotonin, dopamine, and GABA synthesis.` | Hardcoded |
| `Vitamin B12 (Methylcobalamin)` | `2.5 µg` | `Supports myelin sheath integrity, red blood cell formation, and mental energy.` | Hardcoded |
| `Magnesium Bisglycinate` | `75 mg elemental` | `Highly bioavailable form of magnesium. Supports NMDA receptor function, muscle relaxation, sleep quality, and over 300 enzymatic reactions.` | Hardcoded |
| `Green Tea Extract (EGCG)` | `200 mg` | `Powerful antioxidant that protects neurons from oxidative stress, supports healthy mitochondrial function, and enhances fat oxidation.` | Hardcoded |
| `Blueberry Extract` | `100 mg` | `Rich in anthocyanins that cross the blood-brain barrier, supporting memory, cerebral blood flow, and neuroprotection.` | Hardcoded |

### CTA Section
| Element | Current Copy | Source |
|---|---|---|
| Label | `Experience the full formula` | Hardcoded |
| Heading | `Every ingredient above, precisely dosed in one daily formula.` | Hardcoded |
| Button 1 | `Shop Flow` | Hardcoded |
| Button 2 | `Product overview` | Hardcoded |

---

## 5. Our Philosophy Page

### Hero
| Element | Current Copy | Source |
|---|---|---|
| Label | `About Flow` | Hardcoded |
| Heading | `Built for minds that refuse to settle.` | Hardcoded |
| Body | `Flow started with a personal frustration — scattered focus, overstimulation, and a supplement market full of noise. We decided to build something better.` | Hardcoded |

### Mission Section
| Element | Current Copy | Source |
|---|---|---|
| Label | `Our Mission` | Hardcoded |
| Heading | `Restore balance. Unlock clarity.` | Hardcoded |
| Body | `At Flow, we believe true performance and lasting happiness come from within — from a calm, sustainable mind that lets you live with clarity, purpose, and joy. In a world that pushes constant hustle and overstimulation, we're here to help you restore balance and unlock the quiet strength already inside you.` | Hardcoded |

### What We Believe
| Element | Current Copy | Source |
|---|---|---|
| Label | `What We Believe` | Hardcoded |
| Heading | `Conviction, not aspiration.` | Hardcoded |
| Intro | `These are not values we wrote for a brand deck. They are the beliefs that drove three years of research before we launched a single product.` | Hardcoded |
| Beliefs | *(from getPhilosophyBeliefs())* | content-data.ts |

### Six Principles
| Element | Current Copy | Source |
|---|---|---|
| Label | `Non-Negotiables` | Hardcoded |
| Heading | `Our six principles.` | Hardcoded |
| Principles | *(from getPhilosophyPrinciples())* | content-data.ts |

### The Standard
| Element | Current Copy | Source |
|---|---|---|
| Label | `The Standard` | Hardcoded |
| Heading | `If we wouldn't take it ourselves, we don't sell it.` | Hardcoded |
| Body | `Every member of the Flow team uses the product daily. That is not a marketing claim — it is the simplest quality test we have. When the people making the product are also the people taking it, the incentives align perfectly. We ask ourselves one question before every decision: would we be comfortable explaining this to a customer who holds us fully accountable? If not, we don't do it.` | Hardcoded |

### CTA Section
| Element | Current Copy | Source |
|---|---|---|
| Label | `Put it into practice` | Hardcoded |
| Heading | `The philosophy behind Flow, now in one daily formula.` | Hardcoded |
| Button | `Shop Flow` | Hardcoded |

---

## 6. Our Product Page

### Hero
| Element | Current Copy | Source |
|---|---|---|
| Label | `About Flow` | Hardcoded |
| Heading | `One formula. Nothing hidden.` | Hardcoded |
| Body | `Flow is a complete daily cognitive supplement built around clinically dosed, peer-reviewed ingredients. Every milligram is on the label for a reason.` | Hardcoded |

### Key Numbers
| Stat | Label | Context | Source |
|---|---|---|---|
| `13` | `Active ingredients` | `Each chosen for clinical evidence, not marketing appeal.` | Hardcoded |
| `0` | `Proprietary blends` | `Every dose is disclosed. No hidden fillers or trace amounts.` | Hardcoded |
| `30+` | `Clinical studies` | `The evidence base behind our core ingredient stack.` | Hardcoded |
| `Swiss` | `GMP certified` | `Manufactured to pharmaceutical-grade standards in Switzerland.` | Hardcoded |

### The Formula Section
| Element | Current Copy | Source |
|---|---|---|
| Label | `The Formula` | Hardcoded |
| Heading | `Built for the long game.` | Hardcoded |
| Body | `Most cognitive supplements are designed around one or two hero ingredients padded out with cheap fillers. Flow is built differently — every ingredient earns its place through clinical evidence, not marketing. The formula targets five domains simultaneously: memory consolidation, stress resilience, neuroplasticity, focused attention, and sleep quality. These systems are deeply interconnected — optimising all five compounds over time. You won't notice a spike on day one. You will notice that six weeks in, tasks feel easier, stress feels lighter, and focus feels more available on demand.` | Hardcoded |

### Format Details
| Element | Current Copy | Source |
|---|---|---|
| Label | `The Details` | Hardcoded |
| Heading | `Made right, from start to finish.` | Hardcoded |
| Format 1 | `Capsule form` · `Delayed-release vegetarian capsules for optimal absorption. No fillers, no anti-caking agents, no unnecessary additives.` | Hardcoded |
| Format 2 | `30-day supply` · `Two capsules daily with your morning meal. Designed for consistent daily use — benefits compound over 4–12 weeks.` | Hardcoded |
| Format 3 | `Third-party tested` · `Every batch is independently tested for purity, potency, and contaminants before it leaves the facility.` | Hardcoded |

### Our Promise
| Element | Current Copy | Source |
|---|---|---|
| Label | `Our Promise` | Hardcoded |
| Heading | `Nothing hidden. Nothing compromised.` | Hardcoded |
| Body | `We're here for the long haul, committed to supporting your journey toward a calmer mind, deeper focus, and a more fulfilling life.` | Hardcoded |
| Bullet 1 | `Clean, natural ingredients you can trust` | Hardcoded |
| Bullet 2 | `No artificial stimulants or hidden additives` | Hardcoded |
| Bullet 3 | `Clinically dosed — no pixie-dusting` | Hardcoded |
| Bullet 4 | `Third-party tested for purity and potency` | Hardcoded |
| Bullet 5 | `Sustainable packaging and responsible sourcing` | Hardcoded |
| Bullet 6 | `Honest communication — always` | Hardcoded |

### CTA Section
| Element | Current Copy | Source |
|---|---|---|
| Heading | `Ready to experience it?` | Hardcoded |
| Body | `Try Flow for 30 days. If you don't notice a meaningful difference, we'll refund you. No questions asked.` | Hardcoded |
| Button 1 | `Shop Flow` | Hardcoded |
| Button 2 | `Full ingredients list` | Hardcoded |

---

## 7. Who We Are Page

### Hero
| Element | Current Copy | Source |
|---|---|---|
| Label | `About Flow` | Hardcoded |
| Heading | `A small team. An uncompromising standard.` | Hardcoded |
| Body | `We are researchers, clinicians, and people who were frustrated enough to build something better. Flow is the product we couldn't find anywhere else.` | Hardcoded |

### Origin Story
| Element | Current Copy | Source |
|---|---|---|
| Label | `How We Started` | Hardcoded |
| Heading | `A personal struggle became a product.` | Hardcoded |
| Body | `It started with years of ADHD-like symptoms, scattered focus, and deep frustration with a market full of overpromising, underdosing, and stimulant-reliant products. After honest conversations with researchers, practitioners, and people facing the same challenges, we spent three years formulating what we couldn't find: a clean, complete, clinically-dosed cognitive supplement with nothing to hide. Flow is small, independent, and based in Switzerland. We have no investors to please and no shortcuts to take. Every bottle reflects that.` | Hardcoded |

### Our Story
| Element | Current Copy | Source |
|---|---|---|
| Label | `Our Story` | Hardcoded |
| Heading | `Built by people who needed it first.` | Hardcoded |
| Body | `Flow started with a conversation between a neuroscientist and a nutritionist who were both dealing with the same problem: a supplement market full of proprietary blends, underdosed ingredients, and claims with no clinical backing. We decided to do it differently. No investors, no shortcuts, no compromise on ingredients. We spent three years formulating before we sold a single bottle. Today, Flow is one of the most transparently dosed cognitive supplements on the market. Every ingredient, every source, every milligram — on the label.` | Hardcoded |

### Team & Timeline
| Element | Current Copy | Source |
|---|---|---|
| Team label | `The People Behind Flow` | Hardcoded |
| Team heading | `Meet the team.` | Hardcoded |
| Team members | *(from getTeamMembers())* | content-data.ts |
| Timeline label | `Our Journey` | Hardcoded |
| Timeline heading | `How we got here.` | Hardcoded |
| Milestones | *(from getMilestones())* | content-data.ts |

---

## 8. Research Page

### Hero
| Element | Current Copy | Source |
|---|---|---|
| Label | `Science-backed` | Hardcoded |
| Heading | `Research` | Hardcoded |
| Body | `Every claim we make is backed by peer-reviewed clinical evidence. Below is the research foundation behind Flow's formula and delivery technology.` | Hardcoded |

### Delivery Technology
| Element | Current Copy | Source |
|---|---|---|
| Heading | `Liquid Delivery Technology` | Hardcoded |
| Subheading | `Why a drink outperforms capsules and powders on bioavailability and onset speed.` | Hardcoded |
| Stat 1 | `~95%` · `Absorption rate` · `Liquid supplements achieve near-complete absorption vs. 40–60% for standard capsules.` | Hardcoded |
| Stat 2 | `15 min` · `Onset time` · `Active ingredients enter the bloodstream within 15–30 minutes, vs. 45–90 minutes for solid forms.` | Hardcoded |
| Stat 3 | `8 actives` · `In one bottle` · `A single 400ml bottle delivers a clinically dosed stack — no need to take multiple supplements.` | Hardcoded |

### Clinical Studies
| Study subject | Headline finding | Journal | Source |
|---|---|---|---|
| `Ashwagandha (KSM-66®)` | `300mg KSM-66 twice daily reduced cortisol by 27.9% and significantly improved scores on stress and anxiety scales after 60 days.` | `Indian Journal of Psychological Medicine, 2012` | Hardcoded |
| `L-Theanine + Caffeine` | `100mg L-theanine combined with 50mg caffeine significantly improved speed and accuracy of attention-switching tasks and reduced susceptibility to distracting information.` | `Nutritional Neuroscience, 2008` | Hardcoded |
| `Lion's Mane Mushroom` | `1000mg/day for 16 weeks significantly improved cognitive function scores in mild cognitive impairment patients vs. placebo (p < 0.05).` | `Phytotherapy Research, 2009` | Hardcoded |
| `Bacopa Monnieri` | `300mg/day for 12 weeks significantly improved delayed word recall and reduced the rate of forgetting newly acquired information.` | `Neuropsychopharmacology, 2002` | Hardcoded |
| `Rhodiola Rosea` | `A single dose significantly improved capacity for mental work against a background of fatigue and stress in a randomised, double-blind, cross-over trial.` | `Phytomedicine, 2003` | Hardcoded |
| `Magnesium Bisglycinate` | `Magnesium glycinate has substantially higher bioavailability than magnesium oxide, with significantly greater tissue retention after 60 days.` | `Journal of the American College of Nutrition, 2002` | Hardcoded |

### Disclaimer
| Element | Current Copy | Source |
|---|---|---|
| Disclaimer | `The studies cited above are published peer-reviewed research on the individual ingredients used in Flow at their respective doses. These statements have not been evaluated by Swissmedic, the EMA, or the FDA. Flow is a food supplement, not a medicine, and is not intended to diagnose, treat, cure, or prevent any disease.` | Hardcoded |

---

## 9. FAQ Page

### Hero
| Element | Current Copy | Source |
|---|---|---|
| Label | `Support` | Hardcoded |
| Heading | `Frequently asked questions` | Hardcoded |
| Body | `Everything you need to know about Flow. Contact us if you can't find what you're looking for.` | Hardcoded |

### FAQ Tabs Component
| Element | Current Copy | Source |
|---|---|---|
| Title | `Got questions?` | Hardcoded |
| Subtitle | `We have answers` | Hardcoded |
| Categories | `Product & Formula`, `Usage & Dosage`, `Shipping & Orders`, `Returns & Refunds`, `Safety & Health` | Hardcoded |
| Q&A items | *(from getFaqItems())* | content-data.ts |

### CTAs
| Element | Current Copy | Source |
|---|---|---|
| Top CTA label | `Ready to try Flow?` | Hardcoded |
| Top CTA heading | `13 actives. One daily formula. 30-day guarantee.` | Hardcoded |
| Top CTA button | `Shop Flow` | Hardcoded |
| Bottom CTA heading | `Still have questions?` | Hardcoded |
| Bottom CTA body | `Our team typically responds within one business day.` | Hardcoded |
| Bottom CTA button | `Contact us` | Hardcoded |

---

## 10. Blog Page

### Hero
| Element | Current Copy | Source |
|---|---|---|
| Featured post title | `Nootropics Explained: What They Are and How They Actually Work` | Hardcoded |
| Featured excerpt | `The word "nootropic" gets thrown around a lot, but few people understand the mechanisms behind cognitive enhancement. We break down the science — clearly and honestly.` | Hardcoded |

### Article List
| Title | Tags | Date | Read time | Source |
|---|---|---|---|---|
| `Ashwagandha KSM-66®: The Most Clinically Studied Adaptogen` | Ingredients, Stress | March 4, 2026 | 5 min read | Hardcoded |
| `Lion's Mane and Neuroplasticity: What the Research Says` | Science, Ingredients | Feb 28, 2026 | 8 min read | Hardcoded |
| `Building a Morning Ritual That Actually Sticks` | Lifestyle, Focus | Feb 20, 2026 | 6 min read | Hardcoded |
| `Why L-Theanine + Caffeine Is the Most Studied Nootropic Stack` | Ingredients, Science | Feb 14, 2026 | 5 min read | Hardcoded |
| `Deep Work in 2026: How to Protect Your Focus in a Distracted World` | Focus, Lifestyle | Feb 7, 2026 | 9 min read | Hardcoded |
| `Magnesium Glycinate and Sleep: The Most Underrated Recovery Tool` | Science, Ingredients | Jan 30, 2026 | 6 min read | Hardcoded |

### Category Filters
| Element | Current Copy | Source |
|---|---|---|
| Filters | `All blogs`, `Focus`, `Ingredients`, `Lifestyle`, `Science` | Hardcoded |

### Blog CTA
| Element | Current Copy | Source |
|---|---|---|
| Label | `From the lab to your shelf` | Hardcoded |
| Heading | `Ready to put the science into practice? Flow is built around every ingredient we write about.` | Hardcoded |
| Button 1 | `Shop Flow` | Hardcoded |
| Button 2 | `The Formula` | Hardcoded |

---

## 11. Contact Page

| Element | Current Copy | Source |
|---|---|---|
| Label | `Get in touch` | Hardcoded |
| Heading | `Contact us` | Hardcoded |

---

## 12. Shipping Policy

| Element | Current Copy | Source |
|---|---|---|
| Label | `Support` | Hardcoded |
| Heading | `Shipping policy` | Hardcoded |
| Last updated | `27 November 2025` | Hardcoded |
| Intro | `We ship worldwide from Switzerland with fast, tracked, and climate-controlled logistics to protect the quality of your supplements.` | Hardcoded |
| Free shipping threshold (CH) | `CHF 80` | Hardcoded |
| Free shipping threshold (DE/AT/FR) | `CHF 150 / €140` | Hardcoded |
| Free shipping threshold (EU/EEA) | `CHF 200` | Hardcoded |
| Processing cutoff | `Orders placed before 13:00 CET (Mon–Fri) are normally dispatched the same day.` | Hardcoded |
| Sign-off | `Thank you for your order! — Flow Health Team` | Hardcoded |

---

## 13. Terms & Conditions

| Element | Current Copy | Source |
|---|---|---|
| Label | `Legal` | Hardcoded |
| Heading | `Terms & conditions` | Hardcoded |
| Last updated | `27 November 2025` | Hardcoded |
| Intro | `Welcome to www.flowhealth.ch. These Terms and Conditions govern your use of our website and the purchase of our dietary supplement products.` | Hardcoded |
| Contract note | `By clicking "Pay Now", you make a binding offer to purchase.` | Hardcoded |
| VAT note | `All prices are in CHF (Swiss Francs) and include Swiss VAT (8.1%).` | Hardcoded |
| Guarantee | `You may return unopened and unused products within 30 days of delivery for a full refund (excluding shipping costs).` | Hardcoded |
| Sign-off | `Thank you for choosing Flow Health!` | Hardcoded |

---

## 14. Privacy Policy

| Element | Current Copy | Source |
|---|---|---|
| Label | `Legal` | Hardcoded |
| Heading | `Privacy policy` | Hardcoded |
| Last updated | `25 November 2025` | Hardcoded |
| Intro | `We take your privacy very seriously...` *(see full page)* | Hardcoded |
| Response time | `We will respond within 30 days.` | Hardcoded |
| Children notice | `Our products and website are not intended for persons under 18. We do not knowingly collect data from children.` | Hardcoded |
| Sign-off | `Thank you for trusting us with your data. — Flow Health Team` | Hardcoded |

---

## 15. Legal Notice

| Element | Current Copy | Source |
|---|---|---|
| Label | `Legal` | Hardcoded |
| Heading | `Legal notice / Impressum` | Hardcoded |
| Note | `Required under Swiss and EU law · Last updated: 27 November 2025` | Hardcoded |
| Company | `Flow Health Massonnet` | Hardcoded |
| Address | `Chemin de Belle Combe 37, 1093 Lutry, Switzerland` | Hardcoded |
| Email | `sales_support@flowhealth.ch` | Hardcoded |
| Phone | `+41 79 354 52 78` | Hardcoded |
| Website | `www.flowhealth.ch` | Hardcoded |
| Director | `Adrien Massonnet` | Hardcoded |

---

*Last updated: April 2026*
