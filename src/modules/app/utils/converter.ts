import { SVGElement } from "@/types/svg";
import { SVG_COMMAND_MAPPING } from "@/modules/app/use/svg/mapper";

import _isEqual from "lodash/isEqual";
import _get from "lodash/get";

enum STAGE_PROPERTY {
  POSITION = "position",
  SIZE = "size",
  TRANSFORM = "transform",
  FILL = "fill",
  OPACITY = "opacity",
}

const STAGE_PROPERTY_MAPPING = Object.freeze({
  [STAGE_PROPERTY.POSITION]: "pos",
  [STAGE_PROPERTY.SIZE]: "size",
  [STAGE_PROPERTY.TRANSFORM]: "transform",
  [STAGE_PROPERTY.FILL]: "style.fill",
  [STAGE_PROPERTY.OPACITY]: "style.opacity",
});

const STAGE_PROPERTY_LABEL = Object.freeze({
  [STAGE_PROPERTY.POSITION]: "Position",
  [STAGE_PROPERTY.SIZE]: "Size",
  [STAGE_PROPERTY.TRANSFORM]: "Transform",
  [STAGE_PROPERTY.FILL]: "Fill",
  [STAGE_PROPERTY.OPACITY]: "Opacity",
});

const STAGE_PROPERTY_PREFIX = Object.freeze({
  [STAGE_PROPERTY.POSITION]: "st_pos_",
  [STAGE_PROPERTY.SIZE]: "st_size_",
  [STAGE_PROPERTY.TRANSFORM]: "st_tr_",
  [STAGE_PROPERTY.FILL]: "st_fill_",
  [STAGE_PROPERTY.OPACITY]: "st_op_",
});

export const convertDataToElements = (jsonArray: Array<any>): Array<SVGElement> => {
  const elements = jsonArray.map((el: any) => ({
    _id: el._id,
    type: el.type,
    name: el.name,
    animated: el.animated,
    origin: el,
    ...(SVG_COMMAND_MAPPING as any)[el.type](el.stages),
  }));

  return elements;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const convertElementsToData = (elements: Array<SVGElement>): Array<any> => {
  return [];
};

const _mapStage = (prop: STAGE_PROPERTY, state: any) => ({
  time: state.time,
  label: STAGE_PROPERTY_LABEL[prop],
  property: prop,
  value: _get(state, STAGE_PROPERTY_MAPPING[prop]),
});

export const convertDataToTimelineElements = (jsonArray: Array<any>) => {
  const elements = jsonArray.map((el: any) => {
    const mappedKeyframes: string[] = [];
    const mappedStages: any = {};

    const stages = Object.values(el.stages);
    const keyframes = Object.keys(el.stages);

    if (el.animated) {
      stages.forEach((currentStage: any, currentIndex: number) => {
        const previousStage: any = stages[currentIndex - 1];

        const previousKeyframe = keyframes[currentIndex - 1];
        const currentKeyframe = keyframes[currentIndex];

        if (previousStage && currentStage) {
          Object.values(STAGE_PROPERTY).forEach((prop: STAGE_PROPERTY) => {
            const previousPropValue = _get(previousStage, STAGE_PROPERTY_MAPPING[prop]) || null;
            const currentPropValue = _get(currentStage, STAGE_PROPERTY_MAPPING[prop]) || null;
            if (
              previousPropValue &&
              currentPropValue &&
              !_isEqual(previousPropValue, currentPropValue)
            ) {
              mappedStages[STAGE_PROPERTY_PREFIX[prop] + previousKeyframe] = _mapStage(
                prop,
                previousStage,
              );
              mappedStages[STAGE_PROPERTY_PREFIX[prop] + currentKeyframe] = _mapStage(
                prop,
                currentStage,
              );

              mappedKeyframes.push(STAGE_PROPERTY_PREFIX[prop] + previousKeyframe);
              mappedKeyframes.push(STAGE_PROPERTY_PREFIX[prop] + currentKeyframe);
            }
          });
        }
      });
    }

    return {
      _id: el._id,
      name: el.name,
      animated: el.animated,
      expanded: false,
      keyframes: mappedKeyframes,
      stages: mappedStages,
      origin: el,
    };
  });

  return elements;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const convertTimelineElementsToData = (elements: Array<SVGElement>): Array<any> => {
  return [];
};
