<template>
  <AppDefaultLayout :mode="APP_MODE.SVG">
    <template v-slot:app-navigator>
      <Navigator />
    </template>
    <template v-slot:toolbar-animation>
      <AnimationToolbar />
    </template>
    <template v-slot:canvas-animation>
      <AnimationCanvas ref="animationCanvasRef" :time="currentTime" v-on="svgCanvasHandlers" />
    </template>
    <template v-slot:timeline-animation>
      <AnimationTimeline
        ref="animationTimelineRef"
        :time="currentTime"
        @change-time="handleChangeCurrentTime"
        @change-elements="handleChangeElements"
      />
    </template>
  </AppDefaultLayout>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, onMounted, provide, ref } from "vue";

import { SVG_CANVAS_EVENT, SVG_UPDATE_TYPE } from "@core/constants/svg";

import { APP_MODE } from "@core/constants/navigator";

import { useStore } from "vuex";

import AppDefaultLayout from "./layout/default.vue";

import AnimationToolbar from "./components/animation/toolbar.vue";
import AnimationCanvas from "./components/animation/canvas.vue";
import AnimationTimeline from "./components/animation/timeline.vue";

export default defineComponent({
  name: "AppAnimation",
  components: {
    AppDefaultLayout,
    // eslint-disable-next-line vue/no-unused-components
    Header: defineAsyncComponent(() => import("./components/header/header.vue")),
    // eslint-disable-next-line vue/no-unused-components
    LayerTree: defineAsyncComponent(() => import("./components/tree/layer.vue")),
    Navigator: defineAsyncComponent(() => import("./components/navigator/navigator.vue")),
    AnimationToolbar,
    AnimationCanvas,
    AnimationTimeline,
  },
  setup() {
    const store = useStore();

    const currentTime = ref(1000);

    provide("currentTime", currentTime);

    const _updateCanvasElementsFromStore = (updatePayload?: any) => {
      const animationCanvasElement = animationCanvasRef.value as any;

      if (animationCanvasElement) {
        animationCanvasElement.updateElementsFromStore(updatePayload);
      }
    };

    const _updateTimelineElements = (updatePayload?: any) => {
      const animationTimelineElement = animationTimelineRef.value as any;

      if (animationTimelineElement) {
        animationTimelineElement.updateElements(
          updatePayload && Object.values(updatePayload?.elements),
        );
      }
    };

    // Fetch data from backend
    const animationCanvasRef = ref(null);
    const _getCanvasDataOnce = async () => {
      await store.dispatch("app/getElements");

      _updateCanvasElementsFromStore();
      _updateTimelineElements();
    };
    onMounted(_getCanvasDataOnce);

    const handleChangeCurrentTime = (time: number) => {
      currentTime.value = time;
    };

    const handleChangeElements = (...args: any[]) => {
      const [element, index, path] = args;

      store.dispatch("app/updateElements", {
        elements: [element],
        indexes: [index],
        path,
        type: SVG_UPDATE_TYPE.TIMELINE,
      });

      _updateCanvasElementsFromStore();
    };

    const animationTimelineRef = ref(null);
    const svgCanvasHandlers = {
      [SVG_CANVAS_EVENT.UPDATE]: _updateTimelineElements,
    };

    return {
      currentTime,
      handleChangeCurrentTime,
      handleChangeElements,
      svgCanvasHandlers,
      animationCanvasRef,
      animationTimelineRef,
      APP_MODE,
    };
  },
});
</script>
