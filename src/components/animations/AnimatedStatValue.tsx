import { useCountUp, parseAnimatableStat, formatWithSpaces } from "@/hooks/useCountUp";

interface Props {
  value: string;
  duration?: number;
  className?: string;
  /** If true, format animated number with thousand-space separator. Auto-detected when input contains a space. */
  withSpaces?: boolean;
}

/**
 * Renders a numeric stat value with count-up animation when it enters view.
 * If the value is a range or non-numeric, renders it as static text.
 */
const AnimatedStatValue = ({ value, duration = 1800, className, withSpaces }: Props) => {
  const parsed = parseAnimatableStat(value);
  const useSpaces = withSpaces ?? /\s/.test(value.trim());
  const { value: animated, ref } = useCountUp({
    end: parsed?.number ?? 0,
    duration,
  });

  if (!parsed) {
    return <span className={className}>{value}</span>;
  }

  const display = useSpaces ? formatWithSpaces(animated) : animated;

  return (
    <span
      ref={ref as React.RefObject<HTMLSpanElement>}
      className={className}
      aria-label={value}
    >
      {parsed.prefix}
      {display}
      {parsed.suffix}
    </span>
  );
};

export default AnimatedStatValue;
