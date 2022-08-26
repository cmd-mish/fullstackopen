import diagnoseData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return diagnoseData;
};

export default {
  getDiagnoses
};