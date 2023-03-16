
const calculateExercises = (hoursOfExercise: number[], targetDailyHours: number) => {
  const periodLength: number = 7;
  const trainingDays: number = hoursOfExercise.filter(hour => hour != 0).length
  const averageTime: number = hoursOfExercise.filter(hour => hour != 0)
    .reduce((sum, currentValue) => sum + currentValue) / trainingDays
  const success: boolean = averageTime >= targetDailyHours
  const rating: number = 2
  const description = 'not too bad but could be better'

  const Result = { periodLength, trainingDays, averageTime, success, rating, description }
  return Result
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 3));