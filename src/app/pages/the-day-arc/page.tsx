import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'How the Morning Sets the Tone for the Rest of the Day',
  description: 'Cognitive readiness is not fixed — it follows a natural rhythm shaped by sleep, light, and neurochemistry. Understanding that rhythm is the first step to working with it.',
  openGraph: {
    title: 'How the Morning Sets the Tone for the Rest of the Day',
    description: 'Cognitive readiness is not fixed — it follows a natural rhythm shaped by sleep, light, and neurochemistry. Understanding that rhythm is the first step to working with it.',
  },
};

export default function TheDayArcPage() {
  return (
    <main className="bg-white">

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 border-b border-ink/[0.06]">
        <div className="max-w-[760px] mx-auto px-6">
          <p className="text-xs tracking-[0.16em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent mb-5">The Science</p>
          <h1 className="text-4xl sm:text-5xl md:text-[3.5rem] font-semibold tracking-[-0.03em] text-ink leading-tight mb-6">
            How the morning sets the tone for the rest of the day.
          </h1>
          <p className="text-base text-[rgba(30,24,84,0.65)] leading-relaxed max-w-xl">
            Cognitive readiness is not a fixed state — it moves. Understanding how it naturally evolves across a day is the foundation for doing anything meaningful about it.
          </p>
        </div>
      </section>

      {/* Article body */}
      <article className="py-16 md:py-24">
        <div className="max-w-[760px] mx-auto px-6 space-y-14 text-sm text-[rgba(30,24,84,0.80)] leading-[1.85]">

          {/* Section 1 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ink tracking-[-0.02em]">Your brain has a rhythm before you make any decisions</h2>
            <p>
              The quality of your thinking at 3pm is largely determined by what happened between 6 and 10am — not just what you did, but what your brain did on its own. In the hours after waking, a cascade of neurochemical shifts unfolds automatically: cortisol peaks to mobilise alertness, body temperature rises, and the adenosine accumulated overnight is fully cleared by sleep. These are not responses to what you ate or whether you exercised. They are biological defaults, shaped by millions of years of adaptation to the rhythm of light and darkness.
            </p>
            <p>
              This window — roughly the first two to three hours after waking — is when the brain is naturally primed for its highest cognitive output. Focus is sharp, working memory is at capacity, and the prefrontal cortex is most receptive to complex thinking. The morning is not just a convenient time to work; it is when your brain is neurochemically prepared for it.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ink tracking-[-0.02em]">How readiness naturally evolves through the day</h2>
            <p>
              As the morning progresses, adenosine — a byproduct of neural activity — begins to accumulate again. This is not a flaw. It is the brain&apos;s built-in pressure valve, gradually reducing the cost of sustained focus and nudging the system toward eventual rest. By early afternoon, most people experience a natural dip: a softening of attention, a slight drop in motivation, a pull toward lower-demand tasks. This is physiologically normal, cross-cultural, and present even in people who have never touched caffeine.
            </p>
            <p>
              The late afternoon typically brings a secondary recovery — a modest rebound in alertness as body temperature reaches its daily peak — before the system begins its gradual wind-down toward sleep. Cortisol tapers. Melatonin begins to rise. The brain shifts from executive function toward consolidation and repair.
            </p>
            <p>
              This arc — peak, dip, partial recovery, decline — is the natural shape of a cognitive day. Most people never experience it cleanly, because they intervene in it before it has a chance to unfold.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ink tracking-[-0.02em]">Where stimulation disrupts the baseline</h2>
            <p>
              The most common intervention is caffeine, consumed within minutes of waking — precisely when the brain&apos;s own cortisol and adenosine-clearing mechanisms are already doing their job. Caffeine works by occupying adenosine receptors, masking the signal of fatigue without resolving it. Adenosine continues to accumulate behind the blockade. When caffeine eventually clears, those receptors are flooded all at once, producing a crash that lands below the natural baseline rather than at it.
            </p>
            <p>
              The compounding effect is what matters most. Each cycle of artificial stimulation and subsequent crash makes the next morning&apos;s baseline slightly lower. Sleep quality degrades — caffeine consumed even six hours before bed measurably reduces slow-wave sleep, the phase most critical for cognitive restoration. Over time, people are not managing their energy; they are managing their withdrawal.
            </p>
            <div className="rounded-xl border border-ink/[0.07] bg-ink/[0.025] p-5 space-y-1.5">
              <p className="text-xs uppercase tracking-[0.12em] font-semibold text-brand">The compounding effect</p>
              <p>Disrupted morning rhythm → masked fatigue signal → deeper afternoon crash → second dose → degraded sleep → lower baseline the next morning. The cycle repeats, each iteration starting from a slightly worse position.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ink tracking-[-0.02em]">Aligned support, not override</h2>
            <p>
              Flow is built around a different premise: that the goal is not to override the brain&apos;s natural rhythm, but to support it — and in doing so, raise the ceiling of what that rhythm makes possible.
            </p>
            <p>
              Rather than blocking adenosine receptors, Flow&apos;s formulation works with the brain&apos;s existing chemistry. <strong className="font-semibold text-ink">Zynamite®</strong> preserves catecholamine availability — sustaining the alertness and motivation that naturally peak in the morning — without creating the adenosine debt that drives afternoon crashes. <strong className="font-semibold text-ink">Panax Ginseng</strong> supports the HPA axis, moderating cortisol dysregulation so the natural dip feels manageable rather than debilitating. <strong className="font-semibold text-ink">Saffr'Active®</strong> supports serotonin pathways, stabilising mood and reducing the sense of cognitive friction that makes tasks feel harder than they are.
            </p>
            <p>
              The evening side of the arc receives equal attention. <strong className="font-semibold text-ink">Rooibos</strong> helps clear the cortisol load that accumulates across a demanding day. <strong className="font-semibold text-ink">Magnesium</strong> supports the deep sleep stages where adenosine is cleared and cognitive capacity is rebuilt. <strong className="font-semibold text-ink">Lion&apos;s Mane</strong> operates on a longer timescale — supporting the structural integrity of the neural pathways that make consistent high performance possible over months and years, not just hours.
            </p>
            <p>
              The result is not a stronger peak. It is a more reliable arc — one that starts from a restored baseline, maintains more of its natural momentum through the day, and ends in a way that sets tomorrow up rather than compromising it.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-ink tracking-[-0.02em]">What this looks like in practice</h2>
            <p>
              The most common shift people notice is not a surge — it is an absence. The 2pm wall becomes a 2pm dip, manageable rather than disabling. Tasks that would have been deferred until the next morning get completed with adequate quality. Decisions made in the afternoon carry the same clarity as decisions made at 10am.
            </p>
            <p>
              That consistency is the point. A brain that moves through the day without borrowing against tomorrow is a brain that compounds — where each good day makes the next one easier, and the arc gradually rises rather than gradually eroding.
            </p>
          </section>

          {/* CTA back */}
          <div className="pt-6 border-t border-ink/[0.06]">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs tracking-[0.1em] uppercase font-semibold bg-gradient-to-r from-brand to-ink bg-clip-text text-transparent hover:opacity-70 transition-opacity"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0 text-brand">
                <path d="M9 11L5 7l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Back to Flow
            </Link>
          </div>

        </div>
      </article>

    </main>
  );
}
