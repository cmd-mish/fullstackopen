/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) 
    return res.status(400).json({error: 'malformatted parameters'}).end();

  try {
    const responseObject = {
    height, weight,
    bmi: calculateBmi(['', '', height.toString(), weight.toString()])
    };

    return res.send(responseObject);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({error: error.message}).end();
    } else {
      return res.status(400).end();
    }
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target }  = req.body;

  if (!daily_exercises || !target) 
    return res.status(400).json({error: 'parameters missing'}).end();

  if (!(daily_exercises instanceof Array) || !(Number.isFinite(target)))
    return res.status(400).json({error: 'malformatted parameters'}).end();
  

  const targetStr = target.toString();
  const exercisesStr = daily_exercises.map(e => e.toString());
  const arrayToBeSent = ['', '', targetStr, ...exercisesStr];

  try {
    const result = calculateExercises(arrayToBeSent);
    return res.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(400).json({error: error.message}).end();
    } else {
      return res.status(400).end();
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}!`);
});