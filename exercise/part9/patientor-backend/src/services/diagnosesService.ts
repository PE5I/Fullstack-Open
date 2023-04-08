import diagnosesData from '../../data/diagnoses';
import { Diagnosis, NonLatinDiagnosesEntry } from '../types';

const getDiagnoses = (): Diagnosis[] => {
  return diagnosesData;
};

const getNonLatinDiagnoses = (): NonLatinDiagnosesEntry[] => {
  return diagnosesData.map(({ code, name }) => ({
    code,
    name
  }));
};

const save = (newDiagnosis: Diagnosis) => {
  diagnosesData.concat(newDiagnosis);
  return newDiagnosis;
}

export default {
  getDiagnoses,
  getNonLatinDiagnoses,
  save
};