
export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export type NonLatinDiagnosesEntry = Omit<DiagnosesEntry, 'latin'>;

export interface Entry {
}

export interface PatientRecord {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
  entries: Entry[];
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other'
}

export type NewPatientRecord = Omit<PatientRecord, 'id'>;

export type UnclassifiedPatientRecord = Omit<PatientRecord, 'ssn' | 'entries'>;