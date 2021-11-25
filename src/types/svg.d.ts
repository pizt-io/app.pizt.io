import { SVG_ELEMENT_TYPE } from "@/core/constants/svg";

declare type SVGPoint = {
  x: number;
  y: number;
};

declare type SVGTransform = {
  translateX: number;
  translateY: number;
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
  bordered?: boolean;
  transform: SVGTransform;
};

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
