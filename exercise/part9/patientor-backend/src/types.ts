
export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export type NonLatinDiagnosesEntry = Omit<DiagnosesEntry, 'latin'>;

export interface PatientRecord {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: string;
  occupation: string;
}

export type UnclassifiedPatientRecord = Omit<PatientRecord, 'ssn'>;