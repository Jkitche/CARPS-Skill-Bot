import { Client, Message } from 'discord.js';
import IEmbedGenerator from './interfaces/IEmbedGenerator.js';
import ISkillRepository from './interfaces/ISkillRepository.js';
import Config from './types/Config.js';

export default class CARPSSkillBot {
	private client: Client;
	private config: Config;
	private embedGenerator: IEmbedGenerator;
	private skillRepository: ISkillRepository;

	constructor(config: Config, client: Client, embedGenerator: IEmbedGenerator, skillRepository: ISkillRepository) {
		this.config = config;
		this.client = client;
		this.embedGenerator = embedGenerator;
		this.skillRepository = skillRepository;
	}

	onReady = (): void => {
		console.log(`[${this.config.botName}] Connected.`);
		console.log(`Logged in as ${this.client.user.tag}`);
		this.client.user.setActivity(this.config.activity);
	}

	onMessage = (message: Message): void => {
		const commandRegex = /\/skill\s+(.+)/g;
		const matches = commandRegex.exec(message.content);
		if (matches) {
			const skill = this.skillRepository.getSkillByName(matches[1]);
			const embed = this.embedGenerator.getSkillEmbed(skill);
			message.channel.send('Skill Info', { embed });
		}
	}

	onExit = () => {
		console.log(`[${this.config.botName}] Process exit.`);
		this.client.destroy();
	}
	
	processOnUncaughtException = (err: Error) => {
		const errorMsg = err ? err.stack || err : '';
		console.log(errorMsg)
	}

	processOnUnhandledRejection = (err: Error) => {
		console.log('Uncaught Promise error: \n' + err.stack);
	}

	public start(): void {
		console.log('Starting bot...');

		this.client.on('error', console.error);
		this.client.on('warn', console.warn);
		this.client.on('ready', this.onReady);
		this.client.on('message', this.onMessage);

		this.client.login(this.config.token);

		process.on('exit', this.onExit);
		process.on('uncaughtException', this.processOnUncaughtException);
		process.on('unhandledRejection', this.processOnUnhandledRejection);
	}
}