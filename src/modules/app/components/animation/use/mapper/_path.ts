import { SVG_PATH_CMD } from "@core/constants/svg";
import { SVGPathPostions } from "@/types/svg";

const _getSVGPathBoundingBox = (path: string) => {
  let boundingBox = null;

  if (document) {
    const appEl = document.getElementById("app");
    if (appEl) {
      const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svgEl.setAttribute("style", "position: absolute; z-index: -1");

      const pathEl = document.createElementNS("http://www.w3.org/2000/svg", "path");
      pathEl.setAttribute("d", path);

      svgEl.appendChild(pathEl);
      appEl.append(svgEl);

      boundingBox = svgEl.getBBox();

      svgEl.remove();
    }
  }

  return boundingBox;
};

const _moveTo = (...positions: SVGPathPostions) => {
  const [x, y] = positions;

  return `${SVG_PATH_CMD.MOVE_TO} ${x},${y}`.trim();
};

const _lineTo = (...positions: SVGPathPostions) => {
  const [x, y] = positions;

  return `${SVG_PATH_CMD.LINE_TO} ${x},${y}`.trim();
};

const _lineToHorizontally = (...positions: SVGPathPostions) => {
  const [x] = positions;

  return `${SVG_PATH_CMD.LINE_TO_HORIZONTALLY} ${x}`.trim();
};

const _lineToVertically = (...positions: SVGPathPostions) => {
  const [y] = positions;

  return `${SVG_PATH_CMD.LINE_TO_VERTICALLY} ${y}`.trim();
};

const _cubicBezier = (...positions: SVGPathPostions) => {
  const [x1, y1, x2, y2, x, y] = positions;

  return `${SVG_PATH_CMD.CUBIC_BEZIER} ${[
    [x1, y1].join(" "),
    [x2, y2].join(" "),
    [x, y].join(" "),
  ].join(", ")}`.trim();
};

const _quadBezier = (...positions: SVGPathPostions) => {
  const [x1, y1, x2, y2, x, y] = positions;

  return `${SVG_PATH_CMD.QUADRATIC_BEZIER} ${[
    [x1, y1].join(" "),
    [x2, y2].join(" "),
    [x, y].join(" "),
  ].join(", ")}`.trim();
};

const _arc = (...positions: SVGPathPostions) => {
  const [rx, ry, xAxisRotation, largeArcFlag, sweepFlag, x, y] = positions;

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

const _closePath = () => [`${SVG_PATH_CMD.CLOSE_PATH}`.trim()];

const SVG_PATH_COMMAND_MAPPING: any = Object.freeze({
  [SVG_PATH_CMD.MOVE_TO]: _moveTo,
  [SVG_PATH_CMD.LINE_TO]: _lineTo,
  [SVG_PATH_CMD.LINE_TO_HORIZONTALLY]: _lineToHorizontally,
  [SVG_PATH_CMD.LINE_TO_VERTICALLY]: _lineToVertically,
  [SVG_PATH_CMD.CUBIC_BEZIER]: _cubicBezier,
  [SVG_PATH_CMD.QUADRATIC_BEZIER]: _quadBezier,
  [SVG_PATH_CMD.ARC_CURVE]: _arc,
  [SVG_PATH_CMD.CLOSE_PATH]: _closePath,
});

export const path = (attrs: any) => {
  const svgAttrs = {};

  if (attrs.commands) {
    const commands = attrs.commands.map((command: { type: string; path: number[] }) =>
      SVG_PATH_COMMAND_MAPPING[command.type](...command.path),
    );
    const path = commands.join(" ");
    const boundingBox = _getSVGPathBoundingBox(path);

    Object.assign(svgAttrs, {
      d: path,
      boundingBox,
    });
  }

  attrs = Object.assign({}, attrs, { svg: svgAttrs });

  return attrs;
};
