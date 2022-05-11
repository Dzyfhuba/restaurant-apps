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
                    background-color: rgba(0, 0, 0, 0.5);
                    z-index: 9999;
                    display: flex;
                    justify-content: center;
                    align-items: center;
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

	static get isLoading() {
		return this.loading;
	}

	static set isLoading(value) {
		this.loading = value;
	}

	render() {
		return html`
            <div>Loading...</div>
        `;
	}
}

if (!customElements.get('loading-layer')) {
	customElements.define('loading-layer', Loading);
}
export default Loading;