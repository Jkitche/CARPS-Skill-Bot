import Skill from "./SkillInterface";
import SkillEmbed from "./types/SkillEmbed";
import SkillRequirement from "./types/SkillRequirement";
import IEmbedGenerator from "./interfaces/IEmbedGenerator";

export default class EmbedGenerator implements IEmbedGenerator {
	
	/**
	 * @param {Skill} skill
	 * @returns {SkillEmbed}
	 */
	public getSkillEmbed(skill: Skill): SkillEmbed {
		const description = this.getSkillDescription(skill);

		return {
			title: skill.name,
			description: description,
			url: 'http://carpsgame.com/printable%20forms/CARPS%20V6.4%20Final.pdf',
			timestamp: new Date(),
			footer: {
				icon_url: 'http://carpsgame.com/images/icon_webheader.png',
				text: 'CARPS v6.4',
			},
			thumbnail: {
				url: 'http://carpsgame.com/images/icon_webheader.png',
			},
			author: {
				name: 'CARPS Skill Bot',
				url: 'https://discordapp.com',
				icon_url: 'http://carpsgame.com/images/icon_webheader.png',
			},
		};
	}

	/**
	 * @param {Skill} skill
	 * @returns {Array<string>}
	 */
	private getSkillRequirements(skill: Skill): Array<string> {
		return skill.requirements.map((requirement: SkillRequirement) => {
			return `${requirement.level} ${requirement.level}`;
		});
	}

	/**
	 * @param {Skill} skill
	 * @returns {string}
	 */
	private getSkillDescription(skill: Skill): string {
		const requirements = this.getSkillRequirements(skill);

		const skillDescription = skill.description.length
			? skill.description
			: 'Coming Soon...';

		const skillRequirements = requirements.length
			? requirements
			: 'None';

		return [
			'**Element(s):** ' + skill.elements.join(', '),
			'**Level:** ' + skill.level,
			'**Requirements:** ' + skillRequirements,
			'**Description:** ' + skillDescription,
		].join('\n');
	}
}
