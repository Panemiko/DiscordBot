import Bot from './Bot'

export default class Application {

    bot: Bot

    constructor() {
        this.bot = Bot.getInstance()
    }

    async run() {

    }

}
