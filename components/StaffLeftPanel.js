class StaffLeftPanel extends HTMLElement {
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
			<div id="StaffLeftPanel">
			  <div class="menu-buttons">
			    <div class="menu-button" data-language-tag="STAFF_PANEL_MENU" data-staff-panel-option="menu"></div>
			    <div class="menu-button" data-language-tag="STAFF_PANEL_ORDERS" data-staff-panel-option="orders"></div>
			    <div class="menu-button" data-language-tag="STAFF_PANEL_SECURITY" data-staff-panel-option="security"></div>
			  </div>
			</div>
	`;
	}

	initEventListeners() {
		document.querySelectorAll('[data-staff-panel-option]').forEach(staffPanelOption => {
					staffPanelOption.addEventListener('click', function() {
						const selectedOption = this.getAttribute('data-staff-panel-option');
						window.globalState.currentRightPanel = selectedOption;
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

customElements.define('staff-left-panel-component', StaffLeftPanel);