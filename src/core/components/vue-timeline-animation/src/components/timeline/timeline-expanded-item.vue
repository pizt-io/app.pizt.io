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

import { ANIMATED_ATTRIBUTES, AttributesMap, LABEL_MAPPING } from "../../constants";
import { findStageBetweenStages } from "@/modules/app/utils/keyframes/findStageBetweenStages";
import { defineComponent, h, inject, ref, Ref } from "vue";

import _get from "lodash/get";

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
  emits: ["update:item", "expand", "change"],
  setup(props, { emit }) {
    const currentTime = inject<Ref<number>>("currentTime", ref(0));

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
                      LABEL_MAPPING[attr],
                    ),
                    h("div", {}, [
                      h(INPUT_COMPONENT_MAPPING[attr], {
                        "modelValue": _get(currentStage, attr),
                        "onUpdate:modelValue": (value: any) => {
                          emit("change", {
                            time: currentTime.value,
                            attr,
                            value,
                          });
                        },
                      }),
                    ]),
                  ]),
                  h(
                    "div",
                    {
                      class: "va-expanded__body",
                    },
                    props.item.animations[attr] &&
                      props.item.animations[attr].map((stage: any) =>
                        h("i", {
                          class: "icon icon-va-locate",
                          style: {
                            left: `${(stage.time * 100) / props.duration}%`,
                          },
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
