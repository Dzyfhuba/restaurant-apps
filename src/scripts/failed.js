// custom element for failed request
import { LitElement, html, css } from 'lit';

class FailedLayer extends LitElement {
	static get styles() {
		return [
			css`
                :host {
                    position: fixed;
                    top: 0;
                    left: 0;
                    color: #ad2929;
                    background-color: #222831;
                    border: 1px solid #820000;
                    font-weight: bold;
                    z-index: 9999;
                    padding: 24px;
                    margin: 12px;
                    border-radius: 4px;
                }
                h3 {
                    margin: 0;
                }
                button {
                    border: none;
                    background-color: #FFD369;
                    color: #222831;
                    padding: 8px;
                    min-width: 44px;
                    min-height: 44px;
                    border-radius: 4px;
                }
                `
		];
	}

	connectedCallback() {
		super.connectedCallback();
	}

	close() {
		this.remove();
	}

	render() {
		return html`
            <span>
                <h3>Oops!</h1>
                <p>Something went wrong. Please try again later or check your internet connection.</p>
                <button @click=${this.close}>Close</button>
            </span>
        `;
	}
}

if (!customElements.get('failed-layer')) {
	customElements.define('failed-layer', FailedLayer);
}