<template>
  <div class="w-full h-full">
    <VueTimelineAnimation
      v-on="animationTimelineEventHandlers"
      ref="vueTimelineAnimationRef"
      :duration="animationDuration"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, ref, shallowRef, triggerRef } from "vue";
import { useStore } from "vuex";

import _cloneDeep from "lodash/cloneDeep";

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
  emits: ["change-time", "change-elements"],
  setup(props, { emit }) {
    const store = useStore();

    const animationDuration = ref(props.duration);

    const currentTime = ref(props.time);

    const _timelineElements = computed(() => _cloneDeep(store.getters["app/getTimelineElements"]));

    const elements = shallowRef(_timelineElements.value);

    const hasUnsyncedDataFromOtherUser = ref(false);

    const vueTimelineAnimationRef = ref(null);
    const updateElements = (payload: any[]) => {
      elements.value = _timelineElements.value;
      triggerRef(elements);

      const vueTimelineAnimationElement = vueTimelineAnimationRef.value as any;

      if (vueTimelineAnimationElement) {
        vueTimelineAnimationElement.forceRerenderElements(payload.map((el) => el._id));
      }
    };

    const animationTimelineEventHandlers = {
      "update:modelCurrentTime": (payload: number) => emit("change-time", payload),
      "update:modelElements": (...args: any[]) => emit("change-elements", ...args),
    };

    return {
      animationDuration,
      elements,
      currentTime,
      hasUnsyncedDataFromOtherUser,
      animationTimelineEventHandlers,
      vueTimelineAnimationRef,
      updateElements,
    };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";
</style>
