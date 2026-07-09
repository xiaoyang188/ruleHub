/**
 * 站点功能开关。预览阶段仅开放浏览，隐藏登录、收藏、下载等需账号的能力。
 * 正式上线时将 IS_PREVIEW_MODE 设为 false 即可恢复。
 */
export const IS_PREVIEW_MODE = true;

export const siteFeatures = {
  /** 多语言切换尚未就绪，暂时隐藏 */
  showLocaleSwitcher: false,
  showAuth: !IS_PREVIEW_MODE,
  showFavorites: !IS_PREVIEW_MODE,
  showDownloads: !IS_PREVIEW_MODE,
  showManus: !IS_PREVIEW_MODE,
  showPublishDocs: !IS_PREVIEW_MODE,
  showApiAuthDocs: !IS_PREVIEW_MODE,
  showApiDocs: !IS_PREVIEW_MODE,
} as const;
