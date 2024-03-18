class SecurityModal extends HTMLElement {
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
            <div id="SecurityModal">
                <h2 id="message"></h2>
            </div>
        `
    }

    showMessage(message) {
        const messageElement = this.querySelector("#message")
        if (messageElement) {
            messageElement.textContent = message
            
            setTimeout(() => {
                let mins = 0;
                let secs = 0;    

                const Timer = setInterval(() =>{
                    messageElement.textContent = this.formatTime(mins) + ':' + this.formatTime(secs);
                    secs++
                    if (secs === 60) {
                        mins++;
                        secs = 0;
                    }
                }, 1000);
            }, 2000)
        }
    }

    formatTime(time) {
        return time < 10 ? '0' + time : time;
    }

    initEventListeners() {}

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

customElements.define("security-modal-component", SecurityModal)