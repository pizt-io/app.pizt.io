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
        <slot name="app-navigator" />
      </div>
      <div class="bg-dark-600 animated faster slideInLeft">
        <slot name="panel-transition" />
        <slot name="panel-animation" />
      </div>
    </div>
    <div :class="$style.layoutBody">
      <div class="bg-dark-800 animated faster flipInX">
        <slot name="toolbar-transition" />
        <slot name="toolbar-animation" />
      </div>
      <transition
        mode="out-in"
        enter-active-class="animated faster zoomIn"
        leave-active-class="animated faster zoomOut"
      >
        <div v-if="appMode === APP_MODE.MAIN" class="relative dark:bg-dark-500 bg-white">
          <CanvasBackgroundToggle />
          <slot name="canvas-transition" />
        </div>
        <div v-else class="relative bg-dark-500 overflow-auto">
          <CanvasBackgroundToggle />
          <slot name="canvas-animation" />
        </div>
      </transition>
      <div v-if="appMode === APP_MODE.MAIN" class="bg-dark-500 animated faster flipInX">
        <slot name="timeline-transition" />
      </div>
    </div>
    <div :class="$style.layoutRight">
      <div class="bg-dark-600 animated faster slideInRight">
        <slot name="code-generator" />
        <slot name="panel-animation" />
      </div>
    </div>
    <div v-if="appMode === APP_MODE.SVG" :class="$style.layoutFooter">
      <transition
        mode="out-in"
        enter-active-class="animated faster slideInUp"
        leave-active-class="animated faster slideOutDown"
      >
        <slot name="timeline-animation" />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

import { APP_MODE } from "@core/constants/navigator";
import { useAppMode } from "../use/useAppMode";

export default defineComponent({
  name: "AppPage",
  components: {
    CanvasBackgroundToggle: defineAsyncComponent(() => import("./canvas-toggle-bg.vue")),
    // eslint-disable-next-line vue/no-unused-components
    Header: defineAsyncComponent(() => import("./header/header.vue")),
    // eslint-disable-next-line vue/no-unused-components
    LayerTree: defineAsyncComponent(() => import("./tree/layer.vue")),
  },
  setup() {
    const { appMode } = useAppMode();

    return {
      APP_MODE,
      appMode,
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
