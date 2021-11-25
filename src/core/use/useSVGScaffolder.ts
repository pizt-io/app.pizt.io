import {
  SVGEllipse,
  SVGTransform,
  SVGEllipseSize,
  SVGRectangleSize,
  SVGRectangle,
  SVGCircle,
  SVGCircleSize,
  SVGLine,
} from "@/types/svg";
import {
  SVG_ELEMENT_TYPE,
  WIDTH_MAPPING,
  HEIGHT_MAPPING,
  POS_X_MAPPING,
  POS_Y_MAPPING,
} from "@core/constants/svg";

export const useSVGScaffolder = () => {
  /**
   *
   * @param pos Initial position of the shape
   * @param size Size of the shape (in diameter)
   * @param transform Mutated transform property (moved, rotated, scaled)
   * @param style Style of the shape
   * @returns The shape object to be used in the builder
   */
  const circle = (
    pos: SVGPoint,
    size: SVGCircleSize,
    transform: SVGTransform,
    style: {
      fill?: string;
    } = {
      fill: "#f04337",
    }
  ): SVGCircle => ({
    tag: SVG_ELEMENT_TYPE.CIRCLE,
    attrs: {
      [POS_X_MAPPING[SVG_ELEMENT_TYPE.CIRCLE]]: pos.x,
      [POS_Y_MAPPING[SVG_ELEMENT_TYPE.CIRCLE]]: pos.y,
      [WIDTH_MAPPING[SVG_ELEMENT_TYPE.CIRCLE]]: size.width / 2, // Divide to get radius
      ...style,
    },
    transform,
  });

  /**
   *
   * @param pos Initial position of the shape
   * @param size Size of the shape (in diameter)
   * @param transform Mutated transform property (moved, rotated, scaled)
   * @param style Style of the shape
   * @returns The shape object to be used in the builder
   */
  const ellipse = (
    pos: SVGPoint,
    size: SVGEllipseSize,
    transform: SVGTransform,
    style: {
      fill?: string;
    } = {
      fill: "#f04337",
    }
  ): SVGEllipse => ({
    tag: SVG_ELEMENT_TYPE.ELLIPSE,
    attrs: {
      [POS_X_MAPPING[SVG_ELEMENT_TYPE.ELLIPSE]]: pos.x,
      [POS_Y_MAPPING[SVG_ELEMENT_TYPE.ELLIPSE]]: pos.y,
      [WIDTH_MAPPING[SVG_ELEMENT_TYPE.ELLIPSE]]: size.width / 2, // Divide to get radius
      [HEIGHT_MAPPING[SVG_ELEMENT_TYPE.ELLIPSE]]: size.height / 2, // Divide to get radius
      ...style,
    },
    transform,
  });

  /**
   *
   * @param pos Initial position of the shape
   * @param size Size of the shape
   * @param transform Mutated transform property (moved, rotated, scaled)
   * @param style Style of the shape
   * @returns The shape object to be used in the builder
   */
  const rect = (
    pos: SVGPoint,
    size: SVGRectangleSize,
    transform: SVGTransform,
    style: {
      fill?: string;
    } = {
      fill: "#f04337",
    }
  ): SVGRectangle => ({
    tag: SVG_ELEMENT_TYPE.RECT,
    attrs: {
      [POS_X_MAPPING[SVG_ELEMENT_TYPE.RECT]]: pos.x,
      [POS_Y_MAPPING[SVG_ELEMENT_TYPE.RECT]]: pos.y,
      [WIDTH_MAPPING[SVG_ELEMENT_TYPE.RECT]]: size.width,
      [HEIGHT_MAPPING[SVG_ELEMENT_TYPE.RECT]]: size.height,
      ...style,
    },
    transform,
  });

  /**
   *
   * @param pos Initial position of the shape
   * @param transform Mostly won't be used because line doesn't scale or rotate
   * @param style Style of the shape
   * @param bordered Where the shape display a full border when selected or not
   * @returns The shape object to be used in the builder
   */
  const line = (
    pos: [SVGPoint, SVGPoint],
    transform: SVGTransform,
    style: {
      stroke?: string;
    } = {
      stroke: "#f04337",
    },
    bordered?: boolean
  ): SVGLine => ({
    tag: SVG_ELEMENT_TYPE.LINE,
    attrs: {
      x1: pos[0].x,
      y1: pos[0].y,
      x2: pos[1].x,
      y2: pos[1].y,
      ...style,
    },
    bordered,
    transform,
  });

  return {
    circle,
    ellipse,
    rect,
    line,
  };
};
