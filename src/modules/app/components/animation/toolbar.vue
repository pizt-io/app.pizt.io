<template>
  <div class="flex h-full items-center p-1">
    <div
      v-for="toolbarItem in toolbarItems"
      :key="toolbarItem.action"
      :class="[$style.toolbarItem]"
      @click="handleToolbarItemClick(toolbarItem.action)"
    >
      <i :class="[toolbarItem.icon, 'transform', toolbarItem.iconClass]"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { ToolbarAction } from "@/core/constants/svg";
import { defineComponent } from "vue";

export default defineComponent({
  name: "AnimationToolbar",
  emits: ["toolbar-item-click"],
  setup(props, { emit }) {
    const toolbarItems = [
      {
        action: ToolbarAction.RECTANGLE,
        icon: "icon-square1",
        iconClass: "scale-y-70 scale-x-110",
      },
      {
        action: ToolbarAction.SQUARE,
        icon: "icon-square1",
        iconClass: "",
      },
      {
        action: ToolbarAction.CIRCLE,
        icon: "icon-circle",
        iconClass: "",
      },
      {
        action: ToolbarAction.ELLIPSE,
        icon: "icon-circle",
        iconClass: "scale-y-70 scale-x-110",
      },
      {
        action: ToolbarAction.POLYLINE,
        icon: "icon-linegraph",
        iconClass: "scale-70",
      },
      {
        action: ToolbarAction.PATH,
        icon: "icon-favorite_outline",
        iconClass: "",
      },
      {
        action: ToolbarAction.CROP,
        icon: "icon-crop",
        iconClass: "",
      },
    ];

    const handleToolbarItemClick = (action: ToolbarAction) => {
      emit("toolbar-item-click", action);
    };

    return {
      toolbarItems,
      handleToolbarItemClick,
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
  @include size(1.5rem);

  &:hover {
    background-color: color(gray, 200);
  }
  &:active {
    background-color: color(gray, 300);
  }
}
</style>
