import { Logger } from "winston";
import ISkill from "../Interface/ISkill";
import SkillRepository from "./SkillRepository";

describe("SkillRepository", () => {

	beforeEach(() => {
		this.repository = new SkillRepository();
	});

	test("getSkillbyNameHappyPath", () => {
		const expectedSkill: ISkill = {
			name: "Portal",
			elements: ["Air"],
			level: "Master",
			type: "Skill",
			description: "Once/level you may open a Portal from your current location to anywhere on your current Plane that you are familiar with. To open a Portal you must designate a roughly doorway sized opening as the Portal and somehow mark that it is an active Portal (such as hanging a cloak from a tree/doorway). A Portal will last for one minute. To use the Portal you must touch it and perform a three-count. “One I Portal, two I Portal, three I Portal.” If your count is interrupted, your transit fails and you may try again provided the Portal is still active. Travel through a Portal is not instantaneous, but while traveling you may not perform any actions aside from talking (you may not activate items, cast spells, or use any skills even if they would only require verbal or mental ability to use). A Disenchant or any other magic-disrupting effects will destroy this Portal. You can only Portal to an area that you are familiar with. Becoming familiar with an area takes roughly 10 minutes of time and cannot be done while in combat. If you have not done this, you will not be able to Portal to your chosen destination.",
			requirements: [{ name: "Blink", level: "Master" }],
		};

		const actual: ISkill = this.repository.getSkillByName("Portal");

		expect(actual).toEqual(expectedSkill);
	});
});
