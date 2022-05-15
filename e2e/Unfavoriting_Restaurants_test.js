/* eslint-disable no-undef */
// import database from '../src/scripts/favorite_restaurant_idb';
Feature('Unfavoriting Restaurants');

// database.addFavoriteRestaurant({id: 'rqdv5juczeskfw1e867'});
Before(({I}) => {
	I.amOnPage('/favorites.html');
});

Scenario('Removing a restaurant from favorites', ({ I }) => {
	I.waitForElement('.restaurant-list-container .item:first-child .btn-detail');
	I.click('.restaurant-list-container .item:first-child .btn-detail');
	I.waitForElement('.favorite-toggle');
	I.click('.favorite-toggle');
	
	// see if .favorite-toggle has .favorite-red
	I.seeElement('.favorite-toggle.favorite-red');

	I.click('.favorite-toggle');

	// see if .favorite-toggle has no .favorite-red
	I.dontSeeElement('.favorite-toggle.favorite-red');
	I.amOnPage('/favorites.html');
	I.wait(5);
	I.seeNumberOfElements('.restaurant-list-container .item', 20);
	I.seeNumberOfElements('.favorite-list-container .item', 0);
});