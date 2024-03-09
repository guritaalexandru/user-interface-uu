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

function getOrderById(orderId) {
	const {
		ordersArray
	} = window.globalState;
	return ordersArray.find(order => order.orderId === orderId);
}

function trimClientOrderActionStack() {
	const currentStackPlace = window.globalState.clientOrderActionStackObject.currentStackPlace;

	if(currentStackPlace < window.globalState.clientOrderActionStackObject.stack.length) {
		window.globalState.clientOrderActionStackObject.stack = window.globalState.clientOrderActionStackObject.stack.slice(0, currentStackPlace);
	}
}

function addItemToOrder(itemId, inUndoRedo = false) {
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

	if(!inUndoRedo) {
		trimClientOrderActionStack();
		window.globalState.clientOrderActionStackObject.stack.push({
			action: 'ADD',
			itemId: itemId,
			quantity: 1
		});
		window.globalState.clientOrderActionStackObject.currentStackPlace++;
	}
}

function subtractItemFromOrder(itemId, inUndoRedo = false) {
	window.globalState.clientCurrentOrderArray.forEach(orderItem => {
		if (orderItem.itemId === itemId) {
			orderItem.itemQuantity--;
		}

		if (orderItem.itemQuantity <= 0) {
			window.globalState.clientCurrentOrderArray = window.globalState.clientCurrentOrderArray.filter(orderItem => orderItem.itemId !== itemId);
		}
	});

	if(!inUndoRedo) {
		trimClientOrderActionStack();
		window.globalState.clientOrderActionStackObject.stack.push({
			action: 'REMOVE',
			itemId: itemId,
			quantity: 1
		});
		window.globalState.clientOrderActionStackObject.currentStackPlace++;
	}
}

function removeOrderFromOrdersArray(order, inUndoRedo = false) {
	/*const {
		ordersArray
	} = window.globalState;
	const index = ordersArray.indexOf(order);
	if (index > -1) {
		array.splice(index, 1);
	}*/
}

function removeItemFromOrder(itemId, inUndoRedo = false) {
	if(!inUndoRedo) {
		trimClientOrderActionStack();
		const quantity = window.getOrderItemById(itemId).itemQuantity;
		window.globalState.clientOrderActionStackObject.stack.push({
			action: 'REMOVE',
			itemId: itemId,
			quantity
		});
		window.globalState.clientOrderActionStackObject.currentStackPlace++;
	}

	window.globalState.clientCurrentOrderArray = window.globalState.clientCurrentOrderArray.filter(orderItem => orderItem.itemId !== itemId);
}

function undoClientOrderAction() {
	const currentStackPlace = window.globalState.clientOrderActionStackObject.currentStackPlace;
	if(currentStackPlace > 0) {
		const lastAction = window.globalState.clientOrderActionStackObject.stack[currentStackPlace - 1];
		if(lastAction.action === 'ADD') {
			window.subtractItemFromOrder(lastAction.itemId, true);
		}
		else if(lastAction.action === 'REMOVE') {
			for(let i = 0; i < lastAction.quantity; i++) {
				window.addItemToOrder(lastAction.itemId, true);
			}
		}
		window.globalState.clientOrderActionStackObject.currentStackPlace--;
	}
}

function redoClientOrderAction() {
	const currentStackPlace = window.globalState.clientOrderActionStackObject.currentStackPlace;
	if(currentStackPlace < window.globalState.clientOrderActionStackObject.stack.length) {
		const nextAction = window.globalState.clientOrderActionStackObject.stack[currentStackPlace];
		if(nextAction.action === 'ADD') {
			window.addItemToOrder(nextAction.itemId, true);
		}
		else if(nextAction.action === 'REMOVE') {
			for(let i = 0; i < nextAction.quantity; i++) {
				window.subtractItemFromOrder(nextAction.itemId, true);
			}
		}
		window.globalState.clientOrderActionStackObject.currentStackPlace++;
	}
}

window.getMenuItemById = getMenuItemById;
window.getOrderItemById = getOrderItemById;
window.getOrderById = getOrderById;
window.addItemToOrder = addItemToOrder;
window.subtractItemFromOrder = subtractItemFromOrder;
window.removeItemFromOrder = removeItemFromOrder;
window.undoClientOrderAction = undoClientOrderAction;
window.redoClientOrderAction = redoClientOrderAction;
window.removeOrderFromOrdersArray = removeOrderFromOrdersArray;