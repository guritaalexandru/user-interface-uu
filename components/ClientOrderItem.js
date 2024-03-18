class ClientOrderItem extends HTMLElement {
	constructor() {
		super();
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
		const orderItem = window.getOrderItemById(itemId);
		const bdItem = window.getMenuItemById(itemId);

		const itemName = bdItem.itemName;
		const itemPrice = bdItem.itemPrice;
		const itemQuantity = orderItem.itemQuantity;

		return `
	  <div id="ClientOrderItem" class="order-item left-panel" data-item-id="${itemId}">
	  	<div>
	  		<span>${itemName}</span>
		</div>
		<div class="rowContainer">
			<div>
				<span>$ ${itemPrice}</span>
			</div>
			<div>
				<button id = "minusButton" class="actionButton" data-item-id="${itemId}">
					<i class="fa-solid fa-minus"></i>
				</button>
				<span>${itemQuantity}</span>
				<button id = "plusButton"  class="actionButton" data-item-id="${itemId}">
					<i class="fa-solid fa-plus"></i>
				</button>
				<button id = "deleteButton"  class="actionButton" data-item-id="${itemId}">
					<i class="fa-solid fa-trash-can"></i>
				</button>
			</div>
		</div>
	  </div>
	`;
	}

	initEventListeners() {
		const domElement = this.firstElementChild;
		const plusButton = domElement.querySelector('#plusButton');
		const minusButton = domElement.querySelector('#minusButton');
		const deleteButton = domElement.querySelector('#deleteButton');

		const itemId = parseInt(domElement.getAttribute('data-item-id'));

		plusButton.addEventListener('click', function() {
			window.addItemToOrder(itemId);
			window.triggerRedraws();
		});

		minusButton.addEventListener('click', function() {
			window.subtractItemFromOrder(itemId);
			window.triggerRedraws();
		});

		deleteButton.addEventListener('click', function() {
			window.removeItemFromOrder(itemId);
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

customElements.define('client-order-item-component', ClientOrderItem);