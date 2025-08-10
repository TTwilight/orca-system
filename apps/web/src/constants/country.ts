/**
 * 国家/地区代码常量
 */

export interface CountryCode {
  value: string; // 国家/地区电话代码
  label: string; // 显示名称（带国旗表情符号）
  code: string; // 国家/地区简称（ISO 3166-1 alpha-2）
  en: string; // 英文名称
  zh: string; // 中文名称
  ja: string; // 日语名称
}

/**
 * 国家/地区代码列表
 */
export const COUNTRY_CODES: CountryCode[] = [
  {
    value: "+86",
    label: "🇨🇳 中国 (+86)",
    code: "CN",
    en: "China",
    zh: "中国",
    ja: "中国",
  },
  {
    value: "+1",
    label: "🇺🇸 美国 (+1)",
    code: "US",
    en: "United States",
    zh: "美国",
    ja: "アメリカ合衆国",
  },
  {
    value: "+44",
    label: "🇬🇧 英国 (+44)",
    code: "GB",
    en: "United Kingdom",
    zh: "英国",
    ja: "イギリス",
  },
  {
    value: "+81",
    label: "🇯🇵 日本 (+81)",
    code: "JP",
    en: "Japan",
    zh: "日本",
    ja: "日本",
  },
  {
    value: "+82",
    label: "🇰🇷 韩国 (+82)",
    code: "KR",
    en: "South Korea",
    zh: "韩国",
    ja: "韓国",
  },
  {
    value: "+65",
    label: "🇸🇬 新加坡 (+65)",
    code: "SG",
    en: "Singapore",
    zh: "新加坡",
    ja: "シンガポール",
  },
  {
    value: "+61",
    label: "🇦🇺 澳大利亚 (+61)",
    code: "AU",
    en: "Australia",
    zh: "澳大利亚",
    ja: "オーストラリア",
  },
  {
    value: "+49",
    label: "🇩🇪 德国 (+49)",
    code: "DE",
    en: "Germany",
    zh: "德国",
    ja: "ドイツ",
  },
  {
    value: "+33",
    label: "🇫🇷 法国 (+33)",
    code: "FR",
    en: "France",
    zh: "法国",
    ja: "フランス",
  },
  {
    value: "+39",
    label: "🇮🇹 意大利 (+39)",
    code: "IT",
    en: "Italy",
    zh: "意大利",
    ja: "イタリア",
  },
  {
    value: "+7",
    label: "🇷🇺 俄罗斯 (+7)",
    code: "RU",
    en: "Russia",
    zh: "俄罗斯",
    ja: "ロシア",
  },
  {
    value: "+91",
    label: "🇮🇳 印度 (+91)",
    code: "IN",
    en: "India",
    zh: "印度",
    ja: "インド",
  },
];

/**
 * 获取默认国家/地区代码
 * @returns 默认国家/地区代码（中国 +86）
 */
export function getDefaultCountryCode(): CountryCode {
  return COUNTRY_CODES[0];
}

/**
 * 根据国家/地区代码获取国家/地区信息
 * @param value 国家/地区代码
 * @returns 国家/地区信息
 */
export function getCountryByCode(value: string): CountryCode | undefined {
  return COUNTRY_CODES.find((country) => country.value === value);
}

/**
 * 根据国家/地区简称获取国家/地区信息
 * @param code 国家/地区简称
 * @returns 国家/地区信息
 */
export function getCountryByShortCode(code: string): CountryCode | undefined {
  return COUNTRY_CODES.find((country) => country.code === code.toUpperCase());
}
