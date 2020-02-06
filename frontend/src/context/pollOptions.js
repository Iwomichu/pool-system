import { createContext, useContext } from "react";

export const PollOptionsContext = createContext();
export function usePollOptions() {
  return useContext(PollOptionsContext);
}
