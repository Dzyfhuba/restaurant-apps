import 'regenerator-runtime'; /* for async await transpile */
import '../styles/app.scss';
import './navbar';
import './explore';
import './modal';
import './head';
import './skip_content';
console.log('Hello Coders! :)');

// auto focus on skip content if page is loaded
window.onload = function() {
    // add tabindex to every card
    const cards = document.querySelectorAll('.card');
    cards.forEach(function(card) {
        card.setAttribute('tabindex', '0');
    });

    // scroll to top of page
    window.scrollTo(0, 0);

    // reset focus on first tabindex
    // document.querySelectorAll('[tabindex="0"]')[0].focus();
}