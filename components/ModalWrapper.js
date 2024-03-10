class ModalWrapper extends HTMLElement {
    constructor() {
        super()
    }

    getRelatedGlobalStates() {
        const {
            isCheckoutModalOpen,
            isPayAtTheBarModalOpen,
            isSecrityModalOpen,
        } = window.globalState
        return {
            isCheckoutModalOpen,
            isPayAtTheBarModalOpen,
            isSecrityModalOpen,
        }
    }

    componentHTML() {
        const {
            isCheckoutModalOpen,
            isPayAtTheBarModalOpen,
            isSecrityModalOpen,
        } = this.getRelatedGlobalStates()

        const isAnyModalOpen =
            isCheckoutModalOpen || isPayAtTheBarModalOpen || isSecrityModalOpen

        return `
   <div id="ModalWrapper">
     <div class="modal-background ${isAnyModalOpen ? "" : "hide"}">
      <div class="modal-content">
       <span class="closeModal"">&times;</span>
         <div class="${isCheckoutModalOpen ? "" : "hide"}">
        <checkout-modal-component></checkout-modal-component>
     </div>
     <div class="${isPayAtTheBarModalOpen ? "" : "hide"}">
      <pay-at-the-bar-modal-component></pay-at-the-bar-modal-component>
     </div>
     <div class="${isSecrityModalOpen ? "" : "hide"}">
      <security-modal-component></security-modal-component>
     </div>
    </div>
   </div>
   </div>
 `
    }

    initEventListeners() {
        const domElement = this.firstElementChild
        const closeModal = domElement.querySelector(".closeModal")
        const modalBackground = domElement.querySelector(".modal-background")

        closeModal.addEventListener("click", function () {
            window.globalState.isCheckoutModalOpen = false
            window.globalState.isPayAtTheBarModalOpen = false
            window.globalState.isSecrityModalOpen = false
            window.triggerRedraws()
        })

        modalBackground.addEventListener("click", function (ev) {
            if (ev.target === modalBackground) {
                window.globalState.isCheckoutModalOpen = false
                window.globalState.isPayAtTheBarModalOpen = false
                window.globalState.isSecrityModalOpen = false
                window.triggerRedraws()
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

customElements.define("modal-wrapper-component", ModalWrapper)