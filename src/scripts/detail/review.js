import '../../styles/detail.scss';
import $ from 'jquery';
import CONFIG from '../config';
import {post_review} from '../explore_detail';

let review_data = [];
const loadReview = (id) => {
	$.ajax({
		url: `${CONFIG.API_URL}/detail/${id}`,
		type: 'GET',
		dataType: 'json',
		beforeSend: function() {
			const loading = document.createElement('loading-layer');
			$('.review-group').append(loading);
		},
		success: function (data) {
			review_data = data.restaurant.customerReviews.reverse().map(item => {
				return `
                <li>
                    <div class="review-content">
                        <div class="review-header">
                            <h3>${item.name}</h3>
                            <span>${item.date}</span>
                        </div>
                        <div class="review-body">
                            <p>${item.review}</p>
                        </div>
                    </div>
                </li>
                `;
			}).join('');

			$('#review-list').html(review_data);
            
			$('loading-layer').remove();
		},
		error: function (data) {
			console.log(data);
		}
	});
};

const review = () => {
	// get id from url
	const queryString = window.location.search;
	const id = queryString.split('=')[1];
	document.getElementById('review-id').value = id;
	loadReview(id);
	post_review();
};

export default review;