interface ImportMetaEnv extends Readonly<Record<string, string>> {
  readonly VITE_APP_NAME: string;
  readonly VITE_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  parsePathDataString: (path: string) => { type: string; values: number[] }[];
  supabase: SupabaseClient;
}
