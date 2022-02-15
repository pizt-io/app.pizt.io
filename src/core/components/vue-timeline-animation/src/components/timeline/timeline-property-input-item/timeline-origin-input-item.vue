<script lang="ts">
import { defineComponent, h, ref } from "vue";
import _capitalize from "lodash/capitalize";

export default defineComponent({
  props: {
    modelValue: {
      type: String,
      default: "center center",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const origin = ref(props.modelValue);
    const originOptions = [
      "top left",
      "top center",
      "top right",
      "center left",
      "center center",
      "center right",
      "bottom left",
      "bottom center",
      "bottom right",
    ];

    const handleChange = (e: any) => {
      emit("update:modelValue", e.target.value);
    };

    return () =>
      h(
        "span",
        h(
          "select",
          {
            value: origin.value,
            onChange: handleChange,
          },
          [
            originOptions.map((option) =>
              h(
                "option",
                {
                  value: option,
                },
                _capitalize(option),
              ),
            ),
          ],
        ),
      );
  },
});
</script>
