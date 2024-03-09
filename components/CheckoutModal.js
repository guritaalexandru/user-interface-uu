class CheckoutModal extends HTMLElement {
	constructor() {
		super();
	}

	getRelatedGlobalStates() {
		const {
			clientCurrentOrderArray
		} = window.globalState;
		return {
			clientCurrentOrderArray
		};
	}

	componentHTML() {
		const {
		} = this.getRelatedGlobalStates();

		const {
			clientCurrentOrderArray
		} = this.getRelatedGlobalStates();

		let totalOrderPrice = 0;
		clientCurrentOrderArray.forEach(orderItem => {
			const menuItem = window.getMenuItemById(orderItem.itemId);
			const itemQuantity = orderItem.itemQuantity;
			totalOrderPrice += menuItem.itemPrice * orderItem.itemQuantity;
		});

		return `
	  <div id="CheckoutModal">
		<h2><div data-language-tag="CHECKOUT_MODAL_TITLE"></div></h2>
		
		<!--	List items from the order here and style	-->

		<div class="checkout-order-items">
			<div id="ClientOrderItems">
				${clientCurrentOrderArray.map(orderItem => `
					<client-order-item-component itemId="${orderItem.itemId}"></client-order-item-component>
					<div class="unit-number"><span> Units: ${orderItem.itemQuantity}</span></div>
				`).join('')}
			</div>
		</div>
		<div class="modal-total-price">
			<span data-language-tag="CLIENT_ORDER_TOTAL_PRICE"></span>
			<span> $${totalOrderPrice}</span>
		</div>

		<button class="basicButton changeOrderButton" data-language-tag="CHECKOUT_MODAL_CHANGE_ORDER"></button>
		<button class="basicButton payOrderButton" data-language-tag="CHECKOUT_MODAL_PAY"></button>
	  </div>
	`;
	}

	initEventListeners() {
		document.querySelector('.changeOrderButton').addEventListener('click', function() {
			window.globalState.isCheckoutModalOpen = false;
			window.triggerRedraws();
		});
		document.querySelector('.payOrderButton').addEventListener('click', function() {
			window.globalState.isCheckoutModalOpen = false;
			window.globalState.isPayAtTheBarModalOpen = true;
			window.globalState.ordersArray.push(
				{
					orderId: window.globalState.ordersArray.length + 1,
					orderItems: window.globalState.clientCurrentOrderArray,
					orderStatus: 'pending',
					tableNumber: 1
				}
			);
			//console.log("test");
			//console.log(window.globalState.ordersArray);

			window.globalState.clientCurrentOrderArray = [];
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

customElements.define('checkout-modal-component', CheckoutModal);