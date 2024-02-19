function getMenuItemById(itemId) {
	const {
		menuItems
	} = window.globalState;
	return menuItems.find(menuItem => menuItem.itemId === itemId);
}

function getOrderItemById(itemId) {
	const {
		clientCurrentOrderArray
	} = window.globalState;
	return clientCurrentOrderArray.find(orderItem => orderItem.itemId === itemId);
}

window.getMenuItemById = getMenuItemById;
window.getOrderItemById = getOrderItemById;