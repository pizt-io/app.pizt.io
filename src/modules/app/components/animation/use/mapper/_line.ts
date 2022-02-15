export const line = (attrs: any) => {
  const svgAttrs = {};

  attrs.pos &&
    Object.assign(svgAttrs, {
      x1: attrs.pos[0][0],
      y1: attrs.pos[0][1],
      x2: attrs.pos[1][0],
      y2: attrs.pos[1][1],
    });

  attrs = Object.assign({}, attrs, { svg: svgAttrs });

  return attrs;
};
