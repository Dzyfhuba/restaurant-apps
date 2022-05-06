// for consuming the api use promises

class API {
	constructor() {
		this.url = 'https://restaurant-api.dicoding.dev';
	}
	get(url) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('GET', `${this.url}${url}`);
			xhr.onload = () => {
				if (xhr.status === 200) {
					resolve(JSON.parse(xhr.response));
				}
				else {
					reject(xhr.statusText);
				}
			};
			xhr.onerror = () => {
				reject(xhr.statusText);
			};
			xhr.send();
		});
	}
	post(url, data, headers={contentType: 'application/json'}) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('POST', `${this.url}${url}`);
			xhr.setRequestHeader('Content-Type', headers.contentType);
			xhr.onload = () => {
				if (xhr.status === 200) {
					resolve(JSON.parse(xhr.response));
				}
				else {
					reject(xhr.statusText);
				}
			};
			xhr.onerror = () => {
				reject(xhr.statusText);
			};
			xhr.send(JSON.stringify(data));
		});
	}
}

export default API;