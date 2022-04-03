import { config as dotenv } from 'dotenv'
import type { FirebaseOptions } from 'firebase/app'

export default class Config {

    config!: Configuration

    constructor() {
        this.setupDotenv()
        this.verifyKeys()
        this.setupConfig()
    }

    async setupDotenv() {
        if (process.env.NODE_ENV === 'development') dotenv()
    }

    async verifyKeys() {
        if (!process.env.FIREBASE_CONFIG) {
            throw new Error('Firebase settings not found in FIREBASE_CONFIG')
        }
    }

    async setupConfig() {
        this.config = {
            firebaseConfig: JSON.parse(process.env.FIREBASE_CONFIG)
        }
    }

    getConfig(): Configuration {
        return this.config
    }

}

export interface Configuration {
    firebaseConfig: FirebaseOptions
}
