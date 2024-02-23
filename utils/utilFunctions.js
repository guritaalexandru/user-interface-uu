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

function addItemToOrder(itemId) {
	if(window.globalState.clientCurrentOrderArray.some(orderItem => orderItem.itemId === itemId)) {
		window.globalState.clientCurrentOrderArray.forEach(orderItem => {
			if(orderItem.itemId === itemId) {
				orderItem.itemQuantity++;
			}
		});
	}
	else {
		window.globalState.clientCurrentOrderArray.push({
			itemId: itemId,
			itemQuantity: 1
		});
	}
}

window.getMenuItemById = getMenuItemById;
window.getOrderItemById = getOrderItemById;
window.addItemToOrder = addItemToOrder;