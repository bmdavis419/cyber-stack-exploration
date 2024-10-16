/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
	app(input) {
		return {
			name: 'cyber-stack-explore',
			removal: input?.stage === 'production' ? 'retain' : 'remove',
			home: 'aws',
			providers: {
				aws: {
					profile: 'blok'
				}
			}
		};
	},
	async run() {
		new sst.aws.SvelteKit('MyWeb');
	}
});
