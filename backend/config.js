process.loadEnvFile();

export const DEFAULTS = {
  LIMIT_PAGINATION: 10,
  LIMIT_OFFSET: 0,
  PORT: 3000
};

export const CONFIG = {
  AI_MODEL: process.env.AI_MODEL ?? '',
  GEMINI_BASE_URL: process.env.GEMINI_BASE_URL ?? '',
  GEMINI_API_KEY: process.env.GEMINI_API_KEY ?? '',
};