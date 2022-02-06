export enum SVG_ELEMENT_TYPE {
  CIRCLE = "circle",
  RECT = "rect",
  PATH = "path",
  POLYGON = "polygon",
  POLYLINE = "polyline",
  LINE = "line",
  ELLIPSE = "ellipse",
  TEXT = "text",
  IMAGE = "image",
  USE = "use",
  G = "g",
  DEFS = "defs",
  SYMBOL = "symbol",
  LINEAR_GRADIENT = "linearGradient",
  RADIAL_GRADIENT = "radialGradient",
  STOP = "stop",
  PATTERN = "pattern",
  MASK = "mask",
  CLIP_PATH = "clipPath",
  FILTER = "filter",
  FOREIGN_OBJECT = "foreignObject",
  MARKER = "marker",
  VIEW = "view",
  SVG = "svg",
}

export enum SVG_PATH_CMD {
  MOVE_TO = "M",
  LINE_TO = "L",
  LINE_TO_HORIZONTALLY = "H",
  LINE_TO_VERTICALLY = "V",
  CUBIC_BEZIER = "C",
  QUADRATIC_BEZIER = "Q",
  ARC_CURVE = "A",
  CLOSE_PATH = "Z",
}

export enum SVG_PATH_ABS_CMD {
  MOVE_TO = "m",
  LINE_TO = "l",
  LINE_TO_HORIZONTALLY = "h",
  LINE_TO_VERTICALLY = "v",
  CUBIC_BEZIER = "c",
  QUADRATIC_BEZIER = "q",
  ARC_CURVE = "q",
  CLOSE_PATH = "z",
}

export const SVG_ELEMENT_PREFIX = "svg";

export const POS_X_MAPPING = Object.freeze({
  [SVG_ELEMENT_TYPE.CIRCLE]: "cx",
  [SVG_ELEMENT_TYPE.ELLIPSE]: "cx",
  [SVG_ELEMENT_TYPE.RECT]: "x",
});

export const POS_Y_MAPPING = Object.freeze({
  [SVG_ELEMENT_TYPE.CIRCLE]: "cy",
  [SVG_ELEMENT_TYPE.ELLIPSE]: "cy",
  [SVG_ELEMENT_TYPE.RECT]: "y",
});

export const WIDTH_MAPPING = Object.freeze({
  [SVG_ELEMENT_TYPE.CIRCLE]: "r",
  [SVG_ELEMENT_TYPE.ELLIPSE]: "rx",
  [SVG_ELEMENT_TYPE.RECT]: "width",
});

export const HEIGHT_MAPPING = Object.freeze({
  [SVG_ELEMENT_TYPE.CIRCLE]: "r",
  [SVG_ELEMENT_TYPE.ELLIPSE]: "ry",
  [SVG_ELEMENT_TYPE.RECT]: "height",
});

export const SVG_CANVAS_EVENT_THROTTLE = 300;

export enum SVG_CANVAS_EVENT {
  UPDATE = "update",
}

export enum SVG_CANVAS_GLOBAL_EVENT {
  UPDATE_ELEMENTS = "update-elements",
}

export enum SVG_UPDATE_TYPE {
  ELEMENT,
  TIMELINE,
}

export const HEX_COLOR_REGEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
