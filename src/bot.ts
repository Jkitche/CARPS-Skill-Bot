import { Client, Message } from 'discord.js';
import * as debug from 'debug';
import * as config from '../config.json';
import getSkillEmbedBySkillName from './SkillLookup';
import getSkillEmbed from './EmbedGenerator';

const logSystem = debug('bot:system');
const logEvent = debug('bot:event');
const logError = debug('bot:error');
const logWarn = debug('bot:warn');

export default class CARPSSkillBot {
	private client: Client;
	private config: any;

	constructor() {
		this.client = new Client();
		this.config = config;
	}

	public start(): void {
		logSystem('Starting bot...');

		this.client.on('error', logError);
		this.client.on('warn', logWarn);
		this.client.on('ready', () => {
			logEvent(`[${ this.config.settings.nameBot }] Connected.`);
			logEvent(`Logged in as ${ this.client.user.tag }`);
			this.client.user.setActivity(this.config.settings.activity);
		})

		this.client.on('message', (message: Message) => {
			const skill = getSkillEmbedBySkillName(message.content);
			const embed = getSkillEmbed(skill);
			message.channel.send('Skill Info', { embed });
		});

		this.client.login(this.config.settings.token);

		process.on('exit', () => {
			logEvent(`[${ this.config.settings.nameBot }] Process exit.`);
			this.client.destroy();
		})
		process.on('uncaughtException', (err: Error) => {
			const errorMsg = err ? err.stack || err : '';
			logError(errorMsg)
		})
		process.on('unhandledRejection', (err: Error) => {
			logError('Uncaught Promise error: \n' + err.stack);
		})
	}
}