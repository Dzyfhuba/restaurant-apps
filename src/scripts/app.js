import 'regenerator-runtime'; /* for async await transpile */
import '../styles/app.scss';
import $ from 'jquery';
window.$ = window.jQuery = $;
import navigation from './navbar';
import explore from './explore';
import './modal';
import head from './head';
import './skip_content';
import '@fortawesome/fontawesome-free/js/all';
import favorites from './favorites/app';
import { exploreDetail } from './explore_detail';

console.log('Hello Coders! :)');

navigation();
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