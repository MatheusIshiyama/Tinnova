const data = [5, 3, 2, 4, 7, 1, 0, 6];

/**
 * @param {number[]} values
 */
function bubbleSort(values) {
  const bubble = values;

  for (let sortedValues = 0; sortedValues < bubble.length; sortedValues++) {
    for (let position = 0; position < bubble.length - sortedValues; position++) {
      if (bubble[position] > bubble[position + 1]) {
        const currentValue = bubble[position];
        bubble[position] = bubble[position + 1];
        bubble[position + 1] = currentValue;
      }
    }
  }

  return bubble;
}

console.log(bubbleSort(data));
