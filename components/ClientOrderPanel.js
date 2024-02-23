class ClientOrderPanel extends HTMLElement {
	constructor() {
		super();
		this.allowDrop = this.allowDrop.bind(this);
		this.drop = this.drop.bind(this);
	}

	getRelatedGlobalStates() {
		const {
			clientCurrentOrderArray
		} = window.globalState;
		return {
			clientCurrentOrderArray
		};
	}

	// When the user clicks on <div>, open the popup
    myFunction() {
        var popup = document.getElementById("myPopup");
        popup.classList.toggle("show");
      }

	allowDrop(event) {
		event.preventDefault();
	}

	drop(event) {
		event.preventDefault();
		const newOrderItemId = parseInt(event.dataTransfer.getData("text"));
		if(isNaN(newOrderItemId)) {
			return;
		}
		window.addItemToOrder(newOrderItemId);
		window.triggerRedraws();
	}

	componentHTML() {
		const {
			clientCurrentOrderArray
		} = this.getRelatedGlobalStates();

		let totalOrderPrice = 0;
		clientCurrentOrderArray.forEach(orderItem => {
			const menuItem = window.getMenuItemById(orderItem.itemId);
			totalOrderPrice += menuItem.itemPrice * orderItem.itemQuantity;
		});

		return `
	  <div id="ClientOrderPanel">
		<div class=order-title>
			<h2 data-language-tag="CLIENT_ORDER_PANEL_TITLE"></h2>
		</div>
		<div id="ClientOrderItems">
			${clientCurrentOrderArray.map(orderItem => `
				<client-order-item-component itemId="${orderItem.itemId}"></client-order-item-component>
			`).join('')}
		</div>
		
		<div id="ClientOrderTotalPrice" class="total-price">
			<span data-language-tag="CLIENT_ORDER_TOTAL_PRICE"></span>
			<span>${totalOrderPrice}</span>
		</div>

		<div class="paymentButton">
			<button class="basicButton" data-language-tag="PROCEED_CHEQUE"></button>
		</div>
	  </div>
	`;
	}

	initEventListeners() {
		const domElement = this.firstElementChild;
		domElement.addEventListener('drop', this.drop);
		domElement.addEventListener('dragover', this.allowDrop);
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

customElements.define('client-order-panel-component', ClientOrderPanel);