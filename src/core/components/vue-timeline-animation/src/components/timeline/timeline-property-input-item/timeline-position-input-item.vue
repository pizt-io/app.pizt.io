<script lang="ts">
import { defineComponent, h, ref } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        x: "0.0",
        y: "0.0",
      }),
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const decimal = 1;
    const position = ref({
      x: props.modelValue.x,
      y: props.modelValue.y,
    });

    const handleChangeX = (e: any) => {
      const value = +e.target.value;

      emit("update:modelValue", Object.assign({}, { x: value, y: position.value.y }));
    };

    const handleChangeY = (e: any) => {
      const value = +e.target.value;

      emit("update:modelValue", Object.assign({}, { y: value, x: position.value.x }));
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
            value: (+position.value.x).toFixed(decimal),
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
            value: (+position.value.y).toFixed(decimal),
            onChange: handleChangeY,
          }),
        ],
      );
  },
});
</script>
