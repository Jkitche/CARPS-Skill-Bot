export interface SkillLevel {
	level: "Basic" | "Expert" | "Master" | "Grand Master"
}

export interface SkillType {
	type: "Skill" | "One Shot";
}

export interface SkillRequirement {
	skillName: string;
	level: SkillLevel;
}

export interface Element {
	name: string;
}

export interface OneShot {
	name: string;
	level: SkillLevel;
	description: string;
}

export default interface Skill {
	name: string;
	elements: Array<Element>;
	level: SkillLevel;
	type: SkillType;
	description: string;
	requirements: Array<SkillRequirement>;
	oneshots: Array<OneShot>;
}