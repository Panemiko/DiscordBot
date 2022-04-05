import type { SlashCommandBuilder } from '@discordjs/builders'

export default abstract class Command {
    data!: SlashCommandBuilder

    abstract execute(): Promise<void>

    protected async setData(data: SlashCommandBuilder): Promise<void> {
        this.data = data
    }

    async getData(): Promise<SlashCommandBuilder> {
        return this.data
    }
}
