
const btn_toggle = document.querySelectorAll('button[modal-target]');
btn_toggle.forEach(e => {
    e.addEventListener('click', () => {
        let modal = document.getElementById(e.getAttribute('modal-target'));
        modal.style.display = 'block';
        
    });
});

const close = document.querySelectorAll('.modal .close');
close.forEach(e => {
    let modal = e.parentNode.closest('.modal');
    e.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    e.addEventListener('keydown', (e)=>{
        if (e.key == 'Enter') {
            modal.style.display = 'none';
        }
    });
});

window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.style.display = 'none';
    }
});

// press escape key to close modal
window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // if there are modal style display block, close
        const modal = document.querySelectorAll('.modal');
        modal.forEach(e => {
            if (e.style.display === 'block') {
                e.style.display = 'none';
            }
        });
    }
});

// if focus is not in modal,  close modal
window.addEventListener('focus', (e) => {
    const modal = document.querySelectorAll('.modal');
    modal.forEach(e => {
        if (e.style.display === 'block') {
            e.style.display = 'none';
        }
    });
});