import ISkill from "../SkillInterface";

export default interface ISkillRepository {

	/**
	 * @param {string} name
	 * @returns {ISkill}
	 */
	getSkillByName(name: string): ISkill;
}