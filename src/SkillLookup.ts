import Skill from './SkillInterface';
import * as skills from './skills.json';

const getSkillByName = (skillName: string) : Skill => {
	const skillList: Skill[] = JSON.parse(skills.toString());
	return skillList.filter((skill: Skill) => skill.name === skillName)[0];
}

export default getSkillByName;
