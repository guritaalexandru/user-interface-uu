const globalState = {
	// Global application state
	isLoggedIn: false,
	language: 'en',
	currentUser:null,
	isCheckoutModalOpen: false,
	isPayAtTheBarModalOpen: false,
	userType: 'client', // client, staff, VIP(?)
	clientOrderActionStackObject: {
		currentStackPlace: 0,
		stack: []
	},
	currentMenuTab: 'all', // all, beer, wine, spirits, non-alcoholic
	currentRightPanel: 'menu', // menu, orders, security (may add more later)
	menuItems: [],

	// Client state
	clientCurrentOrderArray: [],

	// Staff state
	ordersArray: [
		// {
		// 	orderId: 1,
		// 	tableNumber: 1,
		// 	orderItems: [
		// 		{
		// 			itemId: 1,
		// 			itemQuantity: 1
		// 		},
		// 		{
		// 			itemId: 2,
		// 			itemQuantity: 2
		// 		},
		// 		{
		// 			itemId: 3,
		// 			itemQuantity: 3
		// 		},
		// 	],
		// 	orderStatus: 'pending', // pending, in-progress, complete
		// },
	],
};

window.globalState = globalState;