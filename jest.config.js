module.exports = {
	moduleFileExtensions: ["ts", "js", "json", "node"],
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	transform: {
		"^.+\\.tsx?$": "ts-jest",
	},
	coverageReporters: ["json-summary", "text", "lcov"],
};
