function triggerRedraws() {
	const headerElement = document.querySelector('header-component');
	const leftPanelElement = document.querySelector('left-panel-component');
	const clientOrderPanelElement = document.querySelector('client-order-panel-component');
	const menuItemsListingElement = document.querySelector('menu-items-listing-component');
	const rightPanelElement = document.querySelector('right-panel-component');
	const modalWrapperElement = document.querySelector('modal-wrapper-component');

	headerElement.setAttribute('trigger-redraw', 'true');
	leftPanelElement.setAttribute('trigger-redraw', 'true');
	clientOrderPanelElement.setAttribute('trigger-redraw', 'true');
	menuItemsListingElement.setAttribute('trigger-redraw', 'true');
	rightPanelElement.setAttribute('trigger-redraw', 'true');
	modalWrapperElement.setAttribute('trigger-redraw', 'true');

	window.loadLanguage(window.globalState.language);
}

window.triggerRedraws = triggerRedraws;