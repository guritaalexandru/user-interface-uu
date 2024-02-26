const globalState = {
	// Global application state
	isLoggedIn: false,
	language: 'en',
	isCheckoutModalOpen: false,
	isPayAtTheBarModalOpen: false,
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