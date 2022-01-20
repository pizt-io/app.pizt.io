import { HEX_COLOR_REGEX } from "@core/constants/svg";
import { findNearestObjects } from "@/core/utils/findNearestObjects";
import { findColorBetweenTime } from "./findColorBetweenTime";
import { findValueBetweenTime } from "./findValueBetweenTime";
import { SVGStage } from "@/types/svg";

import _isObject from "lodash/isObject";
import _cloneDeep from "lodash/cloneDeep";

export const findStageBetweenStages = (stages: SVGStage[], currentTime: number, keyPath = "") => {
  const _stages = _cloneDeep(stages);

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
      elementStage[keyPath] = {};

      if (
        HEX_COLOR_REGEX.test(previousStage[keyPath]) &&
        HEX_COLOR_REGEX.test(nextStage[keyPath])
      ) {
        elementStage[keyPath] = findColorBetweenTime(
          currentTime,
          previousStage.time,
          nextStage.time,
          previousStage[keyPath],
          nextStage[keyPath],
        );
      } else {
        console.log("findValueBetweenTime", previousStage[keyPath], nextStage[keyPath]);
        if (_isObject(previousStage[keyPath]) && _isObject(nextStage[keyPath])) {
          console.log("findValueBetweenTime");

          elementStage[keyPath] = findValueBetweenTime(
            currentTime,
            previousStage.time,
            nextStage.time,
            previousStage[keyPath],
            nextStage[keyPath],
            true,
          );
        } else {
          elementStage[keyPath] = findValueBetweenTime(
            currentTime,
            previousStage.time,
            nextStage.time,
            previousStage[keyPath],
            nextStage[keyPath],
          );
        }
      }
    }
  } else {
    elementStage = previousStage;
  }

  return elementStage as SVGStage;
};
