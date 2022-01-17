import { computed, ComputedRef } from "vue";

export const useTimeline = (
  modelValue: any,
): {
  changedProperties: ComputedRef<string[]>;
  getLabelFromProperty: (property: string) => string;
} => {
  const changedProperties = computed(
    () =>
      Array.from(
        modelValue.stages
          ? new Set(Object.values(modelValue.stages).map((stage: any) => stage.property))
          : [],
      ) as string[],
  );

  const getLabelFromProperty = (property: string): string => {
    if (!modelValue.stages) {
      return "";
    }

    const stage = Object.values(modelValue.stages).find(
      (stage: any) => stage.property === property,
    ) as any;

    return stage ? stage.label : "";
  };

  return {
    changedProperties,
    getLabelFromProperty,
  };
};
