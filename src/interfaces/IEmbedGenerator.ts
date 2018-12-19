import ISkill from "../SkillInterface";
import ISkillEmbed from "../types/ISkillEmbed";

export default interface IEmbedGenerator {

	/**
	 * @param {ISkill} skill
	 * @returns {ISkillEmbed}
	 */
	getSkillEmbed(skill: ISkill): ISkillEmbed;
}