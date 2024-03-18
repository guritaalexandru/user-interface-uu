class StaffOrdersWrapper extends HTMLElement {
	constructor() {
		super();
	}

	getRelatedGlobalStates() {
		const {
			ordersArray,
		} = window.globalState;
		return {
			ordersArray,
		};
	}

	componentHTML() {
		const {
			ordersArray,
		} = this.getRelatedGlobalStates();

		console.log('ordersArray');
		console.log(ordersArray);

		return `
	  <div id="StaffOrdersWrapper">
	  	<div class=outstanding-order-title>
	  		<h2 data-language-tag="STAFF_ORDER_PANEL_TITLE"></h2>
  		</div>
		<div id="StaffOrderItems">
			${ordersArray.map(orderItem => `
				<staff-order-item-component orderId="${orderItem.orderId}"></staff-order-item-component>
			`).join('')}
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

customElements.define('staff-orders-wrapper-component', StaffOrdersWrapper);