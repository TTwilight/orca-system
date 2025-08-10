// business id
// eslint-disable-next-line no-undef
export const AppBusinessId = APP_BUSINESS_ID;
// eslint-disable-next-line no-undef
export const AppApiTraceSourceToken = APP_API_TRACESOURCE_TOKEN;
// eslint-disable-next-line no-undef
export const AppApiTraceSourceType = APP_API_TRACESOURCE_TYPE;
// export const AppBusinessId = '300111';
export const AppActionFrom = "PC";

// 图片上传url
/* eslint-disable no-undef */
// 上传压缩
export const IMAGE_UPLOAD_URL = `${APP_UPLOAD_BASE_PATH || ""}/goods/uploadImgWithoutUser`;
// 上传原图
export const IMAGE_RAW_UPLOAD_URL = `${
  APP_UPLOAD_BASE_PATH || ""
}/goods/uploadImgOriginWithoutUser`;
// 上传视频
export const VIDEO_UPLOAD_URL = `${APP_UPLOAD_BASE_PATH || ""}/goods/uploadVideoWithoutUser`;
/* eslint-enable no-undef */
