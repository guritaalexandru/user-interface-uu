class Header extends HTMLElement {
	constructor() {
		super();
	}

	getRelatedGlobalStates() {
		const {
			isLoggedIn,
		} = window.globalState;
		return {
			isLoggedIn,
		};
	}

	componentHTML() {
		const {
			isLoggedIn,
		} = this.getRelatedGlobalStates();

		return `
	  <header id="Header">
		<nav>
				<div class="language-dropdown">
			      	<button id="LanguageButton" class="basicButton" data-language-tag="CHANGE_LANGUAGE">Choose Language</button>
			      	<div id="languageDropdownMenu" class="dropdown-content">
			        	<button class="language-option" data-language-tag="CHANGE_LANGUAGE_ENGLISH" data-language-change="en"></button>
			        	<button class="language-option" data-language-tag="CHANGE_LANGUAGE_SWEDISH" data-language-change="sv"></button>
			        	<!-- Add more language options as needed -->
			      	</div>
			    </div>
				
				<button id="LoginButton" class="basicButton">
	                <span data-language-tag="LOGIN" class="${isLoggedIn ? 'hide' : ''}"></span>
	                <span data-language-tag="LOGOUT" class="${!isLoggedIn ? 'hide' : ''}"></span>
				</button>
		</nav>
	  </header>
	`;
	}

	initEventListeners() {
		document.querySelectorAll('.language-option').forEach(languageOption => {
			languageOption.addEventListener('click', function() {
				const selectedLanguage = this.getAttribute('data-language-change');
				window.globalState.language = selectedLanguage;
				window.loadLanguage(window.globalState.language);
			});
		});
		document.getElementById('LoginButton').addEventListener('click', function() {
			if (window.globalState.isLoggedIn) {
				window.globalState.isLoggedIn = false;
			} else {
				window.globalState.isLoggedIn = true;
			}
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

customElements.define('header-component', Header);