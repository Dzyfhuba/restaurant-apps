import $ from 'jquery';
import CONFIG from './config';

const list = document.querySelector('#explore .list');
$.ajax({
	url: `${CONFIG.API_URL}/list`,
	type: 'GET',
	dataType: 'json',
	success: function(data) {
		list.innerHTML = data.restaurants.map(item => {
			return `
			<div class="wrapper">
			<article class="card" tabindex="0">
				<span class="city">${item.city}</span>
				<img src="${CONFIG.IMAGE_URL_SMALL}${item.pictureId}" alt="${item.name}">
				<div class="content">
					<span class="rating">Rating: ${item.rating}</span>
					<header>
					<h1 tabindex="0">${item.name}</h1>
					</header>
					<p class="description" tabindex="0">
					${item.description}
					</p>
					</div>
					<div class="rest"><button type="button" tabindex="0" class="btn-detail" modal-target="explore-detail" data-id="${item.id}" aria-label="buka detail restauran ${item.name}">More Detail</button></div>
			</article>
		</div>
			`;
		}).join('');
	},
	error: function(data) {
		console.log(data);
	}
});
