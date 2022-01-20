<template>
  <AppDefaultLayout :mode="APP_MODE.SVG">
    <template v-slot:app-navigator>
      <Navigator />
    </template>
    <template v-slot:panel-animation>
      <AnimationPanel />
    </template>
    <template v-slot:toolbar-animation>
      <AnimationToolbar />
    </template>
    <template v-slot:canvas-animation>
      <AnimationCanvas :time="currentTime" v-on="svgCanvasHandlers" />
    </template>
    <template v-slot:timeline-animation>
      <AnimationTimeline
        ref="animationTimelineRef"
        :time="currentTime"
        @change-time="handleChangeCurrentTime"
      />
    </template>
  </AppDefaultLayout>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, provide, ref, Ref } from "vue";

import { SVG_CANVAS_EVENT } from "@/core/constants/svg";

import { APP_MODE } from "@core/constants/navigator";

import AppDefaultLayout from "./layout/default.vue";

export default defineComponent({
  name: "AppAnimation",
  components: {
    AppDefaultLayout,
    // eslint-disable-next-line vue/no-unused-components
    Header: defineAsyncComponent(() => import("./components/header/header.vue")),
    // eslint-disable-next-line vue/no-unused-components
    LayerTree: defineAsyncComponent(() => import("./components/tree/layer.vue")),
    Navigator: defineAsyncComponent(() => import("./components/navigator/navigator.vue")),
    AnimationToolbar: defineAsyncComponent(() => import("./components/animation/toolbar.vue")),
    AnimationCanvas: defineAsyncComponent(() => import("./components/animation/canvas.vue")),
    AnimationPanel: defineAsyncComponent(() => import("./components/animation/panel.vue")),
    AnimationTimeline: defineAsyncComponent(() => import("./components/animation/timeline.vue")),
  },
  setup() {
    const currentTime = ref(1000);

    provide("currentTime", currentTime);

    const handleChangeCurrentTime = (time: Ref<number>) => {
      currentTime.value = time.value;
    };

    const animationTimelineRef = ref(null);
    const svgCanvasHandlers = {
      [SVG_CANVAS_EVENT.UPDATE]: async () => {
        const animationTimelineElement = animationTimelineRef.value as any;

        if (animationTimelineElement) {
          animationTimelineElement.updateElementsFromStore();
        }
      },
    };

    return {
      currentTime,
      handleChangeCurrentTime,
      svgCanvasHandlers,
      animationTimelineRef,
      APP_MODE,
    };
  },
});
</script>
