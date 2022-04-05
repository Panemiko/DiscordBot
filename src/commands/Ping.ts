import Command from '../Command'
import { SlashCommandBuilder } from '@discordjs/builders'

export default class PingCommand extends Command {
    constructor() {
        super()
        this.setData(
            new SlashCommandBuilder().setName('ping').setDescription(
                // eslint-disable-next-line max-len
                'Replies with the time in miliseconds between the request and response'
            )
        )
    }

    async execute(): Promise<void> {}
}
