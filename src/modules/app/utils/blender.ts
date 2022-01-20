const _generateHex = (r: number, g: number, b: number): string => {
  let R = r.toString(16);
  let G = g.toString(16);
  let B = b.toString(16);

  while (R.length < 2) {
    R = `0${R}`;
  }
  while (G.length < 2) {
    G = `0${G}`;
  }
  while (B.length < 2) {
    B = `0${B}`;
  }

  return `#${R}${G}${B}`;
};

const _mix = (start: number, end: number, percent: number): number =>
  start + (percent / 100) * (end - start);

export const blender = (color1: string, color2: string, percent: number): string => {
  const red1 = parseInt(`${color1[1]}${color1[2]}`, 16);
  const green1 = parseInt(`${color1[3]}${color1[4]}`, 16);
  const blue1 = parseInt(`${color1[5]}${color1[6]}`, 16);

  const red2 = parseInt(`${color2[1]}${color2[2]}`, 16);
  const green2 = parseInt(`${color2[3]}${color2[4]}`, 16);
  const blue2 = parseInt(`${color2[5]}${color2[6]}`, 16);

  const red = Math.round(_mix(red1, red2, percent));
  const green = Math.round(_mix(green1, green2, percent));
  const blue = Math.round(_mix(blue1, blue2, percent));

  return _generateHex(red, green, blue);
};
