import '../../styles/favorites.scss';
import favorites from './favorites';
import { restaurants } from './restaurants';

const App = () => {
	restaurants();
	favorites();
};

export default App;