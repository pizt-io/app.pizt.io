export const polygon = (attrs: any) => {
  const xPositions = attrs.pos.map((point: any) => point[0]);
  const yPositions = attrs.pos.map((point: any) => point[1]);

  const svgAttrs = {};

  attrs.pos &&
    Object.assign(svgAttrs, {
      points: attrs.pos.map((point: number[]) => point.join(",")).join(" "),
      xMin: Math.min(...xPositions),
      yMin: Math.min(...yPositions),
      xMax: Math.max(...xPositions),
      yMax: Math.max(...yPositions),
    });

  attrs = Object.assign({}, attrs, { svg: svgAttrs });

  return attrs;
};
