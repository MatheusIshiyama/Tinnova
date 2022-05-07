const input = 10;

function multiplySum(checkNumber) {
  const validNumbers = [];

  for (let value = 1; value < checkNumber; value++) {
    if (value % 3 === 0 || value % 5 === 0) validNumbers.push(value);
  }

  let result = 0;

  for (const number of validNumbers) {
    result += number;
  }

  return result;
}

console.log(multiplySum(input));
