import { createContext, useContext } from "react";

export const PollCreationContext = createContext();
export function usePollCreation() {
  return useContext(PollCreationContext);
}
