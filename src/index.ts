import { Client } from "discord.js";
import winston, { Logger } from "winston";
import * as jsonConfig from "../config.json";
import CARPSBot from "./Application/CARPSBot";
import EmbedGenerator from "./Domain/EmbedGenerator";
import SkillRepository from "./Domain/SkillRepository";
import IConfig from "./Interface/IConfig";

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

const bot: CARPSBot = new CARPSBot(
	config,
	new Client(),
	new EmbedGenerator(
		logger,
	),
	new SkillRepository(),
	logger,
);

bot.start();
