<template>
  <div class="w-full h-full flex justify-center items-center">
    <div
      :style="{ width: canvasWidth + 'px', height: canvasHeight + 'px' }"
      class="bg-white dark:bg-gray-800"
    >
      <SVGCanvas ref="canvasRef" :key="forceUpdateCanvasFlag" :data="elements" />
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
  ref,
  watch,
} from "vue";
import { useStore } from "vuex";

import _debounce from "lodash/debounce";
import _isEqual from "lodash/isEqual";

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

    const forceUpdateCanvasFlag = ref(0);

    const elements = ref<any[]>([]);

    const hasUnsyncedDataFromOtherUser = ref(false);

    const _forceRerenderCanvas = () => {
      forceUpdateCanvasFlag.value++;
    };

    const _canvasElements = computed(() => store.getters["app/getCanvasElements"]);

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
      _forceRerenderCanvas();
    };
    _getCanvasDataOnce();

    const _updateCanvasDataToDatabase = async () => {
      // TODO(BUG): This update the data without convertElementsToData()
      await store.dispatch("app/updateElements", elements.value);

      _updateCanvasDataFromStore();
    };

    const fileSize = ref("");
    const _calculateFileSize = () => {
      fileSize.value = `${((canvasRef.value?.$el?.innerHTML.length || 0) / 1024).toFixed(2)} Kb`;
    };

    watch(
      () => elements.value,
      _debounce(function () {
        _updateCanvasDataToDatabase();
        _calculateFileSize();
        // eslint-disable-next-line no-console
        console.log("File size:", fileSize.value);
      }, 1500),
      { deep: true },
    );

    return {
      elements,
      canvasRef,
      canvasWidth,
      canvasHeight,
      fileSize,
      forceUpdateCanvasFlag,
      hasUnsyncedDataFromOtherUser,
    };
  },
});
</script>
