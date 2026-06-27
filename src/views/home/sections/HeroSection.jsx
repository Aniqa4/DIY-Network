'use client'
import { TypeAnimation } from "react-type-animation";

const bgWords = [
  { text: "Cooking",   cls: "top-[6%]   -left-6       text-[9rem]  -rotate-[7deg]  text-phthalo" },
  { text: "Painting",  cls: "top-[16%]  -right-4      text-[11rem]  rotate-[5deg]  text-sienna"  },
  { text: "Gardening", cls: "top-[52%]  -left-10      text-[8rem]  -rotate-[4deg]  text-phthalo" },
  { text: "Crafting",  cls: "bottom-[6%] right-[4%]  text-[10rem]   rotate-[9deg]  text-sienna"  },
  { text: "Sewing",    cls: "top-[38%]  left-[35%]   text-[7rem]  -rotate-[5deg]  text-phthalo" },
];

function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-canvas">
      {/* Atmospheric background — category names name themselves */}
      <div aria-hidden="true" className="absolute inset-0 select-none pointer-events-none">
        {bgWords.map(({ text, cls }) => (
          <span
            key={text}
            className={`absolute font-ProtestStrike whitespace-nowrap opacity-[0.055] ${cls}`}
          >
            {text}
          </span>
        ))}
      </div>

      {/* Left accent rule */}
      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-phthalo hidden lg:block" aria-hidden="true" />

      <div className="relative z-10 w-full">
        <div className="container mx-auto px-6 lg:px-16">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-phthalo mb-8">
              A home for makers
            </p>

            {/* Animated headline */}
            <h1 className="font-ProtestStrike text-[4rem] md:text-[5.5rem] lg:text-[7rem] leading-[0.88] text-ink mb-10 min-h-[1.8em]">
              <TypeAnimation
                sequence={[
                  "Make something beautiful.", 2200,
                  "Make it yourself.",         2200,
                  "Make it by hand.",          2200,
                  "Make it at home.",          2200,
                ]}
                speed={42}
                deletingSpeed={55}
                repeat={Infinity}
              />
            </h1>

            {/* Subtitle */}
            <p className="text-ink/55 text-lg leading-relaxed mb-12 max-w-md font-light">
              Cooking, painting, gardening, sewing, and crafting — stories of things
              made slowly, on purpose, at home.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-5 items-center">
              <a
                href="#explore"
                className="inline-block bg-ink text-canvas-light px-8 py-3.5 text-sm font-semibold tracking-wide hover:bg-phthalo transition-colors duration-300 focus-visible:outline-2 focus-visible:outline focus-visible:outline-phthalo"
              >
                Read the collection
              </a>
              <a
                href="#popular"
                className="text-sm font-medium text-ink/55 hover:text-phthalo transition-colors duration-200 underline underline-offset-4 decoration-canvas-dark hover:decoration-phthalo"
              >
                What&apos;s popular
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-canvas-dark" aria-hidden="true" />
    </section>
  );
}

export default HeroSection;
