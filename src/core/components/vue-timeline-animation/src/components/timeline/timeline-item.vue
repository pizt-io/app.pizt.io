<script lang="ts">
import TimelineExpandedItem from "./timeline-expanded-item.vue";

import { computed, defineComponent, h } from "vue";

export default defineComponent({
  props: {
    modelValue: {
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
    selected: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue", "expand", "change", "changeKeyframe", "select"],
  setup(props, { emit }) {
    const handleToggleExpand = () => {
      emit("expand");
    };

    const handleSelectElement = () => {
      emit("select", props.modelValue);
    };

    const itemAnimations = computed(() => Object.values(props.modelValue.animations) as any[]);

    return () =>
      h("div", {}, [
        h(
          "div",
          {
            onClick: handleSelectElement,
            class: ["va-timeline__item", props.selected && "va__selected"],
          },
          [
            h("div", { class: "va-timeline__label" }, [
              h("i", { class: "icon icon-va-ellipsis-v handle" }),
              h("label", props.modelValue.name),
              itemAnimations.value.length
                ? h(
                    "span",
                    {
                      class: [props.expanded && "va__active", "va-timeline__toggle"],
                      onClick: handleToggleExpand,
                    },
                    [h("i", { class: "icon-va-chevron-up" })],
                  )
                : null,
            ]),
            h(
              "div",
              {
                class: "va-timeline__body",
              },
              itemAnimations.value.map((keyframes) =>
                keyframes.map((stage: any) =>
                  h("i", {
                    key: stage.time,
                    class: ["icon icon-va-locate"],
                    style: {
                      left: `${(stage.time * 100) / props.duration}%`,
                    },
                  }),
                ),
              ),
            ),
          ],
        ),
        props.expanded &&
          h(TimelineExpandedItem, {
            item: props.modelValue,
            onChange: (payload: any) => emit("change", payload),
            onChangeKeyframe: (payload: any) => emit("changeKeyframe", payload),
          }),
      ]);
  },
});
</script>
