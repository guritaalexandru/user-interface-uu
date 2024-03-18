class SecurityPanel extends HTMLElement {
    constructor() {
        super()
    }

    getRelatedGlobalStates() {
        const {} = window.globalState
        return {}
    }

    componentHTML() {
        const {} = this.getRelatedGlobalStates()

        return `
		<div id="SecurityPanel" class="centerContainer">
			<button class="securtiyButton notifyGuardButton">
                <i class="fa-solid fa-phone"></i>
                <span data-language-tag="GUARD"></span>
            </button>
			
			<button class="securtiyButton callPoliceButton" >
                <i class="fa-solid fa-phone"></i>
                <span data-language-tag="POLICE"></span>
            </button>
		</div>
		`
    }

    initEventListeners() {
        const domElement = this.firstElementChild

        domElement
            .querySelector(".notifyGuardButton")
            .addEventListener("click", function() {
                window.globalState.isSecrityModalOpen = true
                window.triggerRedraws()

                const modal = document.querySelector("security-modal-component")
                if (modal) {
                    modal.showMessage("Notifying the Guard...")
                }
            })

        domElement
            .querySelector(".callPoliceButton")
            .addEventListener("click", function() {
                window.globalState.isSecrityModalOpen = true
                window.triggerRedraws()

				const modal = document.querySelector("security-modal-component")
                if (modal) {
                    modal.showMessage("Calling the Police...")
                }
            })
    }

    connectedCallback() {
        this.innerHTML = this.componentHTML()
        this.initEventListeners()
    }

    attributeChangedCallback(name, oldValue, newValue) {
        // Called when an observed attribute has been added, removed, updated, or replaced
        if (name === "trigger-redraw") {
            this.innerHTML = this.componentHTML()
            this.initEventListeners()
        }
    }

    disconnectedCallback() {
        // Called when the element is removed from the DOM
        // Clean up any event listeners or resources here
    }

    static get observedAttributes() {
        // Specify which attributes to observe for changes
        return ["trigger-redraw"]
    }
}

customElements.define("security-panel-component", SecurityPanel)