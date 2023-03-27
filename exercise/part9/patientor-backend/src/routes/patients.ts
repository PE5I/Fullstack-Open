import express from 'express';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (req, res) => {
  res.send(patientsService.getUnclassifiedPatientRecords());
});

export default router;