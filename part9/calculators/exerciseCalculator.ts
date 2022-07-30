interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (exercises: Array<number>, target: number): Result => {
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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))