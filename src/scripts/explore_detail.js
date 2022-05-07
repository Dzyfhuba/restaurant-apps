import Modal from './modal';
import $ from 'jquery';

const structure =  `
    <div class="helper" tabindex="-1">
        Modal has been opened. Press escape to close.
    </div>
    <article class="modal-content">
        <header class="modal-header">
            <h1 id="title" tabindex="0"></h1>
            <button class="close" aria-label="Close Modal">&times;</button>
        </header>
        <!-- <img src="https://restaurant-api.dicoding.dev/images/medium/id" alt="name" class="img-thumbnail"> -->
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
        </div>
    </article>
    <button class="helper close" tabindex="0">
        Press enter at this point or press escape to close modal.
    </button>
    `;

const loadContent = (id) => {
	$.ajax({
		url: `https://restaurant-api.dicoding.dev/detail/${id}`,
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
			const structure = $('#explore-detail');
			structure.find('#title').text(title);
			structure.find('#address').text(address);
			structure.find('#description').text(description);
			structure.find('#category').html(categories);
			structure.find('#foods').html(menu_food);
			structure.find('#drinks').html(menu_drink);
			structure.find('#img-thumbnail').html(`<img src="https://restaurant-api.dicoding.dev/images/medium/${img}" alt="${title}" class="img-thumbnail">`);
			structure.find('#id').text(id);
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
				});
			});
			clearInterval(asd);
		}
	}, 10);
	
});