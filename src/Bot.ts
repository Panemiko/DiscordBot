import { Client, Intents } from 'discord.js'
import Config from './Config'

export default class Bot {
    private static instance: Bot
    client!: Client

    private constructor() {
        this.createClient()
    }

    static getInstance(): Bot {
        if (!this.instance) this.instance = new Bot()
        return this.instance
    }

    async login(): Promise<void> {
        const config = await Config.getInstance().getConfig()

        await this.client.login(config.BOT_TOKEN)
    }

    private async createClient(): Promise<void> {
        this.client = new Client({
            intents: new Intents(32767),
        })
    }
}
