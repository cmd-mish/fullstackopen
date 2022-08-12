import patientData from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { Patient, PublicPatient, NewPatient } from '../types';

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

export default { getPatientsSensitive, getPatients, getPatient, addPatient };