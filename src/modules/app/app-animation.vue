<template>
  <AppDefaultLayout :mode="APP_MODE.SVG">
    <template v-slot:app-navigator>
      <Navigator />
    </template>
    <template v-slot:toolbar-animation>
      <AnimationToolbar />
    </template>
    <template v-slot:canvas-animation>
      <AnimationCanvas v-on="svgCanvasHandlers" :key="forceUpdateFlag" :time="currentTime" />
    </template>
    <template v-slot:timeline-animation>
      <AnimationTimeline
        v-on="svgTimelineHandlers"
        ref="animationTimelineRef"
        :time="currentTime"
      />
    </template>
  </AppDefaultLayout>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { defineAsyncComponent, defineComponent, onMounted, provide, ref } from "vue";

import { SVG_CANVAS_EVENT } from "@core/constants/svg";

import { APP_MODE } from "@core/constants/navigator";

import { useStore } from "vuex";

import AppDefaultLayout from "./layout/default.vue";

import AnimationToolbar from "./components/animation/toolbar.vue";
import AnimationCanvas from "./components/animation/canvas.vue";
import AnimationTimeline from "./components/animation/timeline.vue";
import { useRerenderer } from "@/core/use/useRerenderer";

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

    const animationTimelineRef = ref(null);

    const { forceUpdate, forceUpdateFlag } = useRerenderer();

    const _updateTimelineElements = (payload?: any) => {
      if (payload) {
        store.dispatch("app/updateElements", payload);
      }

      const animationTimelineElement = animationTimelineRef.value as any;

      if (animationTimelineElement) {
        animationTimelineElement.updateElements();
      }
    };

    const _updateCanvasElements = (payload?: any) => {
      if (payload) {
        store.dispatch("app/updateElements", payload);
      }

      forceUpdate();
    };

    // Fetch data from backend
    const _getCanvasDataOnce = async () => {
      await store.dispatch("app/getElements");

      _updateCanvasElements();
      _updateTimelineElements();
    };
    onMounted(_getCanvasDataOnce);

    const _updateCurrentTime = (time: number) => {
      currentTime.value = time;
    };

    const svgCanvasHandlers = {
      [SVG_CANVAS_EVENT.UPDATE]: _updateTimelineElements,
    };

    const svgTimelineHandlers = {
      [SVG_CANVAS_EVENT.UPDATE]: _updateCanvasElements,
      [SVG_CANVAS_EVENT.UPDATE_TIME]: _updateCurrentTime,
    };

    return {
      currentTime,
      svgCanvasHandlers,
      svgTimelineHandlers,
      animationTimelineRef,
      APP_MODE,
      forceUpdateFlag,
    };
  },
});
</script>
