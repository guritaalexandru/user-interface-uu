class PayAtTheBarModal extends HTMLElement {
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

		return `
	  <div id="PayAtTheBarModal">
		<h2 data-language-tag="PAY_AT_THE_BAR"></h2>
		<button class="basicButton newOrderButton" data-language-tag="NEW_ORDER"></button>
	  </div>
	`;
	}

	initEventListeners() {
		document.querySelector('.newOrderButton').addEventListener('click', function() {
			window.globalState.isPayAtTheBarModalOpen = false;
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

customElements.define('pay-at-the-bar-modal-component', PayAtTheBarModal);