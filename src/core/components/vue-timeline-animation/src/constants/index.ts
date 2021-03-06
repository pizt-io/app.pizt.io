export enum AttributesMap {
  POSITION = "pos",
  SIZE = "size",
  TRANSLATE = "transform.translate",
  SCALE = "transform.scale",
  ROTATE = "transform.rotate",
  SKEW = "transform.skew",
  ORIGIN = "transform.transformOrigin",
  FILL = "style.fill",
  STROKE = "style.stroke",
  STROKE_WIDTH = "style.strokeWidth",
  STROKE_DASH_ARRAY = "style.strokeDasharray",
  STROKE_DASH_OFFSET = "style.strokeDashoffset",
  OPACITY = "style.opacity",
}

export const ANIMATED_ATTRIBUTES = [
  // AttributesMap.POSITION,
  AttributesMap.SIZE,
  AttributesMap.TRANSLATE,
  AttributesMap.SCALE,
  AttributesMap.ROTATE,
  AttributesMap.SKEW,
  AttributesMap.ORIGIN,
  AttributesMap.FILL,
  AttributesMap.STROKE,
  AttributesMap.STROKE_WIDTH,
  AttributesMap.STROKE_DASH_ARRAY,
  AttributesMap.STROKE_DASH_OFFSET,
  AttributesMap.OPACITY,
];

export const LABEL_MAPPING = Object.freeze({
  [AttributesMap.POSITION]: "Position",
  [AttributesMap.SIZE]: "Size",
  [AttributesMap.TRANSLATE]: "Position",
  [AttributesMap.SCALE]: "Scale",
  [AttributesMap.ROTATE]: "Rotate",
  [AttributesMap.SKEW]: "Skew",
  [AttributesMap.ORIGIN]: "Origin",
  [AttributesMap.FILL]: "Fill",
  [AttributesMap.STROKE]: "Stroke color",
  [AttributesMap.STROKE_WIDTH]: "Stroke width",
  [AttributesMap.STROKE_DASH_ARRAY]: "Stroke dash array",
  [AttributesMap.STROKE_DASH_OFFSET]: "Stroke dash offset",
  [AttributesMap.OPACITY]: "Opacity",
});

export const DEFAULT_VALUE_MAPPPING = Object.freeze({
  [AttributesMap.POSITION]: { x: 0, y: 0 },
  [AttributesMap.SIZE]: { width: 100, height: 100 },
  [AttributesMap.TRANSLATE]: { translateX: 0, translateY: 0 },
  [AttributesMap.SCALE]: { scaleX: 1, scaleY: 1 },
  [AttributesMap.ROTATE]: 0,
  [AttributesMap.SKEW]: { skewX: 0, skewY: 0 },
  [AttributesMap.ORIGIN]: "center",
  [AttributesMap.FILL]: "#000",
  [AttributesMap.STROKE]: "#000",
  [AttributesMap.STROKE_WIDTH]: 1,
  [AttributesMap.STROKE_DASH_ARRAY]: 0,
  [AttributesMap.STROKE_DASH_OFFSET]: 0,
  [AttributesMap.OPACITY]: 1,
});
