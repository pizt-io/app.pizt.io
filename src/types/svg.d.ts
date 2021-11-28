import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";

declare type SVGPoint = {
  x: number;
  y: number;
};

declare type SVGTransform = {
  translateX: number;
  translateY: number;
};

declare type SVGStyles = {
  fill?: string;
  stroke?: string;
  strokeWidth?: string;
};

declare type SVGCircle = {
  tag: SVG_ELEMENT_TYPE.CIRCLE;
  attrs: {
    [x: string]: string | number;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
  };
  transform: SVGTransform;
};

declare type SVGEllipse = {
  tag: SVG_ELEMENT_TYPE.ELLIPSE;
  attrs: {
    [x: string]: string | number;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
  };
  transform: SVGTransform;
};

declare type SVGRectangle = {
  tag: SVG_ELEMENT_TYPE.RECT;
  attrs: {
    [x: string]: string | number;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
  };
  transform: SVGTransform;
};

declare type SVGLine = {
  tag: SVG_ELEMENT_TYPE.LINE;
  attrs: {
    x1: string | number;
    y1: string | number;
    x2: string | number;
    y2: string | number;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
  };
  transform: SVGTransform;
};

declare type SVGPath = {
  tag: SVG_ELEMENT_TYPE.PATH;
  attrs: {
    d: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
  };
  boundingBox: null | {
    height: number;
    width: number;
    x: number;
    y: number;
  };
  transform: SVGTransform;
};

declare type SVGPolygon = {
  tag: SVG_ELEMENT_TYPE.POLYGON;
  attrs: {
    points: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
  };
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
  transform: SVGTransform;
};

declare type SVGPolyline = {
  tag: SVG_ELEMENT_TYPE.POLYLINE;
  attrs: {
    points: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: string;
  };
  xMin: number;
  yMin: number;
  xMax: number;
  yMax: number;
  transform: SVGTransform;
};

declare type SVGElement =
  | SVGCircle
  | SVGEllipse
  | SVGRectangle
  | SVGLine
  | SVGPath
  | SVGPolygon
  | SVGPolyline;

/**
 * @param width Horizontal diameter of the circle
 */
declare type SVGCircleSize = {
  width: number;
};

/**
 * @param width Horizontal diameter of the ellipse
 * @param height Vertical diameter of the ellipse
 */
declare type SVGEllipseSize = {
  width: number;
  height: number;
};

declare type SVGRectangleSize = {
  width: number;
  height: number;
};

declare type SVGLineSize = {
  width: number;
};

/**
 * Use for SVG path scaffolder with infinite number of parameters and a close command
 */
declare type SVGPathPostions =
  | number[]
  | [[number, number], [number, number], [number, number]]
  | SVG_PATH_CMD.CLOSE_PATH
  | SVG_PATH_ABS_CMD.CLOSE_PATH;

declare type SVGElementDragPayload = {
  index: number;
  el: SVGElement;
  dx: number;
  dy: number;
};

declare type SVGElementSelectPayload = {
  id: string;
  el: SVGElement;
};
