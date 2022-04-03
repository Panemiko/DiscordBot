import Storage from './Storage'

export default class Config {
    private static _instance: Config

    private constructor() {}

    static getInstance(): Config {
        if (!this._instance) this._instance = new Config()
        return this._instance
    }

    async getConfig() {
        const docs = await Storage.getInstance().query<Configuration>(
            'settings'
        )

        if (docs.empty) throw new Error('Settings null')

        return docs.docs[0].data()
    }
}

export interface Configuration {
    BOT_TOKEN: string
}
