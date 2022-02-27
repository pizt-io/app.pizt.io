<template>
  <AppDefaultLayout :mode="APP_MODE.SVG">
    <template v-slot:app-navigator>
      <Navigator />
    </template>
    <template v-slot:toolbar-animation>
      <AnimationToolbar @toolbar-item-click="handleToolbarAction" />
    </template>
    <template v-slot:panel-animation>
      <AnimationPanel :element="selectElement" @change="handleChangeSelectedElement" />
    </template>
    <template v-slot:canvas-animation>
      <AnimationCanvas v-on="svgCanvasHandlers" :key="forceUpdateFlag" :time="currentTime" />
    </template>
    <template v-slot:timeline-animation>
      <AnimationTimeline
        v-on="svgTimelineHandlers"
        ref="animationTimelineRef"
        :time="currentTime"
      />
    </template>
  </AppDefaultLayout>
</template>

<script lang="ts">
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { defineAsyncComponent, defineComponent, onMounted, provide, ref } from "vue";

import { SVG_CANVAS_EVENT } from "@core/constants/svg";

import { APP_MODE } from "@core/constants/navigator";

import { useStore } from "vuex";

import AppDefaultLayout from "./layout/default.vue";

import AnimationToolbar from "./components/animation/toolbar.vue";
import AnimationCanvas from "./components/animation/canvas.vue";
import AnimationTimeline from "./components/animation/timeline.vue";
import AnimationPanel from "./components/animation/panel.vue";
import { useRerenderer } from "@/core/use/useRerenderer";
import { ToolbarAction, defaultElementMapping } from "@/core/constants/svg";

export default defineComponent({
  name: "AppAnimation",
  components: {
    AppDefaultLayout,
    Navigator: defineAsyncComponent(() => import("./components/navigator/navigator.vue")),
    AnimationPanel,
    AnimationToolbar,
    AnimationCanvas,
    AnimationTimeline,
  },
  setup() {
    const store = useStore();

    const canvasWidth = ref(700);
    const canvasHeight = ref(450);
    const currentTime = ref(1000);
    const duration = ref(5000);

    provide("currentTime", currentTime);
    provide("duration", duration);
    provide("canvasWidth", canvasWidth);
    provide("canvasHeight", canvasHeight);

    const animationTimelineRef = ref(null);

    const { forceUpdate, forceUpdateFlag } = useRerenderer();

    const _updateTimelineElements = (payload?: any) => {
      if (payload) {
        store.dispatch("app/updateElements", payload);
      }

      const animationTimelineElement = animationTimelineRef.value as any;

      if (animationTimelineElement) {
        animationTimelineElement.updateElements();
      }
    };

    const _updateCanvasElements = (payload?: any) => {
      if (payload) {
        store.dispatch("app/updateElements", payload);
      }

      forceUpdate();
    };

    // Fetch data from backend
    const _getCanvasDataOnce = async () => {
      await store.dispatch("app/getElements");

      _updateCanvasElements();
      _updateTimelineElements();
    };
    onMounted(_getCanvasDataOnce);

    const _updateCurrentTime = (time: number) => {
      currentTime.value = time;
    };

    const selectElement = ref<any>(null);

    const svgCanvasHandlers = {
      [SVG_CANVAS_EVENT.UPDATE]: _updateTimelineElements,
      [SVG_CANVAS_EVENT.SELECT]: (elements: any) => {
        selectElement.value = Object.values(elements)[0];
      },
      [SVG_CANVAS_EVENT.DESELECT]: () => {
        selectElement.value = null;
      },
    };

    const svgTimelineHandlers = {
      [SVG_CANVAS_EVENT.UPDATE]: _updateCanvasElements,
      [SVG_CANVAS_EVENT.UPDATE_TIME]: _updateCurrentTime,
    };

    const handleToolbarAddRectangle = async () => {
      return await store.dispatch("app/addElement", defaultElementMapping[ToolbarAction.RECTANGLE]);
    };
    const handleToolbarAddSquare = async () => {
      return await store.dispatch("app/addElement", defaultElementMapping[ToolbarAction.SQUARE]);
    };
    const handleToolbarAddCircle = async () => {
      return await store.dispatch("app/addElement", defaultElementMapping[ToolbarAction.CIRCLE]);
    };
    const handleToolbarAddEllipse = async () => {
      return await store.dispatch("app/addElement", defaultElementMapping[ToolbarAction.ELLIPSE]);
    };
    const handleToolbarAddPolyline = async () => {
      return await store.dispatch("app/addElement", defaultElementMapping[ToolbarAction.POLYLINE]);
    };
    const handleToolbarAddPath = async () => {
      return await store.dispatch("app/addElement", defaultElementMapping[ToolbarAction.PATH]);
    };
    const handleToolbarCrop = () => {
      console.log("Crop canvas");
      // store.dispatch("app/addElement", defaultElementMapping[ToolbarAction.CROP]);
    };

    const handleChangeSelectedElement = (element: any) => {
      console.log(element);
    };

    const toolbarActionFunctionMap = {
      [ToolbarAction.RECTANGLE]: handleToolbarAddRectangle,
      [ToolbarAction.SQUARE]: handleToolbarAddSquare,
      [ToolbarAction.CIRCLE]: handleToolbarAddCircle,
      [ToolbarAction.ELLIPSE]: handleToolbarAddEllipse,
      [ToolbarAction.POLYLINE]: handleToolbarAddPolyline,
      [ToolbarAction.PATH]: handleToolbarAddPath,
      [ToolbarAction.CROP]: handleToolbarCrop,
    };

    const handleToolbarAction = async (action: ToolbarAction) => {
      await toolbarActionFunctionMap[action]();

      _updateCanvasElements();
      _updateTimelineElements();
    };

    return {
      currentTime,
      svgCanvasHandlers,
      svgTimelineHandlers,
      animationTimelineRef,
      APP_MODE,
      forceUpdateFlag,
      handleToolbarAction,
      handleChangeSelectedElement,
      selectElement,
    };
  },
});
</script>
