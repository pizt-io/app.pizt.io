<script lang="ts">
import { defineComponent, h } from 'vue';
import { useSVGBuilder } from '@/modules/app/use/svg/useSVGBuilder'

export default defineComponent({
  name: 'SVGCanvas',
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
