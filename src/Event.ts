export default abstract class Event {
    abstract execute(): Promise<void>
}
