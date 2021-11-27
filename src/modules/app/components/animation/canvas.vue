<template>
  <div class="w-full h-full flex justify-center items-center">
    <div :style="{ width: '800px', height: '600px' }" class="bg-white">
      <SVGCanvas :elements="elements" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useSVGScaffolder } from '@/modules/app/use/svg/useSVGScaffolder'
import SVGCanvas from '@core/components/SVGCanvas.vue';

export default defineComponent({
  name: 'AnimationCanvas',
  components: {
    SVGCanvas
  },
  setup(props) {
    const { ellipse, rect, line } = useSVGScaffolder();

    const elements = ref([
      ellipse({ x: 150, y: 100 }, { width: 100, height: 50 }, { translateX: 0, translateY: 0},  { fill: '#f04337' }),
      rect({ x: 250, y: 300 }, { width: 100, height: 50 }, { translateX: 100, translateY: 0},  { fill: '#f04337' }),
      ellipse({ x: 200, y: 250 }, { width: 70, height: 50 }, { translateX: 100, translateY: 100},  { fill: '#f04337' }),
      line([{ x: 300, y: 50 }, { x: 450, y: 150 }], { translateX: 0, translateY: 0}, { stroke: '#f04337' }),
      line([{ x: 600, y: 50 }, { x: 550, y: 150 }], { translateX: 0, translateY: 0}, { stroke: '#f04337' }, true),
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
