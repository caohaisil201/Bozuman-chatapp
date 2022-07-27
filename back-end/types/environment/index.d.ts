export {};

declare global{
  namespace NodeJS{
    interface ProcessEnv{
      DB_USERNAME: string;
      DB_PASSWORD: string;
      DB_CLUSTER: string;
      DB_NAME: string;
      
      PROJECT_DOMAIN: string;
      PORT: number;
      PRIVATE_KEY: string;
      EMAIL_NAME: string;
      EMAIL_PASS: string;
      
      SECRET: string;
      SECRET_REFRESH: string;
    }
  }
}
