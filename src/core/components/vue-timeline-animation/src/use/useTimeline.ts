import { computed, ComputedRef } from "vue";

export const useTimeline = (
  props: any,
): {
  changedProperties: ComputedRef<string[]>;
  getLabelFromProperty: (property: string) => string;
} => {
  const changedProperties = computed(
    () =>
      Array.from(
        new Set(Object.values(props.modelValue.stages).map((stage: any) => stage.property)),
      ) as string[],
  );

  const getLabelFromProperty = (property: string): string => {
    const stage = Object.values(props.modelValue.stages).find(
      (stage: any) => stage.property === property,
    ) as any;
    return stage ? stage.label : "";
  };

  return {
    changedProperties,
    getLabelFromProperty,
  };
};
