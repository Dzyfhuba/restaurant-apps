// custom element for the detail restaurant page
import { LitElement, html, css } from 'lit';
import CONFIG from '../config';
import $ from 'jquery';
import database from '../favorite_restaurant_idb';

class RestaurantDetail extends LitElement {
	static get styles() {
		return [
			css`
			:host {
				display: flex;
				flex-direction: column;
				padding: 24px;
				width: 1000px;
				margin: 0 auto;
		   	}
			@media (max-width: 1200px) {
				:host {
					padding: 0px;
					width: 90%;
				}
			}
			:host ul {
				list-style: none;
				padding: 0;
		   	}
			:host .restaurant-info:hover {
				box-shadow: inset 0 -2px 0 0 #eee;
			}
			h1, h2, h3, h4, h5, h6 {
				margin-bottom: 0;
			}
			h3 {
				text-decoration: underline;
			}
			.btn {
				width: 50px;
				height: 50px;
				border: none;
				border-radius: 50%;
				background-color: #FFD369;
			}
			.favorite-toggle{
				background-image: url('./images/icons/heart-solid.svg');
				background-repeat: no-repeat;
				background-position: center;
				background-size: 50%;
				width: 50px;
				height: 50px;
				position: fixed;
				bottom: 20px;
				right: 0;
				margin: 0 20px 0 0;
				border: none;
				border-radius: 50%;
				background-color: #FFD369;
			}
			.favorite-red {
				background-image: url('./images/icons/heart-solid-red.png');
		   	}
			.back-button {
				background-image: url('./images/icons/arrow-left-solid.svg');
				background-repeat: no-repeat;
				background-position: center;
				background-size: 50%;
				position: fixed;
				top: 125px;
				left: 25px;
			}
			#image {
				height: 300px;
				object-fit: cover;
			}
            `,
		];
	}

	constructor() {
		super();
	}

	connectedCallback() {
		super.connectedCallback();

		// get query string from the url
		const queryString = window.location.search;
		// get the id from the url
		this.id = queryString.split('=')[1];
		console.log(this.id);
        
		this.fetchRestaurant(this.id);

		// get the favorite restaurant from the database
		database.getFavoriteRestaurant(this.id).then((restaurant) => {
			if (restaurant) {
				this.shadowRoot.getElementById('favorite-toggle').classList.add('favorite-red');
			}
		});
	}

	toggleFavorite() {
		console.log(this.id);
		const favorite = this.shadowRoot.querySelector('#favorite-toggle');
		if (favorite.classList.contains('favorite-red')) {
			favorite.classList.remove('favorite-red');

			database.removeFavoriteRestaurant({id: this.id}).then(() => {
				console.log('remove success');
			}).catch(() => {
				console.log('remove failed');
			});
		} else {
			favorite.classList.add('favorite-red');

			// store it to database
			database.addFavoriteRestaurant({id: this.id}).then(() => {
				console.log('add success');
			}).catch(() => {
				console.log('add failed');
			});
		}
	}

	fetchRestaurant(id = '') {
		// get the restaurant data from the server
		$.ajax({
			url: `${CONFIG.API_URL}/detail/${id}`,
			type: 'GET',
			dataType: 'json',
			beforeSend: function() {
				const loading = document.createElement('loading-layer');
				this.appendChild(loading);
			}.bind(this),
			success: function(data) {
				this.restaurant = data.restaurant;
				this.shadowRoot.querySelector('#image').src = `${CONFIG.IMAGE_URL_LARGE}${data.restaurant.pictureId}`;
				this.shadowRoot.querySelector('#image').alt = this.restaurant.name;
				this.shadowRoot.getElementById('title').innerHTML = this.restaurant.name;
				this.shadowRoot.getElementById('address').innerHTML = this.restaurant.address;
				this.shadowRoot.getElementById('description').innerHTML = this.restaurant.description;
				this.shadowRoot.getElementById('category').innerHTML = this.restaurant.categories.map(category => category.name).join(', ');
				this.shadowRoot.getElementById('foods').innerHTML = this.restaurant.menus.foods.map(food => food.name).join(', ');
				this.shadowRoot.getElementById('drinks').innerHTML = this.restaurant.menus.drinks.map(drink => drink.name).join(', ');

                
			}.bind(this),
			error: function(data) {
				console.log(data);
			}
		});
	}

	back(){
		window.history.back();
	}

	render() {
		return html`
	    <h1 id="title"></h1>
		<img class="lazyload" id="image" />
		<div class="restaurant-info">
			<h3>Deskripsi</h3>
			<p id="description"></p>
		</div>
		<div class="restaurant-info">
			<h3>Alamat</h3>
			<p id="address"></p>
		</div>
		<div class="restaurant-info">
			<h3>Kategori</h3>
			<p id="category"></p>
		</div>
		<div class="restaurant-info">
			<h3>Menu</h3>
			<ul>
				<li>
					Foods
					<ul id="foods"></ul>
				</li>
				<li>
					Drinks
					<ul id="drinks"></ul>
				</li>
			</ul>
		</div>
        <button type="button" class="btn favorite-toggle" id="favorite-toggle" data-id="" aria-label="Toggle Favorite" @click="${this.toggleFavorite}">
        </button>
		<button type="button" class="btn back-button" id="back-button" aria-label="Back" @click="${this.back}"></button>
	    `;
	}
}

if(!customElements.get('restaurant-detail')) {
	customElements.define('restaurant-detail', RestaurantDetail);
}
export default RestaurantDetail;