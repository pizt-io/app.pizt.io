<template>
  <div class="w-full h-full">
    <VueTimelineAnimation
      v-model:modelCurrentTime="currentTime"
      v-model:modelElements="timelineElements"
      ref="vueTimelineAnimationRef"
      :duration="animationDuration"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, ref } from "vue";
import { useStore } from "vuex";

import _cloneDeep from "lodash/cloneDeep";
import { SVG_CANVAS_EVENT, SVG_UPDATE_TYPE } from "@/core/constants/svg";

export default defineComponent({
  name: "AnimationTimeline",
  components: {
    VueTimelineAnimation: defineAsyncComponent(
      () => import("@/core/components/vue-timeline-animation"),
    ),
  },
  props: {
    duration: {
      type: Number,
      default: 5000,
    },
    time: {
      type: Number,
      default: 1000,
    },
  },
  emits: [SVG_CANVAS_EVENT.UPDATE, SVG_CANVAS_EVENT.UPDATE_TIME],
  setup(props, { emit }) {
    const store = useStore();

    const animationDuration = ref(props.duration);

    const currentTime = computed({
      get: () => props.time,
      set: (value) => {
        emit(SVG_CANVAS_EVENT.UPDATE_TIME, value);
      },
    });

    const timelineElements = computed({
      get: () => _cloneDeep(store.getters["app/getElements"]),
      set: (value) => {
        emit(SVG_CANVAS_EVENT.UPDATE, { elements: value, type: SVG_UPDATE_TYPE.TIMELINE });
      },
    });

    const hasUnsyncedDataFromOtherUser = ref(false);

    const vueTimelineAnimationRef = ref(null);
    const updateElements = () => {
      const vueTimelineAnimationElement = vueTimelineAnimationRef.value as any;

      if (vueTimelineAnimationElement) {
        vueTimelineAnimationElement.forceRerenderElements(true);
      }
    };

    return {
      animationDuration,
      timelineElements,
      currentTime,
      hasUnsyncedDataFromOtherUser,
      vueTimelineAnimationRef,
      updateElements,
    };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";
</style>
