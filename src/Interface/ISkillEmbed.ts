export default interface ISkillEmbed {
	title: string;
	description: string;
	url: string;
	timestamp: Date;
	footer: {
		icon_url: string,
		text: string,
	};
	thumbnail: {
		url: string,
	};
	author: {
		name: string,
		url: string,
		icon_url: string,
	};
}
