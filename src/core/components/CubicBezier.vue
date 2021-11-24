<template>
  <div :class="$style.cubicBezierContainer">
    <span :class="$style.cubicBezierYAxis">PROGRESSION</span>
    <div
      ref="canvasRef"
      id="canvasCubicBezier"
      :class="$style.cubicBezierInner"
    />
    <span :class="$style.cubicBezierXAxis">TIME</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { CanvasElementList, useCanvas } from '@use/useCanvas';

import Interactive from "https://vectorjs.org/interactive.js";

export default defineComponent({
  model: {
    prop: "modelValue",
    event: "update:modelValue"
  },
  props: {
    modelValue: {
      type: String,
      default: '0.42,0.69,0.69,0.42'
    },
  },
  emits: ["input"],
  setup(props, { emit }) {
    const canvasRef = ref<HTMLCanvasElement | null>(null);

    onMounted(() => {
      const canvas = canvasRef.value;

      if (canvas) {
        // Construct an interactive within the HTML element with the id "my-interactive"
        let interactive = new Interactive("canvasCubicBezier");

        interactive.width = 160;
        interactive.height = 160;

        let baseLine = interactive.line(0, interactive.height, interactive.width, 0);
        baseLine.style.stroke = 'var(--color-gray-400)';
        baseLine.style.strokeWidth = 1;

        for (let index = 0; index < 10; index++) {
          const _temp = interactive.line(0, index * (interactive.height / (10 - 1)), interactive.width, index * (interactive.height / (10 - 1)));
          _temp.style.stroke = 'var(--color-gray-400)';
          _temp.style.strokeWidth = 1;
        }

        const _prev = (props.modelValue || '0.42,0.69,0.69,0.42').split(",");
        const previousValue = [
          { x: +_prev[0] * interactive.width, y: (1 - +_prev[1]) * interactive.height },
          { x: +_prev[2] * interactive.width, y: (1 - +_prev[3]) * interactive.height }
        ]

        let handle1 = interactive.control(previousValue[0].x, previousValue[0].y);
        let handlebar1 = interactive.line(0, interactive.height, handle1.x, handle1.y);
        handlebar1.style.stroke = 'var(--color-gray-600)';
        handlebar1.style.strokeWidth = 3;

        let handle2 = interactive.control(previousValue[1].x, previousValue[1].y);
        let handlebar2 = interactive.line(interactive.width, 0, handle2.x, handle2.y);
        handlebar2.style.stroke = 'var(--color-gray-600)';
        handlebar2.style.strokeWidth = 3;

        let path = interactive.path('');
        path.style.fill = 'transparent';
        path.style.stroke = 'var(--color-gray-800)';
        path.style.strokeWidth = 3;

        path.update = function () {
          path.d = `M 0 ${interactive.height} C ${handle1.x} ${handle1.y} ${handle2.x} ${handle2.y} ${interactive.width} 0`;
        };
        path.update();
        path.addDependency(handle1);
        path.addDependency(handle2);

        const _emitInputEvent = () => {
          const _value = [
            handle1.x / interactive.width,
            1 - handle1.y / interactive.height,
            handle2.x / interactive.width,
            1 - handle2.y / interactive.height,
          ].map(item => item.toFixed(2)).join(',');

          emit('update:modelValue', _value);
        }

        handlebar1.update = function () {
          this.x2 = handle1.x;
          this.y2 = handle1.y;
          _emitInputEvent();
        };
        handlebar1.addDependency(handle1);
        handlebar2.update = function () {
          this.x2 = handle2.x;
          this.y2 = handle2.y;
          _emitInputEvent();
        };
        handlebar2.addDependency(handle2);

        handle1.style.fill = "var(--color-gray-200)";
        handle2.style.fill = "var(--color-gray-200)";
        handle2.point.r = 4
        handle2.handle.r = 4
        handle1.point.r = 4
        handle1.handle.r = 4
      }
    })

    return {
      canvasRef,
    };
  },
});
</script>

<style>
/* @import "https://vectorjs.org/library.css"; */
</style>

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
