export interface Point {
  x: number;
  y: number;
}

export interface CanvasCircleElement {
  type: "circle";
  position: Point;
  radius: number;
}

export interface CanvasRectangleElement {
  type: "rectangle";
  position: Point;
  size: RectangleSize;
}

export interface CanvasLineElement {
  type: "line";
  positions: [Point, Point];
  width: number;
}

export type RectangleSize = {
  width: number;
  height: number;
};

export type CanvasElementList = Array<
  CanvasLineElement | CanvasCircleElement | CanvasRectangleElement
>;
