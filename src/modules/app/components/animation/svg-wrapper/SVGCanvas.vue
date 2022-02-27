<script lang="ts">
import { computed, defineComponent, h, ref } from "vue";
import { SVG_CANVAS_EVENT, SVG_ELEMENT_PREFIX, SVG_ELEMENT_TYPE } from "@/core/constants/svg";

import SVGElementComponent from "@modules/app/components/animation/svg-wrapper/SVGElement.vue";
import { findStageBetweenStages } from "@modules/app/utils/keyframes/findStageBetweenStages";
import { BORDER_BUILDER_MAPPING, HANDLES_BUILDER_MAPPING, SVG_STAGES_MAPPING } from "../use/mapper";
import { useSVGHandlers } from "../use/useSVGHandlers";

export default defineComponent({
  name: "SVGCanvas",
  components: { SVGElementComponent },
  props: {
    modelElements: {
      type: Array,
      default: () => [],
    },
    time: {
      type: Number,
      default: 0,
    },
  },
  emits: ["update:modelElements", SVG_CANVAS_EVENT.SELECT, SVG_CANVAS_EVENT.DESELECT],
  setup(props) {
    const elements = ref(props.modelElements);

    const {
      selectedElements,
      handleMousedownCanvas,
      handleClearSelection,
      handleElementSelection,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      handleElementResize,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      handleElementRotate,
      mouseOverElements,
      handleElementMouseover,
      handleElementMouseout,
    } = useSVGHandlers(elements);

    const elementVNodes = computed(() =>
      elements.value.map((element: any, index: number) => {
        let elementAttrs = SVG_STAGES_MAPPING[element.type](element.attrs);

        let elementTransform = elementAttrs.transform;
        let elementStyle = elementAttrs.style;

        // Apply animations into element
        Object.keys(element.animations).forEach((attr: string) => {
          const stages = element.animations[attr];

          const currentStage =
            stages &&
            (stages.find((stage: any) => stage.time === props.time) ||
              findStageBetweenStages(stages, props.time, attr));

          elementTransform = Object.assign({}, elementTransform, currentStage.transform);
          elementStyle = Object.assign({}, elementStyle, currentStage.style);

          switch (attr) {
            case "size":
              elementAttrs.svg = Object.assign(
                {},
                elementAttrs.svg,
                SVG_STAGES_MAPPING[element.type](currentStage).svg,
              );
              break;
          }
        });

        const borderVNode = BORDER_BUILDER_MAPPING[element.type].build(elementAttrs, {
          name: element.name,
          labelStyle: { fontSize: "12px", pointerEvents: "none", userSelect: "none" },
          labelOffset: 3,
        });
        const handleVNodes = HANDLES_BUILDER_MAPPING[element.type].build(elementAttrs);

        return h(
          SVGElementComponent,
          {
            transform: elementTransform,
            index,
            element,
            key: element._id,
            id: element._id,
            onMouseover: () => handleElementMouseover({ id: element._id, element }),
            onMouseout: handleElementMouseout,
          },
          [
            h(element.type, {
              ...elementAttrs.svg,
              style: elementStyle,
              onMousedown: () => handleElementSelection({ id: element._id, element }),
            }),
            [
              selectedElements.value[element._id]
                ? h(
                    SVG_ELEMENT_TYPE.G,
                    {
                      id: [SVG_ELEMENT_PREFIX, "bbox", index].join("-"),
                      key: [SVG_ELEMENT_PREFIX, "bbox", index].join("-"),
                    },
                    [borderVNode, handleVNodes],
                  )
                : mouseOverElements.value[element._id]
                ? h(
                    SVG_ELEMENT_TYPE.G,
                    {
                      id: [SVG_ELEMENT_PREFIX, "obox", index].join("-"),
                      key: [SVG_ELEMENT_PREFIX, "obox", index].join("-"),
                    },
                    [borderVNode],
                  )
                : null,
            ],
          ],
        );
      }),
    );

    return () =>
      h(
        SVG_ELEMENT_TYPE.SVG,
        {
          id: "svg-canvas",
          xmlns: "http://www.w3.org/2000/svg",
          width: "100%",
          height: "100%",
          onMousedown: handleMousedownCanvas,
        },
        [
          h(SVG_ELEMENT_TYPE.RECT, {
            fill: "transparent",
            style: { width: "100%", height: "100%" },
            onClick: handleClearSelection,
          }),
          elementVNodes.value,
        ],
      );
  },
});
</script>
