function fatorial(number) {
  if (number <= 1) return 1;

  let result = 1;

  for (let currentValue = 1; currentValue <= number; currentValue++) {
    result *= currentValue;
  }

  return result;
}

function tests() {
  for (let input = 0; input <= 6; input++) {
    const result = fatorial(input);
    console.log(`${input}! = ${result}`);
  }
}

tests();
