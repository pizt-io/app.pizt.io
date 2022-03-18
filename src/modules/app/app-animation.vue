<template>
  <AppDefaultLayout :mode="APP_MODE.SVG" @select="handleSelectProject">
    <template v-slot:app-navigator>
      <Navigator />
    </template>
    <template v-slot:toolbar-animation>
      <AnimationToolbar v-if="currentUser" @toolbar-item-click="handleToolbarAction" />
    </template>
    <template v-slot:panel-animation>
      <AnimationPanel :element="selectElements?.[0]" @change="handleChangeSelectedElement" />
    </template>
    <template v-slot:canvas-animation>
      <AnimationCanvas
        v-on="svgCanvasHandlers"
        :key="forceUpdateFlag"
        :time="currentTime"
        :transform="canvasTransform"
        @panzoom="handlePanzoomCanvas"
      />
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
import { defineAsyncComponent, defineComponent, onMounted, provide, ref, computed } from "vue";

import { SVG_CANVAS_EVENT, SVG_ELEMENT_TYPE } from "@core/constants/svg";

import { APP_MODE } from "@core/constants/navigator";

import { useStore } from "vuex";

import AppDefaultLayout from "./layout/default.vue";

import AnimationToolbar from "./components/animation/toolbar.vue";
import AnimationCanvas from "./components/animation/canvas.vue";
import AnimationTimeline from "./components/animation/timeline.vue";
import AnimationPanel from "./components/animation/panel.vue";
import { useRerenderer } from "@/core/use/useRerenderer";
import { ToolbarAction, defaultElementMapping } from "@/core/constants/svg";

import { parse } from "svgson";

// import _reverse from "lodash/reverse";

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
    const currentTime = ref(0);
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

    const currentUser = computed(() => store.state.userSession?.user);

    // Fetch data from backend
    const _getCanvasDataOnce = async () => {
      await store.dispatch("app/getProjects");

      await store.dispatch("app/getElements");

      _updateCanvasElements();
      _updateTimelineElements();
    };
    onMounted(() => {
      if (currentUser.value) {
        _getCanvasDataOnce();
      }
    });

    const _updateCurrentTime = (time: number) => {
      currentTime.value = time;
    };

    const selectElements = ref<any>(null);

    const svgCanvasHandlers = {
      [SVG_CANVAS_EVENT.UPDATE]: _updateTimelineElements,
      [SVG_CANVAS_EVENT.SELECT]: (elements: any) => {
        selectElements.value = Object.values(elements);
      },
      [SVG_CANVAS_EVENT.DESELECT]: () => {
        selectElements.value = null;
      },
      [SVG_CANVAS_EVENT.DELETE]: async () => {
        await store.dispatch("app/removeElements", selectElements.value);

        _updateCanvasElements();
        _updateTimelineElements();

        selectElements.value = null;
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
    const handleToolbarImport = () => {
      if (document) {
        const inputFile = document.createElement("input");
        inputFile.type = "file";

        inputFile.addEventListener("change", async (e: any) => {
          const file = e.target.files[0];

          if (file) {
            const reader = new FileReader();
            reader.onload = async (e: any) => {
              const svg = e.target.result;

              if (svg) {
                parse(svg).then(async (result) => {
                  const elements = result.children.map((el) =>
                    JSON.parse(
                      JSON.stringify({
                        type: el.name,
                        name: el.name + " new",
                        attrs: {
                          pos:
                            el.name === SVG_ELEMENT_TYPE.PATH
                              ? undefined
                              : { x: +el.attributes.x, y: +el.attributes.y },
                          size:
                            el.name === SVG_ELEMENT_TYPE.PATH
                              ? undefined
                              : { width: +el.attributes.width, height: +el.attributes.height },
                          commands:
                            el.name !== SVG_ELEMENT_TYPE.PATH
                              ? undefined
                              : window.parsePathDataString(el.attributes.d).map((i) => {
                                  return {
                                    type: i.type,
                                    path: i.values,
                                  };
                                }) || [],
                          transform: {
                            translate: { translateX: 0, translateY: 0 },
                            scale: { scaleX: 1, scaleY: 1 },
                            rotate: 0,
                            skew: { skewX: 0, skewY: 0 },
                            transformOrigin: "center center",
                          },
                          style: {
                            fill: el.attributes.fill,
                            stroke: el.attributes.stroke,
                            strokeWidth: el.attributes.strokeWidth,
                            opacity: el.attributes.opacity,
                            strokeDasharray: el.attributes.strokeDasharray,
                            strokeDashoffset: el.attributes.strokeDashoffset,
                          },
                        },
                        animations: {},
                      }),
                    ),
                  );

                  await store.dispatch("app/addElements", elements);

                  _updateCanvasElements();
                  _updateTimelineElements();
                });
              }
            };
            reader.readAsText(file);
          }
        });
        inputFile.click();
      }
    };

    const handleChangeSelectedElement = (_element: any) => {
      // console.log(element);
    };

    const toolbarActionFunctionMap = {
      [ToolbarAction.RECTANGLE]: handleToolbarAddRectangle,
      [ToolbarAction.SQUARE]: handleToolbarAddSquare,
      [ToolbarAction.CIRCLE]: handleToolbarAddCircle,
      [ToolbarAction.ELLIPSE]: handleToolbarAddEllipse,
      [ToolbarAction.POLYLINE]: handleToolbarAddPolyline,
      [ToolbarAction.PATH]: handleToolbarAddPath,
      [ToolbarAction.CROP]: handleToolbarCrop,
      [ToolbarAction.IMPORT]: handleToolbarImport,
    };

    const handleToolbarAction = async (action: ToolbarAction) => {
      await toolbarActionFunctionMap[action]();

      _updateCanvasElements();
      _updateTimelineElements();
    };

    const canvasTransform = ref({
      translateX: 0,
      translateY: 0,
      scale: 1,
    });

    const handlePanzoomCanvas = (payload: any) => {
      canvasTransform.value = payload;
    };

    const handleSelectProject = async () => {
      _updateCanvasElements();
      _updateTimelineElements();

      selectElements.value = null;
    };

    return {
      currentUser,
      currentTime,
      svgCanvasHandlers,
      svgTimelineHandlers,
      animationTimelineRef,
      APP_MODE,
      forceUpdateFlag,
      handleToolbarAction,
      handleChangeSelectedElement,
      selectElements,
      canvasTransform,
      handlePanzoomCanvas,
      handleSelectProject,
    };
  },
});
</script>
