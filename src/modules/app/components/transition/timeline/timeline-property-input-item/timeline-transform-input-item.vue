<template>
  <div class="flex-col">
    <!-- <label>Transform</label> -->
    <div v-for="property in Object.values(TransformProperties)" :key="property">
      <label class="text-xs">{{ transformPropertyLabelMapping[property] }} (x, y, z)</label>
      <div class="flex">
        <div class="flex items-center">
          <!-- <label>X</label> -->
          <el-input-number
            v-model="transform[property].x"
            size="mini"
            class="pz-input text-white w-16"
            controls-position="right"
          />
        </div>
        <div class="flex items-center ml-2">
          <!-- <label>Y</label> -->
          <el-input-number
            v-model="transform[property].y"
            size="mini"
            class="pz-input text-white w-16"
            controls-position="right"
          />
        </div>
        <div class="flex items-center ml-2">
          <!-- <label>Z</label> -->
          <el-input-number
            v-model="transform[property].z"
            size="mini"
            class="pz-input text-white w-16"
            controls-position="right"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";

import _isEqual from "lodash/isEqual";

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

const transformDefaultValue = Object.freeze({
  [TransformProperties.TRANSLATE]: { x: 0, y: 0, z: 0 },
  [TransformProperties.SCALE]: { x: 1, y: 1, z: 1 },
  [TransformProperties.ROTATE]: { x: 0, y: 0, z: 0 },
  [TransformProperties.SKEW]: { x: 0, y: 0, z: 0 },
});

export default defineComponent({
  props: {
    modelValue: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const decimal = 1;
    const transform = ref({
      [TransformProperties.TRANSLATE]: { x: 0, y: 0, z: 0 },
      [TransformProperties.SCALE]: { x: 1, y: 1, z: 1 },
      [TransformProperties.ROTATE]: { x: 0, y: 0, z: 0 },
      [TransformProperties.SKEW]: { x: 0, y: 0, z: 0 },
    });

    props.modelValue.forEach((val: any) => {
      if (val?.translate3d) {
        const translate = val.translate3d.replace(/[()%]/g, "").split(",");
        transform.value[TransformProperties.TRANSLATE] = {
          x: +translate[0],
          y: +translate[1],
          z: +translate[2],
        };
      } else if (val?.scale3d) {
        const scale = val.scale3d.replace(/[()%]/g, "").split(",");
        transform.value[TransformProperties.SCALE] = {
          x: +scale[0],
          y: +scale[1],
          z: +scale[2],
        };
      } else if (val?.rotate3d) {
        const rotate = val.rotate3d.replace(/[()%]/g, "").split(",");
        transform.value[TransformProperties.ROTATE] = {
          x: +rotate[0],
          y: +rotate[1],
          z: +rotate[2],
        };
      } else if (val?.skew3d) {
        const skew = val.skew3d.replace(/[()%]/g, "").split(",");
        transform.value[TransformProperties.SKEW] = {
          x: +skew[0],
          y: +skew[1],
          z: +skew[2],
        };
      }
    });

    watch(
      transform,
      () => {
        const translate = transform.value[TransformProperties.TRANSLATE];
        const scale = transform.value[TransformProperties.SCALE];
        const rotate = transform.value[TransformProperties.ROTATE];
        const skew = transform.value[TransformProperties.SKEW];

        emit(
          "update:modelValue",
          [
            !_isEqual(translate, transformDefaultValue[TransformProperties.TRANSLATE]) && {
              translate3d: `(${translate.x}%,${translate.y}%,${translate.z}%)`,
            },
            !_isEqual(scale, transformDefaultValue[TransformProperties.SCALE]) && {
              scale3d: `(${scale.x}%,${scale.y}%,${scale.z}%)`,
            },
            !_isEqual(rotate, transformDefaultValue[TransformProperties.ROTATE]) && {
              rotate3d: `(${rotate.x}%,${rotate.y}%,${rotate.z}%)`,
            },
            !_isEqual(skew, transformDefaultValue[TransformProperties.SKEW]) && {
              skew3d: `(${skew.x}%,${skew.y}%,${skew.z}%)`,
            },
          ].filter((t) => t),
        );
      },
      { deep: true },
    );

    return {
      TransformProperties,
      transformPropertyLabelMapping,
      decimal,
      transform,
    };
  },
});
</script>
