<script lang="ts">
import { computed, defineComponent, h, useCssModule } from "vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "TransitionTimeline",
  setup() {
    const style = useCssModule();
    const store = useStore();

    const selectedTransition = computed(() => store.state.selectedTransition);

    return () =>
      h(
        "div",
        {
          class: "flex h-full justify-between items-center",
        },
        new Array(101).fill(0).map((_, index) => {
          const keyframe = index + "%";

          const animationKeyframes = selectedTransition.value.animationKeyframes;

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
                [index % 5 === 0 ? index : "-"],
              ),
              h(
                "div",
                {
                  id: keyframe,
                  class: [style.timelineKeyframe, animationKeyframes[keyframe] && "bg-primary-500"],
                },
                [
                  h("div", {
                    class: [
                      "w-2 h-2 bg-gray-600 rounded-full",
                      animationKeyframes[keyframe] && "bg-primary-800",
                    ],
                  }),
                ],
              ),
            ],
          );
        }),
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
</style>
