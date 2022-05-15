import database from '../favorite_restaurant_idb';
import $ from 'jquery';

const favoriteButtonInitiator = {
	async init( favoriteButtonContainer, restaurant ) {
		this.favoriteButtonContainer = favoriteButtonContainer;
		this._restaurant = {id:restaurant};

		await this._renderButton();
	},

	async _renderButton() {
		const id = this._restaurant.id;
		

		$(this.favoriteButtonContainer).replaceWith(`
			 <button type="button" class="btn favorite-toggle" id="favorite-toggle" data-id="" aria-label="Toggle Favorite">
				<i class="fas fa-heart"></i>
			</button>`
		);

		const favoriteButton = document.querySelector('#favorite-toggle');
		if(await this._isRestaurantExist(id)) {
			favoriteButton.classList.add('favorite-red');
		}

		favoriteButton.addEventListener('click', async () => {
			if (await this._isRestaurantExist(id)) {
				await database.removeFavoriteRestaurant(this._restaurant);
				favoriteButton.classList.remove('favorite-red');
			} else {
				await database.addFavoriteRestaurant(this._restaurant);
				favoriteButton.classList.add('favorite-red');
			}
		});

		
	},

	async _isRestaurantExist(id) {
		const restaurant = await database.getFavoriteRestaurants();
		return restaurant.some(r => r.id === id);
	},

	_renderFavorite() {
		$(this.favoriteButtonContainer).replaceWith(`
			 <button type="button" class="btn favorite-toggle" id="favorite-toggle" data-id="" aria-label="Toggle Favorite">
				<i class="fas fa-heart"></i>
			</button>`
		);
		const favoriteButton = document.querySelector('#favorite-toggle');
		favoriteButton.addEventListener('click', async () => {
			await database.addFavoriteRestaurant(this._restaurant);
			this._renderButton();
		});
	},

	_renderFavorited() {
		$(this.favoriteButtonContainer).replaceWith(`
			 <button type="button" class="btn favorite-toggle favorite-red" id="favorite-toggle" data-id="" aria-label="Toggle Favorite">
				<i class="fas fa-heart"></i>
			</button>`
		);
		const favoriteButton = document.querySelector('#favorite-toggle');
		favoriteButton.addEventListener('click', async () => {
			await database.removeFavoriteRestaurant(this._restaurant);
			this._renderButton();
		});
	},
};

export default favoriteButtonInitiator;
