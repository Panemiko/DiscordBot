import Event from '../Event'

export default class ReadyEvent extends Event {
    constructor() {
        super()
        this.setEventName('ready')
    }

    async execute(): Promise<void> {
        console.log('login')
    }
}
