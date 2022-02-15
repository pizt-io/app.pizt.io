<template>
  <div :class="[$style.canvasToggleBg, isDark ? 'bg-white' : 'bg-dark-800']" @click="toggleDark">
    <i class="icon-brightness-contrast" :class="[isDark ? 'text-dark-800' : 'text-white']" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useDark } from "@use/useDark";

export default defineComponent({
  name: "CanvasBackgroundToggle",
  setup() {
    const { isDark, toggleDark } = useDark();

    return {
      isDark,
      toggleDark,
    };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";

.canvasToggleBg {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  border-radius: 50%;
  cursor: pointer;

  @include size(2rem);
  @include flexCenter();
}
</style>
