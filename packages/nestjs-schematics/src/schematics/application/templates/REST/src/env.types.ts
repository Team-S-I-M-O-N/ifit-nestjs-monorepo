export interface IEnv {
  /* General ENV */
  PORT: number
  PROJECT_NAME: string
  /* Database ENV */
  DATABASE_URL: string
  DB_AUTH: string
  DB_PORT: number
  /* AWS ENV */
  AWS_REGION: string
  /* Ifit ENV */
  IFIT_API_CLIENT_ID: string
  IFIT_API_CLIENT_SECRET: string
  IFIT_API_ENDPOINT: string
  IFIT_GATEWAY_ENDPOINT: string
  /* Llama ENV */
  LLAMA_LE_TOKEN: string
  LLAMA_LOG_LEVEL: string
  /* Beaker ENV */
  BEAKER_USER_ID: string
  BEAKER_USER_PASSWORD: string
  FLENDERSON_URI: string
}
