import { useEffect, useState } from "react";

interface Props {
  words: string[];
  className?: string;
  style?: React.CSSProperties;
}

const TYPE_MS = 140;
const ERASE_MS = 80;
const HOLD_MS = 2800;
const GAP_MS = 500;

// Types a word, holds it, erases it, then moves on to the next one.
// With reduced motion, the first word is shown statically.
const TypewriterWords = ({ words, className, style }: Props) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState(words[0] ?? "");
  const [erasing, setErasing] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduced || words.length < 2) return;
    const word = words[index] ?? "";

    let delay: number;
    let next: () => void;
    if (!erasing && text === word) {
      delay = HOLD_MS;
      next = () => setErasing(true);
    } else if (erasing && text === "") {
      delay = GAP_MS;
      next = () => {
        setErasing(false);
        setIndex((i) => (i + 1) % words.length);
      };
    } else if (erasing) {
      delay = ERASE_MS;
      next = () => setText(word.slice(0, text.length - 1));
    } else {
      delay = TYPE_MS;
      next = () => setText(word.slice(0, text.length + 1));
    }

    const t = window.setTimeout(next, delay);
    return () => window.clearTimeout(t);
  }, [text, erasing, index, words, reduced]);

  return (
    <span className={className} style={style}>
      {reduced ? words[0] : text}
      {!reduced && (
        <span
          aria-hidden="true"
          className="inline-block w-[0.06em] h-[0.9em] ml-[0.04em] align-[-0.08em] bg-current animate-[typewriter-caret_1s_steps(1)_infinite]"
        />
      )}
    </span>
  );
};

export default TypewriterWords;
