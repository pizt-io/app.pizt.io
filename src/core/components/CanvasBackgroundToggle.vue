<template>
  <div
    class="flex items-center justify-center absolute top-5 right-5 h-8 w-8 rounded-full cursor-pointer"
    :class="[isDark ? 'bg-white' : 'bg-dark-800']"
    @click="toggleDark()"
  >
    <i
      class="icon-brightness-contrast"
      :class="[isDark ? 'text-dark-800' : 'text-white']"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useDark } from '@use/useDark'

export default defineComponent({
  name: 'CanvasBackgroundToggle',
  setup() {
    const { isDark, toggleDark } = useDark()

    return {
      isDark,
      toggleDark,
    }
  }
})
</script>
