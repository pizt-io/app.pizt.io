<template>
  <AppDefaultLayout v-if="selectedTransition.label" :mode="APP_MODE.MAIN">
    <template v-slot:app-navigator>
      <Navigator />
    </template>
    <template v-slot:panel-transition>
      <TransitionPanel :transition="selectedTransition" />
    </template>
    <template v-slot:toolbar-transition>
      <TransitionToolbar :transition="selectedTransition" />
    </template>
    <template v-slot:canvas-transition>
      <TransitionCanvas :time="currentTime" />
    </template>
    <template v-slot:timeline-transition>
      <TransitionTimeline :transition="selectedTransition" />
    </template>
    <template v-slot:code-generator>
      <CodeGenerator />
    </template>
  </AppDefaultLayout>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, provide, ref } from "vue";
import { useStore } from "vuex";
import { APP_MODE } from "@core/constants/navigator";

import AppDefaultLayout from "./layout/default.vue";

import TransitionToolbar from "./components/transition/toolbar.vue";
import TransitionCanvas from "./components/transition/canvas.vue";
import TransitionPanel from "./components/transition/panel.vue";
import TransitionTimeline from "./components/transition/timeline/timeline.vue";

export default defineComponent({
  name: "AppTransition",
  components: {
    AppDefaultLayout,
    CodeGenerator: defineAsyncComponent(() => import("./components/code/generator.vue")),
    Navigator: defineAsyncComponent(() => import("./components/navigator/navigator.vue")),
    TransitionToolbar,
    TransitionCanvas,
    TransitionPanel,
    TransitionTimeline,
  },
  setup() {
    const currentTime = ref(1000);

    provide("currentTime", currentTime);

    const store = useStore();

    const selectedTransition = computed(() => store.state.selectedTransition);

    store.dispatch("getTransitions");

    return {
      currentTime,
      APP_MODE,
      selectedTransition,
    };
  },
});
</script>
