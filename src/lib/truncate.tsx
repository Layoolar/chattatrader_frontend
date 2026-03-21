export const truncateString = (str: string, startLength: number = 5, endLength: number = 4): string => {
  if (str.length <= startLength + endLength) return str;
  return `${str.slice(0, startLength)}...${str.slice(-endLength)}`;
};