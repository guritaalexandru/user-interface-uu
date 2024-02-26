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

function subtractItemFromOrder(itemId) {
	window.globalState.clientCurrentOrderArray.forEach(orderItem => {
		if (orderItem.itemId === itemId) {
			orderItem.itemQuantity--;
		}

		if (orderItem.itemQuantity <= 0) {
			window.globalState.clientCurrentOrderArray = window.globalState.clientCurrentOrderArray.filter(orderItem => orderItem.itemId !== itemId);
		}
	});
}

function removeItemFromOrder(itemId) {
	window.globalState.clientCurrentOrderArray = window.globalState.clientCurrentOrderArray.filter(orderItem => orderItem.itemId !== itemId);
}

window.getMenuItemById = getMenuItemById;
window.getOrderItemById = getOrderItemById;
window.addItemToOrder = addItemToOrder;
window.subtractItemFromOrder = subtractItemFromOrder;
window.removeItemFromOrder = removeItemFromOrder;