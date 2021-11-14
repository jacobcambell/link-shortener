declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            JWT_SECRET: string;
        }
    }
}

export { }

// https://stackoverflow.com/questions/45194598/using-process-env-in-typescript