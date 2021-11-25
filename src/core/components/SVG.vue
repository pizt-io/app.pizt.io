<script lang="ts">
import { defineComponent, h } from 'vue';
import { useSVGBuilder } from '@use/useSVGBuilder'

export default defineComponent({
  name: 'SVG',
  props: {
    elements: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const { svgVNode } = useSVGBuilder(props.elements);

    return () => svgVNode.value;
  }
})
</script>
