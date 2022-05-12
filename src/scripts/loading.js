// custom element for loading layer
import { LitElement, html, css } from 'lit';

class Loading extends LitElement {
	static get styles() {
		return [
			css`
                :host {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: #222831;
                    z-index: 9999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
				.spinning {
					width: 50px;
					height: 50px;
					border: 5px solid rgba(255, 255, 255, 0.5);
					border-top: 5px solid rgba(255, 255, 255, 1);
					border-radius: 50%;
					animation: spin 2s linear infinite;
				}
				@keyframes spin {
					0% { transform: rotate(0deg); }
					100% { transform: rotate(360deg); }
				}
            `,
		];
	}

	static get properties() {
		return {
			isLoading: { type: Boolean },
		};
	}

	constructor() {
		super();
		this.loading = true;
	}
    
	connectedCallback() {
		super.connectedCallback();
		this.loading = true;
	}

	disconnectedCallback() {
		super.disconnectedCallback();
		this.loading = false;
	}

	attributeChangedCallback(name, oldValue, newValue) {
		super.attributeChangedCallback(name, oldValue, newValue);
	}

	static get isLoading() {
		return this.loading;
	}

	static set isLoading(value) {
		this.loading = value;
	}

	close() {
		this.isFailed = false;
		this.isLoading = false;

		this.remove();
	}

	render() {
		return html`
			<div class="spinning"></div>
        `;
	}
}

if (!customElements.get('loading-layer')) {
	customElements.define('loading-layer', Loading);
}
export default Loading;