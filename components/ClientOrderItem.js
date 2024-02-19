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
	  <div id="ClientOrderItem">
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
	  </div>
	`;
	}

	initEventListeners() {

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