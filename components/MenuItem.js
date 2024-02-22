class MenuItem extends HTMLElement {
	constructor() {
		super();
		this.addNumber = 0; // the total number of order to add on the button press
	}

	getRelatedGlobalStates() {
		const {
		} = window.globalState;
		return {
		};
	}

	componentHTML() {
		const {
		} = this.getRelatedGlobalStates();

		const itemId = parseInt(this.getAttribute('itemId'));
		const menuItem = window.getMenuItemById(itemId);
		const itemName = menuItem.itemName;
		const itemPrice = menuItem.itemPrice;
		const itemImageLink = menuItem.itemImage;
		// const itemImageLink = 'https://cdn.pixabay.com/photo/2016/09/14/11/35/beer-1669273_640.png'; // placeholder


		return `
		<div id="menuItemBorder">
		  <div id="MenuItem" data-item-id="${itemId}">
		  	<div>
	  			<span>${itemName}</span>
			</div>
			<div>
				<img id="menuItemImage" src="${itemImageLink}">
			</div>
			<div>
				<span data-language-tag="MENU_ITEM_PRICE"></span>
		        <span>${itemPrice} SEK</span>
			</div>
			<!--	TODO: Add to order only available for clients, not staff		-->
			<div>
				<button class="addToOrder" data-item-id="${itemId}" data-language-tag="MENU_ITEM_ADD_TO_ORDER"></button>
				
				</div>
		  </div>
		<div>
	`;
	}

	initEventListeners() {
		const domElement = this.firstElementChild;
		const addToOrderButton = domElement.querySelector('.addToOrder');
		const itemId = parseInt(this.getAttribute('itemId'));

		addToOrderButton.addEventListener('click', function() {
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

			window.triggerRedraws();
		});
	}

	connectedCallback() {
		this.innerHTML = this.componentHTML();
		this.initEventListeners();
	}

	attributeChangedCallback(name, oldValue, newValue) {
		// Called when an observed attribute has been added, removed, updated, or replaced
		if (name === 'trigger-redraw') {
			this.innerHTML = this.componentHTML();
			this.initEventListeners();
		}
	}

	disconnectedCallback() {
		// Called when the element is removed from the DOM
		// Clean up any event listeners or resources here
	}

	static get observedAttributes() {
		// Specify which attributes to observe for changes
		return ['trigger-redraw'];
	}
}

customElements.define('menu-item-component', MenuItem);