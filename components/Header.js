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
			      	<button id="LanguageButton" class="basicButton" data-language-tag="CHANGE_LANGUAGE">Language</button>
			      	<div id="languageDropdownMenu" class="dropdown-content">
			        	<button class="language-option" data-language-tag="CHANGE_LANGUAGE_ENGLISH" data-language-change="en"></button>
			        	<button class="language-option" data-language-tag="CHANGE_LANGUAGE_SWEDISH" data-language-change="sv"></button>
			        	<button class="language-option" data-language-tag="CHANGE_LANGUAGE_CHINESE" data-language-change="zh-cht"></button>
			        	<!-- Add more language options as needed -->
			      	</div>
			    </div>
				
				<button id="LoginButton" class="basicButton">
	                <span data-language-tag="LOGIN" class="${isLoggedIn ? 'hide' : ''}"></span>
	                <span data-language-tag="LOGOUT" class="${!isLoggedIn ? 'hide' : ''}"></span>
				</button>
		</nav>
	  </header>

	<div id="login-form" class="login-form hide">
		<div id="login-form-title" data-language-tag="LOGIN_FORM"></div>
	  	
		<form>
			<fieldset>
				<label for="username" data-language-tag="ENTER_USERNAME">: </label>
				<input type="text" name="username" id="username" class="text">
				<label for="password" data-language-tag="ENTER_PASSWORD">: </label>
				<input type="text" name="password" id="password" class="text">
			</fieldset>

		<p id="inputWarning" class="inputWarning hide" data-language-tag="ACCOUNT_WARNING"></p>
			
		</form><button id="EnterAccountButton" data-language-tag="LOGIN" class="basicButton"></button>
		
	</div>

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


			// If the user is not logged in
			if (!window.globalState.isLoggedIn) {
				event.preventDefault();
				const loginForm = document.getElementById('login-form');
				loginForm.classList.remove('hide'); // show the login form
				console.log("displaying login form");
			}else{
				window.globalState.isLoggedIn = false;
				window.globalState.userType = 'client';
				window.triggerRedraws();
			}



			// if (window.globalState.isLoggedIn) {
			// 	window.globalState.isLoggedIn = false;
			// 	window.globalState.userType = 'client';
			// } else {

			// 	// userInfo = window.loginAccount();
			// 	window.globalState.isLoggedIn = true;
			// 	window.globalState.userType = 'staff';
			// }
			// window.triggerRedraws();
		});


		document.getElementById('EnterAccountButton').addEventListener('click', function(){
			// When the second login button is clicked
			const inputWarning = document.getElementById("inputWarning");
			var username = document.getElementById("username").value;
			var password = document.getElementById("password").value;

			console.log("Username:", username);
			console.log("Password:", password);
			let userInfo;
			userInfo = window.loginAccount(username,password)
			if (userInfo == null){
				inputWarning.classList.remove('hide');

			}
			else{
				window.globalState.isLoggedIn = true;
				window.globalState.userType = 'staff';
				window.triggerRedraws();
			}


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