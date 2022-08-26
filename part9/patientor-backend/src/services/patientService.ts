import patientData from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { Patient, PublicPatient, NewPatient, NewEntry } from '../types';

const getPatientsSensitive = (): Patient[] => {
  return patientData;
};

const getPatients = (): PublicPatient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatient = (id: string): Patient | undefined => {
  return patientData.find(patient => patient.id === id);
};

const addPatient = (patient: NewPatient): Patient => {
  const newPatient = {
    id: uuidv4(),
    entries: [],
    ...patient
  };

  patientData.push(newPatient);
  return newPatient;
};

const addEntry = (entry: NewEntry, id: string): Patient | undefined => {
  const patient = patientData.find(patient => patient.id === id);

  const newEntry = {
    id: uuidv4(),
    ...entry
  };

  if (patient) {
    patient.entries.push(newEntry);
    return patient;
  }

  return undefined;
};

export default { getPatientsSensitive, getPatients, getPatient, addPatient, addEntry };