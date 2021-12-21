<script lang="ts">
import { defineComponent, h } from "vue";

import LayerOpacityInputItem from "./layer-property-input-item/layer-opacity-input-item.vue";
import LayerPositionInputItem from "./layer-property-input-item/layer-position-input-item.vue";
import LayerSizeInputItem from "./layer-property-input-item/layer-size-input-item.vue";
import LayerRotationInputItem from "./layer-property-input-item/layer-rotation-input-item.vue";
import LayerColorInputItem from "./layer-property-input-item/layer-color-input-item.vue";
import LayerBackgroundColorInputItem from "./layer-property-input-item/layer-background-color-input-item.vue";

enum SUPPORT_PROPERTIES {
  opacity = "opacity",
  position = "position",
  size = "size",
  rotation = "rotation",
  color = "color",
  backgroundColor = "backgroundColor",
}

const INPUT_COMPONENT_MAPPING = Object.freeze({
  [SUPPORT_PROPERTIES.opacity]: LayerOpacityInputItem,
  [SUPPORT_PROPERTIES.position]: LayerPositionInputItem,
  [SUPPORT_PROPERTIES.size]: LayerSizeInputItem,
  [SUPPORT_PROPERTIES.rotation]: LayerRotationInputItem,
  [SUPPORT_PROPERTIES.color]: LayerColorInputItem,
  [SUPPORT_PROPERTIES.backgroundColor]: LayerBackgroundColorInputItem,
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
  },
  setup(props) {
    const _property = props.property as SUPPORT_PROPERTIES;

    return () =>
      h("div", { class: "va-expanded__item" }, [
        h("span", { class: "text" }, props.label),
        h(INPUT_COMPONENT_MAPPING[_property]),
      ]);
  },
});
</script>
