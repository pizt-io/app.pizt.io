<template>
  <div
    :class="[isMain && $style.mainLayoutWrapper, isSvg && $style.svgLayoutWrapper]"
    :style="{
      gridTemplateRows: isMain
        ? '1.75rem auto'
        : isSvg
        ? '1.75rem auto ' + svgLayoutFooterHeight + 'px'
        : '',
    }"
  >
    <div :class="$style.layoutHeader">
      <span v-if="!currentUser" class="cursor-pointer text-sm" @click="handleSigninGithub">
        <img class="inline-block h-4 w-auto mr-1" src="/img/github.png" alt="Github" />
        Signin with Github
      </span>
      <span v-else class="cursor-pointer text-sm" @click="handleSignoutGithub">
        <img class="inline-block h-4 w-auto mr-1" src="/img/github.png" alt="Github" />
        {{ currentUser.email }} (Logout)
      </span>
    </div>
    <div :class="$style.layoutLeft">
      <div class="h-28 bg-primary-500">
        <slot name="app-navigator" />
      </div>
      <div class="bg-dark-600">
        <transition
          appear
          enter-active-class="animated slideInLeft"
          leave-active-class="animated slideOutLeft"
        >
          <slot v-if="isMain" name="panel-transition" />
          <slot v-else name="panel-animation" />
        </transition>
      </div>
    </div>
    <div :class="$style.layoutBody">
      <div class="bg-dark-800">
        <transition
          appear
          enter-active-class="animated flipInX"
          leave-active-class="animated flipOutX"
        >
          <slot v-if="isMain" name="toolbar-transition" />
          <slot v-else name="toolbar-animation" />
        </transition>
      </div>
      <transition appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
        <div v-if="isMain" class="relative dark:bg-dark-500 bg-white">
          <CanvasBackgroundToggle />
          <slot name="canvas-transition" />
        </div>
        <div v-else class="flex items-center justify-center relative bg-dark-500 overflow-auto p-5">
          <CanvasBackgroundToggle />
          <slot name="canvas-animation" />
        </div>
      </transition>
      <transition
        appear
        enter-active-class="animated flipInX"
        leave-active-class="animated flipOutX"
      >
        <div v-if="isMain" class="bg-dark-500">
          <slot name="timeline-transition" />
        </div>
      </transition>
    </div>
    <div v-if="isMain" :class="$style.layoutRight">
      <div class="bg-dark-600">
        <transition
          appear
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutRight"
        >
          <slot name="code-generator" />
        </transition>
      </div>
    </div>
    <template v-if="isSvg">
      <div v-if="!forceUpdateFlag" :class="$style.layoutFooter" :key="forceUpdateFlag">
        <hr :class="$style.layoutFooterResizeBar" @mousedown="handleMousedownResizeBar" />
        <transition
          appear
          enter-active-class="animated slideInUp"
          leave-active-class="animated slideOutDown"
        >
          <slot name="timeline-animation" />
        </transition>
      </div>
      <div v-else :class="$style.layoutFooter" :key="'' + forceUpdateFlag">
        <hr :class="$style.layoutFooterResizeBar" @mousedown="handleMousedownResizeBar" />
        <slot name="timeline-animation" />
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { computed, defineAsyncComponent, defineComponent, onMounted, ref } from "vue";

import { APP_MODE } from "@core/constants/navigator";
import { useRerenderer } from "@/core/use/useRerenderer";
import { SVG_CANVAS_EVENT_THROTTLE } from "@/core/constants/svg";

import _debounce from "lodash/debounce";
import { supabase } from "@/core/plugins/supabase";
import { useStore } from "vuex";
import { RootState } from "@/store/state";

export default defineComponent({
  name: "AppDefaultLayout",
  components: {
    CanvasBackgroundToggle: defineAsyncComponent(
      () => import("../components/canvas-toggle-bg.vue"),
    ),
    // eslint-disable-next-line vue/no-unused-components
    Header: defineAsyncComponent(() => import("../components/header/header.vue")),
    // eslint-disable-next-line vue/no-unused-components
    LayerTree: defineAsyncComponent(() => import("../components/tree/layer.vue")),
  },
  props: {
    mode: {
      type: String,
      default: APP_MODE.MAIN,
    },
  },
  setup(props) {
    const store = useStore<RootState>();

    const isMain = computed(() => props.mode === APP_MODE.MAIN);
    const isSvg = computed(() => props.mode === APP_MODE.SVG);

    const svgLayoutFooterHeight = ref(200);

    const { forceUpdate, forceUpdateFlag } = useRerenderer(0);

    const forceUpdateTimeline = _debounce(function () {
      forceUpdate();
    }, SVG_CANVAS_EVENT_THROTTLE * 5);

    const isMousedownResizeBar = ref(false);
    const handleMousedownResizeBar = () => {
      isMousedownResizeBar.value = true;
    };
    const handleMouseupResizeBar = () => {
      isMousedownResizeBar.value = false;
    };
    const handleMousemoveResizeBar = (e: MouseEvent) => {
      if (isMousedownResizeBar.value) {
        svgLayoutFooterHeight.value += -e.movementY;

        forceUpdateTimeline();
      }
    };

    onMounted(() => {
      window.addEventListener("mouseup", handleMouseupResizeBar);
      window.addEventListener("mousemove", handleMousemoveResizeBar);
    });

    const handleSigninGithub = async () => {
      const { session } = await supabase.auth.signIn({
        // provider can be 'github', 'google', 'gitlab', and more
        provider: "github",
      });

      store.commit("SET_USER_SESSION", session);
    };

    const handleSignoutGithub = async () => {
      await supabase.auth.signOut();

      store.commit("SET_USER_SESSION", {});
    };

    const currentUser = computed(() => store.state.userSession?.user);

    return {
      isMain,
      isSvg,
      svgLayoutFooterHeight,
      handleMousedownResizeBar,
      forceUpdate,
      forceUpdateFlag,
      handleSigninGithub,
      handleSignoutGithub,
      currentUser,
    };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";

.layoutHeader {
  grid-area: header;
  background-color: color(gray, 900);
  color: white;
  display: flex;
  align-items: center;
  padding: 0 1rem;
}
.layoutRight {
  grid-area: right;
  overflow-y: auto;
}
.layoutLeft {
  grid-area: left;
  overflow-y: auto;
}
.layoutBody {
  grid-area: body;
  display: grid;
  grid-template-rows: 7rem auto 3rem;
}
.layoutFooter {
  position: relative;
  grid-area: footer;
}
.layoutFooterResizeBar {
  border-width: 1px;
  border-color: rgb(41, 41, 41);
  transition-duration: $duration-base;
  cursor: ns-resize;

  &:hover {
    border-width: 3px;
    border-color: rgb(37, 115, 233);
  }
}
.mainLayoutWrapper {
  display: grid;
  grid-template-columns: 14rem auto 20rem;
  grid-template-areas:
    "header header header"
    "left body right";
  overflow: hidden;
  background-color: color(dark, 600);

  @include size(100vw, 100vh);
}

.svgLayoutWrapper {
  display: grid;
  grid-template-columns: 14rem auto 20rem;
  grid-template-areas:
    "header header header"
    "left body body"
    "footer footer footer";
  overflow: hidden;

  @include size(100vw, 100vh);

  .layoutBody {
    grid-template-rows: 2.25rem auto;
    overflow-y: auto;
  }
}
</style>
