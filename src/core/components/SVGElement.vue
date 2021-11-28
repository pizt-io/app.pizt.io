<template>
  <g
    :id="id"
    :class="'el-' + element.tag"
    :transform="`translate(${element.transform.translateX}, ${element.transform.translateY})`"
    @mousedown="handleMousedown"
    @mouseup="handleMouseup"
    @mouseleave="handleMouseleave"
    @mousemove="handleMousemove"
  >
    <slot />
  </g>
</template>

<script lang="ts">
import { defineComponent, h, ref } from 'vue';
import { SVGElementDragPayload, SVGElementSelectPayload } from "@/types/svg"

export default defineComponent({
  name: 'SVGElement',
  props: {
    id: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    },
    element: {
      type: Object,
      default: () => {}
    }
  },
  emits: ['drag', 'select'],
  setup(props, { emit }) {
    const _isMouseDown = ref(false);

    const _handleClick = (e: MouseEvent) => {
      const payload: SVGElementSelectPayload = {
        id: props.id,
        el: props.element,
      }

      emit('select', payload);
    }

    const handleMousedown = (e: MouseEvent) => {
      _isMouseDown.value = true;

      _handleClick(e);
    }
    const handleMouseup = (e: MouseEvent) => {
      _isMouseDown.value = false;
    }
    const handleMouseleave = (e: MouseEvent) => {
      _isMouseDown.value = false;
    }

    // TODO(BUG): Drag to fast, the element will leave the mouse first
    const handleMousemove = (e: MouseEvent) => {
      if (_isMouseDown.value) {
        const payload: SVGElementDragPayload = {
          index: props.index,
          el: props.element,
          dx: e.movementX,
          dy: e.movementY
        }

        emit('drag', payload);
      }
    }

    return {
      handleMousedown,
      handleMouseup,
      handleMousemove,
      handleMouseleave,
    };
  }
})
</script>
