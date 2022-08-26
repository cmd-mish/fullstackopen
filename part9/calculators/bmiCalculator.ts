export const calculateBmi = (args: Array<string>): string => {
  if (args.length < 4) throw Error('Not enough arguments');
  if (args.length > 4) throw Error('Too many arguments');

  const height = Number(args[2]);
  const weight = Number(args[3]);

  if (isNaN(height) || isNaN(weight) || height <= 0 || weight <= 0) 
    throw new Error('Both height and weight must be positive numbers');

  const bmi = Math.round((weight / Math.pow(height / 100, 2)) * 10) / 10;

  if (bmi < 0) return 'Underweight (Severe thinness)';
  if (bmi <= 16.9) return 'Underweight (Moderate thinness)';
  if (bmi <= 18.4) return 'Underweight (Mild thinness)';
  if (bmi <= 24.9) return 'Normal range';
  if (bmi <= 29.9) return 'Overweight (Pre-obese)';
  if (bmi <= 34.9) return 'Obese (Class I)';
  if (bmi <= 39.9) return 'Obese (Class II)';
  if (bmi > 39.9) return 'Obese (Class III)';
  throw new Error('Unable to determine bmi');
};

try {
  console.log(calculateBmi(process.argv));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log('Error:', error.message);
  } else {
    console.log('Error occured!');
  }
}