export const circle = (attrs: any) => {
  const svgAttrs = {};

  attrs.pos &&
    Object.assign(svgAttrs, {
      x: attrs.pos.x,
      y: attrs.pos.y,
    });

  attrs.size &&
    Object.assign(svgAttrs, {
      r: attrs.size.width / 2, // Divide to get radius
    });

  attrs = Object.assign({}, attrs, { svg: svgAttrs });

  return attrs;
};
