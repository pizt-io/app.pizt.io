<script lang="ts">
import { defineComponent, h, ref } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        scaleX: "0.0",
        scaleY: "0.0",
      }),
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const decimal = 1;
    const scale = ref({
      scaleX: props.modelValue.scaleX,
      scaleY: props.modelValue.scaleY,
    });

    const handleChangeX = (e: any) => {
      const value = +e.target.value;

      emit("update:modelValue", Object.assign({}, { scaleX: value, scaleY: scale.value.scaleY }));
    };

    const handleChangeY = (e: any) => {
      const value = +e.target.value;

      emit("update:modelValue", Object.assign({}, { scaleY: value, scaleX: scale.value.scaleX }));
    };

    return () =>
      h(
        "span",
        {
          style: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          },
        },
        [
          h("span", { style: { lineHeight: 1, fontSize: "0.75rem", marginRight: "3px" } }, "X"),
          h("input", {
            type: "number",
            min: 0,
            max: 2000,
            step: 0.1 * decimal,
            style: {
              width: "60px",
            },
            value: (+scale.value.scaleX).toFixed(decimal),
            onChange: handleChangeX,
          }),
          h("span", { style: { lineHeight: 1, fontSize: "0.75rem", marginRight: "3px" } }, "Y"),
          h("input", {
            type: "number",
            min: 0,
            max: 2000,
            step: 0.1 * decimal,
            style: {
              width: "60px",
            },
            value: (+scale.value.scaleY).toFixed(decimal),
            onChange: handleChangeY,
          }),
        ],
      );
  },
});
</script>
