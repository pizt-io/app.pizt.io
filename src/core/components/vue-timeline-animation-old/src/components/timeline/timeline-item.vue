<template>
  <div>
    <div class="va-timeline__item">
      <i
        v-for="key in modelValue.keyframes"
        :key="key"
        class="icon icon-va-locate"
        :style="{
          left: (modelValue.stages[key].time * 100) / duration + '%',
        }"
      />
    </div>
    <div v-if="expanded" class="va-expanded__wrapper">
      <div v-for="property in changedProperties" :key="property" class="va-expanded__item">
        <template v-for="key in modelValue.keyframes" :key="key">
          <i
            class="icon icon-va-locate"
            v-if="modelValue.stages[key].property === property"
            :style="{
              left: (modelValue.stages[key].time * 100) / duration + '%',
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
    duration: {
      type: Number,
      default: 5000,
    },
    expanded: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["update:modelValue"],
  setup(props) {
    const { changedProperties } = useTimeline(props.modelValue);

    return {
      changedProperties,
    };
  },
});
</script>
