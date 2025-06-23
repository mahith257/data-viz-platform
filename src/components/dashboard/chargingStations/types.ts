export const EGraphType = {
  UNSATISFIED_DEMAND: "UNSATISFIED_DEMAND",
} as const;

export type EGraphType = (typeof EGraphType)[keyof typeof EGraphType];
