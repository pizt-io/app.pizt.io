<template>
  <ul class="p-3">
    <li class="mb-3">
      <label class="pz-label w-full justify-between">
        <span class="pz-label__inner">
          <i class="icon-stopwatch" />
          <span class="text-xs ml-2">Duration:</span>
        </span>
        <el-input-number
          v-model="form.animationDuration"
          :min="0"
          :step="0.5"
          controls-position="right"
          class="pz-input w-20"
          size="mini"
        />
      </label>
    </li>
    <li class="mb-3 flex items-center">
      <label class="pz-label flex-1 justify-between">
        <span class="pz-label__inner">
          <el-checkbox
            v-model="form.animationHasDelay"
            :true-label="1"
            :false-label="0"
            size="medium"
            class="pz-input"
          />
          <span class="text-xs ml-2">Delay:</span>
        </span>
      </label>
      <el-input-number
        v-model="form.animationDelay"
        :disabled="!form.animationHasDelay"
        :min="0"
        :step="0.5"
        controls-position="right"
        class="pz-input w-20"
        size="mini"
      />
    </li>
    <li>
      <label class="pz-label w-full justify-between">
        <span class="pz-label__inner">
          <i class="icon-repeat" />
          <span class="text-xs ml-2">Repeat:</span>
        </span>
      </label>
    </li>
    <li class="mb-3 flex items-center">
      <label class="pz-label flex-1 justify-between">
        <span class="pz-label__inner">
          <el-checkbox
            v-model="form.animationIsInfinite"
            :true-label="1"
            :false-label="0"
            size="medium"
            class="pz-input"
          />
          <span class="text-xs ml-2">Infinite</span>
        </span>
      </label>
      <el-input-number
        v-model="form.animationIterationCount"
        :disabled="!!form.animationIsInfinite"
        :min="0"
        :step="1"
        controls-position="right"
        class="pz-input w-20"
        size="mini"
      />
    </li>
    <li class="mb-3">
      <label class="pz-label w-full justify-between">
        <span class="pz-label__inner">
          <i class="icon-arrows-h" />
          <span class="text-xs ml-2">Fill mode:</span>
        </span>
        <el-select
          v-model="form.animationFillMode"
          class="pz-input text-xs w-20"
          popper-class="pz-select"
          size="mini"
        >
          <el-option label="None" value="none" />
          <el-option label="Forwards" value="forwards" />
          <el-option label="Backwards" value="backwards" />
          <el-option label="Both" value="both" />
        </el-select>
      </label>
    </li>
    <li class="mb-3">
      <label class="pz-label w-full justify-between">
        <span class="pz-label__inner">
          <i class="icon-double_arrow" />
          <span class="text-xs ml-2">Direction:</span>
        </span>
        <el-select
          v-model="form.animationDirection"
          class="pz-input text-xs w-20"
          popper-class="pz-select"
          size="mini"
        >
          <el-option label="Normal" value="normal" />
          <el-option label="Reverse" value="reverse" />
          <el-option label="Alternate" value="alternate" />
          <el-option label="Alternate Reverse" value="alternate-reverse" />
        </el-select>
      </label>
    </li>
  </ul>
</template>

<script lang="ts">
import { State } from '@store/state';
import { computed, defineComponent, ref, watch } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TransitionPanel',
  setup(props) {
    const store = useStore<State>();

    const selectedTransition = computed(() => {
      return store.state.selectedTransition as CSSProperties;
    });

    const form = ref({
      animationName: selectedTransition.value.animationName,
      animationIsInfinite: 0,
      animationHasDelay: 0,
      animationDuration: 1,
      animationDelay: 0,
      animationTimingFunction: '',
      animationIterationCount: 1,
      animationFillMode: 'forwards',
      animationDirection: 'alternate',
      animationPlayState: '',
    })

    watch(
      () => form.value,
      () => {
        form.value.animationName = selectedTransition.value.animationName

        store.commit('SET_ANIMATION_SETTINGS', {
          ...form.value,
          animationDuration: `${form.value.animationDuration}s`,
          animationDelay: form.value.animationHasDelay ? `${form.value.animationDelay}s` : 0,
          animationIterationCount: form.value.animationIsInfinite
            ? 'infinite'
            : form.value.animationIterationCount
        })
      },
      { immediate: true, deep: true }
    )

    return {
      form
    }
  }
})
</script>

<style lang="scss" module>
@import "@styles/all";


</style>
