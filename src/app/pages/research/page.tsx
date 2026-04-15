export default function ResearchPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 pt-20 pb-14 md:pb-24 space-y-12 md:space-y-16">

      <div className="space-y-3">
        <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">Science-backed</p>
        <h1 className="text-4xl font-semibold tracking-[-0.02em]">Research</h1>
        <p className="text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent leading-relaxed max-w-xl">
          Every claim we make is backed by peer-reviewed clinical evidence. Below is the research foundation behind Flow&apos;s formula and delivery technology.
        </p>
      </div>

      {/* Delivery Technology */}
      <div className="space-y-6">
        <div className="border-b border-[var(--color-border)] pb-4 space-y-1">
          <h2 className="text-xl font-semibold tracking-[-0.01em]">Liquid Delivery Technology</h2>
          <p className="text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent leading-relaxed">
            Why a drink outperforms capsules and powders on bioavailability and onset speed.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--color-border)]">
          {[
            { stat: '~95%', label: 'Absorption rate', detail: 'Liquid supplements achieve near-complete absorption vs. 40–60% for standard capsules.' },
            { stat: '15 min', label: 'Onset time', detail: 'Active ingredients enter the bloodstream within 15–30 minutes, vs. 45–90 minutes for solid forms.' },
            { stat: '8 actives', label: 'In one bottle', detail: 'A single 400ml bottle delivers a clinically dosed stack — no need to take multiple supplements.' },
          ].map((item) => (
            <div key={item.label} className="bg-[#1E185408] p-6 space-y-2">
              <p className="text-2xl font-semibold tracking-[-0.02em]">{item.stat}</p>
              <p className="text-xs tracking-[0.1em] uppercase font-semibold font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent">{item.label}</p>
              <p className="text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent leading-relaxed">{item.detail}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Key Studies */}
      <div className="space-y-6">
        <div className="border-b border-[var(--color-border)] pb-4">
          <h2 className="text-xl font-semibold tracking-[-0.01em]">Key Clinical Studies</h2>
        </div>
        <div className="space-y-px bg-[var(--color-border)]">
          {[
            {
              ingredient: 'Ashwagandha (KSM-66®)',
              finding: 'A double-blind, randomised controlled trial (Chandrasekhar et al., 2012) found 300mg KSM-66 twice daily reduced cortisol by 27.9% and significantly improved scores on stress and anxiety scales after 60 days.',
              journal: 'Indian Journal of Psychological Medicine, 2012',
            },
            {
              ingredient: 'L-Theanine + Caffeine',
              finding: 'Owen et al. (2008) demonstrated that 100mg L-theanine combined with 50mg caffeine significantly improved speed and accuracy of attention-switching tasks and reduced susceptibility to distracting information.',
              journal: 'Nutritional Neuroscience, 2008',
            },
            {
              ingredient: "Lion's Mane Mushroom",
              finding: 'Mori et al. (2009) showed that 1000mg/day of H. erinaceus for 16 weeks significantly improved cognitive function scores in mild cognitive impairment patients vs. placebo (p < 0.05).',
              journal: 'Phytotherapy Research, 2009',
            },
            {
              ingredient: 'Bacopa Monnieri',
              finding: 'Roodenrys et al. (2002) found 300mg/day for 12 weeks significantly improved delayed word recall and reduced the rate of forgetting newly acquired information.',
              journal: 'Neuropsychopharmacology, 2002',
            },
            {
              ingredient: 'Rhodiola Rosea',
              finding: 'Shevtsov et al. (2003) demonstrated that a single dose of Rhodiola extract significantly improved capacity for mental work against a background of fatigue and stress in a randomised, double-blind, cross-over trial.',
              journal: 'Phytomedicine, 2003',
            },
            {
              ingredient: 'Magnesium Bisglycinate',
              finding: 'Walker et al. (2002) confirmed that magnesium glycinate has substantially higher bioavailability than magnesium oxide, with significantly greater tissue retention after 60 days of supplementation.',
              journal: 'Journal of the American College of Nutrition, 2002',
            },
          ].map((study) => (
            <div key={study.ingredient} className="bg-[#1E185408] p-6 space-y-2">
              <p className="text-base font-semibold tracking-[-0.01em]">{study.ingredient}</p>
              <p className="text-sm font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent leading-relaxed">{study.finding}</p>
              <p className="text-xs text-[hsla(var(--color-secondary)/0.6)] italic">{study.journal}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-[var(--color-border)] pt-8">
        <p className="text-xs font-semibold bg-gradient-to-r from-[#3B38B8] to-[#1E1854] bg-clip-text text-transparent leading-relaxed">
          The studies cited above are published peer-reviewed research on the individual ingredients used in Flow at their respective doses. These statements have not been evaluated by Swissmedic, the EMA, or the FDA. Flow is a food supplement, not a medicine, and is not intended to diagnose, treat, cure, or prevent any disease.
        </p>
      </div>

    </main>
  );
}
