interface ImportMetaEnv {
  readonly VITE_APP_ID?: string;
  readonly VITE_MONITORING_URL?: string;
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '@zumer/snapdom';