import { Client, Intents } from 'discord.js'
import type { ExcludeEnum, PresenceStatusData } from 'discord.js'
import type { ActivityTypes } from 'discord.js/typings/enums'
import type Command from './Command'
import Config from './Config'
import type Event from './Event'
import PingCommand from './commands/Ping'
import { REST } from '@discordjs/rest'
import ReadyEvent from './events/Ready'
import { Routes } from 'discord-api-types/v9'

export default class Bot {
    private static _instance: Bot
    commands!: Command[]
    client!: Client

    private constructor() {
        this.createClient()
    }

    static getInstance(): Bot {
        if (!this._instance) this._instance = new Bot()
        return this._instance
    }

    async login(): Promise<void> {
        const config = await Config.getInstance().getConfig()

        await this.createEvents()

        await this.client.login(config.botToken)
    }

    async createEvents() {
        this.registerEvent(new ReadyEvent())
    }

    async createCommands() {
        this.registerCommand(new PingCommand())
    }

    async registerEvent(handler: Event): Promise<void> {
        this.client.on(handler.getEventName(), handler.execute)
    }

    async registerCommand(command: Command) {
        if (!this.commands) this.commands = []
        this.commands.push(command)
    }

    async registerServerCommand(id: string) {
        const config = await Config.getInstance().getConfig()
        const rest = new REST({ version: '9' }).setToken(config.botToken)

        if (!this.client.user) throw new Error('Bot not initialized')
        if (!this.commands) throw new Error('No command found')

        const commandData = []
        for (const command of this.commands) {
            commandData.push((await command.getData()).toJSON())
        }

        await rest.put(
            Routes.applicationGuildCommands(this.client.user.id, id),
            { body: commandData }
        )
    }

    async updatePresence(
        name: string,
        type: ExcludeEnum<typeof ActivityTypes, 'CUSTOM'>,
        status?: PresenceStatusData
    ) {
        this.client.user?.setPresence({
            activities: [
                {
                    name,
                    type,
                },
            ],
            status,
        })
    }

    private async createClient(): Promise<void> {
        this.client = new Client({
            intents: new Intents(32767),
        })
    }
}
