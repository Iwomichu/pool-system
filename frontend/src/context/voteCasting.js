import { createContext, useContext } from "react";

export const VoteCastingContext = createContext();
export function useVoteCasting() {
  return useContext(VoteCastingContext);
}
