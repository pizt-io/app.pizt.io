<template>
  <div class="w-full h-full">
    <VueTimelineAnimation
      v-model:modelElements="elements"
      v-model:modelCurrentTime="currentTime"
      :key="forceUpdateFlag"
      :duration="animationDuration"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, ref, watch } from "vue";
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
  setup() {
    const store = useStore();

    const animationDuration = ref(5000);
    const currentTime = ref(1000);

    const _timelineElements = computed(() => _cloneDeep(store.getters["app/getTimelineElements"]));

    const elements = ref(_timelineElements.value);

    const hasUnsyncedDataFromOtherUser = ref(false);

    const { forceUpdate, forceUpdateFlag } = useRerenderer();

    watch(
      () => elements.value,
      _debounce(function () {
        forceUpdate();
      }, 1500),
      { deep: true },
    );

    return {
      animationDuration,
      elements,
      currentTime,
      hasUnsyncedDataFromOtherUser,
      forceUpdateFlag,
    };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";
</style>
