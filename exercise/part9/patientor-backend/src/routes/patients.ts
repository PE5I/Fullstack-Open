import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientRecord from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientsService.getUnclassifiedPatientRecords());
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  res.json(patientsService.getById(id));
});

router.post('/', (req, res) => {
  const newPatientRecord = toNewPatientRecord(req.body);

  const savedPatientRecord = patientsService.save(newPatientRecord);
  res.send(savedPatientRecord).status(201).end();
});




export default router;