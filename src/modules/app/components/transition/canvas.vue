<template>
  <div class="w-full h-full flex items-center justify-center">
    <div v-html="parsedStyle" />
    <div :key="forceRerenderFlag" :style="selectedTransition" class="w-32 h-32 bg-primary" />
  </div>
</template>

<script lang="ts">
import { RootState } from "@store/state";
import { keyframes } from "@utils/keyframes";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TransitionCanvas",
  setup() {
    const store = useStore<RootState>();

    const forceRerenderFlag = ref(0);
    const selectedTransition = computed(() => {
      forceRerenderFlag.value++;

      return store.state.selectedTransition;
    });

    const parsedStyle = computed(
      () =>
        `<style>${
          selectedTransition.value.animationKeyframes &&
          keyframes.stringify({
            [selectedTransition.value.animationName]: selectedTransition.value.animationKeyframes,
          })
        }</style>`,
    );

    return {
      selectedTransition,
      forceRerenderFlag,
      parsedStyle,
    };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";
</style>
