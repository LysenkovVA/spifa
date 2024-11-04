export enum ConsoleColor {
  Red = "\u001b[1;31m",
  Green = "\u001b[1;32m",
  Yellow = "\u001b[1;33m",
  Blue = "\u001b[1;34m",
  Purple = "\u001b[1;35m",
  Cyan = "\u001b[1;36m",
  Default = "\u001b[0m",
}

export const ConsoleLog = (message: string, color: ConsoleColor) => {
  console.log(`${color}${message}${ConsoleColor.Default}`);
};
