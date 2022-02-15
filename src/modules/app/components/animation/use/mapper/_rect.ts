export const rect = (attrs: any) => {
  const svgAttrs = {};

  attrs.pos &&
    Object.assign(svgAttrs, {
      x: attrs.pos.x,
      y: attrs.pos.y,
    });

  attrs.size &&
    Object.assign(svgAttrs, {
      width: attrs.size.width,
      height: attrs.size.height,
    });

  attrs = Object.assign({}, attrs, { svg: svgAttrs });

  return attrs;
};
