<script lang="ts">
import { defineComponent, h, ref } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => ({
        w: "0.0",
        h: "0.0",
      }),
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const decimal = 1;
    const size = ref(props.modelValue);

    const handleInputW = (e: any) => {
      const value = +e.target.value;

      size.value.w = (+value).toFixed(decimal);

      emit("update:modelValue", size.value);
    };

    const handleInputH = (e: any) => {
      const value = +e.target.value;

      size.value.h = (+value).toFixed(decimal);

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
            value: (+size.value.x).toFixed(decimal),
            onInput: handleInputW,
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
            value: (+size.value.y).toFixed(decimal),
            onInput: handleInputH,
          }),
        ],
      );
  },
});
</script>
