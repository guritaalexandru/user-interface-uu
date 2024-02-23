const globalState = {
	// Global application state
	isLoggedIn: false,
	language: 'en',
	userType: 'client', // client, staff, VIP(?)
	currentMenuTab: 'all', // all, beer, wine, spirits, non-alcoholic
	currentRightPanel: 'menu', // menu, orders, security (may add more later)
	menuItems: [],

	// Client state
	clientCurrentOrderArray: []
};

window.globalState = globalState;