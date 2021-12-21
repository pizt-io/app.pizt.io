<template>
  <div class="w-full h-full">
    <VueTimelineAnimation />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from "vue";

export default defineComponent({
  name: "AnimationTimeline",
  components: {
    VueTimelineAnimation: defineAsyncComponent(
      () => import("@/core/components/vue-timeline-animation"),
    ),
  },
  setup() {},
});
</script>

<style lang="scss" module>
@import "@styles/all";
</style>
