export type Operation = 'multiply' | 'add' | 'divide';
type Result = string | number;

const calculator = (a: number, b: number, op: Operation): Result => {
  // console.log(printText, a*b );
  switch (op) {
    case 'multiply':
      return a*b;
    case 'add': 
      return a+b;
    case 'divide':
      if (b===0) throw new Error('Can\'t divide by 0!');
      return a / b;
    default:
      throw new Error('Operation is not multiply, add, or divide!');
  }
};

// multiplicator(2, 4, '2 * 4 = ');
try {
  const a = Number(process.argv[2]);
  const b = Number(process.argv[3]);
  const operation: unknown = process.argv[4];
  if (operation === 'multiply' || operation === 'add' || operation === 'divide') {
    console.log('result: ', calculator(a, b, operation));
  }
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: ';
  if (error instanceof Error) {
    errorMessage += error.message;
  }
  console.log(errorMessage);
}

export { calculator };