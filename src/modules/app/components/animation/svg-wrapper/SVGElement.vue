<template>
  <g
    :id="id"
    :class="[SVG_ELEMENT_PREFIX, element.type].join('-')"
    :style="{
      transform: elementTransform,
      transformOrigin: transform.transformOrigin,
      transformBox: 'fill-box',
    }"
  >
    <slot />
  </g>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
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
      default: () => ({}),
    },
    element: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const elementTransform = computed(() =>
      [
        props.transform.translate
          ? `translate(${props.transform.translate.translateX}px,${props.transform.translate.translateY}px)`
          : "",
        props.transform.scale
          ? `scale(${props.transform.scale.scaleX},${props.transform.scale.scaleY})`
          : "",
        props.transform.rotate ? `rotate(${props.transform.rotate}deg)` : "",
        props.transform.skew
          ? `skew(${props.transform.skew.skewX}deg,${props.transform.skew.skewY}deg)`
          : "",
      ].join(" "),
    );

    return {
      SVG_ELEMENT_PREFIX,
      elementTransform,
    };
  },
});
</script>
