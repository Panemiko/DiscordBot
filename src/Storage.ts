import { config as dotenv } from 'dotenv'
import type { FirebaseApp, FirebaseOptions } from 'firebase/app'
import { initializeApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore/lite'

export default class Storage {

    private static _instance: Storage
    private app!: FirebaseApp
    private db!: Firestore

    private constructor() {
        this.createApp(this.getDbConfig())
        this.createFirestore()
    }

    static getInstance(): Storage {
        if (!this._instance) this._instance = new Storage()
        return this._instance
    }

    getApplication(): FirebaseApp {
        return this.app
    }

    getDatabase(): Firestore {
        return this.db
    }

    private getDbConfig(): FirebaseOptions {
        if (process.env.NODE_ENV === 'development') dotenv()
        if (!process.env.FIREBASE_CONFIG)
            throw new Error('Firebase config not found')

        return JSON.parse(process.env.FIREBASE_CONFIG)
    }

    private async createApp(config: FirebaseOptions): Promise<void> {
        this.app = initializeApp(config, 'caputao-comunismo')
    }

    private async createFirestore(): Promise<void> {
        this.db = getFirestore(this.app)
    }

}

export interface Configuration {
    BOT_TOKEN: string
}
