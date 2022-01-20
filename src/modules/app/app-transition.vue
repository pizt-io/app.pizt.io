<template>
  <AppDefaultLayout :mode="APP_MODE.MAIN">
    <template v-slot:app-navigator>
      <Navigator />
    </template>
    <template v-slot:panel-transition>
      <TransitionPanel />
    </template>
    <template v-slot:toolbar-transition>
      <TransitionToolbar />
    </template>
    <template v-slot:canvas-transition>
      <TransitionCanvas :time="currentTime" />
    </template>
    <template v-slot:timeline-transition>
      <TransitionTimeline />
    </template>
    <template v-slot:code-generator>
      <CodeGenerator />
    </template>
  </AppDefaultLayout>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, provide, ref } from "vue";

import { APP_MODE } from "@core/constants/navigator";

import AppDefaultLayout from "./layout/default.vue";

export default defineComponent({
  name: "AppTransition",
  components: {
    AppDefaultLayout,
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
  },
  setup() {
    const currentTime = ref(1000);

    provide("currentTime", currentTime);

    return {
      currentTime,
      APP_MODE,
    };
  },
});
</script>
