<template>
  <div class="h-28 w-full flex bg-primary">
    <div class="h-28 w-28 cursor-pointer duration-300 hover:bg-secondary"
      :class="{
        'bg-secondary': appMode === APP_MODE.MAIN
      }"
      @click="handleChangeMode(APP_MODE.MAIN)"
    >
      Animations
      <br />
      Transitions
    </div>
    <div class="h-28 w-28 cursor-pointer duration-300 hover:bg-secondary"
      :class="{
        'bg-secondary': appMode === APP_MODE.SVG
      }"
      @click="handleChangeMode(APP_MODE.SVG)"
    >
      SVG Animator
    </div>
  </div>
</template>

<script lang="ts">
import { APP_MODE } from '@core/constants/navigator';
import { computed, defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  name: 'Navigator',
  setup(props) {
    const router = useRouter();
    const route = useRoute();

    const appMode = computed(() => route.query.mode)

    const handleChangeMode = (mode: APP_MODE) => {
      router.push({
        query: {
          mode,
        }
      })
    }
    if (!appMode.value) handleChangeMode(APP_MODE.MAIN)

    return {
      APP_MODE,
      appMode,
      handleChangeMode,
    }
  }
})
</script>

<style lang="scss" module>
@import "@styles/scss/all";


</style>
