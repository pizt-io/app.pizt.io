export enum STAGE_PROPERTY {
  POSITION = "position",
  SIZE = "size",
  TRANSFORM = "transform",
  FILL = "fill",
  OPACITY = "opacity",
}

export type LayerItemStage = {
  time: number;
  label: string;
  property: STAGE_PROPERTY;
  value: any;
};

export const STAGE_PROPERTY_MAPPING = Object.freeze({
  [STAGE_PROPERTY.POSITION]: "pos",
  [STAGE_PROPERTY.SIZE]: "size",
  [STAGE_PROPERTY.TRANSFORM]: "transform",
  [STAGE_PROPERTY.FILL]: "style.fill",
  [STAGE_PROPERTY.OPACITY]: "style.opacity",
});

export const STAGE_PROPERTY_LABEL = Object.freeze({
  [STAGE_PROPERTY.POSITION]: "Position",
  [STAGE_PROPERTY.SIZE]: "Size",
  [STAGE_PROPERTY.TRANSFORM]: "Transform",
  [STAGE_PROPERTY.FILL]: "Fill",
  [STAGE_PROPERTY.OPACITY]: "Opacity",
});

export const STAGE_PROPERTY_PREFIX = Object.freeze({
  [STAGE_PROPERTY.POSITION]: "st_pos_",
  [STAGE_PROPERTY.SIZE]: "st_size_",
  [STAGE_PROPERTY.TRANSFORM]: "st_tr_",
  [STAGE_PROPERTY.FILL]: "st_fill_",
  [STAGE_PROPERTY.OPACITY]: "st_op_",
});
