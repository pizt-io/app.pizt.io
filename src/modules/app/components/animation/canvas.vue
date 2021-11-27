<template>
  <div class="w-full h-full flex justify-center items-center">
    <div :style="{ width: '800px', height: '600px' }" class="bg-white">
      <SVGCanvas :elements="elements" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useSVGScaffolder } from '@modules/app/use/svg/useSVGScaffolder'
import { useSVGPathScaffolder } from '@modules/app/use/svg/useSVGPathScaffolder'
import SVGCanvas from '@core/components/SVGCanvas.vue';

export default defineComponent({
  name: 'AnimationCanvas',
  components: {
    SVGCanvas
  },
  setup(props) {
    const { ellipse, rect, line, path, polygon, polyline } = useSVGScaffolder();
    const { moveTo, lineTo, cubicBezier, quadBezier, arc, closePath } = useSVGPathScaffolder();

    const elements = ref([
      ellipse({ x: 150, y: 100 }, { width: 100, height: 50 }, { translateX: 0, translateY: 0},  { fill: '#f04337' }),
      rect({ x: 250, y: 300 }, { width: 100, height: 50 }, { translateX: 0, translateY: 0},  { fill: '#f04337' }),
      ellipse({ x: 200, y: 250 }, { width: 70, height: 50 }, { translateX: 0, translateY: 0},  { fill: '#f04337' }),
      line([{ x: 300, y: 50 }, { x: 450, y: 150 }], { translateX: 0, translateY: 0}, { stroke: '#f04337' }),
      line([{ x: 600, y: 50 }, { x: 550, y: 150 }], { translateX: 0, translateY: 0}, { stroke: '#f04337' }, true),
      path(
        [
          moveTo(10, 30),
          arc([20, 20], [0, 0, 1], [50, 30]),
          arc([20, 20], [0, 0, 1], [90, 30]),
          quadBezier([90, 60], [50, 90]),
          quadBezier([10, 60], [10, 30], closePath()),
        ],
        { translateX: 0, translateY: 200 },
        { fill: "#f04337" }
      ),
      path(
        [
          moveTo(17.4408, 50.9262),
          cubicBezier([58.1858, 96.2781], [15.5423, 31.5313], [52.4902, 5.57424]),
          cubicBezier([80.5298, -7.72511], [93.1865, 11.1156], [96.0099, 22.1984]),
          cubicBezier([87.6857, 35.1283], [77.4922, 60.8132], [103.312, 60.1132]),
          cubicBezier([135.587, 59.2383], [116.309, 99.7779], [103.312, 146.88]),
          cubicBezier([92.9139, 184.561], [46.0158, 137.984], [23.8666, 109.986]),
          cubicBezier([8.143, 75.1819], [-15.1551, 14.6446], [17.4408, 50.9262]),
          closePath()
        ],
        { translateX: 0, translateY: 400 },
        { fill: "#f04337" }
      ),
      polygon([[0,100], [50,25], [50,75], [100,0]], { translateX: 450, translateY: 300}, { fill: '#f04337' }),
      polyline([[0,100], [50,25], [50,75], [100,0]], { translateX: 650, translateY: 200}, { fill: 'none', stroke: '#f04337' }),
    ])

    return {
      elements,
    }
  }
})
</script>

<style lang="scss" module>
@import "@styles/all";


</style>
