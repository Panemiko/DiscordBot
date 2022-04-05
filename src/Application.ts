import Bot from './Bot'
import Config from './Config'
import Storage from './Storage'

export default class Application {
    constructor() {
        Bot.getInstance()
        Config.getInstance()
        Storage.getInstance()
    }

    async run(): Promise<void> {
        await Bot.getInstance().login()
    }
}
