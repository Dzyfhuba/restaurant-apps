import favorite_restaurant_db from '../favorite_restaurant_idb';
const favorites = () => {
	const favorites_container = document.querySelector('.favorite-list-container');
	favorite_restaurant_db.getFavoriteRestaurants().then((e) => {
		const favorites_list = e;
		const loop = setInterval(() => {
			const restaurants = document.querySelectorAll('.item');
			restaurants.forEach((item) => {
				// if the restaurant id is in the favorite list
				const id = item.getAttribute('data-id');
				const isFavorite = favorites_list.find(favorite => favorite.id === id);
				if (isFavorite) {
					// add to favorite container
					favorites_container.appendChild(item);
				}
			});
			if (restaurants.length > 0) {
				clearInterval(loop);
			}
		}, 100);
	}).catch(err => {
		console.log(err);
	});
};

export default favorites;