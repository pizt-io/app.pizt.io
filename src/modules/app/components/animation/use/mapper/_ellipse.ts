export const ellipse = (attrs: any) => {
  const svgAttrs = {};

  attrs.pos &&
    Object.assign(svgAttrs, {
      cx: attrs.pos.x,
      cy: attrs.pos.y,
    });

  attrs.size &&
    Object.assign(svgAttrs, {
      rx: attrs.size.width / 2, // Divide to get radius
      ry: attrs.size.height / 2, // Divide to get radius
    });

  attrs = Object.assign({}, attrs, { svg: svgAttrs });

  return attrs;
};
