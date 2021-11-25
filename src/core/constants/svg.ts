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
