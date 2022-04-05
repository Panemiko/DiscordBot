import type { ExcludeEnum, PresenceStatusData } from 'discord.js'
import type { ActivityTypes } from 'discord.js/typings/enums'
import Storage from './Storage'

export default class Config {
    private static _instance: Config

    private constructor() {}

    static getInstance(): Config {
        if (!this._instance) this._instance = new Config()
        return this._instance
    }

    async getConfig() {
        const storage = Storage.getInstance()
        const doc = await storage.getDocument<Configuration>(
            'settings',
            'settings'
        )

        const docData = (await doc.get()).data()
        if (!doc || !docData) throw new Error('Settings null')

        return docData
    }
}

export interface Configuration {
    botToken: string
    presence: {
        name: string
        type: ExcludeEnum<typeof ActivityTypes, 'CUSTOM'>
        status: PresenceStatusData
    }
}
