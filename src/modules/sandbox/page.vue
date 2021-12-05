<template>
  <div
    :class="[
      appMode === APP_MODE.MAIN && $style.mainLayoutWrapper,
      appMode === APP_MODE.SVG && $style.svgLayoutWrapper,
    ]"
  >
    <div style="grid-area: header" class="bg-gray-800">Header</div>
    <div style="grid-area: left" class="bg-red">
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
    <div style="grid-area: body" class="flex flex-col flex-1">
      <transition
        mode="out-in"
        enter-active-class="animated flipInX"
        leave-active-class="animated flipOutX"
      >
        <div v-if="appMode === APP_MODE.MAIN" class="h-28 bg-dark-800">
          <TransitionToolbar />
        </div>
        <div v-else class="h-28 bg-dark-800">
          <AnimationToolbar />
        </div>
      </transition>
      <transition
        mode="out-in"
        enter-active-class="animated zoomIn"
        leave-active-class="animated zoomOut"
      >
        <div v-if="appMode === APP_MODE.MAIN" class="flex-1 relative dark:bg-dark-500 bg-white">
          <CanvasBackgroundToggle />
          <TransitionCanvas />
        </div>
        <div v-else class="flex-1 relative bg-dark-500 bg-white">
          <CanvasBackgroundToggle />
          <AnimationCanvas />
        </div>
      </transition>
      <transition
        mode="out-in"
        enter-active-class="animated flipInX"
        leave-active-class="animated flipOutX"
      >
        <div v-if="appMode === APP_MODE.MAIN" class="h-9 bg-dark-500">
          <TransitionTimeline />
        </div>
      </transition>
    </div>
    <div style="grid-area: right" class="bg-yellow">
      <transition
        mode="out-in"
        enter-active-class="animated slideInRight"
        leave-active-class="animated slideOutRight"
      >
        <div v-if="appMode === APP_MODE.MAIN" class="h-full bg-dark-600">
          <CodeGenerator />
        </div>
        <div v-else class="h-full bg-dark-600">
          <AnimationPanel />
        </div>
      </transition>
    </div>
    <div v-if="appMode === APP_MODE.SVG" style="grid-area: footer" class="bg-purple">
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
/* eslint-disable */

import { APP_MODE } from "@core/constants/navigator";
import { defineComponent, onUnmounted } from "vue";

import CanvasBackgroundToggle from "@core/components/CanvasBackgroundToggle.vue";

// import Header from "@modules/app/components/header/header.vue";
// import LayerTree from "@modules/app/components/tree/layer.vue";
import CodeGenerator from "@modules/app/components/code/generator.vue";
import Navigator from "@modules/app/components/navigator/navigator.vue";

import TransitionToolbar from "@modules/app/components/transition/toolbar.vue";
import TransitionCanvas from "@modules/app/components/transition/canvas.vue";
import TransitionPanel from "@modules/app/components/transition/panel.vue";
import TransitionTimeline from "@modules/app/components/transition/timeline.vue";
import AnimationToolbar from "@modules/app/components/animation/toolbar.vue";
import AnimationCanvas from "@modules/app/components/animation/canvas.vue";
import AnimationPanel from "@modules/app/components/animation/panel.vue";
import AnimationTimeline from "@modules/app/components/animation/timeline.vue";

import { useAppMode } from "@modules/app/use/useAppMode";
import { useDark } from "@use/useDark";
import { useStore } from "vuex";
// import { appStoreModule } from "./store";

export default defineComponent({
  name: "AppPage",
  components: {
    CanvasBackgroundToggle,
    // Header,
    // LayerTree,
    Navigator,
    TransitionToolbar,
    TransitionCanvas,
    TransitionPanel,
    TransitionTimeline,
    AnimationToolbar,
    AnimationCanvas,
    AnimationPanel,
    AnimationTimeline,
    CodeGenerator,
  },
  setup() {
    const { appMode } = useAppMode();
    const { isDark } = useDark();

    // const store = useStore();

    // store.registerModule("app", appStoreModule);

    // onUnmounted(() => {
    //   store.unregisterModule("app");
    // });

    return {
      APP_MODE,
      appMode,
      isDark,
    };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";

.mainLayoutWrapper {
  display: grid;
  grid-template-columns: 13rem auto 20rem;
  grid-template-rows: 1.25rem auto;
  grid-template-areas:
    "header header header"
    "left body right";

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

  @include size(100vw, 100vh);
}
</style>
