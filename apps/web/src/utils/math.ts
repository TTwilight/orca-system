/* eslint-disable */
/**
 * @desc 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
 * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
 */
/**
 * 把错误的数据转正
 * strip(0.09999999999999998)=0.1
 */
function strip(num, precision) {
  if (precision === void 0) {
    precision = 15;
  }
  return +parseFloat(Number(num).toPrecision(precision));
}

function floor(num) {
  if (!num) {
    return "0.00";
  }
  num = Number(num);
  // num = num / 100;
  return divide(Math.floor(times(num, 100)), 100);
}
/**
 * Return digits length of a number
 * @param {*number} num Input number
 */
function digitLength(num) {
  // Get digit length of e
  let eSplit = num.toString().split(/[eE]/);
  let len = (eSplit[0].split(".")[1] || "").length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}
/**
 * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
 * @param {*number} num 输入数
 */
function float2Fixed(num) {
  if (num.toString().indexOf("e") === -1) {
    return Number(num.toString().replace(".", ""));
  }
  let dLen = digitLength(num);
  return dLen > 0 ? strip(Number(num) * 10 ** dLen) : Number(num);
}
/**
 * 检测数字是否越界，如果越界给出提示
 * @param {*number} num 输入数
 */
function checkBoundary(num) {
  if (_boundaryCheckingState) {
    if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
      console.warn(
        num +
          " is beyond boundary when transfer to integer, the results may not be accurate",
      );
    }
  }
}
/**
 * 迭代操作
 */
function iteratorOperation(arr, operation) {
  let num1 = arr[0];
  let num2 = arr[1];
  let others = arr.slice(2);
  let res = operation(num1, num2);
  others.forEach(function (num) {
    res = operation(res, num);
  });
  return res;
}
/**
 * 精确乘法
 */
export function times() {
  let nums = [];
  for (let _i = 0; _i < arguments.length; _i++) {
    nums[_i] = arguments[_i];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, times);
  }
  let num1 = nums[0];
  let num2 = nums[1];
  let num1Changed = float2Fixed(num1);
  let num2Changed = float2Fixed(num2);
  let baseNum = digitLength(num1) + digitLength(num2);
  let leftValue = num1Changed * num2Changed;
  checkBoundary(leftValue);
  return leftValue / 10 ** baseNum;
}
/**
 * 精确加法
 */
export function plus() {
  let nums = [];
  for (let _i = 0; _i < arguments.length; _i++) {
    nums[_i] = arguments[_i];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, plus);
  }
  let num1 = nums[0];
  let num2 = nums[1];
  // 取最大的小数位
  let baseNum = 10 ** Math.max(digitLength(num1), digitLength(num2));
  // 把小数都转为整数然后再计算
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum;
}
/**
 * 精确减法
 */
export function minus() {
  let nums = [];
  for (let _i = 0; _i < arguments.length; _i++) {
    nums[_i] = arguments[_i];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, minus);
  }
  let num1 = nums[0];
  let num2 = nums[1];
  let baseNum = 10 ** Math.max(digitLength(num1), digitLength(num2));
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum;
}
/**
 * 精确除法
 */
export function divide() {
  let nums = [];
  for (let _i = 0; _i < arguments.length; _i++) {
    nums[_i] = arguments[_i];
  }
  if (nums.length > 2) {
    return iteratorOperation(nums, divide);
  }
  let num1 = nums[0];
  let num2 = nums[1];
  let num1Changed = float2Fixed(num1);
  let num2Changed = float2Fixed(num2);
  checkBoundary(num1Changed);
  checkBoundary(num2Changed);
  // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
  return times(
    num1Changed / num2Changed,
    strip(10 ** (digitLength(num2) - digitLength(num1))),
  );
}
/**
 * 四舍五入
 */
function round(num, ratio) {
  let base = 10 ** ratio;
  let result = divide(Math.round(Math.abs(times(num, base))), base);
  if (num < 0 && result !== 0) {
    result = times(result, -1);
  }
  return result;
}
let _boundaryCheckingState = true;
/**
 * 是否进行边界检查，默认开启
 * @param flag 标记开关，true 为开启，false 为关闭，默认为 true
 */
function enableBoundaryChecking(flag) {
  if (flag === void 0) {
    flag = true;
  }
  _boundaryCheckingState = flag;
}
let index = {
  strip: strip,
  plus: plus,
  minus: minus,
  times: times,
  divide: divide,
  round: round,
  digitLength: digitLength,
  float2Fixed: float2Fixed,
  enableBoundaryChecking: enableBoundaryChecking,
  floor: floor,
};

global.math = index;
