const globalState = {
	// Define your initial global state variables here
	isLoggedIn: false,
	language: 'en',
	userType: 'client', // client, staff, VIP(?)
	clientCurrentOrderArray: [
		{
			itemId: 1,
			itemName: 'Item 1',
			itemPrice: 100,
			itemQuantity: 1
		},
		{
			itemId: 2,
			itemName: 'Item 2',
			itemPrice: 200,
			itemQuantity: 2
		},
		{
			itemId: 3,
			itemName: 'Item 3',
			itemPrice: 300,
			itemQuantity: 3
		}
	]
};

window.globalState = globalState;