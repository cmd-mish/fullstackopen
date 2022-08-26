import { Entry, HospitalEntry, OccupationalHealthcareEntry, HealthCheckEntry } from "../types";

import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import WorkIcon from '@mui/icons-material/Work';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HospitalEntryComponent = ({ date, description, discharge, specialist }: HospitalEntry) => (
  <div>
    <p>{date} <LocalHospitalIcon /></p>
    <p>{description}</p>
    <p>Discharged on {discharge.date}. Reason: {discharge.criteria}</p>
    <p>Diagnosed by {specialist}</p>
  </div>
);

const OccupationalHealthcareEntryComponent = ({ date, description, employerName, sickLeave, specialist }: OccupationalHealthcareEntry) => (
  <div>
    <p>{date} <WorkIcon /> {employerName}</p>
    <p>{description}</p>
    {sickLeave ?
      <p>Sick leave: {sickLeave.startDate} - {sickLeave.endDate}</p>
      : null
    }
    <p>Diagnosed by {specialist}</p>
  </div>
);

const HealthCheckEntryComponent = ({ date, description, healthCheckRating, specialist }: HealthCheckEntry) => (
  <div>
    <p>{date} <DirectionsRunIcon /></p>
    <p>{description}</p>
    <p>{(() => {
      switch (healthCheckRating) {
        case 0:
          return <FavoriteIcon sx={{ color: "green" }} />;
        case 1:
          return <FavoriteIcon sx={{ color: "yellow" }} />;
        case 2:
          return <FavoriteIcon sx={{ color: "orange" }} />;
        case 3:
          return <FavoriteIcon sx={{ color: "red" }} />;
        default:
          return <FavoriteIcon />;
      }
    })()}</p>
    <p>Diagnosed by {specialist}</p>
  </div>
);

const assertNever = (value: never): never => {
  throw new Error(
    `Unknown entry type: ${JSON.stringify(value)}`
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryComponent
        date={entry.date}
        type={entry.type}
        discharge={entry.discharge}
        id={entry.id}
        description={entry.description}
        specialist={entry.specialist}
      />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryComponent
        date={entry.date}
        type={entry.type}
        employerName={entry.employerName}
        id={entry.id}
        description={entry.description}
        specialist={entry.specialist}
        sickLeave={entry.sickLeave}
      />;
    case "HealthCheck":
      return <HealthCheckEntryComponent
        type={entry.type}
        healthCheckRating={entry.healthCheckRating}
        id={entry.id}
        description={entry.description}
        date={entry.date}
        specialist={entry.specialist}
      />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;