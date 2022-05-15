const head = () => {
	const head_img = document.querySelector('section#head .head-image');

	// check several images from /images/hero/
	let hero_img = [
		'images/heros/hero-image_1-large.jpg',
		'images/heros/hero-image_2-large.jpg',
		'images/heros/hero-image_3-large.jpg',
		'images/heros/hero-image_4-large.jpg',
	];

	// detect if screen is medium enough
	const is_medium = window.matchMedia('(max-width: 767px)').matches;
	if (is_medium) {
		hero_img = [
			'images/heros/hero-image_1-medium.jpg',
			'images/heros/hero-image_2-medium.jpg',
			'images/heros/hero-image_3-medium.jpg',
			'images/heros/hero-image_4-medium.jpg',
		];
	}


	// detect if screen is small
	const is_small = window.matchMedia('(max-width: 375px)').matches;
	if (is_small) {
		// if screen is small, use small image
		hero_img = [
			'images/heros/hero-image_1-small.jpg',
			'images/heros/hero-image_2-small.jpg',
			'images/heros/hero-image_3-small.jpg',
			'images/heros/hero-image_4-small.jpg',
		];
	}

	// change img src every 30 seconds
	let i = 1;
	setInterval(function () {
		// change img src with opacity animation
		head_img.setAttribute('src', hero_img[i % hero_img.length]);
		i++;
	}, 30000);
};

export default head;