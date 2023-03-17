import express from 'express';
import calculateBmi from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  if (isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight))) {
    res.json({ error: "malformatted parameters" }).end()
  }

  const height: number = Number(req.query.height)
  const weight: number = Number(req.query.weight)

  res.json({
    weight,
    height,
    bmi: calculateBmi(height, weight)
  })
})

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})