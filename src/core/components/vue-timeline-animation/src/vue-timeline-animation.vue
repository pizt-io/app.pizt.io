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
              :max="timelineDuration / 1000"
              min="0"
              step="0.001"
              :value="((timelineDuration * currentTime) / 1000).toFixed(3)"
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
      <div class="va-timeline-component__ruler">
        <i
          class="va-timeline-component__indicator__caret icon icon-va-eject"
          :style="{
            left: currentTime * 100 + '%',
          }"
        />
        <div
          class="va-timeline-component__indicator__line"
          :style="{
            top: '50%',
            left: currentTime * 100 + '%',
            height: `calc(${vaTimelineBodyHeight}px + 50%)`,
          }"
        ></div>
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
      <div class="va-timeline__wrapper">
        <TimelineItem
          v-for="(element, index) in elements"
          v-model="elements[index]"
          :key="element.id"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
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
      keyframe: number;
      label: string;
      property: string;
      value: any;
    };
  };
};

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

    const timelineDuration = ref(5000);

    const currentTime = ref(0.5);
    const elements = ref<Element[]>([
      {
        id: "1jhg1kj23jkh4kj67jh",
        name: "Layer 1",
        keyframes: ["stage-id-168rf9c8f9c88478f9c88038f", "stage-id-268rf9c8f9c88478f9c88038f"],
        expanded: false,
        stages: {
          "stage-id-168rf9c8f9c88478f9c88038f": {
            keyframe: 0,
            label: "Position",
            property: "position",
            value: { x: 150, y: 100 },
          },
          "stage-id-268rf9c8f9c88478f9c88038f": {
            keyframe: 0.5,
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
            keyframe: 0,
            label: "Opacity",
            property: "opacity",
            value: 0,
          },
          "stage-id-268rf9c8f9c74478f9c88038f": {
            keyframe: 0.3,
            label: "Opacity",
            property: "opacity",
            value: 0.9,
          },
          "stage-id-468rf9c8f9c88ỉbf9c88038f": {
            keyframe: 0.7,
            label: "Opacity",
            property: "opacity",
            value: 0.5,
          },
          "stage-id-568rf9c8f9c88478f9c88038f": {
            keyframe: 0.5,
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
            keyframe: 0,
            label: "Position",
            property: "position",
            value: { x: "150.0", y: "100.0" },
          },
          "stage-id-268rf9c8f4c74478f9c88038f": {
            keyframe: 0.3,
            label: "Color",
            property: "color",
            value: "#cf3c3c",
          },
          "stage-id-468rf9c8f9c88ỉbf9c48038f": {
            keyframe: 0.6,
            label: "Position",
            property: "position",
            value: { x: "300.0", y: "200.0" },
          },
          "stage-id-568rf9c8f9c88478f9c88038f": {
            keyframe: 0.9,
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
      currentTime.value = (+e.target.value * 1000) / timelineDuration.value;
    };

    return {
      vaTimelineBodyRef,
      vaTimelineBodyHeight,
      currentTime,
      timelineDuration,
      elements,
      dragOptions,
      dragEventHandlers,
      handleChangeCurrentTime,
    };
  },
});
</script>

<style lang="scss" src="./styles/main.scss"></style>

<style lang="scss" src="./styles/draggable.scss"></style>

<style lang="css" src="./styles/icons/style.css"></style>
