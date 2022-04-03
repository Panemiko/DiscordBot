import Storage from './Storage'

export default class Config {
    private static _instance: Config

    private constructor() {}

    static getInstance(): Config {
        if (!this._instance) this._instance = new Config()
        return this._instance
    }

    async getConfig() {
        return await Storage.getInstance().query<Configuration>('settings')
    }
}

export interface Configuration {
    BOT_TOKEN: string
}
