import { createContext, useContext } from "react";

export const VotesContext = createContext();
export function useVotes() {
  return useContext(VotesContext);
}
