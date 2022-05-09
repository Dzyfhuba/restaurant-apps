import Modal from './modal';
import $ from 'jquery';
import CONFIG from './config';

const structure =  `
    <div class="helper" tabindex="-1">
        Modal has been opened. Press escape to close.
    </div>
    <article class="modal-content">
        <header class="modal-header">
            <h1 id="title" tabindex="0"></h1>
            <button class="close" aria-label="Close Modal">&times;</button>
        </header>
        <div id="img-thumbnail"></div>
        <div class="modal-body">
            <table>
				<tr style="display: none;">
					<td>id</td>
					<td id="id" tabindex="0"></td>
				</tr>
                <tr tabindex="0">
                    <td>Deskripsi</td>
                    <td id="description"></td>
                </tr>
                <tr tabindex="0">
                    <td>Kategori</td>
                    <td id="category"></td>
                </tr>
                <tr tabindex="0">
                    <td>Address</td>
                    <td id="address"></td>
                </tr>
                <tr tabindex="0">
                    <td>Menu</td>
                    <td>
                        <span id="menu_food">Foods</span>
                        <ul id="foods"></ul>
                        <span id="menu_drink">Drinks</span>
                        <ul id="drinks"></ul>
                    </td>
                </tr>
            </table>
			 <div class="review-group">
			 	<form id="review-form" action="javascript:void(0)">
					<input type="hidden" name="id" id="review-id" value="">
				 	<div class="form-group">
					 	<label for="name">Name</label>
						<input type="text" class="form-control" id="name" placeholder="Name" required>
					</div>
					<div class="form-group">
						<label for="review">Review</label>
						<textarea class="form-textarea" id="review" rows="3" placeholder="Enter review" required></textarea>
					</div>
					<button type="submit" class="btn">Submit</button>
				</form>
				<ul id="review-list"></ul>
			</div>
			
        </div>
    </article>
    <button class="helper close" tabindex="0">
        Press enter at this point or press escape to close modal.
    </button>
    `;

const loadContent = (id) => {
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
			const structure = $('#explore-detail');
			structure.find('#title').text(title);
			structure.find('#address').text(address);
			structure.find('#description').text(description);
			structure.find('#category').html(categories);
			structure.find('#foods').html(menu_food);
			structure.find('#drinks').html(menu_drink);
			structure.find('#img-thumbnail').html(`<img src="${CONFIG.IMAGE_URL_LARGE}${img}" alt="${title}">`);
			structure.find('#id').text(id);
			structure.find('#review-id').val(id);
			structure.find('#review-list').html(reviews);
			structure.find('#title').attr('aria-label', `${title}`);
			structure.find('#address').attr('aria-label', `${address}`);
			structure.find('#description').attr('aria-label', `${description}`);
			structure.find('#category').attr('aria-label', `${categories}`);
			structure.find('#foods').attr('aria-label', `${menu_food}`);
			structure.find('#drinks').attr('aria-label', `${menu_drink}`);
			structure.find('#img-thumbnail').attr('aria-label', `${title}`);
		},
		error: function(data) {
			console.log(data);
		}
	});
};

const post_review = () => {
	const review_form = document.querySelector('#review-form');
	review_form.addEventListener('submit', (e) => {
		e.preventDefault();
		const name = review_form.querySelector('#name').value;
		const review = review_form.querySelector('#review').value;
		const id = review_form.querySelector('#review-id').value;
		const data = {
			id: id,
			name: name,
			review: review,
		};
		$.ajaxSetup({
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
		});
		$.ajax({
			url: `${CONFIG.API_URL}/review`,
			type: 'POST',
			dataType: 'json',
			data: data,
			success: function(data) {
				const reviews = data.customerReviews.reverse().map(item => {
					return `
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
				`;
				}).join('');
				const structure = $('#explore-detail');
				structure.find('#review-list').html(reviews);
				review_form.reset();
			},
			error: function(data) {
				console.log(data);
			}
		});
	});
};

const explore_detail = document.querySelector('#explore-detail');
explore_detail.innerHTML = structure;

window.addEventListener('DOMContentLoaded', () => {
	const asd = setInterval(() => {
		const modal_elem = document.querySelector('#explore-detail');
		const modal = new Modal(modal_elem);
		let btn_toggle = document.querySelector('#explore-detail .btn-toggle');
		btn_toggle = document.querySelectorAll('button[modal-target]');
		if (btn_toggle.length > 0 && modal_elem && modal) {
			btn_toggle.forEach(btn => {
				btn.addEventListener('click', (e) => {
					explore_detail.innerHTML = structure;
					modal.open();
					loadContent(e.target.getAttribute('data-id'));
					post_review();
				});
			});
			clearInterval(asd);
		}
	}, 10);
});