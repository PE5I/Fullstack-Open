interface BmiValues {
  height: number;
  mass: number;
}

const parseArguments = (args: string[]): BmiValues => {
  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      mass: Number(args[3])
    }
  } else {
    throw new Error('Provided values are not numbers')
  }
}

const calculateBmi = (height: number, mass: number): string => {
  const bmi = mass / ((height/100) * (height/100))

  if (0 < bmi && bmi < 16) {
    return "Underweight (severe thinness)"
  } else if (18.5 < bmi && bmi < 25) {
    return "Normal (healthy weight)"
  } else if (25 < bmi && bmi < 29) {
    return "Overweight"
  } else if (bmi >= 30) {
    return "Obese"
  } else {
    return "unknown"
  }
}



try {
  const { height, mass } = parseArguments(process.argv)
  console.log(calculateBmi(height, mass))
} catch (e) {
  console.log(`Error: ${e}`)
}