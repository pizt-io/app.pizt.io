<template>
  <div class="va-timeline-component">
    <div class="va-timeline-component__header">
      <div class="va-timeline-component__toolbar" :style="{ width: '320px' }">
        <span class="va-toolbar__left">
          <span class="va-toolbar__left__current-time">
            <i class="icon icon-va-clock-o" />
            <span>(s)</span>
            <input
              type="number"
              :max="timelineDuration / TIMELINE_MAXIMUM_DIVISION_RATE"
              min="0"
              step="0.001"
              :value="(currentTime / TIMELINE_MAXIMUM_DIVISION_RATE).toFixed(3)"
              @change="handleChangeCurrentTime"
            />
          </span>
        </span>
        <span class="va-toolbar__right">
          <Tippy trigger="click">
            <i class="icon icon-va-plus-circle" />
            <template v-slot:body>
              <div> Add keyframe </div>
            </template>
          </Tippy>
        </span>
      </div>
      <div
        ref="vaTimelineRulerRef"
        class="va-timeline-component__ruler"
        :style="{
          marginLeft: TIMELINE_BODY_LEFT_OFFSET + 'px',
          marginRight: TIMELINE_BODY_RIGHT_OFFSET + 'px',
        }"
      >
        <i
          class="va-timeline-component__indicator__caret icon icon-va-eject"
          :style="{
            left: (currentTime * 100) / timelineDuration + '%',
          }"
          @mousedown="handleMousedownIndicator"
        />
        <div
          class="va-timeline-component__indicator__line"
          :style="{
            top: '50%',
            left: (currentTime * 100) / timelineDuration + '%',
            height: `calc(${vaTimelineBodyHeight}px + 50%)`,
          }"
        />
        <div class="va-timeline-component__ruler_inner">
          <i key="u-0" class="u" style="left: 0; height: 100%" />
          <i
            v-for="unit in timelineDuration / TIMELINE_MINIMUM_DIVISION_RATE"
            :key="'u-' + unit"
            class="u"
            :style="{
              left: (unit * 100) / (timelineDuration / TIMELINE_MINIMUM_DIVISION_RATE) + '%',
              height:
                unit % (TIMELINE_MAXIMUM_DIVISION_RATE / TIMELINE_MINIMUM_DIVISION_RATE)
                  ? '50%'
                  : '100%',
            }"
          />
          <span class="t">0s</span>
          <span
            v-for="time in timelineDuration / TIMELINE_MAXIMUM_DIVISION_RATE"
            :key="'t-' + time"
            class="t"
            :style="{
              left: (time * 100) / (timelineDuration / TIMELINE_MAXIMUM_DIVISION_RATE) + '%',
            }"
          >
            {{ time }}s
          </span>
        </div>
      </div>
    </div>
    <div ref="vaTimelineBodyRef" class="va-timeline-component__body">
      <div class="va-layer__wrapper" :style="{ width: '320px' }">
        <draggable v-model="elements" v-bind="dragOptions" v-on="dragEventHandlers" item-key="id">
          <template v-slot:item="{ index }">
            <LayerItem v-model="elements[index]" />
          </template>
        </draggable>
      </div>
      <div
        class="va-timeline__wrapper"
        :style="{
          paddingLeft: TIMELINE_BODY_LEFT_OFFSET + 'px',
        }"
      >
        <TimelineItem
          v-for="(element, index) in elements"
          v-model="elements[index]"
          :key="element.id"
          :duration="timelineDuration"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from "vue";
import TimelineItem from "./components/timeline/timeline-item.vue";
import LayerItem from "./components/layer/layer-item.vue";
import Tippy from "./components/tippy/tippy.vue";

import draggable from "vuedraggable";

type Element = {
  id: string;
  name: string;
  keyframes: string[];
  expanded?: boolean;
  stages: {
    [key: string]: {
      time: number;
      label: string;
      property: string;
      value: any;
    };
  };
};

const TIMELINE_MINIMUM_DIVISION_RATE = 100;
const TIMELINE_MAXIMUM_DIVISION_RATE = 1000;

const TIMELINE_BODY_LEFT_OFFSET = 5;
const TIMELINE_BODY_RIGHT_OFFSET = 10;

