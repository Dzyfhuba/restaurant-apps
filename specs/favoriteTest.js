/* eslint-disable no-undef */
import $ from 'jquery';
import favoriteButtonInitiator from '../src/scripts/util/favorite_button.js';
import database from '../src/scripts/favorite_restaurant_idb';

// some time I got error because I didn't add delay each get or add favorite restaurant
jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

describe('Favorite restaurant', () => {
	// toggle favorite button
	it('should init favorite button', async () => {
		document.body.innerHTML = '<div class="favorite-container" id="favorite-container"></div>';

		await favoriteButtonInitiator.init('#favorite-container', '123');
	
		// click the button
		document.querySelector('#favorite-toggle').dispatchEvent(new Event('click'));
		console.log('1 class:', $('#favorite-toggle').attr('class'));
		
		// get data from database delay for 2 seconds
		await new Promise(resolve => setTimeout(resolve, 2000));
		const restaurant = await database.getFavoriteRestaurants();
		console.log('1 add:', restaurant);

		// expect the restaurant has 123
		expect(restaurant).toEqual([{ id: '123' }]);

		// remove the restaurant
		await database.removeFavoriteRestaurant({id:'123'});
		console.log('1 remove:', await database.getFavoriteRestaurants());
	});

	// toggle favorite button
	it('should toggle favorite button', async () => {
		await new Promise(resolve => setTimeout(resolve, 2000));
		// add favorite to database
		await database.addFavoriteRestaurant({id:'123'});

		await new Promise(resolve => setTimeout(resolve, 2000));
		// get data from database
		const restaurant = await database.getFavoriteRestaurants();
		console.log('2 add:', restaurant);

		document.body.innerHTML = '<div class="favorite-container" id="favorite-container"></div>';

		await favoriteButtonInitiator.init('#favorite-container', '123');
	
		// click the button
		document.querySelector('#favorite-toggle').dispatchEvent(new Event('click'));
		console.log('2 class:', $('#favorite-toggle').attr('class'));

		// get data from database delay for 2 seconds
		await new Promise(resolve => setTimeout(resolve, 2000));
		const restaurant1 = await database.getFavoriteRestaurants();
		console.log('2 remove:', restaurant1);

		// expect the restaurant has no 123
		expect(restaurant1).toEqual([]);
	});
});