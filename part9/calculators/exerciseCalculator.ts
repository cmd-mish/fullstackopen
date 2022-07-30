interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (args: Array<string>): Result => {
  if (args.length < 5) 
    throw Error('Not enough arguments! Provide at least one target value and two day values!');

  const parameters = args.slice(2);
  
  if (!parameters.every(arg => (!isNaN(Number(arg)) && Number(arg) >= 0))) 
    throw new Error('All additional parameters must be positive numbers or zeros!');
  
  const target = Number(args[2]);
  const exercises = args.slice(3).map(arg => Number(arg));
  
  const periodLength = exercises.length;
  const trainingDays = exercises.filter(day => day !== 0).length;

  const sum = exercises.reduce((total, current) => total + current);
  const average = sum / periodLength;

  const success = average >= target;

  let rating;
  let ratingDescription;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'well done!';
  } else if (target - average < 2) {
    rating = 2;
    ratingDescription = 'you can do better!';
  } else {
    rating = 1;
    ratingDescription = 'very poor!';
  }

  return {
    periodLength, trainingDays, success, rating, ratingDescription, target, average
  }
}


try {
  console.log(calculateExercises(process.argv));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Error:', error.message);
  } else {
    console.log('Error occured!');
  }
}
