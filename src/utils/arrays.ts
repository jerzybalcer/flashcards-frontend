export function groupBy<T, K extends keyof T>(array: T[], key: K): Record<string, T[]> 
{
  return array.reduce((result, item) => {
    const keyValue = String(item[key]); // Convert key value to string to use as a property name

    if (!result[keyValue]) {
      result[keyValue] = [];
    }

    result[keyValue].push(item);

    return result;
  }, {} as Record<string, T[]>);
}

// Fisher–Yates shuffle
export function shuffle<T>(array: T[]): T[] {
  const resultArray = [...array];
  let currentIndex = array.length;

  while (currentIndex != 0) {
      const randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // swap
      [resultArray[currentIndex], resultArray[randomIndex]] = [
      resultArray[randomIndex], resultArray[currentIndex]];
  }

  return resultArray;
}