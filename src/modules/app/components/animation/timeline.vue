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
import { defineAsyncComponent, defineComponent, ref } from "vue";

export default defineComponent({
  name: "AnimationTimeline",
  components: {
    VueTimelineAnimation: defineAsyncComponent(
      () => import("@/core/components/vue-timeline-animation"),
    ),
  },
  setup() {
    const animationDuration = ref(5000);
    const currentTime = ref(1000);
    const elements = ref([
      {
        _id: "1jhg1kj23jkh4kj67jh",
        name: "Layer 1",
        keyframes: ["stage-id-168rf9c8f9c88478f9c88038f", "stage-id-268rf9c8f9c88478f9c88038f"],
        expanded: false,
        stages: {
          "stage-id-168rf9c8f9c88478f9c88038f": {
            time: 0,
            label: "Position",
            property: "position",
            value: { x: 150, y: 100 },
          },
          "stage-id-268rf9c8f9c88478f9c88038f": {
            time: 2500,
            label: "Position",
            property: "position",
            value: { x: 200, y: 150 },
          },
        },
      },
      {
        _id: "2jhg1kj23jkh4kj67jh",
        name: "Layer 2",
        keyframes: [
          "stage-id-168rf9c8f9c88478f9c88038f",
          "stage-id-268rf9c8f9c74478f9c88038f",
          "stage-id-468rf9c8f9c88ỉbf9c88038f",
          "stage-id-568rf9c8f9c88478f9c88038f",
        ],
        expanded: true,
        stages: {
          "stage-id-168rf9c8f9c88478f9c88038f": {
            time: 0,
            label: "Opacity",
            property: "opacity",
            value: 0,
          },
          "stage-id-268rf9c8f9c74478f9c88038f": {
            time: 3500,
            label: "Opacity",
            property: "opacity",
            value: 0.9,
          },
          "stage-id-468rf9c8f9c88ỉbf9c88038f": {
            time: 4000,
            label: "Opacity",
            property: "opacity",
            value: 0.5,
          },
          "stage-id-568rf9c8f9c88478f9c88038f": {
            time: 2500,
            label: "Position",
            property: "position",
            value: { x: 200, y: 150 },
          },
        },
      },
      {
        _id: "3jhg1kj23jkh4kj67jh",
        name: "Layer 3",
        keyframes: [
          "stage-id-168rf9c8f9c88478f9c88038f",
          "stage-id-268rf9c8f4c74478f9c88038f",
          "stage-id-468rf9c8f9c88ỉbf9c48038f",
          "stage-id-568rf9c8f9c88478f9c88038f",
        ],
        expanded: true,
        stages: {
          "stage-id-168rf9c8f9c88478f9c88038f": {
            time: 0,
            label: "Position",
            property: "position",
            value: { x: "150.0", y: "100.0" },
          },
          "stage-id-268rf9c8f4c74478f9c88038f": {
            time: 2700,
            label: "Color",
            property: "color",
            value: "#cf3c3c",
          },
          "stage-id-468rf9c8f9c88ỉbf9c48038f": {
            time: 3000,
            label: "Position",
            property: "position",
            value: { x: "300.0", y: "200.0" },
          },
          "stage-id-568rf9c8f9c88478f9c88038f": {
            time: 1500,
            label: "Color",
            property: "color",
            value: "#3c74cf",
          },
        },
      },
    ]);

    return { animationDuration, elements, currentTime };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";
</style>
