
const calculateBmi = (height: number, mass: number): string => {
  const bmi = mass / ((height/100) * (height/100))

  if (0 < bmi && bmi < 16) {
    return "Underweight (severe thinness)"
  } else if (18.5 < bmi && bmi < 25) {
    return "Normal (healthy weight)"
  } else {
    return "unknown"
  }
}

console.log(calculateBmi(180, 74));