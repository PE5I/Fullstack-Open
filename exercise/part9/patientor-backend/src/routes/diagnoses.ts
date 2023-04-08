import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(diagnosesService.getNonLatinDiagnoses());
});

router.post('/', (req, res) => {
  const { code, name } = req.body
  const savedDiagnosis = diagnosesService.save({ code, name })
  res.send(savedDiagnosis);
})

export default router;