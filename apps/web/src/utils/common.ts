export function normlizeArrToMap<T>(
  rawArr: T[],
  mapKey: keyof T,
): Record<string, T> {
  const result: Record<string, T> = {};

  for (let item of rawArr) {
    const key = (item as any)[mapKey];
    if (key) {
      result[key] = item;
    }
  }

  return result;
}

// 用于合并数组item
export function mergeDynamicArr<T>(
  dynamicItems: T[],
  initItems: T[] = [],
  uniqueAttr: keyof T,
): T[] {
  if (!Array.isArray(dynamicItems)) {
    return initItems;
  }
  const dynamicItemsMap = new Map<string, T>();
  dynamicItems.forEach((item: T) => {
    const uniqueKey = item[uniqueAttr] as string;
    dynamicItemsMap.set(uniqueKey, item);
  });
  if (Array.isArray(initItems) && initItems.length > 0) {
    const computeItems = initItems.map((item) => {
      const uniqueKey = item[uniqueAttr] as string;
      const dynamicItem = dynamicItemsMap.get(uniqueKey);
      if (dynamicItem) {
        return {
          ...item,
          ...dynamicItem,
        };
      }

      return item;
    });

    return computeItems;
  } else {
    return dynamicItems;
  }
}

// 解析query参数
export function parseUrlSearch(rawUrl: string) {
  // const u = new URL(url);
  // const s = new URLSearchParams(u.search);
  // const obj = {};
  // s.forEach((v, k) => (obj[k] = v));
  // return obj;
  // 定义一个 parse url.search 的方法
  function parse(url: string) {
    const obj: Record<string, any> = {};
    url.replace(/([^?&=]+)=([^&]+)/g, (_, k, v) => (obj[k] = v));
    return obj;
  }
  const rawUrl2 = rawUrl.split("#").shift() || "";
  return parse(rawUrl2);
}

// url参数search/hash转json
export function urlParamToJson(v: string) {
  let res;
  let myJson: any = {};
  let arr = v.slice(v.indexOf("?") + 1).split("&");
  for (let i = 0; i < arr.length; i++) {
    res = arr[i].split("=");
    myJson[res[0]] = res[1];
  }
  return myJson;
}

function cleanArray(actual: any) {
  const newArray: any[] = [];
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i]);
    }
  }
  return newArray;
}

// obj转url参数
export function paramsObjToString(rawData: any): string {
  if (!rawData) return "";
  return cleanArray(
    Object.keys(rawData).map((key) => {
      if (rawData[key] === undefined) return "";
      return encodeURIComponent(key) + "=" + encodeURIComponent(rawData[key]);
    }),
  ).join("&");
}

/**
 * Converts an array of objects with label and value properties to a Record map
 * @param arr Array of objects with label and value properties
 * @returns Record with value as key and label as value
 */
export const convertArrayToMap = <T extends { label: string; value: string }>(
  arr: T[],
): Record<string, string> => {
  return arr.reduce(
    (acc, item) => {
      if (item.value !== "") {
        acc[item.value] = item.label;
      }
      return acc;
    },
    {} as Record<string, string>,
  );
};
