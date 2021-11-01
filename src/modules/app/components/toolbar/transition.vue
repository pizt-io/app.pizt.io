<template>
  <div class="h-full px-3 flex items-center">
    <div v-for="transition in transitions" :key="transition.name" class="text-center mx-2">
      <div class="rounded-full w-16 h-16 flex items-center justify-center cursor-pointer bg-primary hover:bg-secondary active:bg-secondary-600">
        <img :src="transition.thumbnail">
      </div>
      <div class="text-sm">
        {{ transition.name }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { transitions } from '@/mock/transitions'

export default defineComponent({
  name: 'TransitionToolbar',
  setup(props) {
    return {
      transitions
    }
  }
})
</script>

<style lang="scss" module>
@import "@styles/all";


</style>
