import { DatePicker, GetProps } from "antd";
import dayjs, { Dayjs } from "dayjs";

type RangePickerProps = GetProps<typeof DatePicker.RangePicker>;

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

// eslint-disable-next-line arrow-body-style
const disabledDate: RangePickerProps["disabledDate"] = (current: Dayjs) => {
  // Can not select days before today and today
  // console.log('ccc ', current.format('YYYY-MM-DD HH:mm:ss'));
  // console.log('ccc now  ', dayjs().startOf('day').format('YYYY-MM-DD HH:mm:ss'));
  // console.log('ccc222 ', current && current <= dayjs().startOf('day'));
  return current && current < dayjs().startOf("day");
};

const disabledRangeTime: RangePickerProps["disabledTime"] = (
  current: any,
  type: any,
) => {
  const now = dayjs();
  const hours = now.hour();
  const minutes = now.minute();
  const seconds = now.second();

  // 没有选择时禁止当前时间以前
  if (!current) {
    return {
      disabledHours: () => range(0, hours),
      disabledMinutes: () => range(0, minutes),
      disabledSeconds: () => range(0, seconds),
    };
  }

  // console.log('111 ', current, current?.hour(), hours);
  if (current && current <= now.endOf("day") && current.hour() <= hours) {
    // console.log('1111---laile ');
    if (type === "start") {
      return {
        disabledHours: () => range(0, hours),
        disabledMinutes: () => range(0, minutes),
        disabledSeconds: () =>
          current.minute() === minutes ? range(0, seconds) : [],
      };
    } else {
      return {
        disabledHours: () => range(0, hours),
        disabledMinutes: () => range(0, minutes + 5),
        disabledSeconds: () => [],
      };
    }
  } else {
    return {
      disabledHours: () => [],
      disabledMinutes: () => [],
      disabledSeconds: () => [],
    };
  }
};

// 禁止当前时间以前
export const AntdRangePickerCommonCurrentDisable: Pick<
  RangePickerProps,
  "disabledDate" | "disabledTime"
> = {
  disabledDate,
  disabledTime: disabledRangeTime,
};
