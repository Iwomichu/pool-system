import { createContext, useContext } from "react";

export const VoteFormContext = createContext();
export function useVoteForm() {
  return useContext(VoteFormContext);
}
