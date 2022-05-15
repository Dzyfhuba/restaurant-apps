import 'regenerator-runtime'; /* for async await transpile */
import '../styles/app.scss';
import $ from 'jquery';
window.$ = window.jQuery = $;
import explore from './explore';
import './modal';
import head from './head';
import './skip_content';
import favorites from './favorites/app';
import { exploreDetail } from './explore_detail';
import NavigationBar from './navigation-bar';
import Loading from './loading';
import RestaurantDetail from './detail/app';
import review from './detail/review';
import '@fortawesome/fontawesome-free/js/all.min';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

console.log('Hello Coders! :)');

// check if page still loading
if (document.readyState !== 'complete') {
	console.log('Page is still loading...');
	
	// loading
	const loading = document.createElement('loading-layer');
	document.body.appendChild(loading);
	new Loading();
	
	
	// call navigation bar
	const nav = new NavigationBar();
	nav.render();
	
	if (window.location.pathname === '/') {
		head();
		explore();
		exploreDetail();
	}
	if (window.location.pathname === '/favorites.html') {
		favorites();
	}
	if (window.location.pathname.includes('/detailrestaurant.html')) {
		new RestaurantDetail().render();
		review();
	}

	// prevent scrolling from within input field
	$(document).on('touchmove', function(e) {
		if (e.target.nodeName == 'INPUT') {
			this.style.pointerEvents = 'none';
		}
	});
	window.addEventListener('load', () => {
		if (window.location.pathname == '/' || window.location.pathname == '/favorites.html') {
			document.body.removeChild(loading);
		}
		console.log('Page is loaded!');
	});
} else {
	console.log('Page is loaded!');
}