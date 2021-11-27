import { SVG_PATH_CMD } from "@/core/constants/svg";
import { SVGPathPostions } from "@/types/svg";

export const useSVGPathScaffolder = () => {
  const moveTo = (x: number, y: number) =>
    `${SVG_PATH_CMD.MOVE_TO} ${x},${y}`.trim();

  const lineTo = (x: number, y: number) =>
    `${SVG_PATH_CMD.LINE_TO} ${x},${y}`.trim();

  const lineToHorizontally = (x: number) =>
    `${SVG_PATH_CMD.LINE_TO_HORIZONTALLY} ${x}`.trim();

  const lineToVertically = (y: number) =>
    `${SVG_PATH_CMD.LINE_TO_VERTICALLY} ${y}`.trim();

  const cubicBezier = (...positions: SVGPathPostions) => {
    const [x1 = "", y1 = ""] = positions?.[0] || [];
    const [x2 = "", y2 = ""] = positions?.[1] || [];
    const [x = "", y = ""] = positions?.[2] || [];

    return `${SVG_PATH_CMD.CUBIC_BEZIER} ${[
      [x1, y1].join(" "),
      [x2, y2].join(" "),
      [x, y].join(" "),
    ].join(", ")}`.trim();
  };

  const quadBezier = (...positions: SVGPathPostions) => {
    const [x1 = "", y1 = ""] = positions?.[0] || [];
    const [x2 = "", y2 = ""] = positions?.[1] || [];
    const [x = "", y = ""] = positions?.[2] || [];

    return `${SVG_PATH_CMD.QUADRATIC_BEZIER} ${[
      [x1, y1].join(" "),
      [x2, y2].join(" "),
      [x, y].join(" "),
    ].join(", ")}`.trim();
  };

  const arc = (...positions: SVGPathPostions) => {
    const [rx = "", ry = ""] = positions?.[0] || [];
    const [xAxisRotation = "", largeArcFlag = "", sweepFlag = ""] =
      positions?.[1] || [];
    const [x = "", y = ""] = positions?.[2] || [];

    return `${SVG_PATH_CMD.ARC_CURVE} ${[
      rx.toString(),
      ry.toString(),
      xAxisRotation.toString(),
      largeArcFlag.toString(),
      sweepFlag.toString(),
      x.toString(),
      y.toString(),
    ]
      .filter((c) => c)
      .join(" ")}`;
  };

  const closePath = () => [`${SVG_PATH_CMD.CLOSE_PATH}`.trim()];

  return {
    moveTo,
    lineTo,
    lineToHorizontally,
    lineToVertically,
    cubicBezier,
    quadBezier,
    arc,
    closePath,
  };
};
