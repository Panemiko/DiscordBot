import { Firestore } from '@google-cloud/firestore'
import { config as dotenv } from 'dotenv'

export default class Storage {
    private static _instance: Storage
    private db!: Firestore

    private constructor() {
        this.createDatabase(this.getDatabaseKey())
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

    private getDatabaseKey(): FirebaseFirestore.Settings {
        if (process.env.NODE_ENV === 'development') dotenv()
        if (!process.env.FIREBASE_KEY)
            throw new Error('Firebase config not found')

        return JSON.parse(process.env.FIREBASE_KEY)
    }

    private createDatabase(key: FirebaseFirestore.Settings) {
        this.db = new Firestore(key)
    }
}
