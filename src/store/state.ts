import { CSSProperties } from 'vue';
import { transitions } from '@/mock/transitions'

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const state = () => ({
  vueClientReady: false,
  selectedTransition: transitions[0] as CSSProperties,
  transitions: transitions,
});

export type State = ReturnType<typeof state>;
