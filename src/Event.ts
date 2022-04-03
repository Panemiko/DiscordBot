import type { ClientEvents } from 'discord.js'

export default abstract class Event {
    private eventName!: keyof ClientEvents

    abstract execute(): Promise<void>

    protected async setEventName(eventName: keyof ClientEvents): Promise<void> {
        this.eventName = eventName
    }

    getEventName() {
        return this.eventName
    }
}
