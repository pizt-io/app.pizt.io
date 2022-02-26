<template>
  <div class="w-full h-full flex items-center justify-center relative">
    <div :class="$style.canvasReplayBtn">
      <span class="mr-2" @click="forceUpdate">
        <i class="icon-rotate-right" />
      </span>
      <span>Replay</span>
    </div>
    <div v-html="parsedStyle" />
    <div :key="forceUpdateFlag" :style="selectedTransition" :class="$style.canvasBlock" />
  </div>
</template>

<script lang="ts">
import { useRerenderer } from "@/core/use/useRerenderer";
import { RootState } from "@store/state";
import { keyframes } from "@utils/keyframes";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TransitionCanvas",
  setup() {
    const store = useStore<RootState>();

    const { forceUpdateFlag, forceUpdate } = useRerenderer();

    const selectedTransition = computed(() => {
      forceUpdate();

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
      forceUpdate,
      forceUpdateFlag,
      parsedStyle,
    };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";

.canvasReplayBtn {
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;

  @include flexBox($direction: row, $align: center);

  > span:nth-child(1) {
    background-color: color();
    border-radius: 9999px;
    cursor: pointer;
    transition-duration: $duration-base;

    @include flexCenter();
    @include size(2rem);

    &:hover {
      background-color: color(primary, 600);
    }
    &:active {
      background-color: color(primary, 700);
    }
  }
}

.canvasBlock {
  background-color: color();

  @include size(8rem);
}
</style>
