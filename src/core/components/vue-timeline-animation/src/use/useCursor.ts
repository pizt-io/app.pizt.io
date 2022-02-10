enum CURSOR_TYPE {
  NORMAL = "normal",
  WAIT = "wait",
  POINTER = "pointer",
  MOVE = "move",
  TEXT = "text",
  CROSSHAIR = "crosshair",
  HAND = "hand",
  HELP = "help",
  E_RESIZE = "e-resize",
  NE_RESIZE = "ne-resize",
  NW_RESIZE = "nw-resize",
  N_RESIZE = "n-resize",
  SE_RESIZE = "se-resize",
  SW_RESIZE = "sw-resize",
  S_RESIZE = "s-resize",
  W_RESIZE = "w-resize",
  EW_RESIZE = "ew-resize",
  NS_RESIZE = "ns-resize",
  NESW_RESIZE = "nesw-resize",
  NWSE_RESIZE = "nwse-resize",
  COL_RESIZE = "col-resize",
  ROW_RESIZE = "row-resize",
  ALL_SCROLL = "all-scroll",
  ZOOM_IN = "zoom-in",
  ZOOM_OUT = "zoom-out",
  NOT_ALLOWED = "not-allowed",
  VERTICAL_TEXT = "vertical-text",
  ALIAS = "alias",
  COPY = "copy",
  NONE = "none",
  CONTEXT_MENU = "context-menu",
  GRAB = "grab",
  GRABBING = "grabbing",
  INHERIT = "inherit",
  NO_DROP = "no-drop",
  PROGRESS = "progress",
}

export const useCursor = () => {
  const changeCursor = (cursor: CURSOR_TYPE) => {
    if (document) {
      document.body.style.cursor = cursor;
    }
  };

  return {
    CURSOR_TYPE,
    changeCursor,
  };
};
