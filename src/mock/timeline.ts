import { SVG_ELEMENT_TYPE, SVG_PATH_CMD } from "@/core/constants/svg";

export const timelineElements = [
  {
    _id: "id-el-1",
    type: SVG_ELEMENT_TYPE.ELLIPSE,
    name: "Ellipse 1",
    expanded: true,
    attrs: {
      pos: { x: 150, y: 100 },
      size: { width: 100, height: 50 },
      transform: {
        translate: { translateX: 0, translateY: 0 },
        scale: { scaleX: 1, scaleY: 1 },
        rotate: 0,
        skew: { skewX: 0, skewY: 0 },
      },
      style: {
        fill: "#f04337",
        stroke: "#5ad3db",
        strokeWidth: 1,
        opacity: 1,
        strokeDasharray: "none",
        strokeDashoffset: 0,
        transformOrigin: "50% 50%",
      },
    },
    animations: {
      "transform.translate": [
        { time: 0, transform: { translate: { translateX: 0, translateY: 0 } } },
        { time: 4000, transform: { translate: { translateX: 100, translateY: 200 } } },
        { time: 1000, transform: { translate: { translateX: 350, translateY: 200 } } },
      ],
      "transform.rotate": [
        { time: 0, transform: { rotate: 45 } },
        { time: 4000, transform: { rotate: 90 } },
      ],
      "style.fill": [
        { time: 0, style: { fill: "#f04337" } },
        { time: 2000, style: { fill: "#fcba03" } },
        { time: 3000, style: { fill: "#5449cc" } },
      ],
      "size": [
        { time: 0, size: { width: 100, height: 50 } },
        { time: 2000, size: { width: 200, height: 200 } },
      ],
    },
  },
  {
    _id: "id-el-4",
    type: SVG_ELEMENT_TYPE.LINE,
    name: "Line 1",
    expanded: true,
    attrs: {
      pos: [
        [600, 50],
        [550, 150],
      ],
      transform: { translateX: 0, translateY: 0 },
      style: { stroke: "#f04337" },
    },
    animations: {
      "transform.translate": [
        { time: 0, transform: { translate: { translateX: 0, translateY: 250 } } },
        { time: 4000, transform: { translate: { translateX: 350, translateY: 500 } } },
      ],
      "pos.0": [
        { time: 0, pos: { 0: [300, 50] } },
        { time: 1000, pos: { 0: [400, 150] } },
      ],
      "pos.1": [
        { time: 0, pos: { 1: [450, 150] } },
        { time: 1000, pos: { 1: [550, 250] } },
      ],
    },
  },
  {
    _id: "id-el-6",
    type: SVG_ELEMENT_TYPE.PATH,
    name: "Path 1",
    expanded: true,
    attrs: {
      commands: [
        {
          type: SVG_PATH_CMD.MOVE_TO,
          path: [17.4408, 50.9262],
        },
        {
          type: SVG_PATH_CMD.CUBIC_BEZIER,
          path: [58.1858, 96.2781, 15.5423, 31.5313, 52.4902, 5.57424],
        },
        {
          type: SVG_PATH_CMD.CUBIC_BEZIER,
          path: [80.5298, -7.72511, 93.1865, 11.1156, 96.0099, 22.1984],
        },
        {
          type: SVG_PATH_CMD.CUBIC_BEZIER,
          path: [87.6857, 35.1283, 77.4922, 60.8132, 103.312, 60.1132],
        },
        {
          type: SVG_PATH_CMD.CUBIC_BEZIER,
          path: [135.587, 59.2383, 116.309, 99.7779, 103.312, 146.88],
        },
        {
          type: SVG_PATH_CMD.CUBIC_BEZIER,
          path: [92.9139, 184.561, 46.0158, 137.984, 23.8666, 109.986],
        },
        {
          type: SVG_PATH_CMD.CUBIC_BEZIER,
          path: [8.143, 75.1819, -15.1551, 14.6446, 17.4408, 50.9262],
        },
        {
          type: SVG_PATH_CMD.CLOSE_PATH,
          path: [],
        },
      ],
      transform: { translateX: 0, translateY: 400 },
      style: { fill: "#f04337" },
    },
    animations: {
      "style.fill": [
        { time: 0, style: { fill: "#f04337" } },
        { time: 2000, style: { fill: "#fcba03" } },
        { time: 3000, style: { fill: "#5449cc" } },
      ],
    },
  },
];
