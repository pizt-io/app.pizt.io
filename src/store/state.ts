import { transitions } from "@/mock/transitions";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const state = () => ({
  vueClientReady: false,
  selectedTransition: transitions[0],
  transitions: transitions,
});

export type RootState = ReturnType<typeof state>;
