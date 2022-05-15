import $ from 'jquery';
import CONFIG from './config';

const explore = () => {
	const list = document.querySelector('#explore .list');
	$.ajax({
		url: `${CONFIG.API_URL}/list`,
		type: 'GET',
		dataType: 'json',
		success: function (data) {
			list.innerHTML = data.restaurants.map(item => {
				const { id, name, city, pictureId, description, rating } = item;
				return `
			<div class="wrapper">
			<article class="card" tabindex="0">
				<span class="city">${city}</span>
				
				<picture>
	                <source media="(max-width: 768px)" srcset="${CONFIG.IMAGE_URL_SMALL}${pictureId}">
					<img src="${CONFIG.IMAGE_URL_SMALL}${pictureId}" alt="${name}">
				</picture>
				<div class="content">
					<span class="rating">Rating: ${rating}</span>
					<header>
					<h1 tabndiex="0"><a href="detailrestaurant.html?id=${id}">${name}</a></h1>
					</header>
					<p class="description" tabindex="0">
					${description}
					</p>
					</div>
					<div class="rest"><button type="button" tabindex="0" class="btn-detail" modal-target="explore-detail" data-id="${id}" aria-label="buka detail restauran ${name}">More Detail</button></div>
			</article>
		</div>
			`;
			}).join('');
		},
		error: function (data) {
			console.log(data);
		}
	});
};

export default explore;