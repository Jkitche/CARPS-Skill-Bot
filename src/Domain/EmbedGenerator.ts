import { Logger } from "winston";
import IEmbedGenerator from "../Interface/IEmbedGenerator";
import ISkill from "../Interface/ISkill";
import ISkillEmbed from "../Interface/ISkillEmbed";
import ISkillRequirement from "../Interface/ISkillRequirement";

export default class EmbedGenerator implements IEmbedGenerator {
	private MAX_EMBED_LENGTH = 2048;
	private TRUNCATED_MESSAGE = "\n\nDescription truncated. Please See Rulebook for full Description.";

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

		this.logger.info(`Getting skill embed for skill '${skill.name}'`);

		const requirements = this.getSkillRequirements(skill);
		const skillRequirements = requirements.length ? requirements.join(", ") : "None";

		return {
			title: skill.name,
			description,
			url:
				"http://carpsgame.com/printable%20forms/CARPS%20V6.4%20Final.pdf",
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
			fields: [
				{
					name: "Element(s):",
					value: skill.elements.join(", "),
				},
				{
					name: "Level:",
					value: skill.level,
				},
				{
					name: "Requirements:",
					value: skillRequirements,
				},
			],
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
	 * @param {string} description
	 * @returns {string}
	 */
	private trimDescription = (description: string): string => {
		if (description.length >= this.MAX_EMBED_LENGTH) {
			return `${description.substring(0, this.MAX_EMBED_LENGTH - this.TRUNCATED_MESSAGE.length - 5)}... ${this.TRUNCATED_MESSAGE}`;
		}
		return description;
	}

	/**
	 * @param {ISkill} skill
	 * @returns {string}
	 */
	private getSkillDescription(skill: ISkill): string {
		const skillDescription = skill.description.length
			? this.trimDescription(skill.description)
			: "Coming Soon...";
		return skillDescription;
	}
}
