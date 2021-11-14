import { CSSProperties } from 'vue';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const state = () => ({
  vueClientReady: false,
  animationSettings: {} as CSSProperties,
});

export type State = ReturnType<typeof state>;
