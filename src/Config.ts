import Storage from './Storage'

export default class Config {

    private static _instance: Config

    private constructor() { }

    static getInstance(): Config {
        if (!this._instance) this._instance = new Config()
        return this._instance
    }

    async getConfig(): Promise<Configuration> {
        const storage = Storage.getInstance()
        const collection = await storage.getCollection('settings')
        return await storage.getDocuments<Configuration>(collection)[0]
    }

}

export interface Configuration {
    BOT_TOKEN: string
}