export default defineComponent({
  name: "AnimationTimeline",
  components: { draggable, TimelineItem, LayerItem, Tippy },
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  setup(_props, { emit }) {
    const vaTimelineBodyRef = ref<null | HTMLDivElement>(null);
    const vaTimelineBodyHeight = computed(() => {
      if (vaTimelineBodyRef.value) {
        return vaTimelineBodyRef.value.clientHeight;
      }

      return 0;
    });

    const isDragging = ref(false);
    const dragOptions = computed(() => ({
      animation: 200,
      group: "description",
      disabled: false,
      ghostClass: "draggable-ghost",
      handle: ".handle",
    }));
    const dragEventHandlers = {
      start() {
        isDragging.value = true;
      },
      end() {
        isDragging.value = false;
      },
    };

    const timelineDuration = ref(10000);

    const currentTime = ref(2000);
    const elements = ref<Element[]>([
      {
        id: "1jhg1kj23jkh4kj67jh",
        name: "Layer 1",
        keyframes: ["stage-id-168rf9c8f9c88478f9c88038f", "stage-id-268rf9c8f9c88478f9c88038f"],
        expanded: false,
        stages: {
          "stage-id-168rf9c8f9c88478f9c88038f": {
            time: 0,
            label: "Position",
            property: "position",
            value: { x: 150, y: 100 },
          },
          "stage-id-268rf9c8f9c88478f9c88038f": {
            time: 2500,
            label: "Position",
            property: "position",
            value: { x: 200, y: 150 },
          },
        },
      },
      {
        id: "2jhg1kj23jkh4kj67jh",
        name: "Layer 2",
        keyframes: [
          "stage-id-168rf9c8f9c88478f9c88038f",
          "stage-id-268rf9c8f9c74478f9c88038f",
          "stage-id-468rf9c8f9c88ỉbf9c88038f",
          "stage-id-568rf9c8f9c88478f9c88038f",
        ],
        expanded: true,
        stages: {
          "stage-id-168rf9c8f9c88478f9c88038f": {
            time: 0,
            label: "Opacity",
            property: "opacity",
            value: 0,
          },
          "stage-id-268rf9c8f9c74478f9c88038f": {
            time: 3500,
            label: "Opacity",
            property: "opacity",
            value: 0.9,
          },
          "stage-id-468rf9c8f9c88ỉbf9c88038f": {
            time: 4000,
            label: "Opacity",
            property: "opacity",
            value: 0.5,
          },
          "stage-id-568rf9c8f9c88478f9c88038f": {
            time: 2500,
            label: "Position",
            property: "position",
            value: { x: 200, y: 150 },
          },
        },
      },
      {
        id: "3jhg1kj23jkh4kj67jh",
        name: "Layer 3",
        keyframes: [
          "stage-id-168rf9c8f9c88478f9c88038f",
          "stage-id-268rf9c8f4c74478f9c88038f",
          "stage-id-468rf9c8f9c88ỉbf9c48038f",
          "stage-id-568rf9c8f9c88478f9c88038f",
        ],
        expanded: true,
        stages: {
          "stage-id-168rf9c8f9c88478f9c88038f": {
            time: 0,
            label: "Position",
            property: "position",
            value: { x: "150.0", y: "100.0" },
          },
          "stage-id-268rf9c8f4c74478f9c88038f": {
            time: 2700,
            label: "Color",
            property: "color",
            value: "#cf3c3c",
          },
          "stage-id-468rf9c8f9c88ỉbf9c48038f": {
            time: 3000,
            label: "Position",
            property: "position",
            value: { x: "300.0", y: "200.0" },
          },
          "stage-id-568rf9c8f9c88478f9c88038f": {
            time: 1500,
            label: "Color",
            property: "color",
            value: "#3c74cf",
          },
        },
      },
    ]);

    watch(
      () => elements.value,
      () => {
        emit("update:modelValue", elements.value);
      },
      { immediate: true, deep: true },
    );

    const handleChangeCurrentTime = (e: any) => {
      currentTime.value = +e.target.value * TIMELINE_MAXIMUM_DIVISION_RATE;
    };

    const vaTimelineRulerRef = ref<null | HTMLDivElement>(null);
    const vaTimelineRulerBoundingBox = computed(() => {
      if (vaTimelineRulerRef.value) {
        return vaTimelineRulerRef.value.getBoundingClientRect();
      }

      return {
        bottom: 0,
        height: 0,
        left: 0,
        right: 0,
        top: 0,
        width: 0,
        x: 0,
        y: 0,
      };
    });
    const vaTimelineRulerLength = computed(() => {
      if (vaTimelineRulerBoundingBox.value?.width) {
        return (
          vaTimelineRulerBoundingBox.value?.width -
          TIMELINE_BODY_LEFT_OFFSET -
          TIMELINE_BODY_RIGHT_OFFSET
        );
      }

      return 0;
    });

    const isDraggingTimelineIndicator = ref(false);
    const handleMousedownIndicator = () => {
      isDraggingTimelineIndicator.value = true;
    };
    const _handleMounseupIndicator = () => {
      isDraggingTimelineIndicator.value = false;
    };

    const _handleMousemoveIndicator = (e: MouseEvent) => {
      if (isDraggingTimelineIndicator.value && vaTimelineRulerRef.value) {
        const xRelativeToRuler = e.clientX - vaTimelineRulerBoundingBox.value.left;

        if (xRelativeToRuler < 0) {
          currentTime.value = 0;
        } else if (xRelativeToRuler > vaTimelineRulerLength.value) {
          currentTime.value = timelineDuration.value;
        } else {
          currentTime.value =
            (xRelativeToRuler / vaTimelineRulerLength.value) * timelineDuration.value;
        }
      }
    };

    onMounted(() => {
      window.addEventListener("mousemove", _handleMousemoveIndicator);
      window.addEventListener("mouseup", _handleMounseupIndicator);
    });

    return {
      TIMELINE_MINIMUM_DIVISION_RATE,
      TIMELINE_MAXIMUM_DIVISION_RATE,
      TIMELINE_BODY_LEFT_OFFSET,
      TIMELINE_BODY_RIGHT_OFFSET,
      vaTimelineBodyRef,
      vaTimelineBodyHeight,
      elements,
      dragOptions,
      dragEventHandlers,
      currentTime,
      timelineDuration,
      vaTimelineRulerRef,
      isDraggingTimelineIndicator,
      handleChangeCurrentTime,
      handleMousedownIndicator,
    };
  },
});
</script>

<style lang="scss" src="./styles/main.scss"></style>

<style lang="scss" src="./styles/draggable.scss"></style>

<style lang="css" src="./styles/icons/style.css"></style>
