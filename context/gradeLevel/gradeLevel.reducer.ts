import { localStorageClient } from "@/shared/lib/client";
import { GradeLevelAction, GradeLevelActionType } from "./gradeLevel.action";
import { GradeLevel } from "@/model/GradeLevel";
import { FlippedSideState } from "../staff/staff.reducer";

export interface GradeLevelState {
  gradeLevels: GradeLevel[];
  currentGradeLevel: GradeLevel | null;
  levelFlipped: boolean;
  flippedSideState: FlippedSideState;
}

export const initialGradeLevelState: GradeLevelState = {
  gradeLevels: [],
  currentGradeLevel: null,
  levelFlipped: false,
  flippedSideState: "create",
};

export const gradeLevelReducer = (state: any, action: GradeLevelAction) => {
  switch (action.type) {
    case GradeLevelActionType.ADD_GRADE_LEVEL:
      localStorageClient.saveGradeLevel(action.payload);
      return {
        ...state,
        gradeLevels: localStorageClient.getAllGradeLevels(),
      };
    case GradeLevelActionType.UPDATE_GRADE_LEVEL:
      localStorageClient.saveGradeLevel(action.payload);
      return {
        ...state,
        gradeLevels: localStorageClient.getAllGradeLevels()
      }
    case GradeLevelActionType.DELETE_GRADE_LEVEL:
      localStorageClient.deleteGradeLevel(action.payload);
      return {
        ...state,
        gradeLevels: localStorageClient.getAllGradeLevels()
      }
    case GradeLevelActionType.FETCH_GRADE_LEVELS:
      return {
        ...state,
        gradeLevels: localStorageClient.getAllGradeLevels()
      }
    case GradeLevelActionType.FETCH_GRADE_LEVEL_BY_ID:
      return {
        ...state,
        currentGradeLevel: localStorageClient.getGradeLevelById(action.payload)
      }
    case GradeLevelActionType.TOGGLE_LEVEL_FLIPPED:
      return {
        ...state,
        levelFlipped: !state.levelFlipped
      }
    case GradeLevelActionType.SET_FLIPPED_SIDE_STATE:
      return {
        ...state,
        flippedSideState: action.payload
      }
    default:
      return state;
  }
}