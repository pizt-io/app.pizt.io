<template>
  <g
    :id="id"
    :class="[SVG_ELEMENT_PREFIX, element.tag].join('-')"
    :transform="`translate(${element.stages[time].transform.translateX}, ${element.stages[time].transform.translateY})`"
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
    time: {
      type: Number,
      default: 0,
    },
    element: {
      type: Object,
      default: () => {},
    },
  },
  setup() {
    return {
      SVG_ELEMENT_PREFIX,
    };
  },
});
</script>
