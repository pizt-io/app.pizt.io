<template>
  <div
    class="flex justify-center items-center w-full h-full"
    :key="forceUpdateFlag"
    :style="{
      cursor: isHoldingSpace ? 'all-scroll' : 'default',
    }"
    @mousedown="handleMousedownCanvas"
  >
    <div
      :style="{
        width: canvasWidth + 'px',
        height: canvasHeight + 'px',
        transform: `translate(${transform.translateX}px, ${transform.translateY}px) scale(${transform.scale})`,
      }"
      class="bg-white dark:bg-gray-800"
    >
      <SVGCanvas
        v-model:modelElements="canvasElements"
        ref="canvasRef"
        :time="time"
        @select="$emit(SVG_CANVAS_EVENT.SELECT, $event)"
        @deselect="$emit(SVG_CANVAS_EVENT.DESELECT, $event)"
      />
    </div>
  </div>
</template>

<script lang="ts">
// PERFORMANCE NOTICE:
// DEVTOOL CAN SOMETIME NOT DETECT CHANGES IN THE COMPONENT DUE TO HUGE AND DEEPLY NESTED DATA CHANGES

import {
  ComponentPublicInstance,
  computed,
  defineAsyncComponent,
  defineComponent,
  getCurrentInstance,
  onMounted,
  ref,
} from "vue";
import { useStore } from "vuex";
import { SVG_CANVAS_EVENT, SVG_UPDATE_TYPE } from "@/core/constants/svg";
import { useRerenderer } from "@/core/use/useRerenderer";
import { useSVGCanvasEvents } from "./use/events/useSVGCanvasEvents";

export default defineComponent({
  name: "AnimationCanvas",
  components: {
    SVGCanvas: defineAsyncComponent(
      () => import("@/modules/app/components/animation/svg-wrapper/SVGCanvas.vue"),
    ),
  },
  props: {
    time: {
      type: Number,
      default: 0,
    },
    transform: {
      type: Object,
      default: () => ({
        translateX: 0,
        translateY: 0,
        scale: 1,
      }),
    },
  },
  emits: [
    SVG_CANVAS_EVENT.UPDATE,
    SVG_CANVAS_EVENT.SELECT,
    SVG_CANVAS_EVENT.DESELECT,
    SVG_CANVAS_EVENT.DELETE,
    "panzoom",
  ],
  setup(props, { emit }) {
    const vm = getCurrentInstance()?.proxy;

    const canvasRef = ref<ComponentPublicInstance | null>(null);

    const store = useStore();

    const canvasWidth = ref(700);
    const canvasHeight = ref(450);
    const hasUnsyncedDataFromOtherUser = ref(false);

    const canvasElements = computed({
      get: () => store.getters["app/getElements"],
      set: ({ elements, path }) => {
        emit(SVG_CANVAS_EVENT.UPDATE, { elements, path, type: SVG_UPDATE_TYPE.CANVAS });
      },
    });

    const { forceUpdate, forceUpdateFlag } = useRerenderer();
    const updateElements = () => {
      vm?.$nextTick(forceUpdate);
    };

    const isMousedownLayoutBody = ref(false);
    const { isHoldingSpace, isHoldingAlt } = useSVGCanvasEvents({
      onKeydownSpace: (e) => {
        e.preventDefault();
      },
      onKeydownAlt: (e) => {
        e.preventDefault();
      },
      onKeydownDelete: (e) => {
        e.preventDefault();

        emit(SVG_CANVAS_EVENT.DELETE);
      },
    });

    const handleMousedownCanvas = () => {
      isMousedownLayoutBody.value = true;
    };

    onMounted(() => {
      window.addEventListener("mouseup", () => {
        isMousedownLayoutBody.value = false;
      });
      window.addEventListener("mousemove", (e: MouseEvent) => {
        if (isMousedownLayoutBody.value && isHoldingSpace.value) {
          emit("panzoom", {
            translateX: props.transform.translateX + e.movementX,
            translateY: props.transform.translateY + e.movementY,
            scale: props.transform.scale,
          });
        }
      });
      document.addEventListener("wheel", (e: WheelEvent) => {
        if (isHoldingAlt.value) {
          emit("panzoom", {
            translateX: props.transform.translateX,
            translateY: props.transform.translateY,
            scale: props.transform.scale + e.deltaY / 1000,
          });
        }
      });
    });

    return {
      SVG_CANVAS_EVENT,
      canvasElements,
      canvasRef,
      canvasWidth,
      canvasHeight,
      hasUnsyncedDataFromOtherUser,
      updateElements,
      forceUpdateFlag,
      handleMousedownCanvas,
      isHoldingSpace,
    };
  },
});
</script>
