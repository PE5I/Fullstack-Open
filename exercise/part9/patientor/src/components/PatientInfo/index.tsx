import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { Entry, Patient } from "../../types";

import patientService from "../../services/patients";

const Entries = (props: { entries: Entry[] }) => {
  
  if (props.entries.length === 0) {
    return null;
  }

  return (
    <div>
      {props.entries.map(e =>
        <div>
          <h3>entries</h3>
          <p>
            {e.date} {e.description}
          </p>
          <p>
            <ul>
            {e.diagnosisCodes?.map(
              dc => <li>{dc}</li>
            )}
            </ul>
          </p>
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

  console.log(patientLookup);

  if (patientLookup) {
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
  }

  return (
    <div>
      sd
    </div>
  )
};

export default PatientInfo;
