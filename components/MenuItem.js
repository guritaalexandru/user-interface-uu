class MenuItem extends HTMLElement {
	constructor() {
		super();
		this.addNumber = 0; // the total number of order to add on the button press
		this.drag = this.drag.bind(this);
	}

	getRelatedGlobalStates() {
		const {
		} = window.globalState;
		return {
		};
	}

	// Drag event
	drag(event) {
		event.dataTransfer.setData("text", event.target.dataset.itemId);
	}

	componentHTML() {
		const {
		} = this.getRelatedGlobalStates();

		// Load all the items from the global variables
		const itemId = parseInt(this.getAttribute('itemId'));
		const menuItem = window.getMenuItemById(itemId);
		const itemName = menuItem.itemName;
		const itemPrice = menuItem.itemPrice;
		const itemImageLink = menuItem.itemImage;
		const itemCategory = menuItem.itemCategory;
		const itemProducer = menuItem.producer;
		const itemDescription = menuItem.description;
		const alcoholLevel = menuItem.alcoholStrength;

		return `
		<div id="menuItemBorder">
		  <div id="MenuItem" class="menu-item" data-item-id="${itemId}" draggable="true">
		  	<div id="menuItemTitle">
	  			<span>${itemName}</span>
			</div>
			<div>
				<img id="menuItemImage" src="${itemImageLink}" draggable="false">
			</div>
			<div>
				<span data-language-tag="MENU_ITEM_PRICE"></span>
		        <span>${itemPrice} SEK</span>
			</div>
			<div>
				<span data-language-tag="MENU_ITEM_CATEGORY"></span>
				<span>: ${itemCategory}</span>
			</div>
			<div>
				<span data-language-tag="MENU_ITEM_PRODUCER"></span>
				<span>: ${itemProducer}</span>
			</div>
			<div>
				<span data-language-tag="MENU_ITEM_ALCOHOLSTRENGTH"></span>
				<span>: ${alcoholLevel}</span>
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
			window.addItemToOrder(itemId);
			window.triggerRedraws();
		});

		domElement.addEventListener('dragstart', this.drag);
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