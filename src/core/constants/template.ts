export const defaultTransition = {
  label: "New",
  thumbnail: "/img/svg/transition-fade.svg",
  animationName: "New",
  animationKeyframes: {},
  animationDelay: 0,
  animationDirection: "alternate",
  animationDuration: "1s",
  animationFillMode: "forwards",
  animationHasDelay: 0,
  animationIsInfinite: 0,
  animationIterationCount: 1,
  animationPlayState: "",
  animationTimingFunction: "cubic-bezier(0.42,0.69,0.69,0.42)",
};

export const defaultProject = {
  name: "New animation project",
};

export const defaultAnimation = {
  name: "New Element",
  attrs: {
    pos: { x: 0, y: 0 },
    size: { width: 100, height: 100 },
    transform: {
      translate: { translateX: 0, translateY: 0 },
      scale: { scaleX: 1, scaleY: 1 },
      rotate: 0,
      skew: { skewX: 0, skewY: 0 },
      transformOrigin: "center center",
    },
    style: {
      fill: "#000",
      stroke: "#000",
      strokeWidth: 1,
      opacity: 1,
      strokeDasharray: 0,
      strokeDashoffset: 0,
    },
  },
  animations: {},
};
