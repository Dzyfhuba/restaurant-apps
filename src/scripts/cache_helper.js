import CONFIG from './config';
const CacheHelper = {
	async cachingAppShell(requests) {
		const cache = await this._openCache();
		await cache.addAll(requests);
	},
   
	async deleteOldCache() {
		const cache_names = await caches.keys();
		cache_names.filter(name => name !== CONFIG.CACHE_NAME).map(name => caches.delete(name));
	},
   
	async revalidateCache(request) {
		const response = await caches.match(request);

		if (response) {
			this._fetchRequest(request);
			return response;
		}

		return this._fetchRequest(request);
	},
   
	async _openCache() {
		return caches.open(CONFIG.CACHE_NAME);
	},
    
	async _fetchRequest(request) {
		const response = await fetch(request);
		if (!response || response.status !== 200) {
			return response;
		}

		await this._addCache(request);
		return response;
	},
    
	async _addCache(request){
		const cache = await this._openCache();
		await cache.add(request);
	}
};

export default CacheHelper;