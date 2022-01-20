<script lang="ts">
import { defineComponent } from "vue";
import { useSVGBuilder } from "@/modules/app/components/animation/use/useSVGBuilder";
import { SVGElement } from "@/types/svg";

export default defineComponent({
  name: "SVGCanvas",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    time: {
      type: Number,
      default: 0,
    },
  },
  setup(props) {
    const { svgVNode } = useSVGBuilder(props.data as Array<SVGElement>);

    return () => svgVNode.value;
  },
});
</script>
