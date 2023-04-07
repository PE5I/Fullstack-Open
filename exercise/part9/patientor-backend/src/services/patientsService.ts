import initialPatientData from '../../data/patients';
import { UnclassifiedPatientRecord, PatientRecord, NewPatientRecord } from '../types';
import { v1 as uuid } from 'uuid';

let patientsData = initialPatientData // initialPatientData.map(p => ({...p, entries: []}));

const getPatient = (): PatientRecord[] => {
  return patientsData;
};

const getById = (id: string): PatientRecord => {
  const patient = patientsData.filter(p => p.id === id)[0];
  return patient
}

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
    ...newPatientRecord,
    entries: []
  }
  patientsData = patientsData.concat(patientRecord);
};

export default {
  getPatient,
  getById,
  getUnclassifiedPatientRecords,
  save
};