import ISkillRequirement from "./ISkillRequirement";

export type SkillLevel = "Basic" | "Expert" | "Master" | "Grand Master";
export type SkillType = "Skill" | "One Shot";
export type Element = "Air" | "Fire" | "Water" | "Earth";

export default interface ISkill {
	name: string;
	elements: Element[];
	level: SkillLevel;
	type: SkillType;
	description: string;
	descriptionExt: string|null;
	requirements: ISkillRequirement[];
}
