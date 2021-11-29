<template>
  <div class="w-full h-full flex justify-center items-center">
    <div :style="{ width: '800px', height: '600px' }" class="bg-white dark:bg-gray-800">
      <SVGCanvas :elements="elements" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useSVGConverter } from '@modules/app/use/svg/converter'
import SVGCanvas from '@/modules/app/components/animation/svg/SVGCanvas.vue';

import { canvas } from '@/mock/canvas'

export default defineComponent({
  name: 'AnimationCanvas',
  components: {
    SVGCanvas
  },
  setup(props) {
    const { convertDataToElements } = useSVGConverter();

    const elements = ref(convertDataToElements(canvas));

    return {
      elements,
    }
  }
})
</script>
