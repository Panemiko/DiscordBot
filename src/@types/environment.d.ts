declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production'
            FIREBASE_CONFIG: string
        }
    }
}

export { }

