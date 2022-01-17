<template>
  <div
    :class="[
      appMode === APP_MODE.MAIN && $style.mainLayoutWrapper,
      appMode === APP_MODE.SVG && $style.svgLayoutWrapper,
    ]"
  >
    <div :class="$style.layoutHeader">Header</div>
    <div :class="$style.layoutLeft">
      <div class="h-28 bg-primary-500">
        <Navigator />
      </div>
      <transition
        mode="out-in"
        enter-active-class="animated slideInLeft"
        leave-active-class="animated slideOutLeft"
      >
        <div v-if="appMode === APP_MODE.MAIN" class="bg-dark-600">
          <TransitionPanel />
        </div>
        <div v-else class="bg-dark-600">
          <AnimationPanel />
        </div>
      </transition>
    </div>
    <div :class="$style.layoutBody">
      <transition
        mode="out-in"
        enter-active-class="animated flipInX"
        leave-active-class="animated flipOutX"
      >
        <div v-if="appMode === APP_MODE.MAIN" class="bg-dark-800">
          <TransitionToolbar />
        </div>
        <div v-else class="bg-dark-800">
          <AnimationToolbar />
        </div>
      </transition>
      <transition
        mode="out-in"
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
      >
        <div v-if="appMode === APP_MODE.MAIN" class="relative dark:bg-dark-500 bg-white">
          <CanvasBackgroundToggle />
          <TransitionCanvas :time="currentTime" />
        </div>
        <div v-else class="relative bg-dark-500 overflow-auto">
          <CanvasBackgroundToggle />
          <AnimationCanvas :time="currentTime" />
        </div>
      </transition>
      <transition
        mode="out-in"
        enter-active-class="animated flipInX"
        leave-active-class="animated flipOutX"
      >
        <div v-if="appMode === APP_MODE.MAIN" class="bg-dark-500">
          <TransitionTimeline />
        </div>
      </transition>
    </div>
    <div :class="$style.layoutRight">
      <transition
        mode="out-in"
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
      >
        <div v-if="appMode === APP_MODE.MAIN" class="bg-dark-600">
          <CodeGenerator />
        </div>
        <div v-else class="bg-dark-600">
          <AnimationPanel />
        </div>
      </transition>
    </div>
    <div v-if="appMode === APP_MODE.SVG" :class="$style.layoutFooter">
      <transition
        mode="out-in"
        enter-active-class="animated slideInUp"
        leave-active-class="animated slideOutDown"
      >
        <AnimationTimeline />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, provide, ref } from "vue";

import { APP_MODE } from "@core/constants/navigator";
import { useLazyStore } from "@/core/use/useLazyStore";

import { useAppMode } from "./use/useAppMode";
import { appStoreModule } from "./store";

export default defineComponent({
  name: "AppPage",
  components: {
    CanvasBackgroundToggle: defineAsyncComponent(() => import("./components/canvas-toggle-bg.vue")),
    CodeGenerator: defineAsyncComponent(() => import("./components/code/generator.vue")),
    // eslint-disable-next-line vue/no-unused-components
    Header: defineAsyncComponent(() => import("./components/header/header.vue")),
    // eslint-disable-next-line vue/no-unused-components
    LayerTree: defineAsyncComponent(() => import("./components/tree/layer.vue")),
    Navigator: defineAsyncComponent(() => import("./components/navigator/navigator.vue")),
    TransitionToolbar: defineAsyncComponent(() => import("./components/transition/toolbar.vue")),
    TransitionCanvas: defineAsyncComponent(() => import("./components/transition/canvas.vue")),
    TransitionPanel: defineAsyncComponent(() => import("./components/transition/panel.vue")),
    TransitionTimeline: defineAsyncComponent(() => import("./components/transition/timeline.vue")),
    AnimationToolbar: defineAsyncComponent(() => import("./components/animation/toolbar.vue")),
    AnimationCanvas: defineAsyncComponent(() => import("./components/animation/canvas.vue")),
    AnimationPanel: defineAsyncComponent(() => import("./components/animation/panel.vue")),
    AnimationTimeline: defineAsyncComponent(() => import("./components/animation/timeline.vue")),
  },
  setup() {
    const { appMode } = useAppMode();

    const currentTime = ref(1000);

    provide("currentTime", currentTime);

    useLazyStore("app", appStoreModule);

    return {
      APP_MODE,
      appMode,
      currentTime,
    };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";

.layoutHeader {
  grid-area: header;
  background-color: color(gray, 900);
}
.layoutRight {
  grid-area: right;
  overflow-y: auto;
}
.layoutLeft {
  grid-area: left;
  overflow-y: auto;
}
.layoutBody {
  grid-area: body;
  display: grid;
  grid-template-rows: 7rem auto 2.25rem;
}
.layoutFooter {
  grid-area: footer;
}
.mainLayoutWrapper {
  display: grid;
  grid-template-columns: 13rem auto 20rem;
  grid-template-rows: 1.25rem auto;
  grid-template-areas:
    "header header header"
    "left body right";
  overflow: hidden;
  background-color: color(dark, 600);

  @include size(100vw, 100vh);
}

.svgLayoutWrapper {
  display: grid;
  grid-template-columns: 13rem auto 20rem;
  grid-template-rows: 1.25rem auto 200px;
  grid-template-areas:
    "header header header"
    "left body right"
    "footer footer footer";
  overflow: hidden;

  @include size(100vw, 100vh);

  .layoutBody {
    grid-template-rows: 2.25rem auto;
    overflow-y: auto;
  }
}
</style>
