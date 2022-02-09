<template>
  <div
    :class="[
      mode === APP_MODE.MAIN && $style.mainLayoutWrapper,
      mode === APP_MODE.SVG && $style.svgLayoutWrapper,
    ]"
  >
    <div :class="$style.layoutHeader">Header</div>
    <div :class="$style.layoutLeft">
      <div class="h-28 bg-primary-500">
        <slot name="app-navigator" />
      </div>
      <div class="bg-dark-600">
        <transition
          appear
          enter-active-class="animated slideInLeft"
          leave-active-class="animated slideOutLeft"
        >
          <slot v-if="mode === APP_MODE.MAIN" name="panel-transition" />
          <slot v-else name="panel-animation" />
        </transition>
      </div>
    </div>
    <div :class="$style.layoutBody">
      <div class="bg-dark-800">
        <transition
          appear
          enter-active-class="animated flipInX"
          leave-active-class="animated flipOutX"
        >
          <slot v-if="mode === APP_MODE.MAIN" name="toolbar-transition" />
          <slot v-else name="toolbar-animation" />
        </transition>
      </div>
      <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <div v-if="mode === APP_MODE.MAIN" class="relative dark:bg-dark-500 bg-white">
          <CanvasBackgroundToggle />
          <slot name="canvas-transition" />
        </div>
        <div v-else class="flex items-center justify-center relative bg-dark-500 overflow-auto p-5">
          <CanvasBackgroundToggle />
          <slot name="canvas-animation" />
        </div>
      </transition>
      <transition
        appear
        enter-active-class="animated flipInX"
        leave-active-class="animated flipOutX"
      >
        <div v-if="mode === APP_MODE.MAIN" class="bg-dark-500">
          <slot name="timeline-transition" />
        </div>
      </transition>
    </div>
    <div v-if="mode === APP_MODE.MAIN" :class="$style.layoutRight">
      <div class="bg-dark-600">
        <transition
          appear
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutRight"
        >
          <slot name="code-generator" />
        </transition>
      </div>
    </div>
    <div v-if="mode === APP_MODE.SVG" :class="$style.layoutFooter">
      <transition
        appear
        enter-active-class="animated slideInUp"
        leave-active-class="animated slideOutDown"
      >
        <slot name="timeline-animation" />
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

import { APP_MODE } from "@core/constants/navigator";

export default defineComponent({
  name: "AppDefaultLayout",
  components: {
    CanvasBackgroundToggle: defineAsyncComponent(
      () => import("../components/canvas-toggle-bg.vue"),
    ),
    // eslint-disable-next-line vue/no-unused-components
    Header: defineAsyncComponent(() => import("../components/header/header.vue")),
    // eslint-disable-next-line vue/no-unused-components
    LayerTree: defineAsyncComponent(() => import("../components/tree/layer.vue")),
  },
  props: {
    mode: {
      type: String,
      default: APP_MODE.MAIN,
    },
  },
  setup() {
    return {
      APP_MODE,
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
    "left body body"
    "footer footer footer";
  overflow: hidden;

  @include size(100vw, 100vh);

  .layoutBody {
    grid-template-rows: 2.25rem auto;
    overflow-y: auto;
  }
}
</style>
