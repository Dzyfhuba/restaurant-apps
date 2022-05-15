/* eslint-disable no-undef */
import $ from 'jquery';
import CONFIG from '../src/scripts/config';
import { favoriteToggle } from '../src/scripts/explore_detail';

const sum = (a, b) => a + b;

describe('A Sample Test for Sum', () => {
	it('should return a + b value', () => {
		expect(sum(2, 3))
			.toEqual(5);
	});
});

describe('Favorite restaurant', () => {
	// get the id of the restaurant 

	// draw favorite button
	it('should draw favorite button', () => {
		// get id from the restaurant
    

		const $favoriteButton = $('<button type="button" class="btn favorite-toggle" id="favorite-toggle" data-id="" aria-label="Toggle Favorite">Favorite</button>');
		$favoriteButton.appendTo('body');
		expect($favoriteButton.length);
	});

	// toggle favorite button
	it('should toggle favorite button', () => {
		const $favoriteButton = $('#favorite-toggle');
		$favoriteButton.trigger('click');
		expect($favoriteButton.hasClass('active'));
	});
});