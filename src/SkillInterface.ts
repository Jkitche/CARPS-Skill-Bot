import SkillRequirement from "./types/SkillRequirement";

export type SkillLevel = "Basic" | "Expert" | "Master" | "Grand Master";
export type SkillType = "Skill" | "One Shot";
export type Element = "Air" | "Fire" | "Water" | "Earth";

export default interface Skill {
	name: string;
	elements: Array<Element>;
	level: SkillLevel;
	type: SkillType;
	description: string;
	requirements: Array<SkillRequirement>;
}
