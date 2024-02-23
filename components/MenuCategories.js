class MenuCategories extends HTMLElement {
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
	  <div id="MenuCategories">
		<div class="menu-categories">
		<button class="basicButton" data-language-tag="MENU_CATEGORY_ALL" data-menu-category="all"></button>
		<button class="basicButton" data-language-tag="MENU_CATEGORY_BEER" data-menu-category="beer"></button>
		<button class="basicButton" data-language-tag="MENU_CATEGORY_WINE" data-menu-category="wine"></button>
		<button class="basicButton" data-language-tag="MENU_CATEGORY_SPIRITS" data-menu-category="spirits"></button>
		<button class="basicButton" data-language-tag="MENU_CATEGORY_NON_ALCOHOLIC" data-menu-category="non-alcoholic"></button>
		</div>
	  </div>
	`;
	}

	initEventListeners() {
		// When pressed, it will change the global state for the current category shown in the menu
		document.querySelectorAll('#MenuCategories button').forEach(menuCategoryButton => {
			menuCategoryButton.addEventListener('click', function() {
				const selectedCategory = this.getAttribute('data-menu-category');
				window.globalState.currentMenuTab = selectedCategory;
				window.triggerRedraws();
			});
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

customElements.define('menu-categories-component', MenuCategories);