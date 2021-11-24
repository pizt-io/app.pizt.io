import {
  CanvasCircleElement,
  CanvasElementList,
  CanvasLineElement,
  CanvasRectangleElement,
  Point,
  RectangleSize,
} from "@/types/canvas";
import { ref } from "vue";

import _cloneDeep from "lodash/cloneDeep";

export const useCanvas = (
  canvas: HTMLCanvasElement,
  options: any = {
    fillColor: "red",
    lineWidth: 1,
    lineColor: "darkgray",
    dotSize: 5,
    dotColor: "red",
  }
) => {
  const { lineWidth, lineColor, dotSize, dotColor, fillColor } = options;

  const elements = ref<CanvasElementList>([]);

  const canvasWidth = canvas.clientWidth;
  const canvasHeight = canvas.clientHeight;
  const canvasOffsetX = canvas.offsetLeft;
  const canvasOffsetY = canvas.offsetTop;

  const lastMouseX = ref(0);
  const lastMouseY = ref(0);

  const context = canvas.getContext("2d");

  const _useCanvasCtx = (callback: Function) => {
    if (context) {
      callback(context);
    } else {
      throw new Error(
        "Cannot get canvas context, make sure useCanvas() is called when the DOM is mounted!"
      );
    }
  };

  const clearCanvas = () => {
    _useCanvasCtx((ctx: CanvasRenderingContext2D) => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    });
  };

  const refreshCanvas = () => {
    const _els = _cloneDeep(elements.value);
    elements.value = [];

    clearCanvas();

    _els.forEach((element) => {
      switch (element.type) {
        case "circle":
          drawCircle(element.position, element.radius);
          break;
        case "rectangle":
          drawRectangle(element.position, element.size);
          break;
        case "line":
          drawLine(element.positions);
          break;
        default:
          break;
      }
    });
  };

  const drawLine = (
    points: [Point, Point],
    createNew: boolean = false
  ): CanvasLineElement => {
    const line: CanvasLineElement = {
      type: "line",
      positions: points,
      width: lineWidth,
    };

    _useCanvasCtx((ctx: CanvasRenderingContext2D) => {
      ctx.beginPath();
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = lineColor;
      ctx.moveTo(points[0].x, points[0].y);
      ctx.lineTo(points[1].x, points[1].y);
      ctx.stroke();
      ctx.closePath();

      if (createNew) {
        elements.value.push(line);
      }
    });

    return line;
  };

  const drawCircle = (
    point: Point,
    size: number,
    createNew: boolean = false
  ): CanvasCircleElement => {
    const circle: CanvasCircleElement = {
      type: "circle",
      position: point,
      radius: size,
    };

    _useCanvasCtx((ctx: CanvasRenderingContext2D) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, size || dotSize, 0, 2 * Math.PI);

      ctx.strokeStyle = dotColor;
      ctx.stroke();

      ctx.fillStyle = dotColor;
      ctx.fill();
      ctx.closePath();

      if (createNew) {
        elements.value.push(circle);
      }
    });

    return circle;
  };

  const drawRectangle = (
    point: Point,
    size: RectangleSize,
    createNew: boolean = false
  ): CanvasRectangleElement => {
    const rectangle: CanvasRectangleElement = {
      type: "rectangle",
      position: point,
      size,
    };

    _useCanvasCtx((ctx: CanvasRenderingContext2D) => {
      ctx.save();

      ctx.beginPath();
      ctx.rect(point.x, point.y, size.width, size.height);
      ctx.fillStyle = fillColor;
      ctx.fill();

      ctx.restore();

      if (createNew) {
        elements.value.push(rectangle);
      }
    });

    return rectangle;
  };

  const drawElement = (
    element: CanvasLineElement | CanvasCircleElement | CanvasRectangleElement
  ) => {
    switch (element.type) {
      case "circle":
        drawCircle(element.position, element.radius);
        break;
      case "rectangle":
        drawRectangle(element.position, element.size);
        break;
      case "line":
        drawLine(element.positions);
        break;
      default:
        break;
    }
  };

  const isMouseDown = ref(false);

  const onMouseDown = (e: MouseEvent) => {
    isMouseDown.value = true;
  };

  const onMouseMove = (e: MouseEvent) => {
    if (isMouseDown.value) {
      _useCanvasCtx((ctx: CanvasRenderingContext2D) => {
        clearCanvas();

        const mouseX = e.clientX - canvasOffsetX;
        const mouseY = e.clientY - canvasOffsetY;

        elements.value.forEach((element) => {
          drawElement(element);
          if (ctx.isPointInPath(lastMouseX.value, lastMouseY.value)) {
            switch (element.type) {
              case "line":
                element.positions.forEach((pos) => {
                  pos.x += mouseX - lastMouseX.value;
                  pos.y += mouseY - lastMouseY.value;
                });
                break;

              default:
                element.position.x += mouseX - lastMouseX.value;
                element.position.y += mouseY - lastMouseY.value;
                break;
            }
          }
        });

        lastMouseX.value = mouseX;
        lastMouseY.value = mouseY;
      });
    }
  };

  const onMouseUp = (e: MouseEvent) => {
    isMouseDown.value = false;
  };

  return {
    elements,
    ctx: context,
    canvasWidth,
    canvasHeight,
    clearCanvas,
    refreshCanvas,
    drawLine,
    drawCircle,
    drawRectangle,
    onMouseDown,
    onMouseMove,
    onMouseUp,
  };
};
