import SkillLevel from "./types/SkillLevel";
import SkillType from "./types/SkillType";
import SkillRequirement from "./types/SkillRequirement";
import OneShot from "./types/OneShot";

export default interface Skill {
	name: string;
	elements: Array<Element>;
	level: SkillLevel;
	type: SkillType;
	description: string;
	requirements: Array<SkillRequirement>;
	oneshots: Array<OneShot>;
}
