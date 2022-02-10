<template>
  <div class="va-timeline-component" :key="timelineComponentForceRerenderFlag">
    <div class="va-timeline-component__header">
      <div class="va-timeline-component__toolbar" :style="{ width: '320px' }">
        <span class="va-toolbar__left">
          <span class="va-toolbar__left__current-time">
            <i class="icon icon-va-clock-o" />
            <span>(s)</span>
            <input
              type="number"
              step="0.01"
              min="0"
              :max="timelineDuration / TIMELINE_MAXIMUM_DIVISION_RATE"
              :value="(currentTime / TIMELINE_MAXIMUM_DIVISION_RATE).toFixed(2)"
              @change="handleChangeCurrentTime"
            />
          </span>
        </span>
        <span class="va-toolbar__right">
          <Tippy trigger="click" :options="{ hideOnClick: true }">
            <i class="icon icon-va-plus-circle" />
            <template v-slot:body>
              <ul>
                <li
                  v-for="animation in selectableAnimations"
                  :key="animation.value"
                  @click="handleAddAnimation(animation)"
                >
                  Animate {{ animation.label }}
                </li>
              </ul>
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
    <div
      ref="vaTimelineBodyRef"
      :key="timelineBodyForceRerenderFlag"
      class="va-timeline-component__body"
    >
      <draggable
        v-model="elements"
        v-bind="dragOptions"
        v-on="dragEventHandlers"
        style="width: 100%"
        item-key="id"
      >
        <template v-slot:item="{ index }">
          <TimelineItem
            v-model="elements[index]"
            :ref="'timelineItemRef' + index"
            :key="`t-${elements[index]._id}-`"
            :expanded="expandedElements.includes(elements[index]._id)"
            :duration="timelineDuration"
            :selected="selectedElement._id === elements[index]._id"
            @expand="handleExpandItem(index)"
            @change="handleChangeItem(index, $event)"
            @select="handleSelectElement"
          />
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import { useCursor } from "./use/useCursor";
import {
  ANIMATED_ATTRIBUTES,
  AttributesMap,
  DEFAULT_VALUE_MAPPPING,
  LABEL_MAPPING,
} from "./constants";
import { computed, defineComponent, onMounted, ref, shallowRef, triggerRef, watch } from "vue";

import TimelineItem from "./components/timeline/timeline-item.vue";
import Tippy from "./components/tippy/tippy.vue";

import draggable from "vuedraggable";

import _throttle from "lodash/throttle";
import _get from "lodash/get";
import _set from "lodash/set";

const TIMELINE_MINIMUM_DIVISION_RATE = 100;
const TIMELINE_MAXIMUM_DIVISION_RATE = 1000;

const TIMELINE_BODY_LEFT_OFFSET = 5;
const TIMELINE_BODY_RIGHT_OFFSET = 10;

const TIMELINE_THROTTLE_RATE = 100;

