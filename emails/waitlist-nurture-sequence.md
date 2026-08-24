# Waitlist nurture sequence — draft v1

Grounded in `KORR_Brand_Bible_v5` (Drive) and `PRODUCT_DATA.md` (this repo).
Voice pillars applied: conversational & personal, warm & non-judgmental,
informative & specific, aspirational & realistic. No bullet points in body
copy, no magic-pill framing, no urgency/FOMO, no "results in X days," no
claim that Flow creates energy (only that it transforms what already exists).

Status: **compliance-reviewed 2026-08-23** by the `compliance-reviewer`
agent. Findings applied below: added the DSHEA disclaimer to every email
that makes a structure/function claim (1, 2, 3), and softened two phrases
in Email 3 that were closer to a disease-adjacent or definitive claim than
DSHEA structure/function language allows. No disease claims, hype, or
unsubstantiated timeframes were found — those risks were clean from the
first draft.

---

## Email 1 — Welcome
**Trigger:** immediately on `prelaunch_waitlist_joined`
**Subject:** Welcome. You're on the list.
**Preview text:** Here's what happens next — and why we built Flow this way.

Hi,

You just did something small that matters more than it looks: you decided
you'd rather wait for something built right than settle for something built
fast.

Flow exists because of a simple problem. Most energy products spike you up
and let your body deal with the crash later. That crash isn't a side
effect — it's the point. What goes up has to come down.

We took the opposite position. Instead of adding more stimulation, Flow is
built to support your nervous system's baseline — the steady state your
focus actually depends on. Real energy doesn't spike. It flows.

Over the next few weeks, we'll send you a few short emails: the thinking
behind Flow, what's actually in it, and word the moment it's ready to ship.
No spam, no countdown clocks, no pressure. Just what you signed up for.

Talk soon,
The Flow team

*These statements have not been evaluated by the Food and Drug
Administration. This product is not intended to diagnose, treat, cure, or
prevent any disease.*

---

## Email 2 — The Reframe
**Trigger:** day 3 after signup
**Subject:** Most energy supplements are solving the wrong problem.
**Preview text:** Why we stopped trying to give you energy — and started transforming what you already have.

Here's something most of the supplement industry would rather you didn't
think about: energy cannot be created or destroyed. Only transformed.

Every caffeine spike, every "pre-workout rush," every stimulant is really
just borrowing from your future self. Your body always finds equilibrium
eventually — the crash isn't bad luck, it's physics catching up.

Flow doesn't try to give you energy you don't have. It's built to help your
body use the energy that's already there more efficiently — supporting a
calmer, steadier baseline instead of pushing you above it. Less like
flooring the accelerator, more like finally getting the engine tuned.

That's the whole idea, really. Not more. Better used.

More on what's actually inside Flow in a few days.

*These statements have not been evaluated by the Food and Drug
Administration. This product is not intended to diagnose, treat, cure, or
prevent any disease.*

---

## Email 3 — The Science
**Trigger:** day 7 after signup
**Subject:** What's actually in Flow (and why)
**Preview text:** Three ingredients, three roles, no filler.

We'd rather show you the ingredients than talk around them.

Lion's Mane is in Flow for its link to nerve growth factor production,
which plays a role in normal nerve and cognitive function — not a same-day
effect, more a slow, consistent one.

Green tea extract, paired with the L-theanine naturally found in it, is
there for the way the two work together: gently raising alertness while
promoting the kind of relaxed focus that doesn't come with a jittery edge.

And magnesium citrate is doing quiet, unglamorous work — it's a cofactor in
hundreds of enzymatic processes, including ones involved in how your body
responds to everyday stress and winds down at the end of a day.

None of these are magic. They're just doing their jobs, consistently, so
your baseline has what it needs. That's the whole design philosophy: remove
the interference, support what's already there.

Flow launches soon. You'll be the first to know.

*These statements have not been evaluated by the Food and Drug
Administration. This product is not intended to diagnose, treat, cure, or
prevent any disease.*

---

## Email 4 — Launch is close
**Trigger:** manually sent, timed ~3–5 days before public launch
**Subject:** We're close.
**Preview text:** Flow is almost ready — and you were here before it existed.

Flow is close to ready, and you were on this list before it existed as a
product you could actually hold.

When we launch, you'll hear from us first — before it's live anywhere
else. No countdown, no last-chance pricing games. Just an email, when it's
actually true, telling you it's here.

Thanks for waiting for something built right.

---

## Open questions for you before this goes to Klaviyo
1. Founding-member perk: the welcome email in the existing `PreLaunchModal`
   success state promises "a little something extra for those who believed
   in us first" — this sequence doesn't name what that is. Worth deciding
   before send so Email 4 isn't the first time it's mentioned.
2. Sender name/reply-to and footer/unsubscribe — using whatever's already
   configured for the `Pre-Launch Signup` Klaviyo event.
