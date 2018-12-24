import { Logger } from "winston";
import ISkill from "../Interface/ISkill";
import ISkillEmbed from "../Interface/ISkillEmbed";
import EmbedGenerator from "./EmbedGenerator";

describe("EmbedGenerator", () => {

	beforeEach(() => {
		const LoggerMock = jest.fn<Logger>(() => ({
			info: jest.fn(),
		}));
		this.generator = new EmbedGenerator(new LoggerMock());
	});

	test("getSkillEmbed Happy Path", () => {
		const skill: ISkill = {
			name: "Ambush",
			elements: ["Air"],
			level: "Master",
			type: "Skill",
			description: "Once/level you may strike your target from behind with an Eviscerate. This skill is only usable with a 1-handed weapon.",
			descriptionExt: "",
			requirements: [{ name: "Backstab", level: "Master" }],
		};

		const timestamp: Date = new Date();
		const description: string = "Once/level you may strike your target from behind with an Eviscerate. This skill is only usable with a 1-handed weapon.";
		const expectedEmbed: ISkillEmbed = {
			title: "Ambush",
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
			fields: [
				{
					name: "Element(s):",
					value: "Air",
				},
				{
					name: "Level:",
					value: "Master",
				},
				{
					name: "Requirements:",
					value: "Master Backstab",
				},
			],
		};

		const actualEmbed: ISkillEmbed = this.generator.getSkillEmbed(skill, timestamp);

		expect(expectedEmbed).toEqual(actualEmbed);
	});

	test("getSkillEmbed Empty Skill Description", () => {
		const skill: ISkill = {
			name: "Ambush",
			elements: ["Air"],
			level: "Master",
			type: "Skill",
			description: "",
			descriptionExt: "",
			requirements: [{ name: "Backstab", level: "Master" }],
		};

		const timestamp: Date = new Date();
		const description: string = "Coming Soon...";
		const expectedEmbed: ISkillEmbed = {
			title: "Ambush",
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
			fields: [
				{
					name: "Element(s):",
					value: "Air",
				},
				{
					name: "Level:",
					value: "Master",
				},
				{
					name: "Requirements:",
					value: "Master Backstab",
				},
			],
		};

		const actualEmbed: ISkillEmbed = this.generator.getSkillEmbed(skill, timestamp);

		expect(expectedEmbed).toEqual(actualEmbed);
	});
});
