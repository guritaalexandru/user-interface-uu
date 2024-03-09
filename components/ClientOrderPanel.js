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

		totalOrderPrice = totalOrderPrice.toFixed(2);

		return `
	  <div id="ClientOrderPanel">
	  	<div id="ClientOrderPanelWrapper">
	  	  	<div>
		        <button class="basicButton undoButton" data-language-tag="UNDO"></button>
		        <button class="basicButton redoButton" data-language-tag="REDO"></button>
			</div>
			<div class=order-title>
				<h2 data-language-tag="CLIENT_ORDER_PANEL_TITLE"></h2>
			</div>
			<div id="ClientOrderItems">
				${clientCurrentOrderArray.map(orderItem => `
					<client-order-item-component itemId="${orderItem.itemId}"></client-order-item-component>
				`).join('')}
			</div>
		</div>
	
	  	<div id="ClientOrderTotalPriceContainer">
		    <div id="ClientOrderTotalPriceWrapper">
		         <div id="ClientOrderTotalPrice">
					<span data-language-tag="CLIENT_ORDER_TOTAL_PRICE"></span>
					<span> $${totalOrderPrice}</span>
				</div>
				<button class="basicButton paymentButton" data-language-tag="PROCEED_CHEQUE"></button>
			</div>
		</div>
	  </div>
	`;
	}

	initEventListeners() {
		const domElement = this.firstElementChild;
		domElement.addEventListener('drop', this.drop);
		domElement.addEventListener('dragover', this.allowDrop);

		domElement.querySelector('.paymentButton').addEventListener('click', function() {
			window.globalState.isCheckoutModalOpen = true;
			window.triggerRedraws();
		});

		domElement.querySelector('.undoButton').addEventListener('click', function() {
			window.undoClientOrderAction();
			window.triggerRedraws();
		});

		domElement.querySelector('.redoButton').addEventListener('click', function() {
			window.redoClientOrderAction();
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

customElements.define('client-order-panel-component', ClientOrderPanel);