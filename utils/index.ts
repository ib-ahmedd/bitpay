export function addCommasToAmounts(amount: number): string {
  const reversedArray = amount.toString().split("").reverse();
  const commaedArray = [];
  let jumpedNumbersCount = 0;
  for (let i = 0; i < reversedArray.length; i++) {
    if (jumpedNumbersCount === 3) {
      commaedArray.push(",");
      commaedArray.push(reversedArray[i]);
      jumpedNumbersCount = 1;
    } else {
      jumpedNumbersCount = jumpedNumbersCount + 1;
      commaedArray.push(reversedArray[i]);
    }
  }

  const reversedCommaedArray = commaedArray.reverse();
  let processedString = "";

  for (let i = 0; i < reversedCommaedArray.length; i++) {
    processedString = processedString + reversedCommaedArray[i];
  }

  return processedString;
}
