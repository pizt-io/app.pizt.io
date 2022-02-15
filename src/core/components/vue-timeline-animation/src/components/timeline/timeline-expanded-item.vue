<script lang="ts">
import TimelineOpacityInputItem from "./timeline-property-input-item/timeline-opacity-input-item.vue";
import TimelineOriginInputItem from "./timeline-property-input-item/timeline-origin-input-item.vue";
import TimelineTranslateInputItem from "./timeline-property-input-item/timeline-translate-input-item.vue";
import TimelineSizeInputItem from "./timeline-property-input-item/timeline-size-input-item.vue";
import TimelineRotationInputItem from "./timeline-property-input-item/timeline-rotation-input-item.vue";
import TimelineColorInputItem from "./timeline-property-input-item/timeline-color-input-item.vue";
import TimelineScaleInputItem from "./timeline-property-input-item/timeline-scale-input-item.vue";
import TimelineSkewInputItem from "./timeline-property-input-item/timeline-skew-input-item.vue";
import TimelineNumberInputItem from "./timeline-property-input-item/timeline-number-input-item.vue";

import Tippy from "../tippy/tippy.vue";

import { ANIMATED_ATTRIBUTES, AttributesMap, LABEL_MAPPING } from "../../constants";
import { findStageBetweenStages } from "@/modules/app/utils/keyframes/findStageBetweenStages";
import { minMax } from "../../utils/minMax";
import { computed, defineComponent, h, inject, onMounted, ref, Ref } from "vue";

import _get from "lodash/get";
import _throttle from "lodash/throttle";

const INPUT_COMPONENT_MAPPING = Object.freeze({
  [AttributesMap.SIZE]: TimelineSizeInputItem,
  [AttributesMap.TRANSLATE]: TimelineTranslateInputItem,
  [AttributesMap.SCALE]: TimelineScaleInputItem,
  [AttributesMap.ROTATE]: TimelineRotationInputItem,
  [AttributesMap.SKEW]: TimelineSkewInputItem,
  [AttributesMap.ORIGIN]: TimelineOriginInputItem,
  [AttributesMap.FILL]: TimelineColorInputItem,
  [AttributesMap.STROKE]: TimelineColorInputItem,
  [AttributesMap.STROKE_WIDTH]: TimelineNumberInputItem,
  [AttributesMap.STROKE_DASH_ARRAY]: TimelineNumberInputItem,
  [AttributesMap.STROKE_DASH_OFFSET]: TimelineNumberInputItem,
  [AttributesMap.OPACITY]: TimelineOpacityInputItem,
}) as { [x: string]: any };

export default defineComponent({
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    duration: {
      type: Number,
      default: 5000,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:item", "expand", "change", "changeKeyframe", "removeAnimation", "removeKeyframe"],
  setup(props, { emit }) {
    const currentTime = inject<Ref<number>>("currentTime", ref(0));

    const isMousedown = ref(false);

    const timelineItemBodyBoundingBox = computed(
      () =>
        document && document.getElementsByClassName("va-expanded__body")[0].getBoundingClientRect(),
    );

    const updateItem = _throttle(function (payload: any) {
      emit("change", payload);
    }, 100);

    const updateItemKeyframe = _throttle(function (payload: any) {
      emit("changeKeyframe", payload);
    }, 100);

    const handleMouseup = () => {
      isMousedown.value = false;
    };

    const handleMousemove = (e: MouseEvent) => {
      if (isMousedown.value) {
        const timelineBodyWidth = timelineItemBodyBoundingBox.value.width;

        const currentKeyframeLeft = e.clientX - timelineItemBodyBoundingBox.value.left;

        const newTime = Math.round(
          minMax(0, props.duration, (props.duration * currentKeyframeLeft) / timelineBodyWidth),
        );

        updateItemKeyframe({
          keyframeIndex: selectedKeyframeIndex.value,
          time: newTime,
          attr: selectedAttr.value,
        });
      }
    };

    onMounted(() => {
      window.addEventListener("mouseup", handleMouseup);
      window.addEventListener("mousemove", handleMousemove);
    });

    const selectedKeyframeIndex = ref<null | any>(null);
    const selectedKeyframe = ref<null | any>(null);
    const selectedAttr = ref<null | string>(null);
    const handleSelectKeyframe = (stage: any, index: number, attr: string) => {
      isMousedown.value = true;

      selectedKeyframeIndex.value = index;
      selectedKeyframe.value = stage;
      selectedAttr.value = attr;
    };

    const handleRemoveAnimation = (attr: string) => {
      emit("removeAnimation", { attr });
    };

    const handleRemoveSelectedKeyframe = (attr: string) => {
      emit("removeKeyframe", { attr, keyframeIndex: selectedKeyframeIndex.value });
    };

    const renderTippyVNode = (body: string, triggerProps: any) =>
      h(
        Tippy,
        {
          trigger: "mouseover",
          offsetY: 5,
          hideOnMouseoutTrigger: true,
          tippyClass: "tooltip",
          options: { interactive: false, role: "tooltip" },
        },
        {
          default: () => h("i", triggerProps),
          body: () => h("span", body),
        },
      );

    return () =>
      h(
        "div",
        {
          class: "va-expanded__wrapper",
        },
        [
          ANIMATED_ATTRIBUTES.map((attr) => {
            const stages = props.item.animations[attr];

            const currentStage =
              stages &&
              (stages.find((stage: any) => stage.time === currentTime.value) ||
                findStageBetweenStages(stages, currentTime.value, attr));

            return (
              currentStage &&
              h(
                "div",
                {
                  class: "va-expanded__item",
                },
                [
                  h("div", { class: "va-property__item" }, [
                    h(
                      "label",
                      {
                        class: "va-property__label",
                      },
                      [
                        renderTippyVNode("Remove", {
                          class: "icon-va-times-circle",
                          style: { marginRight: "8px", cursor: "pointer" },
                          onClick: () => handleRemoveAnimation(attr),
                        }),
                        LABEL_MAPPING[attr],
                      ],
                    ),
                    h(
                      "div",
                      {
                        style: {
                          flex: 1,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "flex-end",
                          paddingRight: "8px",
                        },
                      },
                      [
                        h(INPUT_COMPONENT_MAPPING[attr], {
                          "modelValue": _get(currentStage, attr),
                          "onUpdate:modelValue": (value: any) => {
                            updateItem({
                              time: currentTime.value,
                              attr,
                              value,
                            });
                          },
                        }),
                        renderTippyVNode("Remove selected keyframe", {
                          class: "icon-va-point",
                          style: { marginLeft: "8px", cursor: "pointer" },
                          onClick: () => handleRemoveSelectedKeyframe(attr),
                        }),
                      ],
                    ),
                  ]),
                  h(
                    "div",
                    {
                      class: "va-expanded__body",
                    },
                    props.item.animations[attr] &&
                      props.item.animations[attr].map((stage: any, index: number) =>
                        h("i", {
                          class: [
                            "icon icon-va-locate",
                            selectedKeyframeIndex.value === index && selectedAttr.value === attr
                              ? "va__selected"
                              : "",
                          ],
                          title: (stage.time / 1000).toFixed(2),
                          style: {
                            left: `${(stage.time * 100) / props.duration}%`,
                          },
                          onMousedown: () => handleSelectKeyframe(stage, index, attr),
                        }),
                      ),
                  ),
                ],
              )
            );
          }),
        ],
      );
  },
});
</script>
