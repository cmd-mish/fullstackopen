import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
})

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) 
    return res.status(400).json({error: 'malformatted parameters'}).end();

  try {
    const responseObject = {
    height, weight,
    bmi: calculateBmi(['', '', height.toString(), weight.toString()])
    }

    return res.send(JSON.stringify(responseObject));
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({error: error.message}).end();
    } else {
      return res.status(400).end();
    }
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
})