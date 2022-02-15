<template>
  <div class="h-28 w-full flex bg-primary">
    <div
      class="
        flex flex-col
        items-center
        justify-center
        h-28
        w-28
        cursor-pointer
        duration-300
        hover:bg-secondary
        active:bg-secondary-600
      "
      :class="{
        'bg-secondary': appMode === APP_MODE.MAIN,
      }"
      @click="changeAppMode(APP_MODE.MAIN)"
    >
      <span class="text-sm font-bold text-dark-900">Animations</span>
      <img src="/img/svg/transition.svg" class="my-m-1" />
      <span class="text-sm font-bold text-dark-900">Transitions</span>
    </div>
    <div
      class="
        flex flex-col
        items-center
        justify-center
        h-28
        w-28
        cursor-pointer
        duration-300
        hover:bg-secondary
        active:bg-secondary-600
      "
      :class="{
        'bg-secondary': appMode === APP_MODE.SVG,
      }"
      @click="changeAppMode(APP_MODE.SVG)"
    >
      <img src="/img/svg/sparkles.svg" class="my-m-1" />
      <span class="text-sm font-bold text-dark-900">SVG Animator</span>
    </div>
  </div>
</template>

<script lang="ts">
import { APP_MODE } from "@core/constants/navigator";
import { useAppMode } from "@modules/app/use/useAppMode";
import { defineComponent } from "vue";

export default defineComponent({
  name: "Navigator",
  setup() {
    const { appMode, changeAppMode } = useAppMode();

    return {
      APP_MODE,
      appMode,
      changeAppMode,
    };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";
</style>
