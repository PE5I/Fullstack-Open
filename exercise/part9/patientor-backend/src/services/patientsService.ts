import initialPatientData from '../../data/patients';
import { UnclassifiedPatientRecord, PatientRecord, NewPatientRecord } from '../types';
import { v1 as uuid } from 'uuid';

let patientsData = initialPatientData;

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

const save = (newPatientRecord: NewPatientRecord) => {
  const patientRecord = {
    id: uuid(),
    ...newPatientRecord
  }
  patientsData = patientsData.concat(patientRecord);
};

export default {
  getPatient,
  getUnclassifiedPatientRecords,
  save
};