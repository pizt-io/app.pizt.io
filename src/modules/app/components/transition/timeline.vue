<script lang="ts">
import { computed, defineComponent, h, ref, useCssModule } from "vue";
import { useStore } from "vuex";
import { ElPopover } from "element-plus";

enum SupportProperties {
  OPACITY = "opacity",
  COLOR = "color",
  BACKGROUND_COLOR = "background-color",
  WIDTH = "width",
  HEIGHT = "height",
  MARGIN = "margin",
  PADDING = "padding",
  TRANSFORM = "transform",
  TRANSFORM_ORIGIN = "transform-origin",
  SCALE = "scale",
  ROTATE = "rotate",
  BORDER_RADIUS = "border-radius",
  BORDER_WIDTH = "border-width",
  BORDER_COLOR = "border-color",
  TOP = "top",
  LEFT = "left",
  RIGHT = "right",
  BOTTOM = "bottom",
  OUTLINE = "outline",
  ANIMATION_TIMING_FUNCTION = "animation-timing-function",
}

const cssPropertiesLabelMapping = Object.freeze({
  [SupportProperties.OPACITY]: "Opacity",
  [SupportProperties.COLOR]: "Color",
  [SupportProperties.BACKGROUND_COLOR]: "Background Color",
  [SupportProperties.WIDTH]: "Width",
  [SupportProperties.HEIGHT]: "Height",
  [SupportProperties.MARGIN]: "Margin",
  [SupportProperties.PADDING]: "Padding",
  [SupportProperties.TRANSFORM]: "Transform",
  [SupportProperties.TRANSFORM_ORIGIN]: "Transform Origin",
  [SupportProperties.SCALE]: "Scale",
  [SupportProperties.ROTATE]: "Rotate",
  [SupportProperties.BORDER_RADIUS]: "Border Radius",
  [SupportProperties.BORDER_WIDTH]: "Border Width",
  [SupportProperties.BORDER_COLOR]: "Border Color",
  [SupportProperties.TOP]: "Top",
  [SupportProperties.LEFT]: "Left",
  [SupportProperties.RIGHT]: "Right",
  [SupportProperties.BOTTOM]: "Bottom",
  [SupportProperties.OUTLINE]: "Outline",
  [SupportProperties.ANIMATION_TIMING_FUNCTION]: "Animation Timing Function",
});

export default defineComponent({
  name: "TransitionTimeline",
  setup() {
    const style = useCssModule();
    const store = useStore();

    const selectedTransition = computed(() => store.state.selectedTransition);

    const selectedKeyframe = ref<any>(null);

    const handleClickKeyframe = (index: number) => {
      const keyframe = index.toString() + "%";

      selectedKeyframe.value = selectedTransition.value.animationKeyframes[keyframe];
    };
    const handleClearSelectedKeyframe = () => {
      selectedKeyframe.value = null;
    };

    return () =>
      h(
        "div",
        {
          class: "flex h-full justify-between items-center",
        },
        [
          new Array(101).fill(0).map((_, index) => {
            const keyframe = index + "%";

            const animationKeyframes = selectedTransition.value.animationKeyframes;

            const currentKeyframe = animationKeyframes[keyframe];

            return h(
              "div",
              {
                class: "flex-1 h-full flex flex-col items-center justify-center",
              },
              [
                h(
                  "small",
                  {
                    class: "h-4 w-full block text-center text-gray-400",
                  },
                  [index % 5 === 0 ? index : "_"],
                ),
                h(
                  ElPopover,
                  {
                    trigger: "click",
                    placement: "top",
                    showArrow: false,
                    popperClass: style.timelineKeyframePopover,
                    onHide: () => handleClearSelectedKeyframe(),
                  },
                  {
                    default: () =>
                      h(
                        "div",
                        {
                          class: "flex flex-col items-center justify-center text-gray-100",
                        },
                        [
                          currentKeyframe
                            ? (Object.keys(currentKeyframe) as SupportProperties[]).map(
                                (key: SupportProperties) =>
                                  h("div", {}, [
                                    h("label", {}, [
                                      h("span", {}, [cssPropertiesLabelMapping[key]]),
                                      h("span", {}, [currentKeyframe[key]]),
                                    ]),
                                  ]),
                              )
                            : null,
                          h(
                            "span",
                            {
                              class: "",
                            },
                            "Add property",
                          ),
                        ],
                      ),
                    reference: () =>
                      h(
                        "div",
                        {
                          ref: "keyframeRef",
                          id: keyframe,
                          class: [style.timelineKeyframe, currentKeyframe && "bg-primary-500"],
                          onClick: () => handleClickKeyframe(index),
                        },
                        [
                          h("div", {
                            class: [
                              "w-2 h-2 bg-gray-600 rounded-full",
                              currentKeyframe && "bg-primary-800",
                            ],
                          }),
                        ],
                      ),
                  },
                ),
              ],
            );
          }),
        ],
      );
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";

.timelineKeyframe {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: color(gray, 800);
  border: 1px solid color(gray, 700);
  cursor: pointer;

  &:hover {
    background-color: color(primary, 600);
  }
}

.timelineKeyframePopover {
  width: 300px;
  background-color: color(gray, 800) !important;
  border: 1px solid color(gray, 700) !important;
}
</style>
