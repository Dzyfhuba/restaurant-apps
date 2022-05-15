/* eslint-disable no-undef */
Feature('Reviewing Restaurants');

Before(({I}) => {
	I.amOnPage('/');
	I.wait(3);
	I.click('.list > .wrapper > article.card > .content h1 a:first-child');
	I.wait(3);
});

Scenario('Reviewing a restaurant', ({ I }) => {
	const name = 'Test4';
	const review = 'Review4';
	I.waitForElement('#review-form');
	I.fillField('#name', name);
	I.fillField('#review', review);
	I.click('button[type=submit]');
	I.wait(3);
	I.see(name, '.review-group ul li .review-content .review-header h3:first-child');
	I.see(review, '.review-group ul li .review-content .review-body p:first-child');
});