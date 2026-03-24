"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const SECTIONS = [
  {
    index: "01",
    tag: "Pillars",
    heading: "Value",
    body: "Our architecture of excellence is built upon the unwavering trinity of integrity, innovation, and community. True value is not merely generated but curated through meticulous attention to ethical standards.",
    quote:
      "By fostering a culture where radical transparency meets avant-garde thinking, every interaction leaves a legacy of trust.",
    imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=80",
    imageAlt: "Modern minimalist office interior",
    grayscale: true,
    bg: "#f8faf8",
    accent: "#145652",
  },
  {
    index: "02",
    tag: "Purpose",
    heading: "Mission",
    body: "To provide sustainable and long-term impact in an era of ephemeral trends. Our mission anchors the industry with substance, ensuring growth is synchronized with the health of the ecosystems we inhabit.",
    quote: null,
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80",
    imageAlt: "Majestic mountain range",
    grayscale: false,
    bg: "#f0f4f3",
    accent: "#145652",
  },
  {
    index: "03",
    tag: "Ethos",
    heading: "Corporate Philosophy",
    body: "Our foundational beliefs guide daily operations and future goals. We view the corporation as a living organism, requiring both discipline and creative freedom to thrive.",
    quote: null,
    imageUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=900&q=80",
    imageAlt: "Professional in suit",
    grayscale: true,
    bg: "#e8eeec",
    accent: "#145652",
    beliefs: [
      { label: "Belief I", text: "Precision in every detail, from strategy to execution." },
      { label: "Belief II", text: "Humility in success; resilience in challenge." },
    ],
  },
];

function SectionLabel({ index, tag }: { index: string; tag: string }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <span className="w-10 h-px bg-[#C9A84C]/40" />
      <span
        className="text-[#C9A84C] text-[10px] tracking-[0.25em] uppercase"
        style={{ fontFamily: '"Work Sans", sans-serif' }}
      >
        {index} / {tag}
      </span>
    </div>
  );
}

