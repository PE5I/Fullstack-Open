import diagnosesData from '../../data/diagnoses';
import { DiagnosesEntry, NonLatinDiagnosesEntry } from '../types';

const getDiagnoses = (): DiagnosesEntry[] => {
  return diagnosesData;
};

const getNonLatinDiagnoses = (): NonLatinDiagnosesEntry[] => {
  return diagnosesData.map(({ code, name }) => ({
    code,
    name
  }));
};

export default {
  getDiagnoses,
  getNonLatinDiagnoses
};