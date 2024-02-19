class LeftPanel extends HTMLElement {
	constructor() {
		super();
	}

	getRelatedGlobalStates() {
		const {
			userType
		} = window.globalState;
		return {
			userType
		};
	}

	componentHTML() {
		const {
			userType
		} = this.getRelatedGlobalStates();

		return `
	  <div id="LeftPanel">

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

customElements.define('left-panel-component', LeftPanel);