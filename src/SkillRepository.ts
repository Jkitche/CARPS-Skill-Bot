import ISkillRepository from "./interfaces/ISkillRepository";
import ISkill from "./SkillInterface";
import * as skills from "./skills.json";

export default class SkillRepository implements ISkillRepository {

	/**
	 * @param {string} skillName
	 * @returns {ISkill}
	 */
	public getSkillByName(skillName: string): ISkill {
		const skillList: ISkill[] = skills as ISkill[];
		const matchedSkills: ISkill[] = skillList.filter((skill: ISkill) => {
			return skill.name.toLowerCase().includes(skillName.toLowerCase());
		});
		return matchedSkills[0];
	}
}
