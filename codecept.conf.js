const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');

// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

exports.config = {
	tests: 'e2e/*_test.js',
	output: 'e2e/output/',
	helpers: {
		Puppeteer: {
			url: 'http://localhost:3000',
			show: true,
			windowSize: '1200x900'
		}
	},
	include: {
		I: './steps_file.js'
	},
	bootstrap: null,
	mocha: {},
	name: 'restaurant-apps'
};