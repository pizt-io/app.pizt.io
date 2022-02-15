import { HEX_COLOR_REGEX } from "@core/constants/svg";
import { findNearestObjects } from "@/core/utils/findNearestObjects";
import { findColorBetweenTime } from "./findColorBetweenTime";
import { findValueBetweenTime } from "./findValueBetweenTime";
import { SVGStage } from "@/types/svg";

import _isObject from "lodash/isObject";
import _cloneDeep from "lodash/cloneDeep";
import _get from "lodash/get";
import _set from "lodash/set";

/**
 *
 * @param stages
 * @param currentTime
 * @param keyPath Used to compare a specific property
 * @returns
 */
export const findStageBetweenStages = (stages: SVGStage[], currentTime: number, keyPath = "") => {
  const _stages = _cloneDeep(stages).sort((a, b) => a.time - b.time);

  let elementStage: any = {
    time: currentTime,
  };

  const [previousStage, nextStage] = findNearestObjects(_stages, currentTime, "time");

  if (previousStage && nextStage) {
    if (!keyPath) {
      Object.keys(previousStage).forEach((stageProp) => {
        elementStage[stageProp] = {};

        Object.keys(previousStage[stageProp]).forEach((attrKey) => {
          if (
            HEX_COLOR_REGEX.test(previousStage[stageProp][attrKey]) &&
            HEX_COLOR_REGEX.test(nextStage[stageProp][attrKey])
          ) {
            elementStage[stageProp][attrKey] = findColorBetweenTime(
              currentTime,
              previousStage.time,
              nextStage.time,
              previousStage[stageProp][attrKey],
              nextStage[stageProp][attrKey],
            );
          } else {
            elementStage[stageProp][attrKey] = findValueBetweenTime(
              currentTime,
              previousStage.time,
              nextStage.time,
              previousStage[stageProp][attrKey],
              nextStage[stageProp][attrKey],
            );
          }
        });
      });
    } else {
      elementStage = {};

      const previousStageValue = _get(previousStage, keyPath);
      const nextStageValue = _get(nextStage, keyPath);

      if (HEX_COLOR_REGEX.test(previousStageValue) && HEX_COLOR_REGEX.test(nextStageValue)) {
        _set(
          elementStage,
          keyPath,
          findColorBetweenTime(
            currentTime,
            previousStage.time,
            nextStage.time,
            previousStageValue,
            nextStageValue,
          ),
        );
      } else {
        _set(
          elementStage,
          keyPath,
          findValueBetweenTime(
            currentTime,
            previousStage.time,
            nextStage.time,
            previousStageValue,
            nextStageValue,
            _isObject(previousStageValue) && _isObject(nextStageValue),
          ),
        );
      }
    }
  } else {
    elementStage = previousStage || nextStage;
  }

  elementStage.time = currentTime;

  return elementStage as SVGStage;
};
