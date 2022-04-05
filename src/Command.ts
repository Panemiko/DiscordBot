import type { SlashCommandBuilder } from '@discordj/builders'

export default abstract class Command {
    abstract data: SlashCommandBuilder
}
