const skip_content_body = document.querySelectorAll('#skipContent *, .helper');
const skip_content = document.querySelector('#skipContent');
// detect if skip_content_body is focused
skip_content_body.forEach(function(element) {
	element.addEventListener('focus', function() {
		// if .helper is anchor tag
		if (element.parentElement.getAttribute('id') != 'skipContent') {
			element.style.top = '0';
		} else {
			skip_content.style.top = '0';
		}
	});
	// if skip_content_body is not focused, top = -100%
	element.addEventListener('blur', function() {
		// if .helper is anchor tag
		if (element.parentElement.getAttribute('id') != 'skipContent') {
			element.style.top = '-100%';
		} else {
			skip_content.style.top = '-100%';
		}
	});
});