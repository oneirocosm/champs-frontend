export {};

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PG_USER: string;
            PG_HOST: string;
            PG_DB: string;
            PG_PASSWORD: string;
            PG_PORT: string;
        }
    }
}