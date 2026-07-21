// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";

/**
 * MEZASTAR VALUES — trading hub for Pokemon Mezastar tags.
 *
 * Design tokens
 * -------------
 * Color:
 *   --ms-bg:      #0A0D14  (arcade-cabinet black, slightly blue)
 *   --ms-panel:   #12161F  (raised panel surface)
 *   --ms-gold:    #F2B705  (holo-tag gold — primary accent)
 *   --ms-blue:    #29C5FF  (scanner-screen cyan — secondary accent)
 *   --ms-red:     #E8425A  (P1 button red — used sparingly, live/urgent only)
 *   --ms-ink:     #EDEFF5  (primary text)
 *   --ms-mute:    #8A93A6  (secondary text)
 *
 * Type:
 *   Display: "Rajdhani" (condensed, geometric, arcade-signage energy) — headlines only
 *   Body:    "Inter" — everything else
 *
 * Signature element:
 *   The hero "tag slot" — a holographic tag card sitting in a scanner mouth.
 *   On hover the foil sweeps across it, mirroring the physical ritual of
 *   inserting a Mezastar tag into the arcade scanner.
 */

const RARITIES = [
  { label: "Bronze", color: "#B5793B" },
  { label: "Silver", color: "#C7CDD6" },
  { label: "Gold", color: "#F2B705" },
  { label: "Rainbow", color: "#29C5FF" },
];

const HIGHLIGHTS = [
  { tag: "R Rank Pull", title: "Opening a full Rainbow tag case", author: "ScannerKen", kind: "YouTube" },
  { tag: "Interview", title: "We talked to the top Mezastar trader in the Discord", author: "Holo Hana", kind: "YouTube" },
  { tag: "Patch Notes", title: "What changed in the Battle Set 12 update?", author: "TagTalk", kind: "YouTube" },
  { tag: "Community", title: "Biggest tag pull of the month, ranked", author: "Slot Machine", kind: "YouTube" },
];

const FEATURES = [
  {
    eyebrow: "VALUES",
    title: "Real-Time Values",
    body: "Manually reviewed values based on active trades, scarcity, and set rotation.",
    cta: "Open value list",
  },
  {
    eyebrow: "TRADING",
    title: "Trade Ads",
    body: "Post your offers and find traders looking for the exact tag you're holding.",
    cta: "Browse trade ads",
  },
  {
    eyebrow: "TOOLS",
    title: "Smart Trade Calculator",
    body: "Compare offers side by side and catch one-sided trades before you confirm.",
    cta: "Use calculator",
  },
  {
    eyebrow: "SAFETY",
    title: "Rarity Changes",
    body: "Track every value change log so you're never trading on stale info.",
    cta: "View changes",
  },
];

const FAQS = [
  "What is Mezastar Values?",
  "How accurate are the values?",
  "How are values determined?",
  "How often are values updated?",
  "What tags are included in the value list?",
  "How does the trade calculator work?",
  "What do the demand ratings mean?",
  "What does \"Rate of Change\" mean?",
];

function useCountdown(totalSeconds: number) {
  const [seconds, setSeconds] = useState(totalSeconds);
  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => (s > 0 ? s - 1 : totalSeconds));
    }, 1000);
    return () => clearInterval(id);
  }, [totalSeconds]);
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return [h, m, s].map((n) => String(n).padStart(2, "0"));
}

