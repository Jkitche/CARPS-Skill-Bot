import { Logger } from "winston";
import IEmbedGenerator from "../Interface/IEmbedGenerator";
import ISkill from "../Interface/ISkill";
import ISkillEmbed from "../Interface/ISkillEmbed";
import ISkillRequirement from "../Interface/ISkillRequirement";

export default class EmbedGenerator implements IEmbedGenerator {
	private logger: Logger;

	/**
	 * @param {Logger} logger
	 */
	constructor(logger: Logger) {
		this.logger = logger;
	}

	/**
	 * @param {ISkill} skill
	 * @param {Date} timestamp
	 * @returns {ISkillEmbed}
	 */
	public getSkillEmbed(skill: ISkill, timestamp: Date): ISkillEmbed {
		const description = this.getSkillDescription(skill);

		return {
			title: skill.name,
			description,
			url: "http://carpsgame.com/printable%20forms/CARPS%20V6.4%20Final.pdf",
			timestamp,
			footer: {
				icon_url: "http://carpsgame.com/images/icon_webheader.png",
				text: "CARPS v6.4",
			},
			thumbnail: {
				url: "http://carpsgame.com/images/icon_webheader.png",
			},
			author: {
				name: "CARPS Skill Bot",
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
		this.logger.info(JSON.stringify(requirements));

		const skillDescription = skill.description.length
			? skill.description
			: "Coming Soon...";

		const skillRequirements = requirements.length
			? requirements
			: "None";

		return [
			"**Element(s):** " + skill.elements.join(", "),
			"**Level:** " + skill.level,
			"**Requirements:** " + skillRequirements,
			"**Description:** " + skillDescription,
		].join("\n");
	}
}
