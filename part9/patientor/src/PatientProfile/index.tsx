import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue, loadPatient, updatePatient } from "../state";
import { apiBaseUrl } from "../constants";

import { Patient, Entry } from "../types";
import { Box, Typography, Button } from "@material-ui/core";

import EntryDetails from './Entries';
import AddEntryModal from "./AddEntryModal";
import { EntryFormValues } from "./AddEntryForm";

const PatientProfile = () => {
  const { id } = useParams<{ id: string }>();
  const [{ individualPatients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
  };

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      if (id) {
        const { data: newPatient } = await axios.post<Patient>(
          `${apiBaseUrl}/patients/${id}/entries`, values
        );
        dispatch(updatePatient(newPatient));
        closeModal();
      }

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(`${apiBaseUrl}/patients/${String(id)}`);
        dispatch(loadPatient(patient));
      } catch (e) {
        console.error(e);
      }
    };

    if (!individualPatients[String(id)]) {
      void fetchPatient();
    }
  }, [dispatch]);

  if (!individualPatients[String(id)]) return <div>loading...</div>;

  return (
    <Box marginTop={3}>
      <Typography align="left" variant="h5">
        {individualPatients[String(id)].name}
      </Typography>
      <Box component="span" sx={{ display: 'block' }}>
        gender: {individualPatients[String(id)].gender}<br />
        ssn: {individualPatients[String(id)].ssn}<br />
        occupation: {individualPatients[String(id)].occupation}
      </Box>

      <Typography variant="h6">
        entries
      </Typography>
      <Box component="span" sx={{ display: 'block' }}>
        {individualPatients[String(id)].entries.map((entry: Entry) => (
          <div key={entry.id} style={{ border: "1px solid black", borderRadius: "5px", padding: "5px", margin: "10px", maxWidth: "500px" }}>
            <EntryDetails entry={entry} />
          </div>
        ))}
      </Box>
      <AddEntryModal
        onSubmit={submitNewEntry}
        modalOpen={modalOpen}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>

    </Box>
  );
};

export default PatientProfile;