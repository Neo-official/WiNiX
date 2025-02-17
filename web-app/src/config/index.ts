export type RouteType = {
	href : string;
	label: string;
	hidden?: boolean;
};

export const config = {
	site  : {
		name       : 'WiNiX',
		description: 'WiNiX is a web application that allows you to manage your devices and work times.',
		author     : {
			name: 'Me :)',
			url : 'XXXXXXXXXXXXXXXXX',
		},
	},
	ROUTES: {
		home         : {
			href : '/',
			label: 'Home',
		},
		errorMessages: {
			href : '/error-messages',
			label: 'Troubleshooting',
		},
		devices      : {
			href : '/devices',
			label: 'All Systems',
		},
		workTimes    : {
			href : '/work-times',
			label: 'Time sheet',
		},
		settings     : {
			href : '/settings',
			label: 'Settings',
			hidden: true,
		},
	},
} as const;

export default config;