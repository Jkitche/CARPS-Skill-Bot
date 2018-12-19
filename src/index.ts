import CARPSSkillBot from './bot';
import EmbedGenerator from './EmbedGenerator';
import SkillRepository from './SkillRepository';

const bot: CARPSSkillBot = new CARPSSkillBot(
	new EmbedGenerator(),
	new SkillRepository()
);

bot.start();
