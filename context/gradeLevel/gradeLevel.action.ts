export enum GradeLevelActionType {
  ADD_GRADE_LEVEL = "ADD_GRADE_LEVEL",
  UPDATE_GRADE_LEVEL = "UPDATE_GRADE_LEVEL",
  DELETE_GRADE_LEVEL = "DELETE_GRADE_LEVEL",
  FETCH_GRADE_LEVELS = "FETCH_GRADE_LEVELS",
  FETCH_GRADE_LEVEL_BY_ID = "FETCH_GRADE_LEVEL_BY_ID",
  TOGGLE_LEVEL_FLIPPED = "TOGGLE_LEVEL_FLIPPED",
}

export interface GradeLevelAction {
  type: GradeLevelActionType;
  payload?: any;
}

export const addGradeLevel = (gradeLevel: any): GradeLevelAction => ({
  type: GradeLevelActionType.ADD_GRADE_LEVEL,
  payload: gradeLevel
})

export const updateGradeLevel = (gradeLevel: any): GradeLevelAction => ({
  type: GradeLevelActionType.UPDATE_GRADE_LEVEL,
  payload: gradeLevel
})

export const deleteGradeLevel = (id: string): GradeLevelAction => ({
  type: GradeLevelActionType.DELETE_GRADE_LEVEL,
  payload: id
})

export const fetchGradeLevels = (): GradeLevelAction => ({
  type: GradeLevelActionType.FETCH_GRADE_LEVELS
})
