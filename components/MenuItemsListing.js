class MenuItemsListing extends HTMLElement {
	constructor() {
		super();
	}

	getRelatedGlobalStates() {
		const {
			menuItems
		} = window.globalState;
		return {
			menuItems
		};
	}

	componentHTML() {
		const {
			menuItems
		} = this.getRelatedGlobalStates();

		return `
	  <div id="MenuItemsListing">
	  		<div>
		        ${menuItems.map(menuItem => {
					return `<menu-item-component itemId="${menuItem.itemId}"></menu-item-component>`;
				}).join('')}
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

customElements.define('menu-items-listing-component', MenuItemsListing);