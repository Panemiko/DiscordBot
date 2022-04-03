import type { FirebaseApp } from 'firebase/app'
import { initializeApp } from 'firebase/app'

export default class Storage {

    private static _instance: Storage
    app: FirebaseApp

    private constructor() {
        this.app = initializeApp({

        }, 'caputao-comunismo')
    }

    static getInstance() {
        if (!this._instance) this._instance = new Storage()
        return this._instance
    }

}
