import ISkill from "./ISkill";
import ISkillEmbed from "./ISkillEmbed";

export default interface IEmbedGenerator {

	/**
	 * @param {ISkill} skill
	 * @param {Date} timestamp
	 * @returns {ISkillEmbed}
	 */
	getSkillEmbed(skill: ISkill, timestamp: Date): ISkillEmbed;
}
