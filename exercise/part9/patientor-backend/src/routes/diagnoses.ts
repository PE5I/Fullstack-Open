import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router()

router.get('/', (req, res) => {
  res.send(diagnosesService.getNonLatinDiagnoses());
});

export default router;