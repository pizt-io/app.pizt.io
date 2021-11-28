import {
  SVGEllipse,
  SVGTransform,
  SVGEllipseSize,
  SVGRectangleSize,
  SVGRectangle,
  SVGCircle,
  SVGCircleSize,
  SVGLine,
  SVGStyles,
  SVGPath,
  SVGPolygon,
  SVGPolyline,
} from "@/types/svg";
import {
  SVG_ELEMENT_TYPE,
  WIDTH_MAPPING,
  HEIGHT_MAPPING,
  POS_X_MAPPING,
  POS_Y_MAPPING,
} from "@core/constants/svg";

const _getSVGPathBoundingBox = (path: string) => {
  let boundingBox = null;

  if (document) {
    const appEl = document.getElementById("app");
    if (appEl) {
      const svgEl = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "svg"
      );
      svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
      svgEl.setAttribute("style", "position: absolute; z-index: -1");

      const pathEl = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "path"
      );
      pathEl.setAttribute("d", path);

      svgEl.appendChild(pathEl);
      appEl.append(svgEl);

      boundingBox = svgEl.getBBox();

      svgEl.remove();
    }
  }

  return boundingBox;
};

export const useSVGMapper = () => {
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
    style: SVGStyles = {
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
    style: SVGStyles = {
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
    style: SVGStyles = {
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
    style: SVGStyles = {
      stroke: "#f04337",
    }
  ): SVGLine => ({
    tag: SVG_ELEMENT_TYPE.LINE,
    attrs: {
      x1: pos[0].x,
      y1: pos[0].y,
      x2: pos[1].x,
      y2: pos[1].y,
      ...style,
    },
    transform,
  });

  /**
   *
   * Must use with useSVGPathScaffolder()
   *
   * @param commands The commands to be used to build the path
   * @param transform Mutated transform property (moved, rotated, scaled)
   * @param style Style of the shape
   * @returns The shape object to be used in the builder
   *
   * @example path(
        [
          moveTo(10, 30),
          arc([20, 20], [0, 0, 1], [50, 30]),
          arc([20, 20], [0, 0, 1], [90, 30]),
          quadBezier([90, 60], [50, 90]),
          quadBezier([10, 60], [10, 30], closePath()),
        ],
        { translateX: 0, translateY: 0 },
        { fill: "#f04337" }
      )
   */
  const path = (
    commands: Array<string>,
    transform: SVGTransform,
    style: SVGStyles = {
      stroke: "#f04337",
    }
  ): SVGPath => {
    const path = commands.join(" ");
    const boundingBox = _getSVGPathBoundingBox(path);

    return {
      tag: SVG_ELEMENT_TYPE.PATH,
      attrs: {
        d: path,
        ...style,
      },
      boundingBox,
      transform,
    };
  };

  const polygon = (
    positions: Array<[number, number]>,
    transform: SVGTransform,
    style: SVGStyles = {
      stroke: "#f04337",
    }
  ): SVGPolygon => {
    const xPositions = positions.map((pos) => pos[0]);
    const yPositions = positions.map((pos) => pos[1]);

    return {
      tag: SVG_ELEMENT_TYPE.POLYGON,
      attrs: {
        points: positions.map((point) => point.join(",")).join(" "),
        ...style,
      },
      xMin: Math.min(...xPositions),
      yMin: Math.min(...yPositions),
      xMax: Math.max(...xPositions),
      yMax: Math.max(...yPositions),
      transform,
    };
  };

  const polyline = (
    positions: Array<[number, number]>,
    transform: SVGTransform,
    style: SVGStyles = {
      stroke: "#f04337",
    }
  ): SVGPolyline => {
    const xPositions = positions.map((pos) => pos[0]);
    const yPositions = positions.map((pos) => pos[1]);

    return {
      tag: SVG_ELEMENT_TYPE.POLYLINE,
      attrs: {
        points: positions.map((point) => point.join(",")).join(" "),
        ...style,
      },
      xMin: Math.min(...xPositions),
      yMin: Math.min(...yPositions),
      xMax: Math.max(...xPositions),
      yMax: Math.max(...yPositions),
      transform,
    };
  };

  return {
    circle,
    ellipse,
    rect,
    line,
    path,
    polygon,
    polyline,
  };
};
