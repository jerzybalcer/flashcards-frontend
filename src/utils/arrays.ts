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