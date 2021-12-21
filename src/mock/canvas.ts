import { SVG_ELEMENT_TYPE, SVG_PATH_CMD } from "@/core/constants/svg";

export const canvas = [
  {
    _id: "15e9f9c8f9c8f9c8f9c8f9c8f",
    type: SVG_ELEMENT_TYPE.ELLIPSE,
    keyframes: ["168rf9c8f9c88478f9c88038f", "268rf9c8f9c88478f9c88038f"],
    stages: {
      "168rf9c8f9c88478f9c88038f": {
        pos: { x: 150, y: 100 },
        size: { width: 100, height: 50 },
        transform: { translateX: 0, translateY: 0 },
        style: { fill: "#f04337" },
      },
      "268rf9c8f9c88478f9c88038f": {
        pos: { x: 150, y: 100 },
        size: { width: 100, height: 50 },
        transform: { translateX: 100, translateY: 200 },
        style: { fill: "#f04337" },
      },
    },
  },
  {
    _id: "25e9f9c8f9c8f9c8f9c8f9c8f",
    type: SVG_ELEMENT_TYPE.RECT,
    keyframes: ["168rf9c8f9c88478f9c88038f"],
    stages: {
      "168rf9c8f9c88478f9c88038f": {
        pos: { x: 250, y: 300 },
        size: { width: 100, height: 50 },
        transform: { translateX: 0, translateY: 0 },
        style: { fill: "#f04337" },
      },
    },
  },
  {
    _id: "35e9f9c8f9c8f9c8f9c8f9c8f",
    type: SVG_ELEMENT_TYPE.ELLIPSE,
    keyframes: ["168rf9c8f9c88478f9c88038f"],
    stages: {
      "168rf9c8f9c88478f9c88038f": {
        pos: { x: 200, y: 250 },
        size: { width: 100, height: 50 },
        transform: { translateX: 0, translateY: 0 },
        style: { fill: "#f04337" },
      },
    },
  },
  {
    _id: "45e9f9c8f9c8f9c8f9c8f9c8f",
    type: SVG_ELEMENT_TYPE.LINE,
    keyframes: ["168rf9c8f9c88478f9c88038f"],
    stages: {
      "168rf9c8f9c88478f9c88038f": {
        pos: [
          { x: 300, y: 50 },
          { x: 450, y: 150 },
        ],
        transform: { translateX: 0, translateY: 0 },
        style: { stroke: "#f04337" },
      },
    },
  },
  {
    _id: "55e9f9c8f9c8f9c8f9c8f9c8f",
    type: SVG_ELEMENT_TYPE.LINE,
    keyframes: ["168rf9c8f9c88478f9c88038f"],
    stages: {
      "168rf9c8f9c88478f9c88038f": {
        pos: [
          { x: 600, y: 50 },
          { x: 550, y: 150 },
        ],
        transform: { translateX: 0, translateY: 0 },
        style: { stroke: "#f04337" },
      },
    },
  },
  {
    _id: "65e9f9c8f9c8f9c8f9c8f9c8f",
    type: SVG_ELEMENT_TYPE.PATH,
    keyframes: ["168rf9c8f9c88478f9c88038f"],
    stages: {
      "168rf9c8f9c88478f9c88038f": {
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
    },
  },
  {
    _id: "75e9f9c8f9c8f9c8f9c8f9c8f",
    type: SVG_ELEMENT_TYPE.POLYGON,
    keyframes: ["168rf9c8f9c88478f9c88038f"],
    stages: {
      "168rf9c8f9c88478f9c88038f": {
        pos: [
          [0, 100],
          [50, 25],
          [50, 75],
          [100, 0],
        ],
        transform: { translateX: 450, translateY: 300 },
        style: { fill: "#f04337" },
      },
    },
  },
  {
    _id: "85e9f9c8f9c8f9c8f9c8f9c8f",
    type: SVG_ELEMENT_TYPE.POLYLINE,
    keyframes: ["168rf9c8f9c88478f9c88038f"],
    stages: {
      "168rf9c8f9c88478f9c88038f": {
        pos: [
          [0, 100],
          [50, 25],
          [50, 75],
          [100, 0],
        ],
        transform: { translateX: 600, translateY: 300 },
        style: { fill: "none", stroke: "#f04337" },
      },
    },
  },
];
