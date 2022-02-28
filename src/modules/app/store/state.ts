// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const state = () => ({
  projects: [] as any[],
  elements: [] as any[],
  selectedProject: {} as any,
});

export type AppState = ReturnType<typeof state>;
