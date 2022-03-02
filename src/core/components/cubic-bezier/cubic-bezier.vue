<template>
  <div :class="$style.cubicBezierContainer">
    <span :class="$style.cubicBezierYAxis">PROGRESSION</span>
    <div :class="$style.cubicBezierInner">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        :viewBox="[0, 0, width, height].join(' ')"
      >
        <g id="bg">
          <line
            v-for="i in 10"
            :key="'l-' + i"
            x1="0"
            :x2="width"
            :y1="(height * i) / 10"
            :y2="(height * i) / 10"
            style="stroke: var(--color-gray-400); stroke-width: 1"
          />
          <line
            x1="0"
            :y1="height"
            :x2="width"
            y2="0"
            style="stroke: var(--color-gray-400); stroke-width: 1"
          />
          <!-- Cubic bezier curve -->
          <path
            :d="`M 0 ${height} C ${model.x1 * width} ${(1 - model.y1) * height} ${
              model.x2 * width
            } ${(1 - model.y2) * height} ${width} 0`"
            style="fill: transparent; stroke: var(--color-gray-800); stroke-width: 3"
          />
          <!-- Handle 1 -->
          <line
            x1="0"
            :y1="height"
            :x2="model.x1 * width"
            :y2="(1 - model.y1) * height"
            style="stroke: var(--color-gray-600); stroke-width: 3"
          />
          <!-- Handle 2 -->
          <line
            :x1="width"
            y1="0"
            :x2="model.x2 * width"
            :y2="(1 - model.y2) * height"
            style="stroke: var(--color-gray-600); stroke-width: 3"
          />
          <g :transform="`translate(${model.x1 * width}, ${(1 - model.y1) * height})`">
            <circle
              cx="0"
              cy="0"
              r="4"
              style="fill: var(--color-gray-200); cursor: pointer"
              @mousedown="handleMouseDownHandle1"
            />
          </g>
          <g :transform="`translate(${model.x2 * width}, ${(1 - model.y2) * height})`">
            <circle
              cx="0"
              cy="0"
              r="4"
              style="fill: var(--color-gray-200); cursor: pointer"
              @mousedown="handleMouseDownHandle2"
            />
          </g>
        </g>
      </svg>
    </div>
    <span :class="$style.cubicBezierXAxis">TIME</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted, ref } from "vue";

import _debounce from "lodash/debounce";
import { minMax } from "../vue-timeline-animation/src/utils/minMax";

export default defineComponent({
  name: "CubicBezier",
  props: {
    modelValue: {
      type: String,
      default: "0.42,0.69,0.69,0.42",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const width = 160;
    const height = 160;

    const model = ref({
      x1: 0.42,
      y1: 0.69,
      x2: 0.69,
      y2: 0.42,
    });
    onBeforeMount(() => {
      const [x1, y1, x2, y2] = props.modelValue.split(",");
      model.value = {
        x1: parseFloat(x1),
        y1: parseFloat(y1),
        x2: parseFloat(x2),
        y2: parseFloat(y2),
      };
    });

    const _updateModel = _debounce(function () {
      model.value.x1 = Math.round(model.value.x1 * 100) / 100;
      model.value.y1 = Math.round(model.value.y1 * 100) / 100;
      model.value.x2 = Math.round(model.value.x2 * 100) / 100;
      model.value.y2 = Math.round(model.value.y2 * 100) / 100;

      emit(
        "update:modelValue",
        [model.value.x1, model.value.y1, model.value.x2, model.value.y2].join(","),
      );
    }, 100);

    const isMouseDownHandle1 = ref(false);
    const isMouseDownHandle2 = ref(false);

    const handleMouseDownHandle1 = () => {
      isMouseDownHandle1.value = true;
    };
    const handleMouseDownHandle2 = () => {
      isMouseDownHandle2.value = true;
    };

    const handleMouseUp = () => {
      isMouseDownHandle1.value = false;
      isMouseDownHandle2.value = false;
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (isMouseDownHandle1.value) {
        model.value.x1 += e.movementX / width;
        model.value.y1 -= e.movementY / height;
        model.value.x1 = minMax(0, 1, model.value.x1);
        model.value.y1 = minMax(0, 1, model.value.y1);
      } else if (isMouseDownHandle2.value) {
        model.value.x2 += e.movementX / width;
        model.value.y2 -= e.movementY / height;
        model.value.x2 = minMax(0, 1, model.value.x2);
        model.value.y2 = minMax(0, 1, model.value.y2);
      }
      _updateModel();
    };

    onMounted(() => {
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("mousemove", handleMouseMove);
    });

    return {
      width,
      height,
      model,
      handleMouseDownHandle1,
      handleMouseDownHandle2,
    };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";

.cubicBezierContainer {
  display: grid;
  grid-template-columns: 20px auto;
  grid-template-rows: auto;
  grid-template-areas:
    "y main"
    "y x";

  @include size(180px);
}
.cubicBezierInner {
  grid-area: main;
  background-color: color(gray);

  @include size(160px);

  * {
    transition: initial !important;
  }
}
.cubicBezierXAxis {
  display: block;
  grid-area: x;
  color: color(gray);
  font-size: $font-size-small;
}
.cubicBezierYAxis {
  display: block;
  grid-area: y;
  color: color(gray);
  font-size: $font-size-small;
  writing-mode: vertical-lr;
}
</style>
