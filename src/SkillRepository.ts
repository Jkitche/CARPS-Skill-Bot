import Skill from './SkillInterface';
import * as skills from './skills.json';
import ISkillRepository from './interfaces/ISkillRepository';


export default class SkillRepository implements ISkillRepository {

	/**
	 * @param {string} skillName
	 * @returns {Skill}
	 */
	public getSkillByName(skillName: string): Skill {
		const skillList: Array<Skill> = skills as Array<Skill>;
		const matchedSkills: Array<Skill> = skillList.filter(
			(skill: Skill) => {
				const contains = skill.name.toLowerCase().includes(skillName.toLowerCase());
				return contains;
			}
		);
		return matchedSkills[0];
	}
}