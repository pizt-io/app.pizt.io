<script lang="ts">
import { defineComponent, h, ref } from "vue";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "#ffffff",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const color = ref(props.modelValue);

    const handleInput = (e: any) => {
      emit("update:modelValue", e.target.value);
    };

    return () =>
      h("input", {
        type: "color",
        style: {
          // width: "45px",
        },
        value: color.value,
        onInput: handleInput,
        onChange: handleInput,
      });
  },
});
</script>
