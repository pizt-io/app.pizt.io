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
      width: (+props.modelValue.width).toFixed(decimal),
      height: (+props.modelValue.height).toFixed(decimal),
    });

    const handleInputW = (e: any) => {
      const value = +e.target.value;

      size.value.width = (+value).toFixed(decimal);

      emit("update:modelValue", size.value);
    };

    const handleInputH = (e: any) => {
      const value = +e.target.value;

      size.value.height = (+value).toFixed(decimal);

      emit("update:modelValue", size.value);
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
            // onInput: handleInputW,
            onChange: handleInputW,
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
            // onInput: handleInputH,
            onChange: handleInputH,
          }),
        ],
      );
  },
});
</script>
