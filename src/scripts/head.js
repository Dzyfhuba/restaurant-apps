const head_img = document.querySelector('section#head .head-image');

// check several images from /images/hero/
const hero_img = [
	'./images/heros/hero-image_1.jpg',
	'./images/heros/hero-image_2.jpg',
	'./images/heros/hero-image_3.jpg',
	'./images/heros/hero-image_4.jpg',
];

// change img src every 30 seconds
let i = 1;
setInterval(function() {
	// change img src with opacity animation
	head_img.setAttribute('src', hero_img[i%hero_img.length]);
	i++;
}, 30000);