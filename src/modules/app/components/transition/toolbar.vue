<template>
  <div class="h-full pr-2 flex">
    <div
      class="
        flex
        items-center
        justify-center
        h-full
        w-6
        bg-primary
        font-bold
        select-none
        cursor-pointer
      "
      @click="defaultTransitionVisible = !defaultTransitionVisible"
    >
      <i :class="defaultTransitionVisible ? 'icon-arrow-left' : 'icon-arrow-right'"></i>
    </div>
    <div
      class="flex overflow-hidden duration-300"
      :style="{
        width: defaultTransitionVisible ? `calc(5rem * ${defaultTransitions.length})` : '0px',
      }"
    >
      <div
        v-for="transition in defaultTransitions"
        :key="transition.animationName"
        :class="$style.transitionItemWrapper"
        @click="handleSelectTransition(transition)"
      >
        <div
          :class="[
            $style.transitionItem,
            transition.userId
              ? transition?._id === selectedTransition?._id && 'border-4 border-secondary-600'
              : transition?.animationName === selectedTransition?.animationName &&
                'border-4 border-secondary-600',
          ]"
        >
          <img :src="transition.thumbnail" />
        </div>
        <div class="text-xs text-white overflow-hidden overflow-ellipsis">
          {{ transition.label }}
        </div>
      </div>
    </div>
    <div class="h-full bg-primary-800 select-none" style="width: 1px" />
    <div
      v-for="transition in userTransitions"
      :key="transition.animationName"
      :class="$style.transitionItemWrapper"
      @click="handleSelectTransition(transition)"
    >
      <div
        :class="[
          $style.transitionItem,
          transition.userId
            ? transition?._id === selectedTransition?._id && 'border-4 border-secondary-600'
            : transition?.animationName === selectedTransition?.animationName &&
              'border-4 border-secondary-600',
        ]"
      >
        <img :src="transition.thumbnail" />
      </div>
      <div class="text-xs text-white overflow-hidden overflow-ellipsis">
        {{ transition.label }}
      </div>
    </div>
    <div class="text-center mx-2 mt-2" @click="handleAddTransition">
      <div :class="$style.transitionItem"><span class="transform scale-250">+</span></div>
      <div class="text-sm text-white"> Add new </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RootState } from "@store/state";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TransitionToolbar",
  setup() {
    const store = useStore<RootState>();
    const selectedTransition = computed(() => {
      return store.state.selectedTransition as any;
    });

    const transitions = computed(() => {
      return store.state.transitions.filter((t) => t) as any[];
    });

    const defaultTransitions = computed(() => {
      return transitions.value.filter((t) => !t.userId) as any[];
    });
    const userTransitions = computed(() => {
      return transitions.value.filter((t) => t.userId) as any[];
    });

    const handleSelectTransition = (transition: any) => {
      if (transition._id !== selectedTransition.value._id) {
        store.dispatch("updateSelectedTransition", transition);
      }
    };

    const handleAddTransition = () => {
      store.dispatch("createTransition");
    };

    const defaultTransitionVisible = ref(userTransitions.value.length === 0);

    return {
      defaultTransitionVisible,
      selectedTransition,
      defaultTransitions,
      userTransitions,
      handleSelectTransition,
      handleAddTransition,
    };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";

.transitionItemWrapper {
  width: 4rem;
  text-align: center;
  margin: 0.5rem 0.5rem 0;
}

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
