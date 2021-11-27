// MoveTo: M, m
// LineTo: L, l, H, h, V, v
// Cubic Bézier Curve: C, c, S, s
// Quadratic Bézier Curve: Q, q, T, t
// Elliptical Arc Curve: A, a
// ClosePath: Z, z

// Heart shape
path(
  [
    M(10, 30),
    A([20, 20], [0, 0, 1], [50, 30]),
    A([20, 20], [0, 0, 1], [90, 30]),
    Q([90, 60], [50, 90]),
    Q([10, 60], [10, 30], "z"),
  ],
  { translateX: 0, translateY: 0 },
  { stroke: "#f04337" }
);

polygon(
  [
    [0, 100],
    [50, 25],
    [50, 75],
    [100, 0],
  ],
  { translateX: 0, translateY: 0 },
  { stroke: "#f04337" }
);

polyline(
  [
    [0, 100],
    [50, 25],
    [50, 75],
    [100, 0],
  ],
  { translateX: 0, translateY: 0 },
  { stroke: "#f04337" }
);

image(
  "https://developer.mozilla.org/mdn_logo_only_color.png",
  { x: 0, y: 0 },
  { width: 100, height: 100 },
  true /* preserveAspectRatio */
);
