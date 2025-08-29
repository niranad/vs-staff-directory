import { Staff } from "@/model/Staff";
import { StaffAction, StaffActionType } from "./staff.action";
import { localStorageClient } from "@/shared/lib/client";
import { CountryState } from "@/model/CountryState";

export type FlippedSideState = "create" | "view" | "edit";

export interface StaffState {
  staff: Staff[];
  countries: string[];
  states: CountryState[];
  flipped: boolean;
  currentStaff: Staff | null;
  flippedSideState: FlippedSideState;
}

export const initialStaffState: StaffState = {
  staff: [],
  countries: [],
  states: [],
  flipped: false,
  currentStaff: null,
  flippedSideState: "create",
}

export const staffReducer = (state: any, action: StaffAction) => {
  switch (action.type) {
    case StaffActionType.FETCH_ALL_STAFF:
      return {
        ...state,
        staff: localStorageClient.getAllStaff(),
      }
    case StaffActionType.FETCH_STAFF_BY_ID:
      return {
        ...state,
        staff: localStorageClient.getAllStaff(),
        currentStaff: localStorageClient.getStaffById(action.payload)
      };
    case StaffActionType.CREATE_STAFF:
      localStorageClient.saveStaff(action.payload);
      return {
        ...state,
        staff: localStorageClient.getAllStaff(),
      };
    case StaffActionType.UPDATE_STAFF:
      localStorageClient.saveStaff(action.payload);
      return {
        ...state,
        staff: localStorageClient.getAllStaff(),
      };
    case StaffActionType.DELETE_STAFF:
      localStorageClient.deleteStaff(action.payload);
      return {
        ...state,
        staff: localStorageClient.getAllStaff(),
      };
    case StaffActionType.TOGGLE_FLIPPED:
      return {
        ...state, 
        flipped: !state.flipped
      };
    case StaffActionType.SET_COUNTRIES:
      return {
        ...state,
        countries: action.payload
      }
    case StaffActionType.SET_STATES:
      return {
        ...state,
        states: action.payload
      }
    case StaffActionType.SET_FLIPPED_SIDE_STATE:
      return {
        ...state,
        flippedSideState: action.payload
      }
    default:
      return state;
  } 
}
