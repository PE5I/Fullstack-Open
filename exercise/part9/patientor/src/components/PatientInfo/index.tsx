import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { Diagnosis, Entry, Patient } from "../../types";

import patientService from "../../services/patients";
import diagnosesService from "../../services/diagnoses";

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
          <p>
            {e.date} {e.description}
          </p>
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
