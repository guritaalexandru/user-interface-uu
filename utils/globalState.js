const globalState = {
	// Global application state
	isLoggedIn: false,
	language: 'en',
	userType: 'client', // client, staff, VIP(?)
	clientOrderActionStackObject: {
		currentStackPlace: 0,
		stack: [
			{
				action: 'ADD', // ADD, REMOVE
				itemId: 1,
				quantity: 1
			},
			{
				action: 'REMOVE', // ADD, REMOVE
				itemId: 1,
				quantity: 1
			},
		]
	},
	currentMenuTab: 'all', // all, beer, wine, spirits, non-alcoholic
	currentRightPanel: 'menu', // menu, orders, security (may add more later)
	menuItems: [],

	// Client state
	clientCurrentOrderArray: []
};

window.globalState = globalState;