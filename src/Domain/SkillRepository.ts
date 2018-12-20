import { Logger } from "winston";
import ISkill from "../Interface/ISkill";
import ISkillRepository from "../Interface/ISkillRepository";
import skills from "./skills.json";

export default class SkillRepository implements ISkillRepository {
	private skillList: ISkill[];

	constructor() {
		this.skillList = skills as ISkill[];
	}

	/**
	 * @param {string} skillName
	 * @returns {ISkill}
	 */
	public getSkillByName(skillName: string): ISkill {
		const matchedSkills: ISkill[] = this.skillList.filter((skill: ISkill) => {
			return skill.name.toLowerCase().includes(skillName.toLowerCase());
		});
		return matchedSkills[0];
	}
}
