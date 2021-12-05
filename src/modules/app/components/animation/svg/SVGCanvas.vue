<script lang="ts">
import { defineComponent } from "vue";
import { useSVGBuilder } from "@/modules/app/use/svg/useSVGBuilder";
import { SVGElement } from "@/types/svg";

export default defineComponent({
  name: "SVGCanvas",
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const { svgVNode } = useSVGBuilder(props.data as Array<SVGElement>);

    return () => svgVNode.value;
  },
});
</script>
