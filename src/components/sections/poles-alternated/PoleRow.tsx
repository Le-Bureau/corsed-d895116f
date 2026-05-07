import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { Pole } from "@/lib/poles";
import AnimatedStatValue from "@/components/animations/AnimatedStatValue";

interface Props {
  pole: Pole;
  index: number;
  isReversed: boolean;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const hexToRgb = (hex: string) => {
  const m = hex.replace("#", "");
  const full =
    m.length === 3
      ? m
          .split("")
          .map((c) => c + c)
          .join("")
      : m;
  const n = parseInt(full, 16);
  return `${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`;
};

const PoleRow = ({ pole, index, isReversed }: Props) => {
  const color = pole.baseColorOnLight;
  const colorRgb = hexToRgb(color);
  const titleId = `pole-${pole.key}-title`;
  const hasLinkedSubServices = pole.subServices?.some((s) => s.slug);
  const reduced = useReducedMotion();

  const imageRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reduced ? 0 : 0.08,
        delayChildren: reduced ? 0 : 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: reduced ? { opacity: 0 } : { opacity: 0, y: 20 },
    visible: reduced
      ? { opacity: 1, transition: { duration: 0.2 } }
      : { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE } },
  };

  return (
    <section
      role="region"
      aria-labelledby={titleId}
      className="mb-40 lg:mb-56 last:mb-0"
    >
      <div
        className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center ${
          isReversed ? "lg:[direction:rtl]" : ""
        }`}
      >
        {/* Image */}
        <div className="lg:[direction:ltr] relative">
          <div
            ref={imageRef}
            className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-surface-elevated shadow-soft-lg group transition-all duration-700 ease-out hover:scale-[1.01]"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `var(--shadow-xl), 0 24px 60px rgba(${colorRgb}, 0.18)`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "";
            }}
          >
            {reduced ? (
              <img
                src={pole.showcaseImage}
                alt={pole.label}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                style={
                  pole.mobileImagePosition
                    ? { objectPosition: pole.mobileImagePosition }
                    : undefined
                }
              />
            ) : (
              <motion.img
                src={pole.showcaseImage}
                alt={pole.label}
                style={{
                  y: imageY,
                  scale: 1.1,
                  ...(pole.mobileImagePosition
                    ? { objectPosition: pole.mobileImagePosition }
                    : {}),
                }}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.13]"
              />
            )}
            <div
              className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.35) 100%)",
              }}
            />
            <span
              className="absolute bottom-6 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-full bg-white/90 backdrop-blur-md text-[10px] font-mono font-semibold tracking-[0.22em] uppercase whitespace-nowrap z-10"
              style={{
                color,
                border: `1px solid ${color}40`,
              }}
            >
              CORSE DRONE · {pole.label.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="lg:[direction:ltr] relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative z-10 pl-8 border-l-2"
            style={{ borderColor: color }}
          >
            {/* Eyebrow */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-2.5 mb-8"
            >
              <span
                className={`block w-8 h-[1.5px] ${
                  reduced ? "" : "animate-[eyebrowGlow_3s_ease-in-out_infinite]"
                }`}
                style={{ background: color, color }}
              />
              <span
                className="font-mono text-[11px] font-bold tracking-[0.22em] uppercase"
                style={{ color }}
              >
                EXPERTISE {String(index + 1).padStart(2, "0")}
              </span>
            </motion.div>

            {/* Title — 3 lines, each its own motion item */}
            <h3
              id={titleId}
              className="font-display text-[clamp(40px,5vw,64px)] leading-[1.05] mb-8 text-text-primary"
            >
              <motion.span
                variants={itemVariants}
                className="block font-semibold tracking-[-0.04em]"
              >
                Corse
              </motion.span>
              <motion.span
                variants={itemVariants}
                className="block font-semibold tracking-[-0.05em]"
                style={{ color }}
              >
                Drone
              </motion.span>
              <motion.span
                variants={itemVariants}
                className="block font-bold tracking-[-0.04em]"
              >
                {pole.label}
              </motion.span>
            </h3>

            {pole.pitch && (
              <motion.p
                variants={itemVariants}
                className="text-base leading-[1.6] text-text-secondary mb-8 max-w-[480px]"
              >
                {pole.pitch}
              </motion.p>
            )}

            <motion.div
              variants={itemVariants}
              className="h-px bg-border-subtle my-9"
            />

            {pole.stat && (
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-6 mb-9"
              >
                <motion.div
                  whileHover={reduced ? undefined : { scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  className="font-serif italic font-normal leading-none tracking-[-0.02em] text-[clamp(56px,6vw,76px)] flex-shrink-0 origin-left cursor-default flex items-start"
                  style={{ color, fontFamily: "'Fraunces', 'Playfair Display', Georgia, serif" }}
                >
                  <AnimatedStatValue value={pole.stat.value} />
                  <span className="text-[0.42em] font-normal italic ml-0.5 mt-[0.35em] opacity-85">
                    {pole.stat.unit}
                  </span>
                </motion.div>
                <div className="text-[13px] leading-[1.5] text-text-secondary">
                  <strong className="text-text-primary font-medium block">
                    {pole.stat.labelStrong}
                  </strong>
                  {pole.stat.labelMuted}
                </div>
              </motion.div>
            )}

            {hasLinkedSubServices ? (
              <motion.div variants={itemVariants} className="flex flex-col">
                {pole.subServices
                  .filter((s) => s.slug)
                  .map((sub) => (
                    <Link
                      key={sub.slug}
                      to={`/pole/${pole.key}/${sub.slug}`}
                      className="group/sub relative flex items-center justify-between py-4 border-b border-border-subtle last:border-b-0 text-text-primary text-base font-medium tracking-[-0.015em] transition-all duration-250 ease-out hover:pl-2 outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-sm"
                      style={
                        {
                          ["--tw-ring-color" as string]: `${color}66`,
                        } as React.CSSProperties
                      }
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "";
                      }}
                    >
                      <span className="relative">
                        {sub.name}
                        <span
                          aria-hidden
                          className="absolute left-0 -bottom-0.5 h-[1.5px] w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-hover/sub:scale-x-100"
                          style={{ background: color }}
                        />
                      </span>
                      <ArrowRight
                        className="w-5 h-5 opacity-70 transition-all duration-250 ease-out group-hover/sub:opacity-100 group-hover/sub:translate-x-1"
                        style={{ color }}
                      />
                    </Link>
                  ))}
              </motion.div>
            ) : pole.isInDevelopment ? (
              <motion.div
                variants={itemVariants}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-[10px] font-mono font-semibold tracking-[0.18em] uppercase"
                style={{
                  background: `${color}15`,
                  border: `1px solid ${color}40`,
                  color,
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: color,
                    boxShadow: `0 0 8px ${color}`,
                  }}
                />
                Prochainement
              </motion.div>
            ) : null}

            <motion.div variants={itemVariants}>
              <Link
                to={`/pole/${pole.key}`}
                className="group/cta inline-flex items-center gap-2 mt-8 px-6 py-3.5 rounded-full transition-all duration-300 text-sm font-semibold text-white outline-none focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={
                  {
                    background: color,
                    boxShadow: `0 4px 14px rgba(${colorRgb}, 0.30)`,
                    ["--tw-ring-color" as string]: `rgba(${colorRgb}, 0.40)`,
                  } as React.CSSProperties
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = `0 8px 24px rgba(${colorRgb}, 0.40)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "";
                  e.currentTarget.style.boxShadow = `0 4px 14px rgba(${colorRgb}, 0.30)`;
                }}
              >
                <span>
                  {pole.isInDevelopment
                    ? `En savoir plus sur Corse Drone ${pole.label}`
                    : `Découvrir Corse Drone ${pole.label}`}
                </span>
                <ArrowRight
                  className="w-4 h-4 transition-transform duration-300 group-hover/cta:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PoleRow;
