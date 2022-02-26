<template>
  <ul class="p-3">
    <li class="mb-5 flex items-center justify-end">
      <span
        v-if="transition?.userId"
        class="text-sm text-white underline cursor-pointer hover:text-gray-200"
        @click="handleDeleteTransition"
      >
        Remove
      </span>
      <el-button
        type="success"
        class="bg-success hover:bg-success-600 border-none h-6 min-h-6 px-5 py-1 ml-3 rounded-none"
        @click="handleUpdateTransition"
      >
        Save
      </el-button>
    </li>
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
    <li class="mb-3 flex items-center">
      <CubicBezier v-model="form.animationTimingFunction" />
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
import { RootState } from "@store/state";
import { computed, defineComponent, ref, watch } from "vue";
import { useStore } from "vuex";

import { ElMessageBox, ElMessage } from "element-plus";

import "element-plus/theme-chalk/el-message-box.css";
import "element-plus/theme-chalk/el-message.css";

import CubicBezier from "@/core/components/cubic-bezier";

import _cloneDeep from "lodash/cloneDeep";

export default defineComponent({
  name: "TransitionPanel",
  components: {
    CubicBezier,
  },
  props: {
    transition: Object,
    default: () => ({}),
  },
  setup(props) {
    const store = useStore<RootState>();
    const userSession = computed(() => store.state.userSession);

    const form = ref({
      ...props.transition,
      animationName: props.transition?.animationName,
      animationDuration: +props.transition?.animationDuration?.replace("s", "") || 1,
      animationTimingFunction:
        props.transition?.animationTimingFunction?.replace("cubic-bezier(", "")?.replace(")", "") ||
        "0.42,0.69,0.69,0.42",
    } as any);

    watch(
      form,
      (newValue) => {
        let transition = _cloneDeep(newValue);

        store.dispatch("updateSelectedTransition", {
          ...transition,
          animationDuration: `${transition.animationDuration}s`,
          animationTimingFunction: `cubic-bezier(${
            transition.animationTimingFunction || "0.42,0.69,0.69,0.42"
          })`,
          animationDelay: transition.animationHasDelay ? `${transition.animationDelay}s` : 0,
          animationIterationCount: transition.animationIsInfinite
            ? "infinite"
            : transition.animationIterationCount,
        });
      },
      { immediate: true },
    );

    const handleDeleteTransition = () => {
      ElMessageBox.confirm("Are your sure you want to delete this transition?", "Warning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning",
      }).then(async () => {
        await store.dispatch("deleteTransition", props.transition);

        ElMessage({
          type: "success",
          message: "Deleted transition",
        });
      });
    };

    const handleUpdateTransition = async () => {
      if (userSession.value?.user) {
        await store.dispatch("updateTransition", props.transition);
        ElMessage.success("Transition is saved successfully!");
      } else {
        ElMessage.warning("You need to login to save custom transition!");
      }
    };

    return {
      form,
      handleDeleteTransition,
      handleUpdateTransition,
    };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";
</style>
