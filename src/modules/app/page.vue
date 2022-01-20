<template>
  <AppTransition v-if="appMode === APP_MODE.MAIN" key="app-transition" />
  <AppAnimation v-else-if="appMode === APP_MODE.SVG" key="app-animation" />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import { useLazyStore } from "@/core/use/useLazyStore";

import { appStoreModule } from "./store";

import { APP_MODE } from "@core/constants/navigator";
import { useAppMode } from "./use/useAppMode";

import AppAnimation from "./app-animation.vue";
import AppTransition from "./app-transition.vue";

export default defineComponent({
  name: "AppPage",
  components: {
    AppAnimation,
    AppTransition,
  },
  setup() {
    const { appMode } = useAppMode();

    useLazyStore("app", appStoreModule);

    return {
      APP_MODE,
      appMode,
    };
  },
});
</script>
