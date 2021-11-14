<template>
  <div class="w-full h-full flex items-center justify-center">
    <div ref="styleHolderRef" />
    <div
      :key="forceRerenderFlag"
      :style="animationSettings"
      class="w-20 h-20 bg-primary"
    />
  </div>
</template>

<script lang="ts">
import { State } from '@store/state';
import { computed, CSSProperties, defineComponent, onMounted, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TransitionCanvas',
  setup(props) {
    const store = useStore<State>();

    const styleHolderRef = ref<HTMLElement | null>(null);

    const forceRerenderFlag = ref(0);
    const animationSettings = computed(() => {
      forceRerenderFlag.value++;

      return store.state.animationSettings as CSSProperties
    });

    onMounted(() => {
      if (styleHolderRef.value) {
        styleHolderRef.value.innerHTML = `
        <style>
          @keyframes piztAnimation {
            from {
              transform: scale(0) rotate(0deg);
              opacity: 0;
            }
            to {
              transform: scale(1) rotate(360deg);
              opacity: 1;
            }
          }
        </style>
        `;
      }
    })

    return {
      styleHolderRef,
      animationSettings,
      forceRerenderFlag,
    };
  }
})
</script>

<style lang="scss" module>
@import "@styles/all";


</style>
