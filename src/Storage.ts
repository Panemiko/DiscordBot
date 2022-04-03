import type {
    CollectionReference,
    DocumentData,
    Firestore,
    QueryDocumentSnapshot,
    QuerySnapshot,
} from 'firebase/firestore/lite'
import type { FirebaseApp, FirebaseOptions } from 'firebase/app'
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite'
import { config as dotenv } from 'dotenv'
import { initializeApp } from 'firebase/app'

export default class Storage {
    private static _instance: Storage
    private app!: FirebaseApp
    private db!: Firestore

    private constructor() {
        this.createApp(this.getDbConfig())
        this.createDatabase()
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

    async getCollection<T = DocumentData>(
        collectionName: string
    ): Promise<CollectionReference<T>> {
        return collection(
            this.getDatabase(),
            collectionName
        ) as CollectionReference<T>
    }

    async getDocuments(
        collection: CollectionReference<DocumentData>
    ): Promise<QueryDocumentSnapshot[]> {
        return (await getDocs(collection)).docs
    }

    async queryCollection<T>(
        collectionName: string
    ): Promise<QuerySnapshot<T>> {
        const collection = await this.getCollection<T>(collectionName)
        return await getDocs(collection)
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

    private async createDatabase(): Promise<void> {
        this.db = getFirestore(this.app)
    }
}
