import { createContext, useContext, useEffect, useReducer, useState } from "react";
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
  fetchStaffById: (id: string) => void;
  createStaff: (staff: Staff) => void;
  updateStaff: (staff: Staff) => void;
  deleteStaff: (id: string) => void;
  toggleFlipped: () => void;
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
          dispatch({ type: StaffActionType.SET_COUNTRIES, payload: Array.from(countries) })
          dispatch({ type: StaffActionType.SET_STATES, payload: countryStates });
        }
      }).catch((err) => {

      })

    return () => {
      if (abortController !== null) abortController.abort();
    }
  }, [])

  const contextValue: StaffContextValue = {
    staff: state.staff,
    countries: state.countries,
    states: state.states,
    flipped: state.flipped,
    currentStaff: state.currentStaff,
    fetchStaffById,
    createStaff,
    updateStaff,
    deleteStaff,
    toggleFlipped,
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