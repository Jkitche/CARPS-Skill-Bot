import IEmbedGenerator from "./interfaces/IEmbedGenerator";
import ISkill from "./SkillInterface";
import ISkillEmbed from "./types/ISkillEmbed";
import ISkillRequirement from "./types/ISkillRequirement";

export default class EmbedGenerator implements IEmbedGenerator {

	/**
	 * @param {ISkill} skill
	 * @returns {ISkillEmbed}
	 */
	public getSkillEmbed(skill: ISkill): ISkillEmbed {
		const description = this.getSkillDescription(skill);

		return {
			title: skill.name,
			description,
			url: "http://carpsgame.com/printable%20forms/CARPS%20V6.4%20Final.pdf",
			timestamp: new Date(),
			footer: {
				icon_url: "http://carpsgame.com/images/icon_webheader.png",
				text: "CARPS v6.4",
			},
			thumbnail: {
				url: "http://carpsgame.com/images/icon_webheader.png",
			},
			author: {
				name: "CARPS ISkill Bot",
				url: "https://discordapp.com",
				icon_url: "http://carpsgame.com/images/icon_webheader.png",
			},
		};
	}

	/**
	 * @param {ISkill} skill
	 * @returns {Array<string>}
	 */
	private getSkillRequirements = (skill: ISkill): string[] => {
		return skill.requirements.map((requirement: ISkillRequirement) => {
			return `${requirement.level} ${requirement.name}`;
		});
	}

	/**
	 * @param {ISkill} skill
	 * @returns {string}
	 */
	private getSkillDescription(skill: ISkill): string {
		const requirements = this.getSkillRequirements(skill);

		const skillDescription = skill.description.length
			? skill.description
			: "Coming Soon...";

		const skillRequirements = requirements.length
			? requirements
			: "None";

		return [
			"**ISkillElement(s):** " + skill.elements.join(", "),
			"**Level:** " + skill.level,
			"**Requirements:** " + skillRequirements,
			"**Description:** " + skillDescription,
		].join("\n");
	}
}
