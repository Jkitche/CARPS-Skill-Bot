import { Client, Message } from 'discord.js';
import * as config from '../config.json';
import IEmbedGenerator from './interfaces/IEmbedGenerator.js';
import ISkillRepository from './interfaces/ISkillRepository.js';

export default class CARPSSkillBot {
	private client: Client;
	private config: any;
	private embedGenerator: IEmbedGenerator;
	private skillRepository: ISkillRepository;

	constructor(embedGenerator: IEmbedGenerator, skillRepository: ISkillRepository) {
		this.client = new Client();
		this.config = config;
		this.embedGenerator = embedGenerator;
		this.skillRepository = skillRepository;
	}

	private onReady(): void {
		console.log(`[${ this.config.settings.nameBot }] Connected.`);
		console.log(`Logged in as ${ this.client.user.tag }`);
		this.client.user.setActivity(this.config.settings.activity);
	}

	private onMessage = (message: Message): void => {
		const skill = this.skillRepository.getSkillByName(message.content);
		const embed = this.embedGenerator.getSkillEmbed(skill);
		message.channel.send('Skill Info', { embed });
	}

	private onExit = () => {
		console.log(`[${ this.config.settings.nameBot }] Process exit.`);
		this.client.destroy();
	}
	
	private processOnUncaughtException = (err: Error) => {
		const errorMsg = err ? err.stack || err : '';
		console.log(errorMsg)
	}

	private processOnUnhandledRejection = (err: Error) => {
		console.log('Uncaught Promise error: \n' + err.stack);
	}

	public start(): void {
		console.log('Starting bot...');

		this.client.on('error', console.error);
		this.client.on('warn', console.warn);
		this.client.on('ready', this.onReady);
		this.client.on('message', this.onMessage);

		this.client.login(this.config.settings.token);

		process.on('exit', this.onExit);
		process.on('uncaughtException', this.processOnUncaughtException);
		process.on('unhandledRejection', this.processOnUnhandledRejection);
	}
}