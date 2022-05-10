import $ from 'jquery';
import CONFIG from '../config';
import Modal from '../modal';
import { favoriteToggle, autoFavoriteToggle } from '../explore_detail';

const getRestaurantList = () => {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: `${CONFIG.API_URL}/list`,
			type: 'GET',
			dataType: 'json',
			success: function (data) {
				resolve(data.restaurants);
			},
			error: function (data) {
				reject(data);
			}
		});
	});
};

const getRestaurantDetail = (id) => {
	$.ajax({
		url: `${CONFIG.API_URL}/detail/${id}`,
		type: 'GET',
		dataType: 'json',
		success: function(data) {
			const title = data.restaurant.name;
			const address = data.restaurant.address;
			const menu_food = data.restaurant.menus.foods.map(item => `<li>${item.name}</li>`).join('');
			const menu_drink = data.restaurant.menus.drinks.map(item => `<li>${item.name}</li>`).join('');
			const img = data.restaurant.pictureId;
			const description = data.restaurant.description;
			const categories = data.restaurant.categories.map(item => `${item.name}, `).join('').replace(/, \s*$/, '');
			const id = data.restaurant.id;
			// reverse order of reviews
			const reviews = data.restaurant.customerReviews.reverse().map(item => `
				<li>
					<div class="review-content">
						<div class="review-header">
							<h3>${item.name}</h3>
							<span>${item.date}</span>
						</div>
						<div class="review-body">
							<p>${item.review}</p>
						</div>
					</div>
				</li>
			`).join('');
			const structure = $('#restaurant-detail');
			structure.find('#title').text(title);
			structure.find('#address').text(address);
			structure.find('#description').text(description);
			structure.find('#category').html(categories);
			structure.find('#foods').html(menu_food);
			structure.find('#drinks').html(menu_drink);
			structure.find('#img-thumbnail').html(`<img src="${CONFIG.IMAGE_URL_LARGE}${img}" alt="${title}">`);
			structure.find('#id').text(id);
			structure.find('button.favorite-toggle').attr('data-id', id);
			structure.find('#review-id').val(id);
			structure.find('#review-list').html(reviews);
			structure.find('#title').attr('aria-label', `${title}`);
			structure.find('#address').attr('aria-label', `${address}`);
			structure.find('#description').attr('aria-label', `${description}`);
			structure.find('#category').attr('aria-label', `${categories}`);
			structure.find('#foods').attr('aria-label', `${menu_food}`);
			structure.find('#drinks').attr('aria-label', `${menu_drink}`);
			structure.find('#img-thumbnail').attr('aria-label', `${title}`);

			autoFavoriteToggle(id);
		},
		error: function(data) {
			console.log(data);
		}
	});
};

const restaurants = () => {
	const restaurants_container = document.querySelector('.restaurant-list-container');
	getRestaurantList().then(data => {
		const restaurants_list = data;    

		restaurants_container.innerHTML = restaurants_list.map(item => {
			return `
        <div class="restaurant-item">
			<article class="card" tabindex="0">
				<img src="${CONFIG.IMAGE_URL_SMALL}${item.pictureId}" alt="${item.name}">
				<div class="content">
					<header>
						<h1 tabindex="0">${item.name}</h1>
					</header>
					<span class="rating">Rating: ${item.rating}</span>
					<p class="description" tabindex="0">
						${item.description}
					</p>
					<p class="city">${item.city}</p>
				</div>
				<div class="rest"><button type="button" tabindex="0" class="btn-detail" modal-target="restaurant-detail" data-id="${item.id}" aria-label="buka detail restauran ${item.name}">More Detail</button></div>
			</article>
		</div>
                `;
		}).join('');
	});

	const loop = setInterval(() => {
		const btn_detail = document.querySelectorAll('.btn-detail');
		if (btn_detail.length > 0) {
			btn_detail.forEach(item => {
				item.addEventListener('click', e => {
					const id = e.target.getAttribute('data-id');
					const modal_elem = document.querySelector(`#${e.target.getAttribute('modal-target')}`);
					const modal = new Modal(modal_elem);
					getRestaurantDetail(id);
					modal.open();
					favoriteToggle();
				});
				clearInterval(loop);
			});
		}
	}, 100);
};

export { restaurants, getRestaurantList };