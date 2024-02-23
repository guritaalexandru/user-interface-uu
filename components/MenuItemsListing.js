class MenuItemsListing extends HTMLElement {
	constructor() {
		super();
	}

	getRelatedGlobalStates() {
		const {
			menuItems,
			currentMenuTab
		} = window.globalState;
		return {
			menuItems,
			currentMenuTab
		};
	}

	componentHTML() {
		const {
			menuItems,
			currentMenuTab
		} = this.getRelatedGlobalStates();
		const availableItems = menuItems.filter(menuItem => menuItem.published && !menuItem.deleted);

		let filteredMenuItems;
		if (currentMenuTab === 'all') {
			filteredMenuItems = availableItems;
		} else {
			filteredMenuItems = availableItems.filter(menuItem => menuItem.itemCategory === currentMenuTab);
		}


		return `
	  <div id="MenuItemsListing" class="menu-item-listing">
			${filteredMenuItems.map(menuItem => {
				return `<menu-item-component itemId="${menuItem.itemId}"></menu-item-component>`;
			}).join('')}
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