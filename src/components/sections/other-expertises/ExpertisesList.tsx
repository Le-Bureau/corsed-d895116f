import { motion } from "motion/react";
import StaggerChildren, { fadeUpItem } from "@/components/animations/StaggerChildren";
import { OTHER_EXPERTISES } from "@/lib/otherExpertises";
import ExpertiseItem from "./ExpertiseItem";

const ExpertisesList = () => {
  return (
    <StaggerChildren staggerDelay={0.06}>
      <ul className="list-none border-t border-border-subtle">
        {OTHER_EXPERTISES.map((expertise) => (
          <motion.div key={expertise.key} variants={fadeUpItem}>
            <ExpertiseItem expertise={expertise} />
          </motion.div>
        ))}
      </ul>
    </StaggerChildren>
  );
};

export default ExpertisesList;
