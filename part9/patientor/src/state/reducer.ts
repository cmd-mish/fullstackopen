import { State } from "./state";
import { Patient, Diagnosis } from "../types";

export type Action =
  | {
    type: "SET_PATIENT_LIST";
    payload: Patient[];
  }
  | {
    type: "ADD_PATIENT";
    payload: Patient;
  }
  | {
    type: "LOAD_PATIENT";
    payload: Patient;
  }
  | {
    type: "LOAD_DIAGNOSES";
    payload: Diagnosis[];
  };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "LOAD_PATIENT":
      return {
        ...state,
        individualPatients: {
          ...state.individualPatients,
          [action.payload.id]: action.payload
        }
      };
    case "LOAD_DIAGNOSES":
      return {
        ...state,
        diagnoses: action.payload
      };
    default:
      return state;
  }
};
