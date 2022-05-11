// custom element for the navigation bar
import { LitElement, html, css } from 'lit';

class ButtonBars extends LitElement {
	static get styles() {
		return [
			css `
			:host {
				min-width: 44px;
				min-height: 44px;
				height: 50px;
				width: 50px;
				background-color: transparent;
				border: none;
                display: none;
                align-items: center;
                justify-content: center;
			}
			@media only screen and (max-width: 767px) {
				:host {
					display: flex;
				}
			}
            .hamb {
				position: relative;
				top: 0px;
				left: 0px;
				width: 30px;
				height: 2px;
				background: #eee;
				display: block;
				transform-origin: center;
				transition: 0.5s ease-in-out;
			}
			.hamb:after {
				transition: 0.5s ease-in-out;
				content: "";
				position: relative;
				display: block;
				width: 100%;
				height: 100%;
				background: #eee;
				bottom: -10px;
		   	}
			.hamb:before {
				transition: 0.5s ease-in-out;
				content: "";
				position: relative;
				display: block;
				width: 100%;
				height: 100%;
				background: #eee;
				top: -10px;
			}
            `,
		];
	}
    
	static get properties() {
		return {
			isOpen: {
				type: Boolean,
				reflect: true,
				attribute: 'is-open',
				value: false,
			},
		};
	}
    
	constructor() {
		super();
		this.isOpen = false;
        
		this.bars = [
			html `<div class="hamb"></div>`,
		];
	}
    
	toggle() {
		this.isOpen = !this.isOpen;
	}

	render() {
		return this.bars;
	}
}
if (!customElements.get('button-bars')) {
	customElements.define('button-bars', ButtonBars); 
}
export default ButtonBars;