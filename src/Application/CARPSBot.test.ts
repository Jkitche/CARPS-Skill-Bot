import { Client } from "discord.js";
import { Logger } from "winston";
import IConfig from "../Interface/IConfig";
import IEmbedGenerator from "../Interface/IEmbedGenerator";
import ISkillRepository from "../Interface/ISkillRepository";
import CARPSBot from "./CARPSBot";

describe("EmbedGenerator", () => {
	interface IProcess {
		signal: (() => void);
	}

	beforeEach(() => {
		const LoggerMock = jest.fn<Logger>(() => ({
			info: jest.fn(),
			error: jest.fn(),
		}));
		this.ConfigMock = jest.fn<IConfig>(() => ({
			token: "Test",
			activity: "Test",
		}));
		this.clientUserSetActivity = jest.fn();
		this.clientUser = jest.fn(() => ({
			setActivity: this.clientUserSetActivity,
		}));
		this.clientOn = jest.fn();
		this.clientLogin = jest.fn();
		this.ClientMock = jest.fn<Client>(() => ({
			on: this.clientOn,
			login: this.clientLogin,
			user: this.clientUser,
		}));
		this.EmbedGeneratorMock = jest.fn<IEmbedGenerator>();
		this.SkillRepositoryMock = jest.fn<ISkillRepository>();

		this.bot = new CARPSBot(
			new this.ConfigMock(),
			new this.ClientMock(),
			new this.EmbedGeneratorMock(),
			new this.SkillRepositoryMock(),
			new LoggerMock(),
		);
	});

	test("start configures client and process", () => {
		const processEvents: IProcess[] = [];
		process.on = jest.fn((signal: string, cb: (() => void)) => {
			const proc: IProcess = {
				signal: cb,
			};
			processEvents.push(proc);
		});

		this.bot.start();

		expect(this.clientOn.mock.calls[0][0]).toBe("error");
		expect(this.clientOn.mock.calls[1][0]).toBe("ready");
		expect(this.clientOn.mock.calls[2][0]).toBe("message");
		expect(this.clientLogin.mock.calls[0][0]).toBe("Test");
		expect(processEvents).toHaveLength(3);
	});
});
