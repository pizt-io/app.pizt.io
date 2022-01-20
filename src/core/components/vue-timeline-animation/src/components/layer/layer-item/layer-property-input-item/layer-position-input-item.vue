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
      x: (+props.modelValue.x).toFixed(decimal),
      y: (+props.modelValue.y).toFixed(decimal),
    });

    const handleInputX = (e: any) => {
      const value = +e.target.value;

      position.value.x = (+value).toFixed(decimal);

      emit("update:modelValue", position.value);
    };

    const handleInputY = (e: any) => {
      const value = +e.target.value;

      position.value.y = (+value).toFixed(decimal);

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
            value: (+position.value.x).toFixed(decimal),
            onInput: handleInputX,
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
            value: (+position.value.y).toFixed(decimal),
            onInput: handleInputY,
            onChange: handleInputY,
          }),
        ],
      );
  },
});
</script>
