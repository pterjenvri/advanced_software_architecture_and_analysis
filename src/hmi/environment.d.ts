declare namespace NodeJS {
  export interface ProcessEnv {
    readonly DB_HOST: string;
    readonly RABBITMQ_URL: string;
  }
}
