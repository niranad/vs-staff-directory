import { createContext, ReactNode, useContext, useReducer } from "react";
import { initialSnackBarState, snackBarReducer, SnackBarSeverity } from "./snackbar.reducer";
import { SnackBarActionType } from "./snackbar.action";

export interface SnackBarOpenData {
  message: string, 
  severity: SnackBarSeverity
}

export interface SnackBarContextType {
  open: boolean;
  severity: SnackBarSeverity;
  message: string;
  openSnackBar: (payload: SnackBarOpenData) => void;
  closeSnackBar: () => void;
}

const SnackBarContext = createContext<SnackBarContextType | null>(null);

export const SnackBarProvider = ({ children }: { children: ReactNode}) => {
  const [state, dispatch] = useReducer(snackBarReducer, initialSnackBarState);

  const openSnackBar = (payload: SnackBarOpenData) => {
    dispatch({ type: SnackBarActionType.OPEN, payload });
  }

  const closeSnackBar = () => {
    dispatch({ type: SnackBarActionType.CLOSE });
  }

  const contextValue = {
    open: state.open,
    severity: state.severity,
    message: state.message,
    openSnackBar,
    closeSnackBar,
  }
  
  return (
    <SnackBarContext.Provider value={contextValue}>
      {children}
    </SnackBarContext.Provider>
  ) 
}

export const useSnackBarContext = () => {
  const context = useContext(SnackBarContext);
  if (!context) {
    throw new Error("useSnackBarContext must be used within a SnackBarProvider");
  }
  return context;
}