class RightPanel extends HTMLElement {
	constructor() {
		super();
	}

	getRelatedGlobalStates() {
		const {
			currentRightPanel
		} = window.globalState;
		return {
			currentRightPanel
		};
	}

	componentHTML() {
		const {
			currentRightPanel
		} = this.getRelatedGlobalStates();

		return `
		  <div id="RightPanel">
		  		<div class="${currentRightPanel === 'menu' ? '' : 'hide'}">
		  			<menu-wrapper-component></menu-wrapper-component>
		  		</div>
		  		<div class="${currentRightPanel === 'orders' ? '' : 'hide'}">
		  			<staff-orders-wrapper-component></staff-orders-wrapper-component>
		  		</div>
		  		<div class="${currentRightPanel === 'security' ? '' : 'hide'}">
		  			<security-panel-component></security-panel-component>
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

customElements.define('right-panel-component', RightPanel);