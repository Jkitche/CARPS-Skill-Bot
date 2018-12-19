import Skill from './SkillInterface';
import * as skills from './skills.json';
import ISkillRepository from './interfaces/ISkillRepository';


export default class SkillRepository implements ISkillRepository {

	/**
	 * @param {string} skillName
	 * @returns {Skill}
	 */
	public getSkillByName(skillName: string): Skill {
		const skillList: Skill[] = JSON.parse(skills.toString());
		return skillList.filter((skill: Skill) => skill.name === skillName)[0];
	}
}