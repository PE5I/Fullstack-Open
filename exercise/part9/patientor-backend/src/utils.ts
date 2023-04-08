import { Gender, NewPatientRecord } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
}

const parseField = (field: unknown): string => {
  if (!isString(field)) {
    throw new Error('Incorrect or missing field');
  }

  return field;
}

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param);
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  }
  return gender;
}

const toNewPatientRecord = (object: unknown): NewPatientRecord => {
  console.log("object...........", object);
  if (!object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }


  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newRecord: NewPatientRecord = {
      name: parseField(object.name),
      dateOfBirth: parseField(object.dateOfBirth),
      ssn: parseField(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseField(object.occupation),
      entries: []
    }

    return newRecord;
  }

  throw new Error('Incorrect data: a field is missing');
}

export default toNewPatientRecord;