function SectionContent({ s, active }: { s: (typeof SECTIONS)[0]; active: boolean }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center h-full">
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: s.index === "03" ? "1/1" : "3/4" }}
      >
        <Image
          src={s.imageUrl}
          alt={s.imageAlt}
          fill
          className={`object-cover transition-transform duration-700 ${active ? "scale-100" : "scale-105"} ${s.grayscale ? "grayscale" : ""}`}
          sizes="(max-width: 768px) 100vw, 45vw"
          priority={s.index === "01"}
        />
        {s.index === "03" && (
          <div className="absolute inset-0 bg-[#145652]/10 mix-blend-multiply" />
        )}
      </div>

      {/* Text */}
      <div className="md:pl-8">
        <SectionLabel index={s.index} tag={s.tag} />
        <h2
          className="text-5xl md:text-6xl text-[#145652] mb-8 italic leading-tight"
          style={{ fontFamily: '"Cormorant Garamond", serif' }}
        >
          {s.heading}
        </h2>
        <div className="space-y-5">
          <p
            className="text-xl md:text-2xl leading-relaxed text-[#3f4947]"
            style={{ fontFamily: '"Cormorant Garamond", serif' }}
          >
            {s.body}
          </p>
          {s.quote && (
            <p
              className="text-lg text-[#191c1c]/65 leading-relaxed border-l-2 border-[#C9A84C]/25 pl-6 italic"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              {s.quote}
            </p>
          )}
          {s.index === "02" && (
            <button
              className="text-[#C9A84C] text-xs tracking-[0.2em] uppercase border-b border-[#C9A84C]/30 pb-1.5 hover:border-[#C9A84C] transition-all duration-300 mt-2"
              style={{ fontFamily: '"Work Sans", sans-serif' }}
            >
              View Sustainability Report
            </button>
          )}
          {s.beliefs && (
            <div className="grid grid-cols-2 gap-6 pt-6">
              {s.beliefs.map((b) => (
                <div key={b.label}>
                  <h4
                    className="text-[10px] tracking-[0.2em] uppercase text-[#C9A84C] mb-2"
                    style={{ fontFamily: '"Work Sans", sans-serif' }}
                  >
                    {b.label}
                  </h4>
                  <p
                    className="text-lg text-[#191c1c]/80"
                    style={{ fontFamily: '"Cormorant Garamond", serif' }}
                  >
                    {b.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function PhilosophyPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0); // 0–2 (fractional, drives all animations)

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onScroll = () => {
      const { top, height } = container.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      // progress 0 → 2 across the sticky scroll range
      const p = Math.max(0, Math.min(2, (-top / scrollable) * 2));
      setProgress(p);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Per-section derived values (0→1 within each transition)
  // Transition 0→1: section 1 fades/shrinks, section 2 expands
  // Transition 1→2: section 2 fades/shrinks, section 3 expands
  const t1 = Math.max(0, Math.min(1, progress));       // 0–1
  const t2 = Math.max(0, Math.min(1, progress - 1));   // 0–1

  // easeInOutCubic for smooth feel
  const ease = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const e1 = ease(t1);
  const e2 = ease(t2);

  // Main panel: which section is "active" in the main slot
  // Section 0: fully visible until t1 starts, then shrinks away
  // Section 1: expands in during t1, then shrinks during t2
  // Section 2: expands in during t2

  // Section visibility in main panel
  const sec0Scale = 1 - e1 * 0.04;   // very slight shrink as it exits
  const sec0Opacity = 1 - e1;

  const sec1Scale = 0.96 + e1 * 0.04;
  const sec1Opacity = e1 * (1 - e2);
  const sec1MainVisible = t1 > 0 && t2 < 1;

  const sec2Scale = 0.96 + e2 * 0.04;
  const sec2Opacity = e2;

  // Preview card in bottom-right
  // Preview 1 (section 1 preview): visible when t1 === 0, fades as t1 increases
  const preview1Opacity = Math.max(0, 1 - e1 * 3);
  const preview1Scale = 1 - e1 * 0.1;

  // Preview 2 (section 2 preview): fades in as t1 completes, fades as t2 increases
  const preview2Opacity = Math.max(0, Math.min(1, (e1 - 0.7) / 0.3)) * Math.max(0, 1 - e2 * 3);
  const preview2Scale = 1 - e2 * 0.1;

  return (
    // Tall container = scroll distance. 300vh = 3 viewports worth of scroll for 2 transitions
    <div ref={containerRef} style={{ height: "300vh" }}>
      {/* Sticky wrapper */}
      <div className="sticky top-0 h-screen overflow-hidden" style={{ perspective: "1200px" }}>

        {/* ── Section 0 (Value) — base layer ── */}
        <div
          className="absolute inset-0 flex items-center"
          style={{
            background: SECTIONS[0].bg,
            opacity: sec0Opacity,
            transform: `scale(${sec0Scale})`,
            transition: "none",
            zIndex: 10,
            willChange: "opacity, transform",
          }}
        >
          <div className="max-w-screen-xl mx-auto w-full px-10 py-12">
            <SectionContent s={SECTIONS[0]} active={t1 < 0.1} />
          </div>
        </div>

        {/* ── Section 1 (Mission) — expands in, then exits ── */}
        <div
          className="absolute inset-0 flex items-center"
          style={{
            background: SECTIONS[1].bg,
            opacity: sec1Opacity,
            transform: `scaleX(${e1}) scale(${sec1Scale})`,
            transformOrigin: "left center",
            transition: "none",
            zIndex: 20,
            willChange: "opacity, transform",
            // Shadow on left edge for page-turn depth
            boxShadow: e1 > 0.01 ? `-8px 0 40px rgba(0,0,0,${0.12 * e1})` : "none",
          }}
        >
          <div
            className="max-w-screen-xl mx-auto w-full px-10 py-12"
            style={{ opacity: Math.min(1, (e1 - 0.4) / 0.6) }} // content fades in after panel opens
          >
            <SectionContent s={SECTIONS[1]} active={t1 > 0.9 && t2 < 0.1} />
          </div>
        </div>

        {/* ── Section 2 (Corporate Philosophy) — expands last ── */}
        <div
          className="absolute inset-0 flex items-center"
          style={{
            background: SECTIONS[2].bg,
            opacity: sec2Opacity,
            transform: `scaleX(${e2}) scale(${sec2Scale})`,
            transformOrigin: "left center",
            transition: "none",
            zIndex: 30,
            willChange: "opacity, transform",
            boxShadow: e2 > 0.01 ? `-8px 0 40px rgba(0,0,0,${0.12 * e2})` : "none",
          }}
        >
          <div
            className="max-w-screen-xl mx-auto w-full px-10 py-12"
            style={{ opacity: Math.min(1, (e2 - 0.4) / 0.6) }}
          >
            <SectionContent s={SECTIONS[2]} active={t2 > 0.9} />
          </div>
        </div>

        {/* ── Preview card: Section 1 ── */}
        <div
          className="absolute bottom-8 right-8 rounded-sm overflow-hidden cursor-pointer"
          style={{
            width: 200,
            height: 130,
            opacity: preview1Opacity,
            transform: `scale(${preview1Scale})`,
            transformOrigin: "bottom right",
            transition: "none",
            zIndex: 40,
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            willChange: "opacity, transform",
            pointerEvents: preview1Opacity > 0.1 ? "auto" : "none",
          }}
        >
          <div className="absolute inset-0" style={{ background: SECTIONS[1].bg }} />
          <Image
            src={SECTIONS[1].imageUrl}
            alt={SECTIONS[1].imageAlt}
            fill
            className="object-cover opacity-40"
            sizes="200px"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-3">
            <span
              className="text-[9px] tracking-[0.2em] uppercase text-[#C9A84C]"
              style={{ fontFamily: '"Work Sans", sans-serif' }}
            >
              {SECTIONS[1].index} / {SECTIONS[1].tag}
            </span>
            <span
              className="text-[#145652] text-base italic leading-tight"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              {SECTIONS[1].heading}
            </span>
          </div>
          {/* Fold edge */}
          <div className="absolute top-0 left-0 w-full h-full border border-white/10" />
        </div>

        {/* ── Preview card: Section 2 ── */}
        <div
          className="absolute bottom-8 right-8 rounded-sm overflow-hidden cursor-pointer"
          style={{
            width: 200,
            height: 130,
            opacity: preview2Opacity,
            transform: `scale(${preview2Scale})`,
            transformOrigin: "bottom right",
            transition: "none",
            zIndex: 40,
            boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
            willChange: "opacity, transform",
            pointerEvents: preview2Opacity > 0.1 ? "auto" : "none",
          }}
        >
          <div className="absolute inset-0" style={{ background: SECTIONS[2].bg }} />
          <Image
            src={SECTIONS[2].imageUrl}
            alt={SECTIONS[2].imageAlt}
            fill
            className="object-cover opacity-40 grayscale"
            sizes="200px"
          />
          <div className="absolute inset-0 flex flex-col justify-end p-3">
            <span
              className="text-[9px] tracking-[0.2em] uppercase text-[#C9A84C]"
              style={{ fontFamily: '"Work Sans", sans-serif' }}
            >
              {SECTIONS[2].index} / {SECTIONS[2].tag}
            </span>
            <span
              className="text-[#145652] text-base italic leading-tight"
              style={{ fontFamily: '"Cormorant Garamond", serif' }}
            >
              {SECTIONS[2].heading}
            </span>
          </div>
          <div className="absolute top-0 left-0 w-full h-full border border-white/10" />
        </div>

        {/* ── Scroll progress dots ── */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-50">
          {SECTIONS.map((s, i) => {
            const active =
              i === 0 ? t1 < 0.5 :
              i === 1 ? (t1 >= 0.5 && t2 < 0.5) :
              t2 >= 0.5;
            return (
              <div
                key={s.index}
                className="transition-all duration-500"
                style={{
                  width: active ? 6 : 4,
                  height: active ? 24 : 4,
                  borderRadius: 99,
                  background: active ? "#145652" : "#C9A84C",
                  opacity: active ? 1 : 0.4,
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}