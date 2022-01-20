<script lang="ts">
import { defineComponent, h, inject, ref, Ref } from "vue";

import LayerOpacityInputItem from "./layer-property-input-item/layer-opacity-input-item.vue";
import LayerPositionInputItem from "./layer-property-input-item/layer-position-input-item.vue";
import LayerTransformInputItem from "./layer-property-input-item/layer-transform-input-item.vue";
import LayerSizeInputItem from "./layer-property-input-item/layer-size-input-item.vue";
import LayerRotationInputItem from "./layer-property-input-item/layer-rotation-input-item.vue";
import LayerColorInputItem from "./layer-property-input-item/layer-color-input-item.vue";
import LayerBackgroundColorInputItem from "./layer-property-input-item/layer-background-color-input-item.vue";
import { findStageBetweenStages } from "@/modules/app/utils/keyframes/findStageBetweenStages";

enum SUPPORT_PROPERTIES {
  opacity = "opacity",
  position = "position",
  transform = "transform",
  size = "size",
  rotation = "rotation",
  color = "color",
  fill = "fill",
}

const INPUT_COMPONENT_MAPPING = Object.freeze({
  [SUPPORT_PROPERTIES.opacity]: LayerOpacityInputItem,
  [SUPPORT_PROPERTIES.position]: LayerPositionInputItem,
  [SUPPORT_PROPERTIES.transform]: LayerTransformInputItem,
  [SUPPORT_PROPERTIES.size]: LayerSizeInputItem,
  [SUPPORT_PROPERTIES.rotation]: LayerRotationInputItem,
  [SUPPORT_PROPERTIES.color]: LayerColorInputItem,
  [SUPPORT_PROPERTIES.fill]: LayerBackgroundColorInputItem,
});

export default defineComponent({
  props: {
    label: {
      type: String,
      required: true,
    },
    property: {
      type: String,
      required: true,
    },
    stages: {
      type: Array,
      required: true,
    },
  },
  setup(props) {
    const currentTime = inject<Ref<number>>("currentTime", ref(0));

    const _property = props.property as SUPPORT_PROPERTIES;
    const _stages: any[] = props.stages.filter((st: any) => st.property === _property);

    const currentStage =
      _stages.find((st) => st.time === currentTime.value) ||
      findStageBetweenStages(_stages, currentTime.value, "value");

    return () =>
      h("div", { class: "va-expanded__item" }, [
        h("span", { class: "text" }, props.label),
        h(INPUT_COMPONENT_MAPPING[_property], {
          modelValue: currentStage.value,
        }),
      ]);
  },
});
</script>
