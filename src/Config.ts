import type { FirebaseOptions } from 'firebase/app'

export default class Config {

    config: Configuration

    constructor() {
        if (!process.env.FIREBASE_CONFIG) {
            throw new Error('Firebase settings not found in FIREBASE_CONFIG')
        }

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
