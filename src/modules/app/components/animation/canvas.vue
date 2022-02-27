<template>
  <div class="flex justify-center items-center" :key="forceUpdateFlag">
    <div
      :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }"
      class="bg-white dark:bg-gray-800"
    >
      <SVGCanvas
        v-model:modelElements="canvasElements"
        ref="canvasRef"
        :time="time"
        @select="$emit(SVG_CANVAS_EVENT.SELECT, $event)"
        @deselect="$emit(SVG_CANVAS_EVENT.DESELECT, $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
// PERFORMANCE NOTICE:
// DEVTOOL CAN SOMETIME NOT DETECT CHANGES IN THE COMPONENT DUE TO HUGE AND DEEPLY NESTED DATA CHANGES

import {
  ComponentPublicInstance,
  computed,
  defineAsyncComponent,
  defineComponent,
  getCurrentInstance,
  ref,
} from "vue";
import { useStore } from "vuex";
import { SVG_CANVAS_EVENT, SVG_UPDATE_TYPE } from "@/core/constants/svg";
import { useRerenderer } from "@/core/use/useRerenderer";

export default defineComponent({
  name: "AnimationCanvas",
  components: {
    SVGCanvas: defineAsyncComponent(
      () => import("@/modules/app/components/animation/svg-wrapper/SVGCanvas.vue"),
    ),
  },
  props: {
    time: {
      type: Number,
      default: 0,
    },
  },
  setup(props, { emit }) {
    const vm = getCurrentInstance()?.proxy;

    const canvasRef = ref<ComponentPublicInstance | null>(null);

    const store = useStore();

    const canvasWidth = ref(700);
    const canvasHeight = ref(450);
    const hasUnsyncedDataFromOtherUser = ref(false);

    const canvasElements = computed({
      get: () => store.getters["app/getElements"],
      set: ({ elements, path }) => {
        emit(SVG_CANVAS_EVENT.UPDATE, { elements, path, type: SVG_UPDATE_TYPE.CANVAS });
      },
    });

    const { forceUpdate, forceUpdateFlag } = useRerenderer();

    const updateElements = () => {
      vm?.$nextTick(forceUpdate);
    };

    return {
      SVG_CANVAS_EVENT,
      canvasElements,
      canvasRef,
      canvasWidth,
      canvasHeight,
      hasUnsyncedDataFromOtherUser,
      updateElements,
      forceUpdateFlag,
    };
  },
});
</script>
