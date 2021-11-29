<script lang="ts">
import { defineComponent } from 'vue';
import { useSVGBuilder } from '@/modules/app/use/svg/useSVGBuilder'
import { SVGElement } from "@/types/svg"

export default defineComponent({
  name: 'SVGCanvas',
  props: {
    elements: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const { svgVNode } = useSVGBuilder(props.elements as Array<SVGElement>);

    return () => svgVNode.value;
  }
})
</script>
