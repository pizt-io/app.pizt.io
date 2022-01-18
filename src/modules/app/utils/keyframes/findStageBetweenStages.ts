import { HEX_COLOR_REGEX } from "@core/constants/svg";
import { findNearestObjects } from "@/core/utils/findNearestObjects";
import { findColorBetweenTime } from "./findColorBetweenTime";
import { findValueBetweenTime } from "./findValueBetweenTime";
import { SVGStage } from "@/types/svg";

export const findStageBetweenStages = (stages: SVGStage[], currentTime: number) => {
  let elementStage: any = {
    time: currentTime,
  };

  const [previousStage, nextStage] = findNearestObjects(stages, currentTime, "time");

  if (previousStage && nextStage) {
    Object.keys(previousStage).forEach((stageKey) => {
      elementStage[stageKey] = {};

      Object.keys(previousStage[stageKey]).forEach((attrKey) => {
        if (
          HEX_COLOR_REGEX.test(previousStage[stageKey][attrKey]) &&
          HEX_COLOR_REGEX.test(nextStage[stageKey][attrKey])
        ) {
          elementStage[stageKey][attrKey] = findColorBetweenTime(
            currentTime,
            previousStage.time,
            nextStage.time,
            previousStage[stageKey][attrKey],
            nextStage[stageKey][attrKey],
          );
        } else {
          elementStage[stageKey][attrKey] = findValueBetweenTime(
            currentTime,
            previousStage.time,
            nextStage.time,
            previousStage[stageKey][attrKey],
            nextStage[stageKey][attrKey],
          );
        }
      });
    });
  } else {
    elementStage = previousStage;
  }

  return elementStage as SVGStage;
};
