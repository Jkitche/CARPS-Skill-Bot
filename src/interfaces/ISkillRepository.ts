import Skill from "../SkillInterface";

export default interface ISkillRepository {

	/**
	 * @param {string} name
	 * @returns {Skill}
	 */
	getSkillByName(name: string): Skill;
}