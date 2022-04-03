export default class Bot {

    private static instance: Bot

    private constructor() {

    }

    static getInstance() {
        if (!this.instance) this.instance = new Bot()
        return this.instance
    }

}
