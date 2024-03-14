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
		const itemStock = menuItem.itemStock;
		const showItem = menuItem.showItem;

		// Load wether it is a customer or a staff
		const user = globalState.userType;

		return `
		<div id="menuItemBorder">
		  <div id="menuItem" class="menu-item" data-item-id="${itemId} " draggable="true"">
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
				
				${user =="staff" ? 
				`
				<div>	
					<span data-language-tag="MENU_ITEM_STOCK"></span>
					<span>: ${itemStock}</span>
				</div>
				<button class="changeStock" data-item-id="${itemId}" data-menu-item = "${menuItem}" data-language-tag="MENU_ITEM_CHANGE_STOCK"></button>`: 
				`<button class="addToOrder" data-item-id="${itemId}" data-language-tag="MENU_ITEM_ADD_TO_ORDER"></button>`
			}
				</div>
		  </div>
		<div>
	`;
	}

	initEventListeners() {
		const domElement = this.firstElementChild;
		const addToOrderButton = domElement.querySelector('.addToOrder');
		const changeStockButton = domElement.querySelector('.changeStock');
		const itemId = parseInt(this.getAttribute('itemId'));
		
		if (globalState.userType == 'client'){
			// When the customer presses add to order
			addToOrderButton.addEventListener('click', function() {
				window.addItemToOrder(itemId);
				window.triggerRedraws();
			});
		} else{
			const menuItems = globalState.menuItems;
			const menuItem = window.getMenuItemById(itemId);

			// When the staff presses change stock
			//TODO: Pop up a text box to key in new stock number
			
			changeStockButton.addEventListener('click', function(){

				// prompt user to enter a new stock number
				let newVolumeStr = prompt("Enter new stock in ml");
				let newVolume = Number(newVolumeStr);
				
				// Catch the error input
				if (!isNaN(newVolume)){
					menuItem.itemVolume = newVolume;
					window.replaceData(menuItem, menuItems);
					window.triggerRedraws();
				} else{
					alert("INVALID INPUT!");
				}
				
				// console.log(menuItems);
				// window.updateFile("Beverages_new.js",globalState.menuItems); // Does not work without a DB
				
			});
		};



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