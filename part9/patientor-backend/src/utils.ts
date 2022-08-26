import { Gender, NewPatient, NewEntry, HealthCheckRating, SickLeave, Discharge } from "./types";

type Fields = {
  name: unknown,
  dateOfBirth: unknown,
  ssn: unknown,
  gender: unknown,
  occupation: unknown
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isSsn = (ssn: string): boolean => {
  const regExp = /^\d{6}[-+A]\d{2,3}([A-Z]|\d)$/;
  return Boolean(regExp.test(ssn));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect name');
  }
  return name;
};

const parseDateOfBirth = (dateOfBirth: unknown): string => {
  if (!dateOfBirth || !isString(dateOfBirth) || !isDate(dateOfBirth)) {
    throw new Error('Incorrect date of birth');
  }

  return dateOfBirth;
};

const parseSsn = (ssn: unknown): string => {
  if (!ssn || !isString(ssn) || !isSsn(ssn)) {
    throw new Error('Incorrect ssn');
  }
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect gender');
  }
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect occupation');
  }
  return occupation;
};


export const toNewPatient = ({ name, dateOfBirth, ssn, gender, occupation }: Fields): NewPatient => {
  const newPatient: NewPatient = {
    name: parseName(name),
    dateOfBirth: parseDateOfBirth(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parseGender(gender),
    occupation: parseOccupation(occupation)
  };
  return newPatient;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect specialist');
  }
  return specialist;
};

const parseDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect description');
  }
  return description;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect date');
  }
  return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthCheckRating = (healthCheckRating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(healthCheckRating)) {
    throw new Error('Incorrect health check rating');
  }
  return healthCheckRating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (sickLeave: any): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Boolean(sickLeave.startDate && sickLeave.endDate && isString(sickLeave.startDate) && isString(sickLeave.endDate) && isDate(sickLeave.startDate) && isDate(sickLeave.endDate));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
  if (!sickLeave) return undefined;

  if (!isSickLeave(sickLeave)) {
    throw new Error('Incorrect sick leave');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (discharge: any): boolean => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Boolean(discharge.date && discharge.criteria && isString(discharge.criteria) && isString(discharge.date) && isDate(discharge.date));
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error('Incorrect discharge');
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return discharge;
};

export const toNewEntry = (entry: NewEntry): NewEntry => {
  switch (entry.type) {
    case "HealthCheck":
      return {
        description: parseDescription(entry.description),
        date: parseDate(entry.date),
        specialist: parseSpecialist(entry.specialist),
        type: entry.type,
        healthCheckRating: parseHealthCheckRating(entry.healthCheckRating),
        diagnosisCodes: entry.diagnosisCodes
      };
    case "OccupationalHealthcare":
      return {
        description: parseDescription(entry.description),
        date: parseDate(entry.date),
        specialist: parseSpecialist(entry.specialist),
        type: entry.type,
        sickLeave: parseSickLeave(entry.sickLeave),
        employerName: parseName(entry.employerName),
        diagnosisCodes: entry.diagnosisCodes
      };
    case "Hospital":
      return {
        description: parseDescription(entry.description),
        date: parseDate(entry.date),
        specialist: parseSpecialist(entry.specialist),
        type: entry.type,
        discharge: parseDischarge(entry.discharge),
        diagnosisCodes: entry.diagnosisCodes
      };
    default:
      throw new Error('Incorrect type');
  }
};