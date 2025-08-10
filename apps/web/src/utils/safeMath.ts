import Big from "big.js";

// 安全加法，默认保留两位小数
export function safePlus(
  a: number,
  b: number,
  decimalPlaces: number = 2,
): number {
  try {
    return new Big(a).plus(new Big(b)).round(decimalPlaces).toNumber();
  } catch (error) {
    console.error("Addition error:", error);
    // Return a fallback value or handle the error as needed
    return Number.isFinite(a + b) ? a + b : 0;
  }
}

// 安全减法，默认保留两位小数
export function safeMinus(
  a: number,
  b: number,
  decimalPlaces: number = 2,
): number {
  try {
    return new Big(a).minus(new Big(b)).round(decimalPlaces).toNumber();
  } catch (error) {
    console.error("Subtraction error:", error);
    // Return a fallback value or handle the error as needed
    return Number.isFinite(a - b) ? a - b : 0;
  }
}

// 安全乘法，默认保留两位小数
export function safeTimes(
  a: number,
  b: number,
  decimalPlaces: number = 2,
): number {
  try {
    return new Big(a).times(new Big(b)).round(decimalPlaces).toNumber();
  } catch (error) {
    console.error("Multiplication overflow:", error);
    // Return a fallback value or handle the error as needed
    return Number.MAX_SAFE_INTEGER * Math.sign(a * b);
  }
}

// 安全除法，默认保留两位小数
export function safeDivide(
  a: number,
  b: number,
  decimalPlaces: number = 2,
): number {
  if (b === 0) {
    // throw new Error('Division by zero');
    return 0;
  }
  try {
    return new Big(a).div(new Big(b)).round(decimalPlaces).toNumber();
  } catch (error) {
    console.error("Division overflow:", error);
    // Return a fallback value or handle the error as needed
    return Number.MAX_SAFE_INTEGER * Math.sign(a / b);
  }
}

// 比较两个数字是否相等
export function isEqual(a: number, b: number, precision: number = 10): boolean {
  // Set the precision for comparison
  Big.DP = precision;
  const aBig = new Big(a).round(precision);
  const bBig = new Big(b).round(precision);
  return aBig.eq(bBig);
}

// 格式化数字，默认保留两位小数
export function formatDecimal(num: number, decimalPlaces: number = 2): number {
  try {
    return new Big(num).round(decimalPlaces).toNumber();
  } catch (error) {
    console.error("Format decimal error:", error);
    return num;
  }
}

// 数组求和，默认保留两位小数
export function safeSum(numbers: number[], decimalPlaces: number = 2): number {
  if (!numbers || numbers.length === 0) {
    return 0;
  }

  return numbers.reduce((sum, current) => {
    return safePlus(sum, current, decimalPlaces);
  }, 0);
}
