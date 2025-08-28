export enum StaffActionType {
  FETCH_STAFF_BY_ID = "FETCH_STAFF_BY_ID",
  CREATE_STAFF = "CREATE_STAFF",
  UPDATE_STAFF = "UPDATE_STAFF",
  DELETE_STAFF = "DELETE_STAFF",
  TOGGLE_FLIPPED = "TOGGLE_FLIPPED",
  SET_COUNTRIES = "SET_COUNTRIES",
  SET_STATES = "SET_STATES",
}

export interface StaffAction {
  type: StaffActionType;
  payload?: any;
}

export const fetchStaffById = (id: string): StaffAction => ({
  type: StaffActionType.FETCH_STAFF_BY_ID,
  payload: id
})

export const createStaff = (staff: any): StaffAction => ({
  type: StaffActionType.CREATE_STAFF,
  payload: staff
})

export const updateStaff = (staff: any): StaffAction => ({
  type: StaffActionType.UPDATE_STAFF,
  payload: staff
})

export const deleteStaff = (id: string): StaffAction => ({
  type: StaffActionType.DELETE_STAFF,
  payload: id
})

export const toggleFlipped = (): StaffAction => ({
  type: StaffActionType.TOGGLE_FLIPPED
});