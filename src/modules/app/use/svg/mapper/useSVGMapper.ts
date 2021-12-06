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
  SVG_PATH_CMD,
} from "@core/constants/svg";
import { useSVGPathMapper } from "@modules/app/use/svg/mapper";

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

export const useOldSVGMapper = () => {
  /**
   *
   * @param pos Initial position of the shape
   * @param size Size of the shape (in diameter)
   * @param transform Mutated transform property (moved, rotated, scaled)
   * @param style Style of the shape
   * @returns The shape object to be used in the builder
   */
  const circle =
    (id: string) =>
    (
      pos: SVGPoint,
      size: SVGCircleSize,
      transform: SVGTransform,
      style: SVGStyles = {
        fill: "#f04337",
      },
    ): SVGCircle => ({
      _id: id,
      tag: SVG_ELEMENT_TYPE.CIRCLE,
      attrs: {
        [POS_X_MAPPING[SVG_ELEMENT_TYPE.CIRCLE] as string]: pos.x,
        [POS_Y_MAPPING[SVG_ELEMENT_TYPE.CIRCLE] as string]: pos.y,
        [WIDTH_MAPPING[SVG_ELEMENT_TYPE.CIRCLE] as string]: size.width / 2, // Divide to get radius
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
  const ellipse =
    (id: string) =>
    (
      pos: SVGPoint,
      size: SVGEllipseSize,
      transform: SVGTransform,
      style: SVGStyles = {
        fill: "#f04337",
      },
    ): SVGEllipse => ({
      _id: id,
      tag: SVG_ELEMENT_TYPE.ELLIPSE,
      attrs: {
        [POS_X_MAPPING[SVG_ELEMENT_TYPE.ELLIPSE] as string]: pos.x,
        [POS_Y_MAPPING[SVG_ELEMENT_TYPE.ELLIPSE] as string]: pos.y,
        [WIDTH_MAPPING[SVG_ELEMENT_TYPE.ELLIPSE] as string]: size.width / 2, // Divide to get radius
        [HEIGHT_MAPPING[SVG_ELEMENT_TYPE.ELLIPSE] as string]: size.height / 2, // Divide to get radius
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
  const rect =
    (id: string) =>
    (
      pos: SVGPoint,
      size: SVGRectangleSize,
      transform: SVGTransform,
      style: SVGStyles = {
        fill: "#f04337",
      },
    ): SVGRectangle => ({
      _id: id,
      tag: SVG_ELEMENT_TYPE.RECT,
      attrs: {
        [POS_X_MAPPING[SVG_ELEMENT_TYPE.RECT] as string]: pos.x,
        [POS_Y_MAPPING[SVG_ELEMENT_TYPE.RECT] as string]: pos.y,
        [WIDTH_MAPPING[SVG_ELEMENT_TYPE.RECT] as string]: size.width,
        [HEIGHT_MAPPING[SVG_ELEMENT_TYPE.RECT] as string]: size.height,
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
  const line =
    (id: string) =>
    (
      pos: [SVGPoint, SVGPoint],
      transform: SVGTransform,
      style: SVGStyles = {
        stroke: "#f04337",
      },
    ): SVGLine => ({
      _id: id,
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
  const path =
    (id: string) =>
    (
      commands: Array<string>,
      transform: SVGTransform,
      style: SVGStyles = {
        stroke: "#f04337",
      },
    ): SVGPath => {
      const path = commands.join(" ");
      const boundingBox = _getSVGPathBoundingBox(path);

      return {
        _id: id,
        tag: SVG_ELEMENT_TYPE.PATH,
        attrs: {
          d: path,
          ...style,
        },
        boundingBox,
        transform,
      };
    };

  const polygon =
    (id: string) =>
    (
      positions: Array<[number, number]>,
      transform: SVGTransform,
      style: SVGStyles = {
        stroke: "#f04337",
      },
    ): SVGPolygon => {
      const xPositions = positions.map((pos) => pos[0]);
      const yPositions = positions.map((pos) => pos[1]);

      return {
        _id: id,
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

  const polyline =
    (id: string) =>
    (
      positions: Array<[number, number]>,
      transform: SVGTransform,
      style: SVGStyles = {
        stroke: "#f04337",
      },
    ): SVGPolyline => {
      const xPositions = positions.map((pos) => pos[0]);
      const yPositions = positions.map((pos) => pos[1]);

      return {
        _id: id,
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

export const useSVGMapper = () => {
  const {
    moveTo,
    lineTo,
    lineToHorizontally,
    lineToVertically,
    cubicBezier,
    quadBezier,
    arc,
    closePath,
  } = useSVGPathMapper();

  const SVG_PATH_COMMAND_MAPPING: any = Object.freeze({
    [SVG_PATH_CMD.MOVE_TO]: moveTo,
    [SVG_PATH_CMD.LINE_TO]: lineTo,
    [SVG_PATH_CMD.LINE_TO_HORIZONTALLY]: lineToHorizontally,
    [SVG_PATH_CMD.LINE_TO_VERTICALLY]: lineToVertically,
    [SVG_PATH_CMD.CUBIC_BEZIER]: cubicBezier,
    [SVG_PATH_CMD.QUADRATIC_BEZIER]: quadBezier,
    [SVG_PATH_CMD.ARC_CURVE]: arc,
    [SVG_PATH_CMD.CLOSE_PATH]: closePath,
  });

  const circle = (id: string) => (stages: { [time: string]: any }) => {
    const _mappedStages: any = {};

    Object.keys(stages).forEach((time: string) => {
      _mappedStages[time] = {
        attrs: {
          [POS_X_MAPPING[SVG_ELEMENT_TYPE.CIRCLE] as string]: stages[time].pos.x,
          [POS_Y_MAPPING[SVG_ELEMENT_TYPE.CIRCLE] as string]: stages[time].pos.y,
          [WIDTH_MAPPING[SVG_ELEMENT_TYPE.CIRCLE] as string]: stages[time].size.width / 2, // Divide to get radius
          ...stages[time].style,
        },
        transform: stages[time].transform,
      };
    });

    return {
      _id: id,
      tag: SVG_ELEMENT_TYPE.CIRCLE,
      stages: _mappedStages,
    };
  };
  const ellipse = (id: string) => (stages: { [time: string]: any }) => {
    const _mappedStages: any = {};

    Object.keys(stages).forEach((time: string) => {
      _mappedStages[time] = {
        attrs: {
          [POS_X_MAPPING[SVG_ELEMENT_TYPE.ELLIPSE] as string]: stages[time].pos.x,
          [POS_Y_MAPPING[SVG_ELEMENT_TYPE.ELLIPSE] as string]: stages[time].pos.y,
          [WIDTH_MAPPING[SVG_ELEMENT_TYPE.ELLIPSE] as string]: stages[time].size.width / 2, // Divide to get radius
          [HEIGHT_MAPPING[SVG_ELEMENT_TYPE.ELLIPSE] as string]: stages[time].size.height / 2, // Divide to get radius
          ...stages[time].style,
        },
        transform: stages[time].transform,
      };
    });

    return {
      _id: id,
      tag: SVG_ELEMENT_TYPE.ELLIPSE,
      stages: _mappedStages,
    };
  };
  const rect = (id: string) => (stages: { [time: string]: any }) => {
    const _mappedStages: any = {};

    Object.keys(stages).forEach((time: string) => {
      _mappedStages[time] = {
        attrs: {
          [POS_X_MAPPING[SVG_ELEMENT_TYPE.RECT] as string]: stages[time].pos.x,
          [POS_Y_MAPPING[SVG_ELEMENT_TYPE.RECT] as string]: stages[time].pos.y,
          [WIDTH_MAPPING[SVG_ELEMENT_TYPE.RECT] as string]: stages[time].size.width,
          [HEIGHT_MAPPING[SVG_ELEMENT_TYPE.RECT] as string]: stages[time].size.height,
          ...stages[time].style,
        },
        transform: stages[time].transform,
      };
    });

    return {
      _id: id,
      tag: SVG_ELEMENT_TYPE.RECT,
      stages: _mappedStages,
    };
  };
  const line = (id: string) => (stages: { [time: string]: any }) => {
    const _mappedStages: any = {};

    Object.keys(stages).forEach((time: string) => {
      _mappedStages[time] = {
        attrs: {
          x1: stages[time].pos[0].x,
          y1: stages[time].pos[0].y,
          x2: stages[time].pos[1].x,
          y2: stages[time].pos[1].y,
          ...stages[time].style,
        },
        transform: stages[time].transform,
      };
    });

    return {
      _id: id,
      tag: SVG_ELEMENT_TYPE.LINE,
      stages: _mappedStages,
    };
  };
  const path = (id: string) => (stages: { [time: string]: any }) => {
    const _mappedStages: any = {};

    Object.keys(stages).forEach((time: string) => {
      const commands = stages[time].commands.map((command: { type: string; path: number[] }) =>
        SVG_PATH_COMMAND_MAPPING[command.type](...command.path),
      );
      const path = commands.join(" ");
      const boundingBox = _getSVGPathBoundingBox(path);

      _mappedStages[time] = {
        attrs: {
          d: path,
          ...stages[time].style,
        },
        boundingBox,
        transform: stages[time].transform,
      };
    });

    return {
      _id: id,
      tag: SVG_ELEMENT_TYPE.PATH,
      stages: _mappedStages,
    };
  };
  const polygon = (id: string) => (stages: { [time: string]: any }) => {
    const _mappedStages: any = {};

    Object.keys(stages).forEach((time: string) => {
      const xPositions = stages[time].pos.map((point: any) => point[0]);
      const yPositions = stages[time].pos.map((point: any) => point[1]);

      _mappedStages[time] = {
        attrs: {
          points: stages[time].pos.map((point: number[]) => point.join(",")).join(" "),
          ...stages[time].style,
        },
        xMin: Math.min(...xPositions),
        yMin: Math.min(...yPositions),
        xMax: Math.max(...xPositions),
        yMax: Math.max(...yPositions),
        transform: stages[time].transform,
      };
    });

    return {
      _id: id,
      tag: SVG_ELEMENT_TYPE.POLYGON,
      stages: _mappedStages,
    };
  };
  const polyline = (id: string) => (stages: { [time: string]: any }) => {
    const _mappedStages: any = {};

    Object.keys(stages).forEach((time: string) => {
      const xPositions = stages[time].pos.map((point: any) => point[0]);
      const yPositions = stages[time].pos.map((point: any) => point[1]);

      _mappedStages[time] = {
        attrs: {
          points: stages[time].pos.map((point: number[]) => point.join(",")).join(" "),
          ...stages[time].style,
        },
        xMin: Math.min(...xPositions),
        yMin: Math.min(...yPositions),
        xMax: Math.max(...xPositions),
        yMax: Math.max(...yPositions),
        transform: stages[time].transform,
      };
    });

    return {
      _id: id,
      tag: SVG_ELEMENT_TYPE.POLYLINE,
      stages: _mappedStages,
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
