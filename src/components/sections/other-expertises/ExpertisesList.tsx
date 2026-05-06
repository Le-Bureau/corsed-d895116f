import { OTHER_EXPERTISES } from "@/lib/otherExpertises";
import ExpertiseItem from "./ExpertiseItem";

const ExpertisesList = () => {
  return (
    <ul className="list-none border-t border-white/10">
      {OTHER_EXPERTISES.map((expertise) => (
        <ExpertiseItem key={expertise.key} expertise={expertise} />
      ))}
    </ul>
  );
};

export default ExpertisesList;
