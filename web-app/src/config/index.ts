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
			label: 'Main',
		},
		errorMessages: {
			href : '/error-messages',
			label: 'Troubleshooting',
		},
		workTimes    : {
			href : '/work-times',
			label: 'Time sheet',
			hidden: true,
		},
		settings     : {
			href : '/settings',
			label: 'Settings',
			hidden: true,
		},
	},
} as const;

export default config;