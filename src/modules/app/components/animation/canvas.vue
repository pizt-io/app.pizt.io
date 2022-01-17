<template>
  <div class="w-full h-full flex justify-center items-center">
    <div
      :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }"
      class="bg-white dark:bg-gray-800"
    >
      <SVGCanvas ref="canvasRef" :key="forceUpdateFlag" :data="elements" v-on="svgCanvasHandlers" />
    </div>
  </div>
</template>

<script lang="ts">
// PERFORMANCE NOTICE:
// DEVTOOL CAN SOMETIME NOT DETECT CHANGES IN THE COMPONENT DUE TO HUGE AND DEEPLY NESTED DATA CHANGES

import { ComponentPublicInstance, computed, defineAsyncComponent, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRerenderer } from "@/core/use/useRerenderer";
import { SVG_CANVAS_EVENT } from "@/core/constants/svg";

import _isEqual from "lodash/isEqual";
import _cloneDeep from "lodash/cloneDeep";

export default defineComponent({
  name: "AnimationCanvas",
  components: {
    SVGCanvas: defineAsyncComponent(
      () => import("@/modules/app/components/animation/svg/SVGCanvas.vue"),
    ),
  },
  setup() {
    const canvasRef = ref<ComponentPublicInstance | null>(null);

    const store = useStore();

    const canvasWidth = ref(700);
    const canvasHeight = ref(450);

    const elements = ref<any[]>([]);

    const hasUnsyncedDataFromOtherUser = ref(false);

    const { forceUpdate, forceUpdateFlag } = useRerenderer();

    const _canvasElements = computed(() => _cloneDeep(store.getters["app/getCanvasElements"]));

    const _updateCanvasDataFromStore = () => {
      elements.value = _canvasElements.value;

      // data change
      // update to database
      // api returns data from database to make sure that data is synced
      // if those data are not equal, they're unsynced, notify user
      hasUnsyncedDataFromOtherUser.value = !_isEqual(elements.value, _canvasElements.value);
    };

    // Fetch data from backend
    const _getCanvasDataOnce = async () => {
      await store.dispatch("app/getElements");

      _updateCanvasDataFromStore();
      forceUpdate();
    };
    _getCanvasDataOnce();

    const fileSize = ref("");
    const _calculateFileSize = () => {
      fileSize.value = `${((canvasRef.value?.$el?.innerHTML.length || 0) / 1024).toFixed(2)} Kb`;
    };

    const svgCanvasHandlers = {
      [SVG_CANVAS_EVENT.UPDATE]: async ({ elements, path }: { elements: any[]; path: string }) => {
        _calculateFileSize();
        // eslint-disable-next-line no-console
        console.log("File size:", fileSize.value);
        await store.dispatch("app/updateElements", { elements, path });
      },
    };

    return {
      elements,
      canvasRef,
      canvasWidth,
      canvasHeight,
      fileSize,
      forceUpdateFlag,
      hasUnsyncedDataFromOtherUser,
      svgCanvasHandlers,
    };
  },
});
</script>
