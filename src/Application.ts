import Bot from './Bot'
import Storage from './Storage'

export default class Application {
    constructor() {
        Bot.getInstance()
        Storage.getInstance()
    }

    async run(): Promise<void> {
        await Bot.getInstance().login()
    }
}
