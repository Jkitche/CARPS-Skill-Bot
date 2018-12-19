import SkillEmbed from "../types/SkillEmbed";
import Skill from "../SkillInterface";

export default interface IEmbedGenerator {

	/**
	 * @param {Skill} skill
	 * @returns {SkillEmbed}
	 */
	getSkillEmbed(skill: Skill): SkillEmbed;
}