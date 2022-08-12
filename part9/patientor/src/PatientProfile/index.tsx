import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";

import { Patient } from "../types";
import { Box, Typography } from "@material-ui/core";

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${String(id)}`);
        dispatch({ type: "LOAD_PATIENT", payload: patient });
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
      <Typography align="left" variant="h6">
        {state.individualPatients[String(id)].name}
      </Typography>
      gender: {state.individualPatients[String(id)].gender}<br />
      ssn: {state.individualPatients[String(id)].ssn}<br />
      occupation: {state.individualPatients[String(id)].occupation}
    </Box>
  );
};

export default PatientProfile;