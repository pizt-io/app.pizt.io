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

export const SVG_CANVAS_EVENT_THROTTLE = 100;

export enum SVG_CANVAS_EVENT {
  UPDATE = "update",
  UPDATE_TIME = "update-time",
  DELETE = "delete",
  SELECT = "select",
  DESELECT = "deselect",
}

export enum SVG_CANVAS_GLOBAL_EVENT {
  UPDATE_ELEMENTS = "update-elements",
}

export enum SVG_UPDATE_TYPE {
  CANVAS,
  TIMELINE,
}

export const HEX_COLOR_REGEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;

export enum ToolbarAction {
  RECTANGLE,
  SQUARE,
  CIRCLE,
  ELLIPSE,
  POLYLINE,
  PATH,
  CROP,
  IMPORT,
}

export const defaultElementMapping = {
  [ToolbarAction.RECTANGLE]: {
    type: SVG_ELEMENT_TYPE.RECT,
    name: "Rectangle New",
    attrs: {
      pos: { x: 0, y: 0 },
      size: { width: 100, height: 70 },
      transform: {
        translate: { translateX: 0, translateY: 0 },
        scale: { scaleX: 1, scaleY: 1 },
        rotate: 0,
        skew: { skewX: 0, skewY: 0 },
        transformOrigin: "center center",
      },
      style: {
        fill: "#f04337",
        stroke: "#5ad3db",
        strokeWidth: 1,
        opacity: 1,
        strokeDasharray: 0,
        strokeDashoffset: 0,
      },
    },
    animations: {},
  },
  [ToolbarAction.SQUARE]: {
    type: SVG_ELEMENT_TYPE.RECT,
    name: "Square New",
    attrs: {
      pos: { x: 0, y: 0 },
      size: { width: 100, height: 100 },
      transform: {
        translate: { translateX: 0, translateY: 0 },
        scale: { scaleX: 1, scaleY: 1 },
        rotate: 0,
        skew: { skewX: 0, skewY: 0 },
        transformOrigin: "center center",
      },
      style: {
        fill: "#f04337",
        stroke: "#5ad3db",
        strokeWidth: 1,
        opacity: 1,
        strokeDasharray: 0,
        strokeDashoffset: 0,
      },
    },
    animations: {},
  },
  [ToolbarAction.CIRCLE]: {
    type: SVG_ELEMENT_TYPE.CIRCLE,
    name: "Circle New",
    attrs: {
      pos: { x: 0, y: 0 },
      size: { width: 100, height: 80 },
      transform: {
        translate: { translateX: 0, translateY: 0 },
        scale: { scaleX: 1, scaleY: 1 },
        rotate: 0,
        skew: { skewX: 0, skewY: 0 },
        transformOrigin: "center center",
      },
      style: {
        fill: "#f04337",
        stroke: "#5ad3db",
        strokeWidth: 1,
        opacity: 1,
        strokeDasharray: 0,
        strokeDashoffset: 0,
      },
    },
    animations: {},
  },
  [ToolbarAction.ELLIPSE]: {
    type: SVG_ELEMENT_TYPE.ELLIPSE,
    name: "Ellipse New",
    attrs: {
      pos: { x: 0, y: 0 },
      size: { width: 100, height: 80 },
      transform: {
        translate: { translateX: 0, translateY: 0 },
        scale: { scaleX: 1, scaleY: 1 },
        rotate: 0,
        skew: { skewX: 0, skewY: 0 },
        transformOrigin: "center center",
      },
      style: {
        fill: "#f04337",
        stroke: "#5ad3db",
        strokeWidth: 1,
        opacity: 1,
        strokeDasharray: 0,
        strokeDashoffset: 0,
      },
    },
    animations: {},
  },
  [ToolbarAction.POLYLINE]: {
    type: SVG_ELEMENT_TYPE.POLYLINE,
    name: "Polyline New",
    attrs: {
      pos: { x: 0, y: 0 },
      size: { width: 100, height: 80 },
      transform: {
        translate: { translateX: 0, translateY: 0 },
        scale: { scaleX: 1, scaleY: 1 },
        rotate: 0,
        skew: { skewX: 0, skewY: 0 },
        transformOrigin: "center center",
      },
      style: {
        fill: "#f04337",
        stroke: "#5ad3db",
        strokeWidth: 1,
        opacity: 1,
        strokeDasharray: 0,
        strokeDashoffset: 0,
      },
    },
    animations: {},
  },
  [ToolbarAction.PATH]: {
    type: SVG_ELEMENT_TYPE.PATH,
    name: "Path New",
    attrs: {
      pos: { x: 0, y: 0 },
      size: { width: 100, height: 80 },
      transform: {
        translate: { translateX: 0, translateY: 0 },
        scale: { scaleX: 1, scaleY: 1 },
        rotate: 0,
        skew: { skewX: 0, skewY: 0 },
        transformOrigin: "center center",
      },
      style: {
        fill: "#f04337",
        stroke: "#5ad3db",
        strokeWidth: 1,
        opacity: 1,
        strokeDasharray: 0,
        strokeDashoffset: 0,
      },
    },
    animations: {},
  },
};
