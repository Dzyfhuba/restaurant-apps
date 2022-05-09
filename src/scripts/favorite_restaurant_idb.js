import { openDB } from 'idb';

const FAVORITE_RESTAURANT_DB = 'favorite_restaurant_db';
const FAVORITE_RESTAURANT_STORE = 'favorite_restaurant_store';

const dbPromise = openDB(FAVORITE_RESTAURANT_DB, 1, {
	upgrade(db) {
		db.createObjectStore(FAVORITE_RESTAURANT_STORE, {
			keyPath: 'id',
			autoIncrement: true
		});
	}
});

const database = {
	async getFavoriteRestaurants() {
		const db = await dbPromise;
		const tx = await db.transaction(FAVORITE_RESTAURANT_STORE);
		const store = tx.objectStore(FAVORITE_RESTAURANT_STORE);
		const restaurants = await store.getAll();
		return restaurants;
	},
	async addFavoriteRestaurant(restaurant) {
		const db = await dbPromise;
		const tx = await db.transaction(FAVORITE_RESTAURANT_STORE, 'readwrite');
		const store = tx.objectStore(FAVORITE_RESTAURANT_STORE);
		await store.add(restaurant);
		await tx.complete;
	},
	async removeFavoriteRestaurant(restaurant) {
		const db = await dbPromise;
		const tx = await db.transaction(FAVORITE_RESTAURANT_STORE, 'readwrite');
		const store = tx.objectStore(FAVORITE_RESTAURANT_STORE);
		await store.delete(restaurant.id);
		await tx.complete;
	},
};

export default database;