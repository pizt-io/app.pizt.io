// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const state = () => ({
  elements: [],
});

export type AppState = ReturnType<typeof state>;
