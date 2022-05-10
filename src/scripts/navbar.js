let prevScrollpos = window.pageYOffset;
let on_top = null;
if (window.location.pathname === '/') {
	on_top = document.querySelector('#head');
} else if (window.location.pathname === '/favorites.html') {
	on_top = document.querySelector('#mainContent');
}
on_top.style.padding = window.innerWidth <= 767 ? '50px 0 0 0' : '90px 0 0 0';

window.onscroll = function() {
	let currentScrollPos = window.pageYOffset;
	if (prevScrollpos > currentScrollPos) {
		document.querySelector('nav').style.top = '0';
		on_top.style.padding = window.innerWidth <= 767 ? '50px 0 0 0' : '90px 0 0 0';
	} else {
		document.querySelector('nav').style.top = '-100%';
		on_top.style.padding = '0';
	}
	prevScrollpos = currentScrollPos;
};
const navigation_prop = {
	open: false
};

const navigation = () => {
	const toggle = document.querySelector('nav .nav-toggle');
	const nav = document.querySelector('nav');

	// script below only for small screen
	if (window.innerWidth <= 767) {
		const ul = document.querySelector('nav ul');
		toggle.addEventListener('click', () => {
			if (!navigation_prop.open) {
				navigation_prop.open = !navigation_prop.open;
				ul.style.display = 'flex';
				ul.animate([{
					opacity: 0,
					transform: 'translateY(0%)'
				}, {
					opacity: 1,
					transform: 'translateY(100%)'
				}], {
					duration: 300,
					fill: 'forwards'
				});

				//  animate in
				nav.animate([
					{
						height: '50px',
					},
					{
						height: '100px',
					}
				], {
					duration: 300,
					fill: 'forwards'
				});
			} else {
				navigation_prop.open = !navigation_prop.open;
				ul.animate([{
					opacity: 1,
					transform: 'translateY(100%)'
				}, {
					opacity: 0,
					transform: 'translateY(0%)'
				}], {
					duration: 300,
					fill: 'forwards'
				});
				// animate out
				nav.animate([
					{
						height: '100px',
					},
					{
						height: '50px',
					},
				], {
					duration: 300,
					fill: 'forwards'
				});
				setTimeout(() => {
					ul.style.display = 'none';
				}, 300);
			}
		});
	}
};

export default navigation;