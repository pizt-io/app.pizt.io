<script lang="ts">
import { defineComponent, h, ref } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        skewX: "0.0",
        skewY: "0.0",
      }),
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const decimal = 1;
    const position = ref({
      skewX: props.modelValue.skewX,
      skewY: props.modelValue.skewY,
    });

    const handleChangeX = (e: any) => {
      const value = +e.target.value;

      emit("update:modelValue", Object.assign({}, { skewX: value, skewY: position.value.skewY }));
    };

    const handleChangeY = (e: any) => {
      const value = +e.target.value;

      emit("update:modelValue", Object.assign({}, { skewY: value, skewX: position.value.skewX }));
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
            value: (+position.value.skewX).toFixed(decimal),
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
            value: (+position.value.skewY).toFixed(decimal),
            onChange: handleChangeY,
          }),
        ],
      );
  },
});
</script>
