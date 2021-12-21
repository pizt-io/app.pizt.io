<template>
  <div>
    <div class="va-timeline__item">
      <i
        v-for="key in modelValue.keyframes"
        :key="key"
        class="icon icon-va-locate"
        :style="{
          left: modelValue.stages[key].keyframe * 100 + '%',
        }"
      />
    </div>
    <div v-if="modelValue.expanded" class="va-expanded__wrapper">
      <div v-for="property in changedProperties" :key="property" class="va-expanded__item">
        <template v-for="key in modelValue.keyframes" :key="key">
          <i
            class="icon icon-va-locate"
            v-if="modelValue.stages[key].property === property"
            :style="{
              left: modelValue.stages[key].keyframe * 100 + '%',
            }"
          />
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useTimeline } from "../../use/useTimeline";

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:modelValue"],
  setup(props) {
    const { changedProperties } = useTimeline(props);

    return {
      changedProperties,
    };
  },
});
</script>
