<script lang="ts">
import { defineComponent, h, ref, useCssModule } from "vue";
import { ElDrawer } from "element-plus";

import "element-plus/theme-chalk/el-drawer.css";
import "element-plus/theme-chalk/el-overlay.css";

import TimelineKeyframeEditor from "./timeline-keyframe-editor.vue";
import { useStore } from "vuex";

import _cloneDeep from "lodash/cloneDeep";
import { defaultPropertyValueMapping } from "@/modules/app/constants/transition";

export default defineComponent({
  name: "TransitionTimeline",
  props: {
    transition: Object,
  },
  emits: ["change"],
  setup(props, { emit }) {
    const style = useCssModule();
    const store = useStore();

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

    const handleChangeKeyframe =
      (mode: string) =>
      ({ keyframe, property, value }: { keyframe: any; property: string; value: any }) => {
        if (props.transition) {
          if (mode === "remove") {
            const keyframeData = _cloneDeep(selectedKeyframe.value.data);

            if (keyframeData) {
              delete keyframeData[property];

              selectedKeyframe.value = {
                index: keyframe.index,
                data: keyframeData,
              };
            }
          } else {
            selectedKeyframe.value = {
              index: keyframe.index,
              data: Object.assign({}, props.transition.animationKeyframes[keyframe.index + "%"], {
                [property]: value !== undefined ? value : defaultPropertyValueMapping[property],
              }),
            };
          }

          const updatedTransition = Object.assign({}, props.transition, {
            animationKeyframes: Object.assign({}, props.transition.animationKeyframes, {
              [keyframe.index + "%"]: Object.assign({}, selectedKeyframe.value.data),
            }),
          });

          if (!Object.keys(updatedTransition.animationKeyframes[keyframe.index + "%"]).length) {
            delete updatedTransition.animationKeyframes[keyframe.index + "%"];
          }

          store.commit("UPDATE_SELECTED_TRANSITION", updatedTransition);

          emit("change", updatedTransition);
        }
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
              title: "Edit keyframe " + (selectedKeyframe.value?.index + "%"),
              appendToBody: true,
              destroyOnClose: true,
              center: true,
              modelValue: selectedKeyframe.value !== null,
              customClass: style.timelineKeyframeEditorDrawer,
              onClose: handleClearSelectedKeyframe,
              size: 350,
            },
            h(TimelineKeyframeEditor, {
              keyframe: selectedKeyframe.value,
              onChange: handleChangeKeyframe("change"),
              onRemove: handleChangeKeyframe("remove"),
              onAdd: handleChangeKeyframe("change"),
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

.timelineKeyframeEditorDrawer {
  background-color: color(gray, 800) !important;
  overflow-y: auto;

  :global {
    .el-drawer__header {
      color: color();
      font-weight: bold;
      margin: 0;
    }
  }
}
</style>
