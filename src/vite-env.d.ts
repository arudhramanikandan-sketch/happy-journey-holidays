/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_TRAVEL_ESIM_AFFILIATE_URL?: string;
  readonly [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
