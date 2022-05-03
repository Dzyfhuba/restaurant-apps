var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.querySelector('nav').style.top = '0';
    } else {
        document.querySelector('nav').style.top = '-100%';
    }
    prevScrollpos = currentScrollPos;
};

const toggle = document.querySelector('nav #nav-toggle input[type="checkbox"]');
const nav = document.querySelector('nav');
// script below only for small screen
if (window.innerWidth <= 767) {
    const ul = document.querySelector('nav ul');
    toggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            ul.style.display = 'flex';
            ul.animate([{
                opacity: 0,
                transform: 'translateY(0%)'
            }, {
                opacity: 1,
                transform: 'translateY(100%)'
            }], {
                duration: 500,
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
                duration: 500,
                fill: 'forwards'
            });
        } else {
            ul.animate([{
                opacity: 1,
                transform: 'translateY(100%)'
            }, {
                opacity: 0,
                transform: 'translateY(0%)'
            }], {
                duration: 500,
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
                duration: 500,
                fill: 'forwards'
            });
            setTimeout(() => {
                ul.style.display = 'none';
            }, 500);
        }
    });
}