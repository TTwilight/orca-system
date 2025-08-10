import dayjs from "dayjs";

// 转换时间戳/时间字符串到指定格式字符串
export function formatTime(
  rawTime: dayjs.ConfigType,
  format: string = "YYYY-MM-DD HH:mm:ss",
) {
  return dayjs(rawTime).format(format);
}

// 获取最近7天
export function getTodayByBeforeSevenDay() {
  const currentDay = dayjs();
  const weekendDays = [];
  for (let i = 0; i < 7; i++) {
    weekendDays.push(currentDay.subtract(i, "day").format("YYYY-MM-DD"));
  }
  return weekendDays.reverse();
}

// 获取两个日期间的日期
export function getDatesInRange(startDate: any, endDate: any) {
  const dates = [];
  let currentDate = dayjs(startDate);

  while (currentDate.isBefore(endDate) || currentDate.isSame(endDate, "day")) {
    dates.push(currentDate.format("YYYY-MM-DD"));
    currentDate = currentDate.add(1, "day");
  }

  return dates;
}
