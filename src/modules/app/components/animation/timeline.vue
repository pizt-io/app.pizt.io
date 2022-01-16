<template>
  <div class="w-full h-full">
    <VueTimelineAnimation
      v-model:modelElements="elements"
      v-model:modelCurrentTime="currentTime"
      :duration="animationDuration"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "AnimationTimeline",
  components: {
    VueTimelineAnimation: defineAsyncComponent(
      () => import("@/core/components/vue-timeline-animation"),
    ),
  },
  setup() {
    const store = useStore();

    const animationDuration = ref(5000);
    const currentTime = ref(1000);

    const _timelineElements = computed(() => store.getters["app/getTimelineElements"]);

    const elements = ref(_timelineElements.value);

    return { animationDuration, elements, currentTime };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";
</style>
