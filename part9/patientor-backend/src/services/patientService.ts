import patientData from '../../data/patients';
import { PatientSensitive, Patient } from '../types';

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

export default { getPatientsSensitive, getPatients };