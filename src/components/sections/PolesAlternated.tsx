import { POLES } from "@/lib/poles";
import PoleRow from "./poles-alternated/PoleRow";

const PolesAlternated = () => {
  return (
    <section className="py-32 lg:py-48 bg-surface-bg">
      <div className="container max-w-[1280px] mx-auto px-5 lg:px-10">
        <div>
          {POLES.map((pole, i) => (
            <PoleRow
              key={pole.key}
              pole={pole}
              index={i}
              isReversed={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PolesAlternated;
