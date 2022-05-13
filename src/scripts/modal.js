class Modal {
	constructor(modal) {
		this.modal = modal;
		this.modal.addEventListener('click', (e) => {
			if (e.target.classList.contains('modal')) {
				if (this.modal.style.display === 'block') {
					this.modal.style.display = 'none';
					document.querySelector('body').style.overflow = 'auto';
					this.modal.querySelector('.modal-content').style.overflow = 'hidden';
				}
			}
		});
		window.addEventListener('keydown', (e) => {
			if (e.key === 'Escape') {
				if (this.modal.style.display === 'block') {
					this.modal.style.display = 'none';
					document.querySelector('body').style.overflow = 'auto';
					this.modal.querySelector('.modal-content').style.overflow = 'hidden';
				}
			}
		});
		
	}
	
	open() {
		this.modal.style.display = 'block';
		document.querySelector('body').style.overflow = 'hidden';
		this.modal.querySelector('.modal-content').style.overflow = 'auto';
		this.modal.focus();
		this.close = this.modal.querySelector('.close');
		this.close.addEventListener('click', () => {
			this.modal.style.display = 'none';
			document.querySelector('body').style.overflow = 'auto';
			this.modal.querySelector('.modal-content').style.overflow = 'hidden';
		});
	}

	close() {
		if (this.modal.style.display === 'block') {
			this.modal.style.display = 'none';
			document.querySelector('body').style.overflow = 'auto';
			this.modal.querySelector('.modal-content').style.overflow = 'hidden';
		}
	}
}

export default Modal;