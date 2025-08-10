/* eslint-disable @typescript-eslint/no-inferrable-types */
import numeral from "numeral";

/**
 * 格式化时间长度
 * @export
 * @param {(number | string)} duration 时长
 * @param {string} [format="00:00:00"] 格式
 * @return {string} 格式化时间长度
 */
export function formatDuration(
  duration: number | string,
  format: string = "00:00:00",
): string {
  return numeral(duration).format(format);
}

/**
 * 格式化文件大小
 *
 * @export
 * @param {(number | string)} size
 * @param {string} [format="0.00b"]
 * @return {*}  {string} 格式化文件大小
 */
export function formatFileSize(
  size: number | string,
  format: string = "0.00ib",
): string {
  return numeral(size).format(format).replace("i", "");
}

/**
 * 格式化数字显示
 *
 * @export
 * @param {(number)} size
 * @param {string} [format="0,0"]
 * @return {*}  {string} 格式化数字显示
 */
export function formatNumber(
  size: number | string,
  format: string = "0,0",
): string {
  return numeral(size).format(format);
}
