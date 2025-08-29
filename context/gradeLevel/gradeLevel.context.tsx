import { GradeLevel } from "@/model/GradeLevel";
import { createContext, useContext, useEffect, useReducer } from "react";
import { gradeLevelReducer, initialGradeLevelState } from "./gradeLevel.reducer";
import { GradeLevelActionType } from "./gradeLevel.action";
import { FlippedSideState } from "../staff/staff.reducer";

export interface GradeLevelContextType {
  gradeLevels: GradeLevel[];
  levelFlipped: boolean;
  flippedSideState: FlippedSideState;
  fetchGradeLevels: () => void;
  fetchGradeLevelById: (id: string) => void;
  createGradeLevel: (gradeLevel: GradeLevel) => void;
  updateGradeLevel: (gradeLevel: GradeLevel) => void;
  deleteGradeLevel: (id: string) => void;
  toggleLevelFlipped: () => void;
  setFlippedSideState: (state: string) => void;
}

export const GradeLevelContext = createContext<GradeLevelContextType | null>(null);
export const GradeLevelProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(gradeLevelReducer, initialGradeLevelState);

  const fetchGradeLevels = () => {
    dispatch({ type: GradeLevelActionType.FETCH_GRADE_LEVELS });
  };
  const fetchGradeLevelById = (id: string) => {
    dispatch({ type: GradeLevelActionType.FETCH_GRADE_LEVEL_BY_ID, payload: id });
  }
  const createGradeLevel = (gradeLevel: GradeLevel) => {
    dispatch({ type: GradeLevelActionType.ADD_GRADE_LEVEL, payload: gradeLevel })
  };
  const updateGradeLevel = (gradeLevel: GradeLevel) => {
    dispatch({ type: GradeLevelActionType.UPDATE_GRADE_LEVEL, payload: gradeLevel });
  };
  const deleteGradeLevel = (id: string) => {
    dispatch({ type: GradeLevelActionType.DELETE_GRADE_LEVEL, payload: id });
  };
  const toggleLevelFlipped = () => {
    dispatch({ type: GradeLevelActionType.TOGGLE_LEVEL_FLIPPED });
  };
  const setFlippedSideState = (payload: string) => {
    dispatch({ type: GradeLevelActionType.SET_FLIPPED_SIDE_STATE, payload });
  }

  const contextValue: GradeLevelContextType = {
    gradeLevels: state.gradeLevels,
    levelFlipped: state.levelFlipped,
    flippedSideState: state.flippedSideState,
    fetchGradeLevels,
    fetchGradeLevelById,
    createGradeLevel,
    updateGradeLevel,
    deleteGradeLevel,
    toggleLevelFlipped,
    setFlippedSideState
  }

  useEffect(() => {
    fetchGradeLevels();
  }, [])

  return (
    <GradeLevelContext.Provider value={contextValue}>
      {children}
    </GradeLevelContext.Provider>
  );
}

export const useGradeLevelContext = () => {
  const context = useContext(GradeLevelContext);
  if (!context) {
    throw new Error("useGradeLevelContext must be used within a GradeLevelProvider");
  }
  return context;
}
