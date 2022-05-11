import 'regenerator-runtime'; /* for async await transpile */
import '../styles/app.scss';
import $ from 'jquery';
window.$ = window.jQuery = $;
import explore from './explore';
import './modal';
import head from './head';
import './skip_content';
import '@fortawesome/fontawesome-free/js/all';
import favorites from './favorites/app';
import { exploreDetail } from './explore_detail';
import NavigationBar from './navigation-bar';
console.log('Hello Coders! :)');

// check if page still loading
if (document.readyState !== 'complete') {
	console.log('Page is still loading...');
	window.addEventListener('load', () => {
		console.log('Page is loaded!');
	});
} else {
	console.log('Page is loaded!');
}

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

// prevent scrolling from within input field
$(document).on('touchmove', function(e) {
	if (e.target.nodeName == 'INPUT') {
		this.style.pointerEvents = 'none';
	}
});