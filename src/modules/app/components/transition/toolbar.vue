<template>
  <div class="h-full px-3 pt-3 flex">
    <div
      v-for="transition in transitions"
      :key="transition.animationName"
      class="text-center mx-2"
      @click="handleSelectTransition(transition)"
    >
      <div
        :class="[
          $style.transitionItem,
          transition?.animationName === selectedTransition?.animationName &&
            'border-4 border-secondary-600',
        ]"
      >
        <img :src="transition.thumbnail" />
      </div>
      <div class="text-sm text-white">
        {{ transition.label }}
      </div>
    </div>
    <div class="text-center mx-2" @click="handleAddTransition">
      <div :class="$style.transitionItem"> + </div>
      <div class="text-sm text-white"> Add new </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RootState } from "@store/state";
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TransitionToolbar",
  setup() {
    const store = useStore<RootState>();

    const selectedTransition = computed(() => {
      return store.state.selectedTransition as any;
    });

    const transitions = computed(() => {
      return store.state.transitions as any[];
    });

    const handleSelectTransition = (transition: any) => {
      if (transition.label !== selectedTransition.value.label) {
        store.commit("SET_ANIMATION_SETTINGS", transition);
      }
    };

    const handleAddTransition = () => {};

    return {
      selectedTransition,
      transitions,
      handleSelectTransition,
      handleAddTransition,
    };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";

.transitionItem {
  border-radius: 9999px;
  background-color: color();
  cursor: pointer;
  transition-duration: $duration-base;

  @include size(4rem);
  @include flexCenter();

  &:hover {
    background-color: color(secondary);
  }

  &:active {
    background-color: color(secondary, 600);
  }
}
</style>
