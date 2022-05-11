// custom element for the navigation bar
import { LitElement, html, css } from 'lit';
import './ButtonBars';

class NavigationBar extends LitElement {
	static get styles() {
		return [
			// draw 3 bars to toggle the navigation bar
			css`
			:host {
				height: 10vh;
				position: fixed;
				top: 0;
				width: 100%;
				transition: top 1s;
				box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
				text-transform: uppercase;
				background-color: inherit;
				display: flex;
				flex-direction: row;
				justify-content: space-between;
				align-items: center;
				z-index: 1;
	   		}
			@media only screen and (max-width: 767px) {
				:host {
						height: 50px;
						align-items: flex-start;
				}
			}
			:host .nav-toggle {
					display: none;
					min-width: 44px;
					min-height: 44px;
					height: 50px;
					aspect-ratio: 1;
					background-color: transparent;
					border: none;
					color: #eee;
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
			@media only screen and (max-width: 767px) {
				:host .nav-toggle {
					display: flex;
					align-items: center;
					justify-content: center;
				}
			}
			:host a.brand {
					height: 90%;
					margin-left: 16px;
					text-decoration: none;
					color: #eee;
					display: flex;
					align-items: center;
					font-size: 4em;
					font-weight: bolder;
			}
			@media only screen and (max-width: 767px) {
					:host a.brand {
						font-size: 2em;
						height: 50px;
				}
			}
			:host a.brand span:nth-child(1) {
					color: orange;
			}
			:host a.brand span:nth-child(2) {
					color: #eee;
			}
			:host a.brand span:nth-child(3) {
					color: orange;
			}
			:host > ul {
					list-style: none;
					margin: 0 16px 0 0;
					padding: 0;
					display: flex;
					align-items: center;
			}
			@media only screen and (max-width: 767px) {
					:host > ul {
						position: fixed;
						justify-content: center;
						align-items: center;
						opacity: 0%;
						display: none;
						right: 0px;
						height: 50px;
						width: 100%;
						margin: 0;
						font-size: 0.9em;
				}
			}
			:host > ul > li {
					width: 125px;
					text-align: center;
			}
			:host > ul > li > a {
					padding: 16px;
					text-decoration: none;
					color: inherit;
			}
			:host > ul > li > a:hover {
					box-shadow: inset 0 -2px 0 0 #eee;
			}
            `,
		];
	}

	// implement code from clipboard
	constructor() {
		super();
		this.open = false;
		this.brand = `
		<a href="/" class="brand">
			<span>P</span><span>o</span><span>F</span>
		</a>
		`;
		this.ul = document.createElement('ul');
		this.ul.innerHTML = `
			<li><a href="/">Home</a></li>
			<li><a href="/favorites.html">Favorite</a></li>
			<li>
				<a href="https://hafidzubaidillah.com" target="_blank" rel="noopener">About Us</a>
			</li>
		`;
	}

	static get properties() {
		return {
			open: {
				type: Boolean,
				reflect: true,
				value: false,
			}
		};
	}

	connectedCallback() {
		super.connectedCallback();
		
	}
	
	disconnectedCallback() {
		super.disconnectedCallback();
		this.removeEventListener('click', this.toggle);
	}
	
	toggle() {
		this.open = !this.open;
		const ul = this.shadowRoot.querySelector('ul');
		const nav = this.shadowRoot.getRootNode().host;
		if (this.open) {
			console.log('open');
			// change height to 100px with animation
			nav.animate([
				{ height: '50px' },
				{ height: '100px' }
			], {
				duration: 300,
				easing: 'ease-in-out',
				fill: 'forwards'
			});
			
			ul.style.display = 'flex';
			ul.animate([{
				opacity: 0,
				transform: 'translateY(0%)'
			}, {
				opacity: 1,
				transform: 'translateY(100%)'
			}], {
				duration: 300,
				fill: 'forwards'
			});

		} else {
			console.log('close');
			// change height to 50px with animation
			nav.animate([
				{ height: '100px' },
				{ height: '50px' }
			], {
				duration: 300,
				easing: 'ease-in-out',
				fill: 'forwards'
			});

			ul.animate([{
				opacity: 1,
				transform: 'translateY(100%)'
			}, {
				opacity: 0,
				transform: 'translateY(0%)'
			}], {
				duration: 300,
				fill: 'forwards'
			});

			setTimeout(() => {
				ul.style.display = 'none';
			}, 300);
		}

	}
	test() {
		console.log('test');
	}
    
	render() {
		return html`
		    <a href="/" class="brand">
		        <span>P</span><span>o</span><span>F</span>
		    </a>
			<button-bars @click="${this.toggle}"></button-bars>
		    <ul>
		        <li><a href="/">Home</a></li>
		        <li><a href="/favorites.html">Favorite</a></li>
		        <li>
		            <a href="https://hafidzubaidillah.com" target="_blank" rel="noopener">About Us</a>
		        </li>
		    </ul>
		`;
	}
}
if (!customElements.get('navigation-bar')) {
	customElements.define('navigation-bar', NavigationBar);
}
export default NavigationBar;