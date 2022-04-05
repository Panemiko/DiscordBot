import type { App } from 'firebase-admin/app'
import type { Firestore } from '@google-cloud/firestore'
import admin from 'firebase-admin'
import { config as dotenv } from 'dotenv'
import { initializeApp } from 'firebase-admin/app'

export default class Storage {
    private static _instance: Storage
    private app!: admin.app.App
    private db!: Firestore

    private constructor() {
        this.createApplication(this.getFirebaseOptions())
        this.createDatabase()
    }

    static getInstance(): Storage {
        if (!this._instance) this._instance = new Storage()
        return this._instance
    }

    async getCollection(collectionPath: string) {
        return this.db.collection(collectionPath)
    }

    async getDocument<T>(collectionPath: string, id: string) {
        return this.db
            .collection(collectionPath)
            .doc(id) as unknown as FirebaseFirestore.DocumentReference<T>
    }

    private getFirebaseOptions(): admin.AppOptions {
        if (process.env.NODE_ENV === 'development') dotenv()
        if (
            !process.env.FIREBASE_CREDENTIALS ||
            !process.env.FIREBASE_DATABASE_URL
        )
            throw new Error('Firebase config not found')

        return {
            credential: admin.credential.cert(
                JSON.parse(process.env.FIREBASE_CREDENTIALS)
            ),
            databaseURL: process.env.FIREBASE_DATABASE_URL,
        }
    }

    private createApplication(options: admin.ServiceAccount): void {
        this.app = admin.initializeApp(options)
    }

    private createDatabase() {
        this.db = this.app.firestore()
    }
}
