<<<<<<< Updated upstream:src/Interface/ISkillRepository.ts
import ISkill from "./ISkill";
=======
import ISkill from "../types/SkillInterface";
>>>>>>> Stashed changes:src/interfaces/ISkillRepository.ts

export default interface ISkillRepository {

	/**
	 * @param {string} name
	 * @returns {ISkill}
	 */
	getSkillByName(name: string): ISkill;
}
