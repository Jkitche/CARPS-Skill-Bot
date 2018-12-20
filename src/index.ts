import { Client } from "discord.js";
import winston, { Logger } from "winston";
import * as jsonConfig from "../config.json";
import CARPSSkillBot from "./CARPSBot";
import EmbedGenerator from "./EmbedGenerator";
import SkillRepository from "./SkillRepository";
import IConfig from "./types/IConfig";

const config: IConfig = jsonConfig as IConfig;

const logger: Logger = winston.createLogger({
	level: "info",
	format: winston.format.json(),
	transports: [
		new winston.transports.File({ filename: "error.log", level: "error" }),
		new winston.transports.File({ filename: "combined.log" }),
	],
});

if (process.env.NODE_ENV !== "production") {
	logger.add(new winston.transports.Console({
		format: winston.format.simple(),
	}));
}

const bot: CARPSSkillBot = new CARPSSkillBot(
	config,
	new Client(),
	new EmbedGenerator(
		logger,
	),
	new SkillRepository(
		logger,
	),
	logger,
);

bot.start();
