const globalState = {
	// Global application state
	isLoggedIn: false,
	language: 'en',
	userType: 'client', // client, staff, VIP(?)
	currentMenuTab: 'all', // all, beer, wine, spirits, non-alcoholic
	menuItems: [
		{
			itemId: 1,
			itemName: 'Item 1',
			itemPrice: 100,
			itemCategory: 'beer',
			published: true,
			deleted: false,
		},
		{
			itemId: 2,
			itemName: 'Item 2',
			itemPrice: 200,
			itemCategory: 'beer',
			published: true,
			deleted: false,
		},
		{
			itemId: 3,
			itemName: 'Item 3',
			itemPrice: 300,
			itemCategory: 'wine',
			published: true,
			deleted: false,
		},
		{
			itemId: 4,
			itemName: 'Item 4',
			itemPrice: 400,
			itemCategory: 'spirits',
			published: true,
			deleted: false,
		},
		{
			itemId: 5,
			itemName: 'Item 5',
			itemPrice: 500,
			itemCategory: 'non-alcoholic',
			published: true,
			deleted: false,
		}
	],

	// Client state
	clientCurrentOrderArray: [
		{
			itemId: 722706,
			itemQuantity: 1
		},
	]
};

window.globalState = globalState;