<template>
  <div class="w-full h-full">
    <VueTimelineAnimation
      v-model:modelElements="elements"
      v-model:modelCurrentTime="currentTime"
      v-on="animationTimelineEventHandlers"
      :key="forceUpdateFlag"
      :duration="animationDuration"
    />
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  ref,
  shallowRef,
  triggerRef,
  watch,
} from "vue";
import { useStore } from "vuex";
import { useRerenderer } from "@/core/use/useRerenderer";

import _debounce from "lodash/debounce";
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

    const { forceUpdate, forceUpdateFlag } = useRerenderer();

    const updateElementsFromStore = () => {
      elements.value = _timelineElements.value;

      triggerRef(elements);
    };

    watch(
      () => elements.value,
      _debounce(function () {
        forceUpdate();
      }, 1500),
      { deep: true },
    );

    const animationTimelineEventHandlers = {
      "update:modelCurrentTime": () => emit("change-time", currentTime),
      "update:modelElements": () => emit("change-elements", elements),
    };

    return {
      animationDuration,
      elements,
      currentTime,
      hasUnsyncedDataFromOtherUser,
      forceUpdateFlag,
      animationTimelineEventHandlers,
      updateElementsFromStore,
    };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";
</style>
