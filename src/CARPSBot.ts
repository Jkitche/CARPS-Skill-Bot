import { Client, Message } from "discord.js";
import { Logger } from "winston";
import IEmbedGenerator from "./interfaces/IEmbedGenerator.js";
import ISkillRepository from "./interfaces/ISkillRepository.js";
import IConfig from "./types/IConfig.js";

export default class CARPSSkillBot {
	private client: Client;
	private config: IConfig;
	private embedGenerator: IEmbedGenerator;
	private skillRepository: ISkillRepository;
	private logger: Logger;

	constructor(
		config: IConfig,
		client: Client,
		embedGenerator: IEmbedGenerator,
		skillRepository: ISkillRepository,
		logger: Logger,
	) {
		this.config = config;
		this.client = client;
		this.embedGenerator = embedGenerator;
		this.skillRepository = skillRepository;
		this.logger = logger;
	}

	public onReady = (): void => {
		this.logger.info(`[${this.config.botName}] Connected.`);
		this.logger.info(`Logged in as ${this.client.user.tag}`);
		this.client.user.setActivity(this.config.activity);
	}

	public onMessage = (message: Message): void => {
		const commandRegex = /\/skill\s+(.+)/g;
		const matches = commandRegex.exec(message.content);
		if (matches) {
			const skill = this.skillRepository.getSkillByName(matches[1]);
			const embed = this.embedGenerator.getSkillEmbed(skill);
			message.channel.send("ISkill Info", { embed });
		}
	}

	public onExit = () => {
		this.logger.info(`[${this.config.botName}] Process exit.`);
		this.client.destroy();
	}

	public processOnUncaughtException = (err: Error) => {
		const errorMsg = err ? err.stack || err : "";
		this.logger.error(errorMsg.toString());
	}

	public processOnUnhandledRejection = (err: Error) => {
		this.logger.error("Uncaught Promise error: \n" + err.stack);
	}

	public start(): void {
		this.logger.info("Starting bot...");

		this.client.on("error", this.logger.error);
		this.client.on("warn", this.logger.warn);
		this.client.on("ready", this.onReady);
		this.client.on("message", this.onMessage);

		this.client.login(this.config.token);

		process.on("exit", this.onExit);
		process.on("uncaughtException", this.processOnUncaughtException);
		process.on("unhandledRejection", this.processOnUnhandledRejection);
	}
}
