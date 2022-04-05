import Bot from '../Bot'
import Config from '../Config'
import Event from '../Event'
import color from 'colorts'
import logger from '../logger'

export default class ReadyEvent extends Event {
    constructor() {
        super()
        this.setEventName('ready')
    }

    async execute(): Promise<void> {
        const bot = Bot.getInstance()
        const botUser = bot.client.user
        const { name, type, status } = (await Config.getInstance().getConfig())
            .presence

        await bot.updatePresence(name, type, status)

        logger.info(
            `${color('Bot presence set to').green} ${
                color(`${type} ${name}`).blue
            }`
        )

        logger.info(
            `${color('Bot Started as').green} ${
                color(`${botUser?.username}#${botUser?.discriminator}`).blue
            }`
        )
    }
}
