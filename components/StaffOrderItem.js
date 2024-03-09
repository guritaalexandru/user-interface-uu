class StaffOrderItem extends HTMLElement {
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
		} = this.getRelatedGlobalStates();

		const orderId = parseInt(this.getAttribute('orderId'));
        const order = window.getOrderById(orderId);
		//const tableNumber = parseInt(this.getAttribute('tableNumber'));
        //const orderStatus = this.getAttribute('orderStatus');
        const orderStatus = order.orderStatus;
        const tableNumber = order.tableNumber;

		return `
        <div id="StaffOrderItem" class="staff-order-item" data-item-id="${orderId}">

	  	<div>
	  		<span>Order ID: ${orderId}</span>
		</div>
        <div>
	  		<span>Table Number: ${tableNumber}</span>
		</div>
        <div>
	  		<span>Order Status: ${orderStatus}</span>
		</div>
        <button class="addToOrder markComplete" data-item-id="${orderId}" data-language-tag="MARK_COMPLETE"></button>
	  </div>
	`;
	}

	initEventListeners() {
        const domElement = this.firstElementChild;
        const markCompleteButton = domElement.querySelector('.markComplete');
        const orderId = parseInt(domElement.getAttribute('data-item-id'));
        const order = window.getOrderById(orderId);
        markCompleteButton.addEventListener('click', function() {
            console.log("clicked");
            console.log(orderId);
			//window.removeOrderFromOrdersArray(order);
            order.orderStatus = 'complete';
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

customElements.define('staff-order-item-component', StaffOrderItem);