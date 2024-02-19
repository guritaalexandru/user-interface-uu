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

		const itemId = this.getAttribute('itemId');
		const itemName = this.getAttribute('itemName');
		const itemPrice = this.getAttribute('itemPrice');
		const itemQuantity = this.getAttribute('itemQuantity');

		return `
	  <div id="ClientOrderItem" data-item-id="${itemId}">
	  	<div>
	  		<span>${itemName}</span>
		</div>
		<div>
			<span data-language-tag="CLIENT_ORDER_ITEM_PRICE"></span>
	  		<span>${itemPrice}</span>
		</div>
		<div>
	  		<span>${itemQuantity}</span>
		</div>
		<div>
			<button class="plusButton" data-item-id="${itemId}">
				+
			</button>
		</div>
		<div>
			<button class="minusButton" data-item-id="${itemId}">
				-
			</button>
		</div>
		<div>
			<button class="deleteButton" data-item-id="${itemId}">
				Add delete icon here
			</button>
		</div>
	  </div>
	`;
	}

	initEventListeners() {
		const domElement = this.firstElementChild;
		const plusButton = domElement.querySelector('.plusButton');
		const minusButton = domElement.querySelector('.minusButton');
		const deleteButton = domElement.querySelector('.deleteButton');

		const itemId = parseInt(domElement.getAttribute('data-item-id'));

		plusButton.addEventListener('click', function() {
			window.globalState.clientCurrentOrderArray.forEach(orderItem => {
				if (orderItem.itemId === itemId) {
					orderItem.itemQuantity++;
				}
			});
			window.triggerRedraws();
		});

		minusButton.addEventListener('click', function() {
			window.globalState.clientCurrentOrderArray.forEach(orderItem => {
				if (orderItem.itemId === itemId) {
					orderItem.itemQuantity--;
				}

				if (orderItem.itemQuantity <= 0) {
					window.globalState.clientCurrentOrderArray = window.globalState.clientCurrentOrderArray.filter(orderItem => orderItem.itemId !== itemId);
				}
			});
			window.triggerRedraws();
		});

		deleteButton.addEventListener('click', function() {
			window.globalState.clientCurrentOrderArray = window.globalState.clientCurrentOrderArray.filter(orderItem => orderItem.itemId !== itemId);
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