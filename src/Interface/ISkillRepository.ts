import ISkill from "./ISkill";

export default interface ISkillRepository {

	/**
	 * @param {string} name
	 * @returns {ISkill}
	 */
	getSkillByName(name: string): ISkill;
}
