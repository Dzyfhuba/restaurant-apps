/* eslint-disable no-undef */
Feature('Favoriting Restaurants');

Before(({I}) => {
	I.amOnPage('/favorites.html');
});

Scenario('Showing favorite restaurants', ({ I }) => {
	I.seeElement('.favorite-list-container');
	I.seeNumberOfElements('.favorite-list-container .item', 0);
});

Scenario('Showing unfavorite restaurants', ({ I }) => {
	I.seeElement('.restaurant-list-container');
	// wait for the list to load
	I.waitForElement('.restaurant-list-container .item', 10);
	I.seeNumberOfElements('.restaurant-list-container .item', 20);
});

Scenario('Adding a restaurant to favorites', ({ I }) => {
	I.waitForElement('.restaurant-list-container .item:first-child .btn-detail');
	I.click('.restaurant-list-container .item:first-child .btn-detail');
	I.waitForElement('.favorite-toggle');
	I.click('.favorite-toggle');
	I.click('.close');
	// wait page reload
	I.wait(1);
	I.seeNumberOfElements('.favorite-list-container .item', 1);
});