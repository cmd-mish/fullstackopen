import express from 'express';
import patientService from '../services/patientService';

const router = express();

router.get('/', (_req, res) => {
  res.send(patientService.getPatients());
});

export default router;