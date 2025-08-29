import { SnackBarAction, SnackBarActionType } from "./snackbar.action";

export type SnackBarSeverity = "success" | "error" | "warning";

export interface SnackBarState {
  open: boolean;
  severity: SnackBarSeverity;
  message: string;
}

export const initialSnackBarState: SnackBarState = {
  open: false,
  severity: "success",
  message: ""
}

export const snackBarReducer = (state: any, action: SnackBarAction) => {
  switch (action.type) {
    case SnackBarActionType.OPEN:
      return { ...state, open: true, severity: action.payload.severity, message: action.payload.message }
    case SnackBarActionType.CLOSE:
      return { ...state, open: false }
    default:
      return state;
  }
}