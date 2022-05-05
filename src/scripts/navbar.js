let prevScrollpos = window.pageYOffset;
const head = document.querySelector('#head');
window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.querySelector('nav').style.top = '0';
        head.style.padding = '90px 0 0 0';
    } else {
        document.querySelector('nav').style.top = '-100%';
        head.style.padding = '0';
    }
    prevScrollpos = currentScrollPos;
};

const toggle = document.querySelector('nav .nav-toggle');
const nav = document.querySelector('nav');

let indicator = false;

// script below only for small screen
if (window.innerWidth <= 767) {
    const ul = document.querySelector('nav ul');
    toggle.addEventListener('click', () => {
        if (!indicator) {
            indicator = !indicator;
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
            console.log(indicator);
            indicator = !indicator;
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