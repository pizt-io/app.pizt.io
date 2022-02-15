<script lang="ts">
import { defineComponent, h, ref } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        width: "0.0",
        height: "0.0",
      }),
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const decimal = 1;
    const size = ref({
      width: props.modelValue.width,
      height: props.modelValue.height,
    });

    const handleChangeW = (e: any) => {
      const value = +e.target.value;

      emit("update:modelValue", Object.assign({}, { width: value, height: size.value.height }));
    };

    const handleChangeH = (e: any) => {
      const value = +e.target.value;

      emit("update:modelValue", Object.assign({}, { height: value, width: size.value.width }));
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
          h("span", { style: { lineHeight: 1, fontSize: "0.75rem", marginRight: "3px" } }, "W"),
          h("input", {
            type: "number",
            min: 0,
            max: 2000,
            step: 0.1 * decimal,
            style: {
              width: "60px",
            },
            value: (+size.value.width).toFixed(decimal),
            onChange: handleChangeW,
          }),
          h("span", { style: { lineHeight: 1, fontSize: "0.75rem", marginRight: "3px" } }, "H"),
          h("input", {
            type: "number",
            min: 0,
            max: 2000,
            step: 0.1 * decimal,
            style: {
              width: "60px",
            },
            value: (+size.value.height).toFixed(decimal),
            onChange: handleChangeH,
          }),
        ],
      );
  },
});
</script>
