<template>
  <div :class="$style.layoutWrapper">
    <div class="h-5">Header</div>
    <div class="flex flex-col flex-1 justify-between">
      <div class="flex flex-1">
        <div class="w-52 flex flex-col">
          <div class="h-28 bg-primary-500">
            <Navigator />
          </div>
          <transition
            mode="out-in"
            enter-active-class="animated slideInLeft"
            leave-active-class="animated slideOutLeft"
          >
            <div v-if="appMode === APP_MODE.MAIN" class="flex-1 bg-success-500">TransitionPanel</div>
            <div v-else class="flex-1 bg-danger-500">AnimationPanel</div>
          </transition>
        </div>
        <div class="flex flex-col flex-1">
          <transition
            mode="out-in"
            enter-active-class="animated flipInX"
            leave-active-class="animated flipOutX"
          >
            <div v-if="appMode === APP_MODE.MAIN" class="h-28 bg-danger-500">TransitionToolbar</div>
            <div v-else class="h-28 bg-warning-500">AnimationToolbar</div>
          </transition>

          <transition
            mode="out-in"
            enter-active-class="animated zoomIn"
            leave-active-class="animated zoomOut"
          >
            <div v-if="appMode === APP_MODE.MAIN" class="flex-1 bg-warning-500">TransitionCanvas</div>
            <div v-else class="flex-1 bg-success-500">AnimationCanvas</div>
          </transition>

          <transition
            mode="out-in"
            enter-active-class="animated flipInX"
            leave-active-class="animated flipOutX"
          >
            <div v-if="appMode === APP_MODE.MAIN" class="h-9 bg-info-500">TransitionTimeline</div>
          </transition>
        </div>
        <div class="w-48">
          <transition
            mode="out-in"
            enter-active-class="animated slideInRight"
            leave-active-class="animated slideOutRight"
          >
            <div v-if="appMode === APP_MODE.MAIN" class="h-full bg-gray-500">CodeGenerator</div>
            <div v-else class="h-full bg-info-500">AnimationPanel</div>
          </transition>
        </div>
      </div>
      <transition
        mode="out-in"
        enter-active-class="animated slideInUp"
        leave-active-class="animated slideOutDown"
      >
        <div v-if="appMode === APP_MODE.SVG" class="h-48 bg-yellow">AnimationTimeline</div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { APP_MODE } from '@core/constants/navigator';
import { defineComponent } from 'vue';
import Header from '@modules/app/components/header/header.vue'
import LayerTree from '@modules/app/components/tree/layer.vue'
import Navigator from '@modules/app/components/navigator/navigator.vue'
import TransitionToolbar from '@modules/app/components/toolbar/animation.vue'
import TransitionCanvas from '@modules/app/components/canvas/transition.vue'
import TransitionPanel from '@modules/app/components/panel/transition.vue'
import TransitionTimeline from '@modules/app/components/timeline/transition.vue'
import AnimationToolbar from '@modules/app/components/toolbar/animation.vue'
import AnimationCanvas from '@modules/app/components/canvas/animation.vue'
import AnimationPanel from '@modules/app/components/panel/animation.vue'
import AnimationTimeline from '@modules/app/components/timeline/animation.vue'
import CodeGenerator from '@modules/app/components/code/generator.vue'
import { useAppMode } from './use/useAppMode';

export default defineComponent({
  name: 'AppPage',
  components: {
    Header,
    LayerTree,
    Navigator,
    TransitionToolbar,
    TransitionCanvas,
    TransitionPanel,
    TransitionTimeline,
    AnimationToolbar,
    AnimationCanvas,
    AnimationPanel,
    AnimationTimeline,
    CodeGenerator,
  },
  setup() {
    const { appMode } = useAppMode();

    return {
      APP_MODE,
      appMode
    }
  }
})
</script>

<style lang="scss" module>
@import "@styles/all";

.layoutWrapper {
  background-color: color(gray, 900);
  overflow: hidden;
  * {
    transition: all 0.3s ease-in-out;
    color: white;
  }

  @include size(100vw, 100vh);
  @include flexBox($direction: column);
}
</style>
