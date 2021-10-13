<template>
  <div :class="$style.layoutWrapper">
    <div class="h-5">Header</div>
    <div class="flex flex-col flex-1 justify-between">
      <div class="flex flex-1">
        <div class="w-52 flex flex-col">
          <div class="h-28 bg-primary-500">
            <Navigator />
          </div>
          <div class="flex-1 bg-success-500">TransitionPanel</div>
        </div>
        <div class="flex flex-col flex-1">
          <div class="h-28 bg-danger-500">Toolbar</div>
          <div class="flex-1 bg-warning-500">TransitionCanvas</div>
          <div class="h-9 bg-info-500">TransitionTimeline</div>
        </div>
        <div class="w-48">
          <div class="h-full bg-gray-500">CodeGenerator</div>
        </div>
      </div>
      <div class="h-48 bg-yellow">AnimationTimeline</div>
    </div>
  </div>
</template>

<script lang="ts">
import { APP_MODE } from '@core/constants/navigator';
import { computed, defineComponent } from 'vue';
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
import { useRoute } from 'vue-router';

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
  setup(props) {
    const route = useRoute();

    const appMode = computed(() => route.query.mode)

    return {
      APP_MODE,
      appMode
    }
  }
})
</script>

<style lang="scss" module>
@import "@styles/scss/all";

.layoutWrapper {
  background-color: color(gray, 900);
  * {
    color: white;
  }

  @include size(100vw, 100vh);
  @include flexBox($direction: column);
}
</style>
