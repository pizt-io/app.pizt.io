<template>
  <div>
    <div class="va-layer__item">
      <i class="icon icon-va-ellipsis-v handle" />
      <span class="text">{{ modelValue.name }}</span>
      <span :class="[expanded && 'va__active', 'va-expanded__toggle']" @click="handleToggleExpand">
        <i class="icon-va-chevron-up" />
      </span>
    </div>
    <div v-if="expanded" class="va-expanded__wrapper">
      <LayerItemExpanded
        v-for="property in changedProperties"
        :key="property"
        :property="property"
        :label="getLabelFromProperty(property)"
        :stages="Object.values(modelValue.stages)"
        @change="handleChangeLayerItem"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { LayerItemStage, STAGE_PROPERTY_PREFIX } from "../../types/layer";
import { useTimeline } from "../../use/useTimeline";

import LayerItemExpanded from "./layer-item/layer-item-expanded.vue";

export default defineComponent({
  components: { LayerItemExpanded },
  props: {
    expanded: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:modelValue", "expand"],
  setup(props, { emit }) {
    const { changedProperties, getLabelFromProperty } = useTimeline(props.modelValue);

    const handleToggleExpand = () => {
      emit("expand", {
        _id: props.modelValue._id,
        expanded: !props.expanded,
      });
    };

    const handleChangeLayerItem = (payload: Event) => {
      const _payload = payload as unknown as LayerItemStage;

      emit(
        "update:modelValue",
        {
          ...props.modelValue,
          stages: {
            ...props.modelValue.stages,
            [STAGE_PROPERTY_PREFIX[_payload.property] + _payload.time]: _payload,
          },
        },
        _payload.property,
      );
    };

    return {
      changedProperties,
      getLabelFromProperty,
      handleToggleExpand,
      handleChangeLayerItem,
    };
  },
});
</script>
