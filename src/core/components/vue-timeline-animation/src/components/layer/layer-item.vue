<template>
  <div>
    <div class="va-layer__item">
      <i class="icon icon-va-ellipsis-v handle" />
      <span class="text">{{ modelValue.name }}</span>
      <span
        :class="[modelValue.expanded && 'va__active', 'va-expanded__toggle']"
        @click="handleToggleExpand"
      >
        <i class="icon-va-chevron-up" />
      </span>
    </div>
    <div v-if="modelValue.expanded" class="va-expanded__wrapper">
      <LayerItemExpanded
        v-for="property in changedProperties"
        :key="property"
        :property="property"
        :label="getLabelFromProperty(property)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTimeline } from "../../use/useTimeline";

import LayerItemExpanded from "./layer-item/layer-item-expanded.vue";

export default defineComponent({
  components: { LayerItemExpanded },
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const { changedProperties, getLabelFromProperty } = useTimeline(props);

    const handleToggleExpand = () => {
      emit("update:modelValue", {
        ...props.modelValue,
        expanded: !props.modelValue.expanded,
      });
    };

    return {
      changedProperties,
      getLabelFromProperty,
      handleToggleExpand,
    };
  },
});
</script>
