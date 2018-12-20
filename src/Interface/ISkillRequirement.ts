<<<<<<< Updated upstream:src/Interface/ISkillRequirement.ts
import { SkillLevel } from "./ISkill";

export default interface ISkillRequirement {
	name: string;
	level: SkillLevel;
=======
import { SkillLevel } from "./SkillInterface";

export default interface ISkillRequirement {
	name: string;
	level: SkillLevel | string;
>>>>>>> Stashed changes:src/types/ISkillRequirement.ts
}
