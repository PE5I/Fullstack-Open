
export interface DiagnosesEntry {
  code: string;
  name: string;
  latin?: string;
}

export type NonLatinDiagnosesEntry = Omit<DiagnosesEntry, 'latin'>;

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface BaseEntry {
  id: string;
  date: string;
  type: string;
  specialist: string;
  description: string;
  diagnosisCodes?: Array<DiagnosesEntry['code']>; // DiagnosesEntry['code'][];
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  discharge?: {
    date: string;
    criteria: string;
  }
}

export interface HealthCheckEntry extends BaseEntry {
  healthCheckRating?: HealthCheckRating;
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry;

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