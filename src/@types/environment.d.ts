declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production'
            FIREBASE_CREDENTIALS: string
            FIREBASE_DATABASE_URL: string
        }
    }
}

export {}
