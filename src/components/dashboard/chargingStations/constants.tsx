import UnsatisfiedDemand from "./graphs/UnsatisfiedDemand";
import { EGraphType } from "./types";

const GRAPH_TYPES: Array<{ label: string; value: EGraphType }> = [
  {
    label: "Unsatisfied Demand %",
    value: EGraphType.UNSATISFIED_DEMAND,
  },
];

const GRAPH_TYPES_MAP: Record<EGraphType, React.ReactNode> = {
  [EGraphType.UNSATISFIED_DEMAND]: <UnsatisfiedDemand />,
};

export { GRAPH_TYPES, GRAPH_TYPES_MAP };
