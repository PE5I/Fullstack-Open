import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { Diagnosis, Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry, Patient } from "../../types";

import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";

const OccupationalHealthcare = ({ entry }: { entry: OccupationalHealthcareEntry}) => {
  return (
    <div>
      <p>Occupational Healthcare</p>
      {entry.date} {entry.employerName}
      <br/>
      {entry.description}
      <br/>
      {entry?.sickLeave?.startDate} 
      {entry?.sickLeave?.endDate ? 'to' : ''} 
      {entry?.sickLeave?.endDate}
      diagnose by {entry.specialist}
    </div>
  )
}

const Hospital= ({ entry }: { entry: HospitalEntry}) => {
  return (
    <div>
      <p>Hospital Visit</p>
      {entry.date}
      <br/>
      {entry.description}
      <br/>
      discharge date: {entry.discharge.date}
      discharge criteria: {entry.discharge.criteria}
      diagnose by {entry.specialist}
    </div>
  )
}

const HealthCheck = ({ entry }: { entry: HealthCheckEntry}) => {
  return (
    <div>
      <p>Health Check</p>
      {entry.date}
      <br/>
      {entry.description}
      <br/>
      Health Check Rating: {entry?.healthCheckRating}
      <br/>
      diagnose by {entry.specialist}
    </div>
  )
}

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const EntryDetails = ({ entry }: { entry: Entry}) => {
  switch (entry.type) {
    case "Hospital":
      return <Hospital entry={entry} />
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />
    case "HealthCheck":
      return <HealthCheck entry={entry} />
    default:
      return assertNever(entry)
  }
}

const Entries = (props: { entries: Entry[] }) => {
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis[]>()

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const { data } = await diagnosesService.getAll();
      setDiagnosisCodes(data);
    }
    fetchDiagnoses();
  }, []);

  if (props.entries.length === 0) {
    return null;
  }

  return (
    <div>
      {props.entries.map(e =>
        <div key={e.id}>
          <h3>entries</h3>
          <EntryDetails entry={e} />
          <ul>
          {e.diagnosisCodes?.map(
            dc => 
              <li key={dc}>
                {dc} {diagnosisCodes?.filter(c => c.code === dc)[0].name}
              </li>
          )}
          </ul>
        </div>
      )}
    </div>
  )
}


const PatientInfo = () => {

  const [patientLookup, setPatientLookup] = useState<Patient>();

  const { id } = useParams();
  useEffect(() => {
    const fetchPatientById = async (id: string) => {
      const patient: Patient = await patientService.getById(id)
      setPatientLookup(patient)
    };
    fetchPatientById(id!);
  }, []);

  if (!patientLookup) {
    return null
  }

  return (
    <div className="App">
      <h2>
        {patientLookup.name} 
        {patientLookup.gender === 'male' ? <MaleIcon /> : <FemaleIcon />}
      </h2>
      <p>
        ssn: {patientLookup.ssn}
        <br/>
        occupation: {patientLookup.occupation}
      </p>
      <Entries entries={patientLookup.entries} />
    </div>
  );
};

export default PatientInfo;
