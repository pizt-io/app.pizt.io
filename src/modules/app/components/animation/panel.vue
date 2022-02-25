<template>
  <div class="p-3 relative">
    <div v-if="!isAnimated" class="absolute top-0 left-0 w-full h-full">
      This element is animated, modify it under Timeline panel
    </div>
    <template v-else>
      <h3 class="text-gray-100 text-xs mb-3">Original attributes</h3>
      <ul v-if="form?.attrs">
        <li class="mb-3">
          <label class="pz-label w-full justify-between">
            <span class="pz-label__inner">
              <i class="icon-stopwatch" />
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
              />
              <div class="mx-2 w-2 text-xs">Y</div>
              <el-input-number
                v-model="form.attrs.pos.y"
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
              <i class="icon-stopwatch" />
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
                  <i class="icon-stopwatch" />
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
                  <i class="icon-stopwatch" />
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
                  <i class="icon-stopwatch" />
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
                  <i class="icon-stopwatch" />
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
    </template>
  </div>
</template>

<script lang="ts">
import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";
import { computed, defineComponent, ref, watch } from "vue";

export default defineComponent({
  props: {
    element: {
      type: Object,
      default: () => ({
        _id: "id-el-1",
        type: SVG_ELEMENT_TYPE.ELLIPSE,
        name: "Ellipse 1",
        attrs: {
          pos: { x: 150, y: 100 },
          size: { width: 100, height: 50 },
          transform: {
            translate: { translateX: 0, translateY: 0 },
            scale: { scaleX: 1, scaleY: 1 },
            rotate: 0,
            skew: { skewX: 0, skewY: 0 },
            transformOrigin: "center center",
          },
          style: {
            fill: "#f04337",
            stroke: "#5ad3db",
            strokeWidth: 1,
            opacity: 1,
            strokeDasharray: 0,
            strokeDashoffset: 0,
          },
        },
        animations: {},
      }),
    },
  },
  emits: ["change"],
  setup(props, { emit }) {
    const form = ref(props.element as any);

    watch(form, () => {
      emit("change", form.value);
    });

    const isAnimated = computed(() => Object.keys(props.element?.animations || {}));

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
