<template>
  <div>
    <label>Transform</label>
    <div v-for="property in Object.values(TransformProperties)" :key="property">
      <label>{{ transformPropertyLabelMapping[property] }}</label>
      <div>
        <div>
          <label>X</label>
          <el-input-number />
        </div>
        <div>
          <label>Y</label>
          <el-input-number />
        </div>
        <div>
          <label>Z</label>
          <el-input-number />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

enum TransformProperties {
  TRANSLATE = "translate",
  SCALE = "scale",
  ROTATE = "rotate",
  SKEW = "skew",
}

const transformPropertyLabelMapping = Object.freeze({
  [TransformProperties.TRANSLATE]: "Translate",
  [TransformProperties.SCALE]: "Scale",
  [TransformProperties.ROTATE]: "Rotate",
  [TransformProperties.SKEW]: "Skew",
});

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:modelValue"],
  setup() {
    const decimal = 1;

    return {
      TransformProperties,
      transformPropertyLabelMapping,
      decimal,
    };
  },
});
</script>
