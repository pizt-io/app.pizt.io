<template>
  <span class="my-tippy-wrapper">
    <span class="my-tippy-target" ref="handlerRef" @mouseout="handleMouseoutTrigger">
      <slot />
    </span>
    <div :class="['my-tippy-inner', tippyClass]" ref="containerRef">
      <slot name="body">
        {{ title }}
      </slot>
    </div>
  </span>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from "vue";

import tippy, {
  animateFill,
  Content as TippyContent,
  Instance as TippyInstance,
  Placement as TippyPlacement,
  Props as TippyProps,
} from "tippy.js";
import "tippy.js/dist/tippy.css";
import "tippy.js/dist/backdrop.css";
import "tippy.js/themes/light.css";
import "tippy.js/animations/scale.css";
import "tippy.js/animations/shift-away.css";
import "tippy.js/animations/perspective.css";
import "tippy.js/animations/shift-toward.css";

export default defineComponent({
  name: "Tippy",
  props: {
    animation: {
      type: [String, Boolean],
      default: "perspective",
    },
    // See all props in tippy.js docs: https://atomiks.github.io/tippyjs/v6/all-props
    options: {
      type: Object,
      default: () => ({}),
    },
    placement: {
      type: String,
      default: "top",
    },
    theme: {
      type: String,
      default: "light",
    },
    trigger: {
      type: String,
      default: "mouseenter",
    },
    offsetX: {
      type: Number,
      default: 0,
    },
    offsetY: {
      type: Number,
      default: 20,
    },
    tippyClass: String,
    title: String,
    hideOnMouseoutTrigger: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["hide", "mount", "destroy"],
  setup(props, { emit }) {
    const handlerRef = ref<null | HTMLSpanElement>(null);
    const containerRef = ref<null | HTMLDivElement>(null);

    const instance = ref<null | TippyInstance<TippyProps>>(null);

    const initiateTippy = () => {
      instance.value = tippy(handlerRef.value as Element, {
        // See docs: https://atomiks.github.io/tippyjs/v6/all-props/#interactive
        interactive: true,
        interactiveBorder: 15,
        ...props.options,
        plugins: [animateFill],
        arrow: false,
        allowHTML: true,
        content: containerRef.value as TippyContent,
        placement: props.placement as TippyPlacement,
        theme: props.theme,
        trigger: props.trigger,
        offset: [props.offsetX, props.offsetY],
        animation: props.animation,
        onHide: onHide,
        onMount: onMount,
        onDestroy: onDestroy,
        appendTo: document.body,
      });
    };

    const resetTippy = () => {
      if (instance.value) {
        instance.value?.destroy();
        initiateTippy();
      }
    };

    const onHide = (instance: TippyInstance<TippyProps>) => {
      emit("hide", instance);
      // instance.unmount();
    };
    const onMount = (instance: TippyInstance<TippyProps>) => {
      emit("mount", instance);
    };
    const onDestroy = (instance: TippyInstance<TippyProps>) => {
      emit("destroy", instance);
    };

    watch(() => props.options, resetTippy, { deep: true });
    watch(() => props.placement, resetTippy);
    watch(() => props.trigger, resetTippy);

    onMounted(initiateTippy);

    const hide = () => {
      instance.value?.hide();
    };

    const show = () => {
      instance.value?.show();
    };

    const handleMouseoutTrigger = () => {
      if (props.hideOnMouseoutTrigger) {
        hide();
      }
    };

    return {
      instance,
      handlerRef,
      containerRef,
      handleMouseoutTrigger,
      hide,
      show,
    };
  },
});
</script>

<style lang="scss">
.tippy-box {
}
.tippy-backdrop {
}
.tippy-arrow {
}
.tippy-content {
  padding: 0;
}
</style>
