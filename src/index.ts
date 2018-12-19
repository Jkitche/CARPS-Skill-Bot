import { Client } from 'discord.js';
import CARPSSkillBot from './bot';
import * as jsonConfig from '../config.json';
import EmbedGenerator from './EmbedGenerator';
import SkillRepository from './SkillRepository';
import Config from './types/Config';

const config: Config = jsonConfig;

const bot: CARPSSkillBot = new CARPSSkillBot(
	config,
	new Client(),
	new EmbedGenerator(),
	new SkillRepository()
);

bot.start();
