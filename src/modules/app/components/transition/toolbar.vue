<template>
  <div class="h-full px-3 flex items-center">
    <div
      v-for="transition in transitions"
      :key="transition.animationName"
      class="text-center mx-2"
      @click="handleSelectTransition(transition)"
    >
      <div
        class="rounded-full w-16 h-16 flex items-center justify-center cursor-pointer bg-primary hover:bg-secondary active:bg-secondary-600"
        :class="[transition?.animationName === selectedTransition?.animationName && 'border-4 border-secondary-600']"
      >
        <img :src="transition.thumbnail">
      </div>
      <div class="text-sm text-white">
        {{ transition.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { RootState } from '@store/state';
import { computed, CSSProperties, defineComponent } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TransitionToolbar',
  setup(props, { emit }) {
    const store = useStore<RootState>();

    const selectedTransition = computed(() => {
      return store.state.selectedTransition as CSSProperties;
    });

    const transitions = computed(() => {
      return store.state.transitions as any[]
    });

    const handleSelectTransition = (transition: CSSProperties) => {
      store.commit('SET_ANIMATION_SETTINGS', transition)
    }

    return {
      selectedTransition,
      transitions,
      handleSelectTransition,
    }
  }
})
</script>

<style lang="scss" module>
@import "@styles/all";


</style>
