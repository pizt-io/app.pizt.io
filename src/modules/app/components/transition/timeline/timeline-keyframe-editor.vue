<script lang="ts">
import { defineComponent, h, useCssModule } from "vue";
import { cssPropertiesLabelMapping, SupportProperties } from "@/modules/app/constants/transition";

import {
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElInputNumber,
  ElColorPicker,
} from "element-plus";

import "element-plus/theme-chalk/el-dropdown.css";
import "element-plus/theme-chalk/el-dropdown-menu.css";
import "element-plus/theme-chalk/el-dropdown-item.css";

import TimelineTransformInputItem from "./timeline-property-input-item/timeline-transform-input-item.vue";
import CubicBezier from "@/core/components/cubic-bezier";

const INPUT_COMPONENT_MAPPING = Object.freeze({
  [SupportProperties.OPACITY]: ElInputNumber,
  [SupportProperties.COLOR]: ElColorPicker,
  [SupportProperties.BACKGROUND_COLOR]: ElColorPicker,
  [SupportProperties.WIDTH]: ElInputNumber,
  [SupportProperties.HEIGHT]: ElInputNumber,
  // [SupportProperties.MARGIN]: ElInputNumber,
  // [SupportProperties.PADDING]: ElInputNumber,
  [SupportProperties.TRANSFORM]: TimelineTransformInputItem,
  // [SupportProperties.TRANSFORM_ORIGIN]: ElInputNumber,
  // [SupportProperties.TRANSLATE]: ElInputNumber,
  // [SupportProperties.SCALE]: ElInputNumber,
  // [SupportProperties.ROTATE]: ElInputNumber,
  [SupportProperties.BORDER_RADIUS]: ElInputNumber,
  [SupportProperties.BORDER_WIDTH]: ElInputNumber,
  [SupportProperties.BORDER_COLOR]: ElColorPicker,
  // [SupportProperties.TOP]: ElInputNumber,
  // [SupportProperties.LEFT]: ElInputNumber,
  // [SupportProperties.RIGHT]: ElInputNumber,
  // [SupportProperties.BOTTOM]: ElInputNumber,
  // [SupportProperties.OUTLINE]: ElInputNumber,
  [SupportProperties.ANIMATION_TIMING_FUNCTION]: CubicBezier,
} as any);

const inputNumberBaseConfig = {
  min: 0,
  // max: 1,
  step: 0.1,
  controlsPosition: "right",
};

const INPUT_PROPS_MAPPING = Object.freeze({
  [SupportProperties.OPACITY]: inputNumberBaseConfig,
  [SupportProperties.COLOR]: ElColorPicker,
  [SupportProperties.BACKGROUND_COLOR]: ElColorPicker,
  [SupportProperties.WIDTH]: inputNumberBaseConfig,
  [SupportProperties.HEIGHT]: inputNumberBaseConfig,
  [SupportProperties.MARGIN]: inputNumberBaseConfig,
  [SupportProperties.PADDING]: inputNumberBaseConfig,
  [SupportProperties.TRANSFORM]: inputNumberBaseConfig,
  [SupportProperties.TRANSFORM_ORIGIN]: inputNumberBaseConfig,
  // [SupportProperties.TRANSLATE]: inputNumberBaseConfig,
  // [SupportProperties.SCALE]: inputNumberBaseConfig,
  // [SupportProperties.ROTATE]: inputNumberBaseConfig,
  [SupportProperties.BORDER_RADIUS]: inputNumberBaseConfig,
  [SupportProperties.BORDER_WIDTH]: inputNumberBaseConfig,
  [SupportProperties.BORDER_COLOR]: ElColorPicker,
  // [SupportProperties.TOP]: inputNumberBaseConfig,
  // [SupportProperties.LEFT]: inputNumberBaseConfig,
  // [SupportProperties.RIGHT]: inputNumberBaseConfig,
  // [SupportProperties.BOTTOM]: inputNumberBaseConfig,
  // [SupportProperties.OUTLINE]: inputNumberBaseConfig,
  [SupportProperties.ANIMATION_TIMING_FUNCTION]: {
    valueKey: "cubic-bezier",
  },
} as any);

export default defineComponent({
  props: {
    keyframe: Object,
  },
  emits: ["change", "add", "remove"],
  setup(props, { emit }) {
    const style = useCssModule();

    const handlePropertyChange = (property: string, value?: any) => {
      emit("change", { keyframe: props.keyframe, property, value });
    };

    const handlePropertyRemove = (property: string) => {
      emit("remove", { keyframe: props.keyframe, property });
    };

    return () =>
      h(
        "div",
        {
          class: "flex flex-col items-center justify-center text-gray-100",
        },
        [
          props.keyframe?.data
            ? h(
                "div",
                {
                  class: "w-full",
                },
                (Object.keys(props.keyframe?.data) as SupportProperties[]).map((property) =>
                  h(
                    "div",
                    {
                      class: "w-full flex flex-wrap items-center justify-between mt-2",
                    },
                    [
                      h(
                        "label",
                        {
                          class: "text-sm",
                        },
                        [
                          h("i", {
                            class: "icon-remove inline-block w-5",
                            onClick: () => handlePropertyRemove(property),
                          }),
                          cssPropertiesLabelMapping[property],
                        ],
                      ),
                      h(INPUT_COMPONENT_MAPPING[property], {
                        size: "mini",
                        class: "pz-input text-white",
                        modelValue: props.keyframe?.data[property],
                        ...INPUT_PROPS_MAPPING[property],
                        onChange: (value: any) => handlePropertyChange(property, value),
                      }),
                    ],
                  ),
                ),
              )
            : h("div", {}, "No animated properties in this keyframe"),
          h(
            ElDropdown,
            {
              class: "w-full h-full my-3",
              maxHeight: 300,
              trigger: "click",
              size: "mini",
              onCommand: (command: string) => handlePropertyChange(command),
            },
            {
              default: () =>
                h(
                  "span",
                  {
                    class: style.timelineKeyframeAddPropertyBtn,
                  },
                  [
                    h(
                      "span",
                      {
                        class: "mr-1",
                      },
                      "+",
                    ),
                    h("span", "Add property"),
                  ],
                ),
              dropdown: () =>
                h(
                  ElDropdownMenu,
                  {},
                  (Object.values(SupportProperties) as SupportProperties[]).map((property) =>
                    !Object.keys(props.keyframe?.data || {}).includes(property)
                      ? h(
                          ElDropdownItem,
                          {
                            command: property,
                          },
                          cssPropertiesLabelMapping[property],
                        )
                      : null,
                  ),
                ),
            },
          ),
        ],
      );
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";

.timelineKeyframeAddPropertyBtn {
  width: 100%;
  height: 30px;
  background-color: color(primary, 500);
  color: color(dark);
  font-weight: bold;
  font-size: 0.75rem;
  transition-duration: $duration-base;
  cursor: pointer;
  user-select: none;

  @include flexCenter();

  &:hover {
    background-color: color(primary, 600);
  }

  &:hover {
    background-color: color(primary, 700);
  }
}
</style>
