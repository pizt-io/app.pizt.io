<template>
  <div :class="$style.cubicBezierContainer">
    <span :class="$style.cubicBezierYAxis">PROGRESSION</span>
    <canvas
      ref="canvasRef"
      :class="$style.cubicBezierInner"
      width="160"
      height="160"
      v-on="canvasHandlers"
    />
    <span :class="$style.cubicBezierXAxis">TIME</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { CanvasElementList, useCanvas } from '@use/useCanvas'

export default defineComponent({
  props: {},
  setup(props) {
    const canvasRef = ref<HTMLCanvasElement | null>(null);
    const canvasHandlers = ref({})

    onMounted(() => {
      const canvas = canvasRef.value;

      if (canvas) {
        const {
          canvasWidth,
          canvasHeight,
          drawLine,
          drawCircle,
          onMouseDown,
          onMouseMove,
          onMouseUp,
        } = useCanvas(canvas);

        canvasHandlers.value = {
          touchstart: onMouseDown,
          touchmove: onMouseMove,
          ontouchend: onMouseUp,
          mousedown: onMouseDown,
          mousemove: onMouseMove,
          mouseup: onMouseUp,
        }

        const numberOfLines = 10;

        // Draw 10 background lines
        for (let index = 0; index < numberOfLines; index++) {
          let line = [
            { x: 0, y: index * (canvasWidth / (numberOfLines - 1)) },
            { x: canvasWidth * 2, y: index * (canvasWidth / (numberOfLines - 1)) },
          ]
          drawLine(line, true);
        }

        // Draw the root coordinate
        drawCircle({ x: 0, y: canvasHeight }, 50, true);
        drawCircle({ x: canvasWidth, y: 0 }, 50, true);
      }
    })

    return {
      canvasRef,
      canvasHandlers,
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
