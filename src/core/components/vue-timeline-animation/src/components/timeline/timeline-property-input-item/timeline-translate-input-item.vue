<script lang="ts">
import { defineComponent, h, ref } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        translateX: "0.0",
        translateY: "0.0",
      }),
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const decimal = 1;
    const position = ref({
      translateX: props.modelValue.translateX,
      translateY: props.modelValue.translateY,
    });

    const handleChangeX = (e: any) => {
      const value = +e.target.value;

      emit(
        "update:modelValue",
        Object.assign({}, { translateX: value, translateY: position.value.translateY }),
      );
    };

    const handleChangeY = (e: any) => {
      const value = +e.target.value;

      emit(
        "update:modelValue",
        Object.assign({}, { translateY: value, translateX: position.value.translateX }),
      );
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
            value: (+position.value.translateX).toFixed(decimal),
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
            value: (+position.value.translateY).toFixed(decimal),
            onChange: handleChangeY,
          }),
        ],
      );
  },
});
</script>
