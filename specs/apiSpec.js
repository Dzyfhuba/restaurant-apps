/* eslint-disable no-undef */
import CONFIG from '../src/scripts/config';
import 'jasmine-ajax';
import $ from 'jquery';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;

describe('API Spec', () => {
	it('should return list of restaurants', () => {
		const option = {
			url: `${CONFIG.API_URL}/list`,
			type: 'GET',
			dataType: 'json',
			success: function (data) {
				expect(data.restaurants.length).toBe(20);
				expect(data.count).toBe(20);
				expect(data.status).toBe('200');
				expect(data.message).toBe('success');
			},
			error: function (data) {
				console.log(data);
				expected(data).toBe(null);
			}
		};

		$.ajax(option);
	});

	it('should return detail of restaurant', () => {
		const detailId = 'rqdv5juczeskfw1e867';
		const option = {
			url: `${CONFIG.API_URL}/detail/${detailId}`,
			type: 'GET',
			dataType: 'json',
			success: function (data) {
				expect(data).toBeDefined();
			},
			error: function (data) {
				console.log(data);
				expected(data).toBe(null);
			}
		};

		$.ajax(option);
	});
});