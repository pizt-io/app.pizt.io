import { inject, ref, Ref } from "vue";
import { SVG_STAGES_MAPPING } from "./mapper";
import {
  AttributesMap,
  DEFAULT_VALUE_MAPPPING,
} from "@/core/components/vue-timeline-animation/src/constants";

import _get from "lodash/get";
import _set from "lodash/set";
import _isEqual from "lodash/isEqual";

export const ANIMATABLE_CSS_PROPERTY_MAPPING = Object.freeze({
  [AttributesMap.POSITION]: (val: any, type: string) => {
    const svgValue = SVG_STAGES_MAPPING[type]({ pos: val }).svg;

    return `${Object.keys(svgValue)
      .map((attr) => `${attr}: ${svgValue[attr]};`)
      .join(" ")}`;
  },
  [AttributesMap.SIZE]: (val: any, type: string) => {
    const svgValue = SVG_STAGES_MAPPING[type]({ size: val }).svg;

    return `${Object.keys(svgValue)
      .map((attr) => `${attr}: ${svgValue[attr]};`)
      .join(" ")}`;
  },
  [AttributesMap.TRANSLATE]: (val: any) => {
    return `translate(${val.translateX}px, ${val.translateY}px)`;
  },
  [AttributesMap.SCALE]: (val: any) => {
    return `scale(${val.scaleX}, ${val.scaleY})`;
  },
  [AttributesMap.ROTATE]: (val: any) => {
    return `rotate(${val}deg)`;
  },
  [AttributesMap.SKEW]: (val: any) => {
    return `skew(${val.skewX}deg, ${val.skewY}deg)`;
  },
  [AttributesMap.ORIGIN]: (val: any) => `transform-origin: ${val};`,
  [AttributesMap.FILL]: (val: any) => `fill: ${val};`,
  [AttributesMap.STROKE]: (val: any) => `stroke: ${val};`,
  [AttributesMap.STROKE_WIDTH]: (val: any) => `stroke-width: ${val}px;`,
  [AttributesMap.STROKE_DASH_ARRAY]: (val: any) => `stroke-dasharray: ${val};`,
  [AttributesMap.STROKE_DASH_OFFSET]: (val: any) => `stroke-dashoffset: ${val};`,
  [AttributesMap.OPACITY]: (val: any) => `opacity: ${val};`,
} as any);

const DEFAULT_TRANSFORM_VALUE = Object.freeze({
  [AttributesMap.TRANSLATE]: "translate(0px, 0px)",
  [AttributesMap.SCALE]: "scale(1, 1)",
  [AttributesMap.ROTATE]: "rotate(0deg)",
  [AttributesMap.SKEW]: "skew(0deg, 0deg)",
} as any);

export const useSVGExporter = () => {
  const duration = inject<Ref<number>>("duration", ref(5000));
  const canvasWidth = inject<Ref<number>>("canvasWidth", ref(5000));
  const canvasHeight = inject<Ref<number>>("canvasHeight", ref(5000));

  const objectToAttrString = (obj: any) => {
    return Object.keys(obj)
      .map((key) => `${key}="${obj[key]}"`)
      .join(" ");
  };

  const exportSVG = (elements: any[]) => {
    let svg = null;

    if (document) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svg.setAttribute("viewBox", `0 0 ${canvasWidth.value} ${canvasHeight.value}`);

      const svgInner = elements
        .map((element: any) => {
          const elementAttrs = SVG_STAGES_MAPPING[element.type](element.attrs);

          const elementSVGString = objectToAttrString(elementAttrs.svg);
          let elementAttrsString = "";
          Object.values(AttributesMap).forEach((key) => {
            const attrVal = _get(elementAttrs, key);

            if (
              attrVal &&
              !_isEqual(attrVal, DEFAULT_VALUE_MAPPPING[key]) &&
              ![
                AttributesMap.POSITION,
                AttributesMap.SIZE,
                AttributesMap.TRANSLATE,
                AttributesMap.SCALE,
                AttributesMap.ROTATE,
                AttributesMap.SKEW,
              ].includes(key)
            ) {
              const cssValue = ANIMATABLE_CSS_PROPERTY_MAPPING[key](attrVal);
              elementAttrsString += cssValue;
            }
          });

          const elementAnimations: any = {};
          let elementAnimationsString = "";

          const animationTransform: any = {};
          const usedTransformKeys = new Set();

          Object.keys(element.animations).forEach((path: string) => {
            const animations = element.animations[path];
            animations.forEach((animation: any) => {
              const animationValue = _get(animation, path);
              const cssValue = ANIMATABLE_CSS_PROPERTY_MAPPING[path]?.(
                animationValue,
                element.type,
              );

              const isTransformProperty = [
                AttributesMap.TRANSLATE,
                AttributesMap.SCALE,
                AttributesMap.ROTATE,
                AttributesMap.SKEW,
              ].includes(path as AttributesMap);

              if (isTransformProperty) {
                _set(
                  animationTransform,
                  (animation.time * 100) / duration.value + "%",
                  Object.assign(
                    {},
                    _get(animationTransform, (animation.time * 100) / duration.value + "%"),
                    {
                      [path]: cssValue,
                    },
                  ),
                );

                usedTransformKeys.add(path);
              } else if (animationValue && ANIMATABLE_CSS_PROPERTY_MAPPING[path]) {
                _set(
                  elementAnimations,
                  (animation.time * 100) / duration.value + "%",
                  Object.assign(
                    {},
                    _get(elementAnimations, (animation.time * 100) / duration.value + "%"),
                    {
                      [path]: cssValue,
                    },
                  ),
                );
              }
            });
          });

          Object.keys(animationTransform).forEach((keyframe: string) => {
            _set(
              elementAnimations,
              keyframe,
              Object.assign({}, _get(elementAnimations, keyframe), {
                transform: `transform: ${Array.from(usedTransformKeys)
                  .map(
                    (path: any) =>
                      animationTransform[keyframe][path] || DEFAULT_TRANSFORM_VALUE[path],
                  )
                  .join(" ")};`,
              }),
            );
          });

          Object.keys(elementAnimations).forEach((keyframe: string) => {
            elementAnimationsString += `${keyframe} { ${Object.values(
              elementAnimations[keyframe],
            ).join(" ")} } `;
          });

          return `
          <${element.type} id="${element._id}" ${elementSVGString}></${element.type}>
          <style>
            #${element._id} {
              ${elementAttrsString}
              --x: ${elementAttrs.transform.translate.translateX}px;
              --y: ${elementAttrs.transform.translate.translateY}px;
              --scaleX: ${elementAttrs.transform.scale.scaleX};
              --scaleY: ${elementAttrs.transform.scale.scaleY};
              --rotate: ${elementAttrs.transform.rotate}deg;
              --skewX: ${elementAttrs.transform.skew.skewX}deg;
              --skewY: ${elementAttrs.transform.skew.skewY}deg;
              transform: translate(var(--x), var(--y)) scale(var(--scaleX), var(--scaleY)) rotate(var(--rotate)) skew(var(--skewX), var(--skewY));
              animation: ${element._id} ${duration.value}ms linear forwards;
            }
            @keyframes ${element._id} { ${elementAnimationsString} }
          </style>
        `;
        })
        .join("");

      svg.innerHTML = svgInner;
    }

    return svg;
  };

  return {
    exportSVG,
  };
};
