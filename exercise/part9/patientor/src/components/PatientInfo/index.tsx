import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

import { Patient } from "../../types";

import patientService from "../../services/patients";


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
