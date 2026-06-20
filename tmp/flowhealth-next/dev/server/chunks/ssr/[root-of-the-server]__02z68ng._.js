module.exports = [
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/src/app/icon.svg (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/icon.02eo6kl2sw35i.svg" + (globalThis["NEXT_CLIENT_ASSET_SUFFIX"] || ''));}),
"[project]/src/app/icon.svg.mjs { IMAGE => \"[project]/src/app/icon.svg (static in ecmascript, tag client)\" } [app-rsc] (structured image object, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$icon$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/app/icon.svg (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$icon$2e$svg__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 320,
    height: 320
};
}),
"[project]/src/lib/content-data.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Static content fallback — edit here when not managed via Google Sheets
__turbopack_context__.s([
    "blogPosts",
    ()=>blogPosts,
    "companyValues",
    ()=>companyValues,
    "comparisonRows",
    ()=>comparisonRows,
    "faqCategories",
    ()=>faqCategories,
    "faqItems",
    ()=>faqItems,
    "healthBenefits",
    ()=>healthBenefits,
    "homepageContent",
    ()=>homepageContent,
    "homepageFeatureCards",
    ()=>homepageFeatureCards,
    "ingredients",
    ()=>ingredients,
    "milestones",
    ()=>milestones,
    "morningRitualCards",
    ()=>morningRitualCards,
    "philosophyBeliefs",
    ()=>philosophyBeliefs,
    "philosophyPrinciples",
    ()=>philosophyPrinciples,
    "productHighlights",
    ()=>productHighlights,
    "resultsTimelineSteps",
    ()=>resultsTimelineSteps,
    "savingsSupplements",
    ()=>savingsSupplements,
    "servicePillars",
    ()=>servicePillars,
    "takeFlowSteps",
    ()=>takeFlowSteps,
    "teamMembers",
    ()=>teamMembers,
    "testimonials",
    ()=>testimonials
]);
const philosophyPrinciples = [
    {
        number: `01`,
        title: `Science before marketing`,
        body: `Every claim we make is backed by peer-reviewed human clinical trials. We never cite animal studies or preclinical data as proof of efficacy. If the evidence isn't strong enough, the ingredient doesn't make the formula.`
    },
    {
        number: `02`,
        title: `Dose integrity`,
        body: `Proprietary blends exist to hide underdosing. We disclose every milligram because we dose at clinically effective levels — not at trace amounts that look good on a label. If you're paying for an ingredient, it should actually work.`
    },
    {
        number: `03`,
        title: `No stimulant dependency`,
        body: `We built Flow for sustainable clarity — not a spike and crash cycle. You should be able to miss a day without consequences. Cognitive enhancement should compound over time, not create reliance.`
    },
    {
        number: `04`,
        title: `Radical transparency`,
        body: `Every source, every form, every dose — disclosed. We will always tell you what's in our product, where it comes from, and why we chose it over alternatives. Hiding things is not something we are interested in.`
    },
    {
        number: `05`,
        title: `Swiss precision`,
        body: `We manufacture in Switzerland under GMP conditions that exceed most global standards. Not because it's a marketing point — because where and how a supplement is made directly affects its safety, consistency, and efficacy.`
    },
    {
        number: `06`,
        title: `Long-term thinking`,
        body: `Short-term cognitive enhancement is easy. We optimise for 6-month, 12-month, and lifetime cognitive health. That means neuroprotective compounds, not just stimulants. It means doing things the slow, right way.`
    }
];
const philosophyBeliefs = [
    {
        text: `The mind is the most important asset you have — and in an age of endless distraction, protecting it is an act of discipline.`,
        order: 1
    },
    {
        text: `Most people are operating far below their cognitive potential — not from lack of effort, but from poor nutrition, chronic stress, and overstimulation.`,
        order: 2
    },
    {
        text: `High-quality supplementation is not a shortcut. It is infrastructure — the same way sleep, exercise, and diet are infrastructure.`,
        order: 3
    },
    {
        text: `Transparency is not a brand value. It is a minimum standard.`,
        order: 4
    },
    {
        text: `We believe in compounding — small, consistent inputs that build over months and years into something remarkable.`,
        order: 5
    }
];
const teamMembers = [
    {
        name: `Marc Dubois`,
        role: `Co-founder & Formulator`,
        bio: `Former neuroscience researcher at EPFL. Spent a decade studying the relationship between stress, neuroplasticity, and performance before founding Flow.`,
        imageUrl: `https://images.ctfassets.net/u04owy9lblh5/2JOAryO1UYAqSnsJBWWRSF/6405e61d6eefe8128c6a20abed602b38/marc-dubois.com_photo-1472099645785-5658abf4ff4e`,
        imageAlt: `Marc Dubois`,
        order: 1
    },
    {
        name: `Sophie Wenger`,
        role: `Co-founder & CEO`,
        bio: `Background in functional medicine and clinical nutrition. Drove the mission to make evidence-based supplementation accessible without the noise.`,
        imageUrl: `https://images.ctfassets.net/u04owy9lblh5/5uSoEr1oVJil12tOhB2nJR/750b9aef28e1b3e5056ea4332f80803b/sophie-wenger.com_photo-1438761681033-6461ffad8d80`,
        imageAlt: `Sophie Wenger`,
        order: 2
    },
    {
        name: `Dr. Lena Fischer`,
        role: `Head of Research`,
        bio: `Clinical pharmacologist with 15 years of experience reviewing safety and efficacy data. Every ingredient in Flow has passed her desk twice.`,
        imageUrl: `https://images.ctfassets.net/u04owy9lblh5/7zGHc6NUqRf5WcISvX6kI7/8a184e2d09cd133752f4a401d8e8d2ce/dr--lena-fischer.com_photo-1494790108377-be9c29b29330`,
        imageAlt: `Dr. Lena Fischer`,
        order: 3
    }
];
const companyValues = [
    {
        title: `Science First`,
        description: `Every ingredient is selected based on peer-reviewed clinical evidence. We review hundreds of studies so you don't have to.`,
        order: 1
    },
    {
        title: `Radical Transparency`,
        description: `No proprietary blends. No hidden fillers. Every dose, every ingredient, every source — disclosed on the label.`,
        order: 2
    },
    {
        title: `Calm Over Crash`,
        description: `We reject stimulant dependency. Flow is designed for sustainable clarity — energy that lifts, never spikes.`,
        order: 3
    },
    {
        title: `Long-Term Thinking`,
        description: `Our formula isn't built for a quick buzz. It's built for compound cognitive gains over weeks, months, and years.`,
        order: 4
    },
    {
        title: `Swiss Precision`,
        description: `Formulated and produced in Switzerland under strict GMP standards. Because where it's made matters as much as what's in it.`,
        order: 5
    },
    {
        title: `For the Focused Few`,
        description: `We don't make products for everyone. We make them for people who take their mind seriously — and are willing to invest in it.`,
        order: 6
    }
];
const milestones = [
    {
        year: `2022`,
        label: `Founded in Geneva`,
        description: `Flow Health was born out of a personal frustration with the supplement market.`,
        order: 1
    },
    {
        year: `2023`,
        label: `Research phase`,
        description: `Over 18 months formulating with researchers, doctors, and practitioners across Switzerland.`,
        order: 2
    },
    {
        year: `2024`,
        label: `Swiss GMP certification`,
        description: `Production partner certified under ISO 22000 and Swiss GMP — among the strictest in Europe.`,
        order: 3
    },
    {
        year: `2025`,
        label: `First formula launched`,
        description: `Flow launched to a waitlist of over 2,000 early adopters. Sold out in week one.`,
        order: 4
    },
    {
        year: `2026`,
        label: `Expanding internationally`,
        description: `Now shipping to 12 countries. Reformulations and new products in development.`,
        order: 5
    }
];
const ingredients = [
    {
        name: `Mango Leaf (Zynamite®)`,
        form: `—`,
        dose: `—`,
        category: `Cognitive`,
        description: `Mango Leaf (Zynamite®)`,
        imageUrl: `https://images.ctfassets.net/u04owy9lblh5/6X7GOHIpIcdn2hMMN6J0QZ/d15b9f440ad00c2b1e051678171f1a9b/idrax_httpss.mj.run0yXlqO35vLs_high_resolution_product_pictur_49ce11c9-1a19-4676-a90e-9417ff21b957_3.png`,
        imageAlt: `Mango Leaf (Zynamite®)`,
        order: 1
    },
    {
        name: `Bacopa Monnieri`,
        form: `Synapsa® extract`,
        dose: `300mg`,
        category: `Memory`,
        description: `One of the most evidence-backed nootropics for long-term memory consolidation. Standardised to 55% bacosides — the active compounds responsible for its effects.`,
        imageUrl: `https://images.ctfassets.net/u04owy9lblh5/6OjagdKkWjjhKnEQYIpek3/ae44a454014b3633f7261ac5c800cf83/bacopa-monnieri.com_photo-1499750310107-5fef28a66643`,
        imageAlt: `Bacopa Monnieri`,
        order: 1
    },
    {
        name: `Saffron Extract`,
        form: `—`,
        dose: `—`,
        category: `Mood`,
        description: `Saffron Extract`,
        imageUrl: `https://images.ctfassets.net/u04owy9lblh5/137PDJUegZRQGPcJPCT5pq/77e441cf6ee998f4a357dd39e9fc499a/idrax_httpss.mj.runSZm4IlcSkwc_highly_realistic_high_resoluti_fcfb6d44-d2b7-417f-a35a-aa62dc93470b_2.png`,
        imageAlt: `Saffron Extract`,
        order: 2
    },
    {
        name: `Ashwagandha`,
        form: `KSM-66® root extract`,
        dose: `300mg`,
        category: `Stress`,
        description: `The most studied adaptogen for cortisol reduction and stress resilience. KSM-66® is the only extract with over 30 clinical trials behind it.`,
        order: 2
    },
    {
        name: `Ashwagandha KSM-66®`,
        form: `—`,
        dose: `—`,
        category: `Stress`,
        description: `Ashwagandha KSM-66®`,
        imageUrl: `https://images.ctfassets.net/u04owy9lblh5/1k0NSddnhlBGiCYDkie9dR/87b5b4fe4a57108d949d9644fcdf3c24/idrax_httpss.mj.runKIAy2ApwjAw_highly_realistic_high_resoluti_e64d872c-0419-4302-8ec1-d32f59ed9b84_2.png`,
        imageAlt: `Ashwagandha KSM-66®`,
        order: 3
    },
    {
        name: `Lion's Mane`,
        form: `Full-spectrum fruiting body`,
        dose: `500mg`,
        category: `Neuroplasticity`,
        description: `Stimulates Nerve Growth Factor (NGF), supporting the growth and maintenance of neurons. Emerging evidence for mild cognitive impairment and long-term brain health.`,
        imageUrl: `https://images.ctfassets.net/u04owy9lblh5/6pDoRnTr1svJi5SVYSz3mS/46e55e2646d72e987491f71fe6e8cb1b/lion-s-mane.com_photo-1559757148-5c350d0d3c56`,
        imageAlt: `Lion's Mane`,
        order: 3
    },
    {
        name: `L-Theanine`,
        form: `—`,
        dose: `—`,
        category: `Calm`,
        description: `L-Theanine`,
        imageUrl: `https://images.ctfassets.net/u04owy9lblh5/2TfTemndRDhvZElNWR5RXO/3a4b7d768def57e69b411ebc5d0bf8bd/idrax_httpss.mj.run7_jGlQcVzxQ_highly_realistic_high_resoluti_419b53d9-9206-4944-aae2-a896cfdb263d_1.png`,
        imageAlt: `L-Theanine`,
        order: 4
    },
    {
        name: `L-Theanine`,
        form: `Pharmaceutical grade`,
        dose: `200mg`,
        category: `Focus`,
        description: `Promotes alpha brainwave activity — the state associated with relaxed alertness. Synergises with caffeine to remove jitteriness without blunting energy.`,
        imageUrl: `https://images.ctfassets.net/u04owy9lblh5/335tLYIkRbZK64Y2CdhhQD/2ffd0bcec96be73485b3849a047ae929/l-theanine.com_photo-1517836357463-d25dfeac3438`,
        imageAlt: `L-Theanine`,
        order: 4
    },
    {
        name: `Rhodiola Rosea`,
        form: `3% rosavins, 1% salidroside`,
        dose: `200mg`,
        category: `Endurance`,
        description: `A well-researched adaptogen for mental and physical fatigue resistance. Particularly effective for sustained cognitive performance under stress.`,
        imageUrl: `https://images.ctfassets.net/u04owy9lblh5/6o20pesnAqZzSnoeEwyOuG/1215cdacec05ec127f060ff21fd1d5ca/rhodiola-rosea.com_photo-1544367567-0f2fcb009e0b`,
        imageAlt: `Rhodiola Rosea`,
        order: 5
    },
    {
        name: `Magnesium Glycinate`,
        form: `Chelated for bioavailability`,
        dose: `200mg`,
        category: `Recovery`,
        description: `The most bioavailable form of magnesium. Supports sleep quality, stress regulation, and synaptic function. Most people are chronically deficient.`,
        imageUrl: `https://images.ctfassets.net/u04owy9lblh5/7mJoClVrH58WEZqMThLh1X/388acda4dd5d5d107fcf6ec1082abb48/magnesium-glycinate.com_photo-1506905925346-21bda4d32df4`,
        imageAlt: `Magnesium Glycinate`,
        order: 6
    }
];
const faqItems = [
    {
        question: `Is Flow safe for daily long-term use?`,
        answer: `Yes. All ingredients in Flow are dosed within safe, well-studied ranges for daily use. The formula is designed as a daily morning supplement, and clinical evidence supports the long-term safety of all actives. We recommend a one-week break every three months as good practice.`,
        category: `safety`,
        order: 1
    },
    {
        question: `What is your return policy?`,
        answer: `We offer a 30-day satisfaction guarantee. If you are not satisfied with your order for any reason, you may return unopened boxes within 30 days of shipping for a full refund. Opened sachets cannot be returned for hygiene reasons, but we review these cases individually.`,
        category: `returns`,
        order: 1
    },
    {
        question: `Which countries do you ship to?`,
        answer: `We ship worldwide from Switzerland. This includes Switzerland, Liechtenstein, the EU/EEA, the United Kingdom, the USA, Canada, and many other countries. For a full list of destinations and shipping costs, please visit our Shipping Policy page.`,
        category: `shipping`,
        order: 1
    },
    {
        question: `How should I take Flow?`,
        answer: `Pour one sachet into 400–500 ml of cold water and stir gently until fully dissolved, then drink. For best results, take it on an empty stomach in the morning.`,
        category: `usage`,
        order: 1
    },
    {
        question: `What is Flow?`,
        answer: `Flow is a premium daily nootropic supplement formulated to support sustained mental clarity, focus, and energy without the crash. Each sachet contains a precisely dosed blend of plant extracts, adaptogens, functional mushrooms, minerals, and vitamins — dissolved in water for fast, effective absorption.`,
        category: `product`,
        order: 1
    },
    {
        question: `Are there any known side effects?`,
        answer: `Flow is well-tolerated by the vast majority of users. In rare cases, some individuals may experience mild digestive sensitivity during the first few days of use. This typically resolves as the body adjusts. If you experience any adverse reactions, discontinue use and consult a healthcare professional.`,
        category: `safety`,
        order: 2
    },
    {
        question: `How do I start a return?`,
        answer: `Email sales_support@flowhealth.ch with your order number and reason for return. Our team will respond within 1 business day with instructions. Return shipping costs are covered by Flow Health for defective or incorrect items.`,
        category: `returns`,
        order: 2
    },
    {
        question: `How long does delivery take?`,
        answer: `Swiss orders typically arrive within 2–4 business days. Germany, Austria and France take 4–6 business days; the rest of the EU/EEA 5–9 business days. UK orders take 5–8 business days, and USA/Canada 9–14 business days. Orders placed before 13:00 CET on a business day are dispatched the same day.`,
        category: `shipping`,
        order: 2
    },
    {
        question: `When is the best time to take Flow?`,
        answer: `We recommend taking Flow first thing in the morning, approximately 15–30 minutes before you begin work or your most demanding mental tasks. Morning intake aligns with your body's natural cortisol peak, amplifying the formula's effects on alertness and focus.`,
        category: `usage`,
        order: 2
    },
    {
        question: `What makes Flow different from other supplements?`,
        answer: `Most supplements come in capsule form, which can take 45–60 minutes to absorb. Flow is a water-dissolved sachet formula with 16 clinically studied actives in one daily serving, replacing multiple separate supplements and removing the need to manage a stack of pills throughout the day.`,
        category: `product`,
        order: 2
    },
    {
        question: `Who should not take Flow?`,
        answer: `Flow is not recommended for individuals under 18, pregnant or breastfeeding women, or those with known sensitivities to any listed ingredients. If you have a pre-existing medical condition or take prescription medication, please consult your doctor before use.`,
        category: `safety`,
        order: 3
    },
    {
        question: `When will I receive my refund?`,
        answer: `Once we receive and inspect your return, refunds are processed within 3–5 business days. The funds will appear on your original payment method within 5–10 business days depending on your bank.`,
        category: `returns`,
        order: 3
    },
    {
        question: `How do I track my order?`,
        answer: `Once your order ships, you will receive a confirmation email with a tracking number and a link to the carrier's tracking page. If you haven't received this within 24 hours of ordering, please check your spam folder or contact us.`,
        category: `shipping`,
        order: 3
    },
    {
        question: `Can I take more than one sachet per day?`,
        answer: `Flow is designed as a once-daily supplement. We do not recommend exceeding one sachet per day. If you have specific health goals that require a higher intake, please speak with a healthcare professional.`,
        category: `usage`,
        order: 3
    },
    {
        question: `What are the key ingredients?`,
        answer: `Flow contains Zynamite® (Mango Leaf Extract), Green Tea Extract, Lion's Mane Mushroom, Hibiscus Extract, Rooibos Extract, Saffr'Active® (Saffron Extract), Ginseng Panax, Betaine (TMG), Magnesium Citrate, Sodium Citrate, Zinc, Vitamin B1 (Thiamine), Vitamin B3 (Niacin), Vitamin B6 (Pyridoxine), Vitamin B12 (Methylcobalamin), and Inulin. Every ingredient is transparently dosed — no proprietary blends, no hidden fillers.`,
        category: `product`,
        order: 3
    },
    {
        question: `Does Flow contain stimulants or controlled substances?`,
        answer: `Flow contains no synthetic stimulants and no controlled or banned substances. It does include Green Tea Extract, which provides a natural source of caffeine (similar in amount to a light cup of tea). There are no artificial stimulants, and all ingredients are naturally sourced and transparently disclosed.`,
        category: `safety`,
        order: 4
    },
    {
        question: `What if my order arrives damaged or incorrect?`,
        answer: `We're sorry to hear that. Please contact us at sales_support@flowhealth.ch within 48 hours of delivery with your order number and a photo of the issue. We will arrange a replacement or refund promptly.`,
        category: `shipping`,
        order: 4
    },
    {
        question: `How long until I feel the effects?`,
        answer: `Most people notice reduced brain fog and increased alertness within 15–45 minutes of their first serving. Full cognitive benefits from adaptogenic and neuroprotective ingredients build over 4–6 weeks of consistent daily use.`,
        category: `usage`,
        order: 4
    },
    {
        question: `Is Flow suitable for vegans?`,
        answer: `Yes. Flow is 100% vegan and free from animal-derived ingredients. It is also gluten-free and contains no artificial colours, sweeteners, or preservatives.`,
        category: `product`,
        order: 4
    },
    {
        question: `Can I take Flow with coffee or other caffeine sources?`,
        answer: `Yes, for most people. Flow contains Green Tea Extract which provides a moderate amount of natural caffeine (roughly equivalent to a light cup of tea). Combined with a morning coffee, total caffeine intake will be moderate. If you are sensitive to caffeine, you may prefer to take Flow on its own.`,
        category: `usage`,
        order: 5
    },
    {
        question: `Are there any allergens?`,
        answer: `Flow is manufactured in a facility that processes tree nuts and soy. If you have severe allergies, please consult your healthcare provider before use. The formula itself does not contain gluten, dairy, eggs, or shellfish.`,
        category: `product`,
        order: 5
    },
    {
        question: `Is it safe to take Flow alongside other supplements or medications?`,
        answer: `Flow is generally well-tolerated alongside common supplements. However, if you are taking prescription medication — particularly for blood pressure, anxiety, or mood — we recommend consulting your doctor before adding Flow to your routine.`,
        category: `usage`,
        order: 6
    },
    {
        question: `What does Flow taste like?`,
        answer: `Flow has a fresh, lightly fruity taste from natural pomegranate flavouring, with subtle herbal notes. It is gently sweetened with stevia — no bitter aftertaste, no sugar. Most people mix it with 400–500 ml of cold water as part of their morning routine.`,
        category: `product`,
        order: 6
    }
];
const homepageContent = {
    heroTagline: `One supplement to reach`,
    heroHeading: `Optimal cerebral health and performance`,
    heroImageUrl: `https://images.ctfassets.net/u04owy9lblh5/57lxgECnNreZhURUkxrK29/e56376be67f355dc06acaa17dba10689/hero-lifestyle.png`,
    missionHeading: `Flow promotes inner balance leading to long term focus, energy and health`,
    missionSubheading: ``,
    vennHeading: `Taking care of your health should not be a chore but an enjoyable experience`,
    vennBackgroundImageUrl: `https://images.ctfassets.net/u04owy9lblh5/css5NDpNcKt9DVxexSuPI/c68d21fd0e787ff65224c23e971062bd/venn-bg.png`,
    resultsHeading: `Benefits beyond focus`,
    resultsSubheading: `Beyond its short term felt focus, Flow has been conceived to help build better habits and routine on the medium term as well as support long term cerebral and bodily health.`,
    bottomMissionEyebrow: `On a Mission to Inner Peace`,
    bottomMissionHeading: `At Flow, we are science-based with humans at heart. Our goal is to revitalise people`,
    ingredientsSectionLabel: `16 ingredients to reach flow state`,
    ingredientsHeading: `Our unique blend of ingredients is enhanced with four key compounds delivering unmatched benefits.`,
    healthBenefitsSectionLabel: `Health Benefits`,
    healthBenefitsHeading: `Flow delivers benefits beyond immediate focus`
};
const homepageFeatureCards = [
    {
        title: `Empowered by stable energy`,
        body: `Flow gently restores harmony – delivering steady, calm energy that keeps distractions, fatigue, and overwhelm at bay.`,
        imageUrl: `https://images.ctfassets.net/u04owy9lblh5/277Ib5Ymrfr9XRJlNInaM3/6c6ecc4d4ea6c7fe53e6f8970f3a605f/empowered-by-stable-energy.png`,
        imageAlt: `Empowered by stable energy`,
        order: 1
    },
    {
        title: `Unlock your full potential`,
        body: `Flow's ingredients help you tap into deep focus, effortless creativity, and crystal-clear thinking – so you can perform at your peak every day.`,
        imageUrl: `https://images.ctfassets.net/u04owy9lblh5/5lX5cxOq21h5xtPTRkZpHU/cbe31616ef039e1b1ab7defb8ab36cf5/unlock-your-full-potential.com_photo-1506905925346-21bda4d32df4`,
        imageAlt: `Unlock your full potential`,
        order: 2
    },
    {
        title: `Your daily inner peace ritual`,
        body: `Begin each day with purpose and power. Flow sets the stage for a productive, fulfilling day.`,
        imageUrl: `https://images.ctfassets.net/u04owy9lblh5/BdKIeNXVXunrNleDwBUlr/ae76ac32fa71a99f9561244a632e11b0/your-daily-inner-peace-ritual.com_photo-1544367567-0f2fcb009e0b`,
        imageAlt: `Your daily inner peace ritual`,
        order: 3
    }
];
const resultsTimelineSteps = [
    {
        period: `Days 1–7`,
        title: `Immediate brain clarity and stable energy`,
        bullets: `Brain fog eases within 15–45 minutes
Calm, jitter-free energy appears quickly
Steady focus without afternoon crashes
Calmer mood and gentler stress response`,
        order: 1
    },
    {
        period: `Weeks 2–4`,
        title: `Deeper Focus & Mood Stability`,
        bullets: `Longer effortless concentration windows
Less mental fatigue by mid-afternoon
More stable mood under pressure
Stronger daily resilience`,
        order: 2
    },
    {
        period: `Month 1–3`,
        title: `Memory, Learning & Gut-Brain Balance`,
        bullets: `Faster recall and better retention
Improved mental flexibility
Early gut-brain connection benefits`,
        order: 3
    },
    {
        period: `Month 3+`,
        title: `Long-term Brain Health & Hormonal Balance`,
        bullets: `Neuroprotective effects build steadily
Better hormonal equilibrium and stress regulation
Deeper sleep, recovery, and overall well-being`,
        order: 4
    }
];
const healthBenefits = [
    {
        number: `04`,
        label: `Calm Sustained Energy`,
        title: `Calm Sustained Energy`,
        ingredients: `Vitamin B1, Vitamin B3, Green Tea Extract, Sodium Citrate, Magnesium Citrate, Zynamite®, Ginseng Panax`,
        description: `B-vitamins and green tea extract support efficient ATP production, while magnesium and adaptogens help modulate cortisol levels to prevent overstimulation and maintain steady energy without crashes.`,
        imageUrl: `/health-benefits/calm-sustained-energy.png`,
        imageAlt: `Person with calm steady focus — Flow Health B-vitamins and green tea extract support sustained energy without caffeine crashes`,
        order: 1,
        blogSlug: `calm-sustained-energy`
    },
    {
        number: `03`,
        label: `Sharp Focus & Clarity`,
        title: `Sharp Focus & Clarity`,
        ingredients: `Lion’s Mane Mushroom, Zynamite®, Green Tea Extract, Betaine, Ginseng Panax`,
        description: `Lion’s Mane stimulates nerve growth factor, while Zynamite® and green tea extract enhance cerebral blood flow and promote alpha brain waves for relaxed, sustained alertness and mental clarity.`,
        imageUrl: `/health-benefits/sharp-focus-clarity.png`,
        imageAlt: `Clear focused mind at work — Flow Health Lion’s Mane and Zynamite® enhance cerebral blood flow for mental clarity and sustained alertness`,
        order: 2,
        blogSlug: `sharp-focus-clarity`
    },
    {
        number: `05`,
        label: `Better Stress Resilience`,
        title: `Better Stress Resilience`,
        ingredients: `Ginseng Panax, Saffr’Active® (Saffron), Magnesium Citrate, Rooibos Extract, Hibiscus Extract`,
        description: `Adaptogens and magnesium regulate the HPA axis and lower cortisol response, strengthening the body’s natural ability to adapt to chronic stress and recover more effectively.`,
        imageUrl: `/health-benefits/better-stress-resilience.png`,
        imageAlt: `Person staying composed under pressure — Flow Health Ginseng Panax and magnesium regulate cortisol and support natural stress resilience`,
        order: 3,
        blogSlug: `better-stress-resilience`
    },
    {
        number: `06`,
        label: `Positive Mood & Motivation`,
        title: `Positive Mood & Motivation`,
        ingredients: `Saffr’Active® (Saffron), Ginseng Panax, Green Tea Extract, Betaine`,
        description: `Saffron and ginseng gently influence serotonin and dopamine pathways, promoting emotional stability, balanced mood, and natural motivation without artificial stimulation.`,
        imageUrl: `/health-benefits/positive-mood-motivation.png`,
        imageAlt: `Bright motivated person — Flow Health saffron extract and ginseng support serotonin and dopamine balance for mood and motivation`,
        order: 4,
        blogSlug: `positive-mood-motivation`
    },
    {
        number: `02`,
        label: `Improved Sleep & Recovery`,
        title: `Improved Sleep & Recovery`,
        ingredients: `Magnesium Citrate, Rooibos Extract, Hibiscus Extract, Sodium Citrate`,
        description: `Magnesium enhances GABA activity and relaxes muscles, supporting faster sleep onset, deeper rest, and better physical and mental recovery overnight.`,
        imageUrl: `/health-benefits/improved-sleep-recovery.png`,
        imageAlt: `Peaceful deep sleep — Flow Health magnesium citrate enhances GABA activity for faster sleep onset and overnight cognitive recovery`,
        order: 5,
        blogSlug: `improved-sleep-recovery`
    },
    {
        number: `01`,
        label: `Long-Term Brain Support`,
        title: `Long-Term Brain Support`,
        ingredients: `Lion’s Mane Mushroom, Hibiscus Extract, Rooibos Extract, Vitamin B1, Vitamin B3, Vitamin B6, Vitamin B12, Zinc`,
        description: `Lion’s Mane boosts nerve growth factor production, while antioxidants and B-vitamins reduce oxidative stress and support long-term neuronal health and cognitive function.`,
        imageUrl: `/health-benefits/long-term-brain-support.png`,
        imageAlt: `Long-term brain health and neuroplasticity — Flow Health Lion’s Mane stimulates nerve growth factor and antioxidants protect neuronal health`,
        order: 6,
        blogSlug: `long-term-brain-support`
    },
    {
        number: `07`,
        label: `Optimal Hydration & Nutrient Flow`,
        title: `Optimal Hydration & Nutrient Flow`,
        ingredients: `Sodium Citrate, Inulin, Magnesium Citrate, Zinc`,
        description: `Sodium citrate optimizes electrolyte balance and cellular hydration, improving absorption and transport of active compounds for better overall performance.`,
        imageUrl: `/health-benefits/optimal-hydration-nutrient-flow.png`,
        imageAlt: `Cellular hydration and nutrient absorption — Flow Health sodium citrate electrolyte balance supports delivery of active cognitive ingredients`,
        order: 7,
        blogSlug: `optimal-hydration-nutrient-flow`
    },
    {
        number: `08`,
        label: `Inner Balance & Well-Being`,
        title: `Inner Balance & Well-Being`,
        ingredients: `All ingredients in the formula (synergistic effect)`,
        description: `The synergistic blend modulates stress response, neurotransmitter balance, and energy metabolism to create greater inner calm and overall equilibrium.`,
        imageUrl: `/health-benefits/inner-balance-well-being.png`,
        imageAlt: `Sense of inner calm and equilibrium — Flow Health synergistic formula supports neurotransmitter balance and overall mental well-being`,
        order: 8,
        blogSlug: `inner-balance-well-being`
    }
];
const testimonials = [
    {
        quote: `Flow changed how I approach my mornings. After three weeks, my focus is sharper and I feel noticeably calmer under pressure. It's become non-negotiable for me.`,
        authorName: `Sarah K.`,
        authorRole: `Flow customer`,
        order: 1
    }
];
const blogPosts = [
    {
        title: `Nootropics Explained: What They Are and How They Actually Work`,
        slug: `nootropics-explained`,
        excerpt: `The word "nootropic" gets thrown around a lot, but few people understand the mechanisms behind cognitive enhancement. We break down the science — clearly and honestly.`,
        coverImageUrl: `https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1400&q=85&auto=format&fit=crop`,
        category: `science`,
        tags: [
            "Science",
            "Ingredients",
            "Focus"
        ],
        publishedDate: `2026-03-08`,
        readTime: `7 min read`,
        featured: true,
        order: 1,
        body: {
            "nodeType": "document",
            "data": {},
            "content": [
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The term \"nootropic\" was coined in 1972 by Romanian psychologist Corneliu Giurgea, who defined it as a substance that enhances cognition without causing harm or dependence. Today, the word covers everything from caffeine to experimental peptides \u2014 which is part of why it's so confusing.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "What makes something a nootropic?",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Giurgea's original criteria were strict: the substance must enhance memory and learning, protect the brain against physical or chemical injury, have few side effects, and be non-toxic. In practice, the modern definition has expanded considerably.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Today, a nootropic is generally any compound that supports cognitive function \u2014 including focus, memory, mood, or stress resilience \u2014 without significant side effects at typical doses. By that definition, dozens of naturally occurring compounds qualify.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The main mechanisms",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Neurotransmitter modulation",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Many nootropics work by influencing neurotransmitter systems. Acetylcholine, the neurotransmitter most associated with memory and learning, can be supported by compounds like Alpha-GPC or Huperzine A. Dopamine pathways \u2014 linked to motivation and working memory \u2014 respond to L-Tyrosine and Mucuna Pruriens.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Cerebral blood flow",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Improved blood flow to the brain means more oxygen and glucose \u2014 the brain's primary fuels. Compounds like Ginkgo Biloba and Vinpocetine have been studied for their vasodilatory effects. Even aerobic exercise works partly through this mechanism.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Neuroprotection and neuroplasticity",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Some of the most exciting nootropics work over longer timeframes by supporting the growth and protection of neurons. Lion's Mane mushroom stimulates Nerve Growth Factor (NGF), a protein essential for the growth and maintenance of neurons. Bacopa Monnieri, meanwhile, appears to enhance synaptic communication and protect against oxidative stress.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "What the evidence actually says",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "It's important to separate compounds with strong clinical evidence from those with only preclinical (animal or cell) studies. The following have meaningful human trial data:",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Bacopa Monnieri \u2014 multiple RCTs showing improved memory in both young adults and older populations",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "L-Theanine + Caffeine \u2014 one of the most replicated nootropic stacks in cognitive research",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Ashwagandha KSM-66\u00ae \u2014 over 30 studies on stress, cortisol, and cognitive performance",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Lion's Mane \u2014 emerging human trials showing improvement in mild cognitive impairment",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Rhodiola Rosea \u2014 well-studied for fatigue resistance and stress resilience",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The honest truth about nootropics",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "No nootropic will make you a genius. What quality compounds can do is remove friction \u2014 reduce the cognitive tax of stress, support the brain's natural repair processes, and help you access the clarity you already have more consistently.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The best nootropic stack is still quality sleep, regular exercise, and a nutrient-dense diet. Supplements are exactly that \u2014 supplementary. But for people who are already doing the basics, the right compounds can make a meaningful difference.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                }
            ]
        }
    },
    {
        title: `Lion's Mane and Neuroplasticity: What the Research Says`,
        slug: `lions-mane-brain`,
        excerpt: `Can a mushroom really grow new brain cells? We review the current evidence on Lion's Mane, NGF stimulation, and long-term cognitive health.`,
        coverImageUrl: `https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1400&q=85&auto=format&fit=crop`,
        category: `science`,
        tags: [
            "Science",
            "Ingredients"
        ],
        publishedDate: `2026-02-28`,
        readTime: `8 min read`,
        featured: false,
        order: 3,
        body: {
            "nodeType": "document",
            "data": {},
            "content": [
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "In an age where mental fatigue and declining sharpness can limit potential, many seek ways to nurture long-term brain health. Lion’s Mane mushroom (Hericium erinaceus) stands out with its unique ability to stimulate nerve growth factor (NGF)—supporting neurogenesis, memory, focus, and mood for the resilient, plastic brain that sustains deep flow states.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Key Takeaways",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Lion’s Mane stimulates NGF and BDNF production, promoting new neuron growth and connections.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Benefits include enhanced memory, attention, and executive function alongside mood support.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "It reduces neuroinflammation and oxidative stress, protecting against modern lifestyle damage.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Effects build gradually for lasting cognitive resilience rather than short-term boosts.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "This gentle neurogenesis fosters calm clarity and adaptability without overstimulation.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The Problem in Today’s World",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Cumulative effects of screen-heavy routines, aging, and everyday cognitive demands can gradually slow the brain’s natural ability to form new connections, resulting in slower recall, reduced creative spark, or a sense that mental performance is no longer as effortless as it once was. This quiet decline in neural vitality often goes unnoticed until focus feels harder to access or recovery from mental effort takes longer.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The Science Explained",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Lion’s Mane contains hericenones and erinacines that cross the blood-brain barrier and robustly upregulate NGF and BDNF—proteins essential for neuron survival, growth, and synaptic plasticity. This encourages hippocampal neurogenesis (key for memory and learning) and prefrontal cortex strengthening (for focus and decision-making).",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "It also exerts anti-inflammatory and antioxidant effects, reducing microglial activation that contributes to brain fog and mood dips. Unlike stimulants, Lion’s Mane works by enhancing the brain’s innate repair systems, improving myelin integrity and neural communication for smoother, more efficient cognitive function over weeks to months.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Evidence & Research Highlights",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Human studies support these mechanisms. Trials show Lion’s Mane supplementation improves cognitive scores in older adults, with measurable gains in memory and attention after 4–16 weeks. Recent reviews highlight benefits for mild cognitive impairment, mood enhancement, and neuroprotection.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Preclinical and emerging clinical data link it to increased NGF expression, better hippocampal function, and reduced inflammation markers. Systematic analyses confirm positive effects on cognition and mood across populations, with excellent tolerability and potential synergy in age-related or stress-induced decline.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Practical Path Forward",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Opt for standardized extracts (typically 500–3,000 mg daily of fruiting body or dual-extract) taken consistently—effects often become noticeable after 4–12 weeks. Divide doses or take with food for best absorption.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Support results with brain-healthy habits: quality sleep (for consolidation), learning new skills (to leverage plasticity), and stress management. Compared to synthetic nootropics, Lion’s Mane provides foundational, regenerative support that compounds over time.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Flow’s formulation features this evidence-based Lion’s Mane extract at balanced doses alongside complementary ingredients, designed to gently promote neurogenesis and long-term neurological vitality for effortless daily flow.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Conclusion: Reclaiming Your Potential",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Your brain holds remarkable regenerative capacity when given the right signals for growth and repair. Lion’s Mane mushroom harnesses this innate ability—nurturing new connections, sharpening focus, and stabilizing mood through natural pathways.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "By incorporating this powerful fungus, you build a more resilient mind where calm clarity and creative potential can flourish sustainably, free from the interference of overstimulation.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Further Reading / Sources",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Szucko-Kociuba et al. (2023). Neurotrophic and neuroprotective effects of Hericium erinaceus (PMC).",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Systematic reviews on cognition and mood benefits (Frontiers in Nutrition, 2025).",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Mori et al. and related trials on cognitive improvement in older adults.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Additional studies on NGF stimulation and neurogenesis (e.g., 2023–2025 publications).",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        title: `Building a Morning Ritual That Actually Sticks`,
        slug: `morning-ritual`,
        excerpt: `Productivity gurus make it look easy. Here's a grounded, science-backed approach to building a morning routine that compounds over time — no 4am wake-ups required.`,
        coverImageUrl: `https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1400&q=85&auto=format&fit=crop`,
        category: `lifestyle`,
        tags: [
            "Lifestyle",
            "Focus"
        ],
        publishedDate: `2026-02-20`,
        readTime: `6 min read`,
        featured: false,
        order: 4,
        body: {
            "nodeType": "document",
            "data": {},
            "content": [
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Morning routines have become a cultural obsession \u2014 5am wakeups, ice baths, journaling, meditation, and a green smoothie before the rest of the world is awake. For most people, this is theatre, not transformation. Here's a more honest approach.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Why mornings matter neurologically",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The first 90 minutes after waking are disproportionately important for cognitive performance. Cortisol peaks naturally in the morning (the cortisol awakening response), creating a window of heightened alertness and motivation. How you use this window sets the neurochemical tone for the rest of the day.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Immediately reaching for your phone \u2014 and the dopamine spikes of notifications and social media \u2014 disrupts this window. It shifts your attention system into reactive mode before you've had the chance to set your own agenda.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The science of habit formation",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "A habit is a behaviour that has been automated through repetition. BJ Fogg's Tiny Habits research shows that the most durable habits are those anchored to existing behaviours and kept small enough that willpower is irrelevant. You don't need discipline to brush your teeth \u2014 the habit is automated.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The mistake most people make with morning routines is going from 0 to 10 overnight. Adding five new habits simultaneously requires enormous cognitive load and willpower \u2014 both of which are depleted by midday. The routine collapses under its own weight.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "A framework that actually works",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "1. Anchor to something you already do",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "You already make coffee, brush your teeth, or take a shower every morning. Use these existing behaviours as anchors. \"After I start the coffee, I will drink a glass of water.\" Small, friction-free, stackable.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "2. Protect the first 30 minutes",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "No phone, no email, no news. This is the single highest-leverage change most people can make. Replace it with anything \u2014 making tea, a short walk, reading a page of a book \u2014 and you will notice a measurable difference in your cognitive baseline within a week.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "3. Light before caffeine",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Morning light exposure (ideally sunlight, but bright indoor light works) anchors your circadian rhythm, advances your cortisol peak, and sets up better sleep that night. Andrew Huberman's lab has published extensively on this. Five minutes outside, or near a window, before your coffee.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "4. Delay the first decision",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Decision fatigue is real. The more choices you make, the worse the quality of subsequent decisions. Pre-decide as much of your morning as possible \u2014 what you'll wear, what you'll eat, when you'll exercise \u2014 the night before. Your morning self will thank you.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The role of supplementation",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "A morning supplement ritual serves two purposes: the physiological effects of the compounds, and the psychological signal that you're investing in your day. The act of taking a quality supplement with intention \u2014 not just gulping it down \u2014 is itself a cue that tells your brain: today matters. That cognitive priming effect is underrated.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                }
            ]
        }
    },
    {
        title: `Why L-Theanine + Caffeine Is the Most Studied Nootropic Stack`,
        slug: `caffeine-theanine`,
        excerpt: `The combination is everywhere — but why does it work? We walk through the pharmacology, optimal ratios, and what sets it apart from coffee alone.`,
        coverImageUrl: `https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400&q=85&auto=format&fit=crop`,
        category: `ingredients`,
        tags: [
            "Ingredients",
            "Science"
        ],
        publishedDate: `2026-02-14`,
        readTime: `5 min read`,
        featured: false,
        order: 5,
        body: {
            "nodeType": "document",
            "data": {},
            "content": [
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "If there's one nootropic combination with enough replicated human trial data to be considered established science, it's L-Theanine and caffeine. The synergy between these two compounds is well-documented, well-understood, and genuinely useful \u2014 which is rare in the supplement world.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "What each compound does alone",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Caffeine",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Caffeine works primarily by blocking adenosine receptors \u2014 adenosine is the neurotransmitter that makes you feel sleepy as it accumulates throughout the day. By blocking its receptors, caffeine delays the onset of fatigue and increases dopamine and noradrenaline activity, producing alertness and improved reaction time.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The downside: caffeine alone also elevates cortisol, increases heart rate, and can produce anxiety and the classic \"jittery\" feeling. It's a blunt instrument.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "L-Theanine",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "L-Theanine is an amino acid found almost exclusively in green tea leaves. It crosses the blood-brain barrier and promotes alpha brainwave activity \u2014 the mental state associated with relaxed alertness. Think: the feeling of being calmly focused, not drowsy, not wired. It also modulates GABA, serotonin, and dopamine activity.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Why the combination works",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "L-Theanine attenuates the anxiogenic (anxiety-producing) and cardiovascular effects of caffeine while preserving \u2014 and in some cases enhancing \u2014 its cognitive benefits. The result is focused alertness without the spike, the jitters, or the crash.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "A 2008 double-blind, randomised, crossover trial published in Nutritional Neuroscience found that the combination improved speed and accuracy on attention tasks, improved sentence verification accuracy, and reduced susceptibility to distracting information compared to either compound alone or placebo.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The optimal ratio",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Most research has used a 2:1 ratio of L-Theanine to caffeine \u2014 typically 200mg theanine to 100mg caffeine. This appears to be the sweet spot for cognitive enhancement with minimal side effects. At higher caffeine doses, the theanine may need to scale accordingly.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Why this matters for how Flow is formulated",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Flow uses this established 2:1 ratio because the evidence supports it. We're not chasing novel combinations or proprietary blends with no clinical backing. When the science is clear, we follow it. When it isn't, we err on the side of caution and transparency.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                }
            ]
        }
    },
    {
        title: `Deep Work in 2026: How to Protect Your Focus in a Distracted World`,
        slug: `deep-work`,
        excerpt: `Notifications, open-plan offices, and infinite scroll are engineered to fragment your attention. Here's how to fight back — cognitively and environmentally.`,
        coverImageUrl: `https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=1400&q=85&auto=format&fit=crop`,
        category: `focus`,
        tags: [
            "Focus",
            "Lifestyle"
        ],
        publishedDate: `2026-02-07`,
        readTime: `9 min read`,
        featured: false,
        order: 6,
        body: {
            "nodeType": "document",
            "data": {},
            "content": [
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "In his 2016 book Deep Work, Cal Newport argued that the ability to focus without distraction on cognitively demanding tasks is becoming increasingly rare \u2014 and increasingly valuable. Eight years later, that argument has only grown stronger. The attention economy has evolved, and our ability to engage in sustained, effortful thought is under systemic assault.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The neuroscience of distraction",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Attention is mediated by the prefrontal cortex (PFC) \u2014 the most recently evolved region of the brain. The PFC supports working memory, executive function, and the ability to filter irrelevant stimuli. It is also the region most sensitive to stress and most demanding of metabolic resources.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Every time you switch tasks \u2014 even briefly \u2014 your brain incurs what researchers call a \"switching cost.\" The attention residue from the previous task lingers, degrading performance on the new one. A 2009 Stanford study found that heavy multitaskers actually performed worse on measures of attentional control and working memory than light multitaskers \u2014 the opposite of what many assume.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The environment is the strategy",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Willpower is a limited resource. Trying to resist your phone through sheer discipline is a losing strategy. The highest-leverage interventions are environmental \u2014 structuring your physical and digital spaces so that the path of least resistance leads to focus, not distraction.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Phone in another room during deep work sessions (not face-down on the desk \u2014 the cognitive load of resisting it is measurable)",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Notification blockers during focus blocks (not just silenced \u2014 turned off)",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Single-tasking as a default: one window, one task",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Time-blocking your calendar before the week begins",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "A consistent physical work environment that your brain associates with focused work",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The biological prerequisites",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Deep work requires adequate sleep, low cortisol, and sufficient dopamine and acetylcholine signalling. These aren't optional \u2014 they are the hardware that cognitive effort runs on. Chronically poor sleep reduces PFC activity measurably. Chronic stress impairs working memory and executive function. There is no productivity hack that compensates for a dysregulated nervous system.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Building a deep work practice",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Start small and scheduled",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Don't try to do four hours of uninterrupted deep work on day one. Start with 60-minute blocks, scheduled at the same time each day (preferably in the morning, when PFC function is highest). Consistency matters more than duration.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Create a shutdown ritual",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Newport recommends a clear end-of-work ritual \u2014 reviewing your task list, closing everything down, and saying a specific phrase to signal completion. This is not superstition; it helps close open cognitive loops and allows genuine rest.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Embrace boredom",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The ability to tolerate boredom is the flip side of the ability to focus. If you reach for your phone every time you're waiting \u2014 at traffic lights, in queues, between tasks \u2014 you are training your brain to expect constant stimulation and making it harder to sit with a difficult problem. Let yourself be bored, sometimes.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The compound effect",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "A daily 90-minute deep work session, executed consistently five days a week, accumulates to over 350 hours of focused, high-quality cognitive work per year. Very few people are doing this. The ones who are have a significant, compounding advantage in any knowledge-based field.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                }
            ]
        }
    },
    {
        title: `Zynamite®: Jitter-Free, Sustained Focus Without Stimulants`,
        slug: `zynamite-focus`,
        excerpt: `Zynamite® is a patented mango leaf extract rich in mangiferin — a potent xanthone that activates cognitive performance via PDE4 inhibition, without caffeine or stimulant dependency.`,
        coverImageUrl: `https://images.unsplash.com/photo-1490885578174-acda8905c2c6?w=1400&q=85&auto=format&fit=crop`,
        category: `ingredients`,
        tags: [
            "Ingredients",
            "Focus"
        ],
        publishedDate: `2026-04-01`,
        readTime: `5 min read`,
        featured: false,
        order: 8,
        body: {
            "nodeType": "document",
            "data": {},
            "content": [
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "In high-cognitive-demand lifestyles—whether in demanding professional roles, creative projects, or academic pursuits—many people experience accumulating mental fatigue that simple rest doesn’t fully resolve. Zynamite®, a standardized extract from Mangifera indica (mango) leaves rich in the polyphenol mangiferin, offers a gentle, non-stimulatory solution. It supports attention, processing speed, executive function, and mood stability—helping the brain maintain calm clarity and resilience under modern pressures.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Key Takeaways",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Zynamite® enhances attention, processing speed, and executive function without stimulation.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Its primary compound, mangiferin, delivers potent antioxidant and neuroprotective effects.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Benefits include improved accuracy, reduced mental fatigue, and better mood stability.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "It supports brain plasticity and dopamine balance gently, avoiding spikes or crashes.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "This natural modulation fosters sustainable clarity over forced intensity.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The Problem in Today’s World",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "High-cognitive-demand lifestyles—whether in demanding professional roles, creative projects, or academic pursuits—can lead to accumulating mental fatigue that doesn’t resolve with simple rest. This leaves many feeling mentally drained by mid-afternoon, with slower thinking, reduced accuracy under pressure, or a quiet sense that their mind is no longer performing at its usual level. Without addressing the underlying oxidative stress and neural efficiency challenges, even motivated individuals find sustained focus and recovery increasingly difficult.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The Science Explained",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Zynamite® is standardized for high levels of mangiferin, a xanthone polyphenol with exceptional antioxidant capacity that readily crosses the blood-brain barrier. Mangiferin neutralizes free radicals more effectively than many common antioxidants, protecting neurons from oxidative damage caused by chronic cognitive load.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "It also mildly inhibits catechol-O-methyltransferase (COMT), helping preserve dopamine availability in prefrontal regions for better executive control. Additionally, mangiferin promotes long-term potentiation (LTP) in the hippocampus—the cellular mechanism of learning and memory—while exerting anti-inflammatory effects that maintain healthy neural connectivity. Unlike stimulants that force alertness, Zynamite® works upstream to enhance cerebral blood flow and support relaxed-yet-alert brain-wave patterns, delivering cleaner cognitive efficiency without cardiovascular strain or crashes.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Evidence & Research Highlights",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Human trials consistently demonstrate these benefits.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "A double-blind, placebo-controlled crossover study (Wightman et al., 2020) found that a single 300 mg dose of Zynamite® improved performance on attention, memory, and cognitively demanding tasks, with effects lasting up to 5 hours.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "More recent research on advanced soluble formulations (Zynamite® S) showed dose-dependent improvements in selective attention, processing speed, executive control, and mood in young adults, with noticeable benefits even at 150 mg during high-demand scenarios.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Additional studies confirm faster reaction times, reduced perceived mental fatigue, and positive EEG changes during cognitive effort—distinct from caffeine’s profile and without side effects on heart rate or blood pressure.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Preclinical data further support mangiferin’s ability to protect dopaminergic neurons, reduce inflammation, and enhance hippocampal plasticity under stress.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Practical Path Forward",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "For best results, use standardized Zynamite® at 100–300 mg before periods of focused mental work. Lower doses work well for daily maintenance; higher doses provide extra support during intensive tasks.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Combine with foundational habits: consistent hydration and nutrition (to optimize polyphenol absorption), brief movement or nature breaks (to amplify neuroprotection), and quality sleep (essential for clearing oxidative byproducts).",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Compared to synthetic or high-stimulant options, Zynamite® delivers cleaner, longer-lasting cognitive support with minimal risk of tolerance or rebound fatigue—making it ideal for consistent daily use.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Flow’s formulation incorporates this evidence-based Zynamite® extract alongside synergistic compounds at balanced doses, designed to gently enhance natural pathways and promote enduring inner equilibrium.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Conclusion: Reclaiming Your Potential",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Your brain is built for remarkable clarity and resilience when shielded from oxidative burden and supported by balanced modulation. Zynamite® represents nature’s elegant solution—protecting and enhancing cognitive function without forcing the system.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "By choosing this calm, regenerative approach over abrupt stimulation, you create the stable foundation where sustained focus, mental stamina, and true potential can flourish every day.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Further Reading / Sources",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Wightman, E. L., et al. (2020). Acute effects of a polyphenol-rich leaf extract of Mangifera indica L. (Zynamite) on cognitive function. Nutrients.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "López-Ríos, L., et al. (2020). Central nervous system activities of Mangifera indica L. extract. Journal of Ethnopharmacology.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Recent studies on Zynamite® S (2025). Acute supplementation improves mental performance and mood. Pharmaceuticals.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Gelabert-Rebato, M., et al. Mangifera indica leaf extract and brain plasticity (preclinical reviews).",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Systematic reviews on mangiferin’s neuroprotective mechanisms (Frontiers in Pharmacology).",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        title: `Saffron Extract: Balanced Mood and Mental Clarity`,
        slug: `saffron-mood-clarity`,
        excerpt: `Saffron's active compounds — crocin and safranal — modulate serotonin reuptake and support emotional regulation, delivering measurable mood balance and mental clarity backed by human trials.`,
        coverImageUrl: `https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=1400&q=85&auto=format&fit=crop`,
        category: `ingredients`,
        tags: [
            "Ingredients",
            "Mood"
        ],
        publishedDate: `2026-04-05`,
        readTime: `5 min read`,
        featured: false,
        order: 9,
        body: {
            "nodeType": "document",
            "data": {},
            "content": [
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "In a fast-paced world where anxiety and low mood can quietly undermine productivity and joy, many seek natural ways to restore emotional balance. Saffron extract, derived from Crocus sativus, offers gentle yet potent support through its bioactive compounds—promoting serotonin balance, reducing stress reactivity, and enhancing cognitive clarity for the sustained inner stability that flow requires.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Key Takeaways",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Saffron modulates serotonin and BDNF pathways to support mood, motivation, and emotional regulation.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "It reduces symptoms of anxiety and mild depression while improving attention and cognitive performance.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Benefits include better sleep quality, lower stress markers, and enhanced mental resilience without sedation.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "As an antioxidant, it protects neurons from inflammation and oxidative stress common in overstimulation.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "This natural modulation fosters calm alertness rather than artificial highs or emotional volatility.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The Problem in Today’s World",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Daily emotional wear from work pressure, social comparisons, or unpredictable schedules can create subtle but persistent shifts in mood—leaving people feeling on edge, less motivated, or quietly drained even when life is objectively going well. This internal volatility makes it harder to access steady focus or genuine satisfaction, often pushing individuals toward temporary fixes that mask rather than resolve the underlying imbalance.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The Science Explained",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Saffron’s key compounds, crocin and safranal, influence multiple brain pathways. They gently inhibit serotonin reuptake (similar to certain antidepressants) while boosting brain-derived neurotrophic factor (BDNF) for neuroplasticity and mood stability. This supports prefrontal cortex function for better attention and decision-making.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Additionally, saffron exhibits strong antioxidant and anti-inflammatory effects, shielding neurons from oxidative damage caused by chronic stress. It modulates the HPA axis to lower cortisol reactivity, promoting parasympathetic calm without drowsiness. The result is improved emotional regulation, reduced rumination, and smoother transitions into focused states—ideal for countering overstimulation’s toll.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Evidence & Research Highlights",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Extensive clinical trials confirm saffron’s efficacy. Systematic reviews of randomized controlled trials show saffron (30 mg/day) performs comparably to antidepressants like fluoxetine for depression and anxiety, with significant reductions in symptoms (often 25–60% improvement). Studies also report better cognitive scores, including memory and attention, in both healthy adults and those with mild impairment.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Additional research highlights faster improvements in mood, sleep quality, and stress resilience, with favorable safety profiles and fewer side effects than conventional options. Neuroimaging and biomarker studies link these benefits to modulated serotonin, BDNF, and reduced inflammation—validating saffron’s role in neurological and psychiatric support.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Practical Path Forward",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Choose standardized saffron extracts (typically 28–30 mg/day of affron® or equivalent) taken consistently, ideally in the morning or early afternoon to align with natural circadian rhythms. Effects often build over 4–8 weeks with daily use.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Combine with supportive habits: mindful movement, quality sleep, and low-stimulation routines to maximize mood and focus gains. Unlike stimulants, saffron provides balanced, non-habit-forming support that complements rather than overrides natural neurochemistry.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Flow’s formulation includes this evidence-based saffron extract at optimal levels alongside synergistic compounds, designed to gently nurture emotional equilibrium and cognitive resilience for everyday flow.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Conclusion: Reclaiming Your Potential",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Your brain is wired for emotional steadiness and clear presence when supported by balanced biochemistry. Saffron extract demonstrates how nature can restore this harmony—easing anxiety, lifting mood, and sharpening focus without compromise.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "By embracing this golden ally, you create space for consistent performance and genuine well-being, where calm stability becomes the foundation for your highest potential.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Further Reading / Sources",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Cerdá-Bernad et al. (2022). Saffron’s effects on neurocognitive disorders (Nutrients review).",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Systematic review (2024). Saffron for cognition, depression, anxiety (Phytotherapy Research).",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Omidkhoda et al. (2022). Saffron in neurological and mental disorders (PMC).",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Additional RCTs on mood and cognitive benefits (e.g., affron® trials).",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        title: `TMG (Betaine): The Methyl Donor Behind Brain and Cellular Energy`,
        slug: `tmg-brain-energy`,
        excerpt: `Trimethylglycine (TMG) is a key methyl donor supporting SAM synthesis, homocysteine regulation, and mitochondrial ATP production — the quiet infrastructure behind cognitive sharpness and sustained cellular energy.`,
        coverImageUrl: `https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1400&q=85&auto=format&fit=crop`,
        category: `ingredients`,
        tags: [
            "Ingredients",
            "Science"
        ],
        publishedDate: `2026-04-10`,
        readTime: `5 min read`,
        featured: false,
        order: 10,
        body: {
            "nodeType": "document",
            "data": {},
            "content": [
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "In the pursuit of steady mental performance, many encounter fluctuations in mood and motivation that disrupt daily flow. Trimethylglycine (TMG), also known as betaine, serves as a gentle methyl donor that supports neurotransmitter synthesis and cellular resilience—fostering the stable neurochemistry essential for sustained clarity without overstimulation.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Key Takeaways",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "TMG acts as a methyl donor, aiding the production of key neurotransmitters like dopamine and serotonin for balanced mood and motivation.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "It helps lower homocysteine levels, protecting brain health and reducing inflammation linked to cognitive decline.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Benefits include improved focus, working memory, and emotional stability without the spikes or crashes of stimulants.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "TMG supports cellular hydration and neuroprotection, enhancing resilience under modern stress.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "This modulation promotes sustainable cognitive function rather than temporary alertness.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The Problem in Today’s World",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Modern diets often lack sufficient methyl donors from whole foods, while everyday metabolic demands—from processed meals, alcohol, or even intense training—can quietly elevate homocysteine and disrupt methylation pathways. This internal imbalance shows up as gradual dips in motivation, foggy decision-making, or mood instability that make consistent performance feel harder to maintain. Without supporting these foundational processes, people may experience a slow erosion of mental sharpness and emotional steadiness, turning what should be reliable daily energy into an uphill effort.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The Science Explained",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "TMG functions primarily as a methyl donor in the methionine cycle, converting homocysteine into methionine and ultimately supporting the production of S-adenosylmethionine (SAMe)—a critical cofactor for synthesizing dopamine, serotonin, and other mood-regulating compounds. By donating methyl groups, TMG helps maintain balanced neurotransmitter levels without overactivating reward pathways.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Additionally, TMG acts as an osmolyte, protecting brain cells from osmotic stress and dehydration during high-demand periods. This dual role reduces oxidative damage and inflammation in neural tissue while supporting prefrontal cortex efficiency for attention and executive function. Unlike direct stimulants, TMG works upstream to restore homeostasis, enhancing dopamine sensitivity and GABAergic tone for calmer, more sustained focus.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Evidence & Research Highlights",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Clinical studies consistently highlight TMG’s cognitive and mood benefits. Research in elderly populations showed that TMG supplementation improved cognitive function, likely through its neuroprotective and anti-inflammatory effects. A 2015 trial combining TMG with SAMe demonstrated greater improvements in depression symptoms than SAMe alone over 12 months.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Further trials link TMG to better working memory, processing speed, and mood regulation, particularly in stress-prone individuals. Neuroimaging and metabolic studies confirm increased prefrontal and hippocampal activity after consistent use, alongside reduced homocysteine levels associated with lower risk of cognitive decline. These findings position TMG as a supportive ally for long-term brain resilience rather than acute stimulation.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Practical Path Forward",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "For optimal results, use standardized TMG at 500–2,000 mg daily, ideally split around focused work periods or with meals to aid absorption. Lower doses suit everyday maintenance; higher ones provide extra support during demanding phases.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Pair with lifestyle foundations: balanced nutrition (to support methylation), consistent hydration, and moderate exercise to amplify neuroprotective effects. Compared to high-stimulant options, TMG offers cleaner, longer-lasting benefits with minimal risk of tolerance or rebound fatigue.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Flow’s formulation incorporates TMG alongside complementary ingredients at balanced doses, designed to gently reinforce natural methylation pathways and promote enduring inner equilibrium without overriding your neurochemistry.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Conclusion: Reclaiming Your Potential",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Your brain possesses powerful built-in systems for steady motivation and clear thinking when methylation and cellular balance are supported. TMG embodies a thoughtful, nature-aligned approach: restoring equilibrium rather than forcing alertness.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "By integrating this gentle methyl donor, you cultivate reliable focus, emotional stability, and resilience—unlocking the calm foundation where true potential thrives sustainably.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Further Reading / Sources",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Eussen et al. (2007). Cognitive function improvements with betaine in elderly populations.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Healthline review (2021). TMG supplements and depression symptom relief via SAMe synergy.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Knight et al. (2023). Betaine’s neuroprotective roles in CNS stress and cognition (PMC review).",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Additional studies on TMG’s mood and neurotransmitter balance (e.g., 2015 SAMe + TMG trial).",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        title: `The Complete Guide to Neurotransmitters`,
        slug: `neurotransmitters-guide`,
        excerpt: `Neurotransmitters—the brain's chemical messengers—are the hidden architects of focus, motivation, and mood. Understanding how they work provides a clear roadmap to balanced neurochemistry and effortless flow states.`,
        coverImageUrl: `https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=1400&q=85&auto=format&fit=crop`,
        category: `science`,
        tags: [
            "Science",
            "Focus",
            "Mood"
        ],
        publishedDate: `2026-04-20`,
        readTime: `8 min read`,
        featured: false,
        order: 11,
        body: {
            "nodeType": "document",
            "data": {},
            "content": [
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "In the quest for steady mental performance, many people notice that motivation, focus, and mood can feel unpredictable from one day to the next. Neurotransmitters—the brain's chemical messengers—are the hidden architects of these experiences. Understanding how they work provides a clear roadmap to the balanced neurochemistry that makes effortless flow states possible.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Key Takeaways",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Neurotransmitters like dopamine, norepinephrine, serotonin, acetylcholine, and GABA work together to regulate focus, motivation, mood, and calm.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Modern overstimulation often creates imbalances rather than outright deficiencies.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Balanced signaling—not extreme spikes—supports sustained attention and emotional stability.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Small, targeted support for these pathways can restore natural equilibrium.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Flow supplements are formulated to gently reinforce these systems without overriding them.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The Problem in Today's World",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Everyday demands—rapid information streams, constant decision-making, and variable rewards—can quietly dysregulate neurotransmitter balance. What begins as occasional scattered focus or fluctuating energy often becomes a persistent sense that motivation and calm are harder to access. Without understanding the underlying chemistry, people may chase temporary boosts that further disrupt the delicate harmony required for consistent performance and well-being.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The Science Explained",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Dopamine drives motivation and reward anticipation, norepinephrine sharpens attention and alertness, serotonin stabilizes mood and emotional regulation, acetylcholine supports memory and learning, and GABA promotes calm and inhibitory control. These molecules interact constantly across prefrontal, limbic, and reward circuits.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Chronic overstimulation tends to lower baseline dopamine sensitivity while elevating norepinephrine reactivity, tipping the brain toward restlessness rather than sustained focus. Serotonin signaling can also become less efficient under prolonged stress, contributing to mood volatility. When these systems fall out of balance, entering a true flow state—where effort feels effortless—becomes increasingly difficult.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Evidence & Research Highlights",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Decades of neuroscience research, including functional imaging and pharmacological studies, show that optimal neurotransmitter balance directly correlates with better executive function, emotional resilience, and flow experiences. Landmark work by Mihaly Csíkszentmihályi and modern neuroscientists demonstrates that the neurochemical profile of flow involves moderate dopamine and norepinephrine elevation alongside strong GABA and serotonin tone.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Clinical data further confirm that gentle modulation of these pathways—rather than intense stimulation—improves sustained attention, working memory, and mood stability across healthy adults.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Practical Path Forward",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Supporting neurotransmitter balance starts with lifestyle foundations: consistent sleep, single-tasking blocks, moderate exercise, and low-stimulation periods that allow natural recalibration.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Evidence-based compounds can provide additional gentle support. L-theanine promotes alpha-wave calm and GABA tone, TMG aids methylation for dopamine and serotonin synthesis, saffron extract helps modulate serotonin and BDNF, mangiferin supports cognitive efficiency, and Lion's Mane encourages neuroplasticity and NGF production. Flow's formulation combines these ingredients at balanced, clinically relevant doses to reinforce your brain's natural neurotransmitter harmony—making calm, sustained focus more accessible every day.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Conclusion: Reclaiming Your Potential",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Your brain already contains the complete toolkit for deep focus, motivation, and emotional steadiness. When neurotransmitters work in harmony, flow becomes a reliable state rather than a rare moment. By understanding and gently supporting these chemical messengers, you create the internal conditions where your highest potential can unfold naturally and sustainably.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Further Reading & Sources",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Csíkszentmihályi, M. (1990). Flow: The Psychology of Optimal Experience.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Arnsten, A. F. T. (2009). Stress signalling pathways that impair prefrontal cortex structure and function. Nature Reviews Neuroscience.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Huberman Lab episodes on dopamine, norepinephrine, and focus systems.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Comprehensive reviews on neurotransmitter balance and cognition (Neuropharmacology, 2020–2025).",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        title: `The Brain Behind Athletic Performance`,
        slug: `brain-athletic-performance`,
        excerpt: `Athletic performance is as much a brain event as a muscular one. Neurotransmitter balance, focus networks, and recovery systems directly determine power, endurance, and the elusive feeling of effortless flow.`,
        coverImageUrl: `https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=1400&q=85&auto=format&fit=crop`,
        category: `performance`,
        tags: [
            "Performance",
            "Science",
            "Focus"
        ],
        publishedDate: `2026-04-21`,
        readTime: `6 min read`,
        featured: false,
        order: 12,
        body: {
            "nodeType": "document",
            "data": {},
            "content": [
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Many athletes and active individuals push their bodies hard, only to find that mental factors—focus, motivation, and recovery—often determine whether they reach their true potential. The brain is the ultimate performance organ, orchestrating every movement, decision, and moment of flow on the field, trail, or gym floor.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Key Takeaways",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Athletic performance is as much a brain event as a muscular one.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Neurotransmitter balance, focus networks, and recovery systems directly influence power, endurance, and skill execution.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Overstimulation and poor recovery impair the brain's ability to coordinate peak performance.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Gentle support for brain chemistry enhances both physical output and mental resilience.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Flow supplements help bridge the gap between training and consistent, effortless performance.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The Problem in Today's World",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Intense training schedules, competition stress, and the mental load of modern life can leave athletes feeling mentally drained even when their bodies are ready. Motivation dips, focus wavers under pressure, and recovery feels incomplete—turning what should be peak physical expression into an uphill battle against mental fatigue.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The Science Explained",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "During athletic performance, the prefrontal cortex and motor networks rely on precise dopamine and norepinephrine signaling for motivation, decision-making, and movement precision. Acetylcholine supports motor learning and attention, while GABA and serotonin help regulate effort perception and emotional control. After exertion, the brain needs adequate recovery time for neurochemical replenishment and neuroplastic adaptations that improve future performance.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Chronic overstimulation or insufficient mental recovery disrupts this cycle, reducing dopamine sensitivity and elevating cortisol, which impairs focus, coordination, and resilience.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Evidence & Research Highlights",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Sports neuroscience research consistently shows that optimized brain chemistry predicts better reaction time, decision accuracy, endurance, and flow states in athletes. Studies on elite performers link balanced catecholamine signaling and rapid post-exercise recovery to superior performance metrics. Interventions that support neurotransmitter balance and neuroplasticity have demonstrated measurable improvements in both cognitive and physical output.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Practical Path Forward",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Build brain-first athletic performance with deliberate practices: focused training sessions without distractions, quality sleep for neurochemical reset, and active recovery that includes low-stimulation time.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Targeted nutritional support can accelerate results. Compounds like L-theanine and caffeine for calm alertness, mangiferin for cognitive efficiency, TMG for methylation support, saffron for mood stability, and Lion's Mane for neurogenesis work together to keep the brain performing at its best. Flow's formulation is designed precisely for this purpose—delivering balanced support that enhances mental clarity and recovery so your physical training can translate into consistent, effortless performance.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Conclusion: Reclaiming Your Potential",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "True athletic excellence lives in the brain as much as in the body. When neurochemistry is balanced and recovery is respected, movement becomes fluid, decisions become instinctive, and performance feels almost automatic. By caring for the brain behind the performance, you unlock a level of consistency and flow that transforms training into genuine mastery.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Further Reading & Sources",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Dietrich, A., & Audiffren, M. (2011). The reticular-activating hypofrontality model of exercise-induced altered states of consciousness. Exercise and Sport Sciences Reviews.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Review papers on neurochemical basis of athletic performance (2020–2025).",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Huberman Lab episodes on dopamine, focus, and physical performance.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        title: `What Focused Work Does to Your Brain`,
        slug: `focused-work-brain`,
        excerpt: `Deep, distraction-free focus doesn't just get more done—it literally reshapes the brain in ways that enhance clarity, creativity, and long-term cognitive health.`,
        coverImageUrl: `https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1400&q=85&auto=format&fit=crop`,
        category: `focus`,
        tags: [
            "Focus",
            "Science",
            "Lifestyle"
        ],
        publishedDate: `2026-04-22`,
        readTime: `7 min read`,
        featured: false,
        order: 13,
        body: {
            "nodeType": "document",
            "data": {},
            "content": [
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Many people chase productivity hacks, yet the most powerful practice may be the simplest: sustained, distraction-free focus. Deep, focused work doesn't just get more done—it literally reshapes the brain in ways that enhance clarity, creativity, and long-term cognitive health.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Key Takeaways",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Focused work strengthens prefrontal networks and improves executive function.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "It promotes neuroplasticity and dopamine regulation for better motivation.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Regular deep work sessions reduce the mental cost of distractions.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "The brain adapts positively to consistent focus, making flow states more accessible.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Flow supplements support the neurochemistry that makes deep work sustainable.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The Problem in Today's World",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Fragmented attention from notifications and multitasking has become the default mode for most knowledge workers. This constant switching prevents the brain from experiencing the deep states where real insight and progress occur, leaving people feeling busy yet unfulfilled and mentally exhausted by the end of the day.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The Science Explained",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "During focused work, the prefrontal cortex activates strongly, strengthening connections involved in attention, working memory, and cognitive control. Sustained focus also modulates dopamine in a healthy way—reinforcing intrinsic motivation rather than seeking external rewards. Over time, this practice enhances neuroplasticity, improves default mode network regulation (reducing rumination), and builds resilience against distractions.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Evidence & Research Highlights",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Neuroimaging studies show that individuals who regularly engage in deep work exhibit greater prefrontal thickness, better attentional control, and improved connectivity between brain regions. Long-term practitioners also report higher flow frequency and greater overall cognitive resilience. Research on mindfulness and single-task training confirms measurable structural and functional brain changes after consistent practice.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Practical Path Forward",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Create conditions for deep work: schedule 60–90 minute focused blocks, remove digital distractions, and use environmental cues to signal \"deep mode\" to your brain.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Support the underlying neurochemistry with evidence-based tools. L-theanine promotes calm alpha states, mangiferin enhances cognitive efficiency, TMG aids neurotransmitter synthesis, saffron supports mood stability, and Lion's Mane encourages the plasticity that makes deep work increasingly effortless. Flow's formulation is crafted to make sustained focus feel natural—helping you enter and maintain the states where your best thinking happens.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Conclusion: Reclaiming Your Potential",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Focused work is not just a productivity strategy—it is a powerful form of brain training. When you give your mind the space to work deeply, it rewards you with sharper cognition, richer creativity, and more frequent flow experiences. The brain you build through consistent focus becomes the foundation for everything else you want to achieve.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Further Reading & Sources",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Newport, C. (2016). Deep Work: Rules for Focused Success in a Distracted World.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Csíkszentmihályi, M. (1990). Flow: The Psychology of Optimal Experience.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Neuroimaging studies on sustained attention and neuroplasticity (2020–2025).",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Huberman Lab episodes on focus protocols.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        title: `What the Brain Needs to Truly Recover`,
        slug: `brain-recovery`,
        excerpt: `The brain requires specific conditions to restore neurochemical balance, repair connections, and prepare for another round of high performance. Here is what true recovery actually looks like.`,
        coverImageUrl: `https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=1400&q=85&auto=format&fit=crop`,
        category: `recovery`,
        tags: [
            "Recovery",
            "Science",
            "Sleep"
        ],
        publishedDate: `2026-04-23`,
        readTime: `6 min read`,
        featured: false,
        order: 14,
        body: {
            "nodeType": "document",
            "data": {},
            "content": [
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Pushing hard without proper recovery is like sprinting on an empty tank. The brain, more than any other organ, requires specific conditions to restore neurochemical balance, repair connections, and prepare for another round of high performance.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-3",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Key Takeaways",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "True brain recovery involves neurotransmitter replenishment, neuroplastic repair, and stress-system reset.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Sleep, low-stimulation time, and targeted nutritional support are non-negotiable.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Without adequate recovery, focus, mood, and motivation gradually decline.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Gentle support for recovery pathways accelerates restoration and prevents burnout.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Flow supplements are designed to optimize the brain's natural recovery processes.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The Problem in Today's World",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Modern culture often glorifies constant hustle, leaving little room for genuine mental rest. The result is a slow accumulation of neurochemical debt—elevated cortisol, depleted dopamine sensitivity, and reduced neuroplastic capacity—that manifests as mental fatigue, emotional flatness, and diminished performance despite adequate physical rest.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The Science Explained",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "During recovery, the brain replenishes neurotransmitters, clears metabolic waste via the glymphatic system, consolidates learning through hippocampal replay, and downregulates the HPA axis. Quality sleep, especially deep and REM stages, is essential for these processes. Low-stimulation environments further allow the default mode network to integrate experiences without overload.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "When recovery is neglected, these systems remain strained, making future focus and resilience harder to access.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Evidence & Research Highlights",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Sleep neuroscience and recovery studies consistently show that adequate restorative periods lead to improved cognitive performance, emotional regulation, and neuroplasticity markers. Interventions combining sleep optimization with nutritional support for neurotransmitter synthesis and neuroprotection demonstrate faster and more complete recovery from mental fatigue.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Practical Path Forward",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Prioritize recovery as seriously as training: protect sleep windows, schedule intentional low-stimulation periods, and use gentle movement or nature time to support parasympathetic activation.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Nutritional allies can significantly enhance this process. L-theanine and saffron promote calm and mood recovery, TMG supports methylation and neurotransmitter replenishment, mangiferin aids cognitive resilience, and Lion's Mane stimulates NGF for neural repair. Flow's formulation is intentionally created to work with your brain's natural recovery rhythms—helping you wake up clearer, more motivated, and ready to perform at your best.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Conclusion: Reclaiming Your Potential",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The brain is incredibly resilient when given what it truly needs to recover. By respecting its need for rest, balance, and gentle support, you create the conditions for sustained high performance rather than repeated burnout. True recovery is not doing nothing—it is actively restoring the internal environment where flow and potential can flourish again and again.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Further Reading & Sources",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Walker, M. (2017). Why We Sleep.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Reviews on neurorecovery and neuroplasticity post-stress (2020–2025).",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Huberman Lab episodes on sleep, recovery, and dopamine regulation.",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    },
    {
        title: `Magnesium Glycinate and Sleep: The Most Underrated Recovery Tool`,
        slug: `magnesium-sleep`,
        excerpt: `Most people are deficient. Most supplements use the wrong form. We explain why Magnesium Glycinate is the form that actually crosses into the brain and supports deep rest.`,
        coverImageUrl: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=85&auto=format&fit=crop`,
        category: `science`,
        tags: [
            "Science",
            "Ingredients"
        ],
        publishedDate: `2026-01-30`,
        readTime: `6 min read`,
        featured: false,
        order: 7,
        body: {
            "nodeType": "document",
            "data": {},
            "content": [
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Magnesium is involved in over 300 enzymatic reactions in the human body. It is essential for energy production, protein synthesis, muscle function, and nervous system regulation. It is also the most common micronutrient deficiency in the developed world \u2014 estimated to affect up to 45% of the population.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Why most people are deficient",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Soil depletion over the past century has significantly reduced the magnesium content of most crops. Modern food processing strips it further. Alcohol, caffeine, and chronic stress all increase urinary magnesium excretion. And because magnesium deficiency presents subtly \u2014 as fatigue, poor sleep, muscle tension, anxiety, and difficulty concentrating \u2014 it's frequently missed or attributed to other causes.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "The sleep connection",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Magnesium regulates the GABA receptor system \u2014 the primary inhibitory neurotransmitter system in the brain. GABA is what allows the nervous system to slow down, reduce neural excitation, and transition into sleep. Without adequate magnesium, this transition is impaired.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Magnesium also regulates cortisol. Chronically elevated evening cortisol is one of the most common causes of sleep onset difficulty and non-restorative sleep. Magnesium suppresses the HPA axis activity responsible for cortisol production, creating a calmer neurological environment for sleep.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Why form matters: glycinate vs. oxide",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Not all magnesium supplements are equivalent. The most common form \u2014 magnesium oxide \u2014 has notoriously poor bioavailability (~4%). Most of it passes through the gut unabsorbed, which is why it's primarily used as a laxative.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Magnesium glycinate is a chelated form \u2014 magnesium bound to the amino acid glycine. This dramatically improves absorption (estimated at 80%+) and adds a second benefit: glycine itself has been shown in clinical trials to improve sleep quality and reduce daytime sleepiness through its own NMDA receptor modulating effects.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "What the research shows",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "unordered-list",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "A 2012 RCT in the Journal of Research in Medical Sciences found that magnesium supplementation significantly improved insomnia, sleep efficiency, and early morning awakening",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "A 2019 study found that glycine supplementation before bed improved subjective and objective sleep quality in adults with poor sleep",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "nodeType": "list-item",
                            "data": {},
                            "content": [
                                {
                                    "nodeType": "paragraph",
                                    "data": {},
                                    "content": [
                                        {
                                            "nodeType": "text",
                                            "value": "Multiple studies show magnesium's cortisol-suppressing effects in chronically stressed populations",
                                            "marks": [],
                                            "data": {}
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    "nodeType": "heading-2",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Dosing and timing",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Effective doses in sleep studies range from 200\u2013400mg of elemental magnesium taken 30\u201360 minutes before bed. When taking glycinate, note that the supplement will typically be labelled by its total weight \u2014 400mg of magnesium glycinate contains roughly 50mg of elemental magnesium. Read labels carefully.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                },
                {
                    "nodeType": "paragraph",
                    "data": {},
                    "content": [
                        {
                            "nodeType": "text",
                            "value": "Magnesium is not a sedative \u2014 it won't knock you out. What it does is create a more favourable neurological environment for natural sleep onset and deeper sleep architecture. Used consistently, the effects compound over weeks.",
                            "marks": [],
                            "data": {}
                        }
                    ]
                }
            ]
        }
    }
];
const comparisonRows = [
    {
        topic: [
            "Taste"
        ],
        feature: `Naturally flavoured with pomegranate — fresh, clean, and genuinely enjoyable to drink every morning.`,
        othersLabel: `Chalky capsules or artificial-tasting powders`,
        order: 1
    },
    {
        topic: [
            "Experience"
        ],
        feature: `One sachet dissolved in water. Everything you need in one go — no pills to count, no stack to manage.`,
        othersLabel: `Multiple products required`,
        order: 2
    },
    {
        topic: [
            "Transparency"
        ],
        feature: `Every ingredient and every dose is on the label. No proprietary blends. No hidden fillers.`,
        othersLabel: `Proprietary blends that hide individual doses`,
        order: 3
    },
    {
        topic: [
            "Science"
        ],
        feature: `Every active ingredient is backed by peer-reviewed human clinical trials at clinical doses.`,
        othersLabel: `Rarely cited, often underdosed`,
        order: 4
    },
    {
        topic: [
            "Quality"
        ],
        feature: `Formulated and manufactured in Switzerland. Third-party tested for purity and potency every batch.`,
        othersLabel: `Rarely disclosed`,
        order: 5
    }
];
const savingsSupplements = [
    {
        name: `Magnesium Citrate`,
        monthlyPriceCHF: 18.75,
        order: 1
    },
    {
        name: `Green Tea Extract`,
        monthlyPriceCHF: 17.03,
        order: 2
    },
    {
        name: `Lion's Mane Extract`,
        monthlyPriceCHF: 22.00,
        order: 3
    },
    {
        name: `Saffr'Activ (Saffron)`,
        monthlyPriceCHF: 31.05,
        order: 4
    },
    {
        name: `Ginseng Panax`,
        monthlyPriceCHF: 10.85,
        order: 5
    },
    {
        name: `Zynamite® (Mango leaf)`,
        monthlyPriceCHF: 24.00,
        order: 6
    },
    {
        name: `Betaine (TMG)`,
        monthlyPriceCHF: 11.75,
        order: 7
    },
    {
        name: `Vitamin B1 (Thiamine)`,
        monthlyPriceCHF: 1.60,
        order: 8
    },
    {
        name: `Vitamin B3 (Niacin)`,
        monthlyPriceCHF: 3.00,
        order: 9
    },
    {
        name: `Vitamin B6 (Pyridoxine)`,
        monthlyPriceCHF: 1.00,
        order: 10
    },
    {
        name: `Vitamin B12 (Methylcobalamin)`,
        monthlyPriceCHF: 4.00,
        order: 11
    },
    {
        name: `Zinc Sulphate`,
        monthlyPriceCHF: 5.00,
        order: 12
    },
    {
        name: `Base formula essentials`,
        monthlyPriceCHF: 18.00,
        order: 13
    }
];
const productHighlights = [
    {
        value: `16`,
        unit: `Active ingredients`,
        description: `Each chosen for clinical evidence, not marketing appeal.`,
        order: 1
    },
    {
        value: `0`,
        unit: `Proprietary blends`,
        description: `Every dose is disclosed. No hidden fillers or trace amounts.`,
        order: 2
    },
    {
        value: `30+`,
        unit: `Clinical studies`,
        description: `The evidence base behind our core ingredient stack.`,
        order: 3
    },
    {
        value: `Swiss`,
        unit: `GMP certified`,
        description: `Manufactured to pharmaceutical-grade standards in Switzerland.`,
        order: 4
    }
];
const takeFlowSteps = [
    {
        number: '01',
        title: 'Simple Daily Ritual',
        body: [
            'Pour one sachet into 400–500 ml of water',
            'Stir gently until fully dissolved',
            'Drink slowly and mindfully',
            'Repeat every day'
        ],
        image: '/zen-place-consume.png'
    },
    {
        number: '02',
        title: 'Your Morning Routine',
        body: 'Take Flow first thing in the morning. The early hours offer a clean slate with peak dopamine sensitivity and minimal distractions, delivering full calm energy and focus that lasts all day.',
        image: '/sunrise-consume.png'
    },
    {
        number: '03',
        title: 'Pair with Meaningful Moments',
        body: 'Link your Flow moment to an activity you enjoy and that helps you grow — journaling, a short walk, deep work or creative time. It becomes the emblem of your commitment to personal growth.',
        image: '/confident-girl-consume.png'
    }
];
const morningRitualCards = [
    {
        title: 'Win Your Morning, Win Your Day',
        description: 'The way you begin shapes everything that follows. A calm, intentional morning sets the tone for clarity, focus, and presence — because the first hour quietly determines the quality of the entire day.'
    },
    {
        title: 'What Goes Up Must Come Down',
        description: 'Artificial spikes always crash. Flow rejects the rollercoaster of stimulants and supports the natural, sustainable rhythm your body and mind were designed for.'
    },
    {
        title: 'Do It Light, Do It Right',
        description: 'Gentle consistency beats forceful effort. When you approach your day and your rituals with lightness, you create space for real flow — because sustainable excellence is born from ease, not force.'
    },
    {
        title: 'Energy Can Only Be Transferred',
        description: 'You cannot create more energy — you can only move it wisely. Flow helps you transfer energy from stress and distraction into calm focus, creativity, and presence instead of letting it leak away.'
    },
    {
        title: 'Work in the Shadows',
        description: 'The most important growth happens quietly, unseen. Real progress is made in private rituals and inner work, not in the spotlight. Flow honours the silent, steady effort that truly transforms you.'
    },
    {
        title: 'The Journey Is the Dream',
        description: 'The destination is never the point — the daily practice is. Every mindful morning with Flow is already the life you\'re building: presence, growth, and fulfillment are found in the process itself.'
    },
    {
        title: 'Read Your Own Story',
        description: 'Stop scrolling someone else\'s highlight reel. Your attention is sacred. Flow reminds you to stay inside your own life, writing your story with intention instead of comparing it to others.'
    },
    {
        title: 'Focus Is Transcendence',
        description: 'Deep focus is more than productivity — it is a state of being. When the mind becomes still and fully present, you rise above noise, ego, and distraction into something clearer, freer, and more alive.'
    }
];
const servicePillars = [
    {
        title: 'Shipment Delay',
        lines: [
            'Switzerland — 2 to 3 business days',
            'Outside Switzerland — 5 to 9 business days'
        ]
    },
    {
        title: 'Delivery Cost',
        lines: [
            'Monthly subscribers in Switzerland — free',
            'Single purchase in Switzerland — CHF 7',
            'Outside Switzerland — calculated at checkout'
        ]
    },
    {
        title: 'Flexible Subscription',
        lines: [
            'Subscription — cancel anytime after your second month'
        ]
    }
];
const faqCategories = {
    product: 'Product & Formula',
    usage: 'Usage & Dosage',
    shipping: 'Shipping & Orders',
    returns: 'Returns & Refunds',
    safety: 'Safety & Health'
};
}),
"[project]/src/lib/sheets.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getSheetsComparisonRows",
    ()=>getSheetsComparisonRows,
    "getSheetsFaqItems",
    ()=>getSheetsFaqItems,
    "getSheetsHealthBenefits",
    ()=>getSheetsHealthBenefits,
    "getSheetsIngredients",
    ()=>getSheetsIngredients,
    "getSheetsProductHighlights",
    ()=>getSheetsProductHighlights,
    "getSheetsProductMeta",
    ()=>getSheetsProductMeta,
    "getSheetsResultsTimeline",
    ()=>getSheetsResultsTimeline,
    "getSheetsSavingsSupplements",
    ()=>getSheetsSavingsSupplements,
    "getSheetsTestimonials",
    ()=>getSheetsTestimonials
]);
// ─── Google Sheets integration ───────────────────────────────────────────────
// Fetches content from the Flow Google Sheet.
// When GOOGLE_SHEETS_API_KEY is not set, every function returns null and
// content.ts falls back to the static content-data.ts arrays automatically.
//
// Sheet ID:  process.env.GOOGLE_SHEET_ID
// Re-fetches every 60 seconds. Changes in the Sheet appear within 1 minute.
const SHEET_ID = process.env.GOOGLE_SHEET_ID;
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY;
const REVALIDATE = 60; // seconds
async function fetchTab(tab) {
    if (!SHEET_ID || !API_KEY) return [];
    try {
        const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(tab)}?key=${API_KEY}`;
        const res = await fetch(url, {
            next: {
                revalidate: REVALIDATE
            }
        });
        if (!res.ok) return [];
        const json = await res.json();
        if (!json.values || json.values.length < 2) return [];
        const [headers, ...rows] = json.values;
        return rows.filter((row)=>row.some((c)=>c?.trim())).map((row)=>Object.fromEntries(headers.map((h, i)=>[
                    h.trim(),
                    (row[i] ?? '').trim()
                ])));
    } catch  {
        return [];
    }
}
async function getSheetsIngredients() {
    const rows = await fetchTab('Ingredients');
    if (!rows.length) return null;
    return rows.map((r, i)=>{
        const doseMg = r['dose mg'];
        return {
            name: r.name,
            form: '',
            dose: doseMg ? `${doseMg} mg` : '',
            category: r.category,
            description: r.benefit,
            science: r.science,
            imageUrl: r.image,
            imageAlt: r.imageAlt || r.name,
            order: i + 1,
            active: r['Active ingredient'] === '1' || r['Active ingredient'] === 'true' || r['Active ingredient'] === 'TRUE' || r['Active'] === '1' || r['Active'] === 'true' || r['Active'] === 'TRUE' || r['active'] === '1' || r['active'] === 'true' || r['active'] === 'TRUE'
        };
    });
}
async function getSheetsSavingsSupplements() {
    const rows = await fetchTab('Savings breakdown');
    if (!rows.length) return null;
    return rows.filter((r)=>r.supplement?.trim() && Number(r.monthly_price_CHF) > 0).map((r, i)=>({
            name: r.supplement,
            monthlyPriceCHF: Number(r.monthly_price_CHF),
            order: i + 1
        }));
}
async function getSheetsHealthBenefits() {
    const rows = await fetchTab('health_benefits');
    if (!rows.length) return null;
    return rows.map((r, i)=>({
            number: r.number,
            label: r.label,
            title: r.label,
            ingredients: r.key_ingredients,
            description: r.description,
            imageUrl: r.image ?? '',
            imageAlt: r.imageAlt || r.label,
            order: i + 1
        }));
}
async function getSheetsResultsTimeline() {
    const rows = await fetchTab('Results Timeline');
    if (!rows.length) return null;
    return rows.map((r, i)=>({
            period: r.period,
            title: r.title,
            bullets: [
                r.bullet_1,
                r.bullet_2,
                r.bullet_3,
                r.bullet_4
            ].filter(Boolean).join('\n'),
            order: i + 1
        }));
}
async function getSheetsComparisonRows() {
    const rows = await fetchTab('Comparison table');
    if (!rows.length) return null;
    return rows.map((r, i)=>({
            topic: [
                r.feature
            ],
            feature: r.flow,
            othersLabel: r.others,
            order: i + 1
        }));
}
async function getSheetsProductHighlights() {
    return null;
}
async function getSheetsFaqItems() {
    return null;
}
async function getSheetsTestimonials() {
    return null;
}
async function getSheetsProductMeta() {
    const rows = await fetchTab('Meta');
    if (!rows.length) return null;
    return Object.fromEntries(rows.filter((r)=>r.field && r.value).map((r)=>[
            r.field,
            r.value
        ]));
}
}),
"[project]/src/lib/product-meta.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// ─── Single source of truth for all product meta values ─────────────────────
// Edit here → changes propagate across every page and component that imports.
// Values mirror the 0_product_meta.csv Google Sheet tab.
__turbopack_context__.s([
    "PRODUCT_META",
    ()=>PRODUCT_META
]);
const PRODUCT_META = {
    // Pricing
    priceSingleCHF: 58.50,
    priceSubscriptionCHF: null,
    subscriptionDiscountPercent: null,
    servingsPerBox: 30,
    get pricePerServingSingleCHF () {
        return Math.round(this.priceSingleCHF / this.servingsPerBox * 100) / 100;
    },
    // Formula
    activeIngredients: 16,
    totalIngredients: 18,
    totalFormulaWeightG: 6.36,
    caloriesKcal: 5,
    // Nutrition (per serving)
    nutrition: {
        fatG: 0,
        carbsG: 0,
        sugarsG: 0,
        proteinG: 0,
        saltMg: 50
    },
    // Product details
    format: 'Ready-to-drink powder sachet',
    servingInstruction: '1 sachet in 400–500 ml water',
    servingWaterMl: '400–500 ml',
    origin: 'Switzerland',
    certification: 'Swiss GMP',
    // Shipping & returns
    freeShippingThresholdCHF: 50,
    deliveryDays: 2,
    dispatchCutoffHour: '4pm',
    returnDays: 30
};
}),
"[project]/src/lib/content.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getBlogPost",
    ()=>getBlogPost,
    "getBlogPosts",
    ()=>getBlogPosts,
    "getCompanyValues",
    ()=>getCompanyValues,
    "getComparisonRows",
    ()=>getComparisonRows,
    "getFaqItems",
    ()=>getFaqItems,
    "getFeaturedIngredients",
    ()=>getFeaturedIngredients,
    "getHealthBenefits",
    ()=>getHealthBenefits,
    "getHomepageContent",
    ()=>getHomepageContent,
    "getHomepageFeatureCards",
    ()=>getHomepageFeatureCards,
    "getIngredients",
    ()=>getIngredients,
    "getMilestones",
    ()=>getMilestones,
    "getPhilosophyBeliefs",
    ()=>getPhilosophyBeliefs,
    "getPhilosophyPrinciples",
    ()=>getPhilosophyPrinciples,
    "getProductHighlights",
    ()=>getProductHighlights,
    "getProductMeta",
    ()=>getProductMeta,
    "getResultsTimelineSteps",
    ()=>getResultsTimelineSteps,
    "getSavingsSupplements",
    ()=>getSavingsSupplements,
    "getTeamMembers",
    ()=>getTeamMembers,
    "getTestimonials",
    ()=>getTestimonials
]);
// ─── Content layer ────────────────────────────────────────────────────────────
// Priority: Google Sheets → static content-data.ts fallback
// To activate Google Sheets: set GOOGLE_SHEETS_API_KEY in .env.local
// All function signatures are unchanged — no pages need updating.
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/content-data.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sheets$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/sheets.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$meta$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/product-meta.ts [app-rsc] (ecmascript)");
;
;
;
async function getPhilosophyPrinciples() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["philosophyPrinciples"];
}
async function getPhilosophyBeliefs() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["philosophyBeliefs"];
}
async function getTeamMembers() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["teamMembers"];
}
async function getCompanyValues() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["companyValues"];
}
async function getMilestones() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["milestones"];
}
async function getHomepageContent() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["homepageContent"];
}
async function getHomepageFeatureCards() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["homepageFeatureCards"];
}
// ─── Sheets → content-data fallback ──────────────────────────────────────────
const INGREDIENT_IMAGES = {
    'zynamite': '/ingredients/mangifera.png',
    'mango leaf': '/ingredients/mangifera.png',
    'mangifera': '/ingredients/mangifera.png',
    'green tea': '/ingredients/green-tea.png',
    "lion's mane": '/ingredients/lions-mane.png',
    'lions mane': '/ingredients/lions-mane.png',
    'ginseng': '/ingredients/ginseng-panax.png',
    "saffr'active": '/ingredients/saffran.png',
    'saffron': '/ingredients/saffran.png',
    'hibiscus': '/ingredients/hibiscus.png',
    'rooibos': '/ingredients/rooibos.png',
    'inulin': '/ingredients/inulin.png',
    'betaine': '/ingredients/tmg.png',
    'trimethylglycine': '/ingredients/tmg.png',
    'tmg': '/ingredients/tmg.png',
    'magnesium': '/ingredients/magnesium.png',
    'sodium citrate': '/ingredients/sodium-citrate.png',
    'zinc': '/ingredients/zinc.png',
    'vitamin b': '/ingredients/vitamin-b.png',
    'b-vitamin': '/ingredients/vitamin-b.png',
    'pomegranate': '/ingredients/pomegranate.png'
};
function resolveIngredientImage(name, imageUrl) {
    const trimmed = imageUrl?.trim();
    if (trimmed && (trimmed.startsWith('http') || trimmed.startsWith('/'))) return trimmed;
    const key = name.toLowerCase();
    for (const [pattern, path] of Object.entries(INGREDIENT_IMAGES)){
        if (key.includes(pattern)) return path;
    }
    return '';
}
async function getIngredients() {
    const sheetsData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sheets$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSheetsIngredients"])();
    if (!sheetsData) return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ingredients"];
    return sheetsData.map((ing)=>({
            ...ing,
            imageUrl: resolveIngredientImage(ing.name, ing.imageUrl)
        }));
}
async function getSavingsSupplements() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["savingsSupplements"];
}
async function getHealthBenefits() {
    const sheetsData = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sheets$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSheetsHealthBenefits"])();
    if (!sheetsData) return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["healthBenefits"];
    // Merge: if Sheets row has no image, fall back to the local image for that benefit
    return sheetsData.filter((row)=>row.label?.trim()).map((row)=>{
        const fallback = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["healthBenefits"].find((h)=>h.label === row.label);
        return {
            ...row,
            imageUrl: row.imageUrl || fallback?.imageUrl || '',
            description: row.description || fallback?.description || ''
        };
    });
}
async function getResultsTimelineSteps() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sheets$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSheetsResultsTimeline"])() ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["resultsTimelineSteps"];
}
async function getComparisonRows() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sheets$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSheetsComparisonRows"])() ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["comparisonRows"];
}
async function getProductHighlights() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sheets$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSheetsProductHighlights"])() ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["productHighlights"];
}
async function getFaqItems() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sheets$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSheetsFaqItems"])() ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["faqItems"];
}
async function getTestimonials() {
    return await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sheets$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSheetsTestimonials"])() ?? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["testimonials"];
}
async function getFeaturedIngredients() {
    return [
        {
            name: 'Zynamite®',
            imageUrl: '/ingredients/mangifera.png',
            homepageOrder: 1,
            benefit: 'Jitter-free sustained focus.',
            blogSlug: 'zynamite-focus'
        },
        {
            name: "Saffr'Active®",
            imageUrl: '/ingredients/saffran.png',
            homepageOrder: 2,
            benefit: 'Balanced mood and clarity.',
            blogSlug: 'saffron-mood-clarity'
        },
        {
            name: 'TMG',
            imageUrl: '/ingredients/tmg.png',
            homepageOrder: 3,
            benefit: 'Augmented brain and cellular energy.',
            blogSlug: 'tmg-brain-energy'
        },
        {
            name: "Lion's Mane",
            imageUrl: '/ingredients/lions-mane.png',
            homepageOrder: 4,
            benefit: 'Neuroprotection and gut-brain support.',
            blogSlug: 'lions-mane-brain'
        }
    ];
}
async function getProductMeta() {
    const raw = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$sheets$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getSheetsProductMeta"])();
    const priceSingleCHF = raw?.price_single_CHF ? parseFloat(raw.price_single_CHF) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$meta$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCT_META"].priceSingleCHF;
    const priceSubscriptionCHF = raw?.price_subscription_CHF ? parseFloat(raw.price_subscription_CHF) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$meta$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCT_META"].priceSubscriptionCHF ?? priceSingleCHF;
    const servingsPerBox = raw?.servings_per_box ? parseInt(raw.servings_per_box) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$meta$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCT_META"].servingsPerBox;
    return {
        priceSingleCHF,
        priceSubscriptionCHF,
        servingsPerBox,
        pricePerServingSingleCHF: Math.round(priceSingleCHF / servingsPerBox * 100) / 100,
        activeIngredients: raw?.active_ingredients ? parseInt(raw.active_ingredients) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$meta$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCT_META"].activeIngredients,
        caloriesKcal: raw?.calories_kcal ? parseFloat(raw.calories_kcal) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$meta$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCT_META"].caloriesKcal,
        totalFormulaWeightG: raw?.total_formula_weight_g ? parseFloat(raw.total_formula_weight_g) : __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$meta$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCT_META"].totalFormulaWeightG,
        returnDays: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$meta$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCT_META"].returnDays,
        freeShippingThresholdCHF: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$product$2d$meta$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["PRODUCT_META"].freeShippingThresholdCHF
    };
}
async function getBlogPosts() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"];
}
async function getBlogPost(slug) {
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2d$data$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["blogPosts"].find((p)=>p.slug === slug) ?? null;
}
}),
"[project]/src/app/components/VennCard.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/components/VennCard.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/components/VennCard.tsx <module evaluation>", "default");
}),
"[project]/src/app/components/VennCard.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/components/VennCard.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/components/VennCard.tsx", "default");
}),
"[project]/src/app/components/VennCard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$VennCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/components/VennCard.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$VennCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/components/VennCard.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$VennCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/pages/our-philosophy/PhilosophyScroll.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/pages/our-philosophy/PhilosophyScroll.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/pages/our-philosophy/PhilosophyScroll.tsx <module evaluation>", "default");
}),
"[project]/src/app/pages/our-philosophy/PhilosophyScroll.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/pages/our-philosophy/PhilosophyScroll.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/pages/our-philosophy/PhilosophyScroll.tsx", "default");
}),
"[project]/src/app/pages/our-philosophy/PhilosophyScroll.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$our$2d$philosophy$2f$PhilosophyScroll$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/pages/our-philosophy/PhilosophyScroll.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$our$2d$philosophy$2f$PhilosophyScroll$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/pages/our-philosophy/PhilosophyScroll.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$our$2d$philosophy$2f$PhilosophyScroll$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/pages/our-philosophy/PrinciplesAccordion.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/pages/our-philosophy/PrinciplesAccordion.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/pages/our-philosophy/PrinciplesAccordion.tsx <module evaluation>", "default");
}),
"[project]/src/app/pages/our-philosophy/PrinciplesAccordion.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/pages/our-philosophy/PrinciplesAccordion.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/pages/our-philosophy/PrinciplesAccordion.tsx", "default");
}),
"[project]/src/app/pages/our-philosophy/PrinciplesAccordion.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$our$2d$philosophy$2f$PrinciplesAccordion$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/pages/our-philosophy/PrinciplesAccordion.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$our$2d$philosophy$2f$PrinciplesAccordion$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/pages/our-philosophy/PrinciplesAccordion.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$our$2d$philosophy$2f$PrinciplesAccordion$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/components/MorningRitualCard.tsx [app-rsc] (client reference proxy) <module evaluation>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/components/MorningRitualCard.tsx <module evaluation> from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/components/MorningRitualCard.tsx <module evaluation>", "default");
}),
"[project]/src/app/components/MorningRitualCard.tsx [app-rsc] (client reference proxy)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// This file is generated by next-core EcmascriptClientReferenceModule.
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)");
;
const __TURBOPACK__default__export__ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$server$2d$dom$2d$turbopack$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerClientReference"])(function() {
    throw new Error("Attempted to call the default export of [project]/src/app/components/MorningRitualCard.tsx from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.");
}, "[project]/src/app/components/MorningRitualCard.tsx", "default");
}),
"[project]/src/app/components/MorningRitualCard.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$MorningRitualCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/src/app/components/MorningRitualCard.tsx [app-rsc] (client reference proxy) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$MorningRitualCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__ = __turbopack_context__.i("[project]/src/app/components/MorningRitualCard.tsx [app-rsc] (client reference proxy)");
;
__turbopack_context__.n(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$MorningRitualCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$client__reference__proxy$29$__);
}),
"[project]/src/app/pages/our-philosophy/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OurPhilosophyPage,
    "metadata",
    ()=>metadata
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/content.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$VennCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/VennCard.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$our$2d$philosophy$2f$PhilosophyScroll$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/pages/our-philosophy/PhilosophyScroll.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$our$2d$philosophy$2f$PrinciplesAccordion$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/pages/our-philosophy/PrinciplesAccordion.tsx [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$MorningRitualCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/components/MorningRitualCard.tsx [app-rsc] (ecmascript)");
;
;
;
const metadata = {
    title: 'Our Philosophy',
    description: 'Flow is built on one belief: cognitive performance should be earned through science, not marketing. Read the principles that guide every formulation decision we make.',
    openGraph: {
        title: 'Our Philosophy — The Principles Behind Flow',
        description: 'Flow is built on one belief: cognitive performance should be earned through science, not marketing. Read the principles that guide every formulation decision we make.'
    }
};
;
;
;
async function OurPhilosophyPage() {
    const [principles, beliefs, cms, meta] = await Promise.all([
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPhilosophyPrinciples"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getPhilosophyBeliefs"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getHomepageContent"])(),
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$content$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProductMeta"])()
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-white pt-28 md:pt-36 pb-14 md:pb-20",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-[1200px] mx-auto px-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-xs tracking-[0.16em] uppercase text-[#1E1854]/40 font-medium mb-5",
                            children: "About Flow"
                        }, void 0, false, {
                            fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                            lineNumber: 25,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-4xl sm:text-5xl md:text-6xl font-semibold tracking-[-0.03em] text-[#1E1854] leading-tight max-w-3xl mb-6",
                            children: "Built for minds that refuse to settle."
                        }, void 0, false, {
                            fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm text-[rgba(30,24,84,0.65)] max-w-lg leading-relaxed",
                            children: "Flow started with a personal frustration — scattered focus, overstimulation, and a supplement market full of noise. We decided to build something better."
                        }, void 0, false, {
                            fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                            lineNumber: 29,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                lineNumber: 23,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$our$2d$philosophy$2f$PhilosophyScroll$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                lineNumber: 36,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "py-16 md:py-20 border-t border-[#1E1854]/[0.06]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-[1200px] mx-auto px-6",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$VennCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        vennBackgroundImageUrl: cms.vennBackgroundImageUrl,
                        vennHeading: cms.vennHeading,
                        activeIngredients: meta.activeIngredients
                    }, void 0, false, {
                        fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                        lineNumber: 41,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                lineNumber: 39,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-white border-t border-[#1E1854]/[0.06]",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-[1200px] mx-auto px-6 py-16 md:py-24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$components$2f$MorningRitualCard$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                                fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                                lineNumber: 53,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent",
                                        children: "Values we hold dear"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                                        lineNumber: 55,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl md:text-4xl font-semibold tracking-[-0.03em] leading-tight text-[#1E1854]",
                                        children: "Flow is human led and science based."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                                        lineNumber: 56,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                                lineNumber: 54,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                        lineNumber: 52,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                    lineNumber: 51,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                lineNumber: 50,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-[1200px] mx-auto px-6 py-16 md:py-24",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-10 md:gap-16 items-start",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "space-y-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent",
                                        children: "What We Believe"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                                        lineNumber: 69,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight",
                                        children: [
                                            "Conviction,",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                                                lineNumber: 71,
                                                columnNumber: 28
                                            }, this),
                                            "not aspiration."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                                        lineNumber: 70,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                                lineNumber: 68,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-2 gap-2",
                                children: beliefs.filter((_, i)=>i !== 3).map((b, i)=>{
                                    const normalized = b.text.replace(/ — /g, '. ').replace(/^(.)/, (c)=>c.toUpperCase());
                                    const firstPeriodIdx = normalized.indexOf('. ');
                                    const firstSentence = firstPeriodIdx > -1 ? normalized.slice(0, firstPeriodIdx + 1) : normalized;
                                    const rest = firstPeriodIdx > -1 ? normalized.slice(firstPeriodIdx + 2) : '';
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "group rounded-xl border border-[#1E1854]/[0.07] bg-white shadow-sm shadow-[#1E1854]/[0.04] hover:shadow-md hover:shadow-[#1E1854]/[0.07] hover:-translate-y-0.5 transition-all duration-500 p-4 flex items-start gap-3",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "shrink-0 mt-0.5 w-9 h-9 rounded-full bg-gradient-to-br from-[#1E1854] to-[#2d2a7a] flex items-center justify-center text-xs font-semibold text-white/60 tabular-nums",
                                                children: String(i + 1).padStart(2, '0')
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                                                lineNumber: 82,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "pt-0.5",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent leading-snug",
                                                        children: firstSentence
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                                                        lineNumber: 86,
                                                        columnNumber: 23
                                                    }, this),
                                                    rest && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "mt-1.5 text-xs text-[rgba(30,24,84,0.60)] leading-relaxed",
                                                        children: rest
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                                                        lineNumber: 87,
                                                        columnNumber: 32
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                                                lineNumber: 85,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, b.text.slice(0, 40), true, {
                                        fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                                        lineNumber: 81,
                                        columnNumber: 19
                                    }, this);
                                })
                            }, void 0, false, {
                                fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                                lineNumber: 74,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                    lineNumber: 66,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                lineNumber: 65,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-[1200px] mx-auto px-6 py-16 md:py-24",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-12 space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent",
                                    children: "Non-Negotiables"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                                    lineNumber: 101,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    className: "text-3xl md:text-4xl font-semibold tracking-[-0.02em]",
                                    children: "Our six principles."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                                    lineNumber: 102,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                            lineNumber: 100,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$pages$2f$our$2d$philosophy$2f$PrinciplesAccordion$2e$tsx__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                            principles: principles
                        }, void 0, false, {
                            fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                            lineNumber: 104,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                    lineNumber: 99,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
                lineNumber: 98,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/pages/our-philosophy/page.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/app/pages/our-philosophy/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/pages/our-philosophy/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__02z68ng._.js.map