export default defineComponent({
  name: "VueAnimationTimeline",
  components: { draggable, TimelineItem, Tippy },
  props: {
    duration: {
      type: Number,
      default: 5000,
    },
    modelElements: {
      type: Array,
      required: true,
      default: () => [],
    },
    modelCurrentTime: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  emits: ["update:modelElements", "update:modelCurrentTime", "select"],
  setup(props, { emit }) {
    const vaTimelineBodyRef = ref<null | HTMLDivElement>(null);
    const vaTimelineBodyHeight = computed(() => {
      if (vaTimelineBodyRef.value) {
        return vaTimelineBodyRef.value.clientHeight;
      }

      return 0;
    });
    const timelineDuration = ref(props.duration);
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

        triggerRef(elements);
        emit("update:modelElements", elements.value);
      },
    };

    const currentTime = ref(props.modelCurrentTime as number);

    const elements = shallowRef(props.modelElements as any[]);
    const updateElements = () => {
      elements.value = props.modelElements;
      triggerRef(elements);
    };

    const selectedElement = ref(elements.value[0] || null);
    const handleSelectElement = (element: any) => {
      selectedElement.value = element;
      emit("select", element);
    };

    const selectableAnimations = computed(() =>
      timelineBodyForceRerenderFlag.value && selectedElement.value
        ? ANIMATED_ATTRIBUTES.filter(
            (attr) => !Object.keys(selectedElement.value.animations).includes(attr),
          ).map((attr) => ({
            value: attr,
            label: LABEL_MAPPING[attr],
          }))
        : [],
    );

    const timelineComponentForceRerenderFlag = ref(1);
    const _forceRerenderTimelineComponent = _throttle(function () {
      timelineComponentForceRerenderFlag.value++;
    }, TIMELINE_THROTTLE_RATE);

    const timelineBodyForceRerenderFlag = ref(1);
    const _forceRerenderTimelineBody = _throttle(function () {
      timelineBodyForceRerenderFlag.value++;
    }, TIMELINE_THROTTLE_RATE);

    const forceRerenderElements = (onlyRerenderBody?: boolean) => {
      updateElements();
      if (onlyRerenderBody) {
        _forceRerenderTimelineBody();
      } else {
        // rerender all
        _forceRerenderTimelineComponent();
      }
    };

    const handleChangeCurrentTime = (e: any) => {
      currentTime.value = +e.target.value * TIMELINE_MAXIMUM_DIVISION_RATE;

      _forceRerenderTimelineBody();
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

    const { changeCursor, CURSOR_TYPE } = useCursor();
    const _handleMounseupIndicator = () => {
      isDraggingTimelineIndicator.value = false;
      changeCursor(CURSOR_TYPE.INHERIT);
    };

    const _handleMousemoveIndicator = _throttle(function (e: MouseEvent) {
      if (isDraggingTimelineIndicator.value && vaTimelineRulerRef.value) {
        changeCursor(CURSOR_TYPE.GRABBING);
        const xRelativeToRuler = e.clientX - vaTimelineRulerBoundingBox.value.left;

        if (xRelativeToRuler < 0) {
          currentTime.value = 0;
        } else if (xRelativeToRuler > vaTimelineRulerLength.value) {
          currentTime.value = timelineDuration.value;
        } else {
          currentTime.value =
            (xRelativeToRuler / vaTimelineRulerLength.value) * timelineDuration.value;
        }

        _forceRerenderTimelineBody();
      }
    }, TIMELINE_THROTTLE_RATE);

    onMounted(() => {
      window.addEventListener("mousemove", _handleMousemoveIndicator);
      window.addEventListener("mouseup", _handleMounseupIndicator);
    });

    watch(
      currentTime,
      () => {
        emit("update:modelCurrentTime", currentTime.value);
      },
      { immediate: true },
    );

    const expandedElements = ref<string[]>([]);
    const handleExpandItem = (index: number) => {
      const el = elements.value[index];
      const expandedIndex = expandedElements.value.indexOf(el._id);

      if (expandedIndex < 0) {
        expandedElements.value.push(el._id);
      } else {
        expandedElements.value.splice(expandedIndex, 1);
      }
    };

    const handleChangeItem = (index: number, payload: any) => {
      const stages = elements.value[index].animations[payload.attr];
      const stageIndex = stages.findIndex((e: any) => e.time === payload.time);

      if (stageIndex >= 0) {
        _set(stages[stageIndex], payload.attr, payload.value);
      } else {
        const newStage = { time: currentTime.value };
        _set(newStage, payload.attr, payload.value);

        stages.push(newStage);
      }

      triggerRef(elements);
      emit("update:modelElements", elements.value);

      _forceRerenderTimelineBody();
    };

    const handleAddAnimation = (animation: { label: string; value: AttributesMap }) => {
      const elementIndex = elements.value.findIndex(
        (e: any) => e._id === selectedElement.value._id,
      );

      if (elementIndex >= 0) {
        const newAnimation = {
          time: currentTime.value,
        };

        _set(
          newAnimation,
          animation.value,
          _get(selectedElement.value.attrs, animation.value) ||
            DEFAULT_VALUE_MAPPPING[animation.value],
        );

        elements.value[elementIndex].animations[animation.value] = [newAnimation];

        triggerRef(elements);
        handleSelectElement(elements.value[elementIndex]);

        _forceRerenderTimelineBody();
      }
    };

    return {
      TIMELINE_MINIMUM_DIVISION_RATE,
      TIMELINE_MAXIMUM_DIVISION_RATE,
      TIMELINE_BODY_LEFT_OFFSET,
      TIMELINE_BODY_RIGHT_OFFSET,
      vaTimelineBodyRef,
      vaTimelineBodyHeight,
      selectableAnimations,
      elements,
      expandedElements,
      dragOptions,
      dragEventHandlers,
      currentTime,
      timelineDuration,
      vaTimelineRulerRef,
      isDraggingTimelineIndicator,
      handleChangeCurrentTime,
      handleMousedownIndicator,
      handleExpandItem,
      handleChangeItem,
      timelineBodyForceRerenderFlag,
      timelineComponentForceRerenderFlag,
      forceRerenderElements,
      handleSelectElement,
      selectedElement,
      handleAddAnimation,
    };
  },
});
</script>

<style lang="scss" src="./styles/main.scss"></style>

<style lang="scss" src="./styles/draggable.scss"></style>

<style lang="css" src="./styles/icons/style.css"></style>
