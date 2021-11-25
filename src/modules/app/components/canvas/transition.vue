<template>
  <div class="w-full h-full flex items-center justify-center">
    <div v-html="parsedStyle" />
    <div
      :key="forceRerenderFlag"
      :style="selectedTransition"
      class="w-32 h-32 bg-primary"
    />
  </div>
</template>

<script lang="ts">
import { prettyCodeCss } from '@core/utils/prettier';
import { State } from '@store/state';
import { keyframes } from '@utils/keyframes';
import { computed, CSSProperties, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TransitionCanvas',
  setup(props) {
    const store = useStore<State>();

    const styleHolderRef = ref<HTMLElement | null>(null);

    const forceRerenderFlag = ref(0);
    const selectedTransition = computed(() => {
      forceRerenderFlag.value++;

      return store.state.selectedTransition as CSSProperties
    });

    const parsedStyle = computed(() => `
    <style>${prettyCodeCss(selectedTransition.value.animationKeyframes && keyframes.stringify({
      [selectedTransition.value.animationName]: selectedTransition.value.animationKeyframes,
    }))}</style>`);

    return {
      styleHolderRef,
      selectedTransition,
      forceRerenderFlag,
      parsedStyle,
    };
  }
})
</script>

<style lang="scss" module>
@import "@styles/all";

</style>
