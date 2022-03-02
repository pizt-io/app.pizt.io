<template>
  <div class="flex h-full items-center justify-between p-1">
    <div class="flex h-full items-center">
      <el-tooltip
        v-for="toolbarItem in toolbarItems"
        :key="toolbarItem.action"
        :content="toolbarItem.label"
        :show-after="200"
        placement="bottom"
      >
        <div :class="[$style.toolbarItem]" @click="handleToolbarItemClick(toolbarItem.action)">
          <i :class="[toolbarItem.icon, 'transform', toolbarItem.iconClass]"></i>
        </div>
      </el-tooltip>
    </div>
    <div class="pr-2">
      <span class="text-white text-sm cursor-pointer" @click="handleExportSVG">
        Export SVG
        <i class="icon-check"></i>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { ToolbarAction } from "@/core/constants/svg";
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { downloadFile } from "../../utils/download";
import { useSVGExporter } from "./use/useSVGExporter";

export default defineComponent({
  name: "AnimationToolbar",
  emits: ["toolbar-item-click"],
  setup(props, { emit }) {
    const { exportSVG } = useSVGExporter();

    const toolbarItems = [
      {
        label: "Rectangle",
        action: ToolbarAction.RECTANGLE,
        icon: "icon-square",
        iconClass: "scale-y-70 scale-x-110",
      },
      {
        label: "Square",
        action: ToolbarAction.SQUARE,
        icon: "icon-square",
        iconClass: "",
      },
      {
        label: "Circle",
        action: ToolbarAction.CIRCLE,
        icon: "icon-circle",
        iconClass: "",
      },
      {
        label: "Ellipse",
        action: ToolbarAction.ELLIPSE,
        icon: "icon-circle",
        iconClass: "scale-y-70 scale-x-110",
      },
      // {
      //   label: "Crop",
      //   action: ToolbarAction.CROP,
      //   icon: "icon-crop",
      //   iconClass: "",
      // },
    ];

    const handleToolbarItemClick = (action: ToolbarAction) => {
      emit("toolbar-item-click", action);
    };

    const store = useStore();

    const elements = computed(() => store.getters["app/getElements"]);

    const svgElement = ref<SVGSVGElement | null>(null);
    const handleExportSVG = () => {
      svgElement.value = exportSVG(elements.value);

      if (svgElement.value) {
        const svg = svgElement.value.outerHTML;
        downloadFile(svg, "svg", "animation.svg");
      }
    };

    return {
      toolbarItems,
      handleToolbarItemClick,
      handleExportSVG,
      svgElement,
    };
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";

.toolbarItem {
  border-radius: 9999px;
  background-color: color(gray, 100);
  transition-duration: 300ms;
  margin-right: 0.3rem;
  cursor: pointer;

  @include flexCenter();
  @include size(1.25rem);

  &:hover {
    background-color: color(gray, 200);
  }
  &:active {
    background-color: color(gray, 300);
  }
}
</style>
