// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const state = () => ({
  vueClientReady: false,
  selectedTransition: {} as any,
  transitions: [],
});

export type RootState = ReturnType<typeof state>;
