export enum SnackBarActionType {
  OPEN = "OPEN",
  CLOSE = "CLOSE"
}

export interface SnackBarAction {
  type: SnackBarActionType,
  payload?: any
}