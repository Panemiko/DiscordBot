import Bot from '../Bot'
import Event from '../Event'
import color from 'colorts'
import logger from '../logger'

export default class ReadyEvent extends Event {
    constructor() {
        super()
        this.setEventName('ready')
    }

    async execute(): Promise<void> {
        const bot = Bot.getInstance().client

        logger.info(
            `${color('Bot Started as').green} ${
                color(`${bot.user?.username}#${bot.user?.discriminator}`).blue
            }`
        )
    }
}
