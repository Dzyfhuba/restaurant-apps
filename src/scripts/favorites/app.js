import '../../styles/favorites.scss';
import favorites from './favorites';
import { restaurants } from './restaurants';
import $ from 'jquery';
import { favoriteToggle } from '../explore_detail';

const App = () => {
	restaurants();
	favorites();

	// alternate way to update list
	$('.modal .close').on('click', () => {
		location.reload();
	});

	$(document).on('keyup', (e) => {
		if (e.key === 'Escape') {
			location.reload();
		}
	});

	$('.modal').on('click', (e) => {
		if (e.target.classList.contains('modal')) {
			location.reload();
		}
	});
	favoriteToggle();
};

export default App;