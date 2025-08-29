import { createContext, useContext, useEffect, useReducer } from "react";
import { initialStaffState, staffReducer } from "./staff.reducer";
import { Staff } from "@/model/Staff";
import { StaffActionType } from "./staff.action";
import { countriesUrl } from "@/shared/constants/api";
import { Country } from "@/model/Country";
import { CountryState } from "@/model/CountryState";

interface StaffContextValue {
  staff: Staff[];
  countries: string[];
  states: CountryState[];
  currentStaff: Staff | null;
  flipped: boolean;
  flippedSideState: "create" | "view" | "edit";
  fetchStaffById: (id: string) => void;
  createStaff: (staff: Staff) => void;
  updateStaff: (staff: Staff) => void;
  deleteStaff: (id: string) => void;
  toggleFlipped: () => void;
  setFlippedSideState: (state: string) => void;
}

const StaffContext = createContext<StaffContextValue | null>(null);

export const StaffProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(staffReducer, initialStaffState);

  const fetchStaffById = (id: string) => {
    dispatch({ type: StaffActionType.FETCH_STAFF_BY_ID, payload: id });
  }

  const createStaff = (staff: Staff) => {
    dispatch({ type: StaffActionType.CREATE_STAFF, payload: staff });
  }

  const updateStaff = (staff: Staff) => {
    dispatch({ type: StaffActionType.UPDATE_STAFF, payload: staff });
  }

  const deleteStaff = (id: string) => {
    dispatch({ type: StaffActionType.DELETE_STAFF, payload: id });
  }

  const toggleFlipped = () => {
    dispatch({ type: StaffActionType.TOGGLE_FLIPPED });
  }

  const setFlippedSideState = (payload: string) => {
    dispatch({ type: StaffActionType.SET_FLIPPED_SIDE_STATE, payload });
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    fetch(countriesUrl, { signal })
      .then(res => res.json())
      .then(data => {
        const result: Country[] = data;
        if (Array.isArray(result) && result.length && result[0].country && result[0].subcountry) {
          let countries = new Set<string>();
          let states = new Set<string>();
          for (let item of data) {
            countries.add(item.country);
            states.add(`${item.subcountry} ${item.country}`);
          }
          let countryStates: CountryState[] = Array.from(states)
            .map((s: string): CountryState => {
              const stateCountry = s.split(/\s/);
              return { name: stateCountry[0], country: stateCountry[1] };
            })
          const ascCountries = Array.from(countries).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
          const ascCountryStates = Array.from(countryStates).sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }));
          dispatch({ type: StaffActionType.SET_COUNTRIES, payload: Array.from(ascCountries) })
          dispatch({ type: StaffActionType.SET_STATES, payload: ascCountryStates });
        }
      }).catch((err) => {
        console.error("Error while fetching countries: ", err);
      })
    dispatch({ type: StaffActionType.FETCH_ALL_STAFF });

    return () => {
      if (abortController !== null) abortController.abort();
    }
  }, [])

  const contextValue: StaffContextValue = {
    staff: state.staff,
    countries: state.countries,
    states: state.states,
    flipped: state.flipped,
    flippedSideState: state.flippedSideState,
    currentStaff: state.currentStaff,
    fetchStaffById,
    createStaff,
    updateStaff,
    deleteStaff,
    toggleFlipped,
    setFlippedSideState
  };

  return (
    <StaffContext.Provider value={contextValue}>
      {children}
    </StaffContext.Provider>
  );
}

export const useStaffContext = () => {
  const context = useContext(StaffContext);
  if (!context) {
    throw new Error("useStaffContext must be used within a StaffProvider");
  }
  return context;
}