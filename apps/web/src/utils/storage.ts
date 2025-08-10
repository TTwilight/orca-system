const APP_NAME = "orca-system";
const APP_AUTH_SESSION_TOKEN = `${APP_NAME}_app_auth_session_token`;

export function GetSessionToken() {
  return localStorage.getItem(APP_AUTH_SESSION_TOKEN);
}
export function SetSessionToken(token: string) {
  return localStorage.setItem(APP_AUTH_SESSION_TOKEN, token || "");
}
export function RemoveSessionToken() {
  return localStorage.removeItem(APP_AUTH_SESSION_TOKEN);
}

// 获取应用存储的key
// 如果key不以应用名开头，则添加应用名作为前缀
// 例如：ticket-pc_userInfo -> ticket-pc_ticket-pc_userInfo
function wrapAppStorageKey(key: string) {
  return key.startsWith(APP_NAME) ? key : `${APP_NAME}_${key}`;
}

// 获取应用存储的值
export function GetAppLocalStorageItem(key: string) {
  const newKey = wrapAppStorageKey(key);
  return localStorage.getItem(newKey);
}
// 设置应用存储的值
export function SetAppLocalStorageItem(key: string, value: string) {
  const newKey = wrapAppStorageKey(key);
  return localStorage.setItem(newKey, value || "");
}
// 移除应用存储的值
export function RemoveAppLocalStorageItem(key: string) {
  const newKey = wrapAppStorageKey(key);
  return localStorage.removeItem(newKey);
}

// 清除应用本地存储的所有数据
export function ClearAppLocalStorage() {
  const keys = Object.keys(localStorage);
  keys.forEach((key) => {
    if (key.startsWith(APP_NAME)) {
      localStorage.removeItem(key);
    }
  });
}
