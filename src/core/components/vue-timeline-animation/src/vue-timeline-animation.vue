<template>
  <div class="va-timeline-component">
    <div class="va-layer__wrapper" :style="{ width: '320px' }">
      <div class="va-layer__toolbar"></div>
      <div class="va-layer__container">
        <draggable v-model="elements" v-bind="dragOptions" v-on="dragEventHandlers" item-key="id">
          <template v-slot:item="{ index }">
            <LayerItem v-model="elements[index]" />
          </template>
        </draggable>
      </div>
    </div>
    <div class="va-timeline__wrapper">
      <div class="va-timeline__ruler">
        <i
          class="va-timeline__indicator__caret icon icon-va-eject"
          :style="{
            left: currentTime * 100 + '%',
          }"
        ></i>
      </div>
      <div class="va-timeline__container">
        <div
          class="va-timeline__indicator__line"
          :style="{
            left: currentTime * 100 + '%',
          }"
        ></div>
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
  components: { draggable, TimelineItem, LayerItem },
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  setup(_props, { emit }) {
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
    ]);

    watch(
      () => elements.value,
      () => {
        emit("update:modelValue", elements.value);
      },
      { immediate: true, deep: true },
    );

    return {
      currentTime,
      elements,
      dragOptions,
      dragEventHandlers,
    };
  },
});
</script>

<style lang="scss" src="./styles/main.scss"></style>

<style lang="scss" src="./styles/draggable.scss"></style>

<style lang="css" src="./styles/icons/style.css"></style>
