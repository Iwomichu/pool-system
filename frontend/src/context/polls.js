import { createContext, useContext } from "react";

export const PollsContext = createContext();
export function usePolls() {
  return useContext(PollsContext);
}
