<template>
  <div class="p-3 h-full relative">
    <div
      v-if="!element"
      class="absolute top-0 left-0 z-10 w-full h-full text-white text-center font-bold p-5"
      style="background-color: rgba(0, 0, 0, 0.9)"
    >
      Please select an element to see its attributes
    </div>
    <div
      v-else-if="isAnimated"
      class="absolute top-0 left-0 z-10 w-full h-full text-white text-center font-bold p-5"
      style="background-color: rgba(0, 0, 0, 0.8)"
    >
      This element is animated, modify it under Timeline Animation panel
    </div>
    <h3 class="text-gray-100 text-xs mb-3">Original attributes</h3>
    <ul v-if="element && form?.attrs">
      <li class="mb-3">
        <label class="pz-label w-full justify-between">
          <span class="pz-label__inner">
            <i class="icon-arrows" />
          </span>
          <div :class="$style.animationInputItem">
            <div class="mx-2 w-2 text-xs">X</div>
            <el-input-number
              v-model="form.attrs.pos.x"
              :min="0"
              :step="1"
              controls-position="right"
              class="pz-input w-16"
              size="mini"
              disabled
            />
            <div class="mx-2 w-2 text-xs">Y</div>
            <el-input-number
              v-model="form.attrs.pos.y"
              :min="0"
              :step="1"
              controls-position="right"
              class="pz-input w-16"
              size="mini"
              disabled
            />
          </div>
        </label>
      </li>
      <li class="mb-3">
        <label class="pz-label w-full justify-between">
          <span class="pz-label__inner">
            <i class="icon-format_shapes" />
          </span>
          <div :class="$style.animationInputItem">
            <div class="mx-2 w-2 text-xs">W</div>
            <el-input-number
              v-model="form.attrs.size.width"
              :min="0"
              :step="1"
              controls-position="right"
              class="pz-input w-16"
              size="mini"
            />
            <div class="mx-2 w-2 text-xs">H</div>
            <el-input-number
              v-model="form.attrs.size.height"
              :min="0"
              :step="1"
              controls-position="right"
              class="pz-input w-16"
              size="mini"
            />
          </div>
        </label>
      </li>
      <li>
        <h4 class="text-gray-100 text-xs mb-3">Transform</h4>
        <ul class="pl-3">
          <li class="mb-3">
            <label class="pz-label w-full justify-between">
              <span class="pz-label__inner">
                <i class="icon-arrows" />
              </span>
              <div :class="$style.animationInputItem">
                <el-input-number
                  v-model="form.attrs.transform.translate.translateX"
                  :min="0"
                  :step="1"
                  controls-position="right"
                  class="pz-input w-16 mr-2"
                  size="mini"
                />
                <el-input-number
                  v-model="form.attrs.transform.translate.translateY"
                  :min="0"
                  :step="1"
                  controls-position="right"
                  class="pz-input w-16"
                  size="mini"
                />
              </div>
            </label>
          </li>
          <li class="mb-3">
            <label class="pz-label w-full justify-between">
              <span class="pz-label__inner">
                <i class="icon-crop_free" />
              </span>
              <div :class="$style.animationInputItem">
                <el-input-number
                  v-model="form.attrs.transform.scale.scaleX"
                  :min="0"
                  :step="1"
                  controls-position="right"
                  class="pz-input w-16 mr-2"
                  size="mini"
                />
                <el-input-number
                  v-model="form.attrs.transform.scale.scaleY"
                  :min="0"
                  :step="1"
                  controls-position="right"
                  class="pz-input w-16"
                  size="mini"
                />
              </div>
            </label>
          </li>
          <li class="mb-3">
            <label class="pz-label w-full justify-between">
              <span class="pz-label__inner">
                <i class="icon-rotate-right" />
              </span>
              <div :class="$style.animationInputItem">
                <el-input-number
                  v-model="form.attrs.transform.rotate"
                  :min="0"
                  :step="1"
                  controls-position="right"
                  class="pz-input w-16"
                  size="mini"
                />
              </div>
            </label>
          </li>
          <li class="mb-3">
            <label class="pz-label w-full justify-between">
              <span class="pz-label__inner">
                <i class="icon-exchange" />
              </span>
              <div :class="$style.animationInputItem">
                <el-input-number
                  v-model="form.attrs.transform.skew.skewX"
                  :min="0"
                  :step="1"
                  controls-position="right"
                  class="pz-input w-16 mr-2"
                  size="mini"
                />
                <el-input-number
                  v-model="form.attrs.transform.skew.skewY"
                  :min="0"
                  :step="1"
                  controls-position="right"
                  class="pz-input w-16"
                  size="mini"
                />
              </div>
            </label>
          </li>
        </ul>
      </li>
      <li class="mb-3">
        <label class="pz-label w-full justify-between">
          <span class="pz-label__inner">
            <span class="text-xs">Fill:</span>
          </span>
          <div :class="$style.animationInputItem">
            <el-color-picker v-model="form.attrs.style.fill" size="mini" />
          </div>
        </label>
      </li>
      <li class="mb-3">
        <label class="pz-label w-full justify-between">
          <span class="pz-label__inner">
            <span class="text-xs">Stroke:</span>
          </span>
          <div :class="$style.animationInputItem">
            <el-color-picker v-model="form.attrs.style.stroke" size="mini" />
          </div>
        </label>
      </li>
      <li class="mb-3">
        <label class="pz-label w-full justify-between">
          <span class="pz-label__inner">
            <span class="text-xs">Stroke width:</span>
          </span>
          <div :class="$style.animationInputItem">
            <el-input-number
              v-model="form.attrs.style.strokeWidth"
              :min="0"
              :step="1"
              controls-position="right"
              class="pz-input w-16"
              size="mini"
            />
          </div>
        </label>
      </li>
      <li class="mb-3">
        <label class="pz-label w-full justify-between">
          <span class="pz-label__inner">
            <span class="text-xs">Stroke dash array:</span>
          </span>
          <div :class="$style.animationInputItem">
            <el-input-number
              v-model="form.attrs.style.strokeDasharray"
              :min="0"
              :step="1"
              controls-position="right"
              class="pz-input w-16"
              size="mini"
            />
          </div>
        </label>
      </li>
      <li class="mb-3">
        <label class="pz-label w-full justify-between">
          <span class="pz-label__inner">
            <span class="text-xs">Stroke dash offset:</span>
          </span>
          <div :class="$style.animationInputItem">
            <el-input-number
              v-model="form.attrs.style.strokeDashoffset"
              :min="0"
              :step="1"
              controls-position="right"
              class="pz-input w-16"
              size="mini"
            />
          </div>
        </label>
      </li>
      <li class="mb-3">
        <label class="pz-label w-full justify-between">
          <span class="pz-label__inner">
            <span class="text-xs">Opacity:</span>
          </span>
          <div :class="$style.animationInputItem">
            <el-input-number
              v-model="form.attrs.style.opacity"
              :min="0"
              :step="1"
              controls-position="right"
              class="pz-input w-16"
              size="mini"
            />
          </div>
        </label>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    element: {
      type: Object,
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    const form = ref(props.element as any);

    const isSelectingElement = ref(false);

    watch(
      () => props.element,
      () => {
        form.value = props.element;
        isSelectingElement.value = true;
      },
    );

    watch(
      form,
      () => {
        if (!isSelectingElement.value) {
          emit("change", form.value);
        }
        isSelectingElement.value = false;
      },
      { deep: true },
    );

    const isAnimated = computed(() => Object.keys(props.element?.animations || {}).length > 0);

    return {
      form,
      isAnimated,
    };
  },
});
</script>

<style lang="scss" module>
.animationInputItem {
  display: flex;
  align-items: center;
}
</style>