function TagSlotIllustration() {
  return (
    <div className="ms-tag-slot flex h-full w-full items-center justify-center rounded-2xl border border-white/10 bg-[var(--ms-panel)] p-10">
      <div className="ms-shine" />
      <div
        className="ms-tag-card relative flex h-64 w-48 flex-col justify-between rounded-xl border border-white/15 p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
        style={{
          background: "linear-gradient(155deg, #1a2130 0%, #0d1119 55%, #1a2130 100%)",
        }}
      >
        <div className="flex items-center justify-between">
          <span className="ms-display text-xs tracking-[0.2em] text-[var(--ms-gold)]">No. 042</span>
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "var(--ms-blue)", boxShadow: "0 0 10px var(--ms-blue)" }}
          />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div
            className="h-24 w-24 rounded-full"
            style={{
              background:
                "conic-gradient(from 180deg, var(--ms-gold), var(--ms-blue), var(--ms-red), var(--ms-gold))",
              boxShadow: "0 0 40px rgba(242,183,5,0.35)",
            }}
          />
        </div>
        <div>
          <div className="ms-display text-sm text-[var(--ms-ink)]">RAINBOW TAG</div>
          <div className="text-[11px] text-[var(--ms-mute)]">Battle Set 12</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [h, m, s] = useCountdown(5 * 3600 + 40 * 60);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="ms-root min-h-screen w-full">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Rajdhani:wght@600;700&family=Inter:wght@400;500;600&display=swap");

        :root {
          --ms-bg: #0a0d14;
          --ms-panel: #12161f;
          --ms-panel-2: #161b26;
          --ms-gold: #f2b705;
          --ms-blue: #29c5ff;
          --ms-red: #e8425a;
          --ms-ink: #edeff5;
          --ms-mute: #8a93a6;
          --ms-line: rgba(237, 239, 245, 0.08);
        }
        .ms-root {
          background: var(--ms-bg);
          color: var(--ms-ink);
          font-family: "Inter", ui-sans-serif, system-ui, sans-serif;
        }
        .ms-display {
          font-family: "Rajdhani", ui-sans-serif, system-ui, sans-serif;
          font-weight: 700;
          letter-spacing: 0.01em;
        }
        .ms-grid {
          background-image: linear-gradient(var(--ms-line) 1px, transparent 1px),
            linear-gradient(90deg, var(--ms-line) 1px, transparent 1px);
          background-size: 42px 42px;
        }
        .ms-tag-slot {
          position: relative;
          overflow: hidden;
          isolation: isolate;
        }
        .ms-tag-slot::before {
          content: "";
          position: absolute;
          inset: -40%;
          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            rgba(242, 183, 5, 0.35) 40deg,
            rgba(41, 197, 255, 0.35) 90deg,
            transparent 140deg,
            transparent 360deg
          );
          animation: ms-spin 6s linear infinite;
          z-index: 0;
        }
        .ms-tag-slot > * {
          position: relative;
          z-index: 1;
        }
        @keyframes ms-spin {
          to {
            transform: rotate(360deg);
          }
        }
        .ms-tag-card {
          transition: transform 0.5s ease;
        }
        .ms-tag-slot:hover .ms-tag-card {
          transform: translateY(-6px) rotate(-1.5deg);
        }
        .ms-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            115deg,
            transparent 20%,
            rgba(255, 255, 255, 0.55) 34%,
            rgba(255, 255, 255, 0.05) 46%,
            transparent 60%
          );
          transform: translateX(-120%);
          transition: transform 0.9s ease;
        }
        .ms-tag-slot:hover .ms-shine {
          transform: translateX(120%);
        }
        @media (prefers-reduced-motion: reduce) {
          .ms-tag-slot::before,
          .ms-tag-card,
          .ms-shine {
            animation: none !important;
            transition: none !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="ms-grid relative overflow-hidden border-b border-white/5 px-6 py-24 sm:px-12 lg:px-20">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="ms-display text-xs tracking-[0.35em] text-[var(--ms-mute)]">
              MEZASTAR TRADING HUB
            </p>
            <h1 className="ms-display mt-4 text-5xl leading-[1.05] text-[var(--ms-ink)] sm:text-6xl">
              Mezastar <span style={{ color: "var(--ms-gold)" }}>Values</span>
            </h1>
            <p className="mt-5 max-w-md text-base leading-7 text-[var(--ms-mute)]">
              The ultimate hub for Pokemon Mezastar tag trading — accurate values,
              live restocks, and a calculator that keeps every trade fair.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <button className="rounded-full bg-[var(--ms-gold)] px-6 py-3 text-sm font-semibold text-black transition hover:brightness-110">
                Start Trading →
              </button>
              <button className="rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-[var(--ms-ink)] transition hover:border-[var(--ms-blue)] hover:text-[var(--ms-blue)]">
                ★ View Values
              </button>
            </div>
            <div className="mt-10 flex gap-2">
              {RARITIES.map((r) => (
                <span key={r.label} className="rounded-full border border-white/10 px-3 py-1 text-[11px] text-[var(--ms-mute)]">
                  <span className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle" style={{ background: r.color }} />
                  {r.label}
                </span>
              ))}
            </div>
          </div>
          <div className="h-[420px] w-full">
            <TagSlotIllustration />
          </div>
        </div>
      </section>

      {/* POPULAR HIGHLIGHTS */}
      <section className="px-6 py-20 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="ms-display text-2xl text-[var(--ms-gold)]">Popular Highlights</h2>
          <p className="mt-2 text-sm text-[var(--ms-mute)]">
            Mezastar clips, updates, and moments from the community.
          </p>
          <div className="mt-8 flex gap-4 overflow-x-auto pb-2">
            {HIGHLIGHTS.map((item) => (
              <div key={item.title} className="min-w-[240px] flex-1 rounded-xl border border-white/10 bg-[var(--ms-panel)] p-4">
                <span className="ms-display text-[11px] tracking-wide text-[var(--ms-blue)]">{item.tag}</span>
                <p className="mt-2 text-sm font-medium leading-5 text-[var(--ms-ink)]">{item.title}</p>
                <p className="mt-3 text-xs text-[var(--ms-mute)]">{item.author} · {item.kind}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STOCK RESTOCKER */}
      <section className="px-6 py-20 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="ms-display text-2xl text-[var(--ms-gold)]">Stock Restocker</h2>
              <p className="mt-2 text-sm text-[var(--ms-mute)]">
                Track limited-time tag cases so you never miss a restock.
              </p>
            </div>
            <span className="rounded-full bg-[var(--ms-blue)]/10 px-3 py-1.5 text-xs font-medium text-[var(--ms-blue)]">
              ✦ Live restocks for active traders
            </span>
          </div>

          <div className="mt-8 rounded-2xl border border-white/10 bg-[var(--ms-panel-2)] p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <h3 className="ms-display text-lg text-[var(--ms-ink)]">Tag Case Machine</h3>
              <div className="ms-display flex items-baseline gap-1 text-2xl text-[var(--ms-red)]">
                <span>Next restock in</span>
                <span className="ml-2 tabular-nums">{h}</span>:
                <span className="tabular-nums">{m}</span>:
                <span className="tabular-nums">{s}</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-[var(--ms-panel)] py-10">
                  <span className="text-3xl text-[var(--ms-gold)]">?</span>
                  <span className="mt-3 text-center text-xs text-[var(--ms-mute)]">Waiting to be<br />updated…</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="px-6 py-20 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="ms-display text-2xl text-[var(--ms-gold)]">Mezastar Values Features</h2>
          <p className="mt-2 max-w-xl text-sm text-[var(--ms-mute)]">
            Everything you need for confident Mezastar trading — from accurate values to smarter tools and safer deals.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {FEATURES.map((f) => (
              <div key={f.title} className="rounded-xl border border-white/10 bg-[var(--ms-panel)] p-6">
                <span className="ms-display text-[11px] tracking-widest text-[var(--ms-mute)]">{f.eyebrow}</span>
                <h3 className="ms-display mt-4 text-xl text-[var(--ms-ink)]">{f.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--ms-mute)]">{f.body}</p>
                <a href="#" className="mt-4 inline-block text-sm font-medium text-[var(--ms-gold)]">{f.cta} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-20 sm:px-12 lg:px-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="ms-display text-xs tracking-[0.3em] text-[var(--ms-mute)]">FAQS</p>
          <h2 className="ms-display mt-3 text-4xl text-[var(--ms-ink)]">We&apos;ve Got the Answers</h2>
          <p className="mt-3 text-sm text-[var(--ms-mute)]">A list of commonly asked questions from our community.</p>
          <div className="mt-10 flex flex-col gap-3 text-left">
            {FAQS.map((q, i) => (
              <button
                key={q}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-[var(--ms-panel)] px-5 py-4 text-left transition hover:border-[var(--ms-gold)]/40"
              >
                <span className="text-sm font-medium text-[var(--ms-gold)]">{q}</span>
                <span className="ml-4 text-[var(--ms-mute)] transition-transform" style={{ transform: openFaq === i ? "rotate(180deg)" : "rotate(0deg)" }}>
                  ⌄
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}