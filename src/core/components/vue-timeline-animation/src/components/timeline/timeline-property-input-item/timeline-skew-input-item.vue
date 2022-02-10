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
      skewX: (+props.modelValue.skewX).toFixed(decimal),
      skewY: (+props.modelValue.skewY).toFixed(decimal),
    });

    const handleInputX = (e: any) => {
      const value = +e.target.value;

      position.value.skewX = (+value).toFixed(decimal);

      emit("update:modelValue", position.value);
    };

    const handleInputY = (e: any) => {
      const value = +e.target.value;

      position.value.skewY = (+value).toFixed(decimal);

      emit("update:modelValue", position.value);
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
            // onInput: handleInputX,
            onChange: handleInputX,
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
            // onInput: handleInputY,
            onChange: handleInputY,
          }),
        ],
      );
  },
});
</script>
