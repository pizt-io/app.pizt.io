<script lang="ts">
import { defineComponent, h, ref } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "1.00",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const decimal = 2;
    const deg = ref(props.modelValue);

    const handleChange = (e: any) => {
      const value = +e.target.value;

      if (value > 1) {
        deg.value = (1).toFixed(decimal);
      } else if (value < 0) {
        deg.value = (0).toFixed(decimal);
      } else {
        deg.value = (+value).toFixed(decimal);
      }
      emit("update:modelValue", deg.value);
    };

    return () =>
      h("input", {
        type: "number",
        min: 0,
        max: 999999,
        step: 0.1 * decimal,
        style: {
          width: "45px",
        },
        value: (+deg.value).toFixed(decimal),
        onChange: handleChange,
      });
  },
});
</script>
