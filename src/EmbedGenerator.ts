import Skill, { SkillRequirement } from "./SkillInterface";

export interface SkillEmbed {
	title: string,
	description: string,
	url: string,
	timestamp: Date,
	footer: {
		icon_url: string,
		text: string,
	},
	thumbnail: {
		url: string,
	},
	author: {
		name: string,
		url: string,
		icon_url: string
	}
};

const getSkillEmbed = (skill: Skill): SkillEmbed => {
	const requirements = skill.requirements.map((requirement: SkillRequirement) => {
		return `${requirement.level} ${requirement.level}`;
	});

	const skillDescription = skill.description.length
		? skill.description
		: 'Coming Soon...';

	const skillRequirements = requirements.length
		? requirements
		: 'None';

	const description = [
		'**Element(s):** ' + skill.elements.join(', '),
		'**Level:** ' + skill.level,
		'**Requirements:** ' + skillRequirements,
		'**Description:** ' + skillDescription,
	];

	return {
		title: skill.name,
		description: description.join('\n'),
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

export default getSkillEmbed;