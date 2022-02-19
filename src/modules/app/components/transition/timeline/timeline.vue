<script lang="ts">
import { defineComponent, h, ref, useCssModule } from "vue";
import { ElDrawer } from "element-plus";

import "element-plus/theme-chalk/el-drawer.css";
import "element-plus/theme-chalk/el-overlay.css";

import TimelineKeyframeEditor from "./timeline-keyframe-editor.vue";

export default defineComponent({
  name: "TransitionTimeline",
  props: {
    transition: Object,
  },
  setup(props) {
    const style = useCssModule();

    const selectedKeyframe = ref<any>(null);

    const handleClickKeyframe = (index: number) => {
      const keyframe = index.toString() + "%";

      selectedKeyframe.value = {
        index,
        data: props.transition?.animationKeyframes[keyframe],
      };
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
          h(
            ElDrawer,
            {
              appendToBody: true,
              destroyOnClose: true,
              center: true,
              modelValue: selectedKeyframe.value !== null,
              onClose: handleClearSelectedKeyframe,
            },
            h(TimelineKeyframeEditor, {
              keyframe: selectedKeyframe.value,
            }),
          ),
          new Array(101).fill(0).map((_, index) => {
            const keyframe = index + "%";

            const animationKeyframes = props.transition?.animationKeyframes;

            const currentKeyframe = animationKeyframes?.[keyframe];

            return h(
              "div",
              {
                id: keyframe,
                class: "flex-1 h-full flex flex-col items-center justify-center",
              },
              [
                h(
                  "small",
                  {
                    class:
                      "flex items-center justify-center h-4 w-full max-w-2 block text-center text-gray-400",
                  },
                  [index % 5 === 0 ? index : ""],
                ),
                h("div", {
                  class: [style.timelineKeyframe, currentKeyframe && "bg-primary-500"],
                  style:
                    index % 5 === 0
                      ? {
                          backgroundColor: "var(--color-dark-600)",
                        }
                      : {},
                  onClick: () => handleClickKeyframe(index),
                }),
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
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: color(gray, 800);
  border: 1px solid color(gray, 700);
  cursor: pointer;

  &:hover {
    background-color: color(primary, 600) !important;
  }
}

.timelineKeyframePopover {
  width: 300px !important;
  height: 300px !important;
  background-color: color(gray, 800) !important;
  border: 1px solid color(gray, 700) !important;

  @include flexBox($direction: column);
}
</style>
