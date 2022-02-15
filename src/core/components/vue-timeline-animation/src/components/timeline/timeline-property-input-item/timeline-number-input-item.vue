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
    const num = ref(props.modelValue);

    const handleChange = (e: any) => {
      num.value = e.target.value;

      emit("update:modelValue", +num.value);
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
        value: (+num.value).toFixed(decimal),
        onChange: handleChange,
      });
  },
});
</script>
