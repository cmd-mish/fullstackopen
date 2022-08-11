import patientData from '../../data/patients';
import { v4 as uuidv4 } from 'uuid';
import { PatientSensitive, Patient, NewPatient } from '../types';

const getPatientsSensitive = (): PatientSensitive[] => {
  return patientData;
};

const getPatients = (): Patient[] => {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (patient: NewPatient): PatientSensitive => {
  const newPatient = {
    id: uuidv4(),
    ...patient
  };

  patientData.push(newPatient);
  return newPatient;
};

export default { getPatientsSensitive, getPatients, addPatient };