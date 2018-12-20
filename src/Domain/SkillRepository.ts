import { Logger } from "winston";
import ISkill from "../Interface/ISkill";
import ISkillRepository from "../Interface/ISkillRepository";
import skills from "../skills.json";

export default class SkillRepository implements ISkillRepository {
	private logger: Logger;

	constructor(logger: Logger) {
		this.logger = logger;
	}

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
