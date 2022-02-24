/* eslint-disable */

type Transition = {
  label: string;
  thumbnail: string;
  animationName: string;
  animationKeyframes: {
    [keyframe: string]: {
      [property: string]: number | string;
    };
  };
  animationDelay: number;
  animationDirection: string;
  animationDuration: string;
  animationFillMode: string;
  animationHasDelay: number;
  animationIsInfinite: number;
  animationIterationCount: number;
  animationPlayState: string;
  animationTimingFunction: string;
};

export const transitions = [
  {
    label: "Fade",
    thumbnail: "/img/svg/transition-fade.svg",
    animationName: "Fade",
    animationKeyframes: {
      "0%": {
        opacity: 0,
      },
      "100%": {
        opacity: 1,
      },
    },
    animationDelay: 0,
    animationDirection: "alternate",
    animationDuration: "1.5s",
    animationFillMode: "forwards",
    animationHasDelay: 0,
    animationIsInfinite: 0,
    animationIterationCount: 1,
    animationPlayState: "",
    animationTimingFunction: "cubic-bezier(0.42,0.69,0.69,0.42)",
  },
  {
    label: "Slide",
    thumbnail: "/img/svg/transition-slide.svg",
    animationName: "Slide",
    animationKeyframes: {
      "0%": {
        transform: [{ translate3d: "-100%, 0, 0" }],
      },
      "100%": {
        transform: [{ translate3d: "0, 0, 0" }],
      },
    },
    animationDelay: 0,
    animationDirection: "alternate",
    animationDuration: "1.5s",
    animationFillMode: "forwards",
    animationHasDelay: 0,
    animationIsInfinite: 0,
    animationIterationCount: 1,
    animationPlayState: "",
    animationTimingFunction: "cubic-bezier(0.42,0.69,0.69,0.42)",
  },
  {
    label: "Fade slide",
    thumbnail: "/img/svg/transition-fade-slide.svg",
    animationName: "FadeSlide",
    animationKeyframes: {
      "0%": {
        transform: [{ translate3d: "-100%, 0, 0" }],
        opacity: 0,
      },
      "100%": {
        transform: [{ translate3d: "0, 0, 0" }],
        opacity: 1,
      },
    },
    animationDelay: 0,
    animationDirection: "alternate",
    animationDuration: "1.5s",
    animationFillMode: "forwards",
    animationHasDelay: 0,
    animationIsInfinite: 0,
    animationIterationCount: 1,
    animationPlayState: "",
    animationTimingFunction: "cubic-bezier(0.42,0.69,0.69,0.42)",
  },
  {
    label: "Bounce",
    thumbnail: "/img/svg/transition-bounce.svg",
    animationName: "Bounce",
    animationKeyframes: {
      "0%": {
        "animation-timing-function": [{ "cubic-bezier": "0.215, 0.61, 0.355, 1" }],
        "transform": [{ translate3d: "0, 0, 0" }],
      },
      "20%": {
        "animation-timing-function": [{ "cubic-bezier": "0.215, 0.61, 0.355, 1" }],
        "transform": [{ translate3d: "0, 0, 0" }],
      },
      "40%": {
        "animation-timing-function": [{ "cubic-bezier": "0.755, 0.05, 0.855, 0.06" }],
        "transform": [{ translate3d: "0, -60px, 0" }, { scaleY: "1.1" }],
      },
      "43%": {
        "animation-timing-function": [{ "cubic-bezier": "0.755, 0.05, 0.855, 0.06" }],
        "transform": [{ translate3d: "0, -60px, 0" }, { scaleY: "1.1" }],
      },
      "53%": {
        "animation-timing-function": [{ "cubic-bezier": "0.215, 0.61, 0.355, 1" }],
        "transform": [{ translate3d: "0, 0, 0" }],
      },
      "70%": {
        "animation-timing-function": [{ "cubic-bezier": "0.755, 0.05, 0.855, 0.06" }],
        "transform": [{ translate3d: "0, -30px, 0" }, { scaleY: "1.05" }],
      },
      "80%": {
        "transition-timing-function": [{ "cubic-bezier": "0.215, 0.61, 0.355, 1" }],
        "transform": [{ translate3d: "0, 0, 0" }, { scaleY: "0.95" }],
      },
      "90%": {
        transform: [{ translate3d: "0, -8px, 0" }, { scaleY: "1.02" }],
      },
      "100%": {
        "animation-timing-function": [{ "cubic-bezier": "0.215, 0.61, 0.355, 1" }],
        "transform": [{ translate3d: "0, 0, 0" }],
      },
    },
    animationDelay: 0,
    animationDirection: "alternate",
    animationDuration: "1.5s",
    animationFillMode: "forwards",
    animationHasDelay: 0,
    animationIsInfinite: 0,
    animationIterationCount: 1,
    animationPlayState: "",
    animationTimingFunction: "cubic-bezier(0.42,0.69,0.69,0.42)",
    animationStyles: {
      "transform-origin": "center bottom",
    },
  },
  {
    label: "Flip",
    thumbnail: "/img/svg/transition-flip.svg",
    animationName: "Flip",
    animationKeyframes: {
      "0%": {
        "transform": [{ perspective: "400px" }, { rotate3d: "0, 1, 0, 90deg" }],
        "animation-timing-function": "ease-in",
        "opacity": 0,
      },
      "40%": {
        "transform": [{ perspective: "400px" }, { rotate3d: "0, 1, 0, -20deg" }],
        "animation-timing-function": "ease-in",
      },
      "60%": {
        transform: [{ perspective: "400px" }, { rotate3d: "0, 1, 0, 10deg" }],
        opacity: 1,
      },
      "80%": {
        transform: [{ perspective: "400px" }, { rotate3d: "0, 1, 0, -5deg" }],
      },
      "100%": {
        transform: [{ perspective: "400px" }],
      },
    },
    animationDelay: 0,
    animationDirection: "alternate",
    animationDuration: "1.5s",
    animationFillMode: "forwards",
    animationHasDelay: 0,
    animationIsInfinite: 0,
    animationIterationCount: 1,
    animationPlayState: "",
    animationTimingFunction: "cubic-bezier(0.42,0.69,0.69,0.42)",
    animationStyles: {
      "backface-visibility": "visible",
    },
  },
  {
    label: "Dash",
    thumbnail: "/img/svg/transition-dash.svg",
    animationName: "Dash",
    animationKeyframes: {
      "0%": {
        transform: [{ translate3d: "-150%, 0, 0" }, { skew: "30deg, 0" }],
        opacity: 0,
      },
      "60%": {
        transform: [{ skew: "-20deg, 0" }],
        opacity: 1,
      },
      "80%": {
        transform: [{ skew: "5deg, 0" }],
      },
      "100%": {
        transform: [{ translate3d: "0, 0, 0" }],
      },
    },
    animationDelay: 0,
    animationDirection: "alternate",
    animationDuration: "1.5s",
    animationFillMode: "forwards",
    animationHasDelay: 0,
    animationIsInfinite: 0,
    animationIterationCount: 1,
    animationPlayState: "",
    animationTimingFunction: "cubic-bezier(0.42,0.69,0.69,0.42)",
  },
  {
    label: "Rotate",
    thumbnail: "/img/svg/transition-rotate.svg",
    animationName: "Rotate",
    animationKeyframes: {
      "0%": {
        transform: [{ scale: 0 }, { rotate3d: "0, 0, 1, 0deg" }],
        opacity: 0,
      },
      "100%": {
        transform: [{ scale: 1 }, { rotate3d: "0, 0, 1, 360deg" }],
        opacity: 1,
      },
    },
    animationDelay: 0,
    animationDirection: "alternate",
    animationDuration: "1.5s",
    animationFillMode: "forwards",
    animationHasDelay: 0,
    animationIsInfinite: 0,
    animationIterationCount: 1,
    animationPlayState: "",
    animationTimingFunction: "cubic-bezier(0.42,0.69,0.69,0.42)",
  },
];
