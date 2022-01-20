<template>
  <g
    :id="id"
    :class="[SVG_ELEMENT_PREFIX, element.tag].join('-')"
    :transform="`translate(${transform.translateX}, ${transform.translateY})`"
  >
    <slot />
  </g>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { SVG_ELEMENT_PREFIX } from "@core/constants/svg";

export default defineComponent({
  name: "SVGElement",
  props: {
    id: {
      type: String,
      default: "",
    },
    index: {
      type: Number,
      default: 0,
    },
    transform: {
      type: Object,
      default: () => ({ translateX: 0, translateY: 0 }),
    },
    element: {
      type: Object,
      default: () => ({}),
    },
  },
  setup() {
    return {
      SVG_ELEMENT_PREFIX,
    };
  },
});
</script>
