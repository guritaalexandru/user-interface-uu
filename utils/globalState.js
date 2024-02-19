const globalState = {
	// Define your initial global state variables here
	isLoggedIn: false,
	language: 'en',
	userType: 'client', // client, staff, VIP(?)
	clientCurrentOrderArray: [
		{
			itemId: 1,
			itemQuantity: 1
		},
		{
			itemId: 2,
			itemQuantity: 2
		},
		{
			itemId: 3,
			itemQuantity: 3
		}
	],
	menuItems: [
		{
			itemId: 1,
			itemName: 'Item 1',
			itemPrice: 100
		},
		{
			itemId: 2,
			itemName: 'Item 2',
			itemPrice: 200
		},
		{
			itemId: 3,
			itemName: 'Item 3',
			itemPrice: 300
		},
		{
			itemId: 4,
			itemName: 'Item 4',
			itemPrice: 400
		},
		{
			itemId: 5,
			itemName: 'Item 5',
			itemPrice: 500
		}
	]
};

window.globalState = globalState;