const btn_toggle = document.querySelectorAll('button[modal-target]');
btn_toggle.forEach(e => {
    e.addEventListener('click', () => {
        let modal = document.getElementById(e.getAttribute('modal-target'));
        modal.style.display = 'block';
    });
});

const close = document.querySelectorAll('.modal .close');
close.forEach(e => {
    e.addEventListener('click', () => {
        let modal = e.parentNode.closest('.modal');
        modal.style.display = 'none';
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});