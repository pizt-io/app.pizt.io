<script lang="ts">
import { defineComponent, h, useCssModule } from "vue";
import { cssPropertiesLabelMapping, SupportProperties } from "@/modules/app/constants/transition";

import { ElDropdown, ElDropdownMenu, ElDropdownItem } from "element-plus";

import "element-plus/theme-chalk/el-dropdown.css";
import "element-plus/theme-chalk/el-dropdown-menu.css";
import "element-plus/theme-chalk/el-dropdown-item.css";

export default defineComponent({
  props: {
    keyframe: Object,
  },
  setup(props) {
    const style = useCssModule();

    return () =>
      h(
        "div",
        {
          class: "flex flex-col items-center justify-center text-gray-100",
        },
        [
          props.keyframe?.data
            ? h(
                "div",
                {},
                (Object.keys(props.keyframe?.data) as SupportProperties[]).map((property) =>
                  h("div", {}, [
                    h("span", {}, cssPropertiesLabelMapping[property]),
                    h("label", {}, props.keyframe?.data[property]),
                  ]),
                ),
              )
            : h("div", {}, "No animated properties in this keyframe"),
          h(
            ElDropdown,
            {
              class: "w-full h-full",
              maxHeight: 300,
              trigger: "click",
            },
            {
              default: () =>
                h(
                  "span",
                  {
                    class: style.timelineKeyframeAddPropertyBtn,
                  },
                  [
                    h(
                      "span",
                      {
                        class: "mr-1",
                      },
                      "+",
                    ),
                    h("span", "Add property"),
                  ],
                ),
              dropdown: () =>
                h(
                  ElDropdownMenu,
                  {},
                  (Object.values(SupportProperties) as SupportProperties[]).map((property) =>
                    h(ElDropdownItem, {}, cssPropertiesLabelMapping[property]),
                  ),
                ),
            },
          ),
        ],
      );
  },
});
</script>

<style lang="scss" module>
@import "@styles/all";

.timelineKeyframeAddPropertyBtn {
  width: 100%;
  height: 30px;
  background-color: color(primary, 500);
  color: color(dark);
  font-weight: bold;
  font-size: 0.75rem;
  transition-duration: $duration-base;
  cursor: pointer;
  user-select: none;

  @include flexCenter();

  &:hover {
    background-color: color(primary, 600);
  }

  &:hover {
    background-color: color(primary, 700);
  }
}
</style>
