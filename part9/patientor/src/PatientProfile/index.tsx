import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue, loadPatient } from "../state";
import { apiBaseUrl } from "../constants";

import { Patient, Entry } from "../types";
import { Box, Typography } from "@material-ui/core";

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${String(id)}`);
        dispatch(loadPatient(patient));
      } catch (e) {
        console.error(e);
      }
    };

    if (!state.individualPatients[String(id)]) {
      void fetchPatient();
    }
  }, [dispatch]);

  if (!state.individualPatients[String(id)]) return <div>loading...</div>;

  return (
    <Box marginTop={3}>
      <Typography align="left" variant="h5">
        {state.individualPatients[String(id)].name}
      </Typography>
      <Box component="span" sx={{ display: 'block' }}>
        gender: {state.individualPatients[String(id)].gender}<br />
        ssn: {state.individualPatients[String(id)].ssn}<br />
        occupation: {state.individualPatients[String(id)].occupation}
      </Box>

      <Typography variant="h6">
        entries
      </Typography>
      <Box component="span" sx={{ display: 'block' }}>
        {state.individualPatients[String(id)].entries.map((entry: Entry) => (
          <span key={entry.id}>
            {entry.date} {entry.description}
            <ul>
              {entry.diagnosisCodes?.map((code) => (
                <li key={code}>{code}</li>
              ))}
            </ul>

          </span>
        ))}
      </Box>

    </Box>
  );
};

export default PatientProfile;