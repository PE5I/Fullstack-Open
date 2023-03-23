import patientsData from '../../data/patients';
import { UnclassifiedPatientRecord, PatientRecord } from '../types';

const getPatient = (): PatientRecord[] => {
  return patientsData;
};

const getUnclassifiedPatientRecords = (): UnclassifiedPatientRecord[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getPatient,
  getUnclassifiedPatientRecords